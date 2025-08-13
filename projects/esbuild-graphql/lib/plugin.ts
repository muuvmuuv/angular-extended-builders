/** biome-ignore-all lint/suspicious/noExplicitAny: it is imported */

import * as fs from "node:fs"

import { generateContentsFromGraphqlString } from "./graphql-impl"

/** @type {import('esbuild').Plugin} */
export default {
	name: "app-graphql",
	setup(build: any) {
		build.onLoad(
			{
				filter: /\.graphql$|\.gql$/,
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
