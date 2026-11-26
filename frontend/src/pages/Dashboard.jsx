import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck, CircleHelp, FileBarChart, CheckCircle2, TrendingUp,
  Bell, ShieldCheck, Trophy, Megaphone, ChevronRight, FlaskConical,
  ClipboardList, UserRound, AlertCircle
} from "lucide-react";
import { 
  useDashboard, 
  calculateAttendanceStats, 
  getThisWeekAttendance,
  getHomeworkStats,
  calculateAverageScore,
  getClassStanding,
  getGradeFromPercentage,
  getUpcomingSchedules,
  getNextClass,
  getMinutesUntilClass,
  formatTime,
  getRecentNotices,
  getSubjectPerformance
} from "../hooks/useDashboard.js";

export default function Dashboard({ showToast }) {
  const navigate = useNavigate();
  const { data, loading, error } = useDashboard();
  const [perfTab, setPerfTab] = useState("Donut");

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <AlertCircle size={48} style={{ color: "#e74c3c", marginBottom: "16px" }} />
          <p>{error}</p>
          <button className="green-button btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { student, attendance, homework, results, schedules, notices } = data;

  if (!student) {
    return (
      <div className="dashboard">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <p>Student profile not found</p>
        </div>
      </div>
    );
  }

  // Calculate all statistics
  const attendanceStats = calculateAttendanceStats(attendance);
  const weekAttendance = getThisWeekAttendance(attendance);
  const homeworkStats = getHomeworkStats(homework);
  const avgScore = calculateAverageScore(results);
  const classRank = getClassStanding(results);
  const grade = getGradeFromPercentage(avgScore);
  const upcomingSchedules = getUpcomingSchedules(schedules);
  const nextClass = getNextClass(schedules);
  const minutesUntilNext = getMinutesUntilClass(nextClass);
  const recentNotices = getRecentNotices(notices, 3);
  const subjectPerformance = getSubjectPerformance(results);

  // Get student name
  const studentName = student.user?.firstName
    ? `${student.user.firstName} ${student.user.lastName || ''}`.trim()
    : "Student";
  
  // Get initials for avatar
  const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Current academic year
  const currentYear = new Date().getFullYear();
  const academicYear = `AY ${currentYear}–${currentYear + 1}`;

  // Action items
  const actionItems = [];
  if (homeworkStats.dueToday > 0) {
    actionItems.push({
      text: `${homeworkStats.dueToday} Homework Due`,
      time: "Today",
      onClick: () => navigate("/homework")
    });
  }
  if (homeworkStats.overdue > 0) {
    actionItems.push({
      text: `${homeworkStats.overdue} Homework Overdue`,
      time: "Past Due",
      onClick: () => navigate("/homework"),
      urgent: true
    });
  }

  return (
    <div className="dashboard">
      {/* Welcome Card */}
      <section className="welcome-card">
        <div className="student-info">
          <div className="student-avatar">
            {initials}
            <span className="status-dot"></span>
          </div>
          <div>
            <div className="welcome-title">
              <h1>{studentName}</h1>
              <span style={{ fontSize: 14, color: "var(--green)", fontWeight: 600, marginLeft: 8 }}>✓</span>
            </div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              {academicYear} &nbsp;
              <span style={{ background: "#dff9ef", color: "var(--green)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, marginLeft: 4 }}>
                Active
              </span>
            </div>
            <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              Grade {student.grade} – Section {student.section}
              {student.rollNumber && ` • Roll No. ${student.rollNumber}`}
            </p>
          </div>
        </div>
        <div className="welcome-actions">
          <button onClick={() => navigate("/attendance")}>
            <UserRound size={15} />Attendance
          </button>
          <button onClick={() => navigate("/doubt-forum")}>
            <CircleHelp size={15} />Ask a Doubt
          </button>
          <button className="green-button" onClick={() => navigate("/results")}>
            <FileBarChart size={16} />View Report Card
          </button>
        </div>
      </section>

      {/* Summary Grid - Desktop */}
      <div className="desktop-summary-grid">
        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/attendance")}>
          <div className="summary-heading">
            <span>ATTENDANCE</span>
            <CheckCircle2 size={20} />
          </div>
          <strong>{attendanceStats.percentage}%</strong>
          <div className={`summary-${parseFloat(attendanceStats.percentage) >= 90 ? 'positive' : parseFloat(attendanceStats.percentage) >= 75 ? 'neutral' : 'negative'}`}>
            {parseFloat(attendanceStats.percentage) >= 90 ? '↗ Excellent' : parseFloat(attendanceStats.percentage) >= 75 ? '→ Good' : '↘ Needs Improvement'}
          </div>
          <p>Total Days: <strong>{attendanceStats.totalDays}</strong></p>
          <div className="summary-footer">
            Pres: <b>{attendanceStats.presentDays}d</b> &nbsp; Abs: <em>{attendanceStats.absentDays}d</em>
          </div>
        </div>

        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/results")}>
          <div className="summary-heading">
            <span>CLASS STANDING</span>
            <TrendingUp size={20} />
          </div>
          <strong>Rank {classRank}</strong>
          <p>Estimated ranking</p>
          <div className="grade-pill">{grade}</div>
        </div>

        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/performance")}>
          <div className="summary-heading">
            <span>AVG SCORE</span>
            <span className="percent-icon">%</span>
          </div>
          <strong className="green-number">{avgScore}%</strong>
          <div className="grade-pill">{grade}</div>
          <div className="summary-footer">
            Based on {results.length} assessment{results.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="summary-card action-card">
          <div className="summary-heading">
            <span>ACTION ITEMS</span>
            <Bell size={19} />
          </div>
          {actionItems.length > 0 ? (
            actionItems.map((item, i) => (
              <div
                key={i}
                className="action-line"
                style={{ cursor: "pointer", color: item.urgent ? "#c92a2a" : undefined }}
                onClick={item.onClick}
              >
                <span>{item.text}</span>
                <b>{item.time}</b>
              </div>
            ))
          ) : (
            <div style={{ padding: "16px 0", textAlign: "center", color: "#999", fontSize: "13px" }}>
              <CheckCircle2 size={32} style={{ opacity: 0.3, marginBottom: "8px" }} />
              <p>All caught up!</p>
            </div>
          )}
          {recentNotices.length > 0 && (
            <div className="term-alert" onClick={() => navigate("/notices")} style={{ cursor: "pointer" }}>
              ◉ {recentNotices[0].title}
            </div>
          )}
        </div>
      </div>

      {/* Mobile summary */}
      <div className="mobile-summary-grid">
        <div className="mini-summary" onClick={() => navigate("/attendance")} style={{ cursor: "pointer" }}>
          <span>Attendance</span>
          <strong>{attendanceStats.percentage}%</strong>
          <small>{parseFloat(attendanceStats.percentage) >= 90 ? '↗ Excellent' : '→ Good'}</small>
        </div>
        <div className="mini-summary" onClick={() => navigate("/results")} style={{ cursor: "pointer" }}>
          <span>Class Standing</span>
          <strong>Rank {classRank}</strong>
          <small>Grade {grade}</small>
        </div>
        <div className="mini-summary" onClick={() => navigate("/performance")} style={{ cursor: "pointer" }}>
          <span>Average Score</span>
          <strong>{avgScore}%</strong>
          <small>Grade {grade}</small>
        </div>
      </div>

      {/* Mobile Quick Actions */}
      <div className="mobile-quick-actions">
        <div className="quick-heading">
          <span>Quick Actions</span>
          <small>Tap to launch</small>
        </div>
        <div className="quick-buttons">
          <button onClick={() => navigate("/attendance")}>
            <UserRound size={17} />Attendance
          </button>
          <button
            className={homeworkStats.dueToday > 0 ? "active" : ""}
            onClick={() => navigate("/homework")}
          >
            <ClipboardList size={17} />Homework
            {homeworkStats.dueToday > 0 && <span className="badge">{homeworkStats.dueToday} Due</span>}
          </button>
        </div>
      </div>

      {/* Mobile Upcoming Class */}
      {nextClass && (
        <div className="mobile-only">
          <section className="mobile-card">
            <div className="mobile-card-title">
              <div>
                <h2>◷ Upcoming Class</h2>
              </div>
              <b style={{ background: "#caffdf", color: "var(--green)" }}>
                {minutesUntilNext > 0 ? `In ${minutesUntilNext} min` : 'Now'}
              </b>
            </div>
            <div className="upcoming-content" style={{ cursor: "pointer" }} onClick={() => navigate("/schedule")}>
              <div className="period-circle">
                <small>PER</small>
                {nextClass.period}
              </div>
              <div>
                <h3>{nextClass.class?.subject?.name || "Class"}</h3>
                <p>
                  {nextClass.class?.teacher?.user ? 
                    `${nextClass.class.teacher.user.firstName} ${nextClass.class.teacher.user.lastName}` : 
                    'Teacher'
                  }
                  {nextClass.room && ` • ${nextClass.room}`}
                </p>
                <span>◷ {formatTime(nextClass.startTime)} – {formatTime(nextClass.endTime)}</span>
              </div>
              <ChevronRight size={18} style={{ marginLeft: "auto", color: "#aaa", flexShrink: 0 }} />
            </div>
          </section>
        </div>
      )}

      {/* Mobile Attendance */}
      <div className="mobile-only">
        <section className="mobile-card">
          <div className="mobile-card-title">
            <div>
              <h2><ShieldCheck size={16} /> Attendance Analytics</h2>
              <p>Current Term Cumulative</p>
            </div>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--green)",
                fontSize: "12px",
                fontWeight: 600
              }}
              onClick={() => navigate("/attendance")}
            >
              Detailed Log ↗
            </button>
          </div>
          <div className="mobile-attendance-content">
            <div className="mobile-donut">
              <div>
                <strong>{attendanceStats.percentage}</strong>
                <span>% PRESENT</span>
              </div>
            </div>
            <div className="attendance-stats">
              <div>
                <span style={{ color: "var(--green)" }}>● Present</span>
                <strong>{attendanceStats.presentDays}d</strong>
              </div>
              <div>
                <span style={{ color: "#d63333" }}>● Absent</span>
                <strong>{attendanceStats.absentDays}d</strong>
              </div>
              {attendanceStats.medicalDays > 0 && (
                <div>
                  <span style={{ color: "#e67700" }}>● Medical</span>
                  <strong>{attendanceStats.medicalDays}d</strong>
                </div>
              )}
            </div>
          </div>

          {/* This week's record */}
          {weekAttendance.length > 0 && (
            <div className="week-record">
              <div className="week-record-title">
                THIS WEEK'S RECORD &nbsp;
                <span style={{ color: "var(--green)", fontWeight: 700 }}>
                  {weekAttendance.filter(d => !d.isFuture && d.status === "PRESENT").length}/{weekAttendance.filter(d => !d.isFuture).length} Present
                </span>
              </div>
              <div className="week-strip">
                {weekAttendance.map((day, i) => (
                  <div key={i} className={`week-day${day.isToday ? " active-day" : ""}`}>
                    <span>{day.isToday ? "Today" : day.day}</span>
                    <b>{day.isFuture ? "–" : day.status === "PRESENT" ? "✓" : "✗"}</b>
                    <small>
                      {day.isFuture ? "Upcoming" : day.isToday ? "Active" : day.status === "PRESENT" ? "On-time" : "Absent"}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Subject Performance - Mobile */}
        {subjectPerformance.length > 0 && (
          <section className="mobile-card">
            <div className="mobile-card-title">
              <div>
                <h2>Subject Performance</h2>
                <p>Recent Assessments</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className={`filter-chip${perfTab === "Donut" ? " active" : ""}`}
                  onClick={() => setPerfTab("Donut")}
                  style={{ padding: "3px 8px", fontSize: 10 }}
                >
                  Overview
                </button>
                <button
                  className={`filter-chip${perfTab === "Details" ? " active" : ""}`}
                  onClick={() => setPerfTab("Details")}
                  style={{ padding: "3px 8px", fontSize: 10 }}
                >
                  Details
                </button>
              </div>
            </div>
            {perfTab === "Donut" ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div className="donut" style={{ width: 160, height: 160 }}>
                  <div>
                    <strong>{avgScore}%</strong>
                    <span>Agg. Score</span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%" }}>
                  {subjectPerformance.slice(0, 6).map((subject, i) => (
                    <div key={subject.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                      <span style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: `hsl(${150 - i * 20}, 70%, ${40 + i * 5}%)`,
                        flexShrink: 0,
                        display: "block"
                      }}></span>
                      <span style={{ color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {subject.name}
                      </span>
                      <strong style={{ marginLeft: "auto" }}>{subject.percentage}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {subjectPerformance.map((subject, i) => (
                  <div key={subject.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span>{subject.name}</span>
                      <strong style={{ color: "var(--green)" }}>{subject.percentage}%</strong>
                    </div>
                    <div className="progress">
                      <div style={{
                        width: `${subject.percentage}%`,
                        background: `hsl(${150 - i * 20}, 70%, ${40 + i * 5}%)`
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Campus Bulletin - Mobile */}
        {recentNotices.length > 0 && (
          <section className="mobile-card bulletin">
            <div className="mobile-card-title">
              <h2><Megaphone size={16} /> Campus Bulletin</h2>
              <b>{recentNotices.length} Recent</b>
            </div>
            {recentNotices.map((notice) => (
              <div key={notice.id} className="bulletin-item" style={{ cursor: "pointer" }} onClick={() => navigate("/notices")}>
                <div className="bullet-icon">
                  {notice.category === "Sports" ? <Trophy size={17} /> : <FlaskConical size={17} />}
                </div>
                <div>
                  <strong>{notice.title.length > 40 ? notice.title.slice(0, 40) + '...' : notice.title}</strong>
                  <small>{new Date(notice.publishDate).toLocaleDateString()}</small>
                  <p>{notice.content.slice(0, 100)}...</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Desktop Main Grid */}
      <div className="dashboard-grid">
        <div className="left-column">
          {/* Performance */}
          {subjectPerformance.length > 0 && (
            <section className="panel performance-panel">
              <div className="panel-heading">
                <div>
                  <h2>Subject Performance</h2>
                  <p>Recent Assessments</p>
                </div>
                <div className="view-toggle">
                  {["Donut", "Details"].map(tab => (
                    <button
                      key={tab}
                      className={perfTab === tab ? "active" : ""}
                      onClick={() => setPerfTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              {perfTab === "Donut" && (
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 28,
                  marginTop: 24,
                  flexWrap: "wrap",
                  alignItems: "center"
                }}>
                  <div className="donut">
                    <div>
                      <strong>{avgScore}%</strong>
                      <span>Agg. Score</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
                    {subjectPerformance.slice(0, 6).map((subject, i) => (
                      <div key={subject.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                        <span style={{
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: `hsl(${150 - i * 20}, 70%, ${40 + i * 5}%)`,
                          flexShrink: 0,
                          display: "block"
                        }}></span>
                        <span style={{ color: "#555" }}>{subject.name}</span>
                        <strong style={{ marginLeft: 6 }}>{subject.percentage}%</strong>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {perfTab === "Details" && (
                <div className="subject-list" style={{ marginTop: 20 }}>
                  {subjectPerformance.map((subject, i) => (
                    <div className="subject-row" key={subject.id}>
                      <div className="subject-top">
                        <div className="subject-name">
                          <span style={{ background: `hsl(${150 - i * 20}, 70%, ${40 + i * 5}%)` }}>
                            {subject.code || subject.name.slice(0, 2).toUpperCase()}
                          </span>
                          <div>
                            <strong>{subject.name}</strong>
                            <small>{subject.scores.length} assessment{subject.scores.length !== 1 ? 's' : ''}</small>
                          </div>
                        </div>
                        <div className="subject-score">
                          <strong>{subject.percentage}</strong>/100
                          <span>{subject.grade}</span>
                        </div>
                      </div>
                      <div className="progress">
                        <div style={{
                          width: `${subject.percentage}%`,
                          background: `hsl(${150 - i * 20}, 70%, ${40 + i * 5}%)`
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Attendance Analytics */}
          <section className="panel attendance-panel">
            <div className="panel-heading">
              <div>
                <h2>Attendance Analytics</h2>
                <p>Current Term Cumulative</p>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--green)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
                onClick={() => navigate("/attendance")}
              >
                Detailed Log ↗
              </button>
            </div>
            <div style={{ display: "flex", gap: 28, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
              <div className="donut" style={{
                width: 140,
                height: 140,
                background: `conic-gradient(var(--green) 0 ${attendanceStats.percentage}%, #eee ${attendanceStats.percentage}%)`,
                flexShrink: 0
              }}>
                <div style={{ width: 96, height: 96 }}>
                  <strong style={{ fontSize: 22 }}>{attendanceStats.percentage}</strong>
                  <span style={{ fontSize: 10 }}>% PRESENT</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["● Present", `${attendanceStats.presentDays}d`, "var(--green)"],
                  ["● Absent", `${attendanceStats.absentDays}d`, "#d63333"],
                  ...(attendanceStats.medicalDays > 0 ? [["● Medical", `${attendanceStats.medicalDays}d`, "#e67700"]] : [])
                ].map(([label, val, color]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ color }}>{label}</span>
                    <strong style={{ marginLeft: "auto" }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
            {weekAttendance.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div className="cycle-title">
                  THIS WEEK'S RECORD &nbsp;
                  <span style={{ color: "var(--green)", fontWeight: 700 }}>
                    {weekAttendance.filter(d => !d.isFuture && d.status === "PRESENT").length}/{weekAttendance.filter(d => !d.isFuture).length} Present
                  </span>
                </div>
                <div className="heat-strip">
                  {weekAttendance.map((day, i) => (
                    <div className={`heat-day${day.isToday ? " today" : ""}`} key={i}>
                      <span>{day.isToday ? "Today" : day.day}</span>
                      <small>{day.isFuture ? "–" : day.status === "PRESENT" ? "✓" : "✗"}</small>
                      <em>
                        {day.isFuture ? "Upcoming" : day.isToday ? "Active" : day.status === "PRESENT" ? "On-time" : "Absent"}
                      </em>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="right-column">
          {/* Today's Classes */}
          {upcomingSchedules.length > 0 && (
            <section className="panel classes-panel">
              <div className="panel-heading compact">
                <div>
                  <h2>Today's Schedule</h2>
                  <p>{upcomingSchedules.length} session{upcomingSchedules.length !== 1 ? 's' : ''}</p>
                </div>
                {nextClass && minutesUntilNext !== null && (
                  <div className="live-badge">
                    {minutesUntilNext > 0 ? `In ${minutesUntilNext} min` : 'Now'}
                  </div>
                )}
              </div>
              <div className="class-list">
                {upcomingSchedules.map((schedule, i) => (
                  <div className="class-item" key={schedule.id} onClick={() => navigate("/schedule")}>
                    <div className="class-time">
                      <small>PERIOD {schedule.period}</small>
                      <strong>{formatTime(schedule.startTime)}</strong>
                    </div>
                    <div className="class-info">
                      <h3>{schedule.class?.subject?.name || "Class"}</h3>
                      <p>
                        {schedule.class?.teacher?.user ? 
                          `${schedule.class.teacher.user.firstName} ${schedule.class.teacher.user.lastName}` : 
                          'Teacher'
                        }
                        {schedule.room && ` • ${schedule.room}`}
                      </p>
                    </div>
                    {nextClass && nextClass.id === schedule.id && <div className="class-live">NEXT</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Notice Board */}
          {recentNotices.length > 0 && (
            <section className="panel notice-panel">
              <div className="panel-heading compact">
                <h2><Megaphone size={17} /> Campus Bulletin</h2>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--green)",
                    fontSize: "13px",
                    fontWeight: 600
                  }}
                  onClick={() => navigate("/notices")}
                >
                  View All
                </button>
              </div>
              {recentNotices.map((notice) => (
                <div className="notice" key={notice.id} style={{ cursor: "pointer" }} onClick={() => navigate("/notices")}>
                  <div className="notice-top">
                    <span>{notice.category}</span>
                    <small>{new Date(notice.publishDate).toLocaleDateString()}</small>
                  </div>
                  <strong>{notice.title}</strong>
                  <p>{notice.content.slice(0, 100)}...</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
