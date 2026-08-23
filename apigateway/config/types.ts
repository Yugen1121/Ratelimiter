export enum MethodTypes {
    GET,
    POST,
    PUT,
    DELETE
}

export enum LimiterType {
    SLIDINGWINDOW,
    FIXEDWINDOW
}
export interface RouteRule{
    route: string,
    method: MethodTypes,
    limiter: LimiterType,
    limit: number,
    windowMs: number
}