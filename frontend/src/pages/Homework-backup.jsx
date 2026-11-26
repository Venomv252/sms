import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { Upload, Search, Filter, ChevronDown, Send, CheckCircle2, Clock, Archive, FileText, Code, Eye } from "lucide-react";
import { homeworkList } from "../data.js";
import { Modal } from "../Layout.jsx";

const statusColors = { due:"#d63333", submitted:"#087f5b", evaluated:"#1971c2", pending:"#e67700" };
const statusBg = { due:"#fff0f0", submitted:"#dff9ef", evaluated:"#dde8ff", pending:"#fff4e0" };

export default function Homework({ showToast }) {
  const [activeTab, setActiveTab] = useState("All Assignments (33)");
  const [selectedHW, setSelectedHW] = useState(null);
  const [submitModal, setSubmitModal] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [clarificationModal, setClarificationModal] = useState(null);
  const [clarText, setClarText] = useState("");

  const tabs = ["All Assignments (33)","Pending","Submitted (3)","Evaluated (28)","Archived"];

  const filtered = homeworkList.filter(h => {
    const matchSearch = h.title.toLowerCase().includes(searchQ.toLowerCase()) || h.subject.toLowerCase().includes(searchQ.toLowerCase());
    const matchSubject = subjectFilter === "All Subjects" || h.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/homework" title="Homework loaded from database" fields={[{ key: "title", label: "Assignment" }, { key: "subject.name", label: "Subject" }, { key: "dueDate", label: "Due date" }, { key: "totalMarks", label: "Total marks" }, { key: "submissions", label: "My submission" }]} />
      {/* Breadcrumb */}
      <div className="breadcrumb">Academic Year 2024–25 • Term II &nbsp;•&nbsp; Grade 10–B</div>

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-title">Homework & Assignments</h1>
          <p className="page-subtitle">Review deadlines, upload coursework, track evaluation metrics, and request faculty guidance.</p>
        </div>
        <div className="page-header-stats">
          <div className="hw-stat-card">
            <div className="hw-stat-label">Submission<br/>Efficiency</div>
            <div className="hw-stat-value green">98.2%</div>
          </div>
          <div className="hw-stat-card">
            <div className="hw-stat-label">Weekly On-<br/>Time</div>
            <div className="hw-stat-value">12/12</div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="hw-metrics">
        <div className="hw-metric attention">
          <div className="hw-m-label">ATTENTION REQUIRED</div>
          <div className="hw-m-value">02</div>
          <div className="hw-m-sub red">● 1 due today (17:00)</div>
          <div style={{fontSize:11,color:"#d63333",marginTop:6,cursor:"pointer"}} onClick={()=>navigate&&navigate("/homework")}>→</div>
        </div>
        <div className="hw-metric">
          <div className="hw-m-label">UNDER REVIEW</div>
          <div className="hw-m-value">03</div>
          <div className="hw-m-sub">Faculty turnaround ~24h</div>
          <div style={{fontSize:11,color:"var(--green)",marginTop:6}}>Track</div>
        </div>
        <div className="hw-metric">
          <div className="hw-m-label">EVALUATED WORKS</div>
          <div className="hw-m-value">28<small style={{fontSize:14,fontWeight:400}}> Avg 94.8%</small></div>
          <div className="hw-m-sub">24 Distinction (A1) &nbsp;<span className="link" onClick={() => setActiveTab("Evaluated (28)")}>Archive</span></div>
        </div>
        <div className="hw-metric lock">
          <div className="hw-m-label">SUBMISSION LOCK</div>
          <div className="hw-m-value">01</div>
          <div className="hw-m-sub red">Mid-Term Lab Pract.</div>
          <div style={{fontSize:11,color:"#d63333",marginTop:4}}>Fri 23:59</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="hw-tabs">
        {tabs.map(t => <button key={t} className={`hw-tab${activeTab===t?" active":""}`} onClick={() => setActiveTab(t)}>{t}{t==="Pending"&&<span className="tab-badge">●</span>}</button>)}
      </div>

      <div className="hw-layout">
        {/* Left: List */}
        <div className="hw-list-col">
          {/* Search & Filter */}
          <div className="hw-search-row">
            <div className="hw-search-box"><Search size={15}/><input placeholder="Search by title, topic, or instructor..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/></div>
            <select className="hw-select" value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)}>
              <option>All Subjects</option>
              {["Physics","Computer Science","Mathematics","English Literature","Chemistry"].map(s=><option key={s}>{s}</option>)}
            </select>
            <button className="hw-filter-btn"><Filter size={14}/>Sort: Due Date</button>
          </div>

          {/* Assignment Cards */}
          {filtered.map(hw => (
            <div className={`hw-card${selectedHW?.id===hw.id?" hw-card-selected":""}`} key={hw.id} onClick={() => setSelectedHW(hw)}>
              <div className="hw-card-top">
                <span className="hw-due-tag" style={{background: hw.urgent?"#fff0f0":"#f0fff7", color: hw.urgent?"#d63333":"#087f5b"}}>
                  {hw.status==="evaluated" ? `✓ Score: 20/20 • Grade A1 (Distinction)` : hw.status==="submitted" ? "✓ Submitted Yesterday • Awaiting Evaluation" : `⏰ Due ${hw.due}`}
                </span>
                <span className="hw-subject-tag" style={{background: hw.color+"22", color: hw.color, borderColor: hw.color+"44"}}>{hw.subject}</span>
              </div>
              <h3 className="hw-card-title">{hw.title}</h3>
              <p className="hw-card-meta">Instructor: {hw.instructor}</p>
              <ul className="hw-card-bullets">
                <li>{hw.desc}</li>
              </ul>
              {hw.file && (
                <div className="hw-card-files">
                  <span className="hw-file"><FileText size={13}/>{hw.file}</span>
                  {hw.questions && <span className="hw-questions-tag">{hw.questions}</span>}
                </div>
              )}
              {hw.status==="evaluated" && (
                <div className="hw-eval-remark">
                  <div className="hw-eval-teacher">Mr. D'souza's Evaluation Remark</div>
                  <p>"Exceptional thematic depth and structural coherence. Aarav demonstrated commanding synthesis of dramatic irony and lexical motifs in the soliloquy."</p>
                  <div className="hw-eval-actions">
                    <button className="hw-action-btn" onClick={e=>{e.stopPropagation();showToast("Added to Academic Portfolio!");}}>✓ Added to Academic Portfolio</button>
                    <button className="hw-action-btn" onClick={e=>{e.stopPropagation();showToast("Opening graded rubric...");}}>View Graded Rubric</button>
                    <button className="hw-action-btn" onClick={e=>{e.stopPropagation();showToast("Downloading annotated PDF...");}}>⬇ Annotated PDF</button>
                  </div>
                </div>
              )}
              {hw.status!=="evaluated" && hw.status!=="submitted" && (
                <div className="hw-card-actions">
                  <button className="hw-clarify-btn" onClick={e=>{e.stopPropagation();setClarificationModal(hw);}}>💬 Ask Clarification</button>
                  <button className="hw-submit-btn" onClick={e=>{e.stopPropagation();setSubmitModal(hw);}}>⬆ Submit Work</button>
                </div>
              )}
              {hw.status==="submitted" && (
                <div className="hw-card-actions">
                  <button className="hw-clarify-btn" onClick={e=>{e.stopPropagation();showToast("Opening submission...");}}>📄 View Submission</button>
                  <button className="hw-clarify-btn" onClick={e=>{e.stopPropagation();showToast("Opening version history...");}}>🕓 Version History</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Quick Submission Drop */}
        <div className="hw-right-col">
          <div className="hw-quick-drop">
            <div className="hw-quick-title">Quick Submission Drop <span className="green-dot">●</span></div>
            <p>Drag and drop files to instantly link with your pending course assignments.</p>
            <div className="hw-drop-zone" onClick={() => showToast("File upload dialog opened!")}>
              <Upload size={28}/>
              <p>Choose a file or drag here</p>
              <small>PDF, DOCX, ZIP, IPYNB (Max 25MB)</small>
              <button className="hw-browse-btn">Browse Local Drives</button>
            </div>
            <div className="hw-integrations">
              <div className="hw-int-title">CLOUD INTEGRATIONS &nbsp; <span style={{color:"var(--green)",fontSize:11}}>Auto-sync ON</span></div>
              <div className="hw-int-btns">
                <button onClick={() => showToast("Connecting to Google Drive...")} className="hw-int-btn">📁 Google Drive</button>
                <button onClick={() => showToast("Connecting to OneDrive...")} className="hw-int-btn">☁ OneDrive</button>
              </div>
            </div>
          </div>

          <div className="hw-honour-box">
            <div className="hw-honour-title">🛡 Greenwood Honour Code</div>
            <ul className="hw-honour-list">
              <li><strong>Turnitin Integration</strong> — All essays, portfolios, and codebases undergo automated similarity scanning upon submission.</li>
              <li>Maximum allowable similarity index: ≤ 10% excluding citations.</li>
              <li>Generative AI tools must be cited in footnotes per APA 7th Edition style standard.</li>
              <li>Only standard file extensions are allowed; encrypted PDFs will be automatically rejected.</li>
            </ul>
            <button className="link" style={{marginTop:8,background:"none",border:"none",cursor:"pointer",fontSize:12}} onClick={() => showToast("Opening Integrity Charter...")}>Read Greenwood Integrity Charter 2024–25 ↗</button>
          </div>

          <div className="hw-office-hours">
            <div className="hw-oh-title">Faculty Office Hours <span className="hw-oh-today">Today</span></div>
            {[{name:"Mrs. Roy",sub:"Math • Room 304",time:"15:30 – 18:30",btn:"Book Slot"},{name:"Dr. A. Evans",sub:"Physics • Lab 2B",time:"16:00 – 17:00",btn:"Drop In"},{name:"Mr. K. Sharma",sub:"Comp Sci • Lab 4",time:"Tomorrow 10:00",btn:"Request"},].map(f=>(
              <div className="hw-oh-row" key={f.name}>
                <div className="hw-oh-avatar">{f.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <div className="hw-oh-info"><strong>{f.name}</strong><small>{f.sub}</small></div>
                <div className="hw-oh-right"><span>{f.time}</span><button className="hw-oh-btn" onClick={() => showToast(`Booking slot with ${f.name}...`)}>{f.btn}</button></div>
              </div>
            ))}
            <button className="link-btn" onClick={() => showToast("Opening full consultation schedule...")}>View Complete Faculty Consultation Schedule</button>
          </div>

          <div className="hw-extension-box">
            <span>📍</span>
            <div>
              <strong>Need Extension?</strong>
              <p>Medical or official leaves must be filed +12 hours prior to deadline via Support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {submitModal && (
        <Modal title={`Submit: ${submitModal.subject}`} onClose={() => setSubmitModal(null)}>
          <p className="modal-desc">Upload your completed work for <strong>{submitModal.title}</strong></p>
          <label>Upload File</label>
          <div className="hw-drop-zone small" onClick={() => showToast("File browser opened!")}>
            <Upload size={22}/><p>Click to upload or drag & drop</p>
            <small>PDF, DOCX, ZIP, IPYNB • Max 25MB</small>
          </div>
          <label>Comments to Instructor (optional)</label>
          <textarea className="modal-textarea" placeholder="Any notes for your instructor..."/>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setSubmitModal(null)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setSubmitModal(null); showToast("✓ Assignment submitted successfully!"); }}>⬆ Submit Assignment</button>
          </div>
        </Modal>
      )}

      {/* Clarification Modal */}
      {clarificationModal && (
        <Modal title="Ask Clarification" onClose={() => setClarificationModal(null)}>
          <p className="modal-desc">Send a clarification request to <strong>{clarificationModal.instructor}</strong> regarding <em>{clarificationModal.title}</em></p>
          <label>Your Question</label>
          <textarea className="modal-textarea" placeholder="Describe what needs clarification..." value={clarText} onChange={e=>setClarText(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setClarificationModal(null)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setClarificationModal(null); setClarText(""); showToast("✓ Clarification request sent!"); }}><Send size={14}/>Send Request</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
