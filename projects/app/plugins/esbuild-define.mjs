import { UTCDateMini } from "@date-fns/utc"
import { formatISO } from "date-fns"
import { blake3 } from "hash-wasm"
import { nanoid } from "nanoid"

import { getEnvironment, getHash, getVersion } from "./utils.mjs"

/** @type {import('esbuild').Plugin} */
export default {
	name: "app-define",
	setup: async ({ initialOptions }) => {
		initialOptions.define ??= {} // happens

		function define(key, value) {
			console.log(`> ${key}:`, value)
			initialOptions.define[key] = JSON.stringify(value)
			process.env[key] = value
		}

		define("BUILD_ENV", getEnvironment())
		define("BUILD_DATE", formatISO(new UTCDateMini()))
		define("APP_VERSION", getVersion())
		define("APP_HASH", getHash())
		define("NONCE", await blake3(nanoid()))
	},
}
