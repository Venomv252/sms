import { cleanupExpiredTokens } from "./tokens.js";

/**
 * Periodically clean up expired refresh tokens from the database
 */
export function startTokenCleanupJob(intervalMs = 24 * 60 * 60 * 1000) {
  // Run immediately on start
  cleanupExpiredTokens()
    .then((count) => {
      if (count > 0) {
        console.log(`[Token Cleanup] Removed ${count} expired refresh tokens`);
      }
    })
    .catch((error) => {
      console.error("[Token Cleanup] Error during initial cleanup:", error);
    });

  // Then run periodically
  const intervalId = setInterval(async () => {
    try {
      const count = await cleanupExpiredTokens();
      if (count > 0) {
        console.log(`[Token Cleanup] Removed ${count} expired refresh tokens`);
      }
    } catch (error) {
      console.error("[Token Cleanup] Error during periodic cleanup:", error);
    }
  }, intervalMs);

  // Return cleanup function
  return () => clearInterval(intervalId);
}
