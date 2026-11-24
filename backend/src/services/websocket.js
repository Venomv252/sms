import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Store WebSocket connections
const connections = new Map(); // userId -> Set of WebSocket connections
const tripWatchers = new Map(); // tripId -> Set of WebSocket connections

/**
 * Initialize WebSocket server
 */
export function initializeWebSocket(server) {
  const wss = new WebSocketServer({ 
    server,
    path: "/ws",
  });

  wss.on("connection", (ws, req) => {
    // Extract token from query string
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    const userIdParam = url.pathname.split("/").pop();

    if (!token) {
      ws.close(4001, "Authentication required");
      return;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, config.jwt.secret);
      const userId = decoded.id;

      // Verify user ID matches path parameter (handle both UUID and numeric IDs)
      if (userIdParam !== userId && parseInt(userIdParam) !== userId) {
        ws.close(4003, "User ID mismatch");
        return;
      }

      // Store connection
      if (!connections.has(userId)) {
        connections.set(userId, new Set());
      }
      connections.get(userId).add(ws);

      console.log(`WebSocket connected: User ${userId}`);

      // Track which trips this connection is watching
      const watchedTrips = new Set();

      // Handle messages from client
      ws.on("message", (data) => {
        try {
          const message = JSON.parse(data.toString());

          if (message.type === "watch_trip") {
            const tripId = message.trip_id;
            if (tripId) {
              // Add to trip watchers
              if (!tripWatchers.has(tripId)) {
                tripWatchers.set(tripId, new Set());
              }
              tripWatchers.get(tripId).add(ws);
              watchedTrips.add(tripId);

              // Send confirmation
              ws.send(JSON.stringify({
                type: "subscribed",
                trip_id: tripId,
              }));

              console.log(`User ${userId} watching trip ${tripId}`);
            }
          } else if (message.type === "ping") {
            ws.send(JSON.stringify({ type: "pong" }));
          }
        } catch (error) {
          console.error("WebSocket message error:", error);
        }
      });

      // Handle connection close
      ws.on("close", () => {
        // Remove from user connections
        const userConnections = connections.get(userId);
        if (userConnections) {
          userConnections.delete(ws);
          if (userConnections.size === 0) {
            connections.delete(userId);
          }
        }

        // Remove from trip watchers
        watchedTrips.forEach((tripId) => {
          const watchers = tripWatchers.get(tripId);
          if (watchers) {
            watchers.delete(ws);
            if (watchers.size === 0) {
              tripWatchers.delete(tripId);
            }
          }
        });

        console.log(`WebSocket disconnected: User ${userId}`);
      });

      ws.on("error", (error) => {
        console.error(`WebSocket error for user ${userId}:`, error);
      });

      // Send initial heartbeat
      ws.send(JSON.stringify({ type: "connected", user_id: userId }));

    } catch (error) {
      console.error("WebSocket authentication error:", error);
      ws.close(4002, "Invalid token");
    }
  });

  // Heartbeat to keep connections alive
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.readyState === 1) { // OPEN
        ws.send(JSON.stringify({ type: "heartbeat" }));
      }
    });
  }, 30000); // Every 30 seconds

  console.log("WebSocket server initialized on /ws");

  return wss;
}

/**
 * Broadcast bus location to all watchers of a trip
 */
export function broadcastBusLocation(tripId, latitude, longitude, timestamp) {
  const watchers = tripWatchers.get(tripId);
  if (!watchers || watchers.size === 0) return;

  const payload = JSON.stringify({
    type: "bus_location",
    trip_id: tripId,
    latitude,
    longitude,
    timestamp,
  });

  const deadConnections = new Set();

  watchers.forEach((ws) => {
    if (ws.readyState === 1) { // OPEN
      try {
        ws.send(payload);
      } catch (error) {
        console.error("Error sending bus location:", error);
        deadConnections.add(ws);
      }
    } else {
      deadConnections.add(ws);
    }
  });

  // Clean up dead connections
  deadConnections.forEach((ws) => {
    watchers.delete(ws);
  });

  if (watchers.size === 0) {
    tripWatchers.delete(tripId);
  }
}

/**
 * Send notification to a specific user
 */
export function sendNotificationToUser(userId, notification) {
  const userConnections = connections.get(userId);
  if (!userConnections || userConnections.size === 0) return;

  const payload = JSON.stringify({
    type: "notification",
    ...notification,
  });

  userConnections.forEach((ws) => {
    if (ws.readyState === 1) { // OPEN
      try {
        ws.send(payload);
      } catch (error) {
        console.error(`Error sending notification to user ${userId}:`, error);
      }
    }
  });
}

/**
 * Get statistics about active connections
 */
export function getWebSocketStats() {
  return {
    totalConnections: Array.from(connections.values()).reduce(
      (sum, set) => sum + set.size,
      0
    ),
    activeUsers: connections.size,
    watchedTrips: tripWatchers.size,
  };
}
