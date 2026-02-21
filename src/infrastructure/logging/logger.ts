import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport: isDev
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                ignore: "pid,hostname",
                translateTime: "SYS:standard",
            },
        }
        : undefined,
    base: {
        env: process.env.NODE_ENV,
    },
});

export default logger;
export const log = logger;
export const info = logger.info.bind(logger);
export const error = logger.error.bind(logger);
export const warn = logger.warn.bind(logger);
export const debug = logger.debug.bind(logger);
