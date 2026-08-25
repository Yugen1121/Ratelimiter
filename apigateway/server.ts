// app.ts
import express from "express";
import { connectRedis, redisClient } from "./services/redis.ts";
import authRouter from "./route/auth.routes.ts";
import { Ratelimiter } from "./middleware/ratelimiter.ts";
import cors from 'cors'

export function startServer(Port: number){
    const app = express();
    app.use(cors())
    app.use(express.json())
    app.set("trust proxy", true)
    app.use(Ratelimiter)
    app.use("/auth", authRouter)

    async function start() {
        await connectRedis();
        app.listen(Port, () => console.log(`Server running on port ${Port}`));
    }
    start();

}

