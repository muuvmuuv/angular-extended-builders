import { debug } from "./debug"
import { loadModule } from "./load-module"
import type { Plugin } from "./plugin"

export async function loadPlugins(
	paths: string[] | undefined,
	workspaceRoot: string,
	tsConfig: string,
): Promise<Plugin[]> {
	if (!paths) {
		debug.debug("No plugins configured")
		return []
	}

	debug.info(`Loading ${paths.length} plugin(s)...`)
	debug.time("Plugin loading")

	const plugins: Plugin[] = []

	for (const pluginOrPath of paths) {
		debug.debug(`Loading plugin: ${pluginOrPath}`)
		try {
			const plugin = await loadModule<Plugin>(
				workspaceRoot,
				pluginOrPath,
				tsConfig,
			)
			plugins.push(plugin)
			debug.debug(`Loaded plugin: ${pluginOrPath}`)
		} catch (error) {
			debug.error(`Failed to load plugin: ${pluginOrPath}`, error)
			throw error
		}
	}

	const flatPlugins = plugins.flat()
	debug.timeEnd("Plugin loading")
	debug.info(`Loaded ${flatPlugins.length} total plugin(s)`)
	debug.trace(
		"Loaded plugins",
		flatPlugins.map((p) => p.name || "unnamed"),
	)

	return flatPlugins
}
