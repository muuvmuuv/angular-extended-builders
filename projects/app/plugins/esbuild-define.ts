/** biome-ignore-all lint/style/noDefaultExport: plugins do that */

import process from "node:process"
import type { Plugin } from "esbuild"

import { globals } from "@/plugins/globals"

export default {
	name: "aqua-build-define",
	setup: ({ initialOptions }) => {
		for (const [key, value] of Object.entries(globals)) {
			// biome-ignore lint/suspicious/noConsole: yers
			console.debug(`> ${key}:`, value)

			initialOptions.define ??= {} // happens
			initialOptions.define[key] = JSON.stringify(value)

			process.env[key] = value
		}
	},
} satisfies Plugin
