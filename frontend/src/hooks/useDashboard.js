import { useState, useEffect } from "react";
import { apiGet } from "../api.js";

/**
 * Hook to fetch complete dashboard data for student
 * Combines student profile, attendance, homework, results, schedules, notices
 */
export function useDashboard() {
  const [data, setData] = useState({
    student: null,
    attendance: null,
    homework: null,
    results: null,
    schedules: null,
    notices: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all dashboard data in parallel
        const [studentRes, homeworkRes, resultsRes, schedulesRes, noticesRes] = await Promise.all([
          apiGet("/students/me"),
          apiGet("/homework"),
          apiGet("/results"),
          apiGet("/schedules"),
          apiGet("/notices")
        ]);

        setData({
          student: studentRes,
          attendance: studentRes.attendance || [],
          homework: homeworkRes || [],
          results: resultsRes || [],
          schedules: schedulesRes || [],
          notices: noticesRes || []
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(err.message || "Failed to load dashboard data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
}

/**
 * Calculate attendance statistics
 */
export function calculateAttendanceStats(attendanceRecords) {
  if (!attendanceRecords || attendanceRecords.length === 0) {
    return {
      totalDays: 0,
      presentDays: 0,
      absentDays: 0,
      medicalDays: 0,
      percentage: 0
    };
  }

  const stats = {
    totalDays: attendanceRecords.length,
    presentDays: 0,
    absentDays: 0,
    medicalDays: 0
  };

  attendanceRecords.forEach(record => {
    if (record.status === "PRESENT") {
      stats.presentDays++;
    } else if (record.status === "ABSENT") {
      if (record.reason && record.reason.toLowerCase().includes("medical")) {
        stats.medicalDays++;
      } else {
        stats.absentDays++;
      }
    }
  });

  stats.percentage = stats.totalDays > 0 
    ? ((stats.presentDays / stats.totalDays) * 100).toFixed(1)
    : 0;

  return stats;
}

/**
 * Calculate this week's attendance
 */
export function getThisWeekAttendance(attendanceRecords) {
  if (!attendanceRecords || attendanceRecords.length === 0) {
    return [];
  }

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const weekData = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    
    const record = attendanceRecords.find(a => {
      const recordDate = new Date(a.date);
      return recordDate.toDateString() === date.toDateString();
    });

    const isToday = date.toDateString() === now.toDateString();
    const isFuture = date > now;

    weekData.push({
      day: daysOfWeek[i],
      date,
      status: record ? record.status : (isFuture ? null : "PRESENT"),
      isToday,
      isFuture
    });
  }

  return weekData;
}

/**
 * Calculate homework statistics
 */
export function getHomeworkStats(homework) {
  if (!homework || homework.length === 0) {
    return {
      total: 0,
      dueToday: 0,
      pending: 0,
      overdue: 0
    };
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const stats = {
    total: homework.length,
    dueToday: 0,
    pending: 0,
    overdue: 0
  };

  homework.forEach(hw => {
    const dueDate = new Date(hw.dueDate);
    const dueDateOnly = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const hasSubmission = hw.submissions && hw.submissions.length > 0;

    if (!hasSubmission) {
      if (dueDateOnly.getTime() === today.getTime()) {
        stats.dueToday++;
      } else if (dueDateOnly < today) {
        stats.overdue++;
      } else {
        stats.pending++;
      }
    }
  });

  return stats;
}

/**
 * Calculate average score from results
 */
export function calculateAverageScore(results) {
  if (!results || results.length === 0) return 0;

  const totalPercentage = results.reduce((sum, result) => {
    const percentage = (result.marksObtained / result.totalMarks) * 100;
    return sum + percentage;
  }, 0);

  return (totalPercentage / results.length).toFixed(1);
}

/**
 * Calculate class standing/rank
 */
export function getClassStanding(results, totalStudents = 42) {
  // This is a placeholder - actual ranking would need backend support
  // For now, estimate based on average score
  const avgScore = calculateAverageScore(results);
  
  if (avgScore >= 95) return 1;
  if (avgScore >= 90) return 2;
  if (avgScore >= 85) return 3;
  if (avgScore >= 80) return Math.ceil(totalStudents * 0.15);
  if (avgScore >= 75) return Math.ceil(totalStudents * 0.25);
  return Math.ceil(totalStudents * 0.5);
}

/**
 * Get grade from percentage
 */
export function getGradeFromPercentage(percentage) {
  if (percentage >= 95) return "A1";
  if (percentage >= 90) return "A2";
  if (percentage >= 85) return "B1";
  if (percentage >= 80) return "B2";
  if (percentage >= 75) return "C1";
  if (percentage >= 70) return "C2";
  if (percentage >= 60) return "D";
  return "E";
}

/**
 * Get upcoming schedules for today
 */
export function getUpcomingSchedules(schedules) {
  if (!schedules || schedules.length === 0) return [];

  const now = new Date();
  const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const today = dayNames[now.getDay()];

  const todaySchedules = schedules.filter(s => s.dayOfWeek === today);

  // Sort by start time
  todaySchedules.sort((a, b) => {
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);
    return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
  });

  return todaySchedules;
}

/**
 * Get next upcoming class
 */
export function getNextClass(schedules) {
  const upcoming = getUpcomingSchedules(schedules);
  if (upcoming.length === 0) return null;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Find first class that hasn't ended yet
  for (const schedule of upcoming) {
    const [hours, minutes] = schedule.endTime.split(':').map(Number);
    const endTime = hours * 60 + minutes;
    
    if (endTime > currentTime) {
      return schedule;
    }
  }

  return null;
}

/**
 * Get minutes until next class
 */
export function getMinutesUntilClass(schedule) {
  if (!schedule) return null;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const [hours, minutes] = schedule.startTime.split(':').map(Number);
  const startTime = hours * 60 + minutes;

  const diff = startTime - currentTime;
  return diff > 0 ? diff : 0;
}

/**
 * Format time for display (HH:MM to 12-hour format)
 */
export function formatTime(timeString) {
  if (!timeString) return "";
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Get recent/unread notices
 */
export function getRecentNotices(notices, limit = 3) {
  if (!notices || notices.length === 0) return [];

  // Sort by publish date (newest first)
  const sorted = [...notices].sort((a, b) => {
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  return sorted.slice(0, limit);
}

/**
 * Calculate subject-wise performance from results
 */
export function getSubjectPerformance(results) {
  if (!results || results.length === 0) return [];

  // Group by subject
  const subjectMap = new Map();

  results.forEach(result => {
    const subject = result.exam?.class?.subject;
    if (!subject) return;

    if (!subjectMap.has(subject.id)) {
      subjectMap.set(subject.id, {
        id: subject.id,
        name: subject.name,
        code: subject.code,
        scores: [],
        totalMarks: 0,
        obtainedMarks: 0
      });
    }

    const subjectData = subjectMap.get(subject.id);
    subjectData.scores.push({
      obtained: result.marksObtained,
      total: result.totalMarks
    });
    subjectData.totalMarks += result.totalMarks;
    subjectData.obtainedMarks += result.marksObtained;
  });

  // Calculate percentages and format
  const subjects = Array.from(subjectMap.values()).map(subject => {
    const percentage = (subject.obtainedMarks / subject.totalMarks) * 100;
    return {
      ...subject,
      percentage: percentage.toFixed(1),
      grade: getGradeFromPercentage(percentage)
    };
  });

  // Sort by percentage descending
  subjects.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  return subjects;
}
