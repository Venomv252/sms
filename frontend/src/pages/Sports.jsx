import React, { useState } from "react";
import { Modal } from "../Layout.jsx";

const clubs = [
  {name:"Senior Cricket XI",role:"Opening Batsman & Vice Captain",status:"Matches & Drills Active",sub:"First XI Varsity Squad • Greenwood Field A",schedule:"Tue & Thu • 3:45 PM",coach:"Coach Rawat (PE Dept)",nextMatch:"DPS Int'l (Mar 08)",color:"#087f5b"},
  {name:"Algorithmic Coding & Robotics Guild",role:"Team Lead",status:"Lab Pass #RB-402",sub:"Advanced STEM Lab 4 • Regional Science Fair Track",schedule:"Mon & Wed • 4:00 PM",venue:"Robotics Bay – Lab 4",project:"CBSE Science Fair Bot",color:"#1971c2"},
  {name:"Model United Nations Society",role:"Delegate: Security Council",status:"GWMUN 2025 Contingent",sub:"Audio-Visual Hall & Parliamentary Library",schedule:"Friday • 3:30 – 5:00 PM",advisor:"Dr. S. Mukherjee",docket:"UNSC Draft Res. 14",color:"#7048e8"},
];

const fixtures = [
  {date:"FEB 28",tag:"Football Semi-Final",venue:"Turf Arena A",event:"School Team vs Ruby Lions",time:"3:45 PM Kick-off",status:"Roster Confirmed",color:"#087f5b"},
  {date:"MAR 04",tag:"Trophy Debate",venue:"Main Auditorium",event:"Parliamentary Debate",time:"2:15 PM",status:"Open Audience Seat",color:"#7048e8"},
  {date:"MAR 15",tag:"Major Championship",venue:"Olympic Track Complex",event:"62nd Annual Track & Field Athletics Meet",time:"8:30 AM Full Day",status:"Points Multiplier x2",color:"#d63333"},
];

const openClubs = [
  {name:"Astronomy & Space Club",desc:"Night sky observations with 4-inch Dobsonian telescopes and satellite telemetry tracking",filled:18,total:20},
  {name:"Eco-Warriors Environmental",desc:"Campus botanical audit and top-level water conservation, and hydroponics pilot project.",filled:18,total:25},
  {name:"Classical Music & Choir",desc:"Vocal ensemble; Indian classical raga and string orchestrations for annual Founder's Day.",filled:null,total:null,audition:true},
];

export default function Sports({ showToast }) {
  const [joinModal, setJoinModal] = useState(null);
  const [activeClub, setActiveClub] = useState(null);

  return (
    <div className="page-container">
      <div className="breadcrumb">Campus & Community &nbsp;›&nbsp; Sports & Extracurriculars</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Sports, Clubs & Extra-Curricular Activities</h1>
          <p className="page-subtitle">Track active club memberships, weekly field drills, upcoming school tournaments, and Aarav's points contribution to the school sports trophy.</p>
          <span className="badge-chip green" style={{marginTop:8,display:"inline-block"}}>TERM B SEASON</span>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Opening Sports Standings...")}>🏆 Sports Standings</button>
          <button className="green-button btn" onClick={()=>setJoinModal("new")}>+ Register for New Club</button>
        </div>
      </div>

      {/* Stats */}
      <div className="sports-stats-grid">
        <div className="sports-stat"><strong>3</strong><span>ACTIVE ENROLLED CLUBS</span><small>Robotics, Senior XI, Model UN</small></div>
        <div className="sports-stat green"><strong>+145<small style={{fontSize:12,fontWeight:400}}>PTS</small></strong><span>SPORTS MERIT</span><small>School Team &nbsp;<span className="badge-chip green">Rank #1</span></small></div>
        <div className="sports-stat"><strong>4<small style={{fontSize:12,fontWeight:400}}> Sessions</small></strong><span>WEEKLY DRILLS</span><small>Next: Cricket Nets Thu 4:0...</small></div>
        <div className="sports-stat"><strong>2<small style={{fontSize:12,fontWeight:400}}> Qualified</small></strong><span>ATHLETIC QUALIFIERS</span><small>100m Dash &nbsp; Long Jump</small></div>
      </div>

      <div className="sports-layout">
        {/* Left */}
        <div>
          {/* My Active Clubs */}
          <div style={{marginBottom:6,fontWeight:700,fontSize:15}}>🛡 My Active Clubs & Roles <span style={{fontSize:12,fontWeight:400,color:"#777"}}>Spring Academic Session 2025</span></div>
          {clubs.map(club=>(
            <div className="sports-club-card" key={club.name} onClick={()=>setActiveClub(club)}>
              <div className="sports-club-header">
                <div className="sports-club-icon">{club.name[0]}</div>
                <div style={{flex:1}}>
                  <h3 style={{fontSize:14,color:"#fff"}}>{club.name}</h3>
                  <span style={{background:"rgba(255,255,255,.2)",color:"#fff",borderRadius:6,padding:"2px 8px",fontSize:11,marginTop:4,display:"inline-block"}}>{club.role}</span>
                </div>
                <span className="badge-chip green" style={{background:"rgba(255,255,255,.2)",color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>{club.status}</span>
              </div>
              <div className="sports-club-body">
                <p style={{fontSize:12,color:"#777"}}>{club.sub}</p>
                <div className="sports-club-meta">
                  <span>📅 {club.schedule}</span>
                  {club.coach && <span>🎽 {club.coach}</span>}
                  {club.venue && <span>📍 {club.venue}</span>}
                  {club.nextMatch && <span style={{color:"var(--green)",fontWeight:600}}>NEXT INTER-SCHOOL MATCH: vs {club.nextMatch}</span>}
                  {club.advisor && <span>👤 {club.advisor}</span>}
                  {club.docket && <span>📋 Docket: {club.docket}</span>}
                </div>
              </div>
            </div>
          ))}

          {/* Upcoming Fixtures */}
          <div style={{marginTop:22,marginBottom:10,fontWeight:700,fontSize:15}}>📅 Upcoming Sports Fixtures & Meets
            <button className="link-btn" style={{marginLeft:12}} onClick={()=>showToast("Downloading Calendar.ics...")}>Download Calendar (.ics)</button>
          </div>
          {fixtures.map(f=>(
            <div key={f.event} className="sports-fixture" style={{borderLeftColor:f.color}}>
              <div className="sports-fixture-date-col">
                <span>{f.date.split(" ")[0]}</span>
                <strong>{f.date.split(" ")[1]}</strong>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                  <span className="notes-subject-tag" style={{background:f.color+"22",color:f.color,borderColor:f.color+"44"}}>{f.tag}</span>
                  <span style={{fontSize:11,color:"#777"}}>📍 {f.venue}</span>
                </div>
                <h3 style={{fontSize:14}}>{f.event}</h3>
                <div style={{display:"flex",gap:12,marginTop:6,flexWrap:"wrap"}}>
                  <span style={{fontSize:12,color:"#777"}}>⏰ {f.time}</span>
                  <span style={{fontSize:12,color:"var(--green)",fontWeight:600}}>● {f.status}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Available Open Clubs */}
          <div style={{marginTop:22,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h2 style={{fontSize:15}}>🌐 Available Open Clubs (Join Now)</h2>
              <span style={{fontSize:12,color:"#777"}}>Enrollment closes March 10</span>
            </div>
          </div>
          <div className="open-clubs-grid">
            {openClubs.map(c=>(
              <div className="open-club-card" key={c.name}>
                <div style={{fontSize:28,marginBottom:8}}>{c.name.includes("Astronomy")?"🔭":c.name.includes("Eco")?"🌿":"🎵"}</div>
                <h3 style={{fontSize:13}}>{c.name}</h3>
                <p style={{fontSize:12,color:"#777",marginTop:4,flex:1}}>{c.desc}</p>
                {c.filled && <p style={{fontSize:11,color:"#555",marginTop:8}}>{c.filled} / {c.total} Seats filled</p>}
                <button className={c.audition?"outline-btn btn":"green-button btn"} style={{marginTop:10,width:"100%",justifyContent:"center"}} onClick={()=>{setJoinModal(c.name);showToast(c.audition?`Requesting audition for ${c.name}...`:`Applying for ${c.name}...`)}}>
                  {c.audition?"Request Audition":"Apply for Seat"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Annual Trophy */}
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-heading compact"><h2 style={{fontSize:13}}>🏆 ANNUAL TROPHY</h2></div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>Annual Sports Cup 2025</div>
            {[{pos:"1",name:"School Team",pts:840,you:true,color:"var(--green)"},
              {pos:"2",name:"Ruby Lions",pts:815,color:"#d63333"},
              {pos:"3",name:"Sapphire Hawks",pts:790,color:"#1971c2"},
              {pos:"4",name:"Topaz Tigers",pts:750,color:"#e67700"},
            ].map(h=>(
              <div key={h.name} style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
                <span style={{fontWeight:700,fontSize:14,width:18,color:"#777"}}>{h.pos}</span>
                <div style={{width:10,height:10,borderRadius:"50%",background:h.color,flexShrink:0}}></div>
                <span style={{flex:1,fontSize:13,fontWeight:h.you?700:400}}>{h.name}{h.you&&<span className="badge-chip green" style={{marginLeft:6,fontSize:10}}>YOU</span>}</span>
                <strong style={{fontSize:13}}>{h.pts} pts</strong>
              </div>
            ))}
            <div className="team-progress" style={{marginTop:10}}><div style={{width:"60%"}}></div></div>
            <div style={{fontSize:11,color:"#777",marginTop:8}}>Aarav personal contribution: +145 pts</div>
            <div style={{marginTop:12}}>
              <div style={{fontSize:11,color:"#777",marginBottom:4}}>Point Distribution (840 Total)</div>
              {[["Athletics","240","var(--green)"],["Academics","310","#1971c2"],["Cultural","180","#e67700"],["Discipline","110","#7048e8"]].map(([cat,pts,c])=>(
                <div key={cat} style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                  <span><span style={{color:c}}>■</span> {cat}</span><strong>{pts}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty Notices */}
          <div className="panel" style={{marginBottom:14}}>
            <div className="panel-heading compact"><h2 style={{fontSize:13}}>🎓 Faculty & Coach Notices</h2><span className="badge-chip orange">2 New</span></div>
            {[{initials:"CR",name:"Coach Rawat",sub:"Director of Physical Education",note:"Compulsory fitness conditioning for all track finalists starting next Monday at 6:45 AM. Arrive in standardized PE spikes and track jacket.",time:"Today",color:"#087f5b"},
              {initials:"MK",name:"Mrs. Kulkarni",sub:"Cultural Coordinator",note:"Auditions for Founder's Day Drama production concludes this Friday in the Drama Studio. All student representatives must file delegate names by noon.",time:"Yesterday",color:"#7048e8"},
            ].map(f=>(
              <div key={f.name} style={{marginBottom:12,padding:"8px 0",borderBottom:"1px solid #eee"}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div style={{background:f.color,color:"#fff",borderRadius:"50%",width:30,height:30,display:"grid",placeItems:"center",fontSize:11,fontWeight:700}}>{f.initials}</div>
                  <div><strong style={{fontSize:12}}>{f.name}</strong><p style={{fontSize:11,color:"#777"}}>{f.sub}</p></div>
                  <span style={{marginLeft:"auto",fontSize:11,color:"#777"}}>{f.time}</span>
                </div>
                <p style={{fontSize:12,color:"#555",lineHeight:1.5,fontStyle:"italic"}}>"{f.note}"</p>
              </div>
            ))}
          </div>

          {/* Sports Pass */}
          <div className="panel" style={{background:"#f0fff8"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
              <span>🏟</span><div><strong style={{fontSize:13}}>OFFICIAL ERP</strong><p style={{fontSize:11,color:"#777"}}>Sports Pass & Kit Requisition</p></div>
            </div>
            <p style={{fontSize:12,color:"#555"}}>Download your signed varsity ground pass, bus late-stay slip, and sports equipment gate release vouchers.</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
              <button className="outline-btn btn" style={{justifyContent:"center"}} onClick={()=>showToast("Downloading Sports Pass...")}>⬇ Download Signed Sports Pass</button>
              <button className="green-button btn" style={{justifyContent:"center"}} onClick={()=>showToast("Opening Requisition Form...")}>📝 Submit Requisition Form</button>
            </div>
          </div>
        </div>
      </div>

      {/* Club Detail Modal */}
      {activeClub && (
        <div className="modal-overlay" onClick={()=>setActiveClub(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <h2>{activeClub.name}</h2>
              <button className="modal-close" onClick={()=>setActiveClub(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p><strong>Role:</strong> {activeClub.role}</p>
              <p><strong>Schedule:</strong> {activeClub.schedule}</p>
              {activeClub.coach && <p><strong>Coach:</strong> {activeClub.coach}</p>}
              {activeClub.venue && <p><strong>Venue:</strong> {activeClub.venue}</p>}
              {activeClub.nextMatch && <p><strong>Next Match:</strong> vs {activeClub.nextMatch}</p>}
              <div className="modal-actions">
                <button className="modal-btn-secondary" onClick={()=>setActiveClub(null)}>Close</button>
                <button className="modal-btn-primary" onClick={()=>{setActiveClub(null);showToast("✓ Event reminder set!");}}>Set Reminder</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
