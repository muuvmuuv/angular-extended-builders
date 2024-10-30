import { writeFileSync } from "node:fs"

function merge(obj1, obj2) {
	for (const key in obj2) {
		if (obj1[key] instanceof Object) {
			obj1[key] = merge(obj1[key], obj2[key])
		} else {
			obj1[key] = obj2[key]
		}
	}
	return obj1
}

// ----------------------------------------
// Create Schema: Application

import originalApplicationSchema from "./node_modules/@angular/build/src/builders/application/schema.json" with {
	type: "json",
}
import extendedApplicationSchema from "./src/application/schema.json" with { type: "json" }

const applicationSchema = merge(originalApplicationSchema, extendedApplicationSchema)

writeFileSync("./dist/application/schema.json", JSON.stringify(applicationSchema, null, 2))

// ----------------------------------------
// Create Schema: Dev-server

import originalDevServerSchema from "./node_modules/@angular/build/src/builders/dev-server/schema.json" with {
	type: "json",
}
import extendedDevServerSchema from "./src/dev-server/schema.json" with { type: "json" }

const devServerSchema = merge(originalDevServerSchema, extendedDevServerSchema)

writeFileSync("./dist/dev-server/schema.json", JSON.stringify(devServerSchema, null, 2))

// ----------------------------------------
// Create Schema: angular.json

import angularSchema from "@angular/cli/lib/config/schema.json" with { type: "json" }

// Exclude from one-of-not since we add definitions now

angularSchema.definitions.project.definitions.target.oneOf[0].properties.builder.not.enum.push(
	"angular-extended-builder:application",
	"angular-extended-builder:dev-server",
)

// Add application definition

angularSchema.definitions.project.definitions.target.oneOf.push({
	type: "object",
	additionalProperties: false,
	properties: {
		builder: {
			const: "angular-extended-builder:application",
		},
		defaultConfiguration: {
			type: "string",
			description:
				"A default named configuration to use when a target configuration is not provided.",
		},
		options: {
			$ref: "#/definitions/ExtendedApplicationBuilderSchema",
		},
		configurations: {
			type: "object",
			additionalProperties: {
				$ref: "#/definitions/ExtendedApplicationBuilderSchema",
			},
		},
	},
})

angularSchema.definitions.ExtendedApplicationBuilderSchema = merge(
	angularSchema.definitions.AngularBuildBuildersApplicationSchema,
	extendedApplicationSchema,
)

// Add dev-server definition

angularSchema.definitions.project.definitions.target.oneOf.push({
	type: "object",
	additionalProperties: false,
	properties: {
		builder: {
			const: "angular-extended-builder:dev-server",
		},
		defaultConfiguration: {
			type: "string",
			description:
				"A default named configuration to use when a target configuration is not provided.",
		},
		options: {
			$ref: "#/definitions/ExtendedDevServerBuilderSchema",
		},
		configurations: {
			type: "object",
			additionalProperties: {
				$ref: "#/definitions/ExtendedDevServerBuilderSchema",
			},
		},
	},
})

angularSchema.definitions.ExtendedDevServerBuilderSchema = merge(
	angularSchema.definitions.AngularBuildBuildersDevServerSchema,
	extendedDevServerSchema,
)

writeFileSync("./dist/schema.json", JSON.stringify(angularSchema, null, 2))
