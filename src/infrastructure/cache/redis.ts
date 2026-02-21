import Redis from "ioredis";
import logger from "../logging/logger";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
});

redis.on("error", (err) => {
    logger.error({ err }, "Redis Connection Error");
});

redis.on("connect", () => {
    logger.info("Redis Connected Successfully");
});

export const cache = {
    async get<T>(key: string): Promise<T | null> {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    },
    async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
        const stringValue = JSON.stringify(value);
        if (ttlSeconds) {
            await redis.set(key, stringValue, "EX", ttlSeconds);
        } else {
            await redis.set(key, stringValue);
        }
    },
    async del(key: string): Promise<void> {
        await redis.del(key);
    },
};

export default redis;
