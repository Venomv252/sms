# School Management System — Backend

Node.js + Express 5 REST API using PostgreSQL and Prisma 6.

> **Documentation policy:** This is the single maintained Markdown document in this backend package. Historical implementation reports, repeated audits, temporary plans, and duplicate setup guides were consolidated/removed. The application source, migrations, package files, tests, and utility scripts were retained.

## 1. Technology and structure

- Node.js (ES modules)
- Express 5
- PostgreSQL
- Prisma ORM / Prisma Client 6
- JWT access-token authentication
- bcrypt password hashing
- Helmet, CORS, Morgan, and express-rate-limit
- Zod is installed; validate request payloads consistently as routes are expanded.

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── test-*.js                 # standalone test scripts
├── check-*.js / clean-*.js   # schedule-data utilities; review before running
├── package.json
├── package-lock.json
└── README.md
```

## 2. Setup

### Requirements

- Node.js compatible with the installed dependencies (use a current LTS release).
- PostgreSQL reachable from the backend.
- npm.

### Install and configure

```bash
cd backend
npm install
```

Copy `.env.example` to `.env`, then set the PostgreSQL URL and two strong, independent JWT secrets.

```bash
# macOS/Linux
cp .env.example .env

# Windows PowerShell
Copy-Item .env.example .env
```

Do not commit or share `.env`. The distributable archive intentionally excludes local `.env` and `.env.test` files because they contained configured credentials/secrets.

### Database and server

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

Production startup:

```bash
npm start
```

Health endpoint:

```text
GET http://localhost:5000/health
```

`npm run db:migrate` uses `prisma migrate dev`; for deployment environments use the migration deployment workflow (`npx prisma migrate deploy`) rather than `migrate dev`.

### Available npm scripts

| Script | Purpose |
|---|---|
| `dev` | Start with nodemon |
| `start` | Start the API |
| `db:generate` | Generate Prisma Client |
| `db:migrate` | Run development migration workflow |
| `db:seed` | Seed the database |
| `db:studio` | Open Prisma Studio |
| `setup-and-start` | Install, generate, migrate, seed, then start in development |

**Caution:** `setup-and-start` performs database migrations and seeding. Do not run it against a production database.

## 3. API route groups

All API groups are mounted under `/api`.

| Prefix | Purpose |
|---|---|
| `/api/auth` | Registration, login, current user, logout, password change |
| `/api/students` | Student profile, parent children, school-scoped student list |
| `/api/teachers` | Teacher profile and admin teacher listing |
| `/api/attendance` | Attendance retrieval and creation |
| `/api/homework` | Homework and submissions |
| `/api/results` | Results retrieval and creation |
| `/api/fees` | Fee records and payment-related data |
| `/api/notices` | School/platform notices |
| `/api/schedules` | Timetable retrieval, creation, deletion |

Authentication uses `Authorization: Bearer <access-token>`. Role authorization is applied at route level. The auth middleware re-reads the user from PostgreSQL so current role and school assignment are taken from the database rather than trusted from JWT claims.

## 4. Data model

The Prisma schema currently defines these roles:

`SUPER_ADMIN`, `DIRECTOR`, `PRINCIPAL`, `MANAGEMENT`, `TEACHER`, `ACCOUNTANT`, `DRIVER`, `STUDENT`, `PARENT`.

Main models include:

- School and User
- Student, ParentStudent, Teacher
- Subject and Class
- Attendance, Homework, HomeworkSubmission
- Result, FeePayment, Notice, Schedule
- House, Certificate, LeaveRequest, Note, Doubt, DoubtComment

Prisma schema and committed migrations are the source of truth. Do not edit the database manually to imitate a migration.

## 5. Important implemented behavior

- JWT authentication and role checks.
- School-scoped access helpers for student records.
- Login rate limiting with per-IP fixed windows and a bounded in-memory IP map.
- Schedule conflict checks for teacher overlap, room overlap within a school, and duplicate class/day/period.
- Schedule creation runs conflict checks and insertion in a serializable Prisma transaction.
- Fee amount validation rejects exponent/hex notation, limits precision to two decimal places, and compares the maximum using integer cents (`BigInt`).
- Notice creation validates a supplied school ID for platform administrators.
- Homework and result routes include role-specific access and validation logic.

## 6. Verification performed during this cleanup

- Read the archive file inventory, Markdown reports, package metadata, Prisma schema/migrations, application entry points, middleware, controllers, services, route modules, and JavaScript scripts.
- Ran `node --check` against all **49 JavaScript files** in the archive: all passed syntax checking.
- This was a static inspection only. No database-backed integration suite was run, no server was started, and no database records were changed.

## 7. Review findings — address before production

These are code/configuration findings, not claims that runtime tests have reproduced them.

1. **Secrets were present in the supplied `.env` and `.env.test`.** Those files were excluded from this cleaned archive. If these secrets were ever shared beyond a trusted environment, rotate the database credentials and JWT secrets.
2. **`.gitignore` excludes `package-lock.json` and `prisma/migrations/`.** This is risky for a deployable backend: commit the lockfile for reproducible installs and commit migration history so environments can be migrated consistently. Review and correct these ignore rules in the repository.
3. **`.env.example` previously used obsolete variable names** (`JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`) while runtime config expects `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRY`, `JWT_REFRESH_EXPIRY`, and `CORS_ORIGIN`. The template has been corrected in this archive.
4. **Schedule deletion has a nullable-relation risk.** `schedules.routes.js` dereferences `schedule.class.teacher.user.schoolId` without checking each relation. The Prisma schema allows `Class.teacherId` to be nullable; deleting a schedule for an unassigned class may throw a TypeError. Add null-safe ownership checks and a deliberate policy for unassigned classes.
5. **Schedule teacher-conflict lookup should be reviewed for unassigned teachers.** `checkTeacherConflicts()` uses `teacherId` even when it may be null. Define whether unassigned classes can be scheduled and avoid treating all null-teacher classes as one teacher.
6. **Logout is client-side only.** The access JWT is not revoked; the client must discard it. If immediate token revocation is required, add a revocation/version strategy.
7. **Login rate limiting is in-memory and process-local.** It does not share counters across multiple Node processes/instances. Use a shared store such as Redis before horizontal scaling.
8. **Backup route modules remain in the archive** (`homework.routes.backup.js`, `results.routes.backup.js`). They are not mounted by `app.js`; keep them only if intentionally retained for reference, otherwise remove them after confirming no workflow depends on them.
9. **The `setup-and-start` script runs migrations and seeds automatically.** Keep it for local development only; do not use it as a production deployment command.

## 8. Test and maintenance guidance

The archive contains standalone test scripts and data-cleanup utilities. They are not wired to an npm `test` script. Before running them:

- Confirm the target database is a disposable test database.
- Read each script, especially `clean-*.js` and `setup-*.js`, before execution.
- Do not run cleanup scripts against production.
- Add a formal test runner and CI command when the test suite is stabilized.
- Run migrations against a fresh test database and execute integration tests there.

## 9. Files retained

All non-Markdown application files were retained except local secret files (`.env`, `.env.test`). The sole Markdown document is this `README.md`. The safe `.env.example` was updated to match the current runtime configuration.


## Username + password authentication

The login contract is now:

```http
POST /api/auth/login
Content-Type: application/json

{ "username": "teacher", "password": "your-password" }
```

Usernames are case-insensitive and normalized to lowercase. Existing users receive a username during the migration, based on the part of their email before `@`. If two existing accounts share the same email prefix, the migration appends a short stable ID suffix to keep usernames unique. Email remains stored for communication and account recovery; it is no longer the login identifier.

### Apply the migration

Back up your database first, then run:

```bash
npm install
npx prisma migrate deploy
npx prisma generate
```

For local development with a new migration workflow, use `npx prisma migrate dev` instead of `migrate deploy`.

### Demo seed accounts

Only in `development` or `test`, `npm run db:seed` creates demo accounts. The demo password remains `ChangeMe123!`; change it immediately and never run the seed in production. Demo usernames: `admin`, `principal`, `management`, `accountant`, `driver`, `teacher`, `student`, `parent`.

### Production deployment checklist

- Use HTTPS only and keep secrets in the deployment secret manager.
- Use independent randomly generated JWT secrets (at least 32 random bytes).
- Restrict `CORS_ORIGIN` to the exact deployed frontend origin.
- Use a shared Redis-backed rate limiter for multi-instance deployments. The included login limiter is process-local and is not sufficient as the only production brute-force control when horizontally scaled.
- Configure Express `trust proxy` only to match the actual trusted reverse-proxy topology.
- Configure PostgreSQL backups, monitoring, migrations, and restore drills.
- Disable public student registration unless the school explicitly needs it; provision staff accounts through a protected administrator workflow.
- Implement a verified email/phone recovery flow before enabling the Forgot Password link.
- Do not treat the included demo seed users or this code change as a complete security audit.


## Platform roles and multi-school ownership

The role hierarchy is:

- `SUPER_ADMIN`: platform operator; can register schools and create Director accounts.
- `DIRECTOR`: can own multiple schools through the `director_schools` join table. The Director overview only lists assigned schools.
- `PRINCIPAL`, `TEACHER`, `MANAGEMENT`, `ACCOUNTANT`, `DRIVER`, `STUDENT`, `PARENT`: school-scoped roles.

The old `ADMIN` database enum value is deprecated. Existing `ADMIN` users are migrated to `SUPER_ADMIN` by the role migration.

### Apply the new migrations

Back up PostgreSQL first, then run:

```bash
npx prisma migrate deploy
npx prisma generate
```

Director school switching uses the `X-School-Id` request header. The backend verifies every selected school against the authenticated Director's `director_schools` assignments; a client cannot gain access by guessing another school's ID.

Super Admin endpoints:
- `GET /api/platform/schools`
- `POST /api/platform/schools`
- `POST /api/platform/directors`

Director endpoints:
- `GET /api/platform/director/overview`
- `GET /api/platform/director/schools`

The House entity and student house assignment have been removed from the Prisma data model and the seed script. The migration drops the old optional `students.houseId` column and `houses` table. Back up first; this migration intentionally discards old house assignments.


## Super Admin dashboard management APIs

- `GET /api/platform/schools` returns school operational counts and assigned Director profile details, never credentials or password hashes.
- `PATCH /api/platform/schools/:schoolId` updates school name, code and address.
- `DELETE /api/platform/schools/:schoolId` deletes only an empty school (no users or notices); populated schools return HTTP 409 to prevent orphaning school data.
- `GET /api/platform/directors` lists Director profile information and school assignments without credentials.
- `POST /api/platform/directors` creates a Director account; the password is hashed and is never returned.
- `PATCH /api/platform/directors/:directorId` updates the Director name, username and email.
- `DELETE /api/platform/directors/:directorId` removes the Director account and ownership links while preserving school records.

### Director school management
- `POST /api/platform/director/schools` creates a school and assigns it to the authenticated Director in one database transaction.
- `PATCH /api/platform/director/schools/:schoolId` updates only a school assigned to the authenticated Director.
- `DELETE /api/platform/director/schools/:schoolId` deletes only an assigned school with no users or notices.

Director access is scoped through `DirectorSchool`; these endpoints do not allow a Director to edit or delete another Director's school.


## 8. Director platform endpoints

- `GET /api/platform/director/overview` — lists only schools assigned to the authenticated Director.
- `GET /api/platform/director/schools/:schoolId/workspace` — returns school-scoped workspace data after verifying the Director-school assignment.
- `POST /api/platform/director/schools/:schoolId/principal` — creates the school's Principal and returns a generated temporary password once. The password is stored only as a bcrypt hash. Request body: `{ "firstName": "...", "lastName": "...", "email": "..." }`.

All platform routes are mounted by `src/app.js`; do not call these endpoints from an unauthenticated client.

## 9. Production deployment limitations

This backend has production-oriented security controls, but do not treat it as horizontally scalable production infrastructure yet:

- The general API rate limiter and custom login limiter use in-process memory. Use a shared Redis-backed store before running multiple Node processes/replicas.
- Configure trusted proxy behavior deliberately when deployed behind a reverse proxy; do not blindly trust arbitrary `X-Forwarded-For` headers.
- Use a managed PostgreSQL deployment with backups, TLS, least-privilege credentials, and a tested restore procedure.
- Configure strong independent JWT secrets, HTTPS, exact CORS origins, monitoring, and centralized logs.
- Temporary Principal credentials are returned once; first-login password rotation is not enforced by the current User schema/authentication flow.
- Run the database-backed integration and authorization tests against a disposable test database before production release.

The static validation of this archive is not a substitute for load testing, security review, or database-backed integration testing.

## Neon PostgreSQL deployment

For Neon, configure these environment variables in the backend environment:

- `DATABASE_URL`: Neon pooled connection string (Connection pooling enabled), used by the application.
- `DIRECT_URL`: Neon direct connection string (Connection pooling disabled), used by Prisma migrations.

Both URLs must use the same Neon project, branch, database, and role. Keep `sslmode=require` in the connection strings. Do not commit `.env` or share database credentials.

For a fresh Neon database, from the backend directory run:

```bash
npm ci
npm run db:generate
npm run db:deploy
npm run db:status
```

`db:deploy` applies the existing checked-in migration history. Do not use `prisma db push` for this deployment, and do not run the seed script unless you have reviewed its contents and intentionally want its records.

