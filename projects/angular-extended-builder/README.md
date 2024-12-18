# Angular Extended Builder

<!-- Intro section should stay in line with root readme -->

> Package is forked/copied and heavily inspired by https://github.com/just-jeb/angular-builders

I just build this package to provide/implement a more modern base for https://github.com/just-jeb/angular-builders and to extend it to my needs wherever I need to.

> [!CAUTION]
> I use this project for my needs and my companies Angular projects, it does not guarantee to work with your project nor do I want to implement edge cases. Please refer to angular-builders if you need that type of stability.

- [Usage](#usage)
- [Builders](#builders)
- [How to](#how-to)
  - [Esbuild Plugins](#esbuild-plugins)
  - [Index HTML Transformer](#index-html-transformer)
- [Versioning](#versioning)

## Usage

1. Install library
2. Replace `@angular/build` in `angular.json`'s build and serve with this library name
3. Replace `$schema` with `./node_modules/angular-extended-builder/dist/schema.json`
4. Run and customize

## Builders

| Name        | Options                                      |
| ----------- | -------------------------------------------- |
| application | [schema.json](./src/application/schema.json) |
| dev-server  | [schema.json](./src/dev-server/schema.json)  |

## How to

### Esbuild Plugins

Add a `plugins` section in your _angular.json_ at `projects.<>.architect.build.options` and add an array of relative file paths to your ESM esbuild Plugins. An example can be found here: https://github.com/muuvmuuv/angular-extended-builders/tree/main/projects/app

### Index HTML Transformer

Add a `indexHtmlTransformer` section in your _angular.json_ at `projects.<>.architect.build.options` and add the relative file path to your ESM script. An example can be found here: https://github.com/muuvmuuv/angular-extended-builders/tree/main/projects/app

## Versioning

The version of this library will always be aligned with the supported Angular version to provide type compatibility of underlying peer dependencies. Publishing fixes and patches will only effect the libs patch identifier. Major and minor releases will only be available once a Angular version has been published. During next, rc and beta releases, an additional number will be prepended instead.
