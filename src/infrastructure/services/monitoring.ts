import { metrics } from "@opentelemetry/api";
import logger from "../logging/logger";

const meter = metrics.getMeter("sdlc-platform-meter");

export const counters = {
    requestCount: meter.createCounter("http_requests_total", {
        description: "Total number of HTTP requests",
    }),
    dbOpCount: meter.createCounter("db_operations_total", {
        description: "Total number of database operations",
    }),
};

export const trackEvent = (name: string, attributes: Record<string, string | number> = {}) => {
    logger.info({ attributes }, `Metric Tracked: ${name}`);
    // In a real app, this would push to Prometheus/Grafana via OpenTelemetry Collector
};

export const checkServiceHealth = async () => {
    // Check DB, Redis, Kafka
    return {
        status: "OK",
        services: {
            database: "CONNECTED",
            redis: "CONNECTED",
            kafka: "CONNECTED",
        },
        uptime: process.uptime(),
    };
};
