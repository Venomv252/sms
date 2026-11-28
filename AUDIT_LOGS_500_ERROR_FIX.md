# Audit Logs 500 Error Fix

## Issue
**Error:** `GET /api/principal/audit-logs?page=1&limit=50 500 (Internal Server Error)`

## Root Cause
The audit-logs endpoint was trying to query `user: { schoolId }` but the `AuditLog` Prisma model doesn't have a relation to the `User` model. It only has a `userId` string field.

**Incorrect Code:**
```javascript
const where = {
  user: { schoolId },  // ❌ AuditLog doesn't have user relation
  ...(action && { action }),
  ...(entityType && { entityType }),
};
```

## AuditLog Schema Structure
```prisma
model AuditLog {
  id          String      @id @default(uuid())
  userId      String      // Plain string, not a relation
  schoolId    String?     // Direct field, not a relation
  action      AuditAction
  entityType  String?
  entityId    String?
  changes     Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime    @default(now())
  
  school School? @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  
  @@index([schoolId, createdAt])
  @@index([userId, createdAt])
  @@index([entityType, entityId])
  @@map("audit_logs")
}
```

## Solution
Changed the query to filter directly by `schoolId` field instead of trying to use a non-existent user relation:

**Correct Code:**
```javascript
const where = {
  schoolId,  // ✅ Direct field on AuditLog
  ...(action && { action }),
  ...(entityType && { entityType }),
};
```

## Files Modified
- `e:\SMS-CLEAN\sms\backend\src\routes\principal.routes.js`
  - Line ~1480: Changed `user: { schoolId }` to `schoolId`

## Testing
1. **Restart backend server:**
   ```powershell
   cd e:\SMS-CLEAN\sms\backend
   npm run dev
   ```

2. **Navigate to:** Principal Dashboard → Audit Logs

3. **Verify:**
   - ✅ Page loads without 500 error
   - ✅ Audit logs display if any exist
   - ✅ Filters work (action, entity type)
   - ✅ Pagination works
   - ✅ Empty state shows if no logs

## Expected Response
```json
{
  "status": "success",
  "data": {
    "logs": [
      {
        "id": "uuid",
        "userId": "uuid",
        "action": "CREATE",
        "entityType": "Student",
        "entityId": "uuid",
        "changes": { "field": "value" },
        "ipAddress": "192.168.1.1",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    }
  }
}
```

## Note
The AuditLog model has a direct `schoolId` field and optionally relates to the School model, but it does NOT relate to the User model. The `userId` is stored as a plain string for performance and to maintain audit integrity even if users are deleted.

---

**Status:** ✅ Fixed

**Date:** 2026-11-27
