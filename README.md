# Distributed Rate Limiter & API Gateway

A high-performance, two-tier atomic rate limiter built with **Node.js, TypeScript, Redis (Lua), and Express**. Designed to prevent IP-rotation and botnet bypass attacks by enforcing limits at both the individual IP and network subnet levels.

---

## Project Overview & Highlights

* **Two-Tier Atomic Limiting:** Enforces limits per IP and per subnet simultaneously using custom Redis Lua scripts, closing an IP-rotation bypass vulnerability where a naive per-IP-only limiter allows unbounded requests via address spoofing.
* **Rigorous Validation:** Tested via a custom async Python attack simulator covering burst, sustained, slow-drip, and distributed multi-IP patterns. 
* **Performance:** Subnet-level limiting capped a simulated 38-IP rotation attack at 100 requests per `/24` block (versus 152 under per-IP-only limiting), achieving a **34% reduction** with zero additional per-IP false positives.
* **High-Throughput Ready:** Successfully handled a burst test blocking 99.2% of a 500-request burst at 1,700 RPS with a p99 latency under 70ms.

---

## 🏗️ System Architecture & Request Flow

```text
[ Client Request ] 
       │
       ▼
[ Load Balancer ] (Rotation Algorithm)
       │
       ▼
[ API Gateway ]
       │
       ▼
[ Rate Limiter ] (Two-Tier: IP + Subnet Check)
       │
       ▼
[ Redis Store ] (Atomic Lua Scripts)
       │
       ▼
[ Client Response / Challenge ]