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
		swc: true,
		experimentalResolver: true,
		compilerOptions: {
			module: "CommonJS",
			moduleResolution: "Node",
			target: "ES6",
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

export async function loadModule<T>(modulePath: string, tsConfig: string): Promise<T> {
	await tsNodeRegister(tsConfig)

	switch (path.extname(modulePath)) {
		case ".mjs":
		case ".js":
			return (await loadEsmModule<T>(modulePath)).default
		case ".cjs":
			return require(modulePath).default
		case ".ts":
			return (await loadEsmModule<T>(modulePath)).default
		default:
			try {
				return require(modulePath).default
			} catch (error) {
				if ((error as NodeJS.ErrnoException).code === "ERR_REQUIRE_ESM") {
					return (await loadEsmModule<T>(modulePath)).default
				}
				throw error
			}
	}
}
