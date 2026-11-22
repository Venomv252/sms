import React, { useState } from 'react'
import { Calendar, RefreshCw, Printer, AlertTriangle, CheckCircle, Wrench, Plus, Download } from 'lucide-react'

const periods = [
  { per: 'PER 1', time: '08:00', subject: 'Grade 10-B Homeroom', tag: 'Daily Advisory', detail: 'Rm 204 (Wing) · Roll Call, Gazette Read & Morning Assembly Sync', color: '#16a34a', status: 'done' },
  { per: 'PER 2', time: '08:50', subject: 'Grade 10-B Physics', tag: 'Live Next', detail: 'Rm 204 · Theory: Faraday\'s Law & Electromagnetic Induction', color: '#3b82f6', status: 'live' },
  { per: 'PER 3-4', time: '09:45', subject: 'Grade 12-A Practical Lab', tag: '90 Min Block', detail: 'Science Wing Lab 2 · Optics Bench: Focal Length of Convex Lens & Parallax Meth...', color: '#7c3aed', status: 'upcoming' },
  { per: '', time: '11:15', subject: 'Recess & Faculty Morning Tea', tag: '', detail: '30 Minutes · Common Lounge', color: '#94a3b8', status: 'break' },
  { per: 'PER 5', time: '11:45', subject: 'Academic Planning & Free Prep', tag: 'Non-Contact', detail: 'Faculty Common Room (Desk #14) · Curriculum Term Exam Moderation & Grading', color: '#f59e0b', status: 'upcoming' },
  { per: 'PER 6', time: '01:15', subject: 'Remedial Clinic / Problem Solving', tag: 'Small Group', detail: 'Tutorial Room 3 · Selected Cohort (8 Students) · Kinematics & Vectors Review', color: '#ea580c', status: 'upcoming' },
  { per: 'PER 7', time: '02:15', subject: 'Science Olympiad Club Mentorship', tag: 'Co-Curricular', detail: 'AV Room 2 · National Physics Olympiad (NSEP) Problem Set 4 · Resource Dock', color: '#0d9488', status: 'upcoming' },
]

const rooms = [
  { name: 'Rm 204 (Lecture)', status: 'In Use', detail: 'Assigned: Dr. Alistair Evans · SmartBoard & Audio Synced', capacity: 'Capacity: 40 seats · Period 1 & 2' },
  { name: 'Sci-Wing Lab 2', status: 'Reserved', detail: 'Optics Bench Practical Session · Lab Asst: Mr. K. Rao', capacity: 'Capacity: 36 Benches · Period 3 & 4' },
  { name: 'Tutorial Room 3', status: 'Vacant Now', detail: 'Scheduled for Remedials – Circular Table Layout', capacity: 'Capacity: 12 seats · Period 6' },
]

const roomColors = {
  'In Use': { border: '#fca5a5', bg: '#fff5f5', badge: 'badge-red' },
  'Reserved': { border: '#fcd34d', bg: '#fffbeb', badge: 'badge-yellow' },
  'Vacant Now': { border: '#86efac', bg: '#f0fdf4', badge: 'badge-green' },
}

export default function Schedule() {
  const [dayTab, setDayTab] = useState('Wednesday (Today)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Overview</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Teacher Class Schedule</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Faculty Master Routine &amp; Lab Allocation</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Weekly teaching load, practical lab allocations, invigilation duties, and proxy relief roster for Academic Term II.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><RefreshCw size={13} /> Sync Calendar</button>
          <button className="btn btn-outline btn-sm">Request Proxy Relief</button>
          <button className="btn btn-primary btn-sm"><Printer size={13} /> Print Routine (PDF)</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Active Teaching Load</div>
          <div className="stat-value">26<span style={{ fontSize: 14, color: '#64748b' }}>/30</span></div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Periods</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '86.7%' }} /></div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>86.7% Allocated · 4 Free/Prep slots</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Today's Schedule</div>
          <div className="stat-value">5</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Periods Today · 3 Theory · 2 Labs</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Period 2 next (08:50) · Term II Week 9</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lab Workstations</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Sci-Wing Lab 2</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <span className="badge badge-green" style={{ fontSize: 10 }}>● Verified</span>
            <span className="badge badge-green" style={{ fontSize: 10 }}>&amp; Ready</span>
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Senior Optics Bench · Periods 3 &amp; 4</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Proxy &amp; Standby Duty</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>None Today</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Clear ledger for Wednesday</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Next: Fri Period 6 · Standby Roster</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Master Routine Matrix */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Master Routine Matrix</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Central Academic Board · Timetable v4.2</div>
              </div>
              <div className="flex gap-2">
                {['All Week', 'Wednesday (Today)', 'Thursday'].map((d) => (
                  <button key={d} className={`btn btn-sm ${dayTab === d ? 'btn-primary' : 'btn-outline'}`} onClick={() => setDayTab(d)}>{d}</button>
                ))}
              </div>
            </div>

            {periods.map((p, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, alignItems: 'center', padding: '11px 10px',
                borderBottom: i < periods.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: p.status === 'live' ? '#f0fdf4' : 'transparent',
                borderRadius: p.status === 'live' ? 8 : 0,
                marginBottom: p.status === 'live' ? 2 : 0,
              }}>
                {/* Period badge */}
                <div style={{ width: 50, flexShrink: 0 }}>
                  {p.per && (
                    <div style={{
                      background: p.color, color: 'white', borderRadius: 6,
                      padding: '4px 6px', fontSize: 10, fontWeight: 700, textAlign: 'center'
                    }}>{p.per}</div>
                  )}
                </div>
                {/* Time */}
                <div style={{ width: 48, flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.time}</div>
                </div>
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{p.subject}</span>
                    {p.tag && (
                      <span className={`badge ${p.status === 'live' ? 'badge-green' : p.status === 'done' ? 'badge-gray' : 'badge-blue'}`}>{p.tag}</span>
                    )}
                    {p.status === 'live' && <span className="badge badge-red">● Live Next</span>}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{p.detail}</div>
                </div>
                {p.status === 'live' && (
                  <button className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>Lesson Plan</button>
                )}
                {p.status === 'done' && (
                  <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          {/* Space Map */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🗺️ Physics Wing Space Allocation Map</div>
              <span style={{ fontSize: 12, color: '#64748b' }}>Real-Time Occupancy</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
              {rooms.map((r, i) => {
                const c = roomColors[r.status]
                return (
                  <div key={i} style={{ border: `1px solid ${c.border}`, background: c.bg, borderRadius: 8, padding: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'flex-start', gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{r.name}</span>
                      <span className={`badge ${c.badge}`} style={{ fontSize: 10, flexShrink: 0 }}>{r.status}</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4, lineHeight: 1.4 }}>{r.detail}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{r.capacity}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Proxy & Relief */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔁 Proxy &amp; Relief Ledger</div>
              <div className="status-dot dot-green" />
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#15803d', marginBottom: 4 }}>✓ Approved Relief – Feb 28 · Morning</div>
              <div style={{ fontSize: 12 }}>Leave Coverage: 3 Periods</div>
              <div style={{ fontSize: 12, color: '#374151', marginTop: 2, lineHeight: 1.5 }}>Nominated Sub: <strong>Mr. Rajesh Sen</strong> (Mathematics Department). Formally signed off by Vice Principal.</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Ref: #SUB-2025-089 · View Handover Brief</div>
            </div>
            <button className="btn btn-outline btn-sm w-full"><Plus size={12} /> + Log Planned Leave / Request Proxy</button>
          </div>

          {/* Lab 2 Health */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔬 Sci-Wing Lab 2 Health</div>
              <span className="badge badge-green">READY</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Equipment status for today's optical bench experimentation session.</div>
            {[
              { item: '16 Optical Benches', status: 'Calibrated', ok: true },
              { item: '32 Sodium Vapor Lamps', status: 'Operational', ok: true },
              { item: '1 Tangent Galvanometer', status: 'Repair Ticket #402', ok: false },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 2 ? '1px solid #f8fafc' : 'none', fontSize: 12 }}>
                <span style={{ fontWeight: 500 }}>{e.item}</span>
                {e.ok
                  ? <span className="badge badge-green"><CheckCircle size={10} /> {e.status}</span>
                  : <span className="badge badge-red"><Wrench size={10} /> {e.status}</span>
                }
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 0' }}>
              <div className="avatar av-green" style={{ width: 30, height: 30, fontSize: 11 }}>KR</div>
              <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 600 }}>Mr. K. Rao · Lead Physics Assistant</div>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 4, padding: '2px 8px', fontSize: 11 }}>Ext. 204</button>
              </div>
            </div>
          </div>

          {/* Upcoming Invigilation */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 Upcoming Invigilation</div>
              <span className="badge badge-blue">Term II Finals</span>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>CBSE Pre-Board Mock 2</div>
                <span className="badge badge-red">March 3</span>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
                <div>Venue: <strong>Main Examination Hall A</strong></div>
                <div>Allocated: Desk 1–30 · 08:30 – 11:45 AM</div>
                <div>Chief Invigilator: Dr. Evelyn Sterling</div>
              </div>
            </div>
            <button className="btn btn-outline btn-sm w-full"><Download size={12} /> Download Examination Protocol Packet</button>
          </div>
        </div>
      </div>
    </div>
  )
}
