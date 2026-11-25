import prisma from "./config/prisma.js";

/**
 * Keep Neon database warm by pinging every 4 minutes
 * Prevents cold starts (2-3 second delays) on the free tier
 */
export async function startDatabaseWarmup() {
  const INTERVAL = 4 * 60 * 1000; // 4 minutes

  async function ping() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log(`[DB Warmup] Ping successful at ${new Date().toISOString()}`);
    } catch (error) {
      console.error("[DB Warmup] Ping failed:", error.message);
    }
  }

  // Initial ping
  await ping();

  // Ping every 4 minutes
  setInterval(ping, INTERVAL);
  
  console.log("[DB Warmup] Started - pinging every 4 minutes to prevent cold starts");
}
