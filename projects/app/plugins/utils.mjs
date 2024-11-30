import { execSync } from "node:child_process"
import fs from "node:fs"
import { fileURLToPath } from "node:url"

/**
 * Get environment name.
 *
 * @returns {string}
 */
export function getEnvironment() {
	return process.env.NODE_ENV || "development"
}

/**
 * Get project version.
 *
 * @returns {string}
 */
export function getVersion() {
	const file = fileURLToPath(new URL("../package.json", import.meta.url))
	/** @type {import('type-fest').PackageJson} */
	const { version } = JSON.parse(fs.readFileSync(file))
	if (!version) {
		throw new Error("Package version not found or defined")
	}
	return version
}

/**
 * Get project git commit hash.
 *
 * @returns {string}
 */
export function getHash() {
	try {
		return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim()
	} catch {
		return process.env.CI_COMMIT_SHORT_SHA ?? "0000000"
	}
}
