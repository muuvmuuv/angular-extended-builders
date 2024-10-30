import * as path from "node:path"
import type { Plugin } from "esbuild"

// TODO: once extensions is typed by Angular itself we can remove esbuild dependency

export async function loadModule<T>(modulePath: string): Promise<T> {
	return import(modulePath).then((module) => module.default)
}

export async function loadPlugins(
	paths: string[] | undefined,
	workspaceRoot: string,
): Promise<Plugin[]> {
	const plugins = await Promise.all(
		(paths || []).map((pluginPath) => {
			return loadModule<Plugin | Plugin[]>(path.join(workspaceRoot, pluginPath))
		}),
	)

	return plugins.flat()
}
