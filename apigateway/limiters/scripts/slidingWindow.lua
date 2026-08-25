--- KEYS[1] = window ip key
--- KEYS[2] = window subnet key
--- ARGS[1] = window size in ms
--- ARGS[2] = window request allowed
--- ARGS[3] = sub net window request allowes
--- ARGS[4] = current time stamp


local key = KEYS[1]
local subkey = KEYS[2]
local windowMs = tonumber(ARGV[1])
local max = tonumber(ARGV[2])
local maxSub = tonumber(ARGV[3])
local now = tonumber(ARGV[4])

local windowStart = now - windowMs
redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)
redis.call("ZREMRANGEBYSCORE", subkey, 0, windowStart)

local count = redis.call("ZCARD", key)
local subCount = redis.call("ZCARD", subkey)
local allowed = 1

if count < max and subCount < maxSub then 
    redis.call("ZADD", key, now, now .. "--" .. math.random())
    redis.call("PEXPIRE", key, windowMs)
    redis.call("ZADD", subkey, now, now .. "--" .. math.random())
    redis.call("PEXPIRE", subkey, windowMs)
else
    allowed = 0
end

return {allowed, count} 