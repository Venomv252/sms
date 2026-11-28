# Principal Transport Endpoints Fix

## Issue
The Principal Dashboard Transport page was getting a 404 error when trying to load bus data:
```
GET http://localhost:5000/api/principal/transport/buses 404 (Not Found)
```

## Root Cause
The backend had GPS tracking endpoints but was missing the basic transport management endpoints that the frontend was calling:
- `/api/principal/transport/buses` - Get all buses for the school
- `/api/principal/transport/trips` - Get trip history with pagination

## Solution
Added two missing endpoints to `src/routes/principal.routes.js`:

### 1. GET /api/principal/transport/buses
Returns all buses for the principal's school with:
- Basic bus information (busNumber, registrationNumber, capacity)
- Active status and expiry dates (insurance, fitness)
- Current active trip if any (for real-time status)

**Response Format:**
```json
[
  {
    "id": "uuid",
    "busNumber": "BUS-001",
    "registrationNumber": "ABC-1234",
    "capacity": 40,
    "isActive": true,
    "insuranceExpiry": "2024-12-31",
    "fitnessExpiry": "2024-12-31",
    "currentTrip": {
      "id": "uuid",
      "routeName": "Route A",
      "status": "IN_PROGRESS",
      "currentLatitude": 12.34,
      "currentLongitude": 56.78
    }
  }
]
```

### 2. GET /api/principal/transport/trips
Returns paginated trip history with filtering options:

**Query Parameters:**
- `status` - Filter by trip status (SCHEDULED, IN_PROGRESS, COMPLETED, DELAYED, CANCELLED)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response Format:**
```json
{
  "trips": [
    {
      "id": "uuid",
      "busId": "uuid",
      "busNumber": "BUS-001",
      "registrationNumber": "ABC-1234",
      "routeName": "Route A",
      "startTime": "2024-01-15T08:00:00Z",
      "endTime": "2024-01-15T09:30:00Z",
      "status": "COMPLETED",
      "delayMinutes": 0,
      "currentLatitude": 12.34,
      "currentLongitude": 56.78,
      "lastLocationUpdate": "2024-01-15T09:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

## Files Modified
- `e:\SMS-CLEAN\sms\backend\src\routes\principal.routes.js`
  - Added `GET /transport/buses` endpoint (lines ~1239-1265)
  - Added `GET /transport/trips` endpoint (lines ~1267-1312)

## Testing
1. Restart the backend server:
   ```powershell
   cd e:\SMS-CLEAN\sms\backend
   npm run dev
   ```

2. Navigate to Principal Dashboard → Transport
3. Verify:
   - Buses load without 404 errors
   - Bus cards display with status, capacity, insurance/fitness expiry dates
   - Trips tab shows trip history
   - Filters work correctly (status filter)
   - Pagination works for trips

## Related Endpoints
The GPS tracking endpoints remain unchanged:
- `GET /api/principal/tracking/active-trips` - Live GPS tracking
- `GET /api/principal/tracking/trip/:id` - Detailed trip with GPS history
- `POST /api/principal/tracking/trip/:id/location` - Update bus location
- `POST /api/principal/tracking/start-trip` - Start new trip
- `POST /api/principal/tracking/end-trip/:id` - End active trip
- `GET /api/principal/tracking/stats` - Real-time statistics

## Notes
- Both new endpoints are protected with authentication, role check (PRINCIPAL), and school scope middleware
- Endpoints return data only for the principal's assigned school
- The `/transport/buses` endpoint includes current trip information for real-time status display
- The `/transport/trips` endpoint supports filtering and pagination for large datasets
