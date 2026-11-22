import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Search, Download, Upload, Printer, UserPlus, RefreshCw, Eye } from 'lucide-react';

const students = [
  {
    id: 'Adm #GH-2019-1082', name: 'Aarav Sharma', roll: 14, grade: '10-B',
    guardian: 'Dr. Rajesh Sharma', phone: '+91986502',
    route: 'Route #14 (Whitefield)', gpa: 3.94, att: '99.4%',
    fee: 'Fully Settled', docs: '6/6',
    dob: '2009-03-12', bloodGroup: 'O+ve', caste: 'General',
  },
  {
    id: 'Adm #GH-2021-1419', name: 'Priya Venkat', roll: 2, grade: '10-B',
    guardian: 'S. Venkateraman', phone: '+91918561',
    route: 'Self / Walker Zone 1', gpa: 3.91, att: '99.2%',
    fee: 'Fully Settled', docs: '6/6',
  },
  {
    id: 'Adm #GH-2021-1802', name: 'Mohammed Zeeshan', roll: 3, grade: '10-B',
    guardian: 'Farooq Zeeshan', phone: '+91927402',
    route: 'Route #04 (Indiranagar)', gpa: 3.65, att: '93.0%',
    fee: 'Term 4 Pending', docs: '6/6',
  },
  {
    id: 'Adm #GH-2019-2104', name: 'Tanvi Deshmukh', roll: 4, grade: '10-B',
    guardian: 'Sunil Deshmukh', phone: '+91934220',
    route: 'Route #14 (Whitefield)', gpa: 3.88, att: '96.7%',
    fee: 'Fully Settled', docs: '6/6',
  },
  {
    id: 'Adm #GH-2019-0941', name: 'Kedar Nambiar', roll: 25, grade: '10-B',
    guardian: 'Raveendran Nambur', phone: '+91990618',
    route: 'Route #11 (Marathahalli)', gpa: 3.79, att: '98.0%',
    fee: 'Govt Subsidised', docs: '6/6',
  },
];

const genderData = [
  { name: 'Male Students', value: 1240, color: '#0ea5e9' },
  { name: 'Female Students', value: 1210, color: '#f472b6' },
];

const commuteData = [
  { name: 'Institutional Bus Fleet', value: 1780, pct: '72.6%', color: '#16a34a' },
  { name: 'Private Parent Drop / Carpool', value: 490, pct: '20.0%', color: '#0ea5e9' },
  { name: 'Walker / Bicycle Zone', value: 180, pct: '7.4%', color: '#f59e0b' },
];


export default function StudentRegistry() {
  const [selected, setSelected] = useState(students[0]);
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Students & Academics</span>
        <span>›</span>
        <span>Institutional Registry & Demographic Directory</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-blue">AY 2024–25 Master Records</span>
        <span className="badge badge-gray">UDISE+ Linked | CBSE Affiliation #1930281</span>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Total Enrolled Capacity</div>
          <div className="stat-card-value">2,450</div>
          <div className="stat-card-sub">of 2,500 • 98.0% Occupancy</div>
          <div className="stat-card-sub">60 Available Seats</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">New Admissions AY 24–25</div>
          <div className="stat-card-value">320</div>
          <div className="stat-card-sub"><span className="stat-card-change change-up">+16.2% YoY</span></div>
          <div className="stat-card-sub text-xs text-muted">Batch complete across Pre-K to Grade 11</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">RTE & Scholarship Scholars</div>
          <div className="stat-card-value">142</div>
          <div className="stat-card-sub">Scholars</div>
          <div className="stat-card-sub text-xs text-muted">5.8% of aggregate institutional cohort</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Annual Retention Rate</div>
          <div className="stat-card-value text-green">99.1%</div>
          <div className="stat-card-sub"><span className="badge badge-green">Top Quartile</span></div>
          <div className="stat-card-sub text-xs text-muted">Only 22 outbound TCs issued this cycle</div>
        </div>
      </div>

      {/* Master Ledger Header */}
      <div className="card mb-4">
        <div className="card-header">
          <div>
            <div className="card-title">Student Master Ledger & Directory</div>
            <div className="text-xs text-muted">Central statutory census repository, academic profiles, DigiLocker KYC records, and residential fleet routing.</div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="live-badge">Live Synchronized</span>
            <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Master Census</button>
            <button className="btn btn-secondary btn-sm"><RefreshCw size={11} /> Bulk KYC Sync</button>
            <button className="btn btn-secondary btn-sm"><Printer size={11} /> Print Smart IDs</button>
            <button className="btn btn-primary btn-sm"><UserPlus size={11} /> Register New Student</button>
          </div>
        </div>
        <div className="card-body">
          {/* Filters */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
              <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                className="input"
                style={{ width: '100%', paddingLeft: 26 }}
                placeholder="Search by student name, Adm ID, Roll # or p…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select className="input">
              <option>Secondary/Grade</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
            <select className="input">
              <option>Section B</option>
              <option>Section A</option>
              <option>Section C</option>
              <option>Section D</option>
            </select>
            <select className="input">
              <option>Admission Categ...</option>
            </select>
            <select className="input">
              <option>KYC & Vault: All</option>
              <option>KYC Pending</option>
              <option>KYC Done</option>
            </select>
          </div>
          {/* Quick Filters */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <span className="text-xs text-muted">Quick Cohort Filters:</span>
            <span className="tag active">Grade 10 (All Sections: 160)</span>
            <span className="tag">Class 10 - A (40)</span>
            <span className="tag active" style={{ background: '#0ea5e9', color: '#fff', borderColor: '#0ea5e9' }}>Class 10 - B (40)</span>
            <span className="tag">Class 10 - C (40)</span>
            <span className="tag">Class 10 - D (40)</span>
          </div>
          <div className="flex gap-2 mb-3">
            <span className="tag tag-red">🔴 Pending KYC Docs (14)</span>
            <span className="tag tag-yellow">🔵 Bus Route #14 Only</span>
          </div>
        </div>
      </div>

      {/* Student Roster + Detail Panel */}
      <div className="student-roster-layout">
        {/* Table */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Class 10 – B Student Roster</span>
              <span className="text-xs text-muted">40 Registered Pupils</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Student & Identification</th>
                    <th>Primary Guardian</th>
                    <th>Commute</th>
                    <th>Academic ATTD.</th>
                    <th>Fee / Vault Stat</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} onClick={() => setSelected(s)} style={{ cursor: 'pointer', background: selected?.id === s.id ? '#f0fdf4' : '' }}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar" style={{ background: ['#16a34a','#0ea5e9','#8b5cf6','#f59e0b','#ef4444'][s.roll % 5], color: '#fff' }}>
                            {s.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold">{s.name}</div>
                            <div className="text-xs text-muted">{s.id}</div>
                            <div className="text-xs text-muted">Roll {s.roll} • Sec {s.grade.split('-')[1]}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">{s.guardian}</div>
                        <div className="text-xs text-muted">{s.phone}</div>
                        <span className="badge badge-green" style={{ fontSize: '9px' }}>Verified Email</span>
                      </td>
                      <td>
                        <div className="text-xs font-semibold">{s.route}</div>
                      </td>
                      <td>
                        <div className="text-xs">GPA / <span className="font-bold">{s.gpa}</span></div>
                        <div className="text-xs">Attd. {s.att}</div>
                      </td>
                      <td>
                        <span className={`badge ${s.fee === 'Fully Settled' ? 'badge-green' : s.fee === 'Govt Subsidised' ? 'badge-blue' : 'badge-red'}`}>
                          {s.fee}
                        </span>
                        <div className="text-xs text-muted mt-1">{s.docs} Docs</div>
                      </td>
                      <td>
                        <button className="btn btn-secondary btn-sm"><Eye size={11} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-body" style={{ padding: '10px 16px' }}>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Showing rows 1–5 of 40 enrolled students in Section 10-B</span>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm">Prev</button>
                  <button className="btn btn-primary btn-sm">1</button>
                  <button className="btn btn-secondary btn-sm">2</button>
                  <button className="btn btn-secondary btn-sm">3</button>
                  <button className="btn btn-secondary btn-sm">Next</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom analytics */}
          <div className="grid-3 mt-4">
            <div className="card">
              <div className="card-header"><span className="card-title">Gender & Parity Ratio</span><span className="text-xs text-muted">49.4% Girls</span></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie data={genderData} innerRadius={28} outerRadius={44} dataKey="value">
                      {genderData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between mt-2">
                  {genderData.map(g => (
                    <div key={g.name} className="text-center">
                      <div className="font-bold">{g.value.toLocaleString()}</div>
                      <div className="text-xs text-muted">{g.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><span className="card-title">Commute Modality</span></div>
              <div className="card-body">
                {commuteData.map(c => (
                  <div key={c.name} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{c.name}</span>
                      <span className="font-semibold">{c.pct}</span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: c.pct, background: c.color }} />
                    </div>
                  </div>
                ))}
                <div className="mt-3 text-xs text-muted">Active Fleet Utilization: 32 Buses • 94% Capacity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="card student-detail-panel">
            <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <div className="flex items-center gap-2">
                <div className="avatar avatar-lg" style={{ background: '#16a34a', color: '#fff', fontSize: 18 }}>
                  {selected.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold">{selected.name}</div>
                  <div className="text-xs text-muted">Grade {selected.grade} • {selected.id}</div>
                </div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '10px 12px' }}>
              {[
                ['Permanent Education No.', 'PEN-KA-2021-596412'],
                ['CBSE Reg. Index', 'C092-1281204-394812'],
                ['Aadhaar (UIDAI Verified)', '✓ XXXX-XXXX-4912'],
                ['Cumulative GPA', selected.gpa],
                ['Attendance', selected.att],
                ['Merit Points', '+45 pts'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between mb-2 text-xs">
                  <span className="text-muted">{k}</span>
                  <span className="font-semibold text-right" style={{ maxWidth: 130 }}>{v}</span>
                </div>
              ))}
              <div className="divider" />
              <div className="font-semibold text-xs mb-1">Guardian & Household</div>
              <div className="text-xs mb-1">Father: {selected.guardian} <span className="text-muted">Chief Surgeon</span></div>
              <div className="text-xs text-muted mb-1">Primary Phone: +91 99480 12345</div>
              <div className="text-xs mb-2">Mother: Mrs. Meenakshi Sharma (Lawyer)</div>
              <div className="divider" />
              <div className="font-semibold text-xs mb-2">Institutional Sibling Nexus</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar avatar-sm" style={{ background: '#0ea5e9', color: '#fff' }}>AS</div>
                <div>
                  <div className="text-xs font-semibold">Ananya Sharma</div>
                  <div className="text-xs text-muted">Grade 7-A • Adm #GH-2022-1923</div>
                </div>
                <span className="badge badge-purple">Sister</span>
              </div>
              <div className="divider" />
              <div className="font-semibold text-xs mb-1">Statutory Vault (6/6 Synced)</div>
              <div className="grid-2 gap-1 mb-3">
                {['Birth Certificate ✓', 'DigiLocker API OK', 'UIDAI Aadhaar Card ✓', 'Prior Transfer Cert ✓', 'Immunization Card ✓'].map(d => (
                  <span key={d} className="badge badge-green" style={{ fontSize: '9px' }}>{d}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm flex-1">Transfer Section</button>
                <button className="btn btn-secondary btn-sm flex-1">Edit Profile</button>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}>
                Issue Official Bonafide Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
