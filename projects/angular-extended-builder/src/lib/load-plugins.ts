import { debug } from "./debug"
import { loadModule } from "./load-module"
import type { Plugin } from "./plugin"

interface PluginLoadSuccess {
	readonly success: true
	readonly plugin: Plugin
	readonly path: string
	readonly loadTime: number
}

interface PluginLoadFailure {
	readonly success: false
	readonly error: unknown
	readonly path: string
}

type PluginLoadResult = PluginLoadSuccess | PluginLoadFailure

export async function loadPlugins(
	paths: string[] | undefined,
	workspaceRoot: string,
	tsConfig: string,
): Promise<Plugin[]> {
	if (!paths || paths.length === 0) {
		debug.debug("No plugins configured")
		return []
	}

	debug.info(`Loading ${paths.length} plugin(s) in parallel...`)
	debug.time("Plugin loading")

	// Load all plugins in parallel for better performance
	const pluginPromises = paths.map(
		async (pluginOrPath): Promise<PluginLoadResult> => {
			debug.debug(`Starting load: ${pluginOrPath}`)
			try {
				const startTime = Date.now()
				const plugin = await loadModule<Plugin>(
					workspaceRoot,
					pluginOrPath,
					tsConfig,
				)
				const loadTime = Date.now() - startTime
				debug.debug(`Loaded plugin: ${pluginOrPath} (${loadTime}ms)`)
				return { success: true, plugin, path: pluginOrPath, loadTime }
			} catch (error) {
				debug.error(`Failed to load plugin: ${pluginOrPath}`, error)
				return { success: false, error, path: pluginOrPath }
			}
		},
	)

	// Wait for all plugins to finish loading (both successful and failed)
	const pluginResults = await Promise.all(pluginPromises)

	// Separate successful plugins from failed ones
	const successfulPlugins: Plugin[] = []
	const failed: string[] = []

	for (const result of pluginResults) {
		if (result.success) {
			successfulPlugins.push(result.plugin)
		} else {
			failed.push(result.path)
		}
	}

	const flatPlugins = successfulPlugins.flat()
	debug.timeEnd("Plugin loading")

	// Report results
	if (failed.length > 0) {
		debug.warn(
			`Failed to load ${failed.length} plugin(s): ${failed.join(", ")}`,
		)
	}

	debug.info(`Successfully loaded ${flatPlugins.length} plugin(s)`)
	debug.trace(
		"Loaded plugins",
		flatPlugins.map((p) => p.name || "unnamed"),
	)

	return flatPlugins
}
