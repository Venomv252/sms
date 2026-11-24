import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const TrackingContext = createContext(null);

/**
 * TrackingContext provides real-time GPS tracking via WebSocket
 * - Maintains live bus locations for active trips
 * - Handles WebSocket connection lifecycle
 * - Auto-reconnects on disconnection
 */
export function TrackingProvider({ children }) {
  const [busLocations, setBusLocations] = useState({});
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const watchedTripsRef = useRef(new Set());

  /**
   * Add a notification toast
   */
  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [{ ...notification, id }, ...prev].slice(0, 10));
    
    // Auto-dismiss after 8 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 8000);
  }, []);

  /**
   * Dismiss a notification
   */
  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /**
   * Subscribe to a trip's GPS updates
   */
  const watchTrip = useCallback((tripId) => {
    if (!tripId) return;
    
    watchedTripsRef.current.add(tripId);
    
    // If WebSocket is open, send subscription message
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({
          type: 'watch_trip',
          trip_id: tripId,
        }));
        console.log(`Watching trip: ${tripId}`);
      } catch (error) {
        console.error('Error watching trip:', error);
      }
    }
  }, []);

  /**
   * Unsubscribe from a trip
   */
  const unwatchTrip = useCallback((tripId) => {
    if (!tripId) return;
    watchedTripsRef.current.delete(tripId);
    
    // Note: We don't send unwatch message to server as it's not critical
    // The server will clean up when connection closes
  }, []);

  /**
   * Connect to WebSocket server
   */
  const connectWebSocket = useCallback(() => {
    // Get authentication token
    const token = sessionStorage.getItem('sms_access_token');
    const userStr = sessionStorage.getItem('sms_authenticated_user');
    
    if (!token || !userStr) {
      console.log('No authentication token found, skipping WebSocket connection');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userId = user.id;
      const userRole = user.role;

      // Only connect WebSocket for roles that need GPS tracking
      const allowedRoles = ['PRINCIPAL', 'PARENT', 'DRIVER', 'MANAGEMENT'];
      if (!allowedRoles.includes(userRole)) {
        console.log(`WebSocket not needed for role: ${userRole}`);
        return;
      }

      // Determine WebSocket URL based on API base URL
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const wsBase = apiBase
        .replace(/^https:\/\//, 'wss://')
        .replace(/^http:\/\//, 'ws://')
        .replace(/\/api$/, ''); // Remove /api if present

      const wsUrl = `${wsBase}/ws/${userId}?token=${encodeURIComponent(token)}`;
      
      console.log('Connecting to WebSocket:', wsUrl);
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnected(true);
        
        // Subscribe to all previously watched trips
        watchedTripsRef.current.forEach((tripId) => {
          ws.send(JSON.stringify({
            type: 'watch_trip',
            trip_id: tripId,
          }));
        });
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          switch (message.type) {
            case 'bus_location':
              // Update bus location
              setBusLocations((prev) => ({
                ...prev,
                [message.trip_id]: {
                  latitude: message.latitude,
                  longitude: message.longitude,
                  timestamp: message.timestamp,
                },
              }));
              break;

            case 'notification':
              // Add notification toast
              addNotification({
                type: message.notification_type,
                title: message.title,
                message: message.message,
                timestamp: message.timestamp,
              });
              break;

            case 'subscribed':
              console.log(`Subscribed to trip: ${message.trip_id}`);
              break;

            case 'connected':
              console.log('WebSocket handshake complete');
              break;

            case 'heartbeat':
              // Heartbeat received, connection is alive
              break;

            case 'pong':
              // Pong response to our ping
              break;

            default:
              console.log('Unknown message type:', message.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnected(false);
        wsRef.current = null;
        
        // Auto-reconnect after 5 seconds
        if (reconnectTimerRef.current) {
          clearTimeout(reconnectTimerRef.current);
        }
        
        reconnectTimerRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connectWebSocket();
        }, 5000);
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  }, [addNotification]);

  /**
   * Disconnect WebSocket
   */
  const disconnectWebSocket = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setConnected(false);
  }, []);

  /**
   * Send ping to keep connection alive
   */
  const sendPing = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
      } catch (error) {
        console.error('Error sending ping:', error);
      }
    }
  }, []);

  // Connect on mount
  useEffect(() => {
    connectWebSocket();
    
    // Send ping every 30 seconds to keep connection alive
    const pingInterval = setInterval(sendPing, 30000);
    
    return () => {
      clearInterval(pingInterval);
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket, sendPing]);

  const value = {
    busLocations,
    connected,
    notifications,
    watchTrip,
    unwatchTrip,
    addNotification,
    dismissNotification,
    reconnect: connectWebSocket,
  };

  return (
    <TrackingContext.Provider value={value}>
      {children}
    </TrackingContext.Provider>
  );
}

/**
 * Hook to access tracking context
 */
export function useTracking() {
  const context = useContext(TrackingContext);
  
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  
  return context;
}

export default TrackingContext;
