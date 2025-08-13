import path from "node:path"

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
	workspaceRoot: string,
	modulePath: string,
	tsConfig: string,
): Promise<T> {
	await tsxRegister(tsConfig)

	let resolvedModulePath = modulePath

	// Handle relative paths
	if (resolvedModulePath.startsWith(".")) {
		// Relative file path
		resolvedModulePath = path.join(workspaceRoot, resolvedModulePath)
	}

	return (await loadEsmModule<{ default: T }>(resolvedModulePath)).default
}
