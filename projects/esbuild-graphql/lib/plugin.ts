/** biome-ignore-all lint/style/noDefaultExport: plugins must be */
/** biome-ignore-all lint/suspicious/noExplicitAny: do not care here */

import * as fs from "node:fs"

import { generateContentsFromGraphqlString } from "./graphql-impl"

const MATCH_GQL_FILES = /\.graphql$|\.gql$/i

/** @type {import('esbuild').Plugin} */
export default {
	name: "app-graphql",
	setup(build: any) {
		build.onLoad(
			{
				filter: MATCH_GQL_FILES,
			},
			async (arguments_: any) => {
				const buffer = await fs.promises.readFile(arguments_.path)
				const graphqlString = buffer.toString()

				return {
					contents: generateContentsFromGraphqlString(graphqlString),
				}
			},
		)
	},
}
