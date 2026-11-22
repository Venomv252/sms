import React from "react";
import { useNavigate } from "react-router-dom";

// ── School Timing ────────────────────────────────────────────────────────────
export function SchoolTiming({ showToast }) {
  const bells = [
    {label:"School Gate Opens",time:"07:30 AM",color:"#087f5b"},
    {label:"Assembly",time:"08:00 AM",color:"#087f5b"},
    {label:"Period 1 Start",time:"08:30 AM",color:"#1971c2"},
    {label:"Period 2",time:"09:20 AM",color:"#1971c2"},
    {label:"Morning Recess",time:"10:05 AM",color:"#e67700"},
    {label:"Period 3",time:"10:25 AM",color:"#1971c2"},
    {label:"Period 4",time:"11:15 AM",color:"#1971c2"},
    {label:"Lunch Break",time:"12:00 PM",color:"#e67700"},
    {label:"Period 5",time:"12:45 PM",color:"#1971c2"},
    {label:"Period 6",time:"01:35 PM",color:"#1971c2"},
    {label:"Period 7",time:"02:25 PM",color:"#1971c2"},
    {label:"School Ends",time:"03:15 PM",color:"#d63333"},
    {label:"Gate Closes",time:"04:30 PM",color:"#d63333"},
  ];
  return (
    <div className="page-container">
      <div className="breadcrumb">Main &nbsp;›&nbsp; School Timing</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div><h1 className="page-title">School Bell Schedule & Timing</h1><p className="page-subtitle">Greenwood High International • AY 2024–25 • Standard Schedule</p></div>
        <button className="green-button btn" onClick={()=>showToast("Downloading bell schedule PDF...")}>⬇ Download PDF</button>
      </div>
      <div className="panel" style={{maxWidth:540}}>
        <h2 style={{fontSize:15,marginBottom:16}}>📅 Daily Bell Schedule</h2>
        <div style={{position:"relative"}}>
          <div style={{position:"absolute",left:16,top:0,bottom:0,width:2,background:"#eee"}}></div>
          {bells.map((b,i)=>(
            <div key={i} style={{display:"flex",gap:16,alignItems:"center",marginBottom:14,position:"relative"}}>
              <div style={{width:14,height:14,borderRadius:"50%",background:b.color,flexShrink:0,zIndex:1}}></div>
              <div style={{flex:1,display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fafafa",borderRadius:8,padding:"8px 14px"}}>
                <span style={{fontSize:13}}>{b.label}</span>
                <strong style={{fontSize:14,color:b.color}}>{b.time}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Timetable ────────────────────────────────────────────────────────────────
export function Timetable({ showToast }) {
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="breadcrumb">Main &nbsp;›&nbsp; Timetable</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div><h1 className="page-title">Weekly Timetable</h1><p className="page-subtitle">Quick overview of your full week. Click a cell for details.</p></div>
        <button className="green-button btn" onClick={()=>navigate("/schedule")}>Open Full Schedule →</button>
      </div>
      <div className="panel" style={{overflowX:"auto"}}>
        <p style={{fontSize:13,color:"#777"}}>This page shows the full timetable grid. For the interactive detailed schedule with live period tracking, room locator, and class notes, visit the <button className="link-btn" onClick={()=>navigate("/schedule")}>Schedule & Classes</button> page.</p>
        <div style={{marginTop:16,background:"#f8f8ff",borderRadius:12,padding:"20px",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:8}}>📅</div>
          <h3 style={{fontSize:15,marginBottom:8}}>Full Interactive Timetable</h3>
          <p style={{fontSize:13,color:"#777",marginBottom:16}}>35 periods per week • Grade 10-B • Mon–Fri</p>
          <button className="green-button btn" style={{margin:"0 auto"}} onClick={()=>navigate("/schedule")}>Open Interactive Schedule</button>
        </div>
      </div>
    </div>
  );
}

// ── Announcements ───────────────────────────────────────────────────────────
export function Announcements({ showToast }) {
  const items = [
    {title:"Term Finals begin in 12 days — Revision Schedule Released",tag:"Academic",time:"Just now",text:"The official pre-board revision timetable has been published. All students must download and follow the schedule strictly."},
    {title:"Library Extended Hours During Exam Season",tag:"Campus Life",time:"2 hrs ago",text:"The school library will remain open until 7:00 PM from March 1 onwards to support exam preparation."},
    {title:"Mandatory Pre-Board Mock Test — February 28",tag:"Academic",time:"Yesterday",text:"A full-length CBSE-pattern mock test will be conducted on Feb 28. Report by 8:30 AM in exam uniform."},
    {title:"Campus Cafeteria Menu Update",tag:"Campus Life",time:"2 days ago",text:"New nutritious meal options including protein-rich breakfasts and low-sugar beverages are available starting Monday."},
    {title:"Team Sports Kit Collection",tag:"Sports",time:"3 days ago",text:"Students representing School Team must collect their sports kits from the PE department before Friday."},
  ];
  return (
    <div className="page-container">
      <div className="breadcrumb">Campus &amp; Community &nbsp;›&nbsp; Announcements</div>
      <div className="page-header-row"><div><h1 className="page-title">Announcements</h1><p className="page-subtitle">Official school-wide announcements for AY 2024–25.</p></div></div>
      {items.map((a,i)=>(
        <div key={i} className="notice-full-card">
          <div className="notice-card-header"><span className="notice-dept-tag" style={{background:"#dde8ff",color:"#1971c2"}}>{a.tag}</span><span style={{fontSize:12,color:"#777",marginLeft:"auto"}}>{a.time}</span></div>
          <h3 className="notice-full-title">{a.title}</h3>
          <p className="notice-full-text">{a.text}</p>
          <div className="notice-card-footer"><button className="link-btn" onClick={()=>showToast(`Opening: ${a.title}`)}>Read More →</button></div>
        </div>
      ))}
    </div>
  );
}

// ── Class Announcements ──────────────────────────────────────────────────────
export function ClassAnnouncements({ showToast }) {
  const items = [
    {teacher:"Mr. K. Sharma",sub:"Computer Science",time:"Today",text:"Please bring your USB drives verified for the SQL Lab session this Wednesday. Unverified drives will not be permitted."},
    {teacher:"Mrs. Roy",sub:"Mathematics",time:"Today",text:"Unit 4 quiz postponed to next Monday. Additional practice sets have been uploaded to the portal under Chapter 4B."},
    {teacher:"Dr. A. Evans",sub:"Physics",time:"Yesterday",text:"Formula Sheet & Laws document is now pinned in Notes. This covers all derivations for the upcoming board exam."},
    {teacher:"Dr. H. Patel",sub:"Chemistry",time:"2 days ago",text:"Organic Chemistry lab report (Experiment 7) must be submitted by Thursday with proper safety annotations."},
  ];
  return (
    <div className="page-container">
      <div className="breadcrumb">Campus &amp; Community &nbsp;›&nbsp; Class Announcements</div>
      <div className="page-header-row"><div><h1 className="page-title">Class Announcements</h1><p className="page-subtitle">Messages from your subject teachers for Grade 10-B.</p></div></div>
      {items.map((a,i)=>(
        <div key={i} className="notice-full-card">
          <div className="notice-card-header">
            <span className="notice-dept-tag" style={{background:"#dff9ef",color:"#087f5b"}}>{a.sub}</span>
            <span style={{fontSize:12,color:"#555",marginLeft:8}}>— {a.teacher}</span>
            <span style={{fontSize:12,color:"#777",marginLeft:"auto"}}>{a.time}</span>
          </div>
          <p className="notice-full-text" style={{marginTop:10}}>{a.text}</p>
          <div className="notice-card-footer">
            <button className="outline-btn btn" style={{fontSize:12}} onClick={()=>showToast("Replying to teacher...")}>Reply</button>
            <button className="link-btn" onClick={()=>showToast("Marked as read!")}>Mark Read ✓</button>
          </div>
        </div>
      ))}
    </div>
  );
}
