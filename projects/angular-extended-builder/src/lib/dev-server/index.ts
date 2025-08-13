import path from "node:path"
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
			const projectRoot = projectMetadata?.root
				? path.join(workspaceRoot, projectMetadata.root.toString())
				: workspaceRoot
			const tsConfig = path.join(workspaceRoot, buildOptions.tsConfig)

			const middleware: Middleware[] = []

			// Keep middleware order
			for (const middlewarePath of options.middlewares ?? []) {
				middleware.push(
					await loadModule<Middleware>(projectRoot, middlewarePath, tsConfig),
				)
			}

			const buildPlugins = await loadPlugins(
				buildOptions.plugins,
				projectRoot,
				tsConfig,
			)

			const indexHtmlTransformer = buildOptions.indexHtmlTransformer
				? await loadModule<IndexHtmlTransform>(
						projectRoot,
						buildOptions.indexHtmlTransformer,
						tsConfig,
					)
				: undefined

			return { middleware, buildPlugins, indexHtmlTransformer }
		}),
		// TODO: add proper extensions types once release by Angular/build
		switchMap((extensions) => {
			return executeDevServerBuilder(options, context, extensions)
		}),
	)
}

export default createBuilder<ExtendedDevServerBuilderOptions & json.JsonObject>(
	executeBuilder,
)
