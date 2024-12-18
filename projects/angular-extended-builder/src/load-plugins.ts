import path from "node:path"
import type { Plugin } from "esbuild"
import { loadModule } from "./load-module"

// TODO: once extensions is typed by Angular itself we can remove esbuild dependency

export async function loadPlugins(
	paths: string[] | undefined,
	workspaceRoot: string,
	tsConfig: string,
): Promise<Plugin[]> {
	if (!paths) {
		return []
	}

	const plugins = await Promise.all(
		paths.map((pluginOrPath) => {
			if (pluginOrPath.startsWith(".")) {
				// Relative path
				return loadModule<Plugin | Plugin[]>(path.join(workspaceRoot, pluginOrPath), tsConfig)
			}
			// Module import
			return loadModule<Plugin | Plugin[]>(pluginOrPath, tsConfig)
		}),
	)

	return plugins.flat()
}
