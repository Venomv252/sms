import React, { useState } from 'react'
import { Plus, RefreshCw, Download, Eye, Scan, FileText, CheckCircle, AlertTriangle } from 'lucide-react'

const assignments = [
  {
    id: 1, class: 'Grade 10-B · Physics', due: 'Due Today 05:00 PM', turnitin: '0% Clean',
    title: 'Optics & Lens Numerical Worksheet',
    desc: 'Focal length derivations, sign convention verification, and thin lens formula calculations for convex and concave lenses.',
    submissions: '34 / 42 (81%)', pending: '8 Pending Parent Countersignatures',
    status: 'urgent', tag: 'Due Today 05:00 PM', physical: 'Turnitin Similarity'
  },
  {
    id: 2, class: 'Grade 12-A · Advanced Physics', due: 'Due Friday Mar 01', turnitin: 'In Progress',
    title: 'Physics Practical Journal Verification',
    desc: 'Verification of spectrometer calibration graphs, prism refraction measurements, and observation tabulations.',
    submissions: '18 / 42 (43%)', pending: '24 In Progress – Lab desks 1 to 14',
    status: 'pending', tag: 'Lab Practicum', physical: 'Physical Stamping'
  },
  {
    id: 3, class: 'Grade 10-B · Cross-Curricular', due: 'Due Monday Mar 04', turnitin: '',
    title: 'Nationalist Centers Map Work & Topography',
    desc: 'Geographic coordinates identification, historicon-analysis of nationalist movement centers across India.',
    submissions: '39 / 42 Finished', pending: '',
    status: 'good', tag: 'Joint Dept: Social Science', physical: ''
  },
]

const submissions = [
  { name: 'Aarav Y. Sharma', roll: 'Roll #10-B-04', submitted: 'Today, 02:14 PM', early: '2h 46min early', file: 'Aarav_Optics_Sol.pdf', turnitin: '2% Similar', score: '24', max: 25, remark: 'Flawless ray diagrams', parent: true, av: 'av-green' },
  { name: 'Elena Rostova', roll: 'Roll #10-B-19', submitted: 'Today, 03:45 PM', early: '1h 15m early', file: 'Rostova_Lens_Wkst.pdf', turnitin: '0% Clean', score: '22', max: 25, remark: 'Minor sign error in Q4', parent: true, av: 'av-blue' },
  { name: 'Marcus Kim', roll: 'Roll #10-B-29', submitted: 'Today, 04:12 PM', early: '48m early', file: 'Kim_Optics_Scans.pdf', turnitin: '14% Matched', score: '--', max: 25, remark: 'Please obtain guardian countersign', parent: false, av: 'av-orange' },
]

export default function Homework() {
  const [activeTab, setActiveTab] = useState('Due Soon')

  return (
    <div>
      <div className="breadcrumb">
        <span>Daily Classroom Ops</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Homework &amp; Assignments</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Homework &amp; Assignment Hub</h1>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ padding: '5px 10px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#16a34a' }}>
            SPRING TERM · WEEK 9
          </div>
          <button className="btn btn-outline btn-sm"><RefreshCw size={13} /> Sync Classroom</button>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export Digest</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> + Create New Assignment</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Active Tasks</div>
          <div className="stat-value">3</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Live Broadcast</div>
          <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>● 2 due within 24h</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Tonight's Queue</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>18</div>
          <div style={{ fontSize: 11 }}>drafts</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Est. grading: 42 min</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Compliance</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>98.2%</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '98.2%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Countersigns</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>8</div>
          <div style={{ fontSize: 11 }}>pending</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>SMS nudge queued</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Term Average</div>
          <div className="stat-value">88.4%</div>
          <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>–2.4%</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Benchmark: Greenwood STEM</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Assignment list */}
          <div className="card">
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Due Soon 2', 'Pending Review 3', 'Graded / 18', 'Archived'].map((t) => (
                <button key={t} className={`chip${activeTab === t.split(' ')[0] ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.split(' ')[0])}>{t}</button>
              ))}
              <div className="search-bar" style={{ marginLeft: 'auto', minWidth: 200 }}>
                <input placeholder="Filter by chapter, title..." />
              </div>
            </div>

            {assignments.map((a) => (
              <div key={a.id} style={{
                border: `1px solid ${a.status === 'urgent' ? '#fca5a5' : '#e2e8f0'}`,
                borderLeft: `4px solid ${a.status === 'urgent' ? '#dc2626' : a.status === 'pending' ? '#f59e0b' : '#16a34a'}`,
                borderRadius: 8, padding: 14, marginBottom: 12,
                background: a.status === 'urgent' ? '#fff8f8' : 'white'
              }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                  <Eye size={14} style={{ color: '#64748b' }} />
                  <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{a.class}</span>
                  <span className={`badge ${a.status === 'urgent' ? 'badge-red' : a.status === 'good' ? 'badge-green' : 'badge-yellow'}`}>{a.due}</span>
                  {a.turnitin && (
                    <span className={`badge ${a.turnitin.includes('0%') ? 'badge-green' : 'badge-blue'}`}>Turnitin: {a.turnitin}</span>
                  )}
                  {a.physical && <span className="badge badge-gray">{a.physical}</span>}
                  <span className="badge badge-gray">{a.tag}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10, lineHeight: 1.5 }}>{a.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12 }}>Submissions: <strong>{a.submissions}</strong></span>
                  {a.pending && <span style={{ fontSize: 12, color: '#f59e0b' }}>⚠ {a.pending}</span>}
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                    {a.status === 'pending' && <button className="btn btn-outline btn-sm"><FileText size={12} /> Scan Books</button>}
                    <button className="btn btn-primary btn-sm">Review &amp; Batch Grade</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submissions Queue */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Submissions Queue &amp; Rubric Evaluation</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Review attached working files, Turnitin originality scores, input marks and instant remarks.</div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-blue">Grade 10-B · Optics</span>
                <span className="badge badge-green">Auto-save: Active</span>
                <button className="btn btn-outline btn-sm"><CheckCircle size={12} /> Mark All Complete</button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>STUDENT NAME &amp; ID</th>
                    <th>SUBMISSION TIME</th>
                    <th>ATTACHMENT</th>
                    <th>TURNITIN</th>
                    <th>SCORE (MAX 25)</th>
                    <th>TEACHER FEEDBACK REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div className={`avatar ${s.av}`} style={{ width: 30, height: 30, fontSize: 11 }}>
                            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.roll}</div>
                            {!s.parent && <span className="badge badge-yellow" style={{ fontSize: 10 }}>Countersign Missing</span>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{s.submitted}</div>
                        <div style={{ fontSize: 11, color: '#16a34a' }}>{s.early}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: 24, height: 28, background: '#fee2e2', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText size={12} style={{ color: '#dc2626' }} />
                          </div>
                          <span style={{ fontSize: 12, color: '#3b82f6' }}>{s.file}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${s.turnitin === '0% Clean' ? 'badge-green' : s.turnitin.includes('14') ? 'badge-yellow' : 'badge-green'}`}>
                          ● {s.turnitin}
                        </span>
                      </td>
                      <td style={{ fontWeight: 800, fontSize: 16 }}>
                        {s.score === '--' ? <span style={{ color: '#94a3b8' }}>–– / {s.max}</span> : <>{s.score} / {s.max}</>}
                      </td>
                      <td style={{ fontSize: 12, color: '#64748b', maxWidth: 180 }}>{s.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>Showing 3 of 34 submissions awaiting Dr. Evans's sign-off</span>
              <div className="pagination">
                <button>←</button>
                <button className="active">1</button>
                <button>→ Page 1 of 12</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Quick Assignment Publisher */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div className="card-title">Quick Assignment Publisher</div>
            <span className="badge badge-blue">Draft #14</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Dispatch curriculum coursework directly to Greenwood student portals &amp; parents.</div>

          <div style={{ marginBottom: 12 }}>
            <div className="form-label">Target Cohort / Class</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[{ label: 'Grade 10-B', sub: '42 Students · Physics' }, { label: 'Grade 12-A', sub: '42 Students · Adv Sci' }].map((c, i) => (
                <label key={i} style={{
                  display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer',
                  flex: 1, padding: '7px 8px', border: `1px solid ${i === 0 ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: 6, background: i === 0 ? '#f0fdf4' : 'white'
                }}>
                  <input type="radio" name="cohort" defaultChecked={i === 0} style={{ accentColor: '#16a34a' }} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.label}</div>
                    <div style={{ color: '#94a3b8', fontSize: 11 }}>{c.sub}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Subject &amp; Unit Reference</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-blue">Physics</span>
              <span className="badge badge-gray">Wave Optics &amp; Interference</span>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Assignment Title</div>
            <input className="form-input" defaultValue="Young's Double Slit Experiment Simulation" />
          </div>

          <div className="form-group">
            <div className="form-label">Submission Deadline</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input className="form-input" defaultValue="March 06, 2025 · 23:55" style={{ flex: 1 }} />
              <span className="badge badge-blue">In 5 Days</span>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Worksheet &amp; Reference Assets</div>
            <div style={{ border: '2px dashed #e2e8f0', borderRadius: 8, padding: 14, textAlign: 'center', color: '#94a3b8', fontSize: 12, cursor: 'pointer' }}>
              Click to upload or drag problem sheet
              <div style={{ fontSize: 11 }}>PDF, DOCX, GeoGebra or Python Notebooks (Max 25MB)</div>
            </div>
          </div>

          {[
            { label: 'Require Parent Countersignature', checked: true },
            { label: 'Instant WhatsApp / SMS Broadcast', checked: true },
          ].map((opt, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #f8fafc', fontSize: 13 }}>
              <span>{opt.label}</span>
              <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor: '#16a34a' }} />
            </div>
          ))}

          <button className="btn btn-primary w-full mt-3">
            <Scan size={13} /> Broadcast Assignment to Cohort
          </button>
        </div>
      </div>
    </div>
  )
}
