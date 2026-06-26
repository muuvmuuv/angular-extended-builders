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
- `pnpm build-app` - Build the demo app (with debug logging enabled)
- `pnpm serve` - Serve the demo app with hot reload
- `pnpm check` - Run oxlint and oxfmt checks on entire codebase
- `pnpm format` - Run oxlint --fix and oxfmt to auto-fix

### Testing Changes

When testing changes to the angular-extended-builder library, always use the root scripts:

1. **`pnpm build`** - Build the library first
2. **`pnpm build-app`** - Test the build output with the demo app
3. **`pnpm serve`** - Test dev server functionality
4. **`pnpm watch`** - Watch for changes during development

### Workspace-specific commands

Run commands in specific workspace projects using `pnpm --filter`:

- `pnpm --filter=angular-extended-builder <command>` - Run command in builder package
- `pnpm --filter=app <command>` - Run command in demo app
- `pnpm --filter=app graphql` - Generate GraphQL types in demo app

**Important**: Always run `check` and `format` from the root directory as they operate on the entire workspace. No need to `cd` into individual project directories - use pnpm workspace filtering instead.

### Debug Logging

Set the `ANGULAR_EXTENDED_BUILDER` environment variable to control log verbosity:

- `error` - Errors only
- `warn` - Errors and warnings
- `info` - Default level (errors, warnings, info)
- `debug` - Includes debug messages and performance metrics
- `trace` - Maximum verbosity with full data inspection

Example: `ANGULAR_EXTENDED_BUILDER=debug pnpm build-app`

The `pnpm build-app` script already sets this to `debug` automatically.

## Release Process

This package follows Angular's versioning scheme (major.minor matches Angular version) and uses a manual release workflow:

### 1. Version Management

- **Versioning**: Follows Angular's version (e.g., `21.0.2` for Angular 21)
- **Location**: Version is defined in `projects/angular-extended-builder/package.json`
- **Alignment**: Keep major.minor versions aligned with supported Angular version

### 2. Pre-release Checklist

Before creating a release:

1. **Update dependencies** if needed (especially Angular peer dependencies)
2. **Run full test suite**:
   ```bash
   pnpm build        # Build the library
   pnpm build-app    # Test with demo app
   pnpm check        # Check code quality and formatting
   ```
3. **Update version** in `projects/angular-extended-builder/package.json`
4. **Test the built package** works in a real Angular project

### 3. Publishing

The package uses a one-step release process:

```bash
pnpm release
```

### 4. Post-release

After publishing:

1. **Tag the release** in git with version number
2. **Create GitHub release** with changelog
3. **Update documentation** if API changes were made
4. **Test installation** in a fresh Angular project

### 5. Release Notes

When creating releases, document:

- **New features** and builder enhancements
- **Breaking changes** and migration guides
- **Bug fixes** and performance improvements
- **Dependency updates** (especially Angular version support)

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
     - `esbuild-define.ts` - Define environment variables
     - `index-html-transform.mjs` - Transform index.html
   - Uses GraphQL with Apollo Client for Rick and Morty API integration

3. **esbuild GraphQL Plugin** (`projects/esbuild-graphql/`)
   - Standalone workspace package (`@project/esbuild-graphql`)
   - esbuild plugin that loads `.graphql`/`.gql` files as JavaScript modules
   - Parses GraphQL documents and generates exports for each operation

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

- This is a pnpm workspace with Node.js 24+ requirement (managed by Proto)
- Uses [Oxc](https://oxc.rs/) toolchain for linting (oxlint) and formatting (oxfmt) instead of ESLint/Prettier
- TypeScript version is automatically synced with Angular's requirements via `upgrade.fish`
- Follows Angular's versioning (major.minor matches Angular version)
- The main package uses CommonJS output while plugins use ESM
- Commit messages follow the [Angular commit convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format), enforced by commitlint via lefthook pre-commit hooks

### Binary Management

This project uses [Proto](https://moonrepo.dev/proto) (.prototools) to manage binary versions:

- **Node.js**: ^24.15.0 (managed by Proto)
- **pnpm**: ^10.20.0 (managed by Proto)

**Important**: When updating dependencies, be careful not to accidentally update `@types/node` to versions incompatible with the Node.js version specified in .prototools. The upgrade scripts should respect the Node.js version constraint.

### Git Hooks (lefthook)

Pre-commit hooks run automatically:

- **oxlint**: Lints staged JS/TS files
- **oxfmt**: Checks formatting of staged files
- **commitlint**: Validates commit messages against the Angular convention

### Upgrading Angular

The `upgrade.fish` script automates Angular version upgrades:

1. Updates `@angular/cli` in both the builder and demo app
2. Updates `@angular/core` in the demo app
3. Syncs TypeScript version to match Angular's peer dependency
4. Runs `pnpm update -r` and `pnpm outdated -r`

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
	},
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

- Uses `tsx` for fast TypeScript compilation via esbuild
- Built-in TypeScript path resolution support
- Supports both `.mjs` and `.ts` plugin files
- Optimized for performance with minimal configuration overhead

### Plugin Examples from Demo App

1. **esbuild-define.ts**: Injects build-time constants
   - BUILD_ENV, BUILD_DATE, APP_VERSION, APP_HASH, NONCE
   - Values are made available globally in the application

2. **index-html-transform.mjs**: Post-processes the built HTML
   - Replaces placeholders like `{nonce}` and `{csp}`
   - Configures Content Security Policy
   - Minifies the final HTML output

These examples demonstrate the power of extending Angular's build system without forking or patching the core builders.
