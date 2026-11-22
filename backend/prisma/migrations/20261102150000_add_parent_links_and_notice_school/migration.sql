-- Add explicit parent-to-student relationships without deleting existing records.
CREATE TABLE "parent_students" (
    "id" TEXT NOT NULL,
    "parentUserId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "parent_students_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "parent_students_parentUserId_studentId_key"
ON "parent_students"("parentUserId", "studentId");
CREATE INDEX "parent_students_studentId_idx" ON "parent_students"("studentId");

ALTER TABLE "parent_students"
ADD CONSTRAINT "parent_students_parentUserId_fkey"
FOREIGN KEY ("parentUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "parent_students"
ADD CONSTRAINT "parent_students_studentId_fkey"
FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Notices can now belong to a school. Existing notices are backfilled to the
-- only existing school when there is exactly one, otherwise remain unassigned.
ALTER TABLE "notices" ADD COLUMN "schoolId" TEXT;
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM "schools") = 1 THEN
    UPDATE "notices" SET "schoolId" = (SELECT "id" FROM "schools" LIMIT 1)
    WHERE "schoolId" IS NULL;
  END IF;
END $$;

CREATE INDEX "notices_schoolId_isActive_publishDate_idx"
ON "notices"("schoolId", "isActive", "publishDate");
ALTER TABLE "notices"
ADD CONSTRAINT "notices_schoolId_fkey"
FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
