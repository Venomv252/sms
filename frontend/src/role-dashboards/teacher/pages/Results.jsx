import React, { useState } from 'react'
import { Download, Lock, BarChart2, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react'

const students = [
  { roll: '10B-01', name: 'Aarav Sharma', uid: 'GR-2021-9981', theory: 68, practical: 29, total: 97, grade: 'A1', pct: '99.2%ile', status: 'Verified & Locked', remark: '"Flawless optics derivation"', av: 'av-green' },
  { roll: '10B-02', name: 'Ananya Roy', uid: 'GR-2021-9982', theory: 64, practical: 28, total: 92, grade: 'A1', pct: '95.8%ile', status: 'Verified', remark: '"Strong numerical accuracy"', av: 'av-blue' },
  { roll: '10B-08', name: 'Rohan Varma', uid: 'GR-2021-9954', theory: 38, practical: 22, total: 60, grade: 'B2', pct: '64.0%ile', status: 'Pending Review', remark: 'Assign Clinic', av: 'av-purple' },
  { roll: '10B-14', name: 'Tanya Mukherjee', uid: 'GR-2021-1064', theory: 58, practical: 27, total: 85, grade: 'A2', pct: '88.5%ile', status: 'Verified', remark: '"Well structured lab manual"', av: 'av-teal' },
  { roll: '10B-22', name: 'Vikramaditya Singh', uid: 'GR-2021-1022', theory: 24, practical: 18, total: 42, grade: 'D', pct: '18.0%ile', status: 'Remedial Flag', remark: 'Parent Intimation Sent', highlight: true, av: 'av-red' },
  { roll: '10B-30', name: 'Zoya Patel', uid: 'GR-2021-1945', theory: 62, practical: 28, total: 90, grade: 'A1', pct: '93.0%ile', status: 'Verified', remark: '"Good analytical answers"', av: 'av-orange' },
]

const gradeColor = { A1: 'badge-green', A2: 'badge-blue', B2: 'badge-yellow', D: 'badge-red' }
const bandData = [
  { band: 'A1 Band', val: 12, note: '(91–100)', color: '#16a34a' },
  { band: 'A2 Band', val: 10, note: '', color: '#22c55e' },
  { band: 'B1 Band', val: 8, note: '', color: '#86efac' },
  { band: 'B2 Band', val: 5, note: '', color: '#fcd34d' },
  { band: 'C1 Band', val: 4, note: '', color: '#f59e0b' },
  { band: 'D Band', val: 3, note: 'Remedial', color: '#dc2626' },
]

export default function Results() {
  const [filter, setFilter] = useState('All Students (42)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Evaluation &amp; Records</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Results &amp; Exam Marks Entry</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Scholastic Marks Entry &amp; Grading Register</h1>
          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            <span className="badge badge-blue">● Pro-Board I Moderated · Term II Open</span>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            Enter, moderate, and cryptographically sign off formative, summative, and practical marks across assigned cohorts in compliance with CBSE statutory assessment circulars.
          </div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Import CSV Marks</button>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export Scorecard Ledger</button>
          <button className="btn btn-primary btn-sm"><RefreshCw size={12} /> Sync with CBSE Digital Portal</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Cohort Roster</div>
          <div className="stat-value">38<span style={{ fontSize: 14, color: '#64748b' }}>/42</span></div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Grade 10-B (Physics Code 086)</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <span className="badge badge-gray" style={{ fontSize: 10 }}>4 under verification</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cohort Mean Score</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>79.4%</div>
          <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>↑ +4.2%</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Benchmark: 75.0% (Term I target met)</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Std Deviation: ≈6.8 · High Proficiency</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Distinction Tally</div>
          <div className="stat-value">22</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>A1 &amp; A2 Grade Band Scholars</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>52.4% of total · +5 vs Pre-Board M</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Remedial Flag (&lt;40%)</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>03</div>
          <div style={{ fontSize: 11, color: '#dc2626' }}>Students · Mandatory Tutorial Clinic</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            <span className="badge badge-yellow" style={{ fontSize: 10 }}>Parents Intimated</span>
            <span className="badge badge-red" style={{ fontSize: 10 }}>Action Active</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
        <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
          <option>Grade 10-B (Homeroom · 42)</option>
        </select>
        <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
          <option>Physics (CBSE Code 086)</option>
        </select>
        <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
          <option>CBSE Pre-Board Mock 1 – Term II</option>
        </select>
        <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
          <option>Theory: 70 · Prac: 30 Max 100</option>
        </select>
      </div>

      <div className="chip-group" style={{ marginBottom: 14 }}>
        {['All Students (42)', 'Needs Grading 4', 'Distinction Band (>90%) 22', 'Remedial Flag (<40%)'].map(f => (
          <button key={f} className={`chip${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <div className="search-bar" style={{ marginLeft: 'auto', minWidth: 200 }}>
          <input placeholder="Search by Roll # or name..." />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Evaluation Roster <span style={{ fontWeight: 400, fontSize: 12, color: '#64748b' }}>Batch ID: #CBSE-2025-10B-PHY-PB1</span></div>
          </div>
          <div className="flex gap-2">
            <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Autosaved 2 mins ago</span>
            <button className="btn btn-outline btn-sm">Column Visibility</button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ROLL #</th>
                <th>STUDENT SCHOLAR</th>
                <th>THEORY (/70)</th>
                <th>PRACTICAL (/30)</th>
                <th>TOTAL (/100)</th>
                <th>CBSE GRADE</th>
                <th>PERCENTILE</th>
                <th>MODERATION STATUS</th>
                <th>ACADEMIC REMARK</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.roll} style={{ background: s.highlight ? '#fff5f5' : 'white' }}>
                  <td style={{ fontWeight: 700, fontSize: 12, color: s.highlight ? '#dc2626' : '#1e293b' }}>{s.roll}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div className={`avatar ${s.av}`} style={{ width: 28, height: 28, fontSize: 11 }}>
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: '#94a3b8' }}>UID: {s.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 15, color: s.theory < 35 ? '#dc2626' : '#1e293b' }}>{s.theory}</td>
                  <td style={{ fontWeight: 700, fontSize: 15 }}>{s.practical}</td>
                  <td style={{ fontWeight: 800, fontSize: 16, color: s.total < 40 ? '#dc2626' : s.total >= 90 ? '#16a34a' : '#1e293b' }}>{s.total}</td>
                  <td><span className={`badge ${gradeColor[s.grade] || 'badge-gray'}`} style={{ fontWeight: 800, fontSize: 12 }}>{s.grade}</span></td>
                  <td style={{ fontWeight: 600, fontSize: 12 }}>{s.pct}</td>
                  <td>
                    {s.status === 'Pending Review'
                      ? <span className="badge badge-yellow"><AlertTriangle size={11} /> {s.status}</span>
                      : s.status === 'Remedial Flag'
                        ? <span className="badge badge-red">⚠ {s.status}</span>
                        : s.status === 'Verified & Locked'
                          ? <span className="badge badge-green"><CheckCircle size={11} /> Verified &amp; Locked</span>
                          : <span className="badge badge-green"><CheckCircle size={11} /> {s.status}</span>
                    }
                  </td>
                  <td style={{ fontSize: 12, color: '#64748b', maxWidth: 180 }}>
                    {s.status === 'Pending Review'
                      ? <button className="btn btn-outline btn-sm">Assign Clinic</button>
                      : s.status === 'Remedial Flag'
                        ? <div style={{ display: 'flex', gap: 4 }}><span className="badge badge-red" style={{ fontSize: 10 }}>Remedial Flag</span><button className="btn btn-sm btn-outline" style={{ fontSize: 10, padding: '1px 6px' }}>Parent SMS</button></div>
                        : s.remark
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Displaying 6 of 42 scholars in Grade 10-B · Showing active Pre-Board ledger</span>
          <div className="pagination">
            <button>←</button>
            <button className="active">1</button>
            <button>→</button>
          </div>
        </div>
      </div>

      {/* Distribution + Moderation */}
      <div className="two-col mt-4">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">📊 CBSE Band Distribution</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Cohort 10-B Final Bell Curve</div>
            </div>
            <span className="badge badge-gray">Normal Curve</span>
          </div>
          {/* Simple bar chart */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginBottom: 12, padding: '0 8px' }}>
            {bandData.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: b.color }}>{b.val}</div>
                <div style={{ width: '100%', height: `${b.val * 6}px`, background: b.color, borderRadius: '2px 2px 0 0', minHeight: 8 }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {bandData.map((b, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: b.color }}>{b.val}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{b.band}</div>
                {b.note === 'Remedial' && <span className="badge badge-red" style={{ fontSize: 10 }}>Remedial</span>}
                {b.note && b.note !== 'Remedial' && <div style={{ fontSize: 10, color: '#94a3b8' }}>{b.note}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">🔐 Statutory Moderation &amp; CBSE Direct Sign-Off</div>
            <span className="badge badge-green">Department Verified</span>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12, lineHeight: 1.6 }}>
            Marks moderated under Section 8.3 of Senior Secondary Examination Byelaws. Once dispatched, grade changes require Regional Office counter-affidavit.
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc', marginBottom: 10 }}>
            <div className="avatar av-purple" style={{ width: 36, height: 36, borderRadius: 8, fontSize: 13 }}>SR</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Dr. S. Ramanujam (HOD Science)</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Approved &amp; Certified on Feb 22, 2025 · 16:40 IST</div>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: 10, borderRadius: 6, marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 2 }}>Cryptographic Checksum</div>
            <div style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700 }}>SHA-256: 7f8a...9c4b2e</div>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>
            Dual signature required: Lead Teacher + Principal
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Save Draft Record</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><Lock size={12} /> Lock &amp; Dispatch Final Grades</button>
          </div>
        </div>
      </div>
    </div>
  )
}
