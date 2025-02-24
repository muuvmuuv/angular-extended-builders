import type { createCompilerPlugin } from "@angular/build/private"

/**
 * Type definition for esbuild plugin extracted to avoid importing esbuild directly
 * and having type incompatibilities.
 */
export type Plugin = ReturnType<typeof createCompilerPlugin>
