import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { allNotices } from "../data.js";

const categories = ["All Gazettes","Academic","Examinations","Sports & House","Administration","Holidays & Breaks"];

export default function Notices({ showToast }) {
  const [activeCategory, setActiveCategory] = useState("All Gazettes");
  const [searchQ, setSearchQ] = useState("");

  const filtered = allNotices.filter(n => {
    const matchCat = activeCategory==="All Gazettes" || n.category===activeCategory || n.tag.includes(activeCategory.replace("Examinations","Academic").replace("Holidays & Breaks","Campus Life"));
    const matchSearch = n.title.toLowerCase().includes(searchQ.toLowerCase()) || n.text.toLowerCase().includes(searchQ.toLowerCase());
    return matchCat && matchSearch;
  });

  const tagColor = (tag) => {
    if(tag.includes("Academic")) return {bg:"#dde8ff",color:"#1971c2"};
    if(tag.includes("Sports")) return {bg:"#dff9ef",color:"#087f5b"};
    if(tag.includes("Campus")) return {bg:"#fff4e0",color:"#e67700"};
    return {bg:"#f3f3ff",color:"#7048e8"};
  };

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/notices" title="Official notices from database" fields={[{ key: "title", label: "Notice" }, { key: "category", label: "Category" }, { key: "priority", label: "Priority" }, { key: "publishDate", label: "Published" }, { key: "content", label: "Details" }]} />
      {/* Urgent Advisory Banner */}
      <div className="notices-banner">
        <div style={{fontSize:24,flexShrink:0}}>⚠️</div>
        <div style={{flex:1,minWidth:200}}>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:6,alignItems:"center"}}>
            <span className="badge-chip red">URGENT ADVISORY • EXTENDED</span>
            <span style={{fontSize:11,color:"#9de8cf"}}>● Valid through Feb 25, 2025</span>
          </div>
          <h3 style={{color:"#fff",fontSize:16,marginBottom:6,lineHeight:1.3}}>Inter-School CBSE Science & Robotics Olympiad 2025 – Final Registration Window</h3>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.85)",lineHeight:1.5}}>Registration deadline officially extended to February 28, 2025 (11:59PM). Class 9–12 students participating in algorithmic programming, automated rovers, or environmental science models must submit online consent forms.</p>
        </div>
        <div style={{display:"flex",gap:8,flexShrink:0,flexWrap:"wrap",alignSelf:"flex-start"}}>
          <button className="outline-btn btn" style={{borderColor:"rgba(255,255,255,.5)",color:"#fff",background:"rgba(255,255,255,.1)"}} onClick={()=>showToast("Downloading Circular PDF...")}>⬇ Download Circular PDF</button>
          <button className="btn" style={{background:"#fff",color:"var(--green)"}} onClick={()=>showToast("Registering team...")}>Register Team →</button>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12,marginBottom:16}}>
        <div>
          <div className="breadcrumb">OFFICIAL CAMPUS GAZETTES • CBSE Affiliation #131021</div>
          <h1 className="page-title">Campus Circulars & Official Notice Board</h1>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div className="hw-search-box" style={{width:240}}>
            <input placeholder="Search gazettes, circular no..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/>
          </div>
          <button className="outline-btn btn" onClick={()=>showToast("Opening archive 2024–25...")}>Archive: 2024–25</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="hw-tabs" style={{marginBottom:20}}>
        {categories.map(c=><button key={c} className={`hw-tab${activeCategory===c?" active":""}`} onClick={()=>setActiveCategory(c)}>{c}</button>)}
      </div>

      <div className="notices-layout">
        {/* Left – Notices */}
        <div>
          {filtered.map((n,i)=>{
            const tc = tagColor(n.tag);
            return (
              <div key={n.id} className="notice-full-card">
                <div className="notice-card-header">
                  <span className="notice-dept-tag" style={{background:tc.bg,color:tc.color}}>{n.tag} Directorate</span>
                  <div style={{display:"flex",gap:8,marginLeft:"auto",flexWrap:"wrap"}}>
                    {n.urgent && <span className="badge-chip red">Action Required</span>}
                    {!n.urgent && <span className="notice-ref">Ref: GWN/{n.id.toString().padStart(4,"0")}</span>}
                  </div>
                </div>
                <h3 className="notice-full-title">{n.title}</h3>
                <p className="notice-full-text">{n.text}</p>
                {i===1 && (
                  <div style={{display:"flex",gap:12,alignItems:"center",margin:"10px 0",padding:"8px",background:"#f8fff8",borderRadius:8,flexWrap:"wrap"}}>
                    <span style={{background:"#dff9ef",color:"#087f5b",padding:"4px 10px",borderRadius:6,fontSize:13,fontWeight:700}}>EF</span>
                    <strong style={{fontSize:13}}>VS</strong>
                    <span style={{background:"#fff0f0",color:"#d63333",padding:"4px 10px",borderRadius:6,fontSize:13,fontWeight:700}}>RL</span>
                    <div style={{marginLeft:"auto",fontSize:12}}><strong>Falcons (240 pts)</strong> vs <strong>Lions (221 pts)</strong></div>
                  </div>
                )}
                <div className="notice-card-footer">
                  <span style={{fontSize:11,color:"#777"}}>Issued {n.date}</span>
                  {n.urgent && (
                    <>
                      <button className="outline-btn btn" style={{fontSize:12}} onClick={()=>showToast("Downloading circular...")}>⬇ Download</button>
                      <button className="green-button btn" style={{fontSize:12}} onClick={()=>showToast("✓ Acknowledgement signed!")}>Sign Acknowledgement</button>
                    </>
                  )}
                  {!n.urgent && (
                    <button className="link-btn" onClick={()=>showToast(`Reading more: ${n.title}...`)}>Read More →</button>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length===0 && <div style={{padding:"40px 0",textAlign:"center",color:"#777"}}>No notices found.</div>}
        </div>

        {/* Right */}
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <h3 style={{fontSize:13}}>🔏 Digital Consent</h3>
              <span className="badge-chip orange">1 Pending</span>
            </div>
            <p style={{fontSize:12,color:"#555"}}>CBSE and internal board assessment circulars mandate required guardian verification before student entry slips are authorized.</p>
            <div style={{background:"#fff4e0",borderRadius:8,padding:10,marginTop:10}}>
              <strong style={{fontSize:12}}>Pre-Board Seating Slip</strong>
              <p style={{fontSize:11,color:"#777"}}>Grade #10-B &nbsp; Due Feb 10th &nbsp; Requires Father/Mother OTP</p>
              <button className="green-button btn" style={{marginTop:8,width:"100%",justifyContent:"center"}} onClick={()=>showToast("Opening signature link...")}>Request Parent Signature Link</button>
            </div>
            <p style={{fontSize:11,color:"#777",marginTop:8}}>◉ 4 Circulars previously signed this term.</p>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:12}}>📅 Important Dates &nbsp;<span style={{fontSize:11,color:"#777"}}>Term II 2025</span></h3>
            {[{date:"FEB 28, 2025",color:"#d63333",event:"Mathematics Olympiad Final Deadline",sub:"Submission of prototype & team list & roster"},
              {date:"MAR 02, 2025",color:"#1971c2",event:"Science Fair Model Display Submissions",sub:"Subjects: Senior Physics & AI Laboratories"},
              {date:"MAR 05, 2025",color:"#087f5b",event:"Class 10 CBSE Final Pre-Board",sub:"Paper II: Mathematics (Standard & Basic)"},
              {date:"MAR 18, 2025",color:"#e67700",event:"Founder's Day Gala Performance",sub:"Classical admission open for parents"},
            ].map(d=>(
              <div key={d.date} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                <div style={{background:d.color+"22",color:d.color,borderRadius:6,padding:"3px 6px",fontSize:10,fontWeight:700,flexShrink:0,textAlign:"center"}}>{d.date}</div>
                <div><strong style={{fontSize:12}}>{d.event}</strong><p style={{fontSize:11,color:"#777"}}>{d.sub}</p></div>
              </div>
            ))}
            <button className="link-btn" onClick={()=>showToast("Syncing with Google Calendar...")}>🗓 Sync to Google / Apple Calendar</button>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:10}}># Gazette Taxonomy</h3>
            <p style={{fontSize:12,color:"#777",marginBottom:8}}>Quick jump to official archives by topic indexing</p>
            {[["#Academics","24"],["#Examinations","12"],["#Sports","18"],["#HouseEvents","9"],["#Transport","5"],["#FeeCirculars","3"]].map(([tag,count])=>(
              <div key={tag} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13,cursor:"pointer",borderBottom:"1px solid #f5f5f5"}} onClick={()=>showToast(`Opening ${tag}...`)}>
                <span style={{color:"#7048e8"}}>{tag}</span><span style={{color:"#777"}}>{count}</span>
              </div>
            ))}
          </div>

          <div className="panel">
            <h3 style={{fontSize:13,marginBottom:8}}>📮 Registrar Office Dispatch</h3>
            <p style={{fontSize:12,color:"#555"}}>Room 102, Admin Block</p>
            <p style={{fontSize:12,color:"#555",marginTop:4}}>For discrepancy in hall ticket records or official circular queries, write to:</p>
            <a href="mailto:circulars@greenwood.edu" style={{color:"var(--green)",fontSize:12}}>circulars@greenwood.edu ✉</a>
          </div>
        </div>
      </div>
    </div>
  );
}
