import React, { useState } from "react";
import { subjects } from "../data.js";

export default function Performance({ showToast }) {
  const [tab, setTab] = useState("Term II Mid-Term");
  const tabs = ["Term II Mid-Term","Visual Breakdown","Detailed Table","Progress Trend"];

  return (
    <div className="page-container">
      <div className="breadcrumb">Assessments &amp; Records &nbsp;•&nbsp; Performance Analytics</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Academic Performance Analytics</h1>
          <p className="page-subtitle">Comprehensive subject-wise breakdown, class comparison, and growth trend analysis for Term II 2024–25.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Downloading analytics report...")}>⬇ Export Report</button>
          <button className="green-button btn" onClick={()=>showToast("Sharing with guardian...")}>↗ Share with Guardian</button>
        </div>
      </div>

      {/* Top stats */}
      <div className="desktop-summary-grid" style={{marginBottom:20}}>
        <div className="summary-card"><div className="summary-heading"><span>AGGREGATE SCORE</span></div><strong className="green-number">91.5%</strong><p>(549 / 600 pts)</p><div className="grade-pill">Grade A1 • Distinction</div></div>
        <div className="summary-card"><div className="summary-heading"><span>CLASS STANDING</span></div><strong>Rank 3</strong><p>of 42 students</p><div className="summary-footer">94th Percentile &nbsp;<span>Top 5%</span></div></div>
        <div className="summary-card"><div className="summary-heading"><span>HIGHEST SCORE</span></div><strong className="green-number">98%</strong><p>Computer Science</p><div className="summary-footer">Class High: 96 &nbsp;<span>+2 above</span></div></div>
        <div className="summary-card"><div className="summary-heading"><span>vs CLASS AVERAGE</span></div><strong className="green-number">+13.1%</strong><p>Class Avg: 78.4%</p><div className="summary-footer">Above average in all subjects</div></div>
      </div>

      {/* Tab toggle */}
      <div className="view-toggle" style={{marginBottom:20,width:"fit-content"}}>
        {tabs.map(t=><button key={t} className={tab===t?"active":""} onClick={()=>setTab(t)}>{t}</button>)}
      </div>

      {tab==="Term II Mid-Term" && (
        <div className="performance-body" style={{display:"grid",gridTemplateColumns:"38% 62%",gap:20,alignItems:"start"}}>
          <div className="panel">
            <div className="donut" style={{width:200,height:200,margin:"0 auto",background:"conic-gradient(#087f5b 0 32%,#48d3aa 32% 55%,#495057 55% 70%,#b9c1be 70% 84%,#75e3bd 84% 92%,#d3eee5 92% 100%)"}}><div style={{width:140,height:140}}><strong style={{fontSize:28}}>91.5%</strong><span style={{fontSize:12}}>OVERALL</span></div></div>
            <div className="legend" style={{marginTop:16}}>
              {subjects.map(s=><span key={s.name}><i style={{background:s.color}}></i>{s.name.replace("Physics & Chemistry","Science").replace("English Literature","English")} ({s.score}%)</span>)}
            </div>
          </div>
          <div className="panel">
            {subjects.map(s=>(
              <div className="subject-row" key={s.name}>
                <div className="subject-top">
                  <div className="subject-name"><span style={{background:s.color}}>{s.short}</span><div><strong>{s.name}</strong><small>{s.teacher}</small></div></div>
                  <div className="subject-score"><strong>{s.score}</strong>/100<span>{s.score>=90?"A1":s.score>=80?"A2":"B1"}</span></div>
                </div>
                <div className="class-average"><span>Class Average: {s.classAvg}%</span><span>Syllabus: {s.syllabus}%</span></div>
                <div className="progress"><div style={{width:`${s.syllabus}%`}}></div></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="Visual Breakdown" && (
        <div className="panel">
          <h2 style={{marginBottom:20,fontSize:16}}>Score vs Class Average — Visual Breakdown</h2>
          {subjects.map(s=>(
            <div key={s.name} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:13}}>
                <span>{s.name}</span>
                <span><strong style={{color:"var(--green)"}}>{s.score}%</strong> &nbsp;<span style={{color:"#aaa"}}>Class: {s.classAvg}%</span></span>
              </div>
              <div style={{position:"relative",height:14,background:"#eee",borderRadius:8}}>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${s.classAvg}%`,background:"#cce8d8",borderRadius:8}}></div>
                <div style={{position:"absolute",left:0,top:0,height:"100%",width:`${s.score}%`,background:s.color,borderRadius:8,opacity:0.85}}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="Detailed Table" && (
        <div className="panel">
          <table className="report-table">
            <thead><tr><th>Subject</th><th>Teacher</th><th>Theory (80)</th><th>Internal (20)</th><th>Total (100)</th><th>Syllabus</th><th>Grade</th><th>vs Class Avg</th></tr></thead>
            <tbody>
              {subjects.map(s=>(
                <tr key={s.name}>
                  <td><span style={{background:s.color,width:10,height:10,borderRadius:"50%",display:"inline-block",marginRight:7}}></span><strong>{s.name}</strong></td>
                  <td>{s.teacher}</td>
                  <td>{s.theory}</td>
                  <td>{s.internal}</td>
                  <td><strong style={{fontSize:16}}>{s.score}</strong></td>
                  <td>{s.syllabus}%</td>
                  <td><span className="grade-chip">{s.score>=90?"A1":s.score>=80?"A2":"B1"}</span></td>
                  <td style={{color:s.score>s.classAvg?"var(--green)":"#d63333"}}>+{(s.score-s.classAvg).toFixed(1)}%</td>
                </tr>
              ))}
              <tr style={{background:"#f8f8f8",fontWeight:700}}>
                <td colSpan={4}><strong>Aggregate</strong></td>
                <td><strong>549 / 600</strong></td>
                <td>88.5%</td>
                <td><span className="grade-chip">A1</span></td>
                <td style={{color:"var(--green)"}}>+13.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {tab==="Progress Trend" && (
        <div className="panel">
          <h2 style={{marginBottom:16,fontSize:16}}>Term-over-Term Progress</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:20}}>
            {[["Term I","86.3%","#adb5bd"],["Mid-Term II","89.4%","#20a77a"],["Final Mid-Board","91.5%","var(--green)"]].map(([t,v,c])=>(
              <div key={t} style={{textAlign:"center",background:"#f8f8ff",borderRadius:12,padding:"16px 10px"}}>
                <div style={{fontSize:26,fontWeight:800,color:c}}>{v}</div>
                <div style={{fontSize:13,color:"#777",marginTop:4}}>{t}</div>
              </div>
            ))}
          </div>
          {subjects.map(s=>(
            <div key={s.name} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                <span>{s.name}</span><strong style={{color:"var(--green)"}}>{s.score}%</strong>
              </div>
              <div className="progress" style={{height:8}}><div style={{width:`${s.score}%`,background:s.color}}></div></div>
            </div>
          ))}
          <button className="green-button btn" style={{marginTop:16}} onClick={()=>showToast("Downloading progress report...")}>⬇ Download Progress Report</button>
        </div>
      )}
    </div>
  );
}
