import React, { useState } from "react";
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { useStudentData, useAttendance, useLeaves, calculateAttendanceStats, generateAttendanceCalendar } from "../hooks/useStudentData.js";
import { apiPost } from "../api.js";
import { Modal } from "../Layout.jsx";

export default function Attendance({ showToast }) {
  const { student, loading: studentLoading } = useStudentData();
  const { attendance, loading: attLoading } = useAttendance();
  const { leaves, summary: leaveSummary, loading: leavesLoading, refetch: refetchLeaves } = useLeaves();
  
  const [leaveModal, setLeaveModal] = useState(false);
  const [submittingLeave, setSubmittingLeave] = useState(false);
  
  // Current month/year for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Leave form state
  const [leaveForm, setLeaveForm] = useState({
    fromDate: "",
    toDate: "",
    reason: ""
  });

  if (studentLoading || attLoading || leavesLoading) {
    return (
      <div className="page-container">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading attendance records...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="page-container">
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <AlertCircle size={48} style={{ color: "#e74c3c", marginBottom: "16px" }} />
          <p>Student profile not found</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const stats = calculateAttendanceStats(attendance);
  const calendar = generateAttendanceCalendar(attendance, currentYear, currentMonth);

  // Helper functions
  const getStatusColor = (status) => {
    switch (status) {
      case "PRESENT": return { bg: "#dff9ef", color: "#087f5b" };
      case "ABSENT": return { bg: "#ffe0e0", color: "#c92a2a" };
      case "LATE": return { bg: "#fff4e0", color: "#e67700" };
      case "MEDICAL": return { bg: "#e3f2fd", color: "#1976d2" };
      case "EXCUSED": return { bg: "#f3e5f5", color: "#7b1fa2" };
      case "WEEKEND": return { bg: "#f4f4f4", color: "#aaa" };
      default: return { bg: "transparent", color: "#aaa" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PRESENT": return <CheckCircle2 size={14} />;
      case "ABSENT": return <XCircle size={14} />;
      case "LATE": return <Clock size={14} />;
      case "MEDICAL": return <FileText size={14} />;
      default: return null;
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    setSubmittingLeave(true);

    try {
      await apiPost("/leaves", leaveForm);
      showToast("Leave application submitted successfully!");
      setLeaveModal(false);
      setLeaveForm({ fromDate: "", toDate: "", reason: "" });
      refetchLeaves();
    } catch (error) {
      showToast(error.message || "Failed to submit leave application", "error");
    } finally {
      setSubmittingLeave(false);
    }
  };

  const changeMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="breadcrumb">
        Student Dashboard • Attendance Management
      </div>

      <div className="page-header-row" style={{ alignItems: "flex-end" }}>
        <div>
          <h1 className="page-title">Attendance & Leave Management</h1>
          <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
            <span className="info-tag">Academic Year 2024–25</span>
            <span className="info-tag">Grade {student.grade}, Section {student.section}</span>
            <span className="info-tag">Roll No: {student.rollNumber}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="green-button btn" onClick={() => setLeaveModal(true)}>
            Apply for Leave
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="att-stats-grid">
        <div className="att-stat">
          <div className="att-stat-label">ATTENDANCE PERCENTAGE</div>
          <div className="att-stat-value">{stats.percentage}%</div>
          <div style={{ fontSize: 12, color: "#777" }}>Minimum 85% Required</div>
          <div className="att-stat-row">
            <span>{stats.presentDays} / {stats.totalDays} days</span>
          </div>
          <div className="att-stat-pills">
            <span className="att-pill green">{stats.presentDays} Present</span>
            <span className="att-pill red">{stats.absentDays} Absent</span>
            {stats.medicalDays > 0 && <span className="att-pill orange">{stats.medicalDays} Medical</span>}
          </div>
        </div>

        <div className="att-stat">
          <div className="att-stat-label">LEAVE SUMMARY</div>
          <div className="att-stat-value">
            {leaveSummary?.totalDaysApproved || 0}
            <small style={{ fontSize: 16, fontWeight: 400 }}> Days</small>
          </div>
          <div className="att-stat-pills" style={{ marginTop: 12 }}>
            <span className="att-pill green">{leaveSummary?.approved || 0} Approved</span>
            <span className="att-pill orange">{leaveSummary?.pending || 0} Pending</span>
            {leaveSummary?.rejected > 0 && (
              <span className="att-pill red">{leaveSummary.rejected} Rejected</span>
            )}
          </div>
        </div>

        <div className="att-stat">
          <div className="att-stat-label">ATTENDANCE STATUS</div>
          <div className="att-stat-pills" style={{ marginTop: 20 }}>
            <span className="att-pill green">Late: {stats.lateDays}</span>
            <span className="att-pill orange">Excused: {stats.excusedDays}</span>
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: stats.percentage >= 85 ? "#087f5b" : "#e67700" }}>
            {stats.percentage >= 85 ? (
              <>✓ Eligible for exams</>
            ) : (
              <>⚠ Below minimum threshold</>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="att-main-grid">
        {/* Calendar */}
        <div>
          <div className="panel">
            <div className="panel-heading compact">
              <div>
                <h2>Attendance Calendar</h2>
                <p>Monthly attendance record</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button className="icon-btn" onClick={() => changeMonth(-1)}>‹</button>
                <strong style={{ fontSize: 14 }}>{monthNames[currentMonth - 1]} {currentYear}</strong>
                <button className="icon-btn" onClick={() => changeMonth(1)}>›</button>
              </div>
            </div>

            <div className="cal-legend">
              <span style={{ color: "#087f5b" }}>● Present</span>
              <span style={{ color: "#c92a2a" }}>● Absent</span>
              <span style={{ color: "#e67700" }}>● Late</span>
              <span style={{ color: "#1976d2" }}>● Medical</span>
              <span style={{ color: "#999" }}>● Weekend</span>
            </div>

            <div className="calendar-grid-header">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
                <div key={d} className="cal-header-cell">{d}</div>
              ))}
            </div>

            <div className="calendar-grid">
              {calendar.map((day, i) => {
                if (!day.day) {
                  return <div key={i} className="cal-cell" style={{ background: "transparent" }} />;
                }

                const colors = getStatusColor(day.status);
                return (
                  <div
                    key={i}
                    className="cal-cell"
                    style={{
                      background: day.isToday ? "#087f5b" : colors.bg,
                      color: day.isToday ? "#fff" : colors.color,
                      fontWeight: day.isToday ? 700 : 400
                    }}
                    title={day.remarks || ""}
                  >
                    <span className="cal-date">{day.day}</span>
                    {day.status && (
                      <small className="cal-label">
                        {getStatusIcon(day.status)} {day.status}
                      </small>
                    )}
                  </div>
                );
              })}
            </div>

            {attendance.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
                <Calendar size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                <p>No attendance records found</p>
              </div>
            )}
          </div>
        </div>

        {/* Leave Records */}
        <div>
          <div className="panel">
            <div className="panel-heading compact">
              <div>
                <h2>Leave Request History</h2>
                <p>Your submitted leave applications</p>
              </div>
              <span style={{ fontSize: 12, color: "#777" }}>
                {leaves.length} {leaves.length === 1 ? "Request" : "Requests"}
              </span>
            </div>

            {leaves.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "#999" }}>
                <FileText size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
                <p>No leave requests found</p>
              </div>
            ) : (
              leaves.slice(0, 5).map((leave) => {
                const fromDate = new Date(leave.fromDate).toLocaleDateString();
                const toDate = new Date(leave.toDate).toLocaleDateString();
                const days = Math.ceil(
                  (new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)
                ) + 1;

                return (
                  <div className="leave-record" key={leave.id}>
                    <div className="leave-record-top">
                      <div className="leave-icon">
                        {leave.status === "APPROVED" && "✓"}
                        {leave.status === "PENDING" && "⏱"}
                        {leave.status === "REJECTED" && "✗"}
                      </div>
                      <div className="leave-info">
                        <strong>{leave.reason}</strong>
                        <p>
                          {fromDate} – {toDate} ({days} {days === 1 ? "Day" : "Days"})
                        </p>
                        {leave.adminNote && (
                          <p style={{ color: "#777", fontSize: 12 }}>Note: {leave.adminNote}</p>
                        )}
                      </div>
                      <span className={`leave-status ${leave.status.toLowerCase()}`}>
                        {leave.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {leaveModal && (
        <Modal title="Apply for Leave" onClose={() => setLeaveModal(false)}>
          <form onSubmit={handleLeaveSubmit}>
            <p className="modal-desc">
              Submit your leave application. It will be reviewed by the class teacher and principal.
            </p>

            <label>Start Date *</label>
            <input
              className="modal-input"
              type="date"
              value={leaveForm.fromDate}
              onChange={(e) => setLeaveForm({ ...leaveForm, fromDate: e.target.value })}
              required
              min={new Date().toISOString().split("T")[0]}
            />

            <label>End Date *</label>
            <input
              className="modal-input"
              type="date"
              value={leaveForm.toDate}
              onChange={(e) => setLeaveForm({ ...leaveForm, toDate: e.target.value })}
              required
              min={leaveForm.fromDate || new Date().toISOString().split("T")[0]}
            />

            <label>Reason for Leave *</label>
            <textarea
              className="modal-input"
              rows="4"
              value={leaveForm.reason}
              onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              placeholder="Please provide a detailed reason for your leave application..."
              required
              minLength={10}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-secondary"
                onClick={() => setLeaveModal(false)}
                disabled={submittingLeave}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="modal-btn-primary"
                disabled={submittingLeave}
              >
                {submittingLeave ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
