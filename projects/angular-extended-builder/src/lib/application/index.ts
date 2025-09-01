import path from "node:path"
import { performance } from "node:perf_hooks"
import {
	type ApplicationBuilderExtensions,
	buildApplication,
} from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { type BuilderContext, createBuilder } from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { defer, switchMap } from "rxjs"

import type { ExtendedApplicationBuilderOptions } from "../../schema"
import { debug } from "../debug"
import { loadModule } from "../load-module"
import { loadPlugins } from "../load-plugins"

function executeBuilder(
	options: ExtendedApplicationBuilderOptions,
	context: BuilderContext,
) {
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))
	const tsConfig = path.join(workspaceRoot, options.tsConfig)

	debug.info("Starting Angular Extended Application Builder")
	debug.trace("Builder options", {
		workspaceRoot,
		tsConfig,
		plugins: options.plugins?.length || 0,
		indexHtmlTransformer: !!options.indexHtmlTransformer,
	})

	return defer(async (): Promise<ApplicationBuilderExtensions> => {
		const setupStartTime = performance.now()

		// Get project metadata to determine project root
		const projectName = context.target?.project
		const projectMetadata = projectName
			? await context.getProjectMetadata(projectName)
			: null
		const projectRoot = projectMetadata?.root
			? path.join(workspaceRoot, projectMetadata.root.toString())
			: workspaceRoot

		debug.debug(`Project root: ${projectRoot}`)
		const codePlugins = await loadPlugins(
			options.plugins,
			projectRoot,
			tsConfig,
		)

		let indexHtmlTransformer: IndexHtmlTransform | undefined
		if (options.indexHtmlTransformer) {
			debug.debug(`Loading HTML transformer: ${options.indexHtmlTransformer}`)
			try {
				indexHtmlTransformer = await loadModule<IndexHtmlTransform>(
					projectRoot,
					options.indexHtmlTransformer,
					tsConfig,
				)
				debug.debug(`Loaded HTML transformer: ${options.indexHtmlTransformer}`)
			} catch (error) {
				debug.error(
					`Failed to load HTML transformer: ${options.indexHtmlTransformer}`,
					error,
				)
				throw error
			}
		}

		const setupDuration = performance.now() - setupStartTime
		debug.debug(
			`Application builder setup completed in ${setupDuration.toFixed(2)}ms`,
		)

		debug.trace("Extensions loaded", {
			plugins: codePlugins.length,
			hasHtmlTransformer: !!indexHtmlTransformer,
		})

		return { codePlugins, indexHtmlTransformer }
	}).pipe(
		switchMap((extensions) => {
			debug.debug("Executing Angular build with extensions")
			return buildApplication(options, context, extensions)
		}),
	)
}

export default createBuilder<
	ExtendedApplicationBuilderOptions & json.JsonObject
>(executeBuilder)
