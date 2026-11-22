import React, { useState } from "react";
import { syllabusUnits, subjects } from "../data.js";

export default function Syllabus({ showToast }) {
  const [activeSubject, setActiveSubject] = useState("Mathematics");
  const subjectList = ["Mathematics","Physics","Chemistry","Computer Science"];
  const currentSubject = subjects.find(s=>s.name===activeSubject||s.name.includes(activeSubject)) || subjects[1];

  return (
    <div className="page-container">
      <div className="breadcrumb">● ACADEMIC YEAR 2024–25 • TERM II</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Syllabus & Curriculum Completion</h1>
          <p className="page-subtitle">Real-time tracking of CBSE Grade 10 syllabus, completed chapters, ongoing lectures, and board exam blueprint coverage.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <select className="hw-select" value={`Term II (Current: Nov – Mar)`} onChange={()=>{}}>
            <option>Term II (Current: Nov – Mar)</option>
            <option>Term I (Jun – Oct)</option>
          </select>
          <button className="green-button btn" onClick={()=>showToast("Downloading Curriculum PDF...")}>⬇ Download Full Curriculum PDF</button>
        </div>
      </div>

      {/* Stats */}
      <div className="syl-stats-grid">
        <div className="syl-stat green"><div className="syl-stat-icon">✓</div><div><strong>42</strong><small>/ 54 Units</small></div><span>COMPLETED UNITS</span><small>77.8% On-Track</small><div className="progress" style={{marginTop:8}}><div style={{width:"77%"}}></div></div></div>
        <div className="syl-stat"><div className="syl-stat-icon">📋</div><div><strong>8</strong></div><span>UPCOMING UNIT TESTS</span><small>Week 26 assessments scheduled</small></div>
        <div className="syl-stat"><div className="syl-stat-icon">🧪</div><div><strong>14</strong><small>/ 16</small></div><span>PRACTICAL & LABS</span><small>87.5% Verified & Signed</small></div>
        <div className="syl-stat blue"><div className="syl-stat-icon">📊</div><div><strong>88</strong><small>/ 100</small></div><span>BOARD READINESS</span><small>High Readiness Index</small></div>
      </div>

      {/* Subject Filter */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
        {["All Subjects (4)",...subjectList].map(s=>(
          <button key={s} className={`filter-chip${activeSubject===s||(!subjectList.includes(activeSubject)&&s==="All Subjects (4)")?" active":""}`} onClick={()=>setActiveSubject(s==="All Subjects (4)"?"Mathematics":s)}>{s}</button>
        ))}
      </div>

      <div className="syl-layout">
        {/* Left */}
        <div>
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading compact">
              <div>
                <h2>Mathematics <span style={{fontSize:13,color:"#777",fontWeight:400}}>H11H-041</span></h2>
                <p>Faculty Lead: <strong>Mrs. Savita Roy</strong> • Lecture/Week</p>
              </div>
              <div style={{textAlign:"right"}}>
                <strong style={{color:"var(--green)"}}>5 of 6 Units</strong>
                <div style={{fontSize:11,color:"#777"}}>Term Target: 100%</div>
              </div>
            </div>
            <div style={{marginTop:16}}>
              <strong style={{fontSize:12,color:"#777"}}>UNIT MODULES & SUB-TOPIC MASTERY</strong>
              <div style={{fontSize:11,color:"#777",float:"right"}}>Updated Yesterday by Instructor</div>
            </div>
            <div style={{marginTop:12}}>
              {syllabusUnits.map((u,i)=>(
                <div key={i} className="syl-unit-card">
                  <div className="syl-unit-header">
                    <span className={`syl-status-icon ${u.status==="Completed"?"green":u.status==="In Progress"?"blue":"grey"}`}>
                      {u.status==="Completed"?"✓":u.status==="In Progress"?"◉":"○"}
                    </span>
                    <div style={{flex:1}}>
                      <strong style={{fontSize:13}}>{u.unit}</strong>
                      <span className={`syl-status-badge ${u.status==="Completed"?"green":u.status==="In Progress"?"blue":"grey"}`}>{u.status}</span>
                    </div>
                    <div style={{textAlign:"right",fontSize:12,color:"#087f5b",fontWeight:600}}>{u.score}</div>
                  </div>
                  <div className="syl-unit-body">
                    <p style={{fontSize:12,color:"#555",lineHeight:1.5,marginBottom:8}}>{u.desc}</p>
                    {u.status==="Completed" && (
                      <div style={{fontSize:11,color:"#777"}}>Class Attendance: 100% (8/8) &nbsp;
                        <span onClick={()=>showToast("Opening assessment files...")} className="link" style={{cursor:"pointer"}}>📎</span>
                      </div>
                    )}
                    {u.status==="In Progress" && (
                      <div style={{display:"flex",gap:10,marginTop:6}}>
                        <button className="hw-clarify-btn" style={{fontSize:11}} onClick={()=>showToast("Joining live lecture notes...")}>📝 Join Live Lecture Notes</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Subject Matrix */}
          <div className="panel">
            <h2 style={{fontSize:15,marginBottom:14}}>Cross-Subject Progress Matrix</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {[{sub:"Physics",code:"SCI-086",done:80,active:"Electricity & 4/9 Units",teacher:"Dr. A. Evans"},{sub:"Chemistry",code:"SCI-087",done:75,active:"Carbon & Org. Compounds 3/4",teacher:"Mr. Patel, Sh."},{sub:"Computer Science",code:"CS-166",done:92,active:"Cyber Ethics 4/5 & Python D8",teacher:"Active: K. Sharma"},].map(s=>(
                <div key={s.sub} style={{background:"#f8f8ff",borderRadius:10,padding:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontSize:12,color:"#777"}}>{s.code}</span>
                    <strong style={{color:"var(--green)"}}>{s.done}% Done</strong>
                  </div>
                  <strong style={{fontSize:13}}>{s.sub}</strong>
                  <p style={{fontSize:11,color:"#777",marginTop:3}}>{s.teacher}</p>
                  <div className="progress" style={{marginTop:8}}><div style={{width:`${s.done}%`}}></div></div>
                  <p style={{fontSize:10,color:"#555",marginTop:4}}>Active: {s.active}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-heading compact">
              <div><h2>Exam Blueprint</h2><p>Term B Weightage</p></div>
              <span style={{fontSize:11,color:"#777"}}>Official marks allocation for Final Board Preparatory Exams.</span>
            </div>
            <table className="report-table" style={{marginTop:12}}>
              <thead><tr><th>Subject / Unit</th><th>Weight</th><th>Status</th></tr></thead>
              <tbody>
                {[["Calculus & Limits","25%","green"],["Algebra & Polynomials","20%","green"],["Vectors & 3D Space","15%","green"],["Trigonometric Apps","15%","green"],["Electricity (Physics)","15%","orange"],["Internal & Lab Viva","10%","grey"]].map(([s,w,c])=>(
                  <tr key={s}><td>{s}</td><td><strong>{w}</strong></td><td><span style={{color:c==="green"?"#087f5b":c==="orange"?"#e67700":"#999",fontSize:18}}>●</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:12}}>💬 Faculty Clarifications</h3>
            {[{initials:"DE",name:"Dr. A. Evans (Physics Lead)",color:"#087f5b",note:"Notice: Topics covering Electric Motors & Electromagnetic Induction Dynamo have been officially excluded from Section C of the third exam paper and are based solely on Fleming's left-hand rule and magnetic field lines."},
              {initials:"SR",name:"Mrs. Savita Roy (Mathematics)",color:"#1971c2",note:"Optional Exercise 4.4 in Coordinate Geometry is recommended for concept clarity but will not carry direct weightage in the March pre-boards."}
            ].map(f=>(
              <div key={f.name} style={{marginBottom:12,padding:"10px 0",borderBottom:"1px solid #eee"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div style={{background:f.color,color:"#fff",borderRadius:"50%",width:28,height:28,display:"grid",placeItems:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{f.initials}</div>
                  <strong style={{fontSize:12}}>{f.name}</strong>
                </div>
                <p style={{fontSize:12,color:"#555",lineHeight:1.5,fontStyle:"italic"}}>"{f.note}"</p>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3 style={{fontSize:13,marginBottom:12}}>📅 Revision Milestones <span style={{color:"#777",fontWeight:400,fontSize:11}}>AY 2025</span></h3>
            {[{date:"Feb 28, 2025",title:"100% STEM Theory Concluded",text:"Final integrated notes handed across Math and Physics wrap up.",dot:"green"},
              {date:"Target Date: March 15, 2025",title:"Curriculum Completion Sign-off",text:"Final mock test series and master revision booklet distribution.",dot:"orange"},
              {date:"March 22, 2025",title:"CBSE Board Exam Commencement",text:"Hall tickets and examination center advisory release.",dot:"blue"},
            ].map((m,i)=>(
              <div key={i} style={{display:"flex",gap:12,marginBottom:12}}>
                <div style={{width:12,height:12,borderRadius:"50%",background:m.dot==="green"?"var(--green)":m.dot==="orange"?"#e67700":"#1971c2",flexShrink:0,marginTop:4}}></div>
                <div><strong style={{fontSize:12}}>{m.date}</strong><br/><span style={{fontSize:12,fontWeight:600,color:"#333"}}>{m.title}</span><p style={{fontSize:11,color:"#777",marginTop:2}}>{m.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
