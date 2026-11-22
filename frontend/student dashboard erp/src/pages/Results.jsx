import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { subjects } from "../data.js";

export default function Results({ showToast }) {
  const [activeTab, setActiveTab] = useState("Term II Mid-S (Published)");
  const tabs = ["Term I Final","Term II Mid-S (Published)","Pre-Boards ⓘ"];

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/results" title="Results from database" fields={[{ key: "subject.name", label: "Subject" }, { key: "examType", label: "Exam" }, { key: "theoryMarks", label: "Theory" }, { key: "internalMarks", label: "Internal" }, { key: "totalMarks", label: "Total" }, { key: "grade", label: "Grade" }, { key: "term", label: "Term" }]} />
      <div className="breadcrumb">Assessments & Records &nbsp;•&nbsp; Official Report Cards</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:16}}>
        <div>
          <h1 className="page-title">Results & Official Report Cards</h1>
          <p className="page-subtitle">AY 2024–25 • Grade 10-B</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Sharing with Guardian...")}>↗ Share Guardian</button>
          <button className="outline-btn btn" onClick={()=>showToast("Printing...")}>🖨 Print</button>
          <button className="green-button btn" onClick={()=>showToast("Downloading signed PDF...")}>⬇ Download Signed PDF</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="hw-tabs">
        {tabs.map(t=><button key={t} className={`hw-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>)}
      </div>

      {/* Evaluation Type + Stats */}
      <div className="results-top-grid">
        <div className="results-eval-card" style={{background:"linear-gradient(135deg,#087f5b,#056548)",color:"#fff",border:"none"}}>
          <div className="results-eval-label" style={{color:"#9de8cf"}}>TERM II-A PORTFOLIO</div>
          <div className="results-eval-score" style={{color:"#fff"}}>91.5%<small style={{fontSize:16,fontWeight:400,color:"#9de8cf"}}> 549 / 600</small></div>
          <div className="results-eval-sub" style={{color:"#9de8cf"}}>Distinction Honors: Academy</div>
          <div style={{fontSize:11,fontWeight:700,color:"#caffdf",marginTop:4}}>↗ +6% Vs. Term I (↑36 pts)</div>
        </div>
        <div className="results-eval-card">
          <div className="results-eval-label">COHORT STANDING</div>
          <div className="results-eval-score rank">3<small style={{fontSize:14,fontWeight:400}}> Rank in Grade 10 (42 students)</small></div>
          <div className="results-eval-sub">Percentile: 96.5th to Class</div>
          <div className="results-eval-delta green">● Top 5% Cohort Scholar</div>
        </div>
        <div className="results-eval-card">
          <div className="results-eval-label">CUMULATIVE GRADE</div>
          <div className="results-eval-score">A1<small style={{fontSize:14,fontWeight:400}}> 3.9 / 4.0</small></div>
          <div className="results-eval-sub">CBSE 10-Point Grading</div>
          <div style={{fontSize:11,color:"#777"}}>4+ Subjects at 88%</div>
        </div>
        <div className="results-eval-card">
          <div className="results-eval-label">SESSION ATTENDANCE</div>
          <div className="results-eval-score">96.4%<small style={{fontSize:14,fontWeight:400}}> Wk / Days</small></div>
          <div className="results-eval-sub">Leave Approved • 1 medical</div>
          <div className="results-eval-delta green">✓ Eligible for Full Honours</div>
        </div>
      </div>

      <div className="results-layout">
        {/* Left */}
        <div>
          {/* Academic Assessment Matrix */}
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading">
              <div><h2>Academic Assessment Matrix</h2><p>Standardized examination scores, practical/internal assessments, class comparisons and teacher comments</p></div>
              <div style={{fontSize:11,color:"#777"}}>Exam: Theory (80) • Internal (20) → 100 →</div>
            </div>
            <div className="results-table-wrap">
              <table className="report-table" style={{marginTop:16}}>
                <thead>
                  <tr><th>SUBJECT & CODE</th><th>THEORY (80)</th><th>INTERNAL (20)</th><th>TOTAL (100)</th><th>GRADE</th><th>CLASS HIGHEST</th><th>CLASS AVG</th><th>FACULTY REMARK</th></tr>
                </thead>
                <tbody>
                  {subjects.map(s=>(
                    <tr key={s.name}>
                      <td>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{background:s.color,width:28,height:28,borderRadius:"50%",display:"grid",placeItems:"center",color:"#fff",fontSize:9,fontWeight:700,flexShrink:0}}>{s.short}</span>
                          <div><strong style={{fontSize:12}}>{s.name}</strong><br/><small style={{color:"#777"}}>{s.teacher}</small></div>
                        </div>
                      </td>
                      <td><strong>{s.theory}</strong></td>
                      <td><strong>{s.internal}</strong></td>
                      <td><strong style={{fontSize:16}}>{s.score}</strong></td>
                      <td><span className="grade-chip" style={{background:"#dff9ef",color:"#087f5b"}}>{s.score>=90?"A1":s.score>=80?"A2":"B1"}</span></td>
                      <td>{s.classAvg+8}</td>
                      <td>{s.classAvg}</td>
                      <td style={{fontSize:11,color:"#555",maxWidth:160}}>{s.name==="Computer Science"?"Exceptional programming logic & OOP correlates.":s.name==="Mathematics"?"High aptitude in vectors, geometry and calculus.":s.name==="Physics & Chemistry"?"Consistent analytical problem solving in thermodynamics.":"Good standing overall."}</td>
                    </tr>
                  ))}
                  <tr style={{background:"#f8f8f8",fontWeight:700}}>
                    <td><strong>Aggregate Summary</strong></td>
                    <td><strong>439 / 480</strong></td>
                    <td><strong>110 / 120</strong></td>
                    <td><strong style={{fontSize:16}}>549 / 600</strong></td>
                    <td><span className="grade-chip">A1</span></td>
                    <td>594</td>
                    <td>468.3</td>
                    <td>Overall Distinction: 91.50%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Subject Mastery */}
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading"><h2>Subject Mastery vs. Class Benchmark</h2></div>
            <p style={{fontSize:12,color:"#777",marginBottom:14}}>Bi-level comparison of Aarav's aggregate score versus class register. Grade 10-B.</p>
            {subjects.map(s=>(
              <div key={s.name} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span>{s.name}</span>
                  <span style={{color:"#087f5b"}}>{s.score}% <span style={{color:"#aaa",fontSize:11}}>(Class: {s.classAvg}%)</span></span>
                </div>
                <div style={{position:"relative",height:12,background:"#eee",borderRadius:6}}>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${s.classAvg}%`,background:"#cce8d8",borderRadius:6}}></div>
                  <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${s.score}%`,background:"var(--green)",borderRadius:6,opacity:0.85}}></div>
                </div>
              </div>
            ))}
          </div>

          {/* House Portfolio */}
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading compact">
              <div><h2>House & Co-Curricular Portfolio</h2></div>
              <span className="badge-chip green">Grade-Record</span>
            </div>
            <div style={{marginTop:14,display:"flex",gap:16,flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontSize:12,color:"#777"}}>House Profile</div>
                <strong style={{fontSize:15}}>Vice Captain</strong>
                <p style={{fontSize:12,color:"#555",marginTop:4}}>Discipline Index: <span className="grade-chip">Exemplar</span></p>
                <p style={{fontSize:12,color:"#555",marginTop:4}}>Last House STEM deliver showcase</p>
                <div style={{marginTop:10}}>
                  <div style={{fontSize:11,marginBottom:4}}>🏅 IS Mefit Tokens</div>
                  <div style={{fontSize:11,color:"#087f5b"}}>+15 Merit Tokens (5 in Innovation, 4 in Vero ↑)</div>
                </div>
              </div>
              <div style={{flex:1,minWidth:160}}>
                <div style={{fontSize:12,color:"#777",marginBottom:8}}>VERIFIED CLUBS & ACTIVITIES</div>
                {["Algorithmic Coding Club (Lead)","Senior Cricket XI (Opening Batter)","Model UN Consortium (Governor-lead)"].map(a=>(
                  <div key={a} style={{background:"#f3f3ff",borderRadius:8,padding:"6px 10px",fontSize:12,marginBottom:6}}>✓ {a}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Faculty Sign-Off */}
          <div className="panel">
            <div className="panel-heading compact">
              <div><h2>Faculty Sign-Off & Certification</h2></div>
              <span className="badge-chip">Institutional Tamper Proof</span>
            </div>
            <div style={{marginTop:14}}>
              <div style={{fontSize:12,color:"#777",fontWeight:600,marginBottom:8}}>CLASS TEACHER'S ASSESSMENT</div>
              <p style={{fontSize:13,color:"#444",lineHeight:1.7}}>
                "Aarav demonstrates significantly high intellectual rigor, particularly in quantitative problem-solving and computer science. His active contributions after each Vice Captaincy award and exemplary classroom decorum earn a good standing for Grade 13."
              </p>
              <div style={{fontSize:12,color:"#777",marginTop:6}}>— Ms. Savita Roy, B.Sc, B.Ed. Homeroom 10-B</div>
              <div style={{display:"flex",gap:16,marginTop:16,flexWrap:"wrap"}}>
                <div style={{textAlign:"center",flex:1}}>
                  <div style={{borderBottom:"1px solid #ccc",paddingBottom:4,marginBottom:4}}><em style={{fontSize:20,fontFamily:"cursive",color:"#333"}}>S. Roy</em></div>
                  <small>Ms. Savita Roy<br/>Class Teacher</small>
                </div>
                <div style={{textAlign:"center",flex:1}}>
                  <div style={{borderBottom:"1px solid #ccc",paddingBottom:4,marginBottom:4}}><em style={{fontSize:20,fontFamily:"cursive",color:"#333"}}>A. Mukherjee</em></div>
                  <small>Dr. Alok Nath Mukherjee<br/>Principal & Director of Academics</small>
                </div>
              </div>
              <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap",fontSize:12,color:"#777"}}>
                <span>Digital Verification Hook: #R4 – 2025</span>
                <span>Validate Digital Certificate ↗</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Academic Growth */}
        <div>
          <div className="panel" style={{marginBottom:18}}>
            <div className="panel-heading compact"><h2>Academic Growth →</h2></div>
            <p style={{fontSize:12,color:"#777",marginTop:4,marginBottom:16}}>Term-over-term Aarav progressively excelled toward the top percentile cohort.</p>
            <div style={{fontSize:12,marginBottom:8,color:"#087f5b"}}>Academic Performance: ↑ 2.6% Overall</div>
            <div style={{height:80,background:"linear-gradient(to right, #dff9ef, #087f5b22)",borderRadius:8,display:"flex",alignItems:"flex-end",padding:"0 12px 8px",gap:8}}>
              {[["Unit I","88.0%"],["Term Rpt","89.4%"],["Mid-Board","91.5%"]].map(([l,v])=>(
                <div key={l} style={{textAlign:"center",flex:1}}>
                  <strong style={{fontSize:13,color:"var(--green)"}}>{v}</strong>
                  <div style={{fontSize:10,color:"#777"}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,color:"#087f5b",marginTop:10}}>Projected: 92–95% Pre-Board Range</div>
          </div>

          <div className="panel">
            <h3 style={{fontSize:14,marginBottom:10}}>📌 Target & Objective</h3>
            <p style={{fontSize:13,color:"#555"}}>Projected: 92–95% Pre-Board Range</p>
            <button className="green-button btn" style={{marginTop:14,width:"100%",justifyContent:"center"}} onClick={()=>showToast("✓ Guardian acknowledgement sent!")}>Sign Electronic Acknowledgement</button>
            <p style={{fontSize:11,color:"#777",marginTop:8,textAlign:"center"}}>Guardian Acknowledgement Pending — Complete legal digital review acknowledgement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
