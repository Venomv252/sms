# GPS Tracking - Quick Test Script

This script provides step-by-step commands to test the GPS tracking system.

## Prerequisites
1. Backend server running on `http://localhost:5000`
2. Frontend running on `http://localhost:5173`
3. Logged in as Principal
4. At least one active bus in the system

---

## Test Scenario: Complete GPS Tracking Flow

### Step 1: Get Your Auth Token

**Browser Console:**
```javascript
sessionStorage.getItem('sms_access_token')
```

Copy the token for use in API requests below.

---

### Step 2: Get Available Buses

**API Request (Postman/Thunder Client):**
```http
GET http://localhost:5000/api/principal/transport/buses
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "buses": [
      {
        "id": "bus-uuid-here",
        "busNumber": "BUS-001",
        "registrationNumber": "KA01AB1234",
        "isActive": true
      }
    ]
  }
}
```

📝 **Note the `id` of a bus for the next step.**

---

### Step 3: Start a Trip

**API Request:**
```http
POST http://localhost:5000/api/principal/tracking/start-trip
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "busId": "PASTE_BUS_ID_HERE",
  "routeName": "Morning School Run - Test",
  "startLatitude": 12.9716,
  "startLongitude": 77.5946
}
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "trip": {
      "id": "trip-uuid-here",
      "busId": "...",
      "busNumber": "BUS-001",
      "routeName": "Morning School Run - Test",
      "status": "IN_PROGRESS",
      "startTime": "2024-01-15T07:00:00Z"
    }
  }
}
```

📝 **Note the `trip.id` for the next steps.**

**What to Check:**
- ✅ Go to "Live GPS Tracking" in Principal Dashboard
- ✅ Verify bus appears on map at coordinates (12.9716, 77.5946)
- ✅ Verify trip appears in "Active Trips" list
- ✅ WebSocket status should show "Connected"

---

### Step 4: Simulate Bus Movement

**Location Update 1 - Bus moves northeast:**
```http
POST http://localhost:5000/api/principal/tracking/trip/PASTE_TRIP_ID_HERE/location
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "latitude": 12.9800,
  "longitude": 77.6000
}
```

**What to Check:**
- ✅ Bus marker moves on map (without page refresh!)
- ✅ "LIVE" badge appears on trip card
- ✅ Last update time changes
- ✅ Browser console shows WebSocket message

---

**Location Update 2 - Bus continues moving:**
```http
POST http://localhost:5000/api/principal/tracking/trip/PASTE_TRIP_ID_HERE/location
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "latitude": 12.9850,
  "longitude": 77.6100
}
```

**What to Check:**
- ✅ Bus marker moves again
- ✅ GPS trail line appears (if trip is selected)

---

**Location Update 3 - Bus approaches destination:**
```http
POST http://localhost:5000/api/principal/tracking/trip/PASTE_TRIP_ID_HERE/location
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "latitude": 12.9900,
  "longitude": 77.6200
}
```

---

### Step 5: Get Trip Details with GPS History

**API Request:**
```http
GET http://localhost:5000/api/principal/tracking/trip/PASTE_TRIP_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "trip": {
      "id": "...",
      "busNumber": "BUS-001",
      "routeName": "Morning School Run - Test",
      "status": "IN_PROGRESS",
      "currentLatitude": 12.9900,
      "currentLongitude": 77.6200,
      "locationHistory": [
        {
          "latitude": 12.9900,
          "longitude": 77.6200,
          "recordedAt": "2024-01-15T07:15:00Z"
        },
        {
          "latitude": 12.9850,
          "longitude": 77.6100,
          "recordedAt": "2024-01-15T07:10:00Z"
        },
        {
          "latitude": 12.9800,
          "longitude": 77.6000,
          "recordedAt": "2024-01-15T07:05:00Z"
        },
        {
          "latitude": 12.9716,
          "longitude": 77.5946,
          "recordedAt": "2024-01-15T07:00:00Z"
        }
      ]
    }
  }
}
```

**What to Check:**
- ✅ Click on trip card in UI
- ✅ Verify GPS trail (polyline) appears on map
- ✅ Verify trip details panel shows all 4 GPS points
- ✅ Verify coordinates match API response

---

### Step 6: Check Tracking Statistics

**API Request:**
```http
GET http://localhost:5000/api/principal/tracking/stats
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "activeTrips": 1,
    "totalBuses": 15,
    "todayTrips": 1,
    "timestamp": "2024-01-15T07:15:00Z"
  }
}
```

**What to Check:**
- ✅ Verify stats cards in UI match API response
- ✅ "Active Trips" should be 1
- ✅ "Today's Trips" should be 1

---

### Step 7: Test WebSocket Reconnection

**Steps:**
1. Open Browser DevTools → Network Tab
2. Find WebSocket connection (WS filter)
3. Right-click → Close connection
4. Wait 5 seconds

**What to Check:**
- ✅ Browser console logs: "WebSocket disconnected"
- ✅ Browser console logs: "Attempting to reconnect..."
- ✅ Browser console logs: "WebSocket connected"
- ✅ WebSocket status changes: Disconnected → Connected
- ✅ No page refresh needed

---

### Step 8: End the Trip

**API Request:**
```http
POST http://localhost:5000/api/principal/tracking/end-trip/PASTE_TRIP_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "remarks": "Trip completed successfully - Test"
}
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "trip": {
      "id": "...",
      "status": "COMPLETED",
      "endTime": "2024-01-15T07:30:00Z"
    }
  }
}
```

**What to Check:**
- ✅ Trip removed from "Active Trips" list
- ✅ Bus marker disappears from map
- ✅ "Active Trips" stat decreases by 1
- ✅ Success message appears

---

### Step 9: Verify Trip is Ended

**API Request:**
```http
GET http://localhost:5000/api/principal/tracking/active-trips
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "trips": []
  }
}
```

---

## Advanced Tests

### Test A: Multiple Buses

**Steps:**
1. Start 3 trips with different buses
2. Update locations for all 3 buses
3. Verify all 3 appear on map simultaneously
4. Click different trip cards to switch between them
5. End all trips

**Expected:**
- ✅ All buses visible on map with different positions
- ✅ Selecting trip card highlights that trip
- ✅ GPS trail shows for selected trip only
- ✅ Each trip has independent WebSocket updates

---

### Test B: WebSocket Stress Test

**Script (Browser Console):**
```javascript
// Subscribe to a trip and watch for updates
const ws = new WebSocket('ws://localhost:5000/ws/YOUR_USER_ID?token=YOUR_TOKEN');

ws.onopen = () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'watch_trip', trip_id: 'YOUR_TRIP_ID' }));
};

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  console.log('Received:', msg.type, msg);
};

ws.onerror = (error) => console.error('Error:', error);
ws.onclose = () => console.log('Disconnected');
```

**Then send 10 location updates rapidly via API.**

**Expected:**
- ✅ All 10 WebSocket messages received
- ✅ Map updates smoothly (may batch updates)
- ✅ No connection drops
- ✅ No memory leaks

---

### Test C: Auto-Refresh Toggle

**Steps:**
1. Start a trip
2. Uncheck "Auto-refresh" checkbox
3. Wait 15 seconds
4. Update bus location via API
5. Check if list refreshed (it shouldn't)
6. Check "Auto-refresh" again
7. Wait 15 seconds

**Expected:**
- ✅ With auto-refresh OFF: List doesn't update automatically
- ✅ WebSocket updates still work (map updates)
- ✅ With auto-refresh ON: List updates every 15 seconds

---

## Browser Console Commands (Quick Reference)

### Check WebSocket Status
```javascript
// Check if connected
performance.getEntriesByType('resource').filter(r => r.name.includes('ws://'))
```

### Get Current Bus Locations
```javascript
// In React DevTools, find TrackingContext
// Or add to component:
console.log(busLocations);
```

### Force Reconnect
```javascript
// Call from component with useTracking hook
reconnect();
```

---

## Expected Console Output

### Successful Connection
```
Connecting to WebSocket: ws://localhost:5000/ws/123?token=eyJ...
WebSocket connected
Watching trip: trip-uuid-123
Subscribed to trip: trip-uuid-123
```

### Location Update Received
```
Received: bus_location {
  type: 'bus_location',
  trip_id: 'trip-uuid-123',
  latitude: 12.98,
  longitude: 77.6,
  timestamp: '2024-01-15T07:10:00Z'
}
```

### Reconnection
```
WebSocket disconnected: 1006 
Attempting to reconnect...
Connecting to WebSocket: ws://localhost:5000/ws/123?token=eyJ...
WebSocket connected
```

---

## Common Test Scenarios

### Scenario 1: School Morning Run
1. Start trip at 7:00 AM near school
2. Update location every 2 minutes (simulate bus stops)
3. Principal watches real-time progress
4. End trip at 8:30 AM

### Scenario 2: Multiple Routes
1. Start 5 trips (different routes)
2. Update all simultaneously
3. Principal switches between trips
4. Verify no interference between trips

### Scenario 3: Network Interruption
1. Start trip and update location
2. Disable network on driver device (simulate)
3. Queue 5 location updates
4. Re-enable network
5. Verify all 5 updates received and processed

---

## Success Criteria

✅ **All tests pass if:**
- WebSocket connects and reconnects automatically
- Bus markers move on map without page refresh
- GPS history trail displays correctly
- Trip list updates reflect current state
- No console errors or warnings
- UI remains responsive during updates
- Multiple trips can be tracked simultaneously

---

## Troubleshooting Quick Fixes

### No bus on map?
```bash
# Check trip has coordinates
psql $DATABASE_URL -c "SELECT id, currentLatitude, currentLongitude FROM trips WHERE status = 'IN_PROGRESS';"
```

### WebSocket won't connect?
```bash
# Check backend logs
cd backend
npm run dev
# Look for "WebSocket server initialized on /ws"
```

### Location update not broadcasting?
```javascript
// Check in backend/src/services/websocket.js
console.log('Trip watchers:', tripWatchers.size);
console.log('Active connections:', connections.size);
```

---

**Happy Testing! 🚌📍**
