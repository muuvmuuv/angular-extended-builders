# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Origin and Inspiration

This package is forked/inspired by [angular-builders](https://github.com/just-jeb/angular-builders), which provides custom builders for Angular build facade. While angular-builders offers excellent functionality, this fork was created to:
- Provide a more modern base implementation
- Remove legacy dependency requirements
- Focus specifically on esbuild extensions
- Align with the latest Angular build system (`@angular/build`)

### Learning from angular-builders

The original angular-builders repository implements several patterns worth considering:

1. **Multiple Plugin Definition Styles**: They support single plugin export, array of plugins, and factory functions - providing more flexibility than our current implementation
2. **Builder Variety**: They offer webpack, jest, bazel, and other builders - showing the extensibility potential
3. **Configuration Inheritance**: Their approach to configuration merging could enhance our schema generation
4. **Community Ecosystem**: They maintain a plugin ecosystem that we could learn from or potentially support

Consider analyzing their implementation when:
- Adding new builder types beyond application/dev-server
- Implementing more flexible plugin loading mechanisms
- Enhancing configuration options
- Building compatibility layers for existing angular-builders plugins

## Commands

### Main workspace (root)
- `pnpm watch` - Watch and build the angular-extended-builder package
- `pnpm build` - Build the angular-extended-builder package
- `pnpm build-app` - Build the demo app
- `pnpm serve` - Serve the demo app with hot reload
- `pnpm lint` - Run Biome linter on entire codebase
- `pnpm format` - Run Biome formatter with auto-fix

### Angular Extended Builder package (`projects/angular-extended-builder/`)
- `pnpm watch` - Watch TypeScript files and rebuild on changes
- `pnpm build` - Build the package (runs TypeScript compilation and schema generation)
- `pnpm release` - Build and publish the package to npm
- `ng build` - Build using ng-packagr

### Demo App (`projects/app/`)
- `ng build` - Build the app using the custom builder
- `ng serve` - Serve the app with development server
- `pnpm graphql` - Generate GraphQL types using graphql-codegen

## Architecture

This monorepo contains an Angular builder extension package that provides enhanced functionality for Angular's build system, particularly around esbuild plugins and HTML transformations.

### Key Components

1. **Angular Extended Builder** (`projects/angular-extended-builder/`)
   - Custom Angular builders that extend `@angular/build`
   - Two main builders: `application` and `dev-server`
   - Supports custom esbuild plugins and index HTML transformers
   - Uses dynamic module loading to load ESM plugins at build time

2. **Demo Application** (`projects/app/`)
   - Example Angular app showcasing the builder features
   - Contains example esbuild plugins in `plugins/` directory:
     - `esbuild-define.mjs` - Define environment variables
     - `esbuild-graphql.mjs` - Load GraphQL files
     - `index-html-transform.mjs` - Transform index.html
   - Uses GraphQL with Apollo Client for SpaceX API integration

### Builder Extension System

The builders work by:
1. Accepting additional configuration options (`plugins` and `indexHtmlTransformer`)
2. Loading ESM modules dynamically from provided file paths
3. Passing these extensions to Angular's native `buildApplication` function

Key files for understanding the builder:
- `projects/angular-extended-builder/src/lib/application/index.ts` - Main application builder
- `projects/angular-extended-builder/src/lib/load-plugins.ts` - Plugin loading logic
- `projects/angular-extended-builder/src/lib/load-module.ts` - Dynamic ESM module loader

### Usage Pattern

To use this builder in an Angular project:
1. Install the package
2. Replace `@angular/build` with `angular-extended-builder` in angular.json
3. Update schema to `./node_modules/angular-extended-builder/dist/schema.json`
4. Add `plugins` array with paths to ESM esbuild plugins
5. Optionally add `indexHtmlTransformer` with path to transformer module

## Development Notes

- This is a pnpm workspace with Node.js 20+ requirement
- Uses Biome for linting/formatting instead of ESLint/Prettier
- TypeScript 5.8.2 with strict configuration
- Follows Angular's versioning (major.minor matches Angular version)
- The main package uses CommonJS output while plugins use ESM

## Deep Architecture Insights

### Schema Generation Process

The `schemes.mjs` file is crucial for TypeScript support in `angular.json`. It:
1. Merges Angular's original builder schemas with custom extensions
2. Creates a custom `angular.json` schema that includes type definitions for the extended builders
3. Registers `angular-extended-builder:application` and `angular-extended-builder:dev-server` as valid builders
4. Outputs the merged schema to `dist/schema.json` during build

This enables IDE autocomplete and validation for the custom builder options.

### Application Builder Extensions

The application builder (`src/lib/application/index.ts`) extends `@angular/build` with:
- **plugins**: Array of esbuild plugin paths that are loaded and passed to the build process
- **indexHtmlTransformer**: Path to a function that transforms the final HTML output

Example esbuild plugin structure:
```javascript
export default {
  name: "plugin-name",
  setup: async ({ initialOptions }) => {
    // Modify esbuild options
  }
}
```

Example HTML transformer:
```javascript
export default function transformer(html) {
  // Transform and return HTML string
}
```

### Dev Server Builder Extensions

The dev-server builder (`src/lib/dev-server/index.ts`) adds:
- **middlewares**: Array of Vite middleware functions for the development server
- Inherits all build options from the application builder (plugins, indexHtmlTransformer)

The dev-server retrieves build target options and merges them with dev-server specific options, ensuring plugin and transformer configurations are shared.

### Module Loading System

The `load-module.ts` file handles dynamic loading of ESM modules with TypeScript support:
- Uses `ts-node` for on-the-fly TypeScript compilation
- Configures `tsconfig-paths` for path resolution
- Supports both `.mjs` and `.ts` plugin files

### Plugin Examples from Demo App

1. **esbuild-define.mjs**: Injects build-time constants
   - BUILD_ENV, BUILD_DATE, APP_VERSION, APP_HASH, NONCE
   - Values are made available globally in the application

2. **index-html-transform.mjs**: Post-processes the built HTML
   - Replaces placeholders like `{nonce}` and `{csp}`
   - Configures Content Security Policy
   - Minifies the final HTML output

These examples demonstrate the power of extending Angular's build system without forking or patching the core builders.