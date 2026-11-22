import config from "../config/config.js";

/**
 * SINGLE-PROCESS ONLY: In-memory login request limiter
 * 
 * PRODUCTION WARNING:
 * This implementation uses an in-memory Map and is NOT shared across multiple
 * Node.js processes. It will NOT work correctly with:
 * - PM2 cluster mode (pm2 start -i <instances>)
 * - Kubernetes with replicas > 1
 * - Docker Swarm with multiple service replicas
 * - Any horizontal scaling or load-balanced multi-process setup
 * 
 * For production deployments with multiple processes, you MUST replace this
 * with a shared atomic store like Redis.
 * 
 * Example Redis implementation:
 *   const count = await redis.incr(`login:${ip}`);
 *   if (count === 1) await redis.expire(`login:${ip}`, 900);
 *   if (count > limit) return false;
 * 
 * REVERSE PROXY WARNING:
 * This limiter uses req.ip which defaults to socket.remoteAddress when
 * Express trust proxy is disabled (default). If deploying behind a reverse
 * proxy (nginx, AWS ALB, Cloudflare), you MUST:
 * 1. Configure Express trust proxy: app.set('trust proxy', 1) or 'loopback'
 * 2. Ensure proxy sets X-Forwarded-For header correctly
 * 3. Ensure proxy strips/overwrites client-provided X-Forwarded-For
 * Without proper configuration, all requests appear to come from proxy IP.
 * 
 * MEMORY PROTECTION:
 * This limiter tracks a maximum number of unique IPs (default: 50,000) to
 * prevent memory exhaustion from distributed attacks. When capacity is reached:
 * - Existing IPs continue to be rate limited normally
 * - New IPs are temporarily rejected until expired entries are cleaned up
 * - This is NOT an account-level security mechanism
 * - Legitimate users from new IPs may be temporarily affected during attacks
 * 
 * CPU PROTECTION:
 * To prevent CPU amplification attacks when Map is full, capacity-triggered
 * cleanup has a 30-second cooldown. During an attack with many unique IPs:
 * - First new IP at capacity: triggers full Map scan via cleanup()
 * - Subsequent new IPs within 30 seconds: rejected WITHOUT scanning Map
 * - After 30 seconds: next new IP triggers cleanup again
 * - Existing IPs: unaffected, no cleanup overhead for their requests
 * This prevents attackers from causing O(n) CPU work per request at capacity.
 * 
 * SECURITY SCOPE:
 * This is a request-flood protection layer that prevents single-IP brute force.
 * It does NOT prevent:
 * - Distributed attacks from multiple IPs (botnets)
 * - Credential stuffing with valid credentials
 * - Account enumeration through timing attacks
 * Consider implementing additional protections:
 * - Account-level lockout after N failed login attempts
 * - CAPTCHA after failed attempts
 * - Email alerts on suspicious login activity
 * - Web Application Firewall (WAF) for distributed protection
 */

export class LoginRateLimiter {
  constructor(options = {}) {
    // Injectable configuration with production defaults
    this.maxRequests = options.maxRequests ?? config.rateLimit.login.maxRequests;
    this.windowMs = options.windowMs ?? config.rateLimit.login.windowMs;
    this.maxIPs = options.maxIPs ?? config.rateLimit.login.maxIPs;
    this.cleanupCooldown = options.cleanupCooldown ?? 30000;
    
    // Injectable clock with Date as default
    this.clock = options.clock ?? Date;
    
    // Track all login requests: Map<ip, { count, resetTime }>
    this.requests = new Map();
    // Track last capacity-triggered cleanup to prevent CPU amplification
    this.lastCapacityCleanup = 0;
  }

  /**
   * Check and increment login request count for an IP.
   * Returns object with { allowed: boolean, retryAfter: number|null, reason: string|null }
   */
  checkRequest(ip) {
    const now = this.clock.now();
    const record = this.requests.get(ip);

    // Check if existing record is expired
    if (record && now >= record.resetTime) {
      // Expired - remove old record
      this.requests.delete(ip);
    }

    // Get current count (0 if no record or expired)
    const currentRecord = this.requests.get(ip);
    const currentCount = currentRecord ? currentRecord.count : 0;

    // Check if limit exceeded for existing IP
    if (currentCount >= this.maxRequests) {
      // Calculate retry-after in seconds
      const retryAfterMs = currentRecord.resetTime - now;
      const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
      
      return { 
        allowed: false, 
        retryAfter: retryAfterSeconds > 0 ? retryAfterSeconds : 1,
        reason: 'request_limit'
      };
    }

    // For new IPs: Check if Map is at capacity
    if (!currentRecord) {
      if (this.requests.size >= this.maxIPs) {
        // Map at capacity - check if we can run cleanup
        const timeSinceLastCleanup = now - this.lastCapacityCleanup;
        
        // Only run cleanup if cooldown has elapsed
        if (timeSinceLastCleanup >= this.cleanupCooldown) {
          // Cooldown elapsed - run cleanup and update timestamp
          this.cleanup();
          this.lastCapacityCleanup = this.clock.now();
        }
        
        // Check again after cleanup (or without cleanup if cooldown active)
        if (this.requests.size >= this.maxIPs) {
          // Still at capacity - reject new IP temporarily
          // Use shorter retry period for capacity exhaustion
          return {
            allowed: false,
            retryAfter: 60, // 1 minute - shorter than normal window
            reason: 'capacity_exhaustion'
          };
        }
      }
    }

    // Increment counter
    if (currentRecord) {
      // Existing record within window - increment
      currentRecord.count++;
    } else {
      // New record - start fresh window
      this.requests.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
    }

    return { allowed: true, retryAfter: null, reason: null };
  }

  /**
   * Get current state for an IP (for debugging/monitoring).
   */
  getState(ip) {
    const now = this.clock.now();
    const record = this.requests.get(ip);
    
    if (!record || now >= record.resetTime) {
      return { 
        count: 0, 
        resetTime: null, 
        isExpired: true,
        remainingRequests: this.maxRequests,
        mapSize: this.requests.size,
        mapCapacity: this.maxIPs,
        capacityUtilization: (this.requests.size / this.maxIPs * 100).toFixed(2) + '%'
      };
    }

    return {
      count: record.count,
      resetTime: record.resetTime,
      isExpired: false,
      remainingTime: record.resetTime - now,
      remainingRequests: Math.max(0, this.maxRequests - record.count),
      mapSize: this.requests.size,
      mapCapacity: this.maxIPs,
      capacityUtilization: (this.requests.size / this.maxIPs * 100).toFixed(2) + '%'
    };
  }

  /**
   * Cleanup expired records periodically to prevent memory leak.
   */
  cleanup() {
    const now = this.clock.now();
    for (const [ip, record] of this.requests.entries()) {
      if (now >= record.resetTime) {
        this.requests.delete(ip);
      }
    }
  }
}

const loginRateLimiter = new LoginRateLimiter();

// Cleanup expired records every 10 minutes
// unref() allows Node.js to exit even if interval is pending
const cleanupInterval = setInterval(() => loginRateLimiter.cleanup(), 600000);
cleanupInterval.unref();

/**
 * Login rate limiter middleware.
 * 
 * Limits ALL login requests per IP, regardless of:
 * - Authentication success or failure
 * - Credential validity
 * - Client disconnection
 * - Response completion
 * 
 * Strategy:
 * 1. Check current request count for IP
 * 2. If limit exceeded: return 429 with Retry-After header, do NOT call next()
 * 3. If limit not exceeded: increment counter atomically, call next()
 * 
 * The request is counted BEFORE authentication, making it immune to:
 * - Client abort attacks
 * - Event timing attacks
 * - Authentication result manipulation
 * 
 * Window behavior:
 * - Fixed window starting with first request
 * - All requests in window share same expiration
 * - Counter resets when window expires (checked on next request)
 * - Successful login does NOT reset the counter
 * 
 * Capacity exhaustion behavior:
 * - When Map reaches maxIPs capacity, cleanup() is run automatically
 * - Capacity-triggered cleanup has 30-second cooldown to prevent CPU attacks
 * - If cleanup frees space, new IPs are allowed
 * - If Map is still full, new IPs receive HTTP 429 (existing IPs unaffected)
 * - During cooldown, new IPs are rejected without scanning Map
 * - Retry-After is set to 60 seconds for capacity exhaustion
 * - This protects against memory exhaustion and CPU amplification attacks
 */
export function loginRateLimitMiddleware(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress;

  // Check and increment counter atomically
  const { allowed, retryAfter, reason } = loginRateLimiter.checkRequest(ip);

  if (!allowed) {
    // Rate limit exceeded - return 429 with Retry-After header
    res.set('Retry-After', retryAfter.toString());
    return res.status(429).json({
      status: "error",
      message: "Too many login attempts. Please try again later.",
    });
  }

  // Request allowed - proceed to controller
  next();
}

/**
 * Graceful shutdown: Clear interval and reset state.
 * Call this in your application shutdown handler.
 */
export function shutdownLoginRateLimiter() {
  clearInterval(cleanupInterval);
  loginRateLimiter.requests.clear();
}

/**
 * Get current rate limit state for an IP (debugging/monitoring).
 * Not exposed via middleware, but available for admin dashboards.
 */
export function getLoginRateLimitState(ip) {
  return loginRateLimiter.getState(ip);
}

export default loginRateLimitMiddleware;
