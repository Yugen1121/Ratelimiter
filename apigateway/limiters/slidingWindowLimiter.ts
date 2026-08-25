import { RateLimiter, LimiterResult } from "./types";
import { runScript } from "./scriptLoader";

export const slidingWindowLimiter: RateLimiter = {
    async check(keys , windowMs, max, submax): Promise<LimiterResult>{
        const now = Date.now();
        const [allowed, count] = await runScript("slidingWindow.lua",
             keys, 
             [windowMs, max, submax, now]
            ) as [number, number];
        
            return {
                allowed: allowed === 1,
                remaining: Math.max(0, max - count - (allowed === 1? 1 : 0)),
                resetMs: windowMs
            }
    }
}