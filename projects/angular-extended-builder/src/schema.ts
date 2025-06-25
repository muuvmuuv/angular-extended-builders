import type {
	ApplicationBuilderOptions,
	DevServerBuilderOptions,
} from "@angular/build"

export type ExtendedApplicationBuilderOptions = ApplicationBuilderOptions & {
	plugins?: string[]
	indexHtmlTransformer?: string
}

export type ExtendedDevServerBuilderOptions = DevServerBuilderOptions & {
	middlewares?: string[]
}

export type ResolvedExtendedDevServerBuilderOptions =
	ExtendedApplicationBuilderOptions & ExtendedDevServerBuilderOptions
