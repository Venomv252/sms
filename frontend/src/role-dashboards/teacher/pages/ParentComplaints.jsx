import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, Send, MessageSquare, Phone, Search } from 'lucide-react'

const inquiries = [
  {
    id: '#TCK-2025-0914', tag: '🔴 Urgent · Facility Ack Required', category: 'Academic Dissertation',
    student: 'Aarav Sharma', roll: 'Roll #104 · Grade 10-B (Homeroom)', parent: 'Guardian',
    logged: 'Logged via Guardian · 09:32 AM',
    subject: 'Academic Lab Hours Waiver for National Science Camp (Bengaluru)',
    message: '"Dear Dr. Alistair Evans, we are submitting Aarav\'s official selection letter from the Ministry of Science & Technology for the 5-day National Young Physicists Symposium in Bengaluru (Feb 28 – Mar 03). Since this clashes with 4 mandatory senior physics practical lab hours, could you please allow him and forward the digital clearance notion so the board can reserve the exam-eligibility remains intact? We request permission for him to submit compensatory lab logs the following Monday."',
    attachments: ['SIC_Symposium_Nomination_Letter_(1.4 PB)', '● Digital Signature Validated'],
    status: 'pending', color: 'av-green'
  },
  {
    id: '#TCK-2025-0972', tag: 'In Progress · Clinic Scheduled', category: 'Remedial Support',
    student: 'Rohan Varma', roll: 'Roll #08 · Grade 10-B (Homeroom)',
    parent: 'Parent · Sulha Varma', logged: 'Yesterday · 04:15',
    subject: 'Academic Counseling on Physics Trigonometric Vectors & Mock Prep',
    message: '"Dr. Evans, Rohan is experiencing significant hesitation with Z-divergence mock solutions in Unit 3. His score in the weekly formative appris to 65%. Could he please be enrolled in the Wednesday afternoon physics remedial clinic for small group coaching?"',
    attachments: ['Append Session Notes', 'Mark Read and after Session'],
    status: 'in-progress', color: 'av-blue'
  },
  {
    id: '#TCK-2025-0933', tag: '✅ Resolved & Recorded · Uniform & Commit',
    category: '',
    student: 'Vikramaditya Singh', roll: 'Roll #22 · Grade 10-B',
    parent: 'Mrs. Renuka Singh (Punitive)', logged: 'Received Feb 21, 2025',
    subject: 'Review of Tardy Slip & Winter Uniform Blazer Citation',
    message: 'Sixth Monday notice on the recurring delayed arrivals. Tardy citation confirmed per school policy due to severe weather delays. Garment as-is result led on Feb 26 2015. Confirmation delivered.',
    status: 'resolved', color: 'av-red'
  },
  {
    id: '#TCK-2025-1041', tag: 'Received & Recorded · Campus Fleet Management · Transport Fleet',
    category: '',
    student: 'Tanmay Verma', roll: 'Roll #19 · Grade 10-B',
    parent: '', logged: 'Active with Floor Ops',
    subject: 'Persistent 30-min Delay on Bus Route #14 (Whitefield Sector)',
    message: 'Guardian concern regarding recurring delay in multiple drop reporting and bus timing. Transferred to Campus Fleet Manager Mr. Nallesh Babu with route to identify reconciliation.',
    status: 'transferred', color: 'av-orange'
  },
]

const templates = [
  'Lab Hours & External Event Waiver',
  'Remedial Clinic Appointment Initi...',
  'PTMS -Attacks Opt Confirmation',
]

export default function ParentComplaints() {
  const [filter, setFilter] = useState('All Inquiries 14')
  const [activeTemplate, setActiveTemplate] = useState(0)

  return (
    <div>
      <div className="breadcrumb">
        <span>Communication &amp; Admin</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Parent Complaints &amp; Grievance</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Parent Inquiries, Complaints &amp; Grievance Resolution</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Official reporting portal for student-guardian concerns, academic accommodations, special approvals, and grievance escalations.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm">SLA &amp; Escalation Protocol</button>
          <button className="btn btn-outline btn-sm">Export Ledger (CSV)</button>
          <button className="btn btn-primary btn-sm">+ Log Direct Guardian Memo</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Total Handled</div>
          <div className="stat-value">14</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>1 Term Handled</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>82% escalated inward · 100% Homeroom 10-B</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Open &amp; Actionable</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>02</div>
          <div style={{ fontSize: 11, color: '#dc2626' }}>3 Pending</div>
          <span className="badge badge-red" style={{ fontSize: 10 }}>Action Needed</span>
        </div>
        <div className="stat-card">
          <div className="stat-label">Mean Turnaround</div>
          <div className="stat-value">3.2 hrs</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Mandated Threshold: 7.4h</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>Opt-Net Response</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Guardian Approval</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>96.4%</div>
          <div style={{ fontSize: 11 }}>Fast: Response Rating</div>
          <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>)}
          </div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Filter */}
          <div className="flex gap-2" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
            {['All Inquiries 14', 'Awaiting Action 2', 'Escalated to'].map((t, i) => (
              <button key={i} className={`chip${filter === t ? ' active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
            <div className="search-bar" style={{ marginLeft: 'auto', minWidth: 220 }}>
              <Search size={13} style={{ color: '#94a3b8' }} />
              <input placeholder="Search guardian, roll # or tag..." />
            </div>
            <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
              <option>All Categories</option>
            </select>
          </div>

          {inquiries.map((inq, i) => (
            <div key={i} style={{
              border: `1px solid ${inq.status === 'pending' ? '#fca5a5' : inq.status === 'in-progress' ? '#fcd34d' : '#e2e8f0'}`,
              borderLeft: `4px solid ${inq.status === 'pending' ? '#dc2626' : inq.status === 'in-progress' ? '#f59e0b' : inq.status === 'resolved' ? '#16a34a' : '#94a3b8'}`,
              borderRadius: 10, padding: 16,
              background: inq.status === 'pending' ? '#fff8f8' : 'white'
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>{inq.id}</span>
                <span className={`badge ${inq.status === 'pending' ? 'badge-red' : inq.status === 'in-progress' ? 'badge-yellow' : 'badge-green'}`}>{inq.tag}</span>
                {inq.category && <span className="badge badge-blue">{inq.category}</span>}
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <div className={`avatar ${inq.color}`} style={{ width: 38, height: 38, borderRadius: 8, flexShrink: 0 }}>
                  {inq.student.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{inq.student}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{inq.roll}</div>
                  {inq.parent && <div style={{ fontSize: 12, color: '#64748b' }}>Parent: {inq.parent} · {inq.logged}</div>}
                  {!inq.parent && <div style={{ fontSize: 12, color: '#64748b' }}>{inq.logged}</div>}
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Subject: {inq.subject}</div>
              <div style={{ fontSize: 13, color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>{inq.message}</div>

              {inq.attachments && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {inq.attachments.map((a, j) => (
                    <span key={j} className="badge badge-gray">{a}</span>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {inq.status === 'pending' && (
                  <>
                    <button className="btn btn-primary btn-sm">Draft Official Response</button>
                    <button className="btn btn-outline btn-sm">Grant Lab Waiver</button>
                    <button className="btn btn-danger btn-sm">Escalate to Vice-Principal</button>
                    <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>Request Callback</button>
                  </>
                )}
                {inq.status === 'in-progress' && (
                  <>
                    <button className="btn btn-outline btn-sm">Append Session Notes</button>
                    <button className="btn btn-primary btn-sm">Mark Read and after Session</button>
                    <span style={{ fontSize: 12, color: '#16a34a', marginLeft: 'auto' }}>Assigned: Dr. Alistair Evans</span>
                  </>
                )}
                {(inq.status === 'resolved' || inq.status === 'transferred') && (
                  <>
                    <span className="badge badge-green"><CheckCircle size={11} /> Resolution Received</span>
                    <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>View Full Resolution Menu</button>
                    {inq.status === 'transferred' && <button className="btn btn-primary btn-sm">Track Next GPS Response</button>}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Institutional Responder */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🤖 Institutional Responder</div>
              <span className="badge badge-green">Auto-SMS Responder</span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Active Target: Aarav Sharma (Roll#10B)</div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Present Student: #TCK-2025-0914 · 09:32 AM</div>

              <div className="form-label">Apply Correct Template</div>
              {templates.map((t, i) => (
                <div key={i} onClick={() => setActiveTemplate(i)} style={{
                  padding: '9px 10px', border: `1px solid ${activeTemplate === i ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: 6, marginBottom: 6, cursor: 'pointer', fontSize: 13,
                  background: activeTemplate === i ? '#f0fdf4' : 'white',
                  fontWeight: activeTemplate === i ? 600 : 400
                }}>
                  {t}
                </div>
              ))}
            </div>

            <div className="form-group">
              <div className="form-label">Official Response Body</div>
              <textarea className="form-textarea" placeholder="Enter formal action/or remarks..." style={{ minHeight: 80 }} />
            </div>

            <div style={{ marginBottom: 12 }}>
              {[
                { label: 'Dispatch Instantaneous SMS notification to guardian', checked: true },
                { label: 'Close ticket & archive immediately after send', checked: true },
              ].map((opt, i) => (
                <label key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginBottom: 8, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor: '#16a34a' }} />
                  {opt.label}
                </label>
              ))}
            </div>

            <button className="btn btn-primary w-full"><Send size={13} /> Send Institutional Resolution</button>
          </div>

          {/* SLA Guidelines */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">SLA Guidelines &amp; Policies</div>
            </div>
            {[
              { label: 'First Response Window', val: 'Ideally respond within 3 hours of clear notice', color: 'badge-green' },
              { label: 'Escalation Progression', val: 'Issues exceeding 5 Days require Vice Principal Review', color: 'badge-yellow' },
              { label: 'Parent Respect Charter', val: 'All text responses are logged in school pastoral log and archive', color: 'badge-blue' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid #f8fafc' : 'none', fontSize: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ color: '#64748b', lineHeight: 1.5 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Homeroom Council */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Homeroom Council</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Roll #52</span>
            </div>
            {[
              { name: 'Mr. Rajul Sharma', role: 'PTA (Grade 10-B)', initials: 'RS', color: 'av-green' },
              { name: 'Dr. Haamatull Iyer', role: 'Health & Safety Officer', initials: 'HI', color: 'av-blue' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i === 0 ? '1px solid #f8fafc' : 'none' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div className={`avatar ${c.color}`} style={{ width: 28, height: 28, fontSize: 11 }}>{c.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{c.role}</div>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm"><Phone size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
