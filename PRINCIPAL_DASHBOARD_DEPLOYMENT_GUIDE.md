# Principal Dashboard - Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the redesigned Principal Dashboard to production.

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database
- Existing SchoolERP application running
- Principal account with appropriate permissions

## Database Migration

### 1. Run Prisma Migration
```bash
cd backend
npx prisma migrate dev --name add_principal_dashboard_models
```

This migration adds the following models:
- Accountant
- Complaint
- AcademicEvent
- InventoryItem
- MaintenanceRequest
- AuditLog
- Bus
- Trip
- NoticeRecipient
- AdmissionApplication

### 2. Verify Schema
```bash
npx prisma generate
```

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Ensure your `.env` file contains:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/school_erp"
DIRECT_URL="postgresql://user:password@localhost:5432/school_erp"
JWT_SECRET="your-secret-key"
NODE_ENV="production"
```

### 3. Start Backend Server
```bash
npm start
```

The principal routes will be available at `/api/principal/*`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Test Build
```bash
npm run preview
```

## API Endpoints Reference

### Dashboard
- `GET /api/principal/dashboard/overview` - Main dashboard statistics

### Student Management
- `GET /api/principal/students` - List students (with pagination)
- `GET /api/principal/students/:id` - Student details

### Teacher Management
- `GET /api/principal/teachers` - List teachers (with pagination)

### Accountant Management
- `POST /api/principal/accountants` - Create accountant
- `GET /api/principal/accountants` - List accountants

### Financial Management
- `GET /api/principal/finance/summary` - Financial overview

### Notice Management
- `GET /api/principal/notices` - List notices
- `POST /api/principal/notices` - Create notice

### Complaint Management
- `GET /api/principal/complaints` - List complaints
- `POST /api/principal/complaints/:id/update` - Update complaint

### Leave Management
- `GET /api/principal/leaves` - List leave requests
- `POST /api/principal/leaves/:id/approve` - Approve leave
- `POST /api/principal/leaves/:id/reject` - Reject leave

### Transport
- `GET /api/principal/transport/buses` - List buses
- `GET /api/principal/transport/trips` - List trips

### Academic Calendar
- `GET /api/principal/academic-calendar` - List events
- `POST /api/principal/academic-calendar` - Create event
- `PUT /api/principal/academic-calendar/:id` - Update event
- `DELETE /api/principal/academic-calendar/:id` - Delete event

### Inventory
- `GET /api/principal/inventory` - List inventory items
- `GET /api/principal/maintenance-requests` - List maintenance requests

### Reports
- `GET /api/principal/reports/attendance` - Attendance report
- `GET /api/principal/reports/fee-collection` - Fee collection report

### Audit Logs
- `GET /api/principal/audit-logs` - View audit logs (read-only)

## Security Considerations

### Authentication
- All routes protected with JWT authentication
- Role verification: `allowRoles("PRINCIPAL")`
- School-scoped data isolation: `requireSchoolScope`

### Data Isolation
- Principals can only access their assigned school's data
- Backend enforces school filtering on all queries
- User ID validation on all operations

### Credential Management
- Accountant credentials shown only once during creation
- Passwords hashed with bcrypt (12 rounds)
- Secure random password generation (12 characters)

### Audit Trail
- All administrative actions logged
- Logs are immutable (no delete/edit)
- Includes user ID, IP address, timestamp, and changes

## Testing Checklist

### Backend Testing
- [ ] All API endpoints return correct data
- [ ] School data isolation working correctly
- [ ] Authentication middleware functioning
- [ ] Pagination working on all list endpoints
- [ ] Error handling returns proper status codes
- [ ] Database transactions commit/rollback correctly

### Frontend Testing
- [ ] Dashboard loads with real data
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Modals open and close properly
- [ ] Pagination controls work
- [ ] Search and filter functionality
- [ ] Responsive design on mobile/tablet
- [ ] No console errors
- [ ] Loading states display correctly
- [ ] Error messages show appropriately

### Integration Testing
- [ ] Principal can log in successfully
- [ ] Dashboard statistics accurate
- [ ] Student search returns correct results
- [ ] Accountant creation generates credentials
- [ ] Notice creation publishes successfully
- [ ] Complaint status updates persist
- [ ] Leave approval/rejection works
- [ ] Reports generate with correct data
- [ ] Audit logs record actions

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Performance Optimization

### Backend
- Database indexes on frequently queried fields
- Pagination to limit result sets
- Select only required fields
- Aggregate queries for statistics

### Frontend
- Lazy loading for dashboard components
- Code splitting for route-based chunks
- Optimized bundle size
- Cached API responses where appropriate

## Troubleshooting

### Database Issues
**Problem:** Migration fails
**Solution:** 
```bash
npx prisma migrate reset
npx prisma migrate dev
```

**Problem:** Foreign key constraint errors
**Solution:** Ensure parent records exist before creating child records

### API Issues
**Problem:** 401 Unauthorized
**Solution:** Check JWT token validity, ensure user has PRINCIPAL role

**Problem:** 403 Forbidden
**Solution:** Verify school assignment, check `schoolId` in user record

### Frontend Issues
**Problem:** Page not loading
**Solution:** Check browser console, verify API endpoint responses

**Problem:** Styling issues
**Solution:** Ensure principal.css is imported, check CSS class names

## Rollback Procedure

If issues occur in production:

1. **Frontend Rollback:**
```bash
cd frontend
git checkout previous-commit
npm run build
```

2. **Backend Rollback:**
```bash
cd backend
git checkout previous-commit
npm install
npm start
```

3. **Database Rollback:**
```bash
npx prisma migrate resolve --rolled-back migration_name
```

## Monitoring

### Key Metrics to Monitor
- API response times
- Database query performance
- Error rates by endpoint
- User session duration
- Dashboard load time

### Logging
- API access logs
- Error logs with stack traces
- Audit log entries
- Database connection logs

## Post-Deployment

### 1. Verify Deployment
- Access Principal dashboard at `/principal`
- Test critical workflows
- Verify data accuracy

### 2. User Training
- Provide Principal user guide
- Conduct training session
- Document common workflows

### 3. Support
- Monitor for issues first 48 hours
- Collect user feedback
- Address high-priority bugs immediately

## Maintenance

### Regular Tasks
- Review audit logs weekly
- Monitor database size
- Update dependencies monthly
- Backup database daily

### Updates
- Test all updates in staging first
- Notify users of maintenance windows
- Keep changelog updated

## Support Contacts
- Technical Issues: [support email]
- Feature Requests: [product email]
- Security Issues: [security email]

---

**Version:** 1.0.0
**Last Updated:** [Current Date]
**Author:** Development Team
