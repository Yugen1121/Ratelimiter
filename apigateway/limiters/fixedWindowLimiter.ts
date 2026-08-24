import { runScript } from "./scriptLoader";
import { LimiterResult, RateLimiter } from "./types";


export const fixedWindowLimiter: RateLimiter = {
    async check(keys, windowMs, max): Promise<LimiterResult> {
        const [allowed, count, ttl] = await runScript("fixedWindow.lua",
            keys,
            [windowMs, max]
        ) as [number, number, number];
        return {
            allowed: allowed === 1,
            resetMs: ttl > 0 ? ttl: windowMs,
            remaining: Math.max(max - count)
        }
    } 
}