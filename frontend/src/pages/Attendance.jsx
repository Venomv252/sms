import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { CheckCircle2, Upload, Send, Calendar } from "lucide-react";
import { Modal } from "../Layout.jsx";
import { subjects } from "../data.js";

const calendarDays = [
  {day:27,month:"Jan",status:""},{day:28,status:""},{day:29,status:""},{day:30,status:""},{day:31,status:""},
  {day:1,status:"present"},{day:2,status:"weekend"},
  {day:3,status:"present"},{day:4,status:"present"},{day:5,status:"present"},{day:6,status:"present"},{day:7,status:"present"},{day:8,status:"weekend"},{day:9,status:"weekend"},
  {day:10,status:"present"},{day:11,status:"present"},{day:12,status:"present"},{day:13,status:"present"},{day:14,status:"dutyLeave"},{day:15,status:"weekend"},{day:16,status:"weekend"},
  {day:17,status:"present"},{day:18,status:"medical"},{day:19,status:"medical"},{day:20,status:"present"},{day:21,status:"present"},{day:22,status:"weekend"},{day:23,status:"weekend"},
  {day:24,status:"present"},{day:25,status:"present"},{day:26,status:"today"},{day:27,status:"upcoming"},{day:28,status:"upcoming"},
  {day:1,month:"Mar",status:""},{day:2,status:""}
];

const leaveRecords = [
  {ref:"LV-3921",type:"Fever & Viral Infection",dates:"Feb 18, 2025 – Feb 19, 2025 (2 Days)",doc:"Dr. Evans_Prescription.pdf (Verified)",approved:"Dr. A. Evans (School Medical Officer)",status:"Approved"},
  {ref:"LV-8704",type:"Inter-School Debate Championship",dates:"Jan 14, 2025/1 Day • Official Duty Leave",doc:"Principal Delegation Letter Attached",approved:"Authorized by: Mr. Robert Vance (VP Academics)",status:"Approved"},
];

export default function Attendance({ showToast }) {
  const [leaveType, setLeaveType] = useState("Medical");
  const [startDate, setStartDate] = useState("03/03/2025");
  const [endDate, setEndDate] = useState("03/04/2025");
  const [reason, setReason] = useState("");
  const [notify, setNotify] = useState(true);
  const [certModal, setCertModal] = useState(false);

  const dayStyle = (s) => {
    if(s==="present") return {background:"#dff9ef",color:"#087f5b"};
    if(s==="medical") return {background:"#fff4e0",color:"#e67700"};
    if(s==="dutyLeave") return {background:"#dde8ff",color:"#1971c2"};
    if(s==="today") return {background:"#087f5b",color:"#fff",fontWeight:700};
    if(s==="weekend") return {background:"#f4f4f4",color:"#aaa"};
    if(s==="upcoming") return {background:"#f8f8f8",color:"#ccc"};
    return {background:"transparent",color:"#aaa"};
  };
  const dayLabel = (s) => {
    if(s==="present") return "● Present";
    if(s==="medical") return "✚ Medical";
    if(s==="dutyLeave") return "◆ Duty";
    if(s==="today") return "◉ Today";
    if(s==="weekend") return "Weekend";
    if(s==="upcoming") return "Upcoming";
    return "";
  };

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/attendance" title="Attendance records from database" fields={[{ key: "date", label: "Date" }, { key: "class.subject.name", label: "Subject" }, { key: "status", label: "Status" }, { key: "remarks", label: "Remarks" }]} />
      <div className="breadcrumb">Official Academic Record &nbsp;•&nbsp; Ref: STU-2024-10B-24</div>
      <div className="page-header-row" style={{alignItems:"flex-end"}}>
        <div>
          <h1 className="page-title">Attendance & Leave<br/>Management</h1>
          <div style={{display:"flex",gap:12,marginTop:8,flexWrap:"wrap"}}>
            <span className="info-tag">Academic Year 2024–25</span>
            <span className="info-tag">Term II</span>
            <span className="info-tag">Grade 10, Section B (Senior Wing)</span>
          </div>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="green-button btn" onClick={() => showToast("Opening leave application form...")}>▶ Apply for Leave</button>
          <button className="outline-btn btn" onClick={() => setCertModal(true)}>🎖 Attendance Certificate</button>
          <button className="outline-btn btn" onClick={() => showToast("Opening Academic Calendar...")}>📅 Academic Calendar</button>
        </div>
      </div>

      {/* Stats */}
      <div className="att-stats-grid">
        <div className="att-stat">
          <div className="att-stat-label">CUMULATIVE ATTENDANCE</div>
          <div className="att-stat-value">94.2%</div>
          <div style={{fontSize:12,color:"#777"}}>85% Min</div>
          <div className="att-stat-sub green">↗ +1.4% from Term I</div>
          <div className="att-stat-row"><span>146 / 155 days</span></div>
          <div className="att-stat-pills"><span className="att-pill green">146 Present</span><span className="att-pill red">7 Absent</span><span className="att-pill orange">2 Medical</span></div>
        </div>
        <div className="att-stat">
          <div className="att-stat-label">SESSION STATUS</div>
          <div className="att-stat-value">155<small style={{fontSize:16,fontWeight:400}}> Days Logged</small></div>
          <div className="att-stat-pills" style={{marginTop:12}}>
            <span className="att-pill green">146 Present</span>
            <span className="att-pill red">7 Excused</span>
            <span className="att-pill orange">2 Medical</span>
          </div>
        </div>
        <div className="att-stat">
          <div className="att-stat-label">REMAINING QUOTA</div>
          <div className="att-stat-value">05<small style={{fontSize:16,fontWeight:400}}> Days Avail.</small></div>
          <div style={{fontSize:12,color:"#777",marginTop:6}}>1 Medical Left &nbsp;•&nbsp; 7 Casual Left</div>
        </div>
        <div className="att-stat dark">
          <div className="att-stat-label" style={{color:"#9de8cf"}}>CURRENT DISCIPLINE STREAK</div>
          <div className="att-stat-value" style={{color:"#fff",fontSize:40}}>24<small style={{fontSize:16,fontWeight:400}}> Days On-Time</small></div>
          <div style={{marginTop:8,display:"flex",gap:8}}><span className="badge-chip gold">🥇 Gold Badge</span><span style={{fontSize:12,color:"#9de8cf"}}>Personal Best: 42</span></div>
        </div>
      </div>

      <div className="att-main-grid">
        {/* Left */}
        <div>
          {/* Calendar */}
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading compact">
              <div><h2>Monthly Roll-Call Ledger</h2><p>Real-time morning homeroom & biometric punch logs</p></div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button className="icon-btn">‹</button>
                <strong style={{fontSize:14}}>February 2025</strong>
                <button className="icon-btn">›</button>
              </div>
            </div>
            <div className="cal-legend">
              <span style={{color:"#087f5b"}}>● Present (181)</span>
              <span style={{color:"#1971c2"}}>● Excused (1)</span>
              <span style={{color:"#e67700"}}>✚ Medical (2)</span>
              <span style={{color:"#999"}}>◆ Weekend / Holiday (7)</span>
            </div>
            <div className="calendar-grid-header">{["MON","TUE","WED","THU","FRI","SAT","SUN"].map(d=><div key={d} className="cal-header-cell">{d}</div>)}</div>
            <div className="calendar-grid">
              {calendarDays.map((d,i)=>(
                <div key={i} className="cal-cell" style={dayStyle(d.status)}>
                  <span className="cal-date">{d.day}{d.month?<small> {d.month}</small>:""}</span>
                  <small className="cal-label">{dayLabel(d.status)}</small>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,color:"#777",marginTop:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
              <span>🔵 Biometric device: East Gate Terminal 03 (Avg sync: 8:14 AM)</span>
              <button className="link-btn" onClick={()=>showToast("Exporting CSV...")}>Export Month CSV</button>
            </div>
          </div>

          {/* Leave Records */}
          <div className="panel">
            <div className="panel-heading compact">
              <div><h2>Leave Request Records</h2><p>Official leaves traceable: student profile for AY 2024–25</p></div>
              <span style={{fontSize:12,color:"#777"}}>Total 2 Filings</span>
            </div>
            {leaveRecords.map((l,i)=>(
              <div className="leave-record" key={i}>
                <div className="leave-record-top">
                  <div className="leave-icon">📋</div>
                  <div className="leave-info">
                    <strong>{l.type}</strong>
                    <small>Ref #{l.ref}</small>
                    <p>{l.dates}</p>
                    <p style={{color:"#777"}}>📎 {l.doc}</p>
                    <p style={{color:"#087f5b",fontSize:12}}>✓ {l.approved}</p>
                  </div>
                  <span className="leave-status approved">{l.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Subject Ratios */}
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading compact"><h2>Subject Ratios</h2><span className="badge-chip red">Min 85% Req.</span></div>
            {subjects.map(s=>(
              <div key={s.name} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}>
                  <span>{s.name} {s.name==="Social Studies"&&<span style={{color:"#d63333",fontSize:11}}>⚠</span>}</span>
                  <strong style={{color:s.score>=90?"var(--green)":s.score>=85?"#e67700":"#d63333"}}>{(s.score*0.95).toFixed(1)}% ({s.score-2}/{s.score})</strong>
                </div>
                <div className="progress"><div style={{width:`${s.score*0.95}%`,background:s.score>=90?"var(--green)":s.score>=85?"#e67700":"#d63333"}}></div></div>
                {s.name==="Social Studies"&&<small style={{color:"#d63333",fontSize:11}}>Approaching 85% threshold. Must record missed class permitted.</small>}
              </div>
            ))}
            <div className="att-eligible-box">✓ Eligible for all Term II final exams and student leadership eligibility based on aggregate standing.</div>
          </div>

          {/* Submit Leave Request */}
          <div className="panel">
            <div className="panel-heading compact">
              <div><h2>Submit Leave Request</h2><p>Fast-track submission to Class Teacher & Headmistress.</p></div>
              <button className="icon-btn green" onClick={()=>showToast("Submitting leave request...")}>▶</button>
            </div>
            <div style={{marginTop:16}}>
              <label className="field-label">Type of Leave</label>
              <div className="leave-type-grid">
                {[["Medical","🏥","3 left"],["Casual","👤","4 left"],["Duty/Sports","⚽","Requires Appl."]].map(([t,icon,sub])=>(
                  <button key={t} className={`leave-type-btn${leaveType===t?" selected":""}`} onClick={()=>setLeaveType(t)}>
                    <span style={{fontSize:20}}>{icon}</span><strong>{t}</strong><small>{sub}</small>
                  </button>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
                <div><label className="field-label">Start Date</label><input className="modal-input" type="date" defaultValue="2025-03-03"/></div>
                <div><label className="field-label">End Date</label><input className="modal-input" type="date" defaultValue="2025-03-04"/></div>
              </div>
              <label className="field-label" style={{marginTop:12}}>Reason for Absence</label>
              <input className="modal-input" placeholder="State specific reason (e.g. orthodontic appointment, family event)..."/>
              <label className="field-label" style={{marginTop:12}}>Supporting Document</label>
              <div className="upload-zone" onClick={()=>showToast("File browser opened!")}>
                <Upload size={18}/> Upload medical slip or note (PDF/JPG, ≤ 5MB)
              </div>
              <label style={{display:"flex",alignItems:"center",gap:8,marginTop:12,fontSize:13}}>
                <input type="checkbox" defaultChecked/> Notify parent/registered mobile via SMS alert
              </label>
              <button className="green-button btn" style={{width:"100%",marginTop:14,justifyContent:"center"}} onClick={()=>showToast("✓ Leave application submitted successfully!")}>▶ Submit Leave Application</button>
            </div>
          </div>

          {/* Attendance Code */}
          <div className="panel" style={{marginTop:18}}>
            <h3 style={{fontSize:13,fontWeight:700,marginBottom:10}}>🏫 GREENWOOD HIGH ATTENDANCE CODE</h3>
            <h4 style={{fontSize:15,marginBottom:12}}>Section 4.2 Mandatory Regulations</h4>
            <ul style={{fontSize:12,color:"#555",lineHeight:1.7,paddingLeft:18}}>
              <li><strong>85% Mandatory Aggregate:</strong> Required across all subjects to obtain admit card for final CBSE examinations.</li>
              <li><strong>Medical Clearance:</strong> Absences longer than 2 consecutive working days require a registered MD doctor's fitness note.</li>
              <li><strong>Late Arrival Rule:</strong> Biometric timestamp post 8:20 AM are tagged as 'late'. 3 lates equates to half-day unexcused cut.</li>
            </ul>
            <button className="link-btn" style={{marginTop:10}} onClick={()=>showToast("Opening Student Affairs Handbook...")}>Student Affairs Handbook 2024–25 &nbsp; View PDF</button>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {certModal && (
        <Modal title="Request Attendance Certificate" onClose={() => setCertModal(false)}>
          <p className="modal-desc">An official attendance certificate will be generated and digitally signed by the Registrar's office within 24 hours.</p>
          <label>Purpose</label>
          <select className="modal-input">
            <option>Scholarship Application</option>
            <option>University Application</option>
            <option>Travel Visa</option>
            <option>Other</option>
          </select>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setCertModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setCertModal(false); showToast("✓ Certificate request submitted! Ready in 24hrs."); }}>Request Certificate</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
