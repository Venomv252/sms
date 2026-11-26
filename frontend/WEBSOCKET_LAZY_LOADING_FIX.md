# WebSocket Lazy Loading Fix

## Problem
The WebSocket connection was being established on **every page** as soon as the app loaded, even when the user was not on the Bus Tracking page. This caused:
- Unnecessary WebSocket connections
- Wasted server resources
- Potential authentication/verification issues
- Network overhead on pages that don't need GPS tracking

## Solution
Implemented **lazy WebSocket connection** that only connects when the Bus Tracking page is accessed.

---

## Changes Made

### 1. TrackingContext.jsx - Added Lazy Activation

**Before**:
```javascript
// Connected immediately on mount
useEffect(() => {
  connectWebSocket();
  // ...
}, []);
```

**After**:
```javascript
// Only connect when isActive = true
const [isActive, setIsActive] = useState(false);

useEffect(() => {
  if (!isActive) {
    disconnectWebSocket();
    return;
  }
  connectWebSocket();
  // ...
}, [isActive]);
```

#### Added Functions

**activateTracking()**
```javascript
const activateTracking = useCallback(() => {
  setIsActive(true);
}, []);
```
- Call this when entering Bus Tracking page
- Triggers WebSocket connection

**deactivateTracking()**
```javascript
const deactivateTracking = useCallback(() => {
  setIsActive(false);
  disconnectWebSocket();
}, []);
```
- Call this when leaving Bus Tracking page
- Closes WebSocket connection immediately

#### Updated watchTrip()
```javascript
const watchTrip = useCallback((tripId) => {
  // Activate tracking when a trip is watched
  setIsActive(true);
  // ... rest of code
}, []);
```
- Automatically activates tracking when watching a trip
- Ensures WebSocket is connected before subscribing

---

### 2. LiveTracking.jsx - Activate/Deactivate on Mount/Unmount

**Added**:
```javascript
const { 
  busLocations, 
  watchTrip, 
  connected, 
  activateTracking,      // NEW
  deactivateTracking     // NEW
} = useTracking();

// Activate tracking when component mounts
useEffect(() => {
  console.log('LiveTracking: Activating GPS tracking');
  activateTracking();

  return () => {
    console.log('LiveTracking: Deactivating GPS tracking');
    deactivateTracking();
  };
}, [activateTracking, deactivateTracking]);
```

**What This Does**:
1. User navigates to Bus Tracking page → `activateTracking()` called
2. WebSocket connection established
3. GPS data starts flowing
4. User leaves page → `deactivateTracking()` called
5. WebSocket connection closed immediately
6. No resources wasted

---

## Flow Diagram

### Before (Always Connected)
```
App Load
  ↓
TrackingProvider mounts
  ↓
WebSocket connects immediately
  ↓
Stays connected on ALL pages
  ↓
Unnecessary resource usage
```

### After (Lazy Connection)
```
App Load
  ↓
TrackingProvider mounts
  ↓
WebSocket NOT connected (isActive = false)
  ↓
User on Overview/Students/Fees pages
  ↓
No WebSocket (Good! 👍)
  ↓
User navigates to Bus Tracking
  ↓
activateTracking() called
  ↓
WebSocket connects (isActive = true)
  ↓
GPS data flows
  ↓
User leaves Bus Tracking page
  ↓
deactivateTracking() called
  ↓
WebSocket disconnects immediately
  ↓
No resources wasted (Good! 👍)
```

---

## API Changes

### TrackingContext Exports

**Before**:
```javascript
{
  busLocations,
  connected,
  notifications,
  watchTrip,
  unwatchTrip,
  addNotification,
  dismissNotification,
  reconnect
}
```

**After** (Added):
```javascript
{
  busLocations,
  connected,
  notifications,
  isActive,              // NEW: Whether tracking is active
  activateTracking,      // NEW: Activate WebSocket
  deactivateTracking,    // NEW: Deactivate WebSocket
  watchTrip,
  unwatchTrip,
  addNotification,
  dismissNotification,
  reconnect
}
```

---

## Usage Example

### In Any Bus Tracking Component

```javascript
import { useTracking } from '../context/TrackingContext';

function MyBusTrackingComponent() {
  const { activateTracking, deactivateTracking, busLocations } = useTracking();
  
  useEffect(() => {
    // Start tracking when component mounts
    activateTracking();
    
    return () => {
      // Stop tracking when component unmounts
      deactivateTracking();
    };
  }, [activateTracking, deactivateTracking]);
  
  // Rest of component...
}
```

### Manual Control (Advanced)

```javascript
function MyComponent() {
  const { activateTracking, deactivateTracking, isActive } = useTracking();
  
  const handleStartTracking = () => {
    activateTracking();
  };
  
  const handleStopTracking = () => {
    deactivateTracking();
  };
  
  return (
    <div>
      <p>Tracking: {isActive ? 'Active' : 'Inactive'}</p>
      <button onClick={handleStartTracking}>Start Tracking</button>
      <button onClick={handleStopTracking}>Stop Tracking</button>
    </div>
  );
}
```

---

## Benefits

### 1. Resource Efficiency
- ✅ No WebSocket connection on pages that don't need it
- ✅ Saves server resources (fewer connections)
- ✅ Saves client bandwidth
- ✅ Reduces battery usage on mobile devices

### 2. Security
- ✅ WebSocket only connects when needed
- ✅ Token verification only happens on Bus Tracking page
- ✅ Reduced attack surface

### 3. Performance
- ✅ Faster initial app load (no WebSocket handshake)
- ✅ No unnecessary network traffic
- ✅ No background processes on non-tracking pages

### 4. User Experience
- ✅ App loads faster
- ✅ No console errors about WebSocket on other pages
- ✅ Clear activation/deactivation logging

---

## Console Logs

### When Navigating to Bus Tracking Page
```
LiveTracking: Activating GPS tracking
Connecting to WebSocket: ws://localhost:5000/ws/abc123?token=...
WebSocket connected
WebSocket handshake complete
Subscribed to trip: trip-id-1
Subscribed to trip: trip-id-2
```

### When Leaving Bus Tracking Page
```
LiveTracking: Deactivating GPS tracking
WebSocket disconnected: 1000
```

---

## Backward Compatibility

### Existing Code Still Works
If you have code that calls `watchTrip()`, it will automatically activate tracking:

```javascript
// This will auto-activate tracking
watchTrip('some-trip-id');
```

No changes needed to existing `watchTrip()` calls!

---

## Testing Checklist

- [ ] Navigate to Overview page - WebSocket should NOT connect
- [ ] Navigate to Students page - WebSocket should NOT connect
- [ ] Navigate to Bus Tracking page - WebSocket SHOULD connect
- [ ] Check console: "Activating GPS tracking" message
- [ ] Verify WebSocket connection in Network tab
- [ ] Leave Bus Tracking page - WebSocket SHOULD disconnect
- [ ] Check console: "Deactivating GPS tracking" message
- [ ] Return to Bus Tracking page - WebSocket SHOULD reconnect
- [ ] Multiple tabs: Each tab manages its own connection
- [ ] Network offline: Reconnect when back online (existing behavior)

---

## Files Modified

| File | Changes |
|------|---------|
| `sms/frontend/src/context/TrackingContext.jsx` | Added `isActive` state, `activateTracking()`, `deactivateTracking()`, conditional WebSocket connection |
| `sms/frontend/src/role-dashboards/principal/pages/LiveTracking.jsx` | Added `useEffect` to activate/deactivate tracking on mount/unmount |

---

## Migration Guide

### For Other Pages Using Bus Tracking

If you have other components that need bus tracking (e.g., Parent Dashboard, Driver Dashboard), follow this pattern:

```javascript
// 1. Import the hook
import { useTracking } from '../context/TrackingContext';

// 2. Get activate/deactivate functions
const { activateTracking, deactivateTracking, busLocations } = useTracking();

// 3. Activate on mount, deactivate on unmount
useEffect(() => {
  activateTracking();
  
  return () => {
    deactivateTracking();
  };
}, [activateTracking, deactivateTracking]);

// 4. Use busLocations as before
```

---

## Troubleshooting

### WebSocket Not Connecting on Bus Tracking Page

**Check**:
1. `activateTracking()` is being called
2. User role is in `allowedRoles` (PRINCIPAL, PARENT, DRIVER, MANAGEMENT)
3. Authentication token is present
4. Console logs show "Activating GPS tracking"

### WebSocket Stays Connected After Leaving Page

**Check**:
1. `deactivateTracking()` is being called in cleanup
2. Console logs show "Deactivating GPS tracking"
3. Component cleanup is running (check useEffect return)

### GPS Data Not Updating

**Check**:
1. `watchTrip()` is being called after activation
2. Trip IDs are correct
3. Backend is sending data
4. Console shows "Subscribed to trip: ..." messages

---

## Future Enhancements

### Possible Improvements

1. **Persistent Activation**
   ```javascript
   // Remember if user wants tracking active across sessions
   localStorage.setItem('tracking_active', 'true');
   ```

2. **Background Tracking**
   ```javascript
   // Keep connection alive when switching tabs (optional)
   window.addEventListener('visibilitychange', handleVisibility);
   ```

3. **Connection Pooling**
   ```javascript
   // Share single WebSocket across multiple tracking components
   ```

4. **Graceful Degradation**
   ```javascript
   // Fall back to polling if WebSocket fails
   if (!connected) {
     startPolling();
   }
   ```

---

## Summary

✅ **WebSocket now only connects when needed**

### Key Changes
- Added `isActive` state to TrackingContext
- Added `activateTracking()` and `deactivateTracking()` functions
- Modified `useEffect` to conditionally connect based on `isActive`
- Updated LiveTracking component to activate/deactivate on mount/unmount

### Benefits
- 🚀 Faster initial app load
- 💰 Reduced server resource usage
- 🔒 Better security (connection only when needed)
- 📱 Better battery life on mobile devices
- 🎯 Clean, predictable behavior

The WebSocket connection is now **lazy-loaded** and only establishes when the user actually needs GPS tracking! 🎉
