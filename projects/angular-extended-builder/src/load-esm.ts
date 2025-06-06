// https://github.com/angular/angular-cli/blob/main/packages/angular/build/src/utils/load-esm.ts

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

/**
 * Lazily compiled dynamic import loader function.
 */
let load: (<T>(modulePath: string | URL) => Promise<T>) | undefined

/**
 * This uses a dynamic import to load a module which may be ESM.
 * CommonJS code can load ESM code via a dynamic import. Unfortunately, TypeScript
 * will currently, unconditionally downlevel dynamic import into a require call.
 * require calls cannot load ESM code and will result in a runtime error. To workaround
 * this, a Function constructor is used to prevent TypeScript from changing the dynamic import.
 * Once TypeScript provides support for keeping the dynamic import this workaround can
 * be dropped.
 *
 * @param modulePath The path of the module to load.
 * @returns A Promise that resolves to the dynamically imported module.
 */
export function loadEsmModule<T>(modulePath: string | URL): Promise<T> {
	load ??= new Function("modulePath", "return import(modulePath);") as Exclude<
		typeof load,
		undefined
	>

	return load(modulePath)
}
