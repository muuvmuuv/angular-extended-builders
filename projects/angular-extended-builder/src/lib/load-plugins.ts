import { loadModule } from "./load-module"
import type { Plugin } from "./plugin"

export async function loadPlugins(
	paths: string[] | undefined,
	workspaceRoot: string,
	tsConfig: string,
): Promise<Plugin[]> {
	if (!paths) {
		return []
	}

	const plugins: Plugin[] = []

	for (const pluginOrPath of paths) {
		plugins.push(
			await loadModule<Plugin>(workspaceRoot, pluginOrPath, tsConfig),
		)
	}

	return plugins.flat()
}
