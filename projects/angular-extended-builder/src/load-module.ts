import path from "node:path"

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
			esModuleInterop: true,
			allowSyntheticDefaultImports: true,
			resolveJsonModule: true,
			types: ["node"],
		},
	})
}

function loadEsmModule<T>(modulePath: string) {
	return import(modulePath) as Promise<{ default: T }>
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
			return (await loadEsmModule<T>(resolvedModulePath)).default
		case ".cjs":
			return require(resolvedModulePath).default
		case ".ts":
			return (await loadEsmModule<T>(resolvedModulePath)).default
		default:
			try {
				return require(resolvedModulePath).default
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code === "ERR_REQUIRE_ESM") {
					return (await loadEsmModule<T>(resolvedModulePath)).default
				}
				throw error
			}
	}
}
