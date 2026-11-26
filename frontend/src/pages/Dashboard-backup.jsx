import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarCheck, CircleHelp, FileBarChart, CheckCircle2, TrendingUp,
  Bell, ShieldCheck, Trophy, Megaphone, ChevronRight, FlaskConical,
  MoreHorizontal, ClipboardList, UserRound, Send
} from "lucide-react";
import { subjects, allNotices, schedule } from "../data.js";
import { Modal } from "../Layout.jsx";

export default function Dashboard({ showToast, setModal: parentSetModal }) {
  const navigate = useNavigate();
  const [localModal, setLocalModal] = useState(null);
  const [perfTab, setPerfTab] = useState("Donut");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");

  const close = () => setLocalModal(null);

  return (
    <div className="dashboard">
{/* Welcome Card */}
      <section className="welcome-card">
        <div className="student-info">
          <div className="student-avatar">AS<span className="status-dot"></span></div>
          <div>
            <div className="welcome-title">
              <h1>Aarav Sharma</h1>
              <span style={{ fontSize: 14, color: "var(--green)", fontWeight: 600, marginLeft: 8 }}>✓</span>
            </div>
            <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
              AY 2024–25 &nbsp;
              <span style={{ background: "#dff9ef", color: "var(--green)", padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, marginLeft: 4 }}>Term II</span>
            </div>
            <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>Grade 10 – Section B • Roll No. 26</p>
          </div>
        </div>
        <div className="welcome-actions">
          <button onClick={() => navigate("/attendance")}><UserRound size={15} />Attendance</button>
          <button onClick={() => navigate("/doubt-forum")}><CircleHelp size={15} />Ask a Doubt</button>
          <button className="green-button" onClick={() => navigate("/results")}><FileBarChart size={16} />View Report Card</button>
        </div>
      </section>

      {/* Summary Grid - Desktop */}
      <div className="desktop-summary-grid">
        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/attendance")}>
          <div className="summary-heading"><span>ATTENDANCE</span><CheckCircle2 size={20} /></div>
          <strong>94.2%</strong>
          <div className="summary-positive">↗ Good</div>
          <p>Class Standing: <strong>Rank 3</strong> of 42 students</p>
          <div className="summary-footer">Pres: <b>146d</b> &nbsp; Abs: <em>7d</em></div>
        </div>
        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/results")}>
          <div className="summary-heading"><span>CLASS STANDING</span><TrendingUp size={20} /></div>
          <strong>Rank 3</strong>
          <p>of 42 students</p>
          <div className="grade-pill">Grade A1</div>
        </div>
        <div className="summary-card" style={{ cursor: "pointer" }} onClick={() => navigate("/performance")}>
          <div className="summary-heading"><span>AVG SCORE</span><span className="percent-icon">%</span></div>
          <strong className="green-number">91.5%</strong>
          <div className="grade-pill">Grade A1</div>
          <div className="summary-footer">Class Avg: 78.4% <span>+13.1%</span></div>
        </div>
        <div className="summary-card action-card">
          <div className="summary-heading"><span>ACTION ITEMS</span><Bell size={19} /></div>
          <div className="action-line" style={{ cursor: "pointer" }} onClick={() => navigate("/homework")}><span>2 Homework Due</span><b>Today</b></div>
          <div className="action-line" style={{ cursor: "pointer" }} onClick={() => showToast("Olympiad form — 2 days left!")}><span>1 Olympiad Form</span><span>2 Days Left</span></div>
          <div className="term-alert">◉ Term Finals begin in 12 Days</div>
        </div>
      </div>

      {/* Mobile summary */}
      <div className="mobile-summary-grid">
        <div className="mini-summary" onClick={() => navigate("/attendance")} style={{ cursor: "pointer" }}>
          <span>Attendance</span><strong>94.2%</strong><small>↗ Good</small>
        </div>
        <div className="mini-summary" onClick={() => navigate("/results")} style={{ cursor: "pointer" }}>
          <span>Class Standing</span><strong>Rank 3</strong><small>of 42 students</small>
        </div>
        <div className="mini-summary" onClick={() => navigate("/performance")} style={{ cursor: "pointer" }}>
          <span>Average Score</span><strong>91.5%</strong><small>Grade A1</small>
        </div>
      </div>

      {/* Mobile Quick Actions */}
      <div className="mobile-quick-actions">
        <div className="quick-heading"><span>Quick Actions</span><small>Tap to launch</small></div>
        <div className="quick-buttons">
          <button onClick={() => navigate("/attendance")}><UserRound size={17} />Attendance</button>
          <button className="active" onClick={() => navigate("/homework")}>
            <ClipboardList size={17} />Homework <span className="badge">2 Due</span>
          </button>
        </div>
      </div>

      {/* Mobile Upcoming Class */}
      <div className="mobile-only">
        <section className="mobile-card">
          <div className="mobile-card-title">
            <div>
              <h2>◷ Upcoming Class</h2>
            </div>
            <b style={{ background: "#caffdf", color: "var(--green)" }}>Live in 25 min</b>
          </div>
          <div className="upcoming-content" style={{ cursor: "pointer" }} onClick={() => navigate("/schedule")}>
            <div className="period-circle">
              <small>PER</small>
              04
            </div>
            <div>
              <h3>Advanced Physics</h3>
              <p>Dr. Evans • Room 204 (Lab Wing)</p>
              <span>◷ 11:15 AM – 12:00 PM</span>
            </div>
            <ChevronRight size={18} style={{ marginLeft: "auto", color: "#aaa", flexShrink: 0 }} />
          </div>
        </section>

        {/* Mobile Attendance */}
        <section className="mobile-card">
          <div className="mobile-card-title">
            <div>
              <h2><ShieldCheck size={16} /> Attendance Analytics</h2>
              <p>Current Term Cumulative</p>
            </div>
            <button
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", fontSize: "12px", fontWeight: 600 }}
              onClick={() => navigate("/attendance")}
            >
              Detailed Log ↗
            </button>
          </div>
          <div className="mobile-attendance-content">
            <div className="mobile-donut">
              <div><strong>94.2</strong><span>% PRESENT</span></div>
            </div>
            <div className="attendance-stats">
              <div><span style={{ color: "var(--green)" }}>● Present</span><strong>146d</strong></div>
              <div><span style={{ color: "#d63333" }}>● Absent</span><strong>7d</strong></div>
              <div><span style={{ color: "#e67700" }}>● Medical</span><strong>2d</strong></div>
            </div>
          </div>
          {/* This week's record */}
          <div className="week-record">
            <div className="week-record-title">THIS WEEK'S RECORD &nbsp; <span style={{ color: "var(--green)", fontWeight: 700 }}>100% Present</span></div>
            <div className="week-strip">
              {[
                ["Mon", "✓", "On-time"],
                ["Tue", "✓", "On-time"],
                ["Wed", "✓", "On-time"],
                ["Thu", "✓", "On-time"],
                ["Today", "✓", "Active"]
              ].map(([day, icon, status], i) => (
                <div key={i} className={`week-day${i === 4 ? " active-day" : ""}`}>
                  <span>{day}</span>
                  <b>{icon}</b>
                  <small>{status}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop layout's performance panel - mobile version */}
        <section className="mobile-card">
          <div className="mobile-card-title">
            <div>
              <h2>Subject Performance</h2>
              <p>Mid-Term I Official Assessments</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className={`filter-chip${perfTab === "Donut" ? " active" : ""}`}
                onClick={() => setPerfTab("Donut")}
                style={{ padding: "3px 8px", fontSize: 10 }}
              >Donut</button>
              <button
                className={`filter-chip${perfTab === "Details" ? " active" : ""}`}
                onClick={() => setPerfTab("Details")}
                style={{ padding: "3px 8px", fontSize: 10 }}
              >Details</button>
            </div>
          </div>
          {perfTab === "Donut" ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <div className="donut" style={{ width: 160, height: 160 }}>
                <div>
                  <strong>91.5%</strong>
                  <span>Agg. Score</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: "100%" }}>
                {[
                  ["Comp.Science", "98%", "#087f5b"],
                  ["Mathematics", "96%", "#20a77a"],
                  ["Science(Phy/C.)", "92%", "#495057"],
                  ["2nd Language", "90%", "#7ee8c1"],
                  ["English Lit.", "88%", "#adb5bd"],
                  ["Social Studies", "85%", "#9be7cb"]
                ].map(([sub, score, color]) => (
                  <div key={sub} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, display: "block" }}></span>
                    <span style={{ color: "#555" }}>{sub}</span>
                    <strong style={{ marginLeft: "auto" }}>{score}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              {subjects.map(s => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                    <span>{s.name}</span><strong style={{ color: "var(--green)" }}>{s.score}%</strong>
                  </div>
                  <div className="progress"><div style={{ width: `${s.score}%`, background: s.color }}></div></div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Campus Bulletin */}
        <section className="mobile-card bulletin">
          <div className="mobile-card-title">
            <h2><Megaphone size={16} /> Campus Bulletin</h2>
            <b>2 Unread</b>
          </div>
          <div className="bulletin-item" style={{ cursor: "pointer" }} onClick={() => navigate("/sports")}>
            <div className="bullet-icon"><Trophy size={17} /></div>
            <div>
              <strong>School Football Championship...</strong>
              <small>Yesterday</small>
              <p>Emerald Falcons clash with Ruby Phoenix this Thursday 3:30 PM on Main Ground. Captains...</p>
            </div>
          </div>
          <div className="bulletin-item" style={{ cursor: "pointer" }} onClick={() => navigate("/notices")}>
            <div className="bullet-icon"><FlaskConical size={17} /></div>
            <div>
              <strong>Science Olympiad Submission P...</strong>
              <small>2 days ago</small>
              <p>Submit synopsis for project exhibits via the school ERP by Friday midnight.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Desktop Main Grid */}
      <div className="dashboard-grid">
        <div className="left-column">
          {/* Performance */}
          <section className="panel performance-panel">
            <div className="panel-heading">
              <div>
                <h2>Subject Performance</h2>
                <p>Mid-Term I Official Assessments</p>
              </div>
              <div className="view-toggle">
                {["Donut", "Details"].map(tab => (
                  <button key={tab} className={perfTab === tab ? "active" : ""} onClick={() => setPerfTab(tab)}>{tab}</button>
                ))}
              </div>
            </div>
            {perfTab === "Donut" && (
              <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 24, flexWrap: "wrap", alignItems: "center" }}>
                <div className="donut">
                  <div><strong>91.5%</strong><span>Agg. Score</span></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 20px" }}>
                  {[
                    ["Comp.Science", "98%", "#087f5b"],
                    ["Mathematics", "96%", "#20a77a"],
                    ["Science(Phy/C.)", "92%", "#495057"],
                    ["2nd Language", "90%", "#7ee8c1"],
                    ["English Lit.", "88%", "#adb5bd"],
                    ["Social Studies", "85%", "#9be7cb"]
                  ].map(([sub, score, color]) => (
                    <div key={sub} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                      <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, flexShrink: 0, display: "block" }}></span>
                      <span style={{ color: "#555" }}>{sub}</span>
                      <strong style={{ marginLeft: 6 }}>{score}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {perfTab === "Details" && (
              <div className="subject-list" style={{ marginTop: 20 }}>
                {subjects.map(s => (
                  <div className="subject-row" key={s.name}>
                    <div className="subject-top">
                      <div className="subject-name">
                        <span style={{ background: s.color }}>{s.short}</span>
                        <div><strong>{s.name}</strong><small>{s.teacher}</small></div>
                      </div>
                      <div className="subject-score"><strong>{s.score}</strong>/100<span>{s.score >= 90 ? "A1" : s.score >= 80 ? "A2" : "B1"}</span></div>
                    </div>
                    <div className="class-average"><span>Class Avg: {s.classAvg}%</span><span>Syllabus: {s.syllabus}%</span></div>
                    <div className="progress"><div style={{ width: `${s.score}%`, background: s.color }}></div></div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Attendance Analytics */}
          <section className="panel attendance-panel">
            <div className="panel-heading">
              <div>
                <h2>Attendance Analytics</h2>
                <p>Current Term Cumulative</p>
              </div>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", fontSize: "12px", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
                onClick={() => navigate("/attendance")}
              >
                Detailed Log ↗
              </button>
            </div>
            <div style={{ display: "flex", gap: 28, alignItems: "center", marginTop: 20, flexWrap: "wrap" }}>
              <div className="donut" style={{ width: 140, height: 140, background: "conic-gradient(var(--green) 0 94.2%, #eee 94.2%)", flexShrink: 0 }}>
                <div style={{ width: 96, height: 96 }}>
                  <strong style={{ fontSize: 22 }}>94.2</strong>
                  <span style={{ fontSize: 10 }}>% PRESENT</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["● Present", "146d", "var(--green)"],
                  ["● Absent", "7d", "#d63333"],
                  ["● Medical", "2d", "#e67700"]
                ].map(([label, val, color]) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
                    <span style={{ color }}>{label}</span>
                    <strong style={{ marginLeft: "auto" }}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="cycle-title">THIS WEEK'S RECORD &nbsp; <span style={{ color: "var(--green)", fontWeight: 700 }}>100% Present</span></div>
              <div className="heat-strip">
                {[["Mon", "✓", "On-time"], ["Tue", "✓", "On-time"], ["Wed", "✓", "On-time"], ["Thu", "✓", "On-time"], ["Today", "✓", "Active"]].map(([day, icon, status], i) => (
                  <div className={`heat-day${i === 4 ? " today" : ""}`} key={i}>
                    <span>{day}</span>
                    <small>{icon}</small>
                    <em>{status}</em>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="right-column">
          {/* Today's Classes */}
          <section className="panel classes-panel">
            <div className="panel-heading compact">
              <div>
                <h2>Upcoming Class</h2>
                <p>Tuesday • 4 Sessions remaining</p>
              </div>
              <div className="live-badge">Live in 25 min</div>
            </div>
            <div className="class-list">
              {schedule.filter(s => s.day === "Tue").map((item, i) => (
                <div className="class-item" key={i} onClick={() => navigate("/schedule")}>
                  <div className="class-time">
                    <small>PERIOD {item.period}</small>
                    <strong>{item.time}</strong>
                  </div>
                  <div className="class-info">
                    <h3>{item.title}</h3>
                    <p>{item.teacher} • {item.room}</p>
                  </div>
                  {item.live && <div className="class-live">NEXT</div>}
                </div>
              ))}
            </div>
          </section>
          {/* Notice Board */}
          <section className="panel notice-panel">
            <div className="panel-heading compact">
              <h2><Megaphone size={17} /> Campus Bulletin</h2>
              <button
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--green)", fontSize: "13px", fontWeight: 600 }}
                onClick={() => navigate("/notices")}
              >
                2 Unread
              </button>
            </div>
            {allNotices.slice(0, 3).map((n, i) => (
              <div className="notice" key={i} style={{ cursor: "pointer" }} onClick={() => navigate("/notices")}>
                <div className="notice-top">
                  <span>{n.tag}</span>
                  <small>{n.date}</small>
                </div>
                <strong>{n.title}</strong>
                <p>{n.text.slice(0, 100)}...</p>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Local Modals */}
      {localModal === "leave" && (
        <Modal title="Apply for Leave" onClose={close}>
          <p className="modal-desc">Submit a leave application to your homeroom teacher.</p>
          <label>Leave Date</label>
          <input type="date" className="modal-input" value={leaveDate} onChange={e => setLeaveDate(e.target.value)} />
          <label>Reason</label>
          <textarea className="modal-textarea" placeholder="Describe the reason..." value={leaveReason} onChange={e => setLeaveReason(e.target.value)} />
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={close}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => {
              if (!leaveDate || !leaveReason) { showToast("Please fill all fields."); return; }
              close(); showToast("✓ Leave application submitted!");
            }}>
              <Send size={14} />Submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
