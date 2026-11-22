import React, { useState } from 'react'
import { CheckCircle, Clock, AlertTriangle, Wifi, RefreshCw, Download, Send, Shield } from 'lucide-react'

const students = [
  { roll: '108-01', name: 'Aarav Sharma', id: 'G10-B #STU-2023-110', rfid: '07:46 AM (T-03)', p1: 'P', p2: 'P', p3: 'P', p4: 'P', p5: 'P', bus: 'R-12 North', status: 'present' },
  { roll: '108-02', name: 'Ananya Mukherjee', id: 'G10-B #STU-2023-114', rfid: '07:51 AM (T-03)', p1: 'P', p2: 'L', p3: 'P', p4: 'P', p5: 'P', bus: 'R-04 South', status: 'late' },
  { roll: '108-08', name: 'Rohan Varma', id: 'G10-B #STU-2023-114', rfid: '09:04 AM (T-01)', p1: 'P', p2: 'L', p3: 'P', p4: 'P', p5: 'P', bus: 'Parent Drop', status: 'late' },
  { roll: '108-14', name: 'Tanya Mukherjee', id: 'G10-B #STU-2023-178', rfid: 'Medical Leave', p1: 'M', p2: 'A', p3: 'M', p4: 'H', p5: 'H', bus: 'R-08 West', status: 'medical' },
  { roll: '108-22', name: 'Vikramaditya Singh', id: 'G10-B #STU-2023-205', rfid: 'No Tag Logged', p1: 'A', p2: 'A', p3: 'A', p4: 'A', p5: 'A', bus: 'R-12 North', status: 'absent' },
  { roll: '108-30', name: 'Zoya Patel', id: 'G10-B #STU-2023-288', rfid: '07:39 AM (T-01)', p1: 'P', p2: 'A', p3: 'P', p4: 'P', p5: 'P', bus: 'Walker (Local)', status: 'present' },
]

const statusColor = { present: '#16a34a', late: '#f59e0b', medical: '#3b82f6', absent: '#dc2626' }
const periodBadge = (v) => {
  if (v === 'P') return <span className="badge badge-green" style={{ padding: '1px 5px', fontSize: 10 }}>P</span>
  if (v === 'L') return <span className="badge badge-yellow" style={{ padding: '1px 5px', fontSize: 10 }}>L</span>
  if (v === 'A') return <span className="badge badge-red" style={{ padding: '1px 5px', fontSize: 10 }}>A</span>
  if (v === 'M') return <span className="badge badge-blue" style={{ padding: '1px 5px', fontSize: 10 }}>M</span>
  if (v === 'H') return <span className="badge badge-gray" style={{ padding: '1px 5px', fontSize: 10 }}>H</span>
  return <span className="badge badge-gray">{v}</span>
}

export default function Attendance() {
  const [tab, setTab] = useState('all')
  return (
    <div>
      <div className="breadcrumb">
        <span>Daily Classroom Ops</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Attendance & Roll Call</span>
        <span className="breadcrumb-sep">›</span>
        <span className="badge badge-green" style={{ borderRadius: 4 }}>Grade 10-B Homeroom</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Student Attendance & Homeroom Roll Call</h1>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Wednesday, February 26, 2025 · Grade 10-B (West Wing, Rm 204) · Headmaster Audit Ref: #ATT-2025-02-10B
          </div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><CheckCircle size={13} /> Mark All Present</button>
          <button className="btn btn-outline btn-sm"><RefreshCw size={13} /> RFID Turnstile Sync</button>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export Register (PDF)</button>
          <button className="btn btn-primary btn-sm"><Send size={13} /> Submit to Dean's Office</button>
        </div>
      </div>

      {/* Critical alert */}
      <div className="alert alert-danger" style={{ marginBottom: 16 }}>
        <AlertTriangle size={16} style={{ flexShrink: 0 }} />
        <div>
          <strong>CRITICAL CUTOFF APPROACHING</strong> – 14 Mins Remaining · Dean's Office locks attendance automatically at 08:30 AM EST
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 16 }}>07:56:53 AM</div>
          <div className="status-dot dot-red" style={{ width: 10, height: 10 }} />
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Total Enrolled</div>
          <div className="stat-value">42</div>
          <div className="stat-sub">100% cohort</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Present</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>39</div>
          <div className="stat-sub">92.8%</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '92.8%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Late Entry</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>1</div>
          <div className="stat-sub">Tardy slip</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Medical Leave</div>
          <div className="stat-value" style={{ color: '#3b82f6' }}>1</div>
          <div className="stat-sub">Be Verified</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Unexcused</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>1</div>
          <div className="stat-sub">SMS Sent</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Net Attendance</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>94.2%</div>
          <div className="stat-sub">WR avg</div>
        </div>
      </div>

      {/* Live Biometric Feed */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="card-title">
            <Wifi size={14} style={{ display: 'inline', marginRight: 4, color: '#16a34a' }} />
            Live Biometric Gate & Turnstile Telematics Feed
          </div>
          <span className="badge badge-green">● STREAMING</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { name: 'Aarav Sharma', status: 'Present', time: '07:46:18 AM', turn: '03-A', status_tag: 'badge-green' },
            { name: 'Rohan Varma', status: 'Late Entry', time: '08:06:44 AM', turn: '01-B', status_tag: 'badge-yellow' },
            { name: 'Tanya Mukherjee', status: 'Med Leave', time: '', turn: '01-B', status_tag: 'badge-blue' },
            { name: 'Vikramaditya Singh', status: 'Unexcused', time: '', turn: 'No RFID', status_tag: 'badge-red' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 180px', minWidth: 180, padding: 12, borderRadius: 8,
              border: `1px solid ${s.status_tag === 'badge-red' ? '#fca5a5' : '#e2e8f0'}`,
              background: s.status_tag === 'badge-red' ? '#fff5f5' : 'white'
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <div className="avatar av-blue" style={{ width: 30, height: 30, fontSize: 11 }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>Turnstile {s.turn}</div>
                </div>
              </div>
              <span className={`badge ${s.status_tag}`}>{s.status}</span>
              {s.time && <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{s.time}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Roster */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Master Attendance Roster — Grade 10-B</div>
          <div className="flex gap-2">
            {['All (42)', 'Needs Action (2)', 'Bus Commuters (8)'].map(t => (
              <button key={t} className={`chip${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ROLL #</th>
                <th>STUDENT NAME & ID</th>
                <th>GATE SENSOR</th>
                <th>PERIOD 1<br /><span style={{ fontWeight: 400 }}>Homeroom</span></th>
                <th>PERIOD 2<br /><span style={{ fontWeight: 400 }}>Physics</span></th>
                <th>PERIOD 3</th>
                <th>PERIOD 4</th>
                <th>PERIOD 5</th>
                <th>BUS ROUTE</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.roll} style={{ background: s.status === 'absent' ? '#fff5f5' : 'white' }}>
                  <td style={{ fontWeight: 700, color: s.status === 'absent' ? '#dc2626' : '#1e293b', fontSize: 12 }}>{s.roll}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar" style={{
                        width: 28, height: 28, fontSize: 11,
                        background: statusColor[s.status]
                      }}>
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {s.status === 'absent'
                      ? <span className="badge badge-red">No Tag Logged</span>
                      : s.status === 'medical'
                        ? <span className="badge badge-blue">Medical Leave</span>
                        : <span style={{ color: '#64748b' }}>{s.rfid}</span>
                    }
                  </td>
                  <td>{periodBadge(s.p1)}</td>
                  <td>{periodBadge(s.p2)}</td>
                  <td>{periodBadge(s.p3)}</td>
                  <td>{periodBadge(s.p4)}</td>
                  <td>{periodBadge(s.p5)}</td>
                  <td style={{ fontSize: 12, color: '#64748b' }}>{s.bus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Displaying 6 priority entries of 42 enrolled homeroom students</span>
          <div className="pagination">
            <button>←</button>
            <button>Page 1 of 7</button>
            <button className="active">Next Page</button>
          </div>
        </div>
      </div>

      {/* Dean's Verification Checklist */}
      <div className="card mt-4">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} style={{ color: '#16a34a' }} />
            <div className="card-title">Dean's Office Verification Checklist</div>
          </div>
          <span className="badge badge-green">Ready to Lock</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 250 }}>
            {[
              'Cross-referenced Main Quad Turnstile gate telematics with visual physical count (41 present/late in room 204).',
              'Approved digital medical clearance certificate for Tanya Mukherjee (#MEQ-884).',
              'Dispatched 1st stage automated SMS notification to Vikramaditya Singh\'s listed guardians.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 10 }}>
                <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>AUDIT SEAL STATUS</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Digital Signature: Dr. Alistair Evans, Ph.D.</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 12 }}>RSA-2048 SHA256 0082 – 0c41</div>
            <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
              <div style={{ flex: 1, padding: '8px', background: '#f8fafc', borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>1 Dispatched</div>
                <div style={{ color: '#94a3b8' }}>Parent Alerts</div>
              </div>
              <div style={{ flex: 1, padding: '8px', background: '#f8fafc', borderRadius: 6, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>0 Pending</div>
                <div style={{ color: '#94a3b8' }}>Lock Window</div>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-3">
              <CheckCircle size={13} /> Finalize & Seal Homeroom Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
