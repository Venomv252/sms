import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import config from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";
import studentRoutes from "./routes/students.routes.js";
import teacherRoutes from "./routes/teachers.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import homeworkRoutes from "./routes/homework.routes.js";
import resultRoutes from "./routes/results.routes.js";
import feeRoutes from "./routes/fees.routes.js";
import noticeRoutes from "./routes/notices.routes.js";
import scheduleRoutes from "./routes/schedules.routes.js";
import managementRoutes from "./routes/management.routes.js";
import platformRoutes from "./routes/platform.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import prisma from "./config/prisma.js";

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({ origin: config.client.url, credentials: true }));
app.use(rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.maxRequests,
  standardHeaders: true,
  legacyHeaders: false,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (config.nodeEnv === "development") app.use(morgan("dev"));

// Liveness: confirms the Node process is responsive without depending on PostgreSQL.
app.get("/health/live", (req, res) => res.status(200).json({
  status: "ok",
  timestamp: new Date().toISOString(),
}));

// Readiness: confirms the API can reach its database before receiving production traffic.
app.get("/health/ready", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return res.status(503).json({
      status: "error",
      database: "unavailable",
      timestamp: new Date().toISOString(),
    });
  }
});

// Backwards-compatible health endpoint.
app.get("/health", (req, res) => res.json({
  status: "OK",
  message: "School Management System API is running",
  timestamp: new Date().toISOString(),
}));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/homework", homeworkRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/platform", platformRoutes);

app.use((req, res) => res.status(404).json({ status: "error", message: "Route not found" }));
app.use(errorHandler);

export default app;
