import React, { useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Clock, Download, ChevronLeft, ChevronRight } from 'lucide-react'

const heatmapData = [
  // Week rows for February 2025
  { week: 1, days: [null, 3, 4, 5, 6, 7, 8] },
  { week: 2, days: [null, 10, 11, 12, 13, 14, 15] },
  { week: 3, days: [null, 17, 18, 19, 20, 21, 22] },
  { week: 4, days: [null, 24, 25, 26, 27, 28, null] },
]

const attendance = {
  3: 'present', 4: 'present', 5: 'medical', 6: 'present', 7: 'present',
  10: 'present', 11: 'holiday', 12: 'present', 13: 'present', 14: 'present',
  17: 'present', 18: 'present', 19: 'present', 20: 'today', 21: 'present', 22: 'present',
  24: 'present', 25: 'present', 26: 'present', 27: 'present', 28: 'present',
}

const dayRoster = [
  { period: 'P1', subject: 'Mathematics (Calculus Intro)', time: '09:00–09:45 AM', teacher: 'Mr. Rajesh Kumar', status: 'Present', room: 'Room 201' },
  { period: 'P2', subject: 'Physics Lab (Electrostatics Branch)', time: '09:45–10:30 AM', teacher: 'Dr. Alistair Evans', status: 'Present', room: 'Physics Lab' },
  { period: 'P3', subject: 'Chemistry (Organic Reactions)', time: '10:45–11:30 AM', teacher: 'Ms. Divya Sharma', status: 'Present', room: 'Room 205' },
  { period: 'P4', subject: 'Recess & Nutrition Break', time: '11:30–11:50 AM', teacher: '—', status: 'Break', room: '—' },
  { period: 'P5', subject: 'English Literature', time: '11:50–12:40 PM', teacher: 'Ms. Clara Cooper', status: 'Present', room: 'Room 204' },
  { period: 'P6', subject: 'Computer Applications (Python Lab)', time: '01:35–02:20 PM', teacher: 'Mr. V. Venkatesh', status: 'Present', room: 'CS Lab' },
]

const biometricLog = [
  { date: 'Today, Feb 21 • 07:42 AM', event: 'Campus Inbound', desc: 'Campus Inbound Morning', location: 'Turnstile POS (North Quad Gate)', card: 'HR-33-IAI', camera: 'Cam 5B Match 3', status: 'Verified' },
  { date: 'Yesterday, Feb 20 • 03:29 PM', event: 'Campus Outbound', desc: 'Main Gate Turnstile', location: 'Main Gate Turnstile #2026–V', card: 'HR-33-IAI', camera: 'Cam 49.4% Match 5', status: 'Verified' },
  { date: 'Yesterday, Feb 20 • 02:01 PM', event: 'Bus Boarding Inward', desc: 'Bus Dispatcher 14-Day OPS Live', location: 'Bus Dispatcher 14-Day (OPS Live)', card: 'FP-13-PM', camera: 'Driver Telemetry', status: 'Scanned' },
  { date: 'Yesterday, Feb 19 • 09:37 AM', event: 'Lounge Wing', desc: 'Science Book 2nd Floor Bengal 4B', location: 'Science Book 2nd Floor Bengal 4B', card: 'FP-13-PM', camera: 'IoT Scooby Scav.', status: 'Logged' },
]

const leavePetitions = [
  {
    ref: '#LR-2025-014 • 3 Full Days', type: 'Viral IB & Approved', approved: true,
    from: 'Absence Window: 2025-Jan-11 • Jan 16, 2026', cbse: 'CBSE Exemption: Dr. Alistair (School HED: #020)',
    doc: 'Medical Certificate_Aarav_20240-01.pdf (2.1 MB)',
    guardian: 'Jointly, Certificate_Aarav_Jan2024pdf (2.1 MB)'
  },
  {
    ref: '#FLT-2024-002 • 3rd Day', type: 'Official Delegation (Inter-School Debate Campaign)', approved: true,
    from: 'Absence Window: Nov 28, 2024', cbse: 'Attending Invitation: Co-ordinated in Principal',
    doc: "Xavier's Invitational Schools.ai.pdf",
    guardian: 'View Invitation'
  },
  {
    ref: '#ER-2024-#240 • 2 Full Days', type: 'Grandparent Urgent Hospitalization', approved: false,
    from: 'Absence Window: Oct 18 – Oct 11, 2024', cbse: 'Sanction Office: Vice Prnipal Reg. Office',
    doc: 'Classroom Notes: Collected from YTamer',
    guardian: ''
  }
]

export default function AttendanceTracker() {
  const [month, setMonth] = useState('February 2025')

  const getHeatColor = (type) => {
    const map = { present: 'heatmap-present', medical: 'heatmap-medical', holiday: 'heatmap-holiday', today: 'heatmap-today', absent: 'heatmap-absent' }
    return map[type] || ''
  }

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Attendance Tracker</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Student Attendance & Leave Management</h1>
          <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginTop: 6 }}>
            <span className="tag tag-green" style={{ marginRight: 8 }}>Academic Year 2024–25 | Term II</span>
            Attendance audit, biometric check-in, leave applications, and medical certificates for <strong>Aarav Sharma</strong> (Grade 10-B, Roll #21 • Emerald Falcons)
          </div>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Download Certificate (PDF)</button>
          <button className="btn btn-primary btn-sm">Apply for Leave</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-5 mb-20">
        {[
          { label: 'OVERALL ATTENDANCE', value: '94.2%', sub: '6%↑', sub2: '146/155 | +0.2%', color: 'var(--primary)', icon: CheckCircle, note: '5 Board Exams' },
          { label: 'MEDICAL LEAVES', value: '9', sub: 'Days total', sub2: 'Certified', color: 'var(--orange)', icon: AlertCircle, note: 'CBSE Exemption Registered Medical Rate' },
          { label: 'UNEXCUSED ABSENCES', value: '0', sub: 'Documented Absences', sub2: 'Formally logged to date', color: 'var(--blue)', icon: XCircle, note: '100% Compliant' },
          { label: 'LATE SLIP QUOTA', value: '2', sub: '2 Quota Used', sub2: 'First late mark: 07:51 AM • Top 5% Batch', color: 'var(--red)', icon: Clock, note: '' },
          { label: 'MORNING PUNCTUALITY', value: '99.2%', sub: 'Avg. 07:56 AM', sub2: 'Official first gate of 08:00 AM | Top 5% Batch', color: '#8b5cf6', icon: CheckCircle, note: '' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
              <div className="stat-label" style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Icon size={13} style={{ color: s.color }} />
                {s.label}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
              {s.sub && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>}
              {s.sub2 && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub2}</div>}
            </div>
          )
        })}
      </div>

      <div className="two-col mb-20">
        {/* Heatmap Calendar */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Monthly Attendance Heatmap</div>
              <div className="card-subtitle">Class 10-B Standard Working Schedule</div>
            </div>
            <div className="flex items-center gap-10">
              <button className="btn btn-secondary btn-xs"><ChevronLeft size={12} /></button>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{month}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Today</span>
              <button className="btn btn-secondary btn-xs"><ChevronRight size={12} /></button>
            </div>
          </div>
          <div className="card-body">
            {/* Legend */}
            <div className="flex gap-12 mb-16 flex-wrap">
              {[
                { color: 'heatmap-present', label: 'Present (36 Days)' },
                { color: 'heatmap-medical', label: 'Medical Leave (3 Days)' },
                { color: 'heatmap-today', label: 'Submitted Holiday (0 Days)' },
                { color: 'heatmap-holiday', label: 'Weekend off (9 Days)' },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className={`heatmap-cell ${l.color}`} style={{ width: 18, height: 18, minWidth: 18, minHeight: 18, fontSize: 0 }}></div>
                  <span style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>{l.label}</span>
                </div>
              ))}
            </div>
            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '28px repeat(7, 1fr)', gap: 3, marginBottom: 4 }}>
              <div></div>
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', padding: '2px 0' }}>{d}</div>
              ))}
            </div>
            {/* Weeks */}
            {heatmapData.map((row, wi) => (
              <div key={wi} style={{ display: 'grid', gridTemplateColumns: '28px repeat(7, 1fr)', gap: 3, marginBottom: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>W{row.week}</div>
                {row.days.slice(1).map((day, di) => {
                  const type = day ? attendance[day] : null
                  return (
                    <div
                      key={di}
                      className={`heatmap-cell ${type ? getHeatColor(type) : 'heatmap-empty'}`}
                      style={{ fontSize: 12 }}
                      title={day ? `Feb ${day}` : ''}
                    >
                      {day || ''}
                    </div>
                  )
                })}
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
              Click any working day cell to inspect subject teacher list. Live sync: 6 mins ago
            </div>
          </div>
        </div>

        {/* Day Roster */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Selected Day Roster</div>
              <div className="card-subtitle">Thursday, 20 February 2025</div>
            </div>
            <span className="tag tag-green">100% Present</span>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {dayRoster.map((r, i) => (
              <div key={i} className="flex items-center gap-12" style={{ padding: '10px 0', borderBottom: i < dayRoster.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.status === 'Break' ? 'var(--yellow-light)' : 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: r.status === 'Break' ? '#a16207' : 'var(--primary)', flexShrink: 0 }}>
                  {r.period}
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{r.subject}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{r.time} • {r.teacher}</div>
                </div>
                {r.status !== 'Break' && (
                  <span className={`tag ${r.status === 'Present' ? 'tag-green' : 'tag-red'}`} style={{ fontSize: 10 }}>
                    {r.status === 'Present' ? '✓ Present' : r.status}
                  </span>
                )}
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', padding: '10px', background: 'var(--border-light)', borderRadius: 8 }}>
              Submit faculty absent biometric attendance record to scheduled approval within 10 minutes of last commencement start.
            </div>
          </div>
        </div>
      </div>

      {/* Biometric Gate Log */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div className="card-title">Live Biometric Gate & Classroom RFID Telemetry</div>
            <div className="card-subtitle">Real-time near-live IoT notification access to scheduled permissions Fact / Days</div>
          </div>
          <span className="tag tag-orange" style={{ fontSize: 11 }}>Sensors Active (Gate 1, 2 & Transport Hub)</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>TIMESTAMP & DAY</th>
                <th>EVENT DESCRIPTION</th>
                <th>PHYSICAL TERMINAL</th>
                <th>CARD / SRN / ID</th>
                <th>CAMERA VERIFICATION</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {biometricLog.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 12.5, fontWeight: 500 }}>{row.date}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{row.event}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.desc}</div>
                  </td>
                  <td style={{ fontSize: 12.5, maxWidth: 140 }}>{row.location}</td>
                  <td style={{ fontSize: 12.5 }}>{row.card}</td>
                  <td style={{ fontSize: 12.5 }}>{row.camera}</td>
                  <td>
                    <span className={`tag ${row.status === 'Verified' ? 'tag-green' : row.status === 'Scanned' ? 'tag-blue' : 'tag-gray'}`} style={{ fontSize: 10 }}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Records + Submit Leave */}
      <div className="two-col">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Leave Records & Medical Petitions</div>
              <div className="card-subtitle">Term I Form (Protocols Staff Log)</div>
            </div>
            <span className="tag tag-green" style={{ fontSize: 10 }}>● Approval / Initiated</span>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {leavePetitions.map((lp, i) => (
              <div key={i} style={{ background: i === 0 ? 'var(--blue-light)' : i === 1 ? 'var(--accent-light)' : 'var(--orange-light)', border: `1px solid ${i === 0 ? '#bfdbfe' : i === 1 ? '#bbf7d0' : '#fed7aa'}`, borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
                <div className="flex items-center justify-between mb-6">
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)' }}>{lp.ref}</span>
                  <span className={`tag ${lp.approved ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 10 }}>
                    {lp.approved ? '✓ Approved' : '⏳ Sanctioned'}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{lp.type}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{lp.from}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{lp.cbse}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', padding: '6px 10px', background: 'rgba(255,255,255,0.7)', borderRadius: 6 }}>
                  📎 {lp.doc}
                </div>
                {lp.guardian && (
                  <button className="btn btn-secondary btn-xs" style={{ marginTop: 8, fontSize: 11 }}>View Details</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Leave Form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Submit New Leave Request</div>
            <div className="card-subtitle">Official Dean & Medical Office Registry</div>
          </div>
          <div className="card-body" style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
              {['Medical', 'Family', 'On-Duty'].map((t, i) => (
                <button key={i} className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'center', fontSize: 12 }}>{t}</button>
              ))}
            </div>
            <div className="grid grid-2 mb-12">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-input" defaultValue="2025-02-24" />
              </div>
              <div className="form-group">
                <label className="form-label">End Date (Use Inclusive)</label>
                <input type="date" className="form-input" defaultValue="2025-02-25" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Reason</label>
              <textarea className="form-input" rows={3} placeholder="Provide comprehensive details to doctor and medical/string record..." style={{ resize: 'vertical' }}></textarea>
            </div>
            <div style={{ background: 'var(--border-light)', borderRadius: 8, padding: '12px', marginBottom: 14 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Registered Practitioner Note (PDF or JPG, max 5MB)</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Attach to browse or drop medical certificate here — only certification mandatory for leaves exceeding 2 days</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Also to browse or drop prescribed certificate here — only certification mandatory for leaves exceeding 2 days</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6 }}>State the actions to accurately verify Aarav — the student, enclose and acknowledge all assigned coursework for October 24 without external/unapproved aids.</div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Official Petition</button>
          </div>
        </div>
      </div>
    </div>
  )
}
