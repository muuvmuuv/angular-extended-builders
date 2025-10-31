/** biome-ignore-all lint/style/noDefaultExport: required here */

import process from "node:process"
import { minify } from "html-minifier-terser"

export default function indexTransformer(compiledHtml = "") {
	let html = compiledHtml

	const { NODE_ENV, NONCE } = process.env
	const isProduction = NODE_ENV === "production"

	html = html.replaceAll("{nonce}", NONCE)

	const customerApis = isProduction
		? "https://spacex-production.up.railway.app"
		: "https://spacex-production.up.railway.app"

	const csp = [
		"default-src 'self'",
		`connect-src 'self' blob: ${customerApis}`,
		"frame-src 'self'",
		"style-src 'self' 'unsafe-inline'",
		"style-src-elem 'self' 'unsafe-inline'",
		"script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
		"script-src-elem 'self'",
		`img-src 'self' data: ${customerApis}`,
		"font-src 'self' data:",
		"worker-src 'self' blob:",
	]
	if (isProduction) {
		csp.push(
			// TODO: Trust-Types not yet ready for other browsers
			// 'trusted-types angular angular#bundler angular#unsafe-bypass',
			// "require-trusted-types-for 'script'",
			"upgrade-insecure-requests",
			"block-all-mixed-content",
		)
	}
	html = html.replaceAll("{csp}", csp.join(";"))

	return minify(html, {
		removeComments: true,
		collapseWhitespace: true,
		collapseInlineTagWhitespace: true,
		collapseBooleanAttributes: true,
		decodeEntities: true,
		minifyCSS: true,
		minifyJS: true,
	})
}
