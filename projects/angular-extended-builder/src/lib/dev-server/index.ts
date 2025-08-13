import path from "node:path"
import { performance } from "node:perf_hooks"
import {
	type DevServerBuilderOutput,
	executeDevServerBuilder,
} from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import {
	type BuilderContext,
	createBuilder,
	targetFromTargetString,
} from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { from, type Observable, switchMap } from "rxjs"

import type {
	ExtendedDevServerBuilderOptions,
	ResolvedExtendedDevServerBuilderOptions,
} from "../../schema"
import { debug } from "../debug"
import { loadModule } from "../load-module"
import { loadPlugins } from "../load-plugins"
import type { Middleware } from "./types"

// Path where Angular loads Vite for reference:
// https://github.com/angular/angular-cli/blob/main/packages/angular/build/src/builders/dev-server/vite-server.ts#L183

// Path where we could inject Vite plugins:
// https://github.com/angular/angular-cli/blob/main/packages/angular/build/src/builders/dev-server/vite-server.ts#L890

function executeBuilder(
	options: ExtendedDevServerBuilderOptions,
	context: BuilderContext,
): Observable<DevServerBuilderOutput> {
	const buildTarget = targetFromTargetString(options.buildTarget)
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))

	debug.info("Starting Angular Extended Dev Server Builder")
	debug.trace("Dev server options", {
		workspaceRoot,
		buildTarget: options.buildTarget,
		middlewares: options.middlewares?.length || 0,
	})

	return from(
		Promise.all([
			// This will combine all options from the executed and build target
			context.getTargetOptions(
				buildTarget,
			) as unknown as Promise<ResolvedExtendedDevServerBuilderOptions>,
			// Get project metadata
			buildTarget.project
				? context.getProjectMetadata(buildTarget.project)
				: Promise.resolve(null),
		]),
	).pipe(
		switchMap(async ([buildOptions, projectMetadata]) => {
			const setupStartTime = performance.now()

			const projectRoot = projectMetadata?.root
				? path.join(workspaceRoot, projectMetadata.root.toString())
				: workspaceRoot
			const tsConfig = path.join(workspaceRoot, buildOptions.tsConfig)

			debug.debug(`Project root: ${projectRoot}`)
			debug.trace("Build options from target", {
				plugins: buildOptions.plugins?.length || 0,
				indexHtmlTransformer: buildOptions.indexHtmlTransformer,
			})

			const middleware: Middleware[] = []

			// Keep middleware order
			if (options.middlewares?.length) {
				debug.info(`Loading ${options.middlewares.length} middleware(s)...`)
				for (const middlewarePath of options.middlewares) {
					debug.debug(`Loading middleware: ${middlewarePath}`)
					try {
						const mw = await loadModule<Middleware>(
							projectRoot,
							middlewarePath,
							tsConfig,
						)
						middleware.push(mw)
						debug.debug(`Loaded middleware: ${middlewarePath}`)
					} catch (error) {
						debug.error(`Failed to load middleware: ${middlewarePath}`, error)
						throw error
					}
				}
			}

			const buildPlugins = await loadPlugins(
				buildOptions.plugins,
				projectRoot,
				tsConfig,
			)

			let indexHtmlTransformer: IndexHtmlTransform | undefined
			if (buildOptions.indexHtmlTransformer) {
				debug.info("Loading HTML transformer...")
				try {
					indexHtmlTransformer = await loadModule<IndexHtmlTransform>(
						projectRoot,
						buildOptions.indexHtmlTransformer,
						tsConfig,
					)
					debug.debug(
						`Loaded HTML transformer: ${buildOptions.indexHtmlTransformer}`,
					)
				} catch (error) {
					debug.error(
						`Failed to load HTML transformer: ${buildOptions.indexHtmlTransformer}`,
						error,
					)
					throw error
				}
			}

			const setupDuration = performance.now() - setupStartTime
			debug.debug(`Dev server setup completed in ${setupDuration.toFixed(2)}ms`)

			debug.trace("Extensions loaded", {
				middleware: middleware.length,
				plugins: buildPlugins.length,
				hasHtmlTransformer: !!indexHtmlTransformer,
			})

			return { middleware, buildPlugins, indexHtmlTransformer }
		}),
		// TODO: add proper extensions types once release by Angular/build
		switchMap((extensions) => {
			debug.debug("Executing Angular dev server with extensions")
			console.log() // create visual spacing
			return executeDevServerBuilder(options, context, extensions)
		}),
	)
}

export default createBuilder<ExtendedDevServerBuilderOptions & json.JsonObject>(
	executeBuilder,
)
