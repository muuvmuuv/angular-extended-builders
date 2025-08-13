import { extname, join } from "node:path"
import tsxCjs from "tsx/cjs/api"
import tsxEsm from "tsx/esm/api"
import { debug } from "./debug"

/**
 * Because the CommonJS API tracks loaded modules in require.cache, you can use it to
 * identify loaded files for dependency tracking. This can be useful when implementing a watcher.
 * @see https://tsx.is/dev-api/tsx-require#tracking-loaded-files
 * @param module
 * @returns
 */
// biome-ignore lint/suspicious/noExplicitAny: module is any type of module
const collectDependencies = (module: any) => [
	module.filename,
	...module.children.flatMap(collectDependencies),
]

/**
 * More future proof implementation to load any kind of module by using dynamic
 * enhanced tsx import/require APIs.
 * @see https://tsx.is/dev-api/
 * @param projectRoot
 * @param modulePath
 * @param tsConfigPath
 * @returns
 */
export async function loadModule<T>(
	projectRoot: string,
	modulePath: string,
	tsConfigPath: string,
): Promise<T> {
	let resolvedModulePath = modulePath

	// Handle relative paths
	if (resolvedModulePath.startsWith(".")) {
		// Relative file path
		resolvedModulePath = join(projectRoot, resolvedModulePath)
	}

	debug.info("Load module:", resolvedModulePath)

	/**
	 * Setup and try importing ESM.
	 * @see https://tsx.is/dev-api/ts-import
	 */
	async function importEsm() {
		const fileStack: string[] = []
		const mod = await tsxEsm.tsImport(resolvedModulePath, {
			parentURL: projectRoot,
			tsconfig: tsConfigPath,
			onImport: (file) => {
				fileStack.push(file)
			},
		})
		debug.trace("Import esm", fileStack)
		return mod.default ?? mod
	}

	/**
	 * Setup and try importing CommonJS.
	 * @see https://tsx.is/dev-api/tsx-require
	 */
	function requireCjs() {
		const mod = tsxCjs.require(resolvedModulePath, projectRoot)
		const modPath = tsxCjs.require.resolve(resolvedModulePath, projectRoot)
		debug.trace(
			"Import cjs",
			collectDependencies(tsxCjs.require.cache[modPath]),
		)
		return mod.default ?? mod
	}

	// Handle resolved module path by file extension for faster resolving
	// using the proper importer.

	switch (extname(resolvedModulePath)) {
		case ".ts":
		case ".mjs":
			// Load ESM and TypeScript files directly using ESM.
			return await importEsm()
		case ".cjs":
			// CommonJS can be required like before
			return requireCjs()
		default:
			// The file could be either CommonJS or ESM.
			// First try modern ESM import, then fallback to old CommonJS.
			try {
				return await importEsm()
			} catch (_error) {
				const error = _error as NodeJS.ErrnoException
				debug.debug("Failed to import", error.code)
				if (error.code === "ERR_MODULE_NOT_FOUND") {
					debug.debug("Trying cjs import")
					return requireCjs()
				}
				throw _error
			}
	}
}
