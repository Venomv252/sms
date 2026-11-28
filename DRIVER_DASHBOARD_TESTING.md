# Driver Dashboard Testing Guide

## 🚀 Quick Start

### Prerequisites Setup

1. **Database Setup**
```bash
cd sms/backend
npx prisma db push
```

2. **Start Backend**
```bash
cd sms/backend
npm start
# Should run on http://localhost:5000
```

3. **Start Frontend**
```bash
cd sms/frontend
npm run dev
# Should run on http://localhost:5173 or similar
```

4. **Test Data Requirements**
- ✅ User with `DRIVER` role in database
- ✅ Driver record linked to user (via `userId`)
- ✅ Bus assigned to driver
- ✅ Route assigned to driver (with pickup points)
- ✅ Students assigned to the route

---

## 📋 Quick Test Checklist (5 minutes)

### ✅ Test 1: Login & Dashboard (1 min)
1. Login with driver credentials
2. Navigate to Driver Dashboard
3. **Expected:** Dashboard loads with driver info, bus info, route summary

### ✅ Test 2: Start Trip (1 min)
1. Click "Start Trip" button
2. Confirm in modal
3. **Expected:** 
   - Success message
   - GPS status appears
   - "Active Trip" banner visible
   - Browser asks for location permission

### ✅ Test 3: Student Roster (1 min)
1. Navigate to "Student Roster"
2. Click "Pick Up" on a student
3. **Expected:**
   - Student status changes to green "Picked Up"
   - Timestamp displayed
   - Stats update

### ✅ Test 4: GPS Tracking (1 min)
1. While trip is active, grant GPS permission
2. Check GPS indicator shows "GPS Active" (green with pulse)
3. Wait 30 seconds
4. **Expected:** Network tab shows PATCH request to `/driver/trips/:id/location`

### ✅ Test 5: End Trip (1 min)
1. Click "End Trip" button
2. Review summary page
3. Add optional notes
4. Click "End Trip" to confirm
5. **Expected:**
   - Redirect to dashboard
   - "No Active Trip" message
   - GPS tracking stopped

---

## 🔍 Detailed Testing Scenarios

### Scenario 1: Complete Trip Lifecycle

**Steps:**
1. Login as driver
2. Verify "No Active Trip" on dashboard
3. Click "Start Trip"
4. Modal shows: Route name, bus number, pickup count
5. Click "Start Trip" in modal
6. Grant GPS permission when prompted
7. GPS status shows "Active" (green)
8. Navigate to Student Roster
9. Mark 2-3 students as "Picked Up"
10. Return to dashboard
11. Click "End Trip"
12. Review student status (picked up count shown)
13. Add note: "Morning route completed on time"
14. Click "End Trip"
15. Verify redirect to dashboard with "No Active Trip"

**Expected Results:**
- ✅ Trip created in database
- ✅ GPS location updates logged (check network tab)
- ✅ Student pickup logs created
- ✅ Trip ended with notes saved
- ✅ All UI states transition correctly

---

### Scenario 2: Student Management

**Steps:**
1. Start a trip (see Scenario 1)
2. Navigate to Student Roster
3. Use search box: Type student name
4. Click filter: "Not Marked"
5. Click "Pick Up" on first student
6. Wait for success message
7. Try clicking "Pick Up" again on same student
8. Click filter: "Picked Up"
9. Click "Drop Off" on the picked up student
10. Click filter: "Dropped Off"
11. Refresh page

**Expected Results:**
- ✅ Search filters list correctly
- ✅ Filter buttons work properly
- ✅ First pickup succeeds
- ✅ Duplicate pickup shows error message
- ✅ Drop off changes status to blue
- ✅ Filters update stats cards
- ✅ Status persists after refresh

---

### Scenario 3: Fuel Expense Tracking

**Steps:**
1. Navigate to "Fuel & Expenses"
2. Click "New Expense"
3. Fill form:
   - Fuel Type: Diesel
   - Quantity: 50
   - Price per Liter: 98.50
   - Vendor: IOCL Whitefield
   - Location: Station #14
   - Receipt: VOUCH-001
   - Odometer: 45320
   - Notes: "Morning refill"
4. Verify total auto-calculates to 4925.00
5. Click "Submit Expense"
6. Verify expense appears in history
7. Submit another expense with different values
8. Check both expenses visible

**Expected Results:**
- ✅ Form validation works
- ✅ Auto-calculation correct
- ✅ Expense saved to database
- ✅ History displays correctly
- ✅ All fields shown properly

---

### Scenario 4: Breakdown Reporting

**Steps:**
1. Navigate to "Breakdown"
2. Click "Report Breakdown"
3. Fill form:
   - Issue Type: Engine Issue
   - Severity: High
   - Location: ECC Road
   - Description: "Engine overheating, temperature gauge in red zone"
   - Status: Unresolved
4. Submit
5. Verify breakdown shows orange/red indicator (high severity)
6. Report another with "Low" severity
7. Verify color coding different

**Expected Results:**
- ✅ Form submits successfully
- ✅ Severity colors correct (Low=green, High=orange/red, Critical=red)
- ✅ History displays with details
- ✅ Location and description visible

---

### Scenario 5: Incident Reporting

**Steps:**
1. Navigate to "Incidents"
2. Click "Report Incident"
3. Fill form:
   - Type: Student Safety Issue
   - Severity: Medium
   - Location: Hope Farm Junction
   - Description: "Student felt dizzy, provided water and informed parents"
   - Notes: "Parent contacted, student recovering"
4. Submit
5. Try different incident type: Route Disruption
6. Verify different color coding

**Expected Results:**
- ✅ Incident saved
- ✅ Type-specific colors (Accident=red, Safety=orange, Disruption=blue)
- ✅ All details displayed in history
- ✅ Notes section shown

---

### Scenario 6: Route Waypoints

**Steps:**
1. Navigate to "Route Waypoints"
2. Verify route summary shows:
   - Total stops count
   - Total students
   - Distance (if configured)
3. Check pickup points list
4. Verify first point has green circle (start)
5. Verify last point has blue circle (end)
6. Check student count per stop
7. Check estimated times displayed

**Expected Results:**
- ✅ All route data loads from backend
- ✅ Stats cards accurate
- ✅ Pickup points in correct order
- ✅ Visual indicators (colors, numbers) correct

---

## 🐛 Error Testing

### Test Error Handling

**Test 1: No Route Assigned**
1. Login with driver who has no route
2. **Expected:** Dashboard shows "No Route Assigned" message

**Test 2: Network Error**
1. Stop backend server
2. Try any action on frontend
3. **Expected:** Error message displayed with red banner
4. Click dismiss button
5. **Expected:** Error message closes

**Test 3: Duplicate Prevention**
1. Start trip
2. Mark student as picked up
3. Try marking same student as picked up again
4. **Expected:** Error message: "Student already marked as picked up"

**Test 4: Invalid Trip End**
1. Without active trip, manually navigate to `/trip-end/999`
2. **Expected:** Error page or redirect with message

**Test 5: GPS Permission Denied**
1. Start trip
2. Deny GPS permission
3. **Expected:** GPS status shows "Permission Denied" (red)
4. Helpful error message displayed

---

## 📊 Database Verification

### Check Database Records

After completing test scenarios, verify database:

```sql
-- Check trip created
SELECT * FROM Trip WHERE driverId = YOUR_DRIVER_ID ORDER BY id DESC LIMIT 1;

-- Check student logs
SELECT * FROM StudentPickupLog WHERE tripId = YOUR_TRIP_ID;

-- Check fuel expenses
SELECT * FROM FuelExpense WHERE driverId = YOUR_DRIVER_ID;

-- Check breakdowns
SELECT * FROM VehicleBreakdown WHERE driverId = YOUR_DRIVER_ID;

-- Check incidents
SELECT * FROM Incident WHERE driverId = YOUR_DRIVER_ID;
```

Or use Prisma Studio:
```bash
npx prisma studio
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

**Issue:** "Failed to load dashboard data"
- ✅ Check backend is running (port 5000)
- ✅ Check database connection
- ✅ Verify JWT token in localStorage
- ✅ Check browser console for errors

**Issue:** GPS not working
- ✅ Use HTTPS or localhost (required for geolocation)
- ✅ Grant browser location permission
- ✅ Check browser console for geolocation errors

**Issue:** "No route assigned"
- ✅ Verify Driver has busRouteId set
- ✅ Check BusRoute exists with pickup points
- ✅ Run: `SELECT * FROM Driver WHERE userId = YOUR_USER_ID;`

**Issue:** Students not showing
- ✅ Check StudentRouteAssignment records exist
- ✅ Verify students linked to driver's route
- ✅ Check database: `SELECT * FROM StudentRouteAssignment WHERE routeId = YOUR_ROUTE_ID;`

**Issue:** Trip won't start
- ✅ Check no active trip exists: `SELECT * FROM Trip WHERE driverId = X AND status = 'IN_PROGRESS';`
- ✅ Verify driver has assigned route
- ✅ Check browser console and network tab

---

## 📱 Browser Testing

Test on multiple browsers:
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

Test GPS on:
- ✅ Desktop (uses IP-based location)
- ✅ Mobile device (uses actual GPS)

---

## ✅ Success Criteria

Implementation is successful if:

1. **Dashboard**
   - [x] Loads without errors
   - [x] Shows real driver/bus/route data
   - [x] Stats display correctly
   - [x] Quick actions navigate properly

2. **Trip Management**
   - [x] Can start trip
   - [x] Active trip persists after refresh
   - [x] Can end trip with notes
   - [x] Duplicate trips prevented

3. **GPS Tracking**
   - [x] Requests permission correctly
   - [x] Shows status indicator
   - [x] Sends updates every 30 seconds
   - [x] Stops when trip ends

4. **Student Roster**
   - [x] Displays all assigned students
   - [x] Search works
   - [x] Filters work
   - [x] Pickup/dropoff recording works
   - [x] Duplicate prevention works

5. **Forms (Fuel, Breakdown, Incidents)**
   - [x] Form validation works
   - [x] Submission succeeds
   - [x] History displays
   - [x] All fields saved correctly

6. **Error Handling**
   - [x] Network errors shown
   - [x] Loading states displayed
   - [x] Empty states helpful
   - [x] Validation errors clear

---

## 📝 Test Report Template

```markdown
# Driver Dashboard Test Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Development/Staging/Production]

## Test Results

### Trip Lifecycle
- [ ] Start Trip: Pass / Fail / Notes: ___________
- [ ] GPS Tracking: Pass / Fail / Notes: ___________
- [ ] End Trip: Pass / Fail / Notes: ___________

### Student Management
- [ ] View Roster: Pass / Fail / Notes: ___________
- [ ] Search/Filter: Pass / Fail / Notes: ___________
- [ ] Pickup Recording: Pass / Fail / Notes: ___________
- [ ] Dropoff Recording: Pass / Fail / Notes: ___________
- [ ] Duplicate Prevention: Pass / Fail / Notes: ___________

### Expense Management
- [ ] Fuel Expense: Pass / Fail / Notes: ___________
- [ ] Breakdown Report: Pass / Fail / Notes: ___________
- [ ] Incident Report: Pass / Fail / Notes: ___________

### UI/UX
- [ ] Loading States: Pass / Fail / Notes: ___________
- [ ] Error Handling: Pass / Fail / Notes: ___________
- [ ] Navigation: Pass / Fail / Notes: ___________
- [ ] Responsive Design: Pass / Fail / Notes: ___________

## Issues Found
1. [Issue description]
2. [Issue description]

## Overall Result
[ ] All tests passed
[ ] Minor issues (non-blocking)
[ ] Major issues (blocking)

## Notes
[Additional observations]
```

---

## 🎯 Next Steps After Testing

1. **If tests pass:**
   - Deploy to staging
   - User acceptance testing
   - Deploy to production

2. **If issues found:**
   - Log issues with screenshots
   - Fix critical bugs first
   - Retest after fixes

3. **Future enhancements:**
   - See DRIVER_DASHBOARD_IMPLEMENTATION.md "Future Enhancements" section
   - Prioritize based on user feedback

---

**Good luck with testing! 🚀**
