-- Extend the role model and add school ownership to user accounts.
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'PRINCIPAL';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'MANAGEMENT';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'ACCOUNTANT';
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'DRIVER';

CREATE TABLE "schools" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "code" TEXT NOT NULL,
  "address" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "schools_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "schools_code_key" ON "schools"("code");
ALTER TABLE "users" ADD COLUMN "schoolId" TEXT;
CREATE INDEX "users_schoolId_role_idx" ON "users"("schoolId", "role");
ALTER TABLE "users" ADD CONSTRAINT "users_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
