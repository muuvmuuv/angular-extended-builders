import * as path from "node:path"
import { type BuilderContext, createBuilder } from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { type ApplicationBuilderExtensions, buildApplication } from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { defer, switchMap } from "rxjs"

import { loadModule, loadPlugins } from "../load-plugins.js"
import type { ExtendedApplicationBuilderOptions } from "../schema.js"

function executeBuilder(options: ExtendedApplicationBuilderOptions, context: BuilderContext) {
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))

	return defer(async (): Promise<ApplicationBuilderExtensions> => {
		context.reportStatus("Fetching plugins")

		const codePlugins = await loadPlugins(options.plugins, workspaceRoot)

		context.reportStatus("Fetching index transformer")

		const indexHtmlTransformer = options.indexHtmlTransformer
			? await loadModule<IndexHtmlTransform>(
					path.join(workspaceRoot, options.indexHtmlTransformer),
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
