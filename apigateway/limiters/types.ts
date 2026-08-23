export interface LimiterResult {
    allowed: boolean,
    remaining: number,
    resetMs: number
}

export interface RateLimiter {
    check(key: string[], windowMs: number, max: number): Promise<LimiterResult>
}