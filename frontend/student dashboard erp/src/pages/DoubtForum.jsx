import React, { useState } from "react";
import { Send } from "lucide-react";
import { doubts } from "../data.js";
import { Modal } from "../Layout.jsx";

export default function DoubtForum({ showToast }) {
  const [activeTab, setActiveTab] = useState("All Doubts");
  const [newDoubtModal, setNewDoubtModal] = useState(false);
  const [doubtText, setDoubtText] = useState("");
  const [doubtSubject, setDoubtSubject] = useState("Physics");
  const [expandedDoubt, setExpandedDoubt] = useState(0);
  const [comment, setComment] = useState("");
  const tabs = ["All Doubts","Sorted by Faculty","Awaiting Reply","Peer Answered","Started by Me"];

  return (
    <div className="page-container">
      <div className="breadcrumb">From &amp; Academic Forum</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Academic Doubt Forum & Faculty Q&A</h1>
          <p className="page-subtitle">Ask questions directly to subject educators and collaborate with peers.</p>
        </div>
        <button className="green-button btn" onClick={()=>setNewDoubtModal(true)}>💬 Ask New Doubt</button>
      </div>

      {/* Stats */}
      <div className="df-stats-grid">
        <div className="df-stat green"><div className="df-stat-val">34</div><div className="df-stat-label">RESOLVED DOUBTS</div><small>queries cleared &nbsp;● Avg response time: 2.4 hrs</small></div>
        <div className="df-stat"><div className="df-stat-val">2</div><div className="df-stat-label">OPEN / PRESENT</div><small>active inquiries. Two Faculty sees between threads.</small></div>
        <div className="df-stat"><div className="df-stat-val">16</div><div className="df-stat-label">PEER ENDORSEMENTS</div><small>topics earned &nbsp;● Your Student rec per Faculty ranking</small></div>
        <div className="df-stat blue"><div className="df-stat-val">Today, 3:30 PM</div><div className="df-stat-label">FACULTY LAST HOUR</div><small>Dr. A. Evans (Physics)</small></div>
      </div>

      {/* Tabs */}
      <div className="hw-tabs">
        {tabs.map(t=><button key={t} className={`hw-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>)}
      </div>

      <div className="df-layout">
        {/* Left – Doubts */}
        <div>
          {doubts.map((d,i)=>(
            <div className="df-card" key={d.id}>
              <div className="df-card-top">
                <div className="df-student-avatar">{d.student.split(" ").map(w=>w[0]).join("")}</div>
                <div style={{flex:1}}>
                  <strong style={{fontSize:13}}>{d.student}</strong>
                  <span style={{fontSize:11,color:"#777"}}> &nbsp;Grade {d.grade}</span>
                </div>
                <span className="notes-subject-tag" style={{fontSize:11}}>{d.subject}</span>
                <span className="df-status-badge" style={{background:d.status==="Faculty Replied"?"#dff9ef":d.status==="Under Faculty Review"?"#fff4e0":"#dde8ff",color:d.status==="Faculty Replied"?"#087f5b":d.status==="Under Faculty Review"?"#e67700":"#1971c2"}}>{d.status}</span>
              </div>
              <div className="df-card-body">
                <div style={{fontSize:11,color:"#777",marginBottom:8}}>{d.time}</div>
                <h3 className="df-question">{d.question}</h3>
                {d.answer && expandedDoubt===i && (
                  <div className="df-answer">
                    <div className="df-answer-header">
                      <div className="df-teacher-avatar">AP</div>
                      <div>
                        <strong style={{fontSize:12}}>{d.teacher}</strong>
                        {d.verified && <span className="df-verified-badge">✓ Official Faculty Verified Answer</span>}
                      </div>
                    </div>
                    <p style={{fontSize:13,color:"#333",lineHeight:1.7,marginTop:8}}>{d.answer}</p>
                    <div style={{marginTop:10,padding:"10px",background:"#f3f3ff",borderRadius:8}}>
                      <strong style={{fontSize:12,color:"var(--green)"}}>Reference Materials →</strong>
                      <div><button className="link-btn" onClick={()=>showToast("Opening reference notes...")}>View Derivation Notes in Lab ↗</button></div>
                    </div>
                  </div>
                )}
                {d.answer==="Piyoj Sen (Peer Contributor • Grade 10) provided a solution with code examples." && expandedDoubt===i && (
                  <div className="df-peer-solution">
                    <strong style={{fontSize:12}}>Piyoj Sen (Peer Contributor • Grade 10) &nbsp;<span className="df-status-badge" style={{background:"#dde8ff",color:"#1971c2",fontSize:10}}>Peer Resolved</span></strong>
                    <pre className="df-code">{`def bfs_cycle(graph, visited, adj_list):
    if node in visited: return
    visited.add(node)
    for neighbor in adj_list[node]:
        if neighbor not in visited:
            if dfs_cycle(neighbor, visited, adj_list): return True
    return False`}</pre>
                  </div>
                )}
              </div>
              <div className="df-card-footer">
                <button className="df-footer-btn" onClick={()=>showToast(`Helpful! (${d.helpful+1})`)}>👍 Helpful ({d.helpful})</button>
                <button className="df-footer-btn" onClick={()=>showToast("Sharing doubt...")}>↗ Share</button>
                <button className="df-footer-btn" onClick={()=>showToast("Saving doubt...")}>🔖 Save for Later</button>
                <button className="df-footer-btn" onClick={()=>setExpandedDoubt(expandedDoubt===i?-1:i)}>{expandedDoubt===i?"▲ Collapse":"▼ Follow-up Replies"}</button>
              </div>
              {expandedDoubt===i && (
                <div style={{padding:"10px 16px",borderTop:"1px solid #f0f0f0",display:"flex",gap:8}}>
                  <input className="modal-input" placeholder="Add a comment..." value={comment} onChange={e=>setComment(e.target.value)} style={{flex:1}}/>
                  <button className="modal-btn-primary" style={{padding:"8px 14px"}} onClick={()=>{setComment("");showToast("Comment posted!");}}>
                    <Send size={14}/>
                  </button>
                </div>
              )}
              <div style={{fontSize:11,color:"#777",padding:"8px 16px",borderTop:"1px solid #f5f5f5"}}>
                👥 {Math.floor(Math.random()*12)+3} Students Found Helpful &nbsp;
                <button className="link-btn" onClick={()=>showToast("Opening contribution...")}>+ Add Comment &nbsp;•&nbsp; Request Faculty Confirmation</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:12}}>Faculty Office Hours &nbsp;<span style={{background:"#caffdf",color:"var(--green)",padding:"2px 6px",borderRadius:5,fontSize:10}}>Live Status</span></h3>
            <p style={{fontSize:12,color:"#777",marginBottom:10}}>See faculty who are online for direct forum Q&A interactions.</p>
            {[{initials:"DE",name:"Dr. A. Evans",sub:"Physics (eLB)",status:"Online",statusColor:"#087f5b"},{initials:"SP",name:"Mrs. Snarita Patel",sub:"Math Acc (eLB)",status:"3:30 PM",statusColor:"#e67700"},{initials:"KS",name:"Mr. K. Sharma",sub:"Computer Science",status:"Online",statusColor:"#087f5b"}].map(f=>(
              <div key={f.name} style={{display:"flex",gap:10,alignItems:"center",marginBottom:10,padding:"8px 0",borderBottom:"1px solid #eee"}}>
                <div style={{background:"var(--green)",color:"#fff",borderRadius:"50%",width:32,height:32,display:"grid",placeItems:"center",fontSize:12,fontWeight:700}}>{f.initials}</div>
                <div style={{flex:1}}><strong style={{fontSize:12}}>{f.name}</strong><p style={{fontSize:11,color:"#777"}}>{f.sub}</p></div>
                <span style={{fontSize:11,color:f.statusColor,fontWeight:600}}>{f.status}</span>
              </div>
            ))}
            <button className="link-btn" onClick={()=>showToast("Opening full office hours...")}>Request 1-on-1 • Faculty Slot</button>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:10}}>📋 Posting Protocol</h3>
            <ul style={{fontSize:12,color:"#555",lineHeight:1.9,paddingLeft:18}}>
              <li>Be Specific: Focus on content in context, nature, chapter, and equation</li>
              <li>Attach Images: Upload up to 3 handwritten notes or textbook screenshots</li>
              <li>Mark Resolved: Once answered, mark the forum thread resolved to alert future students</li>
              <li>Cross Cites applies to all public threads</li>
            </ul>
          </div>

          <div className="panel">
            <h3 style={{fontSize:13,marginBottom:10}}>🔥 Exam Hot Topics &nbsp;<span style={{fontSize:11,color:"#777"}}>Term II 2025</span></h3>
            <p style={{fontSize:12,color:"#777",marginBottom:10}}>Most frequently asked topics by students in the last 14 days.</p>
            {[{sub:"Chemistry",q:"Standard Electrode Potential calculated with Nernst equations",count:"34 doubts"},
              {sub:"Mathematics • Probability",q:"Conditional Gaussian combinations for Gaussian prediction",count:"27 doubts"},
              {sub:"Physics",q:"Thin lens formal sign convention when object is in Virtual focus",count:"19 doubts"},
            ].map((t,i)=>(
              <div key={i} style={{marginBottom:10,padding:"8px 0",borderBottom:"1px solid #eee",cursor:"pointer"}} onClick={()=>showToast(`Opening topic: ${t.q}...`)}>
                <span style={{fontSize:11,color:"#087f5b",fontWeight:600}}>{t.sub}</span>
                <p style={{fontSize:12,color:"#333",margin:"3px 0"}}>{t.q}</p>
                <small style={{color:"#777"}}>{t.count}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Doubt Modal */}
      {newDoubtModal && (
        <Modal title="Ask New Doubt" onClose={()=>setNewDoubtModal(false)}>
          <p className="modal-desc">Post your question to be answered by faculty or peer mentors.</p>
          <label>Subject</label>
          <select className="modal-input" value={doubtSubject} onChange={e=>setDoubtSubject(e.target.value)}>
            {["Physics","Mathematics","Computer Science","Chemistry","English Literature","Social Studies"].map(s=><option key={s}>{s}</option>)}
          </select>
          <label>Your Question</label>
          <textarea className="modal-textarea" placeholder="Describe your doubt in detail. Include chapter, concept, or equation reference if applicable..." value={doubtText} onChange={e=>setDoubtText(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={()=>setNewDoubtModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={()=>{if(!doubtText.trim()){showToast("Please describe your doubt.");return;}setNewDoubtModal(false);setDoubtText("");showToast("✓ Doubt posted to forum!");}}><Send size={14}/>Post Doubt</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
