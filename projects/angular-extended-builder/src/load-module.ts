import path from "node:path"

import { loadEsmModule } from "./load-esm"

let lastTsConfig: string | undefined

async function tsNodeRegister(tsConfig: string) {
	if (lastTsConfig) {
		return
	}

	lastTsConfig = tsConfig

	const tsNode = await import("ts-node")
	tsNode.register({
		project: tsConfig,
		compilerOptions: {
			module: "CommonJS",
			moduleResolution: "Node",
			target: "ES2020",
			noCheck: true,
			esModuleInterop: true,
			allowSyntheticDefaultImports: true,
			resolveJsonModule: true,
			types: ["node"],
		},
	})

	// Thanks to https://github.com/just-jeb/angular-builders/blob/master/packages/common/src/load-module.ts#L31C47-L40C6
	const tsPaths = await import("tsconfig-paths")
	const result = tsPaths.loadConfig(tsConfig)
	if (result.resultType === "success") {
		const { absoluteBaseUrl: baseUrl, paths } = result
		tsPaths.register({ baseUrl, paths })
	}
}

export async function loadModule<T>(
	workspaceRoot: string,
	modulePath: string,
	tsConfig: string,
): Promise<T> {
	await tsNodeRegister(tsConfig)

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
					return (await loadEsmModule<{ default: T }>(resolvedModulePath)).default
				}
				throw error
			}
	}
}
