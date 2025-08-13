/** biome-ignore-all lint/suspicious/noExplicitAny: it is imported */

import gql from "graphql-tag"

/**
 * Thanks to https://github.com/luckycatfactory/esbuild-graphql-loader
 * this version is reduced for specific needs!
 */

// Definitions can be undefined, which will get stripped when JSON.stringify is
// run. For that reason, we temporarily serialize undefined, then swap it back
// to the value of undefined.
const generateDocumentNodeString = (graphqlDocument: object) => {
	return JSON.stringify(graphqlDocument, (_key, value) =>
		value === undefined ? "__undefined" : value,
	).replaceAll('"__undefined"', "undefined")
}

const generateDocumentNodeStringForOperationDefinition = (
	operationDefinition: object,
	fragments: object[],
) => {
	const operationDocument = {
		kind: "Document",
		definitions: [operationDefinition, ...fragments],
	}

	return generateDocumentNodeString(operationDocument)
}

const collectAllFragmentDefinitions = (documentNode: any) => {
	const accumulator: any = {}

	for (const node of documentNode.definitions) {
		if (node.kind === "FragmentDefinition") {
			accumulator[node.name.value] = node
		}
	}

	return accumulator
}

const collectAllFragmentReferences = (node: any, allFragments: any) => {
	const references: any = []

	const handleSelectionNode = (selection: any) => {
		if (selection.kind === "FragmentSpread") {
			const fragment = allFragments[selection.name.value]
			const innerFragmentReferences = collectAllFragmentReferences(
				fragment,
				allFragments,
			)
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

export const generateContentsFromGraphqlString = (graphqlString: any) => {
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

				const fragmentsForOperation = collectAllFragmentReferences(
					definition,
					allFragments,
				)

				const fragments = fragmentsForOperation.map(
					(fragmentForOperation: any) => {
						const fragment = allFragments[fragmentForOperation]

						if (!fragment) {
							throw new Error(
								`Expected to find fragment definition for ${fragmentForOperation}`,
							)
						}

						return fragment
					},
				)

				const operationDocumentString =
					generateDocumentNodeStringForOperationDefinition(
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
