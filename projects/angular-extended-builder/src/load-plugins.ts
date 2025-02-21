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
			return loadModule<Plugin | Plugin[]>(workspaceRoot, pluginOrPath, tsConfig)
		}),
	)

	return plugins.flat()
}
