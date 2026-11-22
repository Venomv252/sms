import React, { useState } from 'react'
import { Upload, Download, Eye, EyeOff, Search, Cloud, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

const files = [
  { name: 'Electromagnetic_Induction_Handout.pdf', size: '3.4 MB', cohort: 'Grade 10-B', date: 'Oct 18, 2024 · 08:45 AM', downloads: '41 / 42', portal: true, type: 'Interactive Lecture Han', icon: '📄' },
  { name: 'Formula_Sheet_Term2_Complete.pdf', size: '1.6 MB', cohort: 'Grade 10-B · 12-A', date: 'Oct 16, 2024 · 03:12 PM', downloads: '39 / 42', portal: true, type: 'Core Formulas Summary', icon: '📄' },
  { name: 'Optics_Ray_Diagrams_Exemplar.pdf', size: '4.1 MB', cohort: 'Grade 10-B', date: 'Oct 14, 2024 · 11:20 AM', downloads: '38 / 42', portal: false, type: 'Unit 06 · Schematics', icon: '📄' },
  { name: 'Pre_Board_Question_Bank_2025.pdf', size: '5.2 MB', cohort: 'Grade 10-B', date: 'Oct 11, 2024 · 04:50 PM', downloads: '42 / 42', portal: true, type: 'Standardized Question Vault', icon: '📄' },
]

const auditStudents = [
  { name: 'Aarav Mehta', roll: 'Roll #08 · Dow...', status: 'Read & Logged', date: 'Oct 18, 10:45 AM', color: 'av-green' },
  { name: 'Chloe Lawrence', roll: 'Roll #08 · Dow...', status: 'Read & Logged', date: 'Oct 18, 10:30 AM', color: 'av-blue' },
  { name: 'Devansh Kulkar...', roll: 'Roll #04 · Dow...', status: 'Read & Logged', date: 'Oct 18, 06:05 AM', color: 'av-purple' },
  { name: 'Nisha Patel', roll: 'Roll #22 · Dow...', status: 'Read & Logged', date: 'Oct 18, 04:30 PM', color: 'av-orange' },
  { name: 'Rohan Sengupta', roll: 'Roll #11 · Dow...', status: 'Read & Logged', date: 'Oct 18, 03:44 PM', color: 'av-teal' },
  { name: 'Tanmay Verma', roll: 'Roll #39 · No Dow...', status: 'Unopened', date: '', color: 'av-red' },
]

export default function StudyMaterial() {
  const [activeFilter, setActiveFilter] = useState('All Materials (142)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Daily Classroom Ops</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Study Material Upload</span>
        <span className="badge badge-green" style={{ marginLeft: 6 }}>AY 2024-25 Active</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">
            Study Material, Notes & Question Bank Repository
            <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 400, marginLeft: 8 }}>⚡ Syncing Real-time LMS Access</span>
          </h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Curated teaching collateral, pedagogical blueprints, and trackable revision packets for senior physics batches.</div>
        </div>
        <button className="btn btn-primary btn-sm"><Upload size={13} /> Upload New Resource</button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Active Handouts</div>
          <div className="stat-value">142</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>+12 this term</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Across 4 curriculum modules</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Student Downloads</div>
          <div className="stat-value">4.2k</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>94% weekly reach</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Peak activity on exam eves</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Engagement Rate</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>85%</div>
          <span className="badge badge-red">High</span>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Read verification prior to lab tests</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Cloud Storage Used</div>
          <div className="stat-value">2.4</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>GB of 10 GB limit</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '24%' }} /></div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Upload Section */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🚀 Quick Resource Upload & Dispatch</div>
              <span className="badge badge-blue">LMS DISPATCH FORM</span>
            </div>
            <div style={{ border: '2px dashed #e2e8f0', borderRadius: 10, padding: 24, textAlign: 'center', marginBottom: 14 }}>
              <Cloud size={32} style={{ color: '#94a3b8', marginBottom: 8, display: 'block', margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 600, fontSize: 14 }}>Drag and drop course materials here</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>Accepts official formats: PDF, DOCX, PPTX (Maximum individual packet size: 25MB)</div>
              <button className="btn btn-primary btn-sm">Browse Local Drives</button>
              <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8 }}>or paste shared link</span>
            </div>

            <div className="three-col" style={{ marginBottom: 12, gap: 8 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="form-label">Target Class / Cohort</div>
                <select className="form-select"><option>Grade 10-B Homeroom</option><option>Grade 12-A</option></select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="form-label">Curriculum Unit Tag</div>
                <select className="form-select"><option>Unit 04: Electromagnet</option></select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="form-label">Material Classification</div>
                <select className="form-select"><option>Interactive Lecture Han</option></select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Access Permissions & Audit Level</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Students Only', 'Include Parents', 'Faculty Private'].map((p, i) => (
                  <button key={i} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-outline'}`}>{p}</button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 12, color: '#16a34a', marginBottom: 10 }}>
              ✓ Automatic malware scan & student portal notifications enabled
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm">Discard Draft</button>
              <button className="btn btn-primary btn-sm">↑ Publish to Portal</button>
            </div>
          </div>

          {/* Active Files Repository */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Active Files & Handouts Repository</div>
              <div className="search-bar" style={{ width: 200 }}>
                <Search size={13} style={{ color: '#94a3b8' }} />
                <input placeholder="Search filenames, tags..." />
              </div>
            </div>

            <div className="chip-group">
              {['All Materials (142)', 'Question Banks (34)', 'Formula Cheat Sheets (18)', 'Lab Manuals (26)', 'Pre-Board Blueprints (12)'].map(f => (
                <button key={f} className={`chip${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>RESOURCE DOCUMENT</th>
                    <th>TARGET COHORT</th>
                    <th>UPLOAD DATE</th>
                    <th>STUDENT DOWNLOADS</th>
                    <th>PARENT PORTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ width: 32, height: 32, background: '#fee2e2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={16} style={{ color: '#dc2626' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{f.name}</div>
                            <div style={{ fontSize: 11, color: '#94a3b8' }}>{f.size} · {f.type}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-blue">{f.cohort}</span></td>
                      <td style={{ fontSize: 12, color: '#64748b' }}>{f.date}</td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{f.downloads} downloaded</div>
                      </td>
                      <td>
                        {f.portal
                          ? <span className="badge badge-green"><Eye size={11} /> Visible</span>
                          : <span className="badge badge-gray"><EyeOff size={11} /> Hidden</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>Showing 4 of 142 items</span>
              <button className="btn btn-outline btn-sm"><Download size={13} /> Download Comprehensive ZIP Archive</button>
            </div>
          </div>

          {/* Student Download Audit */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Student Download & Reading Audit: Grade 10-B</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Detailed read-receipt verification for active handout: "Electromagnetic_Induction_Handout.pdf"</div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-green">41 Confirmed</span>
                <span className="badge badge-yellow">1 Pending</span>
                <button className="btn btn-outline btn-sm">✉ Nudge Incomplete (1)</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
              {auditStudents.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 8, alignItems: 'center', padding: 10,
                  border: s.status === 'Unopened' ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                  borderRadius: 8, background: s.status === 'Unopened' ? '#fff5f5' : 'white'
                }}>
                  <div className={`avatar ${s.color}`} style={{ width: 28, height: 28, fontSize: 11 }}>
                    {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.roll}</div>
                    <span className={`badge ${s.status === 'Unopened' ? 'badge-red' : 'badge-green'}`} style={{ fontSize: 10 }}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, color: '#64748b' }}>
              <span>Average time spent reviewing handout before lab test: <strong>26 minutes</strong></span>
              <button className="btn btn-outline btn-sm"><Download size={12} /> Download Full Compliance Audit Report</button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Lab Practical Alignment */}
          <div className="card" style={{ background: '#1e293b', color: 'white' }}>
            <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase' }}>Lab Practical Alignment</div>
            <div style={{ width: '100%', height: 80, background: '#334155', borderRadius: 6, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#64748b', fontSize: 12 }}>📸 Lab Image</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Upcoming Milestone: Term II Physics Practicals</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>
              The lab manual blueprints and ray diagram blueprints uploaded below are mandatory preparation materials for Grade 10-B prior to Wednesday's optical bench verification session.
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#4ade80' }}>
              <CheckCircle size={14} />
              Pre-Lab Reading Requirement: 34 of 42 students acknowledged.
            </div>
          </div>

          {/* Regulatory Quick-Vault */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Regulatory Quick-Vault</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>3 Essential SOPs</span>
            </div>
            {[
              { title: 'CBSE Curriculum Pacing Framework', sub: 'NCERT Reference' },
              { title: 'Exam Conduct Code & Invigilation Manual', sub: 'Download' },
              { title: 'Staff Code & Child Safeguarding Policy', sub: 'National Safety Council Reference' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f8fafc', fontSize: 13 }}>
                <span style={{ fontWeight: 600 }}>{r.title}</span>
                <button className="btn btn-outline btn-sm" style={{ fontSize: 11 }}>{r.sub}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
