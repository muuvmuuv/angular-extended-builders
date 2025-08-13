import path from "node:path"

import { loadEsmModule } from "./load-esm"

let tsxRegistered = false

async function tsxRegister(tsConfig: string) {
	if (tsxRegistered) {
		return
	}

	tsxRegistered = true

	const tsx = await import("tsx/esm/api")
	tsx.register({
		tsconfig: tsConfig,
	})
}

export async function loadModule<T>(
	workspaceRoot: string,
	modulePath: string,
	tsConfig: string,
): Promise<T> {
	await tsxRegister(tsConfig)

	// Possible module import
	let resolvedModulePath = modulePath
	if (modulePath.startsWith(".")) {
		// Relative file path
		resolvedModulePath = path.join(workspaceRoot, modulePath)
	}

	switch (path.extname(resolvedModulePath)) {
		case ".mjs":
		case ".js":
			return (await loadEsmModule<{ default: T }>(resolvedModulePath)).default
		case ".cjs":
			return require(resolvedModulePath).default
		case ".ts":
			return (await loadEsmModule<{ default: T }>(resolvedModulePath)).default
		default:
			try {
				return require(resolvedModulePath).default
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code === "ERR_REQUIRE_ESM") {
					return (await loadEsmModule<{ default: T }>(resolvedModulePath))
						.default
				}
				throw error
			}
	}
}
