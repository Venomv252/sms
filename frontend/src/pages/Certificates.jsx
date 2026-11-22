import React, { useState } from "react";

const certificates = [
  {type:"Featured",title:"CBSE National Science & Innovation Fair — 1st Runner Up",issuer:"CBSE National Board",date:"Jan 18, 2025",hash:"0x7F82d6B902A7...Au...",verified:true,gold:true},
  {type:"List",title:"State Rank #4 — Regional Mathematics Olympiad (RMO)",issuer:"State Maths Council",date:"Nov 12, 2024"},
  {type:"List",title:"Gold Medalist — Athletics Championship — 4...",issuer:"Greenwood High Athletics",date:"Oct 28, 2024"},
  {type:"List",title:"Diplomatic Citation — All-India Inter-School Model UN — Com...",issuer:"Federation of Schools",date:"Aug 19, 2024"},
];

const documents = [
  {name:"Bonafide Student Certificate",desc:"Per CG-19/Char • Active + Enrollment Stamp",cycle:"AY 2024–25 (Grade 10-B)",status:"Active Validated"},
  {name:"Medium of Instruction Certificate",desc:"Affirm. 210A English curriculum for foreign activity with exam scores",cycle:"Perpetual (Grades 1–10)",status:"Active Validated"},
  {name:"Study & Conduct Attestation",desc:"Signed by Homemaker + Institutional Character (Grade A+)",cycle:"Mid-Term II 2024",status:"Active Validated"},
  {name:"Medical & Physical Fitness Clearance",desc:"Dr. Sarah Jones, MD — Carnival & Primary Head HealthBoard",cycle:"Valid till May 2025",status:"Annual Clearance"},
];

export default function Certificates({ showToast }) {
  const [activeTab, setActiveTab] = useState("Featured Honors");
  const tabs = ["Featured Honors","Institutional Documents","Digital Badges"];

  return (
    <div className="page-container">
      <div className="breadcrumb">ASSESSMENTS & RECORDS &nbsp;›&nbsp; CERTIFICATES & CO-CURRICULAR ACCREDITATIONS</div>
      <div className="page-header-row" style={{flexWrap:"wrap",gap:14}}>
        <div>
          <h1 className="page-title">Certificates & Student Honors Portfolio</h1>
          <p className="page-subtitle">Verifiable credentials, merit awards, club commendations, and digital badges authenticated by Greenwood High's Registrar & Academic Senate.</p>
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <button className="outline-btn btn" onClick={()=>showToast("Opening Bonafide/Transfer request...")}>📄 Request Bonafide / Transfer</button>
          <button className="green-button btn" onClick={()=>showToast("Exporting Digital Portfolio PDF...")}>⬇ Export Digital Portfolio (PDF)</button>
        </div>
      </div>

      {/* Stats */}
      <div className="cert-stats-grid">
        <div className="cert-stat"><span className="cert-stat-icon">✓</span><strong>14</strong><span>Total Issued Certificates</span><small>All 100% Cryptographically Signed</small></div>
        <div className="cert-stat"><span className="cert-stat-icon">⭐</span><strong>6<small style={{fontSize:12,fontWeight:400}}> Honors</small></strong><span>Academic Commendations</span><small>CBSE in-course • Math Olympiad • Science Fair</small></div>
        <div className="cert-stat"><span className="cert-stat-icon">🏅</span><strong>+120</strong><span>Activity Points</span><small>5 Citations, 4 in x100m in Relay, 1 Track Gold</small></div>
        <div className="cert-stat"><span className="cert-stat-icon">✉️</span><strong>3<small style={{fontSize:12,fontWeight:400}}> Letters</small></strong><span>Leadership Credentials</span><small>Vice Captain • Vice Lead Stringes</small></div>
      </div>

      {/* Tabs */}
      <div className="hw-tabs">
        {tabs.map(t=><button key={t} className={`hw-tab${activeTab===t?" active":""}`} onClick={()=>setActiveTab(t)}>{t}</button>)}
      </div>

      <div className="cert-layout">
        {/* Left */}
        <div>
          {activeTab==="Featured Honors" && (
            <>
              <div style={{marginBottom:8,fontWeight:600,fontSize:14}}>🏆 Featured Honors & Verifiable Certificates <span style={{fontSize:12,fontWeight:400,color:"#777"}}>Sorted by Recency</span></div>
              {/* Featured card */}
              <div className="cert-featured-card">
                <div className="cert-school-seal">
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:".05em",marginBottom:4}}>GREENWOOD HIGH</div>
                  <div style={{fontSize:28}}>🏅</div>
                  <div style={{fontSize:8,marginTop:4,opacity:.8}}>HONORARY CITATION</div>
                  <div style={{fontSize:8,opacity:.7}}>NATIONAL LEVEL</div>
                  <div style={{fontSize:8,opacity:.7}}>1ST RUNNER UP</div>
                </div>
                <div className="cert-featured-info">
                  <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                    <span className="badge-chip gold">Gold Citation</span>
                    <span className="badge-chip" style={{background:"rgba(255,255,255,.2)",color:"#fff"}}>CBSE National Board</span>
                  </div>
                  <div style={{fontSize:11,opacity:.7}}>🗓 Jan 18, 2025</div>
                  <h3 style={{fontSize:16,margin:"8px 0",color:"#fff",lineHeight:1.3}}>CBSE National Science & Innovation Fair — 1st Runner Up</h3>
                  <p style={{fontSize:12,opacity:.85,lineHeight:1.6}}>Awarded for excellence in mapping electrochemistry and solar thermal storage...</p>
                  <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap",alignItems:"center"}}>
                    <span className="badge-chip green" style={{background:"rgba(255,255,255,.15)",color:"#fff"}}>Ledger Hash</span>
                    <span style={{fontSize:11,opacity:.7,fontFamily:"monospace"}}>0x7F82d6B902A7...Au...</span>
                    <span style={{fontSize:10,opacity:.6}}>• Immutable</span>
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:14,flexWrap:"wrap"}}>
                    <button className="outline-btn btn" style={{borderColor:"rgba(255,255,255,.4)",color:"#fff",background:"rgba(255,255,255,.15)"}} onClick={()=>showToast("Downloading High-Res PDF...")}>⬇ Download High-Res PDF</button>
                    <button className="outline-btn btn" style={{borderColor:"rgba(255,255,255,.3)",color:"#fff",background:"rgba(255,255,255,.1)"}} onClick={()=>showToast("Sharing credential link...")}>↗ Share Credential Link</button>
                  </div>
                  <div style={{fontSize:11,opacity:.6,marginTop:8}}>PEER/TEMPORAL: Dr. Arslan Finch ✓</div>
                </div>
              </div>
              {/* List items */}
              {certificates.slice(1).map((c,i)=>(
                <div key={i} className="cert-list-item">
                  <span style={{fontSize:20}}>{i===0?"📊":i===1?"🏅":"🌍"}</span>
                  <div style={{flex:1}}>
                    <strong style={{fontSize:13}}>{c.title}</strong>
                    <p style={{fontSize:11,color:"#777",marginTop:2}}>Issued: {c.date} &nbsp;• &nbsp;{c.issuer}</p>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="outline-btn btn" style={{fontSize:12}} onClick={()=>showToast(`Viewing ${c.title}...`)}>View</button>
                    <button className="outline-btn btn" style={{fontSize:12}} onClick={()=>showToast(`Downloading ${c.title}...`)}>⬇</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab==="Institutional Documents" && (
            <>
              <div style={{marginBottom:14,fontWeight:600,fontSize:14}}>📄 Institutional Documents & Attestations</div>
              <div style={{background:"#dff9ef",borderRadius:8,padding:"8px 12px",marginBottom:16,fontSize:12,color:"#087f5b"}}>All 4 Certified by Registrar</div>
              {documents.map((d,i)=>(
                <div key={i} className="cert-list-item">
                  <span style={{fontSize:24}}>📋</span>
                  <div style={{flex:1}}>
                    <strong style={{fontSize:13}}>{d.name}</strong>
                    <p style={{fontSize:11,color:"#777",marginTop:2}}>{d.desc}</p>
                    <p style={{fontSize:11,color:"#555",marginTop:2}}>{d.cycle}</p>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                    <span className="badge-chip green">{d.status}</span>
                    <button className="outline-btn btn" style={{fontSize:12}} onClick={()=>showToast(`Downloading ${d.name}...`)}>+ PDF</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab==="Digital Badges" && (
            <div className="panel">
              <h2 style={{fontSize:15,marginBottom:16}}>🎖 Digital Badges Unlocked</h2>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[{icon:"⭐",name:"Top 5% Scholar",sub:"AY 24-25 (All Cohort)"},{icon:"💻",name:"Code Guild Master",sub:"Ranked top in Algorithms"},{icon:"🛡",name:"Student Leader",sub:"Elected Captain"},{icon:"🏃",name:"Zero Absence Sprint",sub:"Term II – 0 unexcused days"},{icon:"👥",name:"Peer Mentor – Grade 9 Math",sub:"10 issues completed under Ac..."}].map(b=>(
                  <div key={b.name} style={{background:"#f4f4ff",borderRadius:12,padding:14,textAlign:"center",cursor:"pointer"}} onClick={()=>showToast(`Badge: ${b.name}`)}>
                    <div style={{fontSize:28,marginBottom:8}}>{b.icon}</div>
                    <strong style={{fontSize:12}}>{b.name}</strong>
                    <p style={{fontSize:10,color:"#777",marginTop:3}}>{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div>
          <div className="panel" style={{marginBottom:14}}>
            <div style={{display:"flex",gap:8,marginBottom:6,flexWrap:"wrap"}}>
              <span style={{fontWeight:700,fontSize:13}}>🔐 Tamper-Proof Verification</span>
              <span className="badge-chip green">Live</span>
            </div>
            <div style={{background:"#f4f4f4",borderRadius:10,height:120,display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0"}}>
              <div style={{textAlign:"center"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(6,14px)",gap:2,margin:"0 auto 8px"}}>
                  {Array(36).fill(0).map((_,i)=><div key={i} style={{width:14,height:14,background:Math.random()>0.5?"#087f5b":"transparent",borderRadius:2}}></div>)}
                </div>
                <small style={{fontSize:10,color:"#777"}}>QR</small>
              </div>
            </div>
            <p style={{fontSize:11,color:"#777"}}>Scan to Verify Authenticity. Admissions offices & embassies may verify this portfolio at:</p>
            <a href="#" style={{fontSize:11,color:"var(--green)"}}>greenwood.ed/verify/...</a>
          </div>

          <div className="panel" style={{marginBottom:14}}>
            <h3 style={{fontSize:13,marginBottom:12}}>📝 Request New Certificate</h3>
            <p style={{fontSize:12,color:"#777",marginBottom:10}}>Processed and tagged by Greenwood High within 48 business hours.</p>
            {["Character & Conduct Certificate","Predicted Grades (Transcript)","Passport / Visa Bonafide"].map((c,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #f0f0f0",fontSize:12}}>
                <span>{c}</span>
                <button className="outline-btn btn" style={{fontSize:11}} onClick={()=>showToast(`Requesting ${c}...`)}>Request</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
