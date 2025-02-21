import path from "node:path"
import { type BuilderContext, createBuilder } from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { type ApplicationBuilderExtensions, buildApplication } from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { defer, switchMap } from "rxjs"

import { loadModule } from "../load-module.js"
import { loadPlugins } from "../load-plugins.js"
import type { ExtendedApplicationBuilderOptions } from "../schema.js"

function executeBuilder(options: ExtendedApplicationBuilderOptions, context: BuilderContext) {
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))
	const tsConfig = path.join(workspaceRoot, options.tsConfig)

	return defer(async (): Promise<ApplicationBuilderExtensions> => {
		const codePlugins = await loadPlugins(options.plugins, workspaceRoot, tsConfig)

		const indexHtmlTransformer = options.indexHtmlTransformer
			? await loadModule<IndexHtmlTransform>(
					workspaceRoot,
					options.indexHtmlTransformer,
					tsConfig,
				)
			: undefined

		return { codePlugins, indexHtmlTransformer }
	}).pipe(
		switchMap((extensions) => {
			return buildApplication(options, context, extensions)
		}),
	)
}

export default createBuilder<ExtendedApplicationBuilderOptions & json.JsonObject>(
	executeBuilder,
)
