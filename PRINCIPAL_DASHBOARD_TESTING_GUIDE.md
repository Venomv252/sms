# Principal Dashboard - Testing Guide

## Overview
This comprehensive testing guide covers all aspects of the Principal Dashboard to ensure proper functionality before production deployment.

## Pre-Testing Setup

### 1. Database Setup
```bash
cd backend
npx prisma migrate dev --name add_principal_dashboard_models
npx prisma generate
```

### 2. Seed Test Data (if needed)
Create test data for:
- Principal account
- Students (various grades and sections)
- Teachers (various departments)
- Fee payments (various statuses)
- Notices, complaints, leave requests

### 3. Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Authentication & Authorization Tests

### Test 1: Principal Login
- [ ] Can log in with valid Principal credentials
- [ ] Cannot log in with invalid credentials
- [ ] Session persists on page refresh
- [ ] Redirects to login when session expires

### Test 2: Role-Based Access
- [ ] Principal can access `/principal` dashboard
- [ ] Non-Principal users redirected from Principal routes
- [ ] School-scoped data isolation verified

### Test 3: JWT Token
- [ ] Token included in API requests
- [ ] Token expires appropriately
- [ ] Refresh mechanism works (if implemented)

## Dashboard Overview Tests

### Test 4: Overview Page Load
- [ ] Dashboard loads without errors
- [ ] All statistics display correct data
- [ ] KPI cards show accurate numbers
- [ ] Charts render properly
- [ ] Recent activity sections populated
- [ ] No console errors

### Test 5: Overview Data Accuracy
- [ ] Total students count matches database
- [ ] Total teachers count accurate
- [ ] Attendance percentage calculated correctly
- [ ] Fee collection rate accurate
- [ ] Class-wise distribution correct

## Student Management Tests

### Test 6: Student Listing
- [ ] Students load with pagination
- [ ] Search by name works
- [ ] Search by roll number works
- [ ] Search by admission number works
- [ ] Grade filter works correctly
- [ ] Section filter works correctly
- [ ] Clear filters button works
- [ ] Pagination controls function

### Test 7: Student Details Modal
- [ ] Modal opens on "View" button click
- [ ] Shows complete student information
- [ ] Displays attendance rate accurately
- [ ] Shows fee payment status
- [ ] Parent/guardian details visible
- [ ] Modal closes on X button
- [ ] Modal closes on backdrop click

### Test 8: Student Data Isolation
- [ ] Only students from Principal's school visible
- [ ] Cannot access other school's student data

## Teacher Management Tests

### Test 9: Teacher Listing
- [ ] Teachers load with pagination
- [ ] Search by name/employee ID works
- [ ] Department filter functions
- [ ] Shows correct number of classes
- [ ] Displays subject assignments
- [ ] Clear filter works

### Test 10: Teacher Data
- [ ] Employee IDs display correctly
- [ ] Department names accurate
- [ ] Designation shown properly
- [ ] Contact information visible

## Accountant Management Tests

### Test 11: Accountant Creation
- [ ] Form validates required fields
- [ ] Email validation works
- [ ] Employee ID uniqueness enforced
- [ ] Secure password generated (12 characters)
- [ ] Credentials displayed ONE TIME only
- [ ] Cannot view credentials after modal close
- [ ] New accountant appears in list
- [ ] Database record created correctly

### Test 12: Accountant Listing
- [ ] All accountants for school displayed
- [ ] Shows employee ID, email, status
- [ ] Active/inactive status accurate
- [ ] Permission settings visible

### Test 13: Credential Security
- [ ] Password never stored in plaintext
- [ ] Credentials not logged
- [ ] Warning message displayed
- [ ] Copy/paste functionality works

## Finance Module Tests

### Test 14: Financial Summary
- [ ] Total fees calculated correctly
- [ ] Collection rate accurate
- [ ] Fee by status breakdown correct
- [ ] Fee by term analysis accurate
- [ ] Defaulters list populated
- [ ] KPI cards show correct values

### Test 15: Fee Defaulters
- [ ] Shows only overdue payments
- [ ] Student names and classes correct
- [ ] Amount and due dates accurate
- [ ] Sorted by due date (oldest first)

## Notice Management Tests

### Test 16: Notice Creation
- [ ] Form validates title and content
- [ ] Category selection works
- [ ] Priority levels function
- [ ] Publish date picker works
- [ ] Expiry date optional
- [ ] Notice saved to database
- [ ] Appears in notice list

### Test 17: Notice Listing
- [ ] All notices display
- [ ] Active filter works
- [ ] Inactive filter works
- [ ] Priority badges colored correctly
- [ ] Category tags visible
- [ ] Pagination functions
- [ ] Notice cards styled properly

### Test 18: Notice Filtering
- [ ] Can switch between All/Active/Inactive
- [ ] Filter updates list immediately
- [ ] Pagination resets on filter change

## Complaint Management Tests

### Test 19: Complaint Listing
- [ ] Complaints load correctly
- [ ] Status filter works for all statuses
- [ ] Priority filter functions
- [ ] Clear filters works
- [ ] Pagination works
- [ ] Confidential badge shows appropriately

### Test 20: Complaint Update
- [ ] Modal opens with complaint details
- [ ] Can update status
- [ ] Resolution field required when resolved
- [ ] Remarks field saves
- [ ] Status update persists
- [ ] Updated complaint reflects changes

### Test 21: Complaint Status Flow
- [ ] Can move from SUBMITTED → UNDER_REVIEW
- [ ] Can assign complaint
- [ ] Can mark IN_PROGRESS
- [ ] Can resolve with resolution notes
- [ ] Can reject with reason
- [ ] Status colors update correctly

## Leave Management Tests

### Test 22: Leave Listing
- [ ] Leave requests load correctly
- [ ] Filter by PENDING shows only pending
- [ ] Filter by APPROVED works
- [ ] Filter by REJECTED works
- [ ] All requests filter shows everything
- [ ] Duration calculated correctly
- [ ] Applicant details complete

### Test 23: Leave Approval
- [ ] Approve button opens modal
- [ ] Can add optional note
- [ ] Approval persists to database
- [ ] Leave disappears from pending list
- [ ] Appears in approved list
- [ ] Success message displayed

### Test 24: Leave Rejection
- [ ] Reject button opens modal
- [ ] Rejection reason required
- [ ] Cannot submit without reason
- [ ] Rejection persists
- [ ] Admin note saved correctly
- [ ] Error shown if no reason

## Transport Module Tests

### Test 25: Bus Listing
- [ ] All school buses displayed
- [ ] Active/inactive status correct
- [ ] Capacity shown
- [ ] Insurance expiry dates visible
- [ ] Fitness expiry visible
- [ ] Warning colors for expired documents
- [ ] Current trip shows if in progress

### Test 26: Trip History
- [ ] Trips load with pagination
- [ ] Status filter works
- [ ] Shows bus number and route
- [ ] Start/end times display
- [ ] Delay minutes shown if applicable
- [ ] Trip status accurate

## Academic Calendar Tests

### Test 27: Calendar Event Creation
- [ ] Form validates required fields
- [ ] Event type selection works
- [ ] Start date required
- [ ] End date optional
- [ ] Notification checkboxes function
- [ ] Event saves to database
- [ ] Appears in calendar view

### Test 28: Calendar Display
- [ ] Events grouped by month
- [ ] Chronological order maintained
- [ ] Color coding by event type
- [ ] Edit button opens form with data
- [ ] Delete button removes event
- [ ] Confirmation on delete

### Test 29: Event Filtering
- [ ] Event type filter works
- [ ] Clear filter resets view
- [ ] All event types show correctly

## Inventory Module Tests

### Test 30: Inventory Listing
- [ ] Items load correctly
- [ ] Category filter works
- [ ] Quantity displayed
- [ ] Condition shown
- [ ] Location visible
- [ ] Maintenance warning shows if needed

### Test 31: Maintenance Requests
- [ ] Requests load correctly
- [ ] Status filter functions
- [ ] Priority levels visible
- [ ] Cost shown if available
- [ ] Item details complete

## Reports Module Tests

### Test 32: Attendance Report
- [ ] Date range required validation
- [ ] Grade filter optional
- [ ] Section filter optional
- [ ] Report generates correctly
- [ ] Shows student-wise breakdown
- [ ] Attendance rate calculated
- [ ] Summary statistics accurate

### Test 33: Fee Collection Report
- [ ] Academic year filter works
- [ ] Term filter functions
- [ ] Status filter works
- [ ] Report generates with data
- [ ] Summary totals correct
- [ ] Details list accurate
- [ ] Pagination if needed

### Test 34: Report Export (if implemented)
- [ ] PDF export button visible
- [ ] Export generates file
- [ ] File contains correct data

## Audit Logs Tests

### Test 35: Audit Log Display
- [ ] Logs load correctly
- [ ] Shows user actions
- [ ] Timestamps accurate
- [ ] Action types correct
- [ ] Entity types visible
- [ ] IP addresses shown
- [ ] Pagination works

### Test 36: Audit Log Filtering
- [ ] Action filter works for all types
- [ ] Entity type filter functions
- [ ] Clear filters works
- [ ] Filtered results accurate

### Test 37: Audit Log Security
- [ ] Logs are read-only
- [ ] No edit/delete options
- [ ] Warning message displayed
- [ ] Cannot modify logs via API

## UI/UX Tests

### Test 38: Design Consistency
- [ ] Green theme (#16a36a) throughout
- [ ] Matches Director/Super Admin style
- [ ] No purple gradients
- [ ] No emoji icons
- [ ] Professional appearance
- [ ] Consistent fonts and spacing

### Test 39: Navigation
- [ ] All sidebar links work
- [ ] Active page highlighted
- [ ] Breadcrumbs if applicable
- [ ] Back buttons function
- [ ] No broken links

### Test 40: Loading States
- [ ] Loading indicators show during API calls
- [ ] Skeleton screens or spinners
- [ ] No flickering or jumping content
- [ ] Smooth transitions

### Test 41: Error Handling
- [ ] API errors display user-friendly messages
- [ ] Network errors handled gracefully
- [ ] 404 errors shown appropriately
- [ ] 403/401 redirects to login
- [ ] Error messages dismissible

### Test 42: Empty States
- [ ] Empty lists show helpful messages
- [ ] No students shows appropriate text
- [ ] No data shows guidance
- [ ] Empty search results clear

### Test 43: Success Messages
- [ ] Success toasts appear on actions
- [ ] Messages auto-dismiss
- [ ] Can manually dismiss
- [ ] Clear and informative

## Responsive Design Tests

### Test 44: Mobile (< 768px)
- [ ] Sidebar collapses to hamburger menu
- [ ] Tables stack appropriately
- [ ] Forms remain usable
- [ ] Buttons accessible
- [ ] No horizontal scroll
- [ ] Touch targets adequate size

### Test 45: Tablet (768px - 1024px)
- [ ] Layout adapts properly
- [ ] Cards resize correctly
- [ ] Navigation functional
- [ ] Modals fit screen

### Test 46: Desktop (> 1024px)
- [ ] Full layout displays
- [ ] Optimal spacing
- [ ] Charts sized appropriately
- [ ] Multi-column layouts work

## Performance Tests

### Test 47: Load Times
- [ ] Dashboard loads < 3 seconds
- [ ] API responses < 1 second
- [ ] No unnecessary re-renders
- [ ] Lazy loading works

### Test 48: Large Datasets
- [ ] Pagination handles 1000+ records
- [ ] Search remains responsive
- [ ] Filters don't slow down
- [ ] No browser freezing

## Security Tests

### Test 49: Data Isolation
- [ ] Cannot access other schools' data via API
- [ ] Cannot modify URL to access other resources
- [ ] School ID properly validated
- [ ] Authorization checked on backend

### Test 50: Input Validation
- [ ] XSS attacks prevented
- [ ] SQL injection not possible (Prisma)
- [ ] Invalid inputs rejected
- [ ] Proper sanitization

### Test 51: Session Security
- [ ] Session timeout works
- [ ] Logout clears session
- [ ] Cannot reuse expired tokens
- [ ] HTTPS enforced in production

## Cross-Browser Tests

### Test 52: Chrome
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

### Test 53: Firefox
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

### Test 54: Safari
- [ ] All features work
- [ ] Styling correct
- [ ] Date pickers work
- [ ] No console errors

### Test 55: Edge
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

## Integration Tests

### Test 56: Director/Super Admin Compatibility
- [ ] Director dashboard still works
- [ ] Super Admin dashboard still works
- [ ] No CSS conflicts
- [ ] Shared components function

### Test 57: Existing Features
- [ ] Student portal unaffected
- [ ] Teacher dashboard functional
- [ ] Parent dashboard works
- [ ] Authentication system intact

## Regression Tests

### Test 58: Old Principal Dashboard
- [ ] Old dashboard still accessible (if kept)
- [ ] No breaking changes to existing routes
- [ ] Database backward compatible

### Test 59: API Backward Compatibility
- [ ] Existing API endpoints work
- [ ] No breaking changes to responses
- [ ] Other roles not affected

## Accessibility Tests

### Test 60: Keyboard Navigation
- [ ] Can navigate with Tab key
- [ ] Forms accessible via keyboard
- [ ] Modals can be closed with Escape
- [ ] Focus indicators visible

### Test 61: Screen Reader
- [ ] ARIA labels present
- [ ] Alt text on images
- [ ] Semantic HTML used
- [ ] Form labels associated

### Test 62: Color Contrast
- [ ] Text readable on backgrounds
- [ ] WCAG AA compliance
- [ ] Status colors distinguishable

## Production Readiness Checklist

### Code Quality
- [ ] No console.log statements
- [ ] No TODO comments
- [ ] No hardcoded values
- [ ] Error boundaries implemented
- [ ] Proper error handling

### Documentation
- [ ] API documentation complete
- [ ] Deployment guide available
- [ ] User guide prepared
- [ ] Code comments present

### Configuration
- [ ] Environment variables configured
- [ ] Production API URLs set
- [ ] Error tracking enabled
- [ ] Analytics configured (if applicable)

### Security
- [ ] All routes protected
- [ ] Data validation complete
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] CSRF tokens (if applicable)

### Performance
- [ ] Bundle size optimized
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Caching configured

## Sign-Off

### Developer Sign-Off
- [ ] All features implemented
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Code reviewed
- [ ] Documentation complete

**Developer Name:** ________________  
**Date:** ________________  
**Signature:** ________________

### QA Sign-Off
- [ ] All test cases executed
- [ ] Critical bugs resolved
- [ ] Non-critical bugs documented
- [ ] Regression testing complete
- [ ] Performance acceptable

**QA Name:** ________________  
**Date:** ________________  
**Signature:** ________________

### Product Owner Sign-Off
- [ ] Requirements met
- [ ] User acceptance testing complete
- [ ] Ready for production deployment

**Product Owner Name:** ________________  
**Date:** ________________  
**Signature:** ________________

---

**Version:** 1.0.0  
**Last Updated:** [Current Date]  
**Total Test Cases:** 62  
**Passed:** ____  
**Failed:** ____  
**Blocked:** ____  
**Not Tested:** ____
