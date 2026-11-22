import React, { useState } from 'react'
import { CheckCircle, Download, AlertTriangle, Calendar, FileText, Archive, Search } from 'lucide-react'

const circulars = [
  {
    priority: '★ Statutory · Action Required',
    tag: 'Pinned Bulletin',
    ref: 'Ref: CBSE/90/SUR/35/99',
    by: 'Controller of Exams',
    date: 'Feb 22, 2025',
    title: 'CBSE Senior Secondary Pre-Board Examination Moderation Protocol',
    body: 'In accordance with Central Board Notification CBSE/CE/2025, all senior secondary educators must execute internal moderation of physics, chemistry, and biology practical evaluation tests (MX30 scale). All Optics bench experiments, galvanometer calibration logs, and project via scores must be accompanied by non-tampered de-staged videos uploaded directly into the AISSE moderation portal by March 02, 2025.',
    applicability: 'Class 12 Faculty (Physics, Bio, Chem)',
    uploadDeadline: 'Sunday, Mar 02, 2025 · 23:59 IST',
    status: 'Live & Accepting Submissions',
    file: 'CBSE_Moderation_Guidelines_2025_Annexure_III.pdf',
    fileSize: '3.4 MB · Cryptographically Signed by Dr. K. Ramanujam, CBSE RO',
    acknowledged: 'Acknowledged by Dr. Alistair Evans on Feb 22, 2025 at 14:12 IST',
    type: 'statutory'
  },
  {
    priority: 'Campus Life & Athletics',
    ref: 'Ref: FSMS/SPR/2025/112',
    by: 'Sports Directorate',
    date: 'Feb 20, 2025',
    title: 'Annual Athletic Meet & Inter-Team Championship Schedule Revision',
    body: 'Due to forecasted midday temperature elevations next Wednesday, March 05, the morning track sprint heats will commence promptly at 07:15 AM on the Olympic synthetic track. School Team team patrons are requested to complete student roster muster-roll by 07:00 AM at the North Pavilion. First-aid paramedical booths will be stationed adjacent to Lane 1.',
    event: 'Event Date: Wednesday, March 05, 2025',
    venue: 'Main Sports Complex & South Grounds',
    duty: 'Team Duty: School Team Patron',
    type: 'sports'
  },
  {
    priority: 'Health & Safety Directive',
    ref: 'Ref: 408/4DH/LHR/2025/84',
    by: 'Campus Safety Officer',
    date: 'Feb 16, 2025',
    title: 'Revised Laboratory Safety Regulations & Chemical Disposal Standard Operating Procedures (SOP)',
    body: 'Mandatory requirement for all Senior Physics, Chemistry, and Integrated STEM laboratory instructors to perform and sign off the QI Fire Blanket, Acid Neutralizer, and Emergency Eyewash Station inspection. Disposal logs for organic solvents must be reconciled bi-weekly with Campus Waste Management.',
    file: 'SOP_Hazardous_Waste_2025.pdf',
    fileSize: '890 KB',
    labAudit: 'Laboratory Compliance Audit: Block C Physics Rm 204 · Certified + Valid thru June 2025',
    type: 'safety'
  },
]

const assemblies = [
  { date: '28', month: 'FEB', title: 'Academic Council Term Review', time: '03:30 PM – 05:00 PM', venue: 'Auditorium A · All HODs' },
  { date: '01', month: 'MAR', title: 'Moderation Board Signing Session', time: '10:00 AM – 01:00 PM', venue: 'Exam Syndicate Chamber' },
  { date: '08', month: 'MAR', title: 'Parent-Teacher Council Prep', time: '02:00 PM – 03:30 PM', venue: 'Central Library Concourse' },
]

const vault = [
  { title: 'CBSE Curriculum Pacing Framework', note: 'NCERT Reference – Revision Av 24-25' },
  { title: 'Exam Conduct Code & Invigilation Manual', note: 'Download · 2.7MB · Controller Dusk' },
  { title: 'Staff Code & Child Safeguarding Policy', note: 'PDF · 1.0MB · Legal Directorate' },
]

export default function Circulars() {
  const [filter, setFilter] = useState('All Notices (24)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Communication &amp; Admin</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Circulars &amp; Notices</span>
        <span className="badge badge-yellow" style={{ marginLeft: 6 }}>OFFICIAL GAZETTE · SEC 14(A)</span>
        <span className="badge badge-blue" style={{ marginLeft: 4 }}>Live Affiliation Desk #8S0029</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Institutional Notice Board &amp; Faculty Circulars</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Official administrative directives, CBSE statutory orders, academic calendars, examination protocols, and school-wide governance circulars.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><CheckCircle size={13} /> Mark All Read</button>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Download Selected Circulars</button>
          <button className="btn btn-primary btn-sm"><Archive size={13} /> Regulatory Archive</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 2 }}>Updated 18m ago · Audited · High Priority · Affiliation #820029</div>
          <div className="stat-label" style={{ marginTop: 4 }}>Active Circulars</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 800 }}>8</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>Actionable</span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            <span className="badge badge-blue" style={{ fontSize: 10 }}>4 Homeroom</span>
            <span className="badge badge-gray" style={{ fontSize: 10 }}>2 Faculty Only</span>
            <span className="badge badge-green" style={{ fontSize: 10 }}>2 CBSE</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Read Compliance</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>100%</div>
          <span className="badge badge-green" style={{ fontSize: 10 }}>Verified</span>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Dr. Alistair Evans is fully up to date</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Statutory Deadlines</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>2</div>
          <div style={{ fontSize: 11 }}>Deadlines</div>
          <div style={{ fontSize: 11, color: '#dc2626' }}>Pre-Board Moderation &amp; Hall...</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CBSE Bulletins</div>
          <div style={{ fontWeight: 800, fontSize: 14, marginTop: 4 }}>#CBSE-ACAD-2025-14</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>5th of 2025 · Active circular enforceable</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Filter tabs */}
          <div className="chip-group" style={{ marginBottom: 8 }}>
            {['All Notices (24)', 'Statutory CBSE (6)', 'Academic (12)'].map((t, i) => (
              <button key={i} className={`chip${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
            <div className="search-bar" style={{ marginLeft: 'auto', minWidth: 200 }}>
              <Search size={13} style={{ color: '#94a3b8' }} />
              <input placeholder="Search directives or ref #..." />
            </div>
          </div>

          {circulars.map((c, i) => (
            <div key={i} style={{
              border: `1px solid ${c.type === 'statutory' ? '#fca5a5' : '#e2e8f0'}`,
              borderLeft: `4px solid ${c.type === 'statutory' ? '#dc2626' : c.type === 'safety' ? '#f59e0b' : '#3b82f6'}`,
              borderRadius: 10, padding: 16,
              background: c.type === 'statutory' ? '#fff8f8' : 'white',
              marginBottom: 0
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {c.type === 'statutory' && <span className="badge badge-red">★ Statutory · Action Required</span>}
                {c.tag && <span className="badge badge-blue">{c.tag}</span>}
                {c.type !== 'statutory' && (
                  <span className="badge badge-gray">{c.priority}</span>
                )}
                <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 'auto' }}>{c.by} · {c.date}</span>
              </div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{c.ref}</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 12 }}>{c.body}</p>

              {c.applicability && (
                <div style={{ display: 'flex', gap: 16, marginBottom: 12, flexWrap: 'wrap', background: '#f8fafc', borderRadius: 6, padding: '8px 10px' }}>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: 10 }}>APPLICABILITY: </span>
                    <strong>{c.applicability}</strong>
                  </div>
                  <div style={{ fontSize: 12 }}>
                    <span style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: 10 }}>UPLOAD DEADLINE: </span>
                    <strong style={{ color: '#dc2626' }}>{c.uploadDeadline}</strong>
                  </div>
                  {c.status && (
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: 10 }}>PORTAL STATUS: </span>
                      <span className="badge badge-green" style={{ fontSize: 10 }}>{c.status}</span>
                    </div>
                  )}
                </div>
              )}

              {c.event && (
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span className="badge badge-blue">📅 {c.event}</span>
                  <span className="badge badge-gray">📍 {c.venue}</span>
                  <span className="badge badge-purple">👤 {c.duty}</span>
                </div>
              )}

              {c.file && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 10, background: '#f8fafc', borderRadius: 6, marginBottom: 10, border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 32, height: 36, background: '#fee2e2', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FileText size={18} style={{ color: '#dc2626' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.file}</div>
                    {c.fileSize && <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.fileSize}</div>}
                  </div>
                  <button className="btn btn-outline btn-sm">Inline Preview</button>
                  <button className="btn btn-primary btn-sm"><Download size={12} /> Download</button>
                </div>
              )}

              {c.labAudit && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                  <span className="badge badge-green" style={{ fontSize: 10 }}>✓ {c.labAudit}</span>
                  <button className="btn btn-outline btn-sm" style={{ fontSize: 11 }}>Open Digital Audit Checklist</button>
                </div>
              )}

              {c.acknowledged && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, color: '#16a34a', marginTop: 4 }}>
                  <CheckCircle size={13} />
                  {c.acknowledged}
                  <button className="btn btn-outline btn-sm" style={{ marginLeft: 8, fontSize: 11 }}>View Audit Certificate</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Faculty Assemblies */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Faculty Assemblies</div>
              <span className="badge badge-blue">Term II</span>
            </div>
            {assemblies.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < assemblies.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                <div style={{ width: 44, textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{a.date}</div>
                  <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 700 }}>{a.month}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{a.time}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>📍 {a.venue}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-3"><Calendar size={12} /> Sync with Google / Outlook Calendar</button>
          </div>

          {/* Regulatory Quick-Vault */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Regulatory Quick-Vault</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>3 Essential SOPs</span>
            </div>
            {vault.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: i < vault.length - 1 ? '1px solid #f8fafc' : 'none', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{r.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11 }}>{r.note}</div>
                </div>
                <button className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>↓</button>
              </div>
            ))}
            <button className="btn btn-primary w-full mt-3">Access Institutional Repository</button>
          </div>

          {/* Secretariat */}
          <div className="card" style={{ background: '#f8fafc' }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Secretariat &amp; Dispatch Desk</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8, lineHeight: 1.5 }}>Queries regarding CBSE moderation on annexures or dispatch circular updates? Contact Ms. Sunita Rao, Head Academic Liaison.</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 12 }}>Ext: 4421</span>
              <span style={{ fontSize: 12, color: '#3b82f6' }}>✉ secretariat@greenwood.edu</span>
            </div>
          </div>
        </div>
      </div>

      {/* CBSE Mandatory Section */}
      <div style={{ marginTop: 16, background: '#1e293b', borderRadius: 10, padding: 20, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CBSE MANDATORY TERM II MODERATION CYCLE</div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Academic Year 2024–25 Final Submission Window</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 6, lineHeight: 1.5 }}>Marks submission ledger locks automatically across national clusters on March 5, 2025.</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: 32, color: '#4ade80', lineHeight: 1 }}>12</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#4ade80' }}>DAYS REMAINING</div>
            <button className="btn btn-primary mt-2">Launch Portal</button>
          </div>
        </div>
      </div>
    </div>
  )
}
