import * as path from "node:path"
import {
	type BuilderContext,
	createBuilder,
	targetFromTargetString,
} from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { type DevServerBuilderOutput, executeDevServerBuilder } from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { type Observable, from, switchMap } from "rxjs"

import { loadModule, loadPlugins } from "../load-plugins.js"
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

	context.reportStatus("Starting target fetching")

	return from(
		// This will combine all options from the executed and build target
		context.getTargetOptions(
			buildTarget,
		) as unknown as Promise<ResolvedExtendedDevServerBuilderOptions>,
	).pipe(
		switchMap(async (buildOptions) => {
			context.reportStatus("Fetching middlewares")

			const middleware: Middleware[] = []

			for (const middlewarePath of options.middlewares ?? []) {
				middleware.push(
					await loadModule<Middleware>(path.join(workspaceRoot, middlewarePath)),
				)
			}

			context.reportStatus("Loading plugins")

			const buildPlugins = await loadPlugins(buildOptions.plugins, workspaceRoot)

			context.reportStatus("Loading index transformer")

			const indexHtmlTransformer = buildOptions.indexHtmlTransformer
				? await loadModule<IndexHtmlTransform>(
						path.join(workspaceRoot, buildOptions.indexHtmlTransformer),
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
