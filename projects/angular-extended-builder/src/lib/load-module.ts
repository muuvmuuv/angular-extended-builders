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

	switch (extname(modulePath)) {
		case ".mjs":
			// Load the ESM configuration file using the TypeScript dynamic import workaround.
			// Once TypeScript provides support for keeping the dynamic import this workaround can be
			// changed to a direct dynamic import.
			return (await loadEsmModule<{ default: T }>(pathToFileURL(modulePath)))
				.default
		case ".cjs":
			return require(modulePath)
		default:
			// The file could be either CommonJS or ESM.
			// CommonJS is tried first then ESM if loading fails.
			try {
				return require(modulePath).default || require(modulePath)
			} catch (e) {
				if (
					(e as NodeJS.ErrnoException).code === "ERR_REQUIRE_ESM" ||
					(e as NodeJS.ErrnoException).code === "MODULE_NOT_FOUND"
				) {
					// Load the ESM configuration file using the TypeScript dynamic import workaround.
					// Once TypeScript provides support for keeping the dynamic import this workaround can be
					// changed to a direct dynamic import.
					return (await loadEsmModule<{ default: T }>(modulePath)).default
				}
				throw e
			}
	}
}
