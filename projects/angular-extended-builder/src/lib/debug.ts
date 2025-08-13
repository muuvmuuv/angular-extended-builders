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

	error: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.ERROR)) return
		const prefix = `${colors.red}${PREFIX}${colors.reset}`
		console.error(`${prefix} ${colors.red}✗${colors.reset} ${message}`, ...args)
	},

	warn: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.WARN)) return
		const prefix = `${colors.yellow}${PREFIX}${colors.reset}`
		console.warn(
			`${prefix} ${colors.yellow}⚠${colors.reset} ${message}`,
			...args,
		)
	},

	info: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.INFO)) return
		const prefix = `${colors.cyan}${PREFIX}${colors.reset}`
		console.log(`${prefix} ${message}`, ...args)
	},

	success: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.INFO)) return
		const prefix = `${colors.green}${PREFIX}${colors.reset}`
		console.log(`${prefix} ${colors.green}✓${colors.reset} ${message}`, ...args)
	},

	debug: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.DEBUG)) return
		const prefix = `${colors.blue}${PREFIX}${colors.reset}`
		console.log(
			`${prefix} ${colors.dim}[debug]${colors.reset} ${message}`,
			...args,
		)
	},

	loading: (message: string, ...args: unknown[]) => {
		if (!shouldLog(LogLevel.DEBUG)) return
		const prefix = `${colors.blue}${PREFIX}${colors.reset}`
		console.log(`${prefix} ${colors.blue}⋯${colors.reset} ${message}`, ...args)
	},

	trace: (label: string, data: unknown) => {
		if (!shouldLog(LogLevel.TRACE)) return
		const prefix = `${colors.magenta}${PREFIX}${colors.reset}`
		const formatted = inspect(data, { colors: true, depth: 3 })
		console.log(
			`${prefix} ${colors.dim}[trace:${label}]${colors.reset}\n${formatted}`,
		)
	},

	time: (label: string) => {
		if (!shouldLog(LogLevel.DEBUG)) return
		console.time(`${colors.cyan}${PREFIX}${colors.reset} ${label}`)
	},

	timeEnd: (label: string) => {
		if (!shouldLog(LogLevel.DEBUG)) return
		console.timeEnd(`${colors.cyan}${PREFIX}${colors.reset} ${label}`)
	},
}
