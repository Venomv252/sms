import React, { useState } from 'react'
import { Bell, Plus, Download, Settings, Send, Upload, CheckCircle, Eye, Wifi } from 'lucide-react'

const broadcasts = [
  {
    tags: ['📌 PINNED CIRCULAR', 'Homeroom Mandatory', 'External Moderation'],
    title: 'Pre-Board Science Practical Lab Records Submission Deadline',
    target: 'Grade 10-B (42 Students & Parents)',
    dispatched: 'Dispatched Feb 22, 2025 · 08:30 AM',
    body: 'Mandatory submission of Chemistry Record Books & Physics Practical Journals for external CBSE moderation. Must be signed by parent. Incomplete records will not be assigned viva marks for Term II.',
    file: 'Grade10B_Science_PreBoard_Revision_Blueprint.pdf',
    fileSize: '2.8 MB · Verified Digital Circular',
    channels: ['Student Portal', 'Parent App', 'WhatsApp Digest'],
    readStudents: '38/42 Students Read (90%)',
    readParents: '35/42 Parents Ack (83%)',
    pending: 4, status: 'pinned'
  },
  {
    tags: ['Academic Coursework', 'LMS Assignment', 'Active Submissions'],
    title: 'Term II Optics & Lens Problem Set Released on LMS',
    target: 'Grade 10-B · Physics Track (42 Students)',
    dispatched: 'Dispatched Feb 20, 2025 · 04:15 PM',
    body: 'Supplementary worksheet containing numericals on refractive index, Snell\'s Law, and thin lens formula now accessible under Physics module. Solutions will be discussed on Thursday.',
    file: '',
    channels: ['Student ERP & Mail'],
    readStudents: '34/42 Submitted',
    readParents: '',
    pending: 0, status: 'active'
  },
  {
    tags: ['Team & Athletics', 'School Team'],
    title: 'Inter-Team Athletics Trials – School Team Roster',
    target: 'Emerald Falcon Team Members (Grades 9–12)',
    dispatched: 'Dispatched Yesterday · 02:00 PM',
    body: 'Trials for 100m, 400m relay, and long jump will commence at the Main Athletics Oval on Monday 03:30 PM. Participants must report with official team sports kit and signed medical clearance slip.',
    file: '',
    channels: ['Digital Notice Board & Student App'],
    readStudents: '120 Athletes Notified',
    readParents: '',
    pending: 0, status: 'active'
  },
]

export default function Announcements() {
  const [activeStream, setActiveStream] = useState('All Streams (6)')
  const [targeting, setTargeting] = useState({ grade10: true, grade10parents: true, grade12: false })

  return (
    <div>
      <div className="breadcrumb">
        <span>Communication &amp; Admin</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Announcements</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Class Announcements &amp; Multi-Channel Broadcast Center</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Draft, schedule, and dispatch verified academic notices, emergency alerts, and homework circulars to students and parent portals.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Eye size={13} /> Delivery Audit</button>
          <button className="btn btn-outline btn-sm"><Settings size={13} /> Settings</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> + Create New Broadcast</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Active Broadcasts</div>
          <div className="stat-value">6</div>
          <div style={{ fontSize: 11 }}>Published · Term II Active Campaign</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <span className="badge badge-gray" style={{ fontSize: 10 }}>RSS</span>
            <span className="badge badge-green" style={{ fontSize: 10 }}>WhatsApp &amp; ERP Handshake</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Delivery Success</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>99.8%</div>
          <div style={{ fontSize: 11 }}>SMS + Push</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '99.8%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Parent Read Compliance</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>91.2%</div>
          <div style={{ fontSize: 11 }}>Ack Rate</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Average read within 2.1h</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Emergency Gateway</div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#16a34a' }}>Operational</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Wifi size={12} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: 11 }}>High Priority Ready</span>
          </div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stream filters */}
          <div className="chip-group">
            {['All Streams (6)', 'Homeroom 10-B', 'Physics Senior', 'Parent Un'].map(t => (
              <button key={t} className={`chip${activeStream === t ? ' active' : ''}`} onClick={() => setActiveStream(t)}>{t}</button>
            ))}
            <select className="form-select" style={{ fontSize: 12, marginLeft: 'auto', width: 'auto' }}>
              <option>Latest ↓ Sort:</option>
            </select>
          </div>

          {broadcasts.map((b, i) => (
            <div key={i} style={{ border: `1px solid ${b.status === 'pinned' ? '#bfdbfe' : '#e2e8f0'}`, borderRadius: 10, padding: 16, background: 'white' }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                {b.tags.map((tag, j) => (
                  <span key={j} className={`badge ${j === 0 && b.status === 'pinned' ? 'badge-blue' : j === 0 ? 'badge-green' : 'badge-gray'}`}>{tag}</span>
                ))}
                <span style={{ marginLeft: 'auto', cursor: 'pointer', fontSize: 18, color: '#94a3b8' }}>⋮</span>
              </div>

              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{b.title}</div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>🎯 Target: {b.target}</span>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>⏰ {b.dispatched}</span>
              </div>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>{b.body}</p>

              {b.file && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 10, background: '#f8fafc', borderRadius: 6, marginBottom: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 32, height: 36, background: '#fee2e2', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>📄</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{b.file}</div>
                    {b.fileSize && <div style={{ fontSize: 11, color: '#94a3b8' }}>{b.fileSize}</div>}
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm"><Eye size={12} /></button>
                    <button className="btn btn-primary btn-sm"><Download size={12} /></button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748b', flexShrink: 0 }}>Dispatched Channels:</span>
                {b.channels.map((c, j) => <span key={j} className="badge badge-blue">{c}</span>)}
              </div>

              {b.readStudents && (
                <div style={{ background: '#f8fafc', borderRadius: 6, padding: '8px 10px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>
                      Read Audit Status: <strong>{b.readStudents}</strong>
                      {b.readParents && <> · <strong>{b.readParents}</strong></>}
                    </span>
                  </div>
                  {b.pending > 0 && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: '#f59e0b' }}>⚠ {b.pending} parents have not acknowledged receipt yet.</span>
                      <button className="btn btn-outline btn-sm" style={{ color: '#f59e0b', borderColor: '#fcd34d', fontSize: 11 }}>
                        Send SMS Nudge ({b.pending})
                      </button>
                    </div>
                  )}
                  {b.readStudents.includes('Submitted') && (
                    <button className="btn btn-outline btn-sm" style={{ fontSize: 11, marginTop: 4 }}>View Problem Set</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Quick Broadcast Composer */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, background: '#16a34a', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Send size={14} style={{ color: 'white' }} />
              </div>
              <div>
                <div className="card-title">Quick Broadcast Composer</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Institutional multi-channel dispatch</div>
              </div>
            </div>
            <span className="badge badge-green">READY</span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>1. SELECT TARGET AUDIENCE</div>
            {[
              { key: 'grade10', label: 'Grade 10-B (Homeroom)', count: '42 Students' },
              { key: 'grade10parents', label: 'All Parents of Grade 10-B', count: '42 Primary Guardians' },
              { key: 'grade12', label: 'Grade 12-A (Advanced Physics)', count: '28 Students' },
            ].map((t) => (
              <label key={t.key} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, cursor: 'pointer', fontSize: 13, padding: '6px 8px', border: `1px solid ${targeting[t.key] ? '#86efac' : '#e2e8f0'}`, borderRadius: 6, background: targeting[t.key] ? '#f0fdf4' : 'white' }}>
                <input type="checkbox" checked={targeting[t.key]} onChange={() => setTargeting(p => ({ ...p, [t.key]: !p[t.key] }))} style={{ accentColor: '#16a34a' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.count}</div>
                </div>
              </label>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>2. BROADCAST CLASSIFICATION</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {['Academic Notice', 'Homework/Task', 'Urgency Alert', 'Campus Event'].map((cls, i) => (
                <button key={cls} className={`btn btn-sm ${i === 0 ? 'btn-primary' : 'btn-outline'}`} style={{ fontSize: 11 }}>{cls}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>3. MULTI-CHANNEL DISPATCH ROUTE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {[
                { label: 'Student ERP Portal', checked: true },
                { label: 'Parent App Push', checked: true },
                { label: 'WhatsApp Digest', checked: true },
                { label: '⚡ Urgent SMS', checked: false },
              ].map((ch, i) => (
                <label key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer', padding: '4px 0' }}>
                  <input type="checkbox" defaultChecked={ch.checked} style={{ accentColor: '#16a34a' }} />
                  {ch.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 11, color: '#374151', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>4. BROADCAST CONTENT</div>
            <input className="form-input" placeholder="Notice Subject (e.g. Schedule Change for Phy..." style={{ marginBottom: 8 }} />
            <textarea className="form-textarea" placeholder="Write verified circular statement... Include reporting timings, classroom venues, or preparation requirements." style={{ minHeight: 70 }} />
          </div>

          <div style={{ border: '2px dashed #e2e8f0', borderRadius: 8, padding: 12, textAlign: 'center', marginBottom: 12, fontSize: 12, color: '#94a3b8', cursor: 'pointer' }}>
            <Upload size={20} style={{ display: 'block', margin: '0 auto 4px', color: '#94a3b8' }} />
            Upload Circular PDF or drag files here
            <div style={{ fontSize: 11 }}>Max file size 10MB (PDF, DOCX, PNG)</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc', marginBottom: 14 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>Require Parent Countersignature</div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>Mandate formal read acknowledgment</div>
            </div>
            <div style={{ width: 40, height: 22, background: '#16a34a', borderRadius: 11, position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
              <div style={{ width: 18, height: 18, background: 'white', borderRadius: 9, position: 'absolute', right: 2, top: 2 }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>📅 Schedule</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>▶ Broadcast Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
