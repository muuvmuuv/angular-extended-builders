import { extname, join } from "node:path"
import { pathToFileURL } from "node:url"

import { loadEsmModule } from "./load-esm"

let tsRegistered = false

async function tsxRegister(tsConfig: string) {
	if (tsRegistered) {
		return
	}

	tsRegistered = true

	// Use tsx for TypeScript ESM support
	const tsx = await import("tsx/esm/api")
	tsx.register({
		tsconfig: tsConfig,
		namespace: Buffer.from(tsConfig, "base64").toString("utf8"),
		onImport: (file) => {
			console.log("Import file:", file)
		},
	})
}

export async function loadModule<T>(
	projectRoot: string,
	modulePath: string,
	tsConfig: string,
): Promise<T> {
	await tsxRegister(tsConfig)

	let resolvedModulePath = modulePath

	// Handle relative paths
	if (resolvedModulePath.startsWith(".")) {
		// Relative file path
		resolvedModulePath = join(projectRoot, resolvedModulePath)
	}

	console.log("Load module:", resolvedModulePath)

	switch (extname(resolvedModulePath)) {
		case ".mjs":
			// Load the ESM configuration file using the TypeScript dynamic import workaround.
			// Once TypeScript provides support for keeping the dynamic import this workaround can be
			// changed to a direct dynamic import.
			return (
				await loadEsmModule<{ default: T }>(pathToFileURL(resolvedModulePath))
			).default
		case ".cjs":
			return require(resolvedModulePath)
		default:
			// The file could be either CommonJS or ESM.
			// CommonJS is tried first then ESM if loading fails.
			try {
				return (
					require(resolvedModulePath).default || require(resolvedModulePath)
				)
			} catch (e) {
				if (
					(e as NodeJS.ErrnoException).code === "ERR_REQUIRE_ESM" ||
					(e as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND"
				) {
					// Load the ESM configuration file using the TypeScript dynamic import workaround.
					// Once TypeScript provides support for keeping the dynamic import this workaround can be
					// changed to a direct dynamic import.
					return (await loadEsmModule<{ default: T }>(resolvedModulePath))
						.default
				}
				throw e
			}
	}
}
