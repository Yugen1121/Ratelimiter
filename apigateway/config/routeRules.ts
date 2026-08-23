import { match } from "path-to-regexp"
import { LimiterType, MethodTypes, RouteRule } from "./types"

const routeRules: RouteRule[] = [
    { method: "POST", route: "/auth/login", limiter: LimiterType.SLIDINGWINDOW, windowMs: 60_000, limit: 10 },
]

export function findRule(method: string, route: string): RouteRule | undefined {
    return routeRules.find(rule => {
        if (rule.method !== method) return false;
        const matcher = match(rule.route, { decode: decodeURIComponent })
        return matcher(route)
    })
}