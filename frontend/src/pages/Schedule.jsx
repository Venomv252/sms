import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { schedule } from "../data.js";

const days = ["Mon","Tue","Wed","Thu"];
const dayLabels = {
  "Mon": { day: "MON", date: "10 Feb" },
  "Tue": { day: "TUE (TODAY)", date: "11 Feb" },
  "Wed": { day: "WED", date: "12 Feb" },
  "Thu": { day: "THU", date: "13 Feb" }
};
const periods = ["P1","P2","P3","P4","P5","P6","P7"];
const periodTimes = {
  "P1":"08:30–09:15","P2":"09:20–10:05","P3":"10:25–11:10",
  "P4":"11:15–12:00","P5":"12:45–01:30","P6":"01:35–02:20","P7":"02:25–03:15"
};
const subjectColors = {
  "Math":"#1971c2","English":"#e67700","Science":"#087f5b","Chemistry":"#d63333",
  "History":"#7048e8","CS":"#087f5b","Social":"#495057","PhysEd":"#2f9e44",
  "Arts":"#c2255c","Physics":"#3b5bdb","Hindi":"#868e96"
};

export default function Schedule({ showToast }) {
  const [view, setView] = useState("Week");
  const [clickedClass, setClickedClass] = useState(null);

  const getCell = (period, day) => schedule.find(s => s.period === period && s.day === day);

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/schedules" title="Timetable entries from database" fields={[{ key: "dayOfWeek", label: "Day" }, { key: "period", label: "Period" }, { key: "startTime", label: "Starts" }, { key: "endTime", label: "Ends" }, { key: "class.subject.name", label: "Subject" }, { key: "room", label: "Room" }]} />
      <div className="breadcrumb">● ACTIVE TERM II &nbsp;•&nbsp; CBSE Curriculum • Sec 10-B</div>
      <div className="page-header-row" style={{ flexWrap: "wrap", gap: 14 }}>
        <div>
          <h1 className="page-title">Schedule & Master Timetable</h1>
          <p className="page-subtitle">Academic Year 2024–25 • Grade 10, Division B • Homeroom: 204</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <div className="view-toggle" style={{ marginRight: 8 }}>
            {["Day","Week","Month"].map(v => (
              <button key={v} className={view === v ? "active" : ""} onClick={() => setView(v)}>{v}</button>
            ))}
          </div>
          <button className="outline-btn btn" onClick={() => showToast("Syncing with iCal...")}>📅 SynciCal</button>
          <button className="green-button btn" onClick={() => showToast("Exporting PDF...")}>⬇ Export PDF</button>
        </div>
      </div>

      {/* Week nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <button className="icon-btn" onClick={() => showToast("Previous week")}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 600 }}>📅 Mon 10 Feb – Fri 14 Feb &nbsp;<span style={{ color: "#777", fontWeight: 400 }}>Week 24</span></span>
        <button className="icon-btn" onClick={() => showToast("Next week")}>›</button>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
          <select className="hw-select" onChange={e => showToast(`Filter: ${e.target.value}`)}>
            <option>All Subjects (8)</option>
            {["Math","Physics","Chemistry","CS","English","History","PE"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="hw-select" onChange={e => showToast(`Instructor: ${e.target.value}`)}>
            <option>All Instructors</option>
            {["Mrs. Roy","Dr. A. Evans","Mr. K. Sharma","Dr. H. Patel"].map(i => <option key={i}>{i}</option>)}
          </select>
          <button className="outline-btn btn" onClick={() => showToast("Opening Bell Timings...")}>🔔 Bell Timings</button>
        </div>
      </div>

      {/* Today's Pulse */}
      <div className="schedule-pulse-bar">
        <span>🟢</span>
        <div>
          <strong>TODAY'S PULSE • Tuesday, 11 Feb 2025</strong>
          <p>Next: Advanced Physics with Dr. A. Evans &nbsp;•&nbsp; 11:15 AM – 12:00 PM • Room 204 (Period 4) • 4 classes remaining today</p>
        </div>
        <div className="schedule-countdown">
          <div>Period Starts In</div>
          <strong>18m 38s</strong>
        </div>
        <button className="green-button btn" onClick={() => showToast("Opening Class Notes...")}>Class Notes</button>
      </div>

      <div className="schedule-layout">
        {/* Timetable */}
        <div className="schedule-table-wrap">
          {/* Header row */}
          <div className="sched-grid-header">
            <div className="sched-time-col" style={{ fontWeight: 700, fontSize: 10, color: "#999", padding: "10px 8px 10px 14px" }}>TIME / PERIOD</div>
            {days.map(d => (
              <div key={d} className={`sched-day-header${d === "Tue" ? " today-col" : ""}`}>
                {dayLabels[d].day}
                <strong>{dayLabels[d].date}</strong>
              </div>
            ))}
          </div>

          {/* Morning Assembly row */}
          <div className="sched-special-row">
            <div className="sched-time-col" style={{ fontSize: 10 }}>08:00 – 08:25</div>
            <div className="sched-special-cell" style={{ gridColumn: "span 4" }}>
              👥 School Morning Assembly & National Anthem &nbsp;•&nbsp; Central Quadrant
            </div>
          </div>

          {/* Period rows */}
          {periods.map(p => {
            const periodNum = p.slice(1);
            const isAfterLunch = p === "P5";
            const isAfterBreak = p === "P3";
            return (
              <React.Fragment key={p}>
                {isAfterBreak && (
                  <div className="sched-break-row-el">
                    <div className="sched-time-col" style={{ fontSize: 10 }}>10:05 – 10:25</div>
                    <div className="sched-break-cell">☕ Morning Recess & Fruit Break (20 mins)</div>
                  </div>
                )}
                {isAfterLunch && (
                  <div className="sched-break-row-el" style={{ background: "#fffdf0" }}>
                    <div className="sched-time-col" style={{ fontSize: 10 }}>12:00 – 12:45</div>
                    <div className="sched-break-cell">🍽 Mid-Day Lunch Break & Campus Canteen Access</div>
                  </div>
                )}
                <div className="sched-period-row">
                  <div className="sched-time-col">
                    <span className="sched-period-label">P{periodNum}</span>
                    <span className="sched-time-text">{periodTimes[p].split("–")[0].trim()}<br/>{periodTimes[p].split("–")[1].trim()}</span>
                  </div>
                  {days.map(d => {
                    const cell = getCell(p, d);
                    const isToday = d === "Tue";
                    const isLive = cell?.live;
                    const color = cell ? subjectColors[cell.subject] || "#333" : "transparent";
                    return (
                      <div
                        key={d}
                        className={`sched-cell${isToday ? " today-col" : ""}${isLive ? " live-cell" : ""}${cell ? " clickable" : ""}`}
                        onClick={() => cell && setClickedClass(cell)}
                      >
                        {cell ? (
                          <div className="sched-cell-inner" style={{ borderLeft: `3px solid ${color}`, paddingLeft: 6 }}>
                            <span className="sched-subj-label" style={{ color }}>{cell.subject}</span>
                            <div className="sched-tags">
                              {cell.lab && <span className="sched-lab-tag">Lab</span>}
                              {cell.live && <span className="sched-live-tag">● LIVE NEXT</span>}
                            </div>
                            <span className="sched-title">{cell.title}</span>
                            <span className="sched-teacher">{cell.teacher}</span>
                            <span className="sched-room">{cell.room}</span>
                          </div>
                        ) : (
                          <div className="sched-empty">—</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Right sidebar */}
        <div className="schedule-sidebar">
          <div className="panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{ fontSize: 12, color: "#777", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>HOMEROOM IN-CHARGE</h3>
              <span className="badge-chip green">Desk 204</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Dr. A. Evans</div>
            <div style={{ fontSize: 11, color: "#777" }}>Senior Faculty • Dept. Physics</div>
            <div style={{ fontSize: 12, marginTop: 10, color: "#555", lineHeight: 1.7 }}>
              <div>Homeroom: Room 204 (East Wing)</div>
              <div>Office Hours: 03:20 PM – 04:00 PM</div>
              <div style={{ wordBreak: "break-all" }}>a.evans@greenwood.edu</div>
            </div>
            <button className="green-button btn" style={{ marginTop: 12, width: "100%", justifyContent: "center" }} onClick={() => showToast("Opening Faculty Consultation booking...")}>
              Book Faculty Consultation
            </button>
          </div>

          <div className="panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <h3 style={{ fontSize: 12, color: "#777", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>🚩 CLASS DIRECTIVES</h3>
              <span style={{ background: "#d63333", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "grid", placeItems: "center", fontSize: 10 }}>●</span>
            </div>
            {[
              { tag: "LAB REQUIREMENT", color: "#1971c2", text: "Tomorrow: Bring practical record notebooks & verified USB drives for Computer Science Lab (Period 6, Wed).", label: "Tomorrow" },
              { tag: "SUBSTITUTE FACULTY", color: "#e67700", text: "Chemistry Theory will be conducted by Mrs. V. Nairn lieu Dr. H. Patel (Faculty Sync duty).", label: "Thu P6" },
              { tag: "UNIFORM REMINDER", color: "#087f5b", text: "Sports kits mandatory for school track trials during Period 7.", label: "Friday" }
            ].map(d => (
              <div key={d.tag} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #eee" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ background: d.color + "22", color: d.color, borderRadius: 5, padding: "2px 6px", fontSize: 10, fontWeight: 700 }}>{d.tag}</span>
                  <span style={{ fontSize: 10, color: "#777" }}>{d.label}</span>
                </div>
                <p style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{d.text}</p>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3 style={{ fontSize: 12, color: "#777", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 10 }}>🗺 CAMPUS QUICK NAV</h3>
            <div
              style={{ background: "#e8f5ee", borderRadius: 10, height: 80, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 8 }}
              onClick={() => showToast("Opening campus map...")}
            >
              <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>🏫 Locate Room 204</span>
            </div>
            <p style={{ fontSize: 11, color: "#777", lineHeight: 1.5 }}>Room 204 is located on Floor 2, North Science Wing near Stairwell C.</p>
          </div>
        </div>
      </div>

      {/* Classification Legend */}
      <div className="sched-legend-bar">
        <div className="sched-legend">
          <span><span style={{ color: "#1971c2" }}>■</span> STEM Core</span>
          <span><span style={{ color: "#e67700" }}>■</span> Humanities</span>
          <span><span style={{ color: "#2f9e44" }}>■</span> Sports / Arts</span>
          <span><span style={{ color: "#d63333" }}>■</span> Lab Practical</span>
        </div>
        <div style={{ fontSize: 13 }}>WEEKLY LOAD &nbsp; <strong>35 Periods Total</strong></div>
        <div style={{ display: "flex", gap: 8, fontSize: 11, flexWrap: "wrap" }}>
          <span style={{ color: "#087f5b" }}>46% STEM</span>
          <span style={{ color: "#e67700" }}>26% Humanities</span>
          <span style={{ color: "#2f9e44" }}>15% Sports</span>
          <span style={{ color: "#777" }}>13% Other</span>
        </div>
        <div style={{ fontSize: 13 }}>ATTENDANCE RATE &nbsp; <strong style={{ color: "var(--green)" }}>96.8%</strong> &nbsp; <span style={{ fontSize: 11, color: "#777" }}>31 of 32 sessions</span></div>
      </div>

      {/* Clicked class detail */}
      {clickedClass && (
        <div className="modal-overlay" onClick={() => setClickedClass(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{clickedClass.title}</h2>
              <button className="modal-close" onClick={() => setClickedClass(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 8 }}><strong>Subject:</strong> {clickedClass.subject}</p>
              <p style={{ marginBottom: 8 }}><strong>Teacher:</strong> {clickedClass.teacher}</p>
              <p style={{ marginBottom: 8 }}><strong>Room:</strong> {clickedClass.room}</p>
              <p style={{ marginBottom: 8 }}><strong>Time:</strong> {clickedClass.time}</p>
              <p style={{ marginBottom: 8 }}><strong>Period:</strong> {clickedClass.period} &nbsp;•&nbsp; <strong>Day:</strong> {clickedClass.day}</p>
              {clickedClass.lab && <div className="sched-lab-tag" style={{ display: "inline-block", marginTop: 4 }}>Laboratory Session</div>}
              {clickedClass.live && <div className="sched-live-tag" style={{ display: "inline-block", marginTop: 4 }}>● LIVE NEXT</div>}
              <div className="modal-actions">
                <button className="modal-btn-secondary" onClick={() => setClickedClass(null)}>Close</button>
                <button className="modal-btn-primary" onClick={() => { setClickedClass(null); showToast("Opening class notes..."); }}>View Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
