export default function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  if (res.headersSent) return next(err);

  if (err.code === "P2002") {
    return res.status(409).json({ status: "error", message: "A record with this information already exists" });
  }
  if (err.code === "P2025") {
    return res.status(404).json({ status: "error", message: "Record not found" });
  }
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ status: "error", message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
  }

  const status = err.statusCode || err.status || 500;
  const message = status >= 500 && process.env.NODE_ENV === "production"
    ? "Internal server error"
    : err.message || "Internal server error";

  res.status(status).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
