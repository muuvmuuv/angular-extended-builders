# Angular Extended Builder

<!-- Intro section should stay in line with root readme -->

> Package is forked/copied and heavily inspired by https://github.com/just-jeb/angular-builders

I just build this package to provide/implement a more modern base for https://github.com/just-jeb/angular-builders and to extend it to my needs wherever I need to.

> [!CAUTION]
> I use this project for my needs and my companies Angular projects, it does not guarantee to work with your project nor do I want to implement edge cases. Please refer to angular-builders if you need that type of stability.

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

## Versioning

Version is always aligned with Angular version to provide type compatibility. Hot fixes and fixes will be available through `+X.X` (e.g. `19.0.0+0.1`) releases. Patches and minor release will wait until next Angular release or release candidate.
