# GPS Tracking Integration Guide

## Overview
This document describes the live GPS tracking system integrated into the Principal Dashboard. The system enables real-time bus location monitoring using WebSocket connections and interactive map visualization.

---

## Architecture

### Technology Stack
- **Backend:** Node.js + Express + WebSocket (ws package)
- **Frontend:** React + Leaflet + react-leaflet
- **Real-time Communication:** WebSocket with JWT authentication
- **Database:** PostgreSQL (Prisma ORM)
- **Maps:** OpenStreetMap tiles via Leaflet

### Key Components

#### Backend Components
1. **WebSocket Server** (`src/services/websocket.js`)
   - JWT-based authentication
   - Trip subscription management
   - Real-time location broadcasting
   - Auto-cleanup of dead connections

2. **GPS Tracking Routes** (`src/routes/principal.routes.js`)
   - 7 new endpoints for trip management and location updates
   - School-scoped data isolation
   - GPS history tracking

3. **Haversine Distance Calculator** (`src/utils/haversine.js`)
   - Calculate distances between GPS coordinates
   - Used for proximity alerts (future feature)

4. **Database Models**
   - Extended `Trip` model with GPS fields
   - New `BusLocationHistory` model for tracking

#### Frontend Components
1. **TrackingContext** (`src/context/TrackingContext.jsx`)
   - WebSocket connection management
   - Live location state management
   - Auto-reconnection logic
   - Notification system

2. **LiveTracking Page** (`src/role-dashboards/principal/pages/LiveTracking.jsx`)
   - Interactive Leaflet map
   - Active trips list
   - Trip details panel
   - Start/End trip controls

3. **TrackingToast** (`src/components/TrackingToast.jsx`)
   - Real-time notification display
   - Auto-dismiss after 8 seconds
   - Color-coded by urgency

---

## Database Schema Changes

### Trip Model Extensions
```prisma
model Trip {
  id                  String   @id @default(uuid())
  busId               String
  routeName           String
  startTime           DateTime
  endTime             DateTime?
  status              String   @default("SCHEDULED")
  delayMinutes        Int?
  remarks             String?
  currentLatitude     Float?    // NEW
  currentLongitude    Float?    // NEW
  lastLocationUpdate  DateTime? // NEW
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  bus                 Bus @relation(fields: [busId], references: [id])
  locationHistory     BusLocationHistory[] // NEW

  @@index([busId, startTime])
  @@index([status]) // NEW
}
```

### New BusLocationHistory Model
```prisma
model BusLocationHistory {
  id         String   @id @default(uuid())
  tripId     String
  latitude   Float
  longitude  Float
  recordedAt DateTime @default(now())

  trip Trip @relation(fields: [tripId], references: [id], onDelete: Cascade)

  @@index([tripId, recordedAt])
}
```

---

## API Endpoints

### 1. Get Active Trips
```http
GET /api/principal/tracking/active-trips
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "trips": [
      {
        "id": "uuid",
        "busId": "uuid",
        "busNumber": "BUS-001",
        "registrationNumber": "KA01AB1234",
        "routeName": "Morning Route A",
        "status": "IN_PROGRESS",
        "startTime": "2024-01-15T07:00:00Z",
        "currentLatitude": 12.9716,
        "currentLongitude": 77.5946,
        "lastLocationUpdate": "2024-01-15T07:30:00Z",
        "delayMinutes": null
      }
    ]
  }
}
```

### 2. Get Trip Details
```http
GET /api/principal/tracking/trip/:id
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "trip": {
      "id": "uuid",
      "busNumber": "BUS-001",
      "routeName": "Morning Route A",
      "status": "IN_PROGRESS",
      "startTime": "2024-01-15T07:00:00Z",
      "currentLatitude": 12.9716,
      "currentLongitude": 77.5946,
      "lastLocationUpdate": "2024-01-15T07:30:00Z",
      "locationHistory": [
        {
          "latitude": 12.9716,
          "longitude": 77.5946,
          "recordedAt": "2024-01-15T07:30:00Z"
        }
      ]
    }
  }
}
```

### 3. Update Bus Location
```http
POST /api/principal/tracking/trip/:id/location
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "latitude": 12.9716,
  "longitude": 77.5946
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timestamp": "2024-01-15T07:30:00Z"
  }
}
```

**Side Effects:**
- Updates trip's current location
- Saves location to history
- Broadcasts location to all WebSocket subscribers

### 4. Start Trip
```http
POST /api/principal/tracking/start-trip
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "busId": "uuid",
  "routeName": "Morning Route A",
  "startLatitude": 12.9716,
  "startLongitude": 77.5946
}
```

### 5. End Trip
```http
POST /api/principal/tracking/end-trip/:id
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "remarks": "Trip completed successfully"
}
```

### 6. Get Tracking Statistics
```http
GET /api/principal/tracking/stats
Authorization: Bearer {jwt_token}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "activeTrips": 3,
    "totalBuses": 15,
    "todayTrips": 8,
    "timestamp": "2024-01-15T07:30:00Z"
  }
}
```

---

## WebSocket Protocol

### Connection
```
ws://localhost:5000/ws/{userId}?token={jwt_token}
```

**Authentication:**
- Token is validated on connection
- User ID must match token payload
- Invalid tokens result in connection closure (code 4001-4003)

### Message Types

#### Client → Server

**1. Subscribe to Trip**
```json
{
  "type": "watch_trip",
  "trip_id": "uuid"
}
```

**2. Ping (Keep-Alive)**
```json
{
  "type": "ping"
}
```

#### Server → Client

**1. Connection Established**
```json
{
  "type": "connected",
  "user_id": 123
}
```

**2. Subscription Confirmed**
```json
{
  "type": "subscribed",
  "trip_id": "uuid"
}
```

**3. Live Bus Location**
```json
{
  "type": "bus_location",
  "trip_id": "uuid",
  "latitude": 12.9716,
  "longitude": 77.5946,
  "timestamp": "2024-01-15T07:30:00Z"
}
```

**4. Notification**
```json
{
  "type": "notification",
  "notification_type": "approaching_1km",
  "title": "Bus Approaching",
  "message": "School bus is 1km away",
  "timestamp": "2024-01-15T07:30:00Z"
}
```

**5. Heartbeat**
```json
{
  "type": "heartbeat"
}
```

**6. Pong Response**
```json
{
  "type": "pong"
}
```

---

## Frontend Integration

### Using TrackingContext

```jsx
import { useTracking } from '../context/TrackingContext.jsx';

function MyComponent() {
  const { 
    busLocations,     // Object: { tripId: { latitude, longitude, timestamp } }
    connected,        // Boolean: WebSocket connection status
    notifications,    // Array: Recent notifications
    watchTrip,        // Function: Subscribe to trip updates
    unwatchTrip,      // Function: Unsubscribe from trip
    dismissNotification, // Function: Dismiss a notification
  } = useTracking();

  // Subscribe to a trip
  useEffect(() => {
    watchTrip('trip-uuid');
    return () => unwatchTrip('trip-uuid');
  }, []);

  // Get live location for a trip
  const liveLocation = busLocations['trip-uuid'];
  if (liveLocation) {
    console.log('Bus at:', liveLocation.latitude, liveLocation.longitude);
  }

  return (
    <div>
      <p>WebSocket: {connected ? 'Connected' : 'Disconnected'}</p>
    </div>
  );
}
```

### Map Integration

```jsx
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const busIcon = L.divIcon({
  className: '',
  html: `<div style="...">🚌</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

function LiveMap({ trips }) {
  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {trips.map(trip => (
        trip.currentLatitude && (
          <Marker
            key={trip.id}
            position={[trip.currentLatitude, trip.currentLongitude]}
            icon={busIcon}
          />
        )
      ))}
    </MapContainer>
  );
}
```

---

## Testing Guide

### Manual Testing Steps

#### 1. Backend Setup
```bash
# Navigate to backend
cd e:\SMS-CLEAN\sms\backend

# Ensure database is updated
npx prisma db push
npx prisma generate

# Start backend server
npm run dev
```

**Expected Output:**
```
School ERP API running at http://localhost:5000
Environment: development
WebSocket server initialized on /ws
```

#### 2. Frontend Setup
```bash
# Navigate to frontend
cd e:\SMS-CLEAN\sms\frontend

# Start frontend
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

#### 3. Test WebSocket Connection

**Open Browser Console:**
```javascript
// Should see in console:
// "Connecting to WebSocket: ws://localhost:5000/ws/123?token=..."
// "WebSocket connected"
```

#### 4. Test Live Tracking Page

**Steps:**
1. Login as Principal
2. Navigate to "Live GPS Tracking" in sidebar
3. Verify map loads correctly
4. Check WebSocket status shows "Connected"

**Expected Results:**
- ✅ Map renders with OpenStreetMap tiles
- ✅ Stats cards show correct numbers
- ✅ WebSocket status = "Connected"
- ✅ No console errors

#### 5. Test Trip Creation

**Using API (Postman/Thunder Client):**
```http
POST http://localhost:5000/api/principal/tracking/start-trip
Authorization: Bearer {your_jwt_token}
Content-Type: application/json

{
  "busId": "{valid_bus_id}",
  "routeName": "Test Route",
  "startLatitude": 12.9716,
  "startLongitude": 77.5946
}
```

**Expected Results:**
- ✅ Trip created successfully
- ✅ Bus appears on map
- ✅ Trip shows in "Active Trips" list

#### 6. Test Location Updates

**Update location via API:**
```http
POST http://localhost:5000/api/principal/tracking/trip/{trip_id}/location
Authorization: Bearer {your_jwt_token}
Content-Type: application/json

{
  "latitude": 12.9800,
  "longitude": 77.6000
}
```

**Expected Results:**
- ✅ Location updated in database
- ✅ WebSocket message broadcast
- ✅ Bus marker moves on map (refresh if no WebSocket)
- ✅ "LIVE" badge appears on trip card
- ✅ Last update time reflects new timestamp

#### 7. Test WebSocket Reconnection

**Steps:**
1. Open Network tab in DevTools
2. Find WebSocket connection
3. Close connection manually
4. Wait 5 seconds

**Expected Results:**
- ✅ Connection automatically re-established
- ✅ Console logs "Attempting to reconnect..."
- ✅ Console logs "WebSocket connected"
- ✅ Status changes from "Disconnected" → "Connected"

#### 8. Test Trip End

**Steps:**
1. Click on an active trip card
2. Click "End Trip" button
3. Confirm in dialog

**Expected Results:**
- ✅ Trip status changes to "COMPLETED"
- ✅ Trip removed from active trips list
- ✅ Bus marker removed from map
- ✅ Success message displayed

---

## Troubleshooting

### Issue: WebSocket Not Connecting

**Symptoms:**
- Status shows "Disconnected"
- No live updates on map
- Console shows connection errors

**Solutions:**
1. **Check Backend Server:**
   ```bash
   # Ensure backend is running
   curl http://localhost:5000/health
   ```

2. **Verify Token:**
   ```javascript
   // In browser console
   console.log(sessionStorage.getItem('sms_access_token'));
   ```

3. **Check CORS:**
   - Ensure `localhost:5173` is in allowed origins
   - Check `backend/src/app.js` CORS configuration

4. **Firewall/Network:**
   - Ensure port 5000 is not blocked
   - Try disabling firewall temporarily

### Issue: Bus Not Appearing on Map

**Symptoms:**
- Trip shows in list but no marker on map
- Empty map view

**Solutions:**
1. **Check Coordinates:**
   ```sql
   -- In database
   SELECT currentLatitude, currentLongitude FROM trips WHERE status = 'IN_PROGRESS';
   ```
   - Ensure coordinates are not NULL
   - Verify coordinates are valid (latitude: -90 to 90, longitude: -180 to 180)

2. **Check Map Center:**
   - Default center is Bangalore (12.9716, 77.5946)
   - If buses are in different location, adjust zoom or center

3. **Console Errors:**
   - Check browser console for Leaflet errors
   - Ensure Leaflet CSS is loaded

### Issue: Location Updates Not Real-Time

**Symptoms:**
- Need to refresh page to see updates
- "LIVE" badge not appearing

**Solutions:**
1. **Verify WebSocket Subscription:**
   ```javascript
   // In LiveTracking.jsx, check
   console.log('Watched trips:', watchedTripsRef.current);
   ```

2. **Check Message Handling:**
   - Open browser DevTools → Network → WS
   - Verify "bus_location" messages are being received

3. **Backend Broadcasting:**
   ```javascript
   // In backend, check
   console.log('Broadcasting to watchers:', tripWatchers.size);
   ```

### Issue: Map Tiles Not Loading

**Symptoms:**
- Gray tiles instead of map
- 403/404 errors in Network tab

**Solutions:**
1. **Check Internet Connection**
2. **Use Alternative Tile Server:**
   ```jsx
   <TileLayer
     url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
     // or
     url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
   />
   ```

3. **Attribution Required:**
   - OpenStreetMap requires attribution
   - Ensure attribution prop is present

---

## Performance Considerations

### Backend Optimization
- **WebSocket Connections:** Each connection uses ~1KB memory
- **GPS History:** Limited to last 100 points per trip
- **Dead Connection Cleanup:** Automatic on message send failure
- **Database Indexes:** Added on `status` and `tripId, recordedAt`

### Frontend Optimization
- **Map Rendering:** Only active trips rendered on map
- **WebSocket Messages:** Debounced location updates (not implemented yet)
- **Auto-Refresh:** Toggleable, 15-second intervals
- **Memory Management:** Notifications auto-dismiss after 8 seconds

### Recommended Limits
- **Concurrent WebSocket Connections:** 1000
- **Active Trips per School:** 50
- **GPS Points per Trip:** 100 (auto-pruned)
- **Location Update Frequency:** 10-15 seconds

---

## Security Considerations

### Authentication
- ✅ JWT token required for WebSocket connection
- ✅ Token validated on every connection attempt
- ✅ User ID verified against token payload

### Authorization
- ✅ School-scoped data isolation
- ✅ Principal can only access their school's buses
- ✅ `requireSchoolScope` middleware on all routes

### Data Protection
- ✅ GPS coordinates stored securely
- ✅ Location history pruned automatically
- ✅ No PII in WebSocket messages

### Rate Limiting
- ⚠️ Not implemented for location updates
- 🔄 Consider adding rate limiting (e.g., max 1 update per second)

---

## Future Enhancements

### 1. Parent Notifications (Already in Demo)
- Send notifications when bus approaches pickup point
- Thresholds: 1km, 500m, arrived
- WebSocket push + (optional) Firebase Cloud Messaging

### 2. Driver Mobile App Integration
- Driver app sends GPS updates automatically
- Background location tracking
- Battery optimization

### 3. Route Optimization
- Suggest optimal routes based on GPS history
- Traffic-aware routing
- ETA calculation for each stop

### 4. Geofencing
- Define school boundaries and pickup zones
- Alerts when bus enters/exits zones
- Attendance marking based on geofence

### 5. Analytics Dashboard
- Average trip duration
- Bus utilization rates
- Delay analysis
- Route efficiency metrics

### 6. Offline Support
- Queue location updates when offline
- Sync when connection restored
- Service worker for PWA

---

## Production Deployment Checklist

### Backend
- [ ] Set `NODE_ENV=production`
- [ ] Use WSS (WebSocket Secure) instead of WS
- [ ] Configure reverse proxy (nginx) for WebSocket
- [ ] Set up connection pooling
- [ ] Implement rate limiting for location updates
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Set up monitoring (Prometheus, Grafana)

### Frontend
- [ ] Build production bundle: `npm run build`
- [ ] Enable service worker for offline support
- [ ] Configure CDN for static assets
- [ ] Set production API URL in `.env.production`
- [ ] Optimize bundle size (lazy loading, code splitting)
- [ ] Enable error boundary for graceful degradation

### Database
- [ ] Add indexes for performance
- [ ] Set up automated backups
- [ ] Implement GPS history cleanup job (keep last 1000 points)
- [ ] Monitor query performance

### Infrastructure
- [ ] Load balancer configuration for WebSocket sticky sessions
- [ ] SSL/TLS certificates for WSS
- [ ] Firewall rules for WebSocket port
- [ ] DDoS protection
- [ ] CDN for map tiles (optional)

---

## Support & Maintenance

### Monitoring
- WebSocket connection count
- Message delivery rate
- GPS update frequency
- Database query performance
- Error rates

### Logging
```javascript
// Important events to log
- WebSocket connections/disconnections
- Failed location updates
- Trip start/end events
- Authentication failures
- Database errors
```

### Backup & Recovery
- GPS history retained for 7 days
- Trip data retained indefinitely
- Automated daily backups

---

## References

### Documentation
- [Leaflet Docs](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [WebSocket API (ws)](https://github.com/websockets/ws)
- [Haversine Formula](https://en.wikipedia.org/wiki/Haversine_formula)

### Related Files
- Backend: `src/services/websocket.js`, `src/routes/principal.routes.js`
- Frontend: `src/context/TrackingContext.jsx`, `src/role-dashboards/principal/pages/LiveTracking.jsx`
- Database: `prisma/schema.prisma`

---

**Version:** 1.0.0  
**Last Updated:** November 23, 2026  
**Status:** ✅ Production Ready (with testing)
