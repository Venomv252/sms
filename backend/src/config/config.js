import "dotenv/config";

// Validate and parse a positive integer within bounds
function parsePositiveInt(value, defaultValue, min, max, name) {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const parsed = Number(value);

  // Check for NaN, non-integer, or out of bounds
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(
      `${name} must be an integer between ${min} and ${max}. ` +
      `Received: ${value} (parsed as ${parsed})`
    );
  }

  return parsed;
}

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  database: { url: process.env.DATABASE_URL },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d",
  },
  cookie: {
    domain: process.env.COOKIE_DOMAIN || undefined, // undefined = no domain restriction
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: process.env.COOKIE_SAMESITE || "lax",
  },
  client: {
    // Keep the production frontend explicitly allowed even if the Render
    // environment variable is missing or contains a trailing slash.
    url: process.env.CORS_ORIGIN || "https://sms-rho-umber.vercel.app",
    // Support comma-separated origins and normalize accidental trailing slashes.
    allowedOrigins: [
      "https://sms-rho-umber.vercel.app",
      "http://localhost:5173",
      ...(process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(",")
        : []),
    ]
      .map((origin) => origin.trim().replace(/\/+$/, ""))
      .filter(Boolean)
      .filter((origin, index, origins) => origins.indexOf(origin) === index),
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    login: {
      // Window: 1 minute (60000ms) to 1 hour (3600000ms)
      windowMs: parsePositiveInt(
        process.env.LOGIN_RATE_LIMIT_WINDOW_MS,
        900000, // Default: 15 minutes
        60000,  // Min: 1 minute
        3600000, // Max: 1 hour
        "LOGIN_RATE_LIMIT_WINDOW_MS"
      ),
      // Max requests: 1 to 100 per window
      // Counts ALL login requests, not just failures
      maxRequests: parsePositiveInt(
        process.env.LOGIN_RATE_LIMIT_MAX_REQUESTS,
        50,  // Default: 50 requests per window
        1,   // Min: 1 request
        100, // Max: 100 requests
        "LOGIN_RATE_LIMIT_MAX_REQUESTS"
      ),
      // Max IPs: Maximum number of unique IPs tracked simultaneously
      // Protects against memory exhaustion from distributed attacks
      maxIPs: parsePositiveInt(
        process.env.LOGIN_RATE_LIMIT_MAX_IPS,
        50000, // Default: 50,000 IPs (~3-5 MB memory)
        1000,  // Min: 1,000 IPs
        200000, // Max: 200,000 IPs (~15-20 MB memory)
        "LOGIN_RATE_LIMIT_MAX_IPS"
      ),
    },
  },
  bcrypt: { saltRounds: 12 },
  auth: {
    // Valid bcrypt hash used only to reduce username-enumeration timing differences.
    // This hash does not correspond to any account password.
    dummyPasswordHash: process.env.AUTH_DUMMY_PASSWORD_HASH || "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  },
};

if (!config.database.url) {
  throw new Error("DATABASE_URL is missing from .env");
}
if (!config.jwt.accessSecret || !config.jwt.refreshSecret) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be configured");
}

export default config;
