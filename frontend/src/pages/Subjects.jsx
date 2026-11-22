import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { useNavigate } from "react-router-dom";
import { subjects } from "../data.js";

export default function Subjects({ showToast }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/schedules" title="Enrolled subjects from database" fields={[{ key: "class.subject.name", label: "Subject" }, { key: "class.subject.code", label: "Code" }, { key: "class.teacher.user.firstName", label: "Teacher" }, { key: "class.grade", label: "Grade" }, { key: "class.section", label: "Section" }]} />
      <div className="breadcrumb">Academics &nbsp;›&nbsp; Subjects</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">My Subjects</h1>
          <p className="page-subtitle">All enrolled subjects for Grade 10-B • CBSE Board • Term II (2024–25)</p>
        </div>
        <button className="green-button btn" onClick={()=>showToast("Downloading subject guide...")}>⬇ Download Subject Guide</button>
      </div>
      <div className="subjects-grid">
        {subjects.map(s=>(
          <div className="subject-card" key={s.name} onClick={()=>setSelected(s)} style={{cursor:"pointer",borderTop:`4px solid ${s.color}`}}>
            <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
              <div style={{background:s.color,width:42,height:42,borderRadius:"50%",display:"grid",placeItems:"center",color:"#fff",fontSize:14,fontWeight:800}}>{s.short}</div>
              <div><h3 style={{fontSize:15}}>{s.name}</h3><p style={{fontSize:12,color:"#777"}}>{s.teacher}</p></div>
            </div>
            <div className="progress" style={{marginBottom:8}}><div style={{width:`${s.syllabus}%`,background:s.color}}></div></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#777"}}>
              <span>Syllabus: {s.syllabus}%</span><span style={{color:s.color,fontWeight:700}}>{s.score}% &nbsp; <span className="grade-chip" style={{fontSize:10}}>{s.score>=90?"A1":"A2"}</span></span>
            </div>
            <div style={{marginTop:8,display:"flex",gap:8}}>
              <button className="hw-clarify-btn" style={{flex:1,fontSize:11}} onClick={e=>{e.stopPropagation();navigate("/notes");}}>📚 Notes</button>
              <button className="hw-clarify-btn" style={{flex:1,fontSize:11}} onClick={e=>{e.stopPropagation();navigate("/homework");}}>📋 Homework</button>
            </div>
          </div>
        ))}
      </div>
      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header"><h2>{selected.name}</h2><button className="modal-close" onClick={()=>setSelected(null)}>✕</button></div>
            <div className="modal-body">
              <p><strong>Teacher:</strong> {selected.teacher}</p>
              <p style={{marginTop:8}}><strong>Score:</strong> {selected.score}/100</p>
              <p style={{marginTop:8}}><strong>Syllabus Covered:</strong> {selected.syllabus}%</p>
              <div className="progress" style={{margin:"10px 0"}}><div style={{width:`${selected.syllabus}%`,background:selected.color}}></div></div>
              <div className="modal-actions">
                <button className="modal-btn-secondary" onClick={()=>setSelected(null)}>Close</button>
                <button className="modal-btn-primary" onClick={()=>{setSelected(null);navigate("/syllabus");}}>View Syllabus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
