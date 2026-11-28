import { PrismaClient } from "@prisma/client";

// Configure Prisma with proper connection pool settings
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  // Increase connection pool size and timeout
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Handle connection errors gracefully
prisma.$connect()
  .then(() => {
    console.log("✓ Database connected successfully");
  })
  .catch((error) => {
    console.error("✗ Database connection failed:", error.message);
  });

// Graceful shutdown - close connections when Node process ends
const gracefulShutdown = async () => {
  console.log("\n⚠ Shutting down gracefully...");
  await prisma.$disconnect();
  console.log("✓ Database connections closed");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export default prisma;
