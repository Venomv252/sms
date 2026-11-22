import React, { useState } from "react";
import { examSchedule } from "../data.js";

export default function ExamSchedule({ showToast }) {
  const [activeTab, setActiveTab] = useState("8 Assessment Papers");
  const tabs = ["8 Assessment Papers","Morning Shift"];

  return (
    <div className="page-container">
      <div className="breadcrumb">GREENWOOD EXAMINATION DIRECTORATE • TERM II 2024–25</div>
      <div className="page-header-row" style={{alignItems:"flex-start",flexWrap:"wrap",gap:16}}>
        <div>
          <h1 className="page-title">Exam Schedule & Datesheet</h1>
          <p className="page-subtitle">Term II Final Board Preparatory & Mid-Term Assessments for Secondary Section (Grade 10-B). Verified seat allotment and proctor schedule.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Opening Syllabus Blueprint...")}>📋 Syllabus Blueprint</button>
          <button className="outline-btn btn" onClick={()=>showToast("Opening Exam Seating Plan...")}>🪑 Exam Seating Plan</button>
          <button className="green-button btn" onClick={()=>showToast("Downloading Hall Ticket PDF...")}>⬇ Download Official Hall Ticket (PDF)</button>
        </div>
      </div>

      <div className="exam-layout">
        {/* Left */}
        <div className="exam-left">
          {/* Upcoming card */}
          <div className="exam-next-card">
            <div className="exam-next-label">NEXT UPCOMING EXAMINATION</div>
            <div className="exam-countdown">● Starts in 5 Days 18 Hours</div>
            <div style={{fontSize:12,opacity:.7,marginBottom:6}}>SUBJECT CODE: PHY-102 • PAPER I</div>
            <h2 className="exam-next-title">Physics Theory & Numerical Analysis</h2>
            <div className="exam-next-meta">
              <div className="exam-meta-box"><small>Date & Day</small><strong>Tue, 25 Feb</strong></div>
              <div className="exam-meta-box"><small>Time Allotment</small><strong>09:00 – 12:00</strong></div>
              <div className="exam-meta-box"><small>Allocated Room</small><strong>Hall 3 (Desk #24)</strong></div>
              <div className="exam-meta-box"><small>Chief Proctor</small><strong>Prof. K...</strong></div>
            </div>
            <div className="exam-prep-box">
              <div className="exam-prep-title">PREPARATION & MATERIALS</div>
              <button className="exam-prep-btn" onClick={()=>showToast("Opening Formula Sheet...")}>📄 Formula Sheet & Laws ↗</button>
              <button className="exam-prep-btn" onClick={()=>showToast("Opening Chapter Weightage...")}>📊 Chapter Weightage (Units 1–6) ›</button>
              <div style={{fontSize:12,marginTop:10,opacity:.8}}>Reporting Cutoff: &nbsp;<strong>08:30 AM Sharp</strong></div>
            </div>
          </div>

          {/* Standard Datesheet */}
          <div className="panel" style={{marginTop:18}}>
            <div className="panel-heading compact">
              <div><h2>Standard Datesheet</h2><p>Class X Board Preparatory Term II Examination Routine</p></div>
              <div style={{display:"flex",gap:6}}>
                {tabs.map(t=><button key={t} className={`hw-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)} style={{padding:"6px 12px"}}>{t}</button>)}
              </div>
            </div>
            <div className="exam-table" style={{marginTop:14}}>
              {examSchedule.map((ex,i)=>(
                <div key={i} className={`exam-row${i===0?" exam-row-upcoming":""}`}>
                  <div className="exam-date-col">
                    <span className="exam-month">{ex.date.split(" ")[0]}</span>
                    <strong className="exam-day-num">{ex.date.split(" ")[1]}</strong>
                  </div>
                  <div className="exam-detail-col">
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                      <span className="exam-code-tag-sm">{ex.code}</span>
                      {i===0&&<span className="upcoming-tag">Upcoming</span>}
                    </div>
                    <strong style={{fontSize:14}}>{ex.subject}</strong>
                    <p style={{fontSize:11,color:"#777",marginTop:3}}>Syllabus: {ex.syllabus}</p>
                  </div>
                  <div className="exam-time-col">
                    <strong style={{fontSize:12}}>{ex.time}</strong>
                    <p style={{fontSize:11,color:"#777",marginTop:3}}>{ex.room} • Desk #{ex.desk}</p>
                    <span style={{fontSize:11,color:"#087f5b",marginTop:4,display:"block"}}>● Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall Instructions */}
          <div className="panel" style={{marginTop:18}}>
            <div className="panel-heading compact"><h2>🔔 Examination Hall Instructions & Code of Conduct</h2></div>
            <div className="exam-rules-grid">
              {[
                {icon:"⏰",title:"Reporting & Bell Schedule",text:"Arrival mandatory by 08:30 AM. Reading time starts at 08:45 AM. Entry strictly prohibited after 08:55 AM under any circumstance."},
                {icon:"🪪",title:"Mandatory Identification",text:"Full institutional formal uniform and physical printed Hall Ticket signed by parents are required for verification at checkpoints.",red:false},
                {icon:"✏️",title:"Permitted Stationery",text:"Transparent pouch only: Blue/Black ball pens, HB pencils, eraser, geometric instruments. Non-programmable calculators only for CS paper."},
                {icon:"🚫",title:"Prohibited Electronic Items",text:"Smartwatches, mobile phones, Bluetooth earwear, and digital fitness bands are strictly banned. Confiscation will lead to immediate debarment.",red:true},
              ].map(r=>(
                <div key={r.title} className={`exam-rule-card${r.red?" exam-rule-red":""}`}>
                  <span style={{fontSize:22}}>{r.icon}</span>
                  <strong>{r.title}</strong>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Hall Ticket */}
        <div className="exam-right">
          <div className="hall-ticket">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span className="official-tag">OFFICIAL HALL TICKET</span>
              <span className="verified-tag">✓ VERIFIED #2025</span>
            </div>
            <div className="hall-ticket-avatar">AS</div>
            <h3 style={{marginTop:8,fontSize:16}}>Aarav Sharma</h3>
            <p style={{fontSize:12,color:"#777"}}>Grade 10 • Section B</p>
            <p style={{fontSize:12,color:"#777"}}>Roll No. 24</p>
            <p style={{fontSize:12,color:"#777",marginTop:4}}>Candidate ID: GW-2024-10B-024</p>
            <div className="hall-ticket-divider"/>
            <div className="hall-ticket-row"><span>Institution</span><strong>Greenwood High International</strong></div>
            <div className="hall-ticket-row"><span>Center Code</span><strong>GW-CTR-041</strong></div>
            <div className="hall-ticket-row"><span>Primary Desk</span><strong>Hall 3 • Desk 24</strong></div>
            <div className="hall-ticket-row"><span>Affiliation Board</span><strong>Central CBSE / Matric</strong></div>
            <div style={{textAlign:"center",margin:"14px 0 8px"}}>
              <div className="qr-placeholder">
                <div className="qr-inner">QR</div>
              </div>
              <p style={{fontSize:10,color:"#777",marginTop:6}}>HASH: 9ABF-0B10-B24C-2625</p>
              <p style={{fontSize:10,color:"#777"}}>Scan entrance scanner for instant bio-kiosk entry pass.</p>
            </div>
            <div className="hall-ticket-footer">
              <div><small>Dr. M. Vanderveer</small><small>PRINCIPAL & PATRON</small></div>
              <div><small>Rajeshwar Sen</small><small>CONTROLLER OF EXAMS</small></div>
            </div>
            <button className="green-button btn" style={{width:"100%",marginTop:12,justifyContent:"center"}} onClick={()=>showToast("Printing Hall Ticket...")}>🖨 Print Physical Card</button>
          </div>

          <div className="panel" style={{marginTop:18}}>
            <h3 style={{fontSize:14,marginBottom:12}}>💬 Clash or Queries?</h3>
            <p style={{fontSize:13,color:"#777"}}>Report hall conflicts or medical accommodations to Controller Office.</p>
            <button className="link-btn" style={{marginTop:8}} onClick={()=>showToast("Opening Contact Exam Cell...")}>Contact Exam Cell »</button>
          </div>
        </div>
      </div>
    </div>
  );
}
