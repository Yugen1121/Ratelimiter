--- KEYS[1] = window key
--- ARGS[1] = window size in ms
--- ARGS[2] = window request allowed

local windows = tonumber(ARGV[1])
local max = tonumber(ARGV[2])

local count = redis.call("INCR", KEYS[1])
if count == 1 then 
    redis.call("PEXPIRE", KEYS[1], windowMs)
end

local ttl = redis.call("PTTL", KEYS[1])
local allowed = 1
if count > max then
    allowed = 0

retrun { allowed, count, ttl}
