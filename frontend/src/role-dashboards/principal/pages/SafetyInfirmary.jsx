export default function SafetyInfirmary() {
  const dispatchGrid = [
    { name: 'Whitefield East PS', type: 'Police', status: '2 km away', sub: 'Constable on post. Sandy (on patrol)', direct: '080-3945-0100', c: 'blue' },
    { name: 'Manipal Hospital', type: 'Hospital', status: '2.4 km away', sub: 'Priority pediatric wing equipped', direct: '080-4946-2225', c: 'red' },
    { name: 'Karnataka Fire & Rescue', type: 'Fire', status: 'Alert in 2.8 km', sub: 'Dual-tender machines. Direct key equipment to primary infrared retention (FSCA).', direct: '080-4946-9941 (Direct Utilised Line)', c: 'orange' },
    { name: 'Traffic Police Patrol', type: 'Police', status: 'Planning (900 mt)', sub: 'Responding 07 AM and Patrol, Full Escort and 24x7 duty check available', direct: '080-2094', c: 'blue' },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--red-light)', color: 'var(--red)' }}>📍 Live Standard SLA • Inter-Agency CBSE Section 13</span>
        <span style={{ color: 'var(--gray-500)', marginLeft: 'auto' }}>Overview 02:46:01</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Campus Safety, Perimeter & Inter-Agency Command</h1>
              <p className="page-title-sub">Supervisory cockpit for Perimeter Defense, real-time telemetry, controlled gate monitoring, campus medical command, compliance standards, and direct dispatch links to Whitefield Emergency Management Agency</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-red">🚨 Trigger Lockdown Link</button>
              <button className="btn btn-orange">📢 Broadcast All-Hands Alert</button>
              <button className="btn btn-outline">✅ SOP Compliance</button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Perimeter Security</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>4<span style={{ fontSize: 16 }}>/4</span></div>
            <div className="stat-badge stat-badge-green">Terminal: 1. Bus Gate</div>
            <div className="stat-sub">Duty — Main Manually</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">ICU Plant Reach</div>
            <div className="stat-value">KA-01-G-9901</div>
            <div className="stat-sub">Driver: Tia — Main Manual</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Fire & Pressure</div>
            <div className="stat-value">7.5<span style={{ fontSize: 14 }}> bar avg</span></div>
            <div className="stat-badge stat-badge-green">NOC Value: Normal</div>
            <div className="stat-sub">18 Block Pumps • 3 nodes</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Campus Security Force</div>
            <div className="stat-value">16<span style={{ fontSize: 16 }}>/16</span></div>
            <div className="stat-badge stat-badge-green">100% Fully Duty</div>
            <div className="stat-sub">15 on-sector • 8 Substitution Patrol</div>
          </div>
        </div>

        {/* Dispatch Grid */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Priority Municipal Inter-Agency Dispatch Grid</div>
              <div className="card-subtitle">One-Touch Inter-Agency Dispatch Grid: Real-time Dispatch contact connections</div>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-green">Encrypted VOIP & Cell Traffic Needs</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {dispatchGrid.map((d, i) => (
              <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 10, padding: 12, borderTop: `3px solid ${d.c === 'blue' ? 'var(--blue)' : d.c === 'red' ? 'var(--red)' : 'var(--orange)'}` }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{d.name}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: d.c === 'blue' ? 'var(--blue)' : d.c === 'red' ? 'var(--red)' : 'var(--orange)', marginBottom: 4 }}>{d.status}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 8 }}>{d.sub}</div>
                <button className={`btn btn-sm w-full ${d.c === 'red' ? 'btn-red' : d.c === 'orange' ? 'btn-orange' : 'btn-blue'}`}>
                  📞 {d.direct}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-2">
          <div>
            {/* Perimeter Gates */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Visual Telemetry — Perimeter Gates & ANPR Telemetry</div>
                <span className="badge badge-green">24/7 Open Nodes: Active</span>
              </div>
              {[
                { name: 'Gate 1: Main Concourse & Turnstiles', fps: '45+41 stream', lcy: '3.1ms', status: 'PRC+LVK: 21,095 IN', note: 'Visitor Logged: In 0 Violations, Speed Check Throughput 42Gb/s – Maximum Marne 99.8% Quasi' },
                { name: 'Gate 3: Bus Terminal Bay', fps: 'CEM_34', note: '34 of 38 buses: Parked, Co-Guarded', status: 'Active', infra: '8 Infrapoints' },
              ].map((g, i) => (
                <div key={i} style={{ background: 'var(--gray-900)', borderRadius: 8, padding: 12, marginBottom: 8 }}>
                  <div style={{ color: '#4ade80', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{g.name}</div>
                  {g.fps && <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>FPS: {g.fps}</div>}
                  {g.lcy && <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>Latency: {g.lcy}</div>}
                  <div style={{ color: '#e2e8f0', fontSize: 10, marginBottom: 6 }}>{g.status}</div>
                  <div style={{ color: '#94a3b8', fontSize: 10 }}>{g.note}</div>
                  {g.infra && <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 4 }}>Perimeter/Infrared Mesh — {g.infra} hotspots</div>}
                </div>
              ))}
            </div>

            {/* Emergency Evacuation */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Emergency Evacuation Logistics & Wardens</div>
              </div>
              {[
                { name: 'Primary Sports Oval', sub: 'Assembly Point ALPHA', cap: 'Primary capacity: 1,000 students', warden: 'Mr. Rajesh Block (Block A, Floor VAFC)', detail: 'Drill Access Direct: North Students 1 & 8', c: 'green' },
                { name: 'Senior Tennis Lawn & Quad', sub: 'Reserve Point BRAVO', cap: '850 students', warden: 'Mrs. Laxmi Stores (Adviser)', detail: 'Drill Access Direct: Prime of Emergency Tern Directions', c: 'blue' },
                { name: 'Campus Horn & Siren Network', sub: 'Across PN Network', cap: '100% Clarity', warden: 'Monitoring Diagnostic form FMSG9', detail: 'Warning Diagnostic Diagnostics Theme: Active', c: 'orange' },
              ].map((e, i) => (
                <div key={i} style={{ padding: 10, border: '1px solid var(--gray-200)', borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${e.c === 'green' ? 'var(--green)' : e.c === 'blue' ? 'var(--blue)' : 'var(--orange)'}` }}>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{e.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 1 }}>{e.sub}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>{e.cap}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{e.detail}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 4 }}>Warden: {e.warden}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Healthcare Command */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Healthcare Command — Central Infirmary Station</div>
                <span className="badge badge-orange">Nurse Status: (Shift On)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div style={{ padding: 10, background: 'var(--gray-50)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Beds in Use</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>2 in 6 Total</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 4 }}>65% Available</div>
                </div>
                <div style={{ padding: 10, background: 'var(--green-light)', borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: 'var(--green-dark)' }}>Action Care Registry</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)', marginTop: 4 }}>2 Junior Observation</div>
                </div>
              </div>
              {[
                { init: 'AN', name: 'Aarav Nair (Gr 8-B)', dx: 'Cough + Temperature', note: 'Obs 79.8%', c: 'orange' },
                { init: 'PV', name: 'Pooja Venkatesh (Gr 11-A)', dx: 'Anaemia — Iron low (Infirmary note: Stable)', note: 'Infirmary', c: 'blue' },
                { init: 'AED', name: 'Automated Ext Defibrillator (Pool-Field: Aux)', dx: 'Blue Hub Russ HUFS & Sports Complex IFA of H. Appendix 3, Service B to the installed at 12-99', note: 'Installed', c: 'green' },
              ].map((p, i) => (
                <div key={i} style={{ padding: '8px 10px', border: '1px solid var(--gray-100)', borderRadius: 8, marginBottom: 6 }}>
                  <div className="flex items-center gap-2">
                    <div className="avatar" style={{ width: 26, height: 26, fontSize: 9, background: p.c === 'orange' ? 'var(--orange-light)' : p.c === 'blue' ? 'var(--blue-light)' : 'var(--green-light)', color: p.c === 'orange' ? 'var(--orange)' : p.c === 'blue' ? 'var(--blue)' : 'var(--green-dark)' }}>{p.init}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 11 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{p.dx}</div>
                    </div>
                    <span className={`badge ${p.c === 'orange' ? 'badge-orange' : p.c === 'blue' ? 'badge-blue' : 'badge-green'}`}>{p.note}</span>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <button className="btn btn-blue btn-sm">Send Vitals to Manipal</button>
                <button className="btn btn-outline btn-sm">Parent SMS Dispatch</button>
              </div>
            </div>

            {/* Disaster Protocols */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Standard Operating Guidelines — CBSE School Disaster Management Protocols (DM-104)</div>
              </div>
              {[
                { num: 1, title: 'Immediate Lockdown Protocol', detail: 'Principals confirmed order activates campus gates. Intercom annunciation system, window/door lockdown, and all students must be identified and confirmed to the nearest emergency sector. Teachers are the principal classroom security officers in their classroom.' },
                { num: 2, title: 'Hydrant & Gas Cut-Off', detail: 'Evacuations activated by Chemistry storey on School entry 2 ground floor, with lab secured at two specific points Hydrant flow triggers in all lab classes and main section. All science practical labs immediately drained and power cut.' },
                { num: 3, title: 'Paramedic Link & Parent Contact', detail: 'Emergency corridor is confirmed for (all parents within 20-30-90 minutes) and CBSE Section A-02 Section B-12 standard notified the critical CBSE area first responder and the principal dispatches safety response to 4 critical districts.' },
              ].map((p, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{p.num}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-600)', lineHeight: 1.5 }}>{p.detail}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 8, padding: 8, background: 'var(--gray-50)', borderRadius: 6 }}>
                📌 Inspected & Signed by Whitefield Fire Warden
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
