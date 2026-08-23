import { RateLimiter, LimiterResult } from "./types";
import { runScript } from "./scriptLoader";

const slidingWindowLimiter: RateLimiter = {
    async check(keys , windowMs, max): Promise<LimiterResult>{
        const now = Date.now();
        const [allowed, count] = await runScript("slidingwindow.lua",
             keys, 
             [windowMs, max, now]
            ) as [number, number];
        
            return {
                allowed: allowed === 1,
                remaining: Math.max(0, max - count - (allowed === 1? 1 : 0)),
                resetMs: windowMs
            }
    }
}