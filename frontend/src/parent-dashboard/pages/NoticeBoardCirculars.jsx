import React, { useState } from 'react'
import { Download, Search, Eye, ChevronLeft, ChevronRight, Phone, AlertTriangle } from 'lucide-react'

const circulars = [
  {
    id: 'CIR-2025-084', date: 'Feb 20, 2025 • 09:30 AM', type: 'General Campus',
    title: "Founder's Rehearsal Schedule & Early Dismissal on Feb 28",
    content: "Greenwood High will conclude campus sessions at 02:00PM on Friday, February 28, 2025 for all secondary students (Grades 9–12) to accommodate the combined audio-visual and stage dress rehearsals for the 35th Annual Founder's Day.",
    details: [
      { label: 'Special Transport Operations', desc: 'Fleet departs school campus at 02:10 PM sharp across all registered bus routes.' },
      { label: 'Route 14B Confirmed', tag: true },
    ],
    attachment: 'Dismissal_Fleet_Schedule.pdf (1.4 MB)', readBy: 'Read by Rajesh Sharma', color: '#3b82f6'
  },
  {
    id: 'CIR-2025-079', date: 'Feb 14, 2025 • 04:15 PM', type: 'Academic & Exams',
    title: 'Grade 10 Pre-Board Assessment Blueprint & Hall Ticket Issuance',
    content: 'The terminal Pre-Board Examination cycle commences Wednesday, March 5, 2025. Standard CBSE paper patterns will be strictly followed with external migration protocol. Digital Hall Tickets with allocated examination hall bay designations will be unlocked for download on Feb 26.',
    details: [],
    rows: [
      { label: 'Digital Hall Tickets', value: 'Available Feb 26, 10 AM' },
      { label: 'Exam Period', value: 'March 5 – March 19' },
      { label: 'Answer Script Review', value: 'March 24 In-Class' },
    ],
    attachment: 'PreBoard_Subject_Blueprint_2025.pdf (2.8 MB)', readBy: 'Read by Sunita Sharma', color: 'var(--primary)'
  },
  {
    id: 'CIR-2025-072', date: 'Jan 29, 2025 • 11:00 AM', type: 'Health & Wellness',
    title: 'Annual Campus Medical & Vision Screening Report Available',
    content: 'Campus Chief Medical Officer Dr. Sarah Evans and visiting ophthalmology specialists concluded the comprehensive physical, postural, and visual screening for Grade 10 students. Diagnostic summary reports have been updated to your child\'s medical folder.',
    details: [],
    attachment: "View Aarav's Vitals Report", color: '#22c55e'
  },
]

const ptaInfo = {
  president: { name: 'Mr. Arvind Nair', role: 'Elected Parent Rep (Father-Rep)', email: 'grade10@greenwood.edu', avatar: 'AN' },
  rep: { name: 'Mrs. Savita Roy', role: 'Faculty Rep / Head of Maths', email: 'savita.roy@greenwood.edu', avatar: 'SR' },
}

export default function NoticeBoardCirculars() {
  const [activePage, setActivePage] = useState(1)

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Communication & Feedback</a>
        <span>›</span>
        <span>Parent-Management Comms & Circulars</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Official Circulars, Consents & PTA Forum</h1>
          <p className="page-subtitle">Official administrative communiqués, digital consent slips, PTA council deliberations, and institutional announcements for Greenwood High secondary wing.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm">Export Circular Archive</button>
          <button className="btn btn-primary btn-sm"><AlertTriangle size={14} /> Sign Pending Consents <span className="tag tag-red" style={{ fontSize: 10, marginLeft: 4 }}>URGENT</span></button>
        </div>
      </div>

      {/* Student Ward Info */}
      <div className="card mb-20" style={{ background: 'var(--border-light)' }}>
        <div className="card-body" style={{ padding: '14px 20px' }}>
          <div className="grid grid-3" style={{ gap: 20 }}>
            <div className="flex items-center gap-10">
              <div className="avatar avatar-sm" style={{ background: 'var(--primary)', fontSize: 12 }}>AS</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>STUDENT WARD</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aarav Sharma</div>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div style={{ fontSize: 20 }}>📚</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>ACADEMIC STREAM</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Grade 10-B (Roll #24)</div>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div style={{ fontSize: 20 }}>👥</div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>AUTHORIZED GUARDIANS</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Rajesh & Sunita Sharma</div>
                <span className="tag tag-green" style={{ fontSize: 10 }}>● CBSE Board Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Consent */}
      <div style={{ background: 'var(--red-light)', border: '2px solid var(--red)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <div className="flex items-start justify-between flex-wrap gap-12">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-8 mb-8">
              <span className="tag tag-red" style={{ fontSize: 11 }}>❗ ACTION MANDATORY</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due Date: Feb 26, 2025 • 23:59 IST</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ref: CBSE-REC-2025-X</span>
            </div>
            <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
              Digital Consent Slip: CBSE Board Examination Seating Verification & Roll Number Confirmation
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Final statutory validation required prior to state portal lockdown. Verify Aarav's legal name signature, photography record, aptitude examination roll number, and subject codes:
            </div>
            <div className="flex gap-10 flex-wrap">
              {['041 Mathematics Standard', '086 Science (Theory & Lab)', '165 Computer Applications', '184 English Language & Literature'].map((s, i) => (
                <span key={i} style={{ padding: '4px 10px', background: 'rgba(239,68,68,0.1)', border: '1px solid var(--red)', borderRadius: 20, fontSize: 12, fontWeight: 600, color: 'var(--red)' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <div style={{ background: 'white', border: '1px solid var(--red)', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Awaiting OTP E-Signature</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 12 }}>Digital verification under IT Act Sec 19A</div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'var(--red)' }}>
                Review & Sign via OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="two-col">
        {/* Circulars List */}
        <div>
          {/* Tabs */}
          <div className="chip-tabs mb-14 scroll-x">
            {['All Circulars (18)', 'Action Required (2)', 'PTA & Council Minutes (5)', 'Acaden'].map((t, i) => (
              <span key={i} className={`chip-tab ${i === 0 ? 'active' : ''}`} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-10 mb-16">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Search notices by keyword, date, circula..." />
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>SORT BY:</span>
            <select className="form-input" style={{ width: 'auto' }}>
              <option>Most Recent</option>
            </select>
          </div>

          {circulars.map((c, i) => (
            <div key={i} className="card" style={{ marginBottom: 16, borderLeft: `4px solid ${c.color}` }}>
              <div className="card-body" style={{ padding: '16px' }}>
                <div className="flex items-center gap-8 mb-8">
                  <span className="tag tag-gray" style={{ fontSize: 10 }}>{c.type}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{c.id} • {c.date}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{c.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{c.content}</div>
                {c.rows && (
                  <div className="grid grid-3" style={{ gap: 8, marginBottom: 12 }}>
                    {c.rows.map((r, ri) => (
                      <div key={ri} style={{ padding: '6px 10px', background: 'var(--border-light)', borderRadius: 6 }}>
                        <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>{r.label}</div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--primary)' }}>{r.value}</div>
                      </div>
                    ))}
                  </div>
                )}
                {c.details.map((d, di) => (
                  <div key={di} style={{ padding: '8px 12px', background: 'var(--border-light)', borderRadius: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{d.label}</div>
                    {d.desc && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.desc}</div>}
                    {d.tag && <span className="tag tag-green" style={{ fontSize: 10, marginTop: 4, display: 'inline-block' }}>Route 14B Confirmed</span>}
                  </div>
                ))}
                <div className="flex items-center gap-12">
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', flex: 1 }}>📎 {c.attachment}</span>
                  <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>✓ {c.readBy}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-8 mt-16">
            <button className="btn btn-secondary btn-xs"><ChevronLeft size={12} /></button>
            {[1, 2, 3].map(p => (
              <button key={p} className={`btn ${activePage === p ? 'btn-primary' : 'btn-secondary'} btn-xs`} onClick={() => setActivePage(p)}>{p}</button>
            ))}
            <button className="btn btn-secondary btn-xs"><ChevronRight size={12} /></button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 6, fontSize: 12, color: 'var(--text-muted)' }}>Showing 1 to 3 of 18 official circulars</div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* PTA Governance */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>PTA GOVERNANCE</div>
                <div className="card-title">Grade 10 Council</div>
              </div>
              <span style={{ fontSize: 18 }}>👪</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {Object.values(ptaInfo).map((person, i) => (
                <div key={i} className="flex items-center gap-10" style={{ padding: '10px 0', borderBottom: i === 0 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="avatar avatar-sm" style={{ background: i === 0 ? 'var(--blue)' : 'var(--primary)', fontSize: 11 }}>{person.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{person.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{person.role}</div>
                    <div style={{ fontSize: 12, color: 'var(--blue)', marginTop: 2 }}>{person.email}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 14, padding: '12px', background: 'var(--primary-lighter)', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>NEXT OPEN DELIBERATION</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>March 12, 2025 • 05:00 PM IST</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Direct session on Board stress management & subject moderation considerations.</div>
                <span className="tag tag-blue" style={{ fontSize: 10 }}>Virtual</span>
                <button className="btn btn-secondary btn-xs" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Add to Google Calendar</button>
              </div>
            </div>
          </div>

          {/* Active Deliberation */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Active Deliberation Topics</div>
              <span className="tag tag-orange" style={{ fontSize: 10 }}>2 In Review</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {[
                { title: 'Monsoon Bus Transit Optimization', status: 'In Review' },
                { title: 'AI Ethics in Secondary Curriculum', status: 'Approved' },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: i === 0 ? '1px solid var(--border-light)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Proposal for automated re-routing on flooded arterial links.</div>
                  </div>
                  <span className={`tag ${t.status === 'In Review' ? 'tag-orange' : 'tag-green'}`} style={{ fontSize: 10 }}>{t.status}</span>
                </div>
              ))}
              <button className="btn btn-secondary btn-xs" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>Submit Topic for Next PTA Meeting</button>
            </div>
          </div>

          {/* Management Secretariat */}
          <div className="card">
            <div className="card-header">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>DIRECT ACCESS</div>
              <div className="card-title">Management Secretariat</div>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>All escalation channels for administrative queries, pastoral concerns, or time-sensitive emergencies.</div>
              {[
                { label: "PRINCIPAL'S SECRETARIAT", value: 'principal@greenwood.edu', isLink: true },
                { label: 'CAMPUS DIRECTOR DESK', value: '+91 (086) 4129–8800 ext 104', isPhone: true },
                { label: 'SECURITY GATE', value: 'S 305 (24/7)', isLink: false },
              ].map((c, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)' }}>{c.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.isLink ? 'var(--blue)' : c.isPhone ? 'var(--primary)' : 'var(--text-primary)' }}>{c.value}</div>
                </div>
              ))}
              <button className="btn btn-red btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12, background: 'var(--red)', color: 'white', borderRadius: 8 }}>📞 EMERGENCY</button>
            </div>
          </div>

          {/* Campus Life */}
          <div style={{ background: 'var(--primary-lighter)', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase' }}>CAMPUS LIFE UPDATE</div>
            <div style={{ width: '100%', height: 100, background: 'var(--border-light)', borderRadius: 8, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)' }}>📸 Campus Photo</div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Annual Sports & Track Day</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>March 22, 2025 • Main Stadium</div>
          </div>
        </div>
      </div>
    </div>
  )
}
