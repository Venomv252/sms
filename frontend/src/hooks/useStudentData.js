import { useState, useEffect } from "react";
import { apiGet } from "../api.js";

/**
 * Hook to fetch and manage current student's profile data
 * Includes: profile, attendance, fees, certificates
 */
export function useStudentData() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    apiGet("/students/me")
      .then((response) => {
        if (mounted) {
          setStudent(response.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Failed to load student data");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { student, loading, error, refetch: () => setLoading(true) };
}

/**
 * Hook to fetch attendance records
 */
export function useAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    apiGet("/attendance")
      .then((response) => {
        if (mounted) {
          setAttendance(response.data || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || "Failed to load attendance");
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { attendance, loading, error };
}

/**
 * Hook to fetch leave records
 */
export function useLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaves = () => {
    setLoading(true);
    Promise.all([
      apiGet("/leaves"),
      apiGet("/leaves/summary")
    ])
      .then(([leavesData, summaryData]) => {
        setLeaves(leavesData.data || []);
        setSummary(summaryData.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load leaves");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return { leaves, summary, loading, error, refetch: fetchLeaves };
}

/**
 * Calculate attendance statistics from attendance records
 */
export function calculateAttendanceStats(attendance) {
  if (!attendance || attendance.length === 0) {
    return {
      totalDays: 0,
      presentDays: 0,
      absentDays: 0,
      lateDays: 0,
      medicalDays: 0,
      excusedDays: 0,
      percentage: 0
    };
  }

  const stats = {
    totalDays: attendance.length,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0,
    medicalDays: 0,
    excusedDays: 0
  };

  attendance.forEach((record) => {
    switch (record.status) {
      case "PRESENT":
        stats.presentDays++;
        break;
      case "ABSENT":
        stats.absentDays++;
        break;
      case "LATE":
        stats.lateDays++;
        stats.presentDays++; // Count late as present for percentage
        break;
      case "MEDICAL":
        stats.medicalDays++;
        break;
      case "EXCUSED":
        stats.excusedDays++;
        break;
      default:
        break;
    }
  });

  stats.percentage = stats.totalDays > 0
    ? ((stats.presentDays / stats.totalDays) * 100).toFixed(1)
    : 0;

  return stats;
}

/**
 * Generate calendar data from attendance records
 * Groups attendance by month
 */
export function generateAttendanceCalendar(attendance, year, month) {
  const calendar = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendar.push({ day: null, status: null });
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const record = attendance.find((att) => {
      const attDate = new Date(att.date).toISOString().split("T")[0];
      return attDate === dateStr;
    });

    const dayOfWeek = new Date(year, month - 1, day).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isToday = new Date().toDateString() === new Date(year, month - 1, day).toDateString();

    calendar.push({
      day,
      date: dateStr,
      status: record ? record.status : (isWeekend ? "WEEKEND" : null),
      isToday,
      isWeekend,
      remarks: record?.remarks
    });
  }

  return calendar;
}
