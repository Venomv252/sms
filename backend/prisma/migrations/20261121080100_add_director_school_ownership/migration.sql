UPDATE "users" SET "role" = 'SUPER_ADMIN' WHERE "role" = 'ADMIN';
CREATE TABLE "director_schools" (
  "id" TEXT NOT NULL,
  "directorId" TEXT NOT NULL,
  "schoolId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "director_schools_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "director_schools_directorId_schoolId_key" ON "director_schools"("directorId", "schoolId");
CREATE INDEX "director_schools_schoolId_idx" ON "director_schools"("schoolId");
ALTER TABLE "director_schools" ADD CONSTRAINT "director_schools_directorId_fkey"
  FOREIGN KEY ("directorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "director_schools" ADD CONSTRAINT "director_schools_schoolId_fkey"
  FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "students" DROP CONSTRAINT IF EXISTS "students_houseId_fkey";
DROP INDEX IF EXISTS "students_houseId_idx";
ALTER TABLE "students" DROP COLUMN IF EXISTS "houseId";
DROP TABLE IF EXISTS "houses";
