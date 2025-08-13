import path from "node:path"
import {
	type ApplicationBuilderExtensions,
	buildApplication,
} from "@angular/build"
import type { IndexHtmlTransform } from "@angular/build/private"
import { type BuilderContext, createBuilder } from "@angular-devkit/architect"
import { getSystemPath, type json, normalize } from "@angular-devkit/core"
import { defer, switchMap } from "rxjs"

import type { ExtendedApplicationBuilderOptions } from "../../schema"
import { loadModule } from "../load-module"
import { loadPlugins } from "../load-plugins"

function executeBuilder(
	options: ExtendedApplicationBuilderOptions,
	context: BuilderContext,
) {
	const workspaceRoot = getSystemPath(normalize(context.workspaceRoot))
	const tsConfig = path.join(workspaceRoot, options.tsConfig)

	return defer(async (): Promise<ApplicationBuilderExtensions> => {
		// Get project metadata to determine project root
		const projectName = context.target?.project
		const projectMetadata = projectName
			? await context.getProjectMetadata(projectName)
			: null
		const projectRoot = projectMetadata?.root
			? path.join(workspaceRoot, projectMetadata.root.toString())
			: workspaceRoot
		const codePlugins = await loadPlugins(
			options.plugins,
			projectRoot,
			tsConfig,
		)

		const indexHtmlTransformer = options.indexHtmlTransformer
			? await loadModule<IndexHtmlTransform>(
					projectRoot,
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

export default createBuilder<
	ExtendedApplicationBuilderOptions & json.JsonObject
>(executeBuilder)
