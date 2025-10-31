import process from "node:process"
import { inspect } from "node:util"

export const LogLevel = {
	ERROR: 0,
	WARN: 1,
	INFO: 2,
	DEBUG: 3,
	TRACE: 4,
} as const
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]

const LOG_LEVEL_NAMES = {
	error: LogLevel.ERROR,
	warn: LogLevel.WARN,
	info: LogLevel.INFO,
	debug: LogLevel.DEBUG,
	trace: LogLevel.TRACE,
} as const
export type LOG_LEVEL_NAMES =
	(typeof LOG_LEVEL_NAMES)[keyof typeof LOG_LEVEL_NAMES]

const LOG_LEVEL = (() => {
	const level = process.env.ANGULAR_EXTENDED_BUILDER

	if (!level) {
		return LogLevel.INFO
	}

	// If a valid log level name is provided, use it
	if (level in LOG_LEVEL_NAMES) {
		return LOG_LEVEL_NAMES[level as keyof typeof LOG_LEVEL_NAMES]
	}

	return LogLevel.INFO
})()

const colors = {
	reset: "\x1b[0m",
	dim: "\x1b[2m",
	cyan: "\x1b[36m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
	magenta: "\x1b[35m",
	blue: "\x1b[34m",
} as const

const PREFIX = "[angular-extended-builder]"

const shouldLog = (level: LogLevel): boolean => {
	return LOG_LEVEL !== null && LOG_LEVEL >= level
}

export const debug = {
	enabled: LOG_LEVEL !== null,
	level: LOG_LEVEL,

	error: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.ERROR)) {
			return
		}
		const _prefix = `${colors.red}${PREFIX}${colors.reset}`
	},

	warn: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.WARN)) {
			return
		}
		const _prefix = `${colors.yellow}${PREFIX}${colors.reset}`
	},

	info: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.INFO)) {
			return
		}
		const _prefix = `${colors.cyan}${PREFIX}${colors.reset}`
	},

	success: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.INFO)) {
			return
		}
		const _prefix = `${colors.green}${PREFIX}${colors.reset}`
	},

	debug: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.DEBUG)) {
			return
		}
		const _prefix = `${colors.blue}${PREFIX}${colors.reset}`
	},

	loading: (_message: string, ..._args: unknown[]) => {
		if (!shouldLog(LogLevel.DEBUG)) {
			return
		}
		const _prefix = `${colors.blue}${PREFIX}${colors.reset}`
	},

	trace: (_label: string, data: unknown) => {
		if (!shouldLog(LogLevel.TRACE)) {
			return
		}
		const _prefix = `${colors.magenta}${PREFIX}${colors.reset}`
		const _formatted = inspect(data, { colors: true, depth: 3 })
	},
}
