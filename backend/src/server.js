import "dotenv/config";
import app from "./app.js";
import prisma from "./config/prisma.js";
import config from "./config/config.js";
import { shutdownLoginRateLimiter } from "./middleware/loginRateLimit.js";
import { initializeWebSocket } from "./services/websocket.js";
import { startDatabaseWarmup } from "./keepDatabaseWarm.js";
import { startTokenCleanupJob } from "./utils/tokenCleanup.js";

const server = app.listen(config.port, () => {
  console.log(`School ERP API running at http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

// Initialize WebSocket server
initializeWebSocket(server);

// Keep database warm (prevents Neon free tier cold starts)
startDatabaseWarmup();

// Start periodic cleanup of expired refresh tokens (runs every 24 hours)
const stopTokenCleanup = startTokenCleanupJob(24 * 60 * 60 * 1000);

let shuttingDown = false;
async function shutdown(signal, exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`${signal} received; shutting down.`);
  stopTokenCleanup(); // Stop token cleanup job
  shutdownLoginRateLimiter();
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(exitCode);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  shutdown("unhandledRejection", 1);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  shutdown("uncaughtException", 1);
});
