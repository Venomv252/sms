import React, { useState } from "react";
import { Search, Download, Eye, Star, Upload } from "lucide-react";
import { notes } from "../data.js";

const subjectFilters = ["All","Physics","Mathematics","Chemistry","Computer Science","English Literature"];

export default function Notes({ showToast }) {
  const [activeSubject, setActiveSubject] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [format, setFormat] = useState("All Types");
  const formats = ["All Types","Lecture Notes","NCERT Solutions","Formula Sheets"];

  const filtered = notes.filter(n => {
    const matchSub = activeSubject==="All" || n.subject===activeSubject;
    const matchSearch = n.title.toLowerCase().includes(searchQ.toLowerCase()) || n.tags.some(t=>t.toLowerCase().includes(searchQ.toLowerCase()));
    return matchSub && matchSearch;
  });

  return (
    <div className="page-container">
      <div className="breadcrumb">Academics &nbsp;›&nbsp; Study Material &nbsp;›&nbsp; Notes Library</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Study Repository & Digital Notes</h1>
          <p className="page-subtitle">Access verified study modules, faculty lecture compilations and peer-validated content.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Syncing offline cache...")}>📥 Sync Offline Cache</button>
          <button className="green-button btn" onClick={()=>showToast("Opening upload form...")}>⬆ Upload Peer Notes</button>
        </div>
      </div>

      {/* Stats */}
      <div className="notes-stats-grid">
        <div className="notes-stat"><div className="notes-stat-icon">📚</div><strong>148</strong><span>TOTAL RESOURCES</span><small>100% Verified Eds. 1.1x Lecture Lectures</small></div>
        <div className="notes-stat"><div className="notes-stat-icon">⭐</div><strong>18</strong><span>STARRED SHEETS</span><small>Fast-Track 100% Vivo Revision Summaries</small></div>
        <div className="notes-stat"><div className="notes-stat-icon">🕐</div><strong>6<small style={{fontSize:12,fontWeight:400}}> +48 Hours</small></strong><span>RECENTLY ADDED</span><small>Faculty-pin supplements</small></div>
        <div className="notes-stat"><div className="notes-stat-icon">📶</div><strong>12<small style={{fontSize:12,fontWeight:400}}> Ready (48 Mb)</small></strong><span>OFFLINE CACHE</span><small>Synced to special storage</small></div>
      </div>

      {/* Search + Filters */}
      <div className="notes-filter-bar">
        <div className="hw-search-box" style={{flex:2}}>
          <Search size={14}/><input placeholder="Search chapters, formulas, revision notes, author tags e.g. 'Faraday', 'Calculus', 'Thermodynamics'..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
        </div>
        <button className="green-button btn" onClick={()=>showToast("Applying filter search...")}>Filter Search</button>
      </div>

      {/* Subject + Format filter */}
      <div className="notes-filter-row">
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:"#777",marginRight:4}}>SUBJECT</span>
          {subjectFilters.map(s=>(
            <button key={s} className={`filter-chip${activeSubject===s?" active":""}`} onClick={()=>setActiveSubject(s)}>{s}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:12,color:"#777",marginRight:4}}>FORMAT</span>
          {formats.map(f=>(
            <button key={f} className={`filter-chip${format===f?" active":""}`} onClick={()=>setFormat(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div className="notes-layout">
        {/* Notes List */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <span style={{fontSize:13,fontWeight:600}}>Curated Class Notes &nbsp;<span className="badge-chip green">5 Available</span></span>
            <span style={{fontSize:12,color:"#777"}}>Sort by: Recently Uploaded ↑</span>
          </div>
          {filtered.map(note=>(
            <div className="notes-card" key={note.id}>
              <div className="notes-card-top">
                <span className="notes-subject-tag" style={{background:note.color+"22",color:note.color,borderColor:note.color+"44"}}>{note.subject}</span>
                <span className="notes-type-tag">{note.type}</span>
                <span style={{marginLeft:"auto",fontSize:12,color:"#777"}}>Uploaded Recently &nbsp; <span style={{color:"#e67700"}}>★ {note.rating}/5</span></span>
              </div>
              <h3 className="notes-card-title">{note.title}</h3>
              <div className="notes-card-meta">
                <div className="notes-teacher-avatar">{note.teacher.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <span style={{fontSize:12,color:"#555"}}>{note.teacher}</span>
                <span style={{fontSize:11,color:"#777",marginLeft:8}}>• {note.pages} Pages &nbsp; • {note.size}</span>
              </div>
              <div className="notes-tags">{note.tags.map(t=><span className="notes-tag" key={t}>{t}</span>)}</div>
              <div className="notes-card-actions">
                <button className="hw-clarify-btn" onClick={()=>showToast(`Previewing: ${note.title}...`)}><Eye size={13}/>Preview</button>
                <button className="hw-submit-btn" onClick={()=>showToast(`Downloading: ${note.title}...`)}><Download size={13}/>Download</button>
              </div>
            </div>
          ))}
          {filtered.length===0 && <div style={{padding:"40px 0",textAlign:"center",color:"#777"}}>No notes found for your search.</div>}
          {/* Pagination */}
          <div className="notes-pagination">
            {[1,2,3,"...",5].map((p,i)=>(
              <button key={i} className={`page-btn${p===1?" active":""}`} onClick={()=>showToast(`Page ${p}`)}>{p}</button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <button className="filter-chip active">Pinned High-Yield</button>
              <button className="filter-chip" onClick={()=>showToast("Mid-Term Prep notes")}>Mid-Term Prep</button>
            </div>
            <p style={{fontSize:12,color:"#777",marginBottom:10}}>Quick access top 3 formula compilations with maximum exam revision focus</p>
            {["Trigonometric Identities & (1 page • 1 MB)","Optics & Ray Diagrams G... (Physics • 8 Pages • 2.6 MB)","Periodic Table Trends & V... (1 page • 1 MB)"].map((n,i)=>(
              <div key={i} className="pinned-note" onClick={()=>showToast(`Opening pinned note ${i+1}...`)}>
                <span style={{fontSize:18}}>{["📐","🔬","⚗️"][i]}</span>
                <span style={{fontSize:12,flex:1}}>{n}</span>
                <span style={{fontSize:18,color:"#ccc"}}>›</span>
              </div>
            ))}
            <button className="link-btn" onClick={()=>showToast("Viewing all pinned sheets...")}>View All 18 Pinned Sheets</button>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:10}}>📖 Recommended Texts</h3>
            {["HC Verma: Concepts of Physics Vol. 2","NCERT Exemplar Problems – Class 10"].map((t,i)=>(
              <div key={i} style={{background:"#f8f8ff",borderRadius:8,padding:"8px 10px",marginBottom:8,fontSize:12,cursor:"pointer"}} onClick={()=>showToast(`Opening ${t}...`)}>
                <strong>Vol. {i+1}</strong> {t}
                <div style={{color:"#087f5b",fontSize:11,marginTop:3}}>{i===0?"Access Digital Copy ↗":"Open e-Book ↗"}</div>
              </div>
            ))}
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <h3 style={{fontSize:13}}>⏱ Recently Downloaded</h3>
              <button className="link-btn" onClick={()=>showToast("Clearing history...")}>Clear</button>
            </div>
            {["Chem_Periodic_Propa...","Physics_LubManual_Ex...","CS_Recursion_Sample..."].map((f,i)=>(
              <div key={i} style={{padding:"6px 0",borderBottom:"1px solid #f0f0f0",fontSize:12,color:"#555",cursor:"pointer"}} onClick={()=>showToast(`Re-opening ${f}...`)}>📄 {f}</div>
            ))}
          </div>

          <div className="panel" style={{background:"var(--green)",color:"#fff"}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:6}}>🏆 Earn Merit Points via Peer Notes</div>
            <p style={{fontSize:12,opacity:.9,lineHeight:1.6}}>Successfully uploaded and peer-verified class notes earn up to 50 House Points & Academic Commendation Badges.</p>
            <button className="outline-btn btn" style={{marginTop:12,width:"100%",justifyContent:"center",borderColor:"#fff",color:"#fff"}} onClick={()=>showToast("Opening contribution rules...")}>Review Contribution Rules</button>
          </div>
        </div>
      </div>
    </div>
  );
}
