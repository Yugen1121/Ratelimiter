--- KEYS[1] = window key
--- ARGS[1] = window size in ms
--- ARGS[2] = window request allowed
--- ARGS[3] = current time stamp

local key = KEYS[1]
local windowMs = tonumber(ARGV[1])
local max = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

local windowStart = now - windowMs
redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)

local count = redis.call("ZCARD", key)
local allowed = 1

if count < max then 
    redis.call("ZADD", key, now, now .. "--" .. math.random())
    redis.call("PEXPIRE", key, windowMs)
else
    allowed = 0
end

return {allowed, count} 