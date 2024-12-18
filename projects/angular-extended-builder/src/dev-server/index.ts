import path from "node:path"
import {
	type BuilderContext,
	createBuilder,
	targetFromTargetString,
} from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { type DevServerBuilderOutput, executeDevServerBuilder } from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { type Observable, from, switchMap } from "rxjs"

import { loadModule } from "../load-module.js"
import { loadPlugins } from "../load-plugins.js"
import type {
	ExtendedDevServerBuilderOptions,
	ResolvedExtendedDevServerBuilderOptions,
} from "../schema.js"
import type { Middleware } from "./types.js"

function executeBuilder(
	options: ExtendedDevServerBuilderOptions,
	context: BuilderContext,
): Observable<DevServerBuilderOutput> {
	const buildTarget = targetFromTargetString(options.buildTarget)
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))

	return from(
		// This will combine all options from the executed and build target
		context.getTargetOptions(
			buildTarget,
		) as unknown as Promise<ResolvedExtendedDevServerBuilderOptions>,
	).pipe(
		switchMap(async (buildOptions) => {
			const tsConfig = path.join(workspaceRoot, buildOptions.tsConfig)

			const middleware: Middleware[] = []

			// Keep middleware order
			for (const middlewarePath of options.middlewares ?? []) {
				middleware.push(
					await loadModule<Middleware>(path.join(workspaceRoot, middlewarePath), tsConfig),
				)
			}

			const buildPlugins = await loadPlugins(buildOptions.plugins, workspaceRoot, tsConfig)

			const indexHtmlTransformer = buildOptions.indexHtmlTransformer
				? await loadModule<IndexHtmlTransform>(
						path.join(workspaceRoot, buildOptions.indexHtmlTransformer),
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
