import { useState, useEffect } from "react";
import { apiGet, apiPost } from "../api.js";

/**
 * Hook to fetch homework assignments
 */
export function useHomework() {
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomework = () => {
    setLoading(true);
    apiGet("/homework")
      .then((response) => {
        setHomework(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load homework");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  return { homework, loading, error, refetch: fetchHomework };
}

/**
 * Submit homework assignment
 */
export async function submitHomework(homeworkId, submission) {
  try {
    const response = await apiPost(`/homework/${homeworkId}/submit`, submission);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get homework statistics
 */
export function getHomeworkStats(homework) {
  if (!homework || homework.length === 0) {
    return {
      total: 0,
      pending: 0,
      submitted: 0,
      evaluated: 0,
      overdue: 0
    };
  }

  const now = new Date();
  const stats = {
    total: homework.length,
    pending: 0,
    submitted: 0,
    evaluated: 0,
    overdue: 0
  };

  homework.forEach((hw) => {
    const dueDate = new Date(hw.dueDate);
    const hasSubmission = hw.submissions && hw.submissions.length > 0;
    
    if (hasSubmission) {
      const submission = hw.submissions[0];
      if (submission.marksObtained !== null && submission.marksObtained !== undefined) {
        stats.evaluated++;
      } else {
        stats.submitted++;
      }
    } else {
      if (dueDate < now) {
        stats.overdue++;
      } else {
        stats.pending++;
      }
    }
  });

  return stats;
}

/**
 * Calculate average score from evaluated homework
 */
export function calculateAverageScore(homework) {
  if (!homework || homework.length === 0) return 0;

  const evaluatedHomework = homework.filter(hw => {
    const submission = hw.submissions?.[0];
    return submission && submission.marksObtained !== null && submission.marksObtained !== undefined;
  });

  if (evaluatedHomework.length === 0) return 0;

  const totalPercentage = evaluatedHomework.reduce((sum, hw) => {
    const submission = hw.submissions[0];
    const percentage = (submission.marksObtained / hw.totalMarks) * 100;
    return sum + percentage;
  }, 0);

  return (totalPercentage / evaluatedHomework.length).toFixed(1);
}

/**
 * Get homework status
 */
export function getHomeworkStatus(homework) {
  const now = new Date();
  const dueDate = new Date(homework.dueDate);
  const hasSubmission = homework.submissions && homework.submissions.length > 0;

  if (hasSubmission) {
    const submission = homework.submissions[0];
    if (submission.marksObtained !== null && submission.marksObtained !== undefined) {
      return {
        status: "EVALUATED",
        label: "Evaluated",
        color: "#1971c2",
        bg: "#dde8ff"
      };
    }
    return {
      status: "SUBMITTED",
      label: "Submitted",
      color: "#087f5b",
      bg: "#dff9ef"
    };
  }

  if (dueDate < now) {
    return {
      status: "OVERDUE",
      label: "Overdue",
      color: "#c92a2a",
      bg: "#ffe0e0"
    };
  }

  const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
  if (daysUntilDue <= 1) {
    return {
      status: "DUE_SOON",
      label: `Due ${daysUntilDue === 0 ? "today" : "tomorrow"}`,
      color: "#e67700",
      bg: "#fff4e0"
    };
  }

  return {
    status: "PENDING",
    label: `Due ${dueDate.toLocaleDateString()}`,
    color: "#087f5b",
    bg: "#f0fff7"
  };
}

/**
 * Format due date for display
 */
export function formatDueDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `Overdue by ${Math.abs(diffDays)} ${Math.abs(diffDays) === 1 ? "day" : "days"}`;
  } else if (diffDays === 0) {
    return "Due today";
  } else if (diffDays === 1) {
    return "Due tomorrow";
  } else if (diffDays <= 7) {
    return `Due in ${diffDays} days`;
  } else {
    return `Due on ${date.toLocaleDateString()}`;
  }
}
