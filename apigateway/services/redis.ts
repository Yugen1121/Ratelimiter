// services/redis.ts
import { createClient } from 'redis'

export const redisClient = createClient({
    url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.log("redis connection error", err)
});

export async function connectRedis() {
    if (redisClient.isOpen) return;
    try {
        await redisClient.connect();
        console.log('Successfully connected to Redis');
    } catch (error) {
        console.error("Failed to connect to the redis server", error);
        throw error;
    }
}

