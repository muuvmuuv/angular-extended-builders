import fs from "node:fs"

import gql from "graphql-tag"

/**
 * Thanks to https://github.com/luckycatfactory/esbuild-graphql-loader
 * this version is reduced for specific needs!
 */

// Definitions can be undefined, which will get stripped when JSON.stringify is
// run. For that reason, we temporarily serialize undefined, then swap it back
// to the value of undefined.
const generateDocumentNodeString = (graphqlDocument) => {
	return JSON.stringify(graphqlDocument, (key, value) =>
		value === undefined ? "__undefined" : value,
	).replaceAll('"__undefined"', "undefined")
}

const generateDocumentNodeStringForOperationDefinition = (operationDefinition, fragments) => {
	const operationDocument = {
		kind: "Document",
		definitions: [operationDefinition, ...fragments],
	}

	return generateDocumentNodeString(operationDocument)
}

const collectAllFragmentDefinitions = (documentNode) => {
	const accumulator = {}

	for (const node of documentNode.definitions) {
		if (node.kind === "FragmentDefinition") {
			accumulator[node.name.value] = node
		}
	}

	return accumulator
}

const collectAllFragmentReferences = (node, allFragments) => {
	const references = []

	const handleSelectionNode = (selection) => {
		if (selection.kind === "FragmentSpread") {
			const fragment = allFragments[selection.name.value]
			const innerFragmentReferences = collectAllFragmentReferences(fragment, allFragments)
			references.push(...innerFragmentReferences, selection.name.value)
		}
	}

	if (node.kind === "OperationDefinition") {
		for (const selection of node.selectionSet.selections) {
			if (selection.kind === "Field" && selection.selectionSet) {
				for (const element of selection.selectionSet.selections) {
					handleSelectionNode(element)
				}
			}
		}
	} else {
		for (const element of node.selectionSet.selections) {
			handleSelectionNode(element)
		}
	}

	return references
}

export const generateContentsFromGraphqlString = (graphqlString) => {
	const graphqlDocument = gql(graphqlString)
	const documentNodeAsString = generateDocumentNodeString(graphqlDocument)
	const allFragments = collectAllFragmentDefinitions(graphqlDocument)

	// eslint-disable-next-line unicorn/no-array-reduce
	const lines = graphqlDocument.definitions.reduce(
		(accumulator, definition) => {
			if (
				definition.kind === "OperationDefinition" &&
				definition.name &&
				definition.name.value
			) {
				const name = definition.name.value

				const fragmentsForOperation = collectAllFragmentReferences(definition, allFragments)

				const fragments = fragmentsForOperation.map((fragmentForOperation) => {
					const fragment = allFragments[fragmentForOperation]

					if (!fragment) {
						throw new Error(
							`Expected to find fragment definition for ${fragmentForOperation}`,
						)
					}

					return fragment
				})

				const operationDocumentString = generateDocumentNodeStringForOperationDefinition(
					definition,
					fragments,
				)
				accumulator.push(`export const ${name} = ${operationDocumentString};`)
			}

			return accumulator
		},
		[`const documentNode = ${documentNodeAsString};`],
	)

	lines.push("export default documentNode;")

	return lines.join("\n")
}

/** @type {import('esbuild').Plugin} */
export default {
	name: "app-graphql",
	setup(build) {
		build.onLoad(
			{
				filter: /\.graphql$|\.gql$/,
			},
			async (arguments_) => {
				const buffer = await fs.promises.readFile(arguments_.path)
				const graphqlString = buffer.toString()

				return {
					contents: generateContentsFromGraphqlString(graphqlString),
				}
			},
		)
	},
}
