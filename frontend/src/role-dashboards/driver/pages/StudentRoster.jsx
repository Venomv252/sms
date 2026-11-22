import React, { useState } from 'react'
import { Users, Search, Phone, MessageSquare, CheckSquare, Download, Radio } from 'lucide-react'
import './StudentRoster.css'

const summary = [
  { label: 'Total Assigned', value: '38', sub: 'Students', icon: Users },
  { label: 'Boarded Onboard', value: '36', sub: '94.7%', bar: 94.7 },
  { label: 'Verified Leave', value: '2', sub: 'Parent Logged', highlight: 'red' },
  { label: 'Next Stop Waiting', value: '0', sub: 'Cleared', icon: null },
  { label: 'RFID Tap Match', value: '100%', sub: 'Sub-G/Reader normal', highlight: 'green' },
]

const faculty = [
  { initials: 'AE', name: 'Dr. Alistair Evans', dept: 'HOD Physics • Seat #03', boarded: 'Boarded: ITPL Gate', color: '#dbeafe' },
  { initials: 'CD', name: 'Ms. Clara Davis', dept: 'TOT English • Seat #04', boarded: 'Boarded: Prestige Ozone', color: '#dcfce7' },
  { initials: 'TM', name: 'Mr. Tariq Mansoor', dept: 'HOT Chemistry • Seat #05', boarded: 'Boarded: Hope Farm', color: '#fef9c3' },
]

const students = [
  {
    name: 'Rohan Varma', grade: 'Gr-9-C', adm: '#GW-9402', seat: 'Window', rfid: 'EZ80-1170-01',
    address: 'Prestige Lakeside • Flat 402, Hope Farm Jnc.', parent: 'Mr. Vikram Varma • +91-9199462+1992',
    health: 'Asthmatic • Inhaler in Bag (D+)', status: 'boarded', time: '07:16 AM', checked: true
  },
  {
    name: 'Ananya Sen', grade: 'Gr-8-A', adm: '#GW-9821', seat: 'Aisle #14',
    address: 'Palm Meadows • Villa 12B, ITPL Gate', rfid: 'EZ80-1170-02',
    parent: null, health: 'B+ Positive • No Allergies', status: 'boarded', time: '07:22 AM', checked: true
  },
  {
    name: 'Kabir Mehta', grade: 'Gr-10-B', adm: '#GS-9122', seat: 'Seat #08 (Unoccupied)',
    address: 'Brigade Cosmopolis • Tower 5-104', rfid: null,
    parent: 'Parent App Ack: 06:16 AM', health: 'Parent Verified Leave • Fever', status: 'leave', checked: false
  },
  {
    name: 'Tanvi Kulkarni', grade: 'Gr-7-B', adm: '#GW-1049', seat: 'Seat #16 (Window)',
    address: 'Alpine Leo • Apt 03, Siddhapora', rfid: 'EZ80-1170-04',
    parent: null, health: 'Severe Peanut Allergy • EpiPen (A+)', status: 'boarded', time: '07:28 AM', checked: true
  },
  {
    name: 'Vivaan Mehra', grade: 'Gr-11-A', adm: '#GW-8819', seat: 'Seat #21 (Unoccupied)',
    address: 'Prestige Shantiniketan • Tower 8-502', rfid: null,
    parent: 'Parent App Ack: 06:45 AM', health: 'Verified Leave • Sprained Ankle', status: 'leave', checked: false
  },
  {
    name: 'Aarav Nambiar', grade: 'Gr-9-A', adm: '#GW-9331', seat: 'Seat #18 (Aisle)',
    address: 'Godrej Splendour • Wing B-1204', rfid: 'EZ80-1170-06',
    parent: null, health: 'Type 1 Diabetic • Glucose Kit (B+)', status: 'boarded', time: '07:35 AM', checked: true
  },
]

const FILTERS = ['All Students (38)', 'Onboard (36)', 'Absent / Leave (2)', 'Next Stop (0)', 'Medical Alerts (3)']

export default function StudentRoster() {
  const [activeFilter, setActiveFilter] = useState(0)
  const [search, setSearch] = useState('')

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="roster-page">
      {/* Summary Stats */}
      <div className="roster-stats-grid">
        {summary.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.highlight ? 'stat-' + s.highlight : ''}`} style={{ fontSize: 20 }}>{s.value}</div>
            {s.bar !== undefined ? (
              <div>
                <div className="progress-bar mt-1">
                  <div className="progress-fill" style={{ width: `${s.bar}%` }}></div>
                </div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ) : (
              <div className="stat-sub">{s.sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* Header info */}
      <div className="card">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="roster-icon"><Users size={16} /></div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800 }}>Student Passenger Manifest & RFID Roll Call</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
                  ● Live Shift In-Transit &nbsp;|&nbsp; Bus #14 Whitefield Corridor • Morning Inbound 07:00 AM – 08:15 AM
                  &nbsp;|&nbsp; Route Sure ETA: 08:10 AM
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="text-xs" style={{ background: 'var(--gray-50)', padding: '6px 10px', borderRadius: 8 }}>
              <span style={{ color: 'var(--gray-500)' }}>Driver: </span>
              <span className="font-semibold">Ramesh Babu (#DRV-007)</span>
            </div>
            <button className="btn btn-outline btn-sm">Escort: Dr. Alistair Evans</button>
            <button className="btn btn-primary btn-sm">⊕ Sync Scanner</button>
          </div>
        </div>
      </div>

      {/* Faculty Escorts */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <span className="section-title">Escort Faculty & Transit Safety Marshals</span>
          <span className="badge badge-green" style={{ fontSize: 10 }}>✓ Designated In-Transit Safety Marshals & Emergency Roll Verifiers</span>
        </div>
        <div className="faculty-escorts-grid">
          {faculty.map((f, i) => (
            <div key={i} className="faculty-escort-card">
              <div className="faculty-escort-avatar" style={{ background: f.color }}>{f.initials}</div>
              <div style={{ flex: 1 }}>
                <div className="font-semibold" style={{ fontSize: 12 }}>{f.name}</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{f.dept}</div>
                <div className="text-xs" style={{ color: 'var(--green-primary)' }}>{f.boarded}</div>
              </div>
              <Phone size={14} style={{ color: 'var(--gray-400)', cursor: 'pointer' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filters */}
      <div className="card">
        <div className="flex gap-2 mb-3 flex-wrap">
          <div className="search-box">
            <Search size={13} style={{ color: 'var(--gray-400)' }} />
            <input
              type="text"
              placeholder="Search by student name, grade, stop, RFID tag, or seat..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
            />
          </div>
          <select style={{ width: 'auto', minWidth: 120 }}>
            <option>All Grades</option>
            <option>Grade 7</option>
            <option>Grade 8</option>
            <option>Grade 9</option>
            <option>Grade 10</option>
            <option>Grade 11</option>
            <option>Grade 12</option>
          </select>
          <select style={{ width: 'auto', minWidth: 140 }}>
            <option>All Health Profiles</option>
            <option>Medical Alerts Only</option>
          </select>
        </div>
        <div className="filter-tabs">
          {FILTERS.map((f, i) => (
            <button
              key={i}
              className={`filter-tab ${activeFilter === i ? 'active' : ''}`}
              onClick={() => setActiveFilter(i)}
            >{f}</button>
          ))}
        </div>

        {/* Student list */}
        <div className="student-manifest-list">
          {filtered.map((s, i) => (
            <div key={i} className={`manifest-student-row ${s.status === 'leave' ? 'row-leave' : ''}`}>
              <div className="manifest-avatar">{s.name.charAt(0)}</div>
              <div className="manifest-info">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold" style={{ fontSize: 13 }}>{s.name}</span>
                  <span className="tag" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{s.grade} • Adm {s.adm}</span>
                  {s.seat && <span className="tag" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>Seat #{s.seat}</span>}
                </div>
                <div className="text-xs" style={{ color: 'var(--gray-500)', margin: '2px 0' }}>📍 {s.address}</div>
                {s.rfid && <div className="text-xs" style={{ color: 'var(--gray-400)' }}>RFID: {s.rfid}</div>}
                {s.parent && <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{s.parent}</div>}
              </div>
              <div className="manifest-status">
                <div className={`health-badge ${s.health.includes('Allergy') || s.health.includes('Diabetic') || s.health.includes('Asthmatic') ? 'health-alert' : 'health-normal'}`}>
                  {s.health}
                </div>
                {s.status === 'boarded' && (
                  <div className="badge badge-green mt-1">✓ Boarded {s.time}</div>
                )}
                {s.status === 'leave' && (
                  <div className="badge badge-orange mt-1">✗ {s.health.split('•')[0].trim()}</div>
                )}
                <div className="flex gap-2 mt-1">
                  <label className="check-label">
                    <input type="checkbox" defaultChecked={s.checked} />
                    <span>Check-In</span>
                  </label>
                  <Phone size={13} style={{ color: 'var(--gray-400)', cursor: 'pointer' }} />
                  <MessageSquare size={13} style={{ color: 'var(--gray-400)', cursor: 'pointer' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="card">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <div className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
              ● RFID Gateway Telemetry Active &nbsp;•&nbsp; Last verified batch sync: 14 seconds ago in 4G Uptime
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
              Hardware ID: #RDR-WHT-14 &nbsp;•&nbsp; Firmware: v4.19-ST
            </div>
          </div>
          <div className="flex gap-2">
            <div style={{ background: 'var(--gray-50)', padding: '8px 12px', borderRadius: 8, fontSize: 11 }}>
              <div className="font-semibold">Manifest Audit: 36 Boarded / 2 Verified Absences</div>
              <div style={{ color: 'var(--gray-500)' }}>All Route 14 passengers accounted for</div>
            </div>
            <button className="btn btn-outline btn-sm"><Download size={12} /> Export Manifest (PDF / CSV)</button>
            <button className="btn btn-primary btn-sm"><Radio size={12} /> Broadcast Roll to Transport Desk</button>
            <button className="btn btn-danger btn-sm">Missing Child Protocol</button>
          </div>
        </div>
      </div>
    </div>
  )
}
