import { LimiterType } from "../config/types";
import { Router, Request, Response, NextFunction } from "express";
import { findRule } from "../config/routeRules";
import { fixedWindowLimiter } from "../limiters/fixedWindowLimiter";
import { slidingWindowLimiter } from "../limiters/slidingWindowLimiter";
import { LimiterResult } from "../limiters/types";
export async function Ratelimiter(req: Request, res: Response, next: NextFunction){
    const rule = findRule(req.method, req.path);
    if (!rule){
        return next();
    }
    try {
        const key = `ratelimit:${rule.limiter}:${req.ip}:${req.path}`
        var result: LimiterResult;
        if (rule.limiter == LimiterType.SLIDINGWINDOW){
            result = await slidingWindowLimiter.check([key], rule.windowMs, rule.limit);
        }else {
            result = await fixedWindowLimiter.check([key], rule.windowMs, rule.limit);
        }
        if (!result.allowed){
            return res.status(429).json({error: "Too many request"});
        }
        next();
    }catch (error) {
        console.error(error)
        next()
    }
}