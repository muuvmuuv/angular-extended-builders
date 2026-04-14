# Angular Extended Builder

> Forked/inspired by [angular-builders](https://github.com/just-jeb/angular-builders)

Custom Angular builders that extend `@angular/build` with support for esbuild plugins, index HTML transformers, and Vite dev-server middlewares.

- [Installation](#installation)
- [Builders](#builders)
- [How to](#how-to)
  - [Esbuild Plugins](#esbuild-plugins)
  - [Index HTML Transformer](#index-html-transformer)
  - [Dev Server Middlewares](#dev-server-middlewares)
- [Version Compatibility](#version-compatibility)

## Installation

```bash
npm install angular-extended-builder --save-dev
# or
pnpm add -D angular-extended-builder
```

## Setup

1. Update your `angular.json` to use the extended builders:

```jsonc
{
	"$schema": "./node_modules/angular-extended-builder/dist/schema.json",
	"projects": {
		"my-app": {
			"architect": {
				"build": {
					"builder": "angular-extended-builder:application",
					"options": {
						"plugins": ["./plugins/my-esbuild-plugin.ts"],
						"indexHtmlTransformer": "./plugins/index-html-transform.mjs",
						// ... your existing build options
					},
				},
				"serve": {
					"builder": "angular-extended-builder:dev-server",
					"options": {
						"middlewares": ["./plugins/my-middleware.ts"],
					},
				},
			},
		},
	},
}
```

2. The `$schema` path enables IDE autocomplete and validation for the extended options.

## Builders

| Name        | Extended Options                                 |
| ----------- | ------------------------------------------------ |
| application | [schema.json](./src/lib/application/schema.json) |
| dev-server  | [schema.json](./src/lib/dev-server/schema.json)  |

## How to

### Esbuild Plugins

Add a `plugins` array in your `angular.json` at `projects.<name>.architect.build.options`. Each entry is a path to an ESM/TypeScript module that exports an esbuild plugin:

```typescript
// plugins/my-plugin.ts
import type { Plugin } from "esbuild"

export default {
	name: "my-plugin",
	setup(build) {
		build.onResolve({ filter: /\.custom$/ }, (args) => {
			return { path: args.path, namespace: "custom" }
		})
	},
} satisfies Plugin
```

Plugins can also be referenced as npm package names (e.g., `"@project/esbuild-graphql"`).

Examples: [projects/app/plugins](https://github.com/muuvmuuv/angular-extended-builders/tree/main/projects/app/plugins)

### Index HTML Transformer

Add an `indexHtmlTransformer` path in your `angular.json` at `projects.<name>.architect.build.options`. The module should export a default function that receives the HTML string and returns a transformed HTML string:

```javascript
// plugins/index-html-transform.mjs
export default function transform(html) {
	return html.replace("{placeholder}", "value")
}
```

Example: [projects/app/plugins/index-html-transform.mjs](https://github.com/muuvmuuv/angular-extended-builders/tree/main/projects/app/plugins/index-html-transform.mjs)

### Dev Server Middlewares

Add a `middlewares` array in your `angular.json` at `projects.<name>.architect.serve.options`. Each entry is a path to a module that exports a Vite-compatible middleware function:

```typescript
// plugins/my-middleware.ts
import type { IncomingMessage, ServerResponse } from "node:http"

export default function middleware(
	req: IncomingMessage,
	res: ServerResponse,
	next: (err?: unknown) => void,
) {
	// Handle request or call next()
	next()
}
```

## Version Compatibility

The major and minor version of this library aligns with the supported Angular version:

| angular-extended-builder | Angular | Node.js |
| ------------------------ | ------- | ------- |
| 21.x                     | 21.x    | >= 22   |
| 20.x                     | 20.x    | >= 20   |

Patch releases contain bug fixes and enhancements only. Major and minor releases follow Angular's release cycle.
