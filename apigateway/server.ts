// app.ts
import express from "express";
import { connectRedis, redisClient } from "./services/redis.ts";
import authRouter from "./route/auth.routes.ts";
import { RateLimiter } from "./limiters/types.ts";
import { Ratelimiter } from "./middleware/ratelimiter.ts";
const app = express();

app.use(express.json())
app.use(Ratelimiter)
app.use("/auth", authRouter)

async function start() {
    await connectRedis();
    app.listen(3000, () => console.log("Server running on port 3000"));
}

start();
