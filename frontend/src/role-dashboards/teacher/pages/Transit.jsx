import React from 'react'
import { Download, Radio, Send, AlertTriangle, CheckCircle, MapPin, Bus, Navigation } from 'lucide-react'

const routes = [
  {
    num: '14', name: 'Whitefield Express Corridor',
    reg: 'KA-01-M9-4401 · 36 Seater Richter Starline',
    driver: 'Driver: Mr. Ramesh Babu · #91 60 12 2204',
    manifest: '14 / 14 Checked-In · #12 Manifest',
    stop: 'Hope Farm Junction',
    eta: '08:08 AM', delay: true, delayMin: '+12', parents: 14,
    status: 'En Route', badge: 'badge-red',
    fuelGauge: '(127.10 km)'
  },
  {
    num: '08', name: 'Central Express · Indiranagar',
    reg: 'KA-05-NM-4022 · Driven by Mr. Gurumurthy K. (#91480 31032)',
    driver: '',
    manifest: 'All 8 Homeroom riders deboarded & Turnstile tapped (07:44.9M)',
    stop: 'Bay: Terminal Bay 3 (South Gate)',
    eta: '03:15 PM', delay: false,
    status: 'At Campus', badge: 'badge-green'
  },
  {
    num: '12', name: 'North Ring · Koramangala / Ring Rd',
    reg: 'KA-01-HB-8920 · Driven by Mr. S. Anthony (#919740 882 91)',
    driver: '',
    manifest: 'Arrived 07:48 AM · 6 Homeroom Riders safely in Homeroom',
    stop: 'Koramangala · Ring Rd',
    eta: '', delay: false,
    status: 'At Campus', badge: 'badge-green'
  },
]

const specialPasses = [
  {
    initials: 'AS', name: 'Aarav Sharma', roll: '#10B-01',
    type: 'Today 02:00',
    note: 'Normal Bus: B14',
    reason: 'Guardian identity & transit change authorization requiring Dr. Evans digital clearance.',
    extra: 'Late Departure · Medical Evaluation · Authorized Doctor: Dr. Rajesh Sharma (Father) · (92-pre-verified insurance papers)',
    color: 'av-green'
  },
  {
    initials: 'CL', name: 'Chloe Lawrence', roll: '#10B-16',
    type: 'Evening Route Switch',
    note: 'Normal Bus: #58',
    reason: 'Temporary Switch to Route #22. After-school Robotics Lab at 04:39 PM. Drop Point: HS Sector 2 Water Tank. Notify Informed.',
    extra: '',
    color: 'av-blue'
  },
]

const commuters = [
  { roll: '01', name: 'Aarav Sharma', mode: 'School Bus', route: 'Route #14 (Whitefield)', rfidTap: '07:18 AM (Bus Tap)', dismissal: 'Bay 4 (Special Exit)', contact: 'Dr. Rajesh Sharma · 12348', commute: 'En Route', tag: 'badge-red', delayed: true },
  { roll: '02', name: 'Tanmay Verma', mode: 'School Bus', route: 'Route #14 (Whitefield)', rfidTap: '07:27 AM (Bus Tap)', dismissal: 'Bay 4 (Parmit)', contact: 'Sunita Verma · 56421', commute: 'En Route', tag: 'badge-red', delayed: true },
  { roll: '09', name: 'Rohan Varma', mode: 'Private Drop', route: 'N/A (Self Carpool) West Gate', rfidTap: '08:06 AM (Tardy Gate)', dismissal: 'Porch 2', contact: 'Vikram Varma · 11002', commute: 'Safety Arrived', tag: 'badge-green' },
  { roll: '14', name: 'Chloe Lawrence', mode: 'School Bus', route: 'Route #08 (Indiranagar)', rfidTap: '07:44 AM (Turnstile)', dismissal: 'Bay 3 + Bay 6', contact: 'Morning · 79724', commute: 'Safety Arrived', tag: 'badge-green' },
  { roll: '18', name: 'Diya Nair', mode: 'School Bus', route: 'Route #12 (North Ring)', rfidTap: '07:47 AM', dismissal: 'Bay 1', contact: 'Anand Nair · 08292', commute: 'Safety Arrived', tag: 'badge-green' },
  { roll: '25', name: 'Zoya Akhtar', mode: 'Walker', route: 'Greenwood Residency Zone 25 East Pedestrian Gate 1', rfidTap: '07:58 AM (Elast Turnstile)', dismissal: 'Gate 1', contact: 'Farhan Akhtar · 99812', commute: 'Safety Arrived', tag: 'badge-green' },
]

export default function Transit() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Communication &amp; Admin</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Homeroom Transit &amp; Student Fleet Logistics</span>
        <span className="badge badge-yellow" style={{ marginLeft: 6 }}>TRANSIT COMMAND</span>
        <span className="badge badge-green" style={{ marginLeft: 4 }}>● Live GPS Telemetry Active</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Homeroom Transit &amp; Student Fleet Logistics</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Real-time school bus GPS telematics, student transit manifests, morning arrival/departure check-in logs, and guardian pickup authorizations for Grade 10-B.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Radio size={13} /> Live Fleet Radar</button>
          <button className="btn btn-outline btn-sm"><Send size={13} /> Broadcast Route Delay SMS</button>
          <button className="btn btn-primary btn-sm"><Download size={13} /> Export Manifest (CSV)</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Commute Census</div>
          <div className="stat-value">42</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Enrolled Students</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>28 Bus · 12 Guardian · 2 Walkers</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Allocated Routes</div>
          <div className="stat-value">4</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Active Homeroom Corridors</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>#14 Whitefield · #08 Central ·</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Arrival Punctuality</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>98.5%</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>On-Time</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Mon gate crossed by 07:50</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Telematics Warning</div>
          <div className="stat-value" style={{ color: '#dc2626', fontSize: 28 }}>+12m</div>
          <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>Route #14 Whitefield</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Metro works corridor: Revised</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Live Bus Telematics */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <Bus size={15} style={{ display: 'inline', marginRight: 6, color: '#16a34a' }} />
                  Live Bus Fleet Telematics
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Auto-syncs every 15s via AIS-140 GPS</div>
              </div>
            </div>
            {routes.map((r, i) => (
              <div key={i} style={{
                border: `1px solid ${r.delay ? '#fca5a5' : '#e2e8f0'}`,
                borderRadius: 8, padding: 14, marginBottom: 10,
                background: r.delay ? '#fff5f5' : 'white'
              }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{
                    width: 44, height: 44, background: r.delay ? '#dc2626' : '#16a34a',
                    borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: 12, flexShrink: 0, textAlign: 'center', lineHeight: 1.2
                  }}>BUS<br />{r.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{r.reg}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span className={`badge ${r.badge}`}>{r.status}</span>
                    {r.delay && <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 700, marginTop: 2 }}>Delay {r.delayMin} min</div>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#64748b', marginBottom: r.delay ? 8 : 0 }}>
                  {r.driver && <span><span style={{ fontWeight: 600 }}>👤</span> {r.driver}</span>}
                  <span><span style={{ fontWeight: 600 }}>📋</span> {r.manifest}</span>
                  <span><Navigation size={11} style={{ display: 'inline', marginRight: 3, color: '#94a3b8' }} />{r.stop}</span>
                  {r.eta && <span style={{ fontWeight: 700, color: r.delay ? '#dc2626' : '#374151' }}>🕐 ETA: {r.eta}</span>}
                </div>
                {r.delay && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button className="btn btn-danger btn-sm"><AlertTriangle size={12} /> Notify {r.parents} Parents</button>
                    <button className="btn btn-outline btn-sm"><Send size={12} /> Send SMS Update</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Commuter Roster */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Grade 10-B Student Commuter Roster &amp; Tap-In Ledger</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Cross-referencing processed 91 Enrollment with Campus Main Gate Turnstiles for: Date: Today, 14 Nov 2024</div>
              </div>
              <div className="flex gap-2">
                {['All (42)', 'Bus Commuters (28)', 'Guardian Pickup (12)'].map((t, i) => (
                  <button key={i} className={`chip${i === 0 ? ' active' : ''}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ROLL &amp; STUDENT</th>
                    <th>TRANSIT MODE</th>
                    <th>ASSIGNED CORRIDOR &amp; STOP</th>
                    <th>MORNING RFID TAP</th>
                    <th>DISMISSAL BAY</th>
                    <th>EMERGENCY CONTACT</th>
                    <th>COMMUTE STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {commuters.map((c, i) => (
                    <tr key={i} style={{ background: c.delayed ? '#fff8f5' : 'white' }}>
                      <td style={{ fontWeight: 700, fontSize: 12 }}>
                        {String(c.roll).padStart(2, '0')}
                        <div style={{ fontWeight: 400, color: '#64748b', fontSize: 12 }}>{c.name}</div>
                      </td>
                      <td>
                        <span className="badge badge-blue">
                          {c.mode === 'Walker' ? '🚶' : c.mode === 'Private Drop' ? '🚗' : '🚌'} {c.mode}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: '#64748b', maxWidth: 150 }}>{c.route}</td>
                      <td style={{ fontSize: 12 }}>
                        {c.delayed
                          ? <span style={{ color: '#f59e0b', fontWeight: 600 }}>{c.rfidTap}</span>
                          : c.rfidTap
                        }
                      </td>
                      <td style={{ fontSize: 12 }}>{c.dismissal}</td>
                      <td style={{ fontSize: 11, color: '#64748b' }}>{c.contact}</td>
                      <td>
                        <span className={`badge ${c.tag}`}>
                          {c.tag === 'badge-red' ? '🔴' : '✅'} {c.commute}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>Showing 6 of 42 Homeroom Commuters · 14 Onboard delayed Route #14</span>
              <div className="pagination">
                <button>Previous</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Special Pickup Passes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔑 Special Pickup Passes</div>
              <span className="badge badge-yellow">2 Pending</span>
            </div>
            {specialPasses.map((p, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 10, background: '#fafafa' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                  <div className={`avatar ${p.color}`} style={{ width: 34, height: 34, flexShrink: 0 }}>{p.initials}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{p.roll} · {p.type}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>Normal Bus: {p.note}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#374151', marginBottom: 6, lineHeight: 1.5 }}>{p.reason}</div>
                {p.extra && <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, lineHeight: 1.4 }}>{p.extra}</div>}
                <button className="btn btn-primary btn-sm w-full">Approve Pass</button>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full">Approve Pass ✕</button>
          </div>

          {/* Security Contact */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Security Chief / Main Gate Post</div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="avatar av-blue" style={{ width: 36, height: 36 }}>BM</div>
              <div style={{ fontSize: 13 }}>
                <div style={{ fontWeight: 700 }}>Ext: 137 · Officer Balaji M.</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>+91 99022-64325</div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm w-full mt-3">📞 Call Security</button>
          </div>

          {/* Quick SMS */}
          <div className="card" style={{ background: '#fff5f5', border: '1px solid #fca5a5' }}>
            <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: 6 }}>⚠ Route #14 Delay Active</div>
            <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 8 }}>Metro works corridor · Revised ETA 08:08 AM · +12min</div>
            <button className="btn btn-danger btn-sm w-full">
              <Send size={12} /> Broadcast Delay SMS to 14 Parents
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
