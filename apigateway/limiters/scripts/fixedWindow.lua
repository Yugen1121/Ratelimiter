--- KEYS[1] = ip window key
--- Keys[2] = subnet window key
--- ARGS[1] = window size in ms
--- ARGS[2] = ip window request allowed
--- ARGS[3] = subnet window request allowed

local windowMs = tonumber(ARGV[1])
local max = tonumber(ARGV[2])
local maxSub = tonumber(ARGV[3])

local count = redis.call("INCR", KEYS[1])
local countSub = redis.call("INCR", KEYS[2])

if count == 1 then 
    redis.call("PEXPIRE", KEYS[1], windowMs)
end
if countSub == 1 then
    redis.call("PEXPIRE", KEYS[2], windowMS)
end

local ttl = redis.call("PTTL", KEYS[1])
local allowed = 1
if count > max  or countSub > maxSub then
    allowed = 0
end

return { allowed, count, ttl}
