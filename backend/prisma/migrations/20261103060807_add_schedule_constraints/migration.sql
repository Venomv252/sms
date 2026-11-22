/*
  Warnings:

  - A unique constraint covering the columns `[classId,dayOfWeek,period]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "schedules_dayOfWeek_startTime_endTime_idx" ON "schedules"("dayOfWeek", "startTime", "endTime");

-- CreateIndex
CREATE INDEX "schedules_room_dayOfWeek_startTime_idx" ON "schedules"("room", "dayOfWeek", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_classId_dayOfWeek_period_key" ON "schedules"("classId", "dayOfWeek", "period");
