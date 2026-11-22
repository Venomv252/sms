import React, { useState } from 'react'
import { Plus, Search, Download, Phone, Star, ChevronDown, MessageSquare } from 'lucide-react'

const tickets = [
  {
    id: '#TKT-7164', status: 'Under Review', dept: 'Fees & Accounts', priority: 'Medium Priority',
    title: 'Inquiry regarding Olympiad National Camp registration fee waiver',
    submitted: 'Feb 18, 2025', target: 'Feb 22, 2025',
    messages: [
      { from: 'Rajesh Sharma (Father)', time: 'Feb 18, 09:30 AM', role: 'RS', color: '#3b82f6', content: 'Dear Sir, Aarav has been selected in the Regional Science Olympiad. We received an invite for the national training camp with a fee of ₹8,500. As the school\'s merit scholarship handbook, top-rankers receive 100% concession. Kindly confirm if the bursar office will receive the certificate verification to Academic Dean Dr. Evans.' },
      { from: 'Office of the Bursar & Dean', time: 'Feb 19, 10:19 PM', role: 'BD', color: 'var(--primary)', isOfficial: true, content: 'Dear Mr. Sharma, we have routed the verification of certificate verification to Academic Dean Dr. Evans. The bursar credit slip is being compiled and will reflect on your invoice portal by Thursday.' },
    ],
    attachment: 'merit_award_doc_ref.pdf', statusColor: 'tag-orange'
  },
  {
    id: '#TKT-8642', status: 'Resolved', dept: 'Bus & Commute', priority: '',
    title: 'Transport Route 14 morning pick-up delay during rainy days',
    closed: 'Feb 10, 2025', resolutionSLA: '2.1 Hrs',
    resolution: 'Automatically-early dispatch slot protocol (15-min weather buffer) has been activated for Route 14. Real-time GPS telemetrics on the Parent App now reflects live weather windows.',
    rating: 5, ratingText: 'Extremely prompt resolution', statusColor: 'tag-green'
  },
  {
    id: '#TKT-8420', status: 'Resolved', dept: 'Exams & Records', priority: '',
    title: 'Correction in Term I Grade Sheet Social Studies practical marks',
    closed: 'Jan 14, 2025', resolutionSLA: '0.5 Hrs',
    resolution: 'Discrepancy noted between teacher signed physical rubric sheet (19/20) and digital portal mark entry (14/20). Exam Controller Note (Mr. R. Joshi): Data-entry typographical error confirmed and rectified. The digital record has been corrected and a transcript copy regenerated in the Child Ledger tab.',
    statusColor: 'tag-green'
  },
  {
    id: '#TKT-8105', status: 'Resolved', dept: 'General Admin & Infirmary', priority: '',
    title: 'Request for special dietary accommodations during inter-school sports meet',
    closed: 'Nov 28, 2024', resolutionSLA: '1.8 Hrs',
    resolution: 'Notification of nut allergy and meal pre-authorization for Aarav during the 3-day regional athletic championship held at Valley Sports Complex.',
    accreditedBy: 'Sports Directorate & School Nurse', statusColor: 'tag-green'
  },
]

const escalationMatrix = [
  { name: 'Dr. Alistair Evans', role: 'Academic Coordinator (Grade 10)', ext: 'Ext 204', hours: 'Mon-Fri 02:30 PM – 04:00 PM', available: true },
  { name: 'Bursar & Accounts', role: 'Accounting • greenwood.edu', ext: 'Ext 104', hours: 'Visiting: Mon-Fri 09:00 AM – 01:00 PM', available: false },
  { name: 'Mr. K. Nair', role: 'Fleet & Student Transit Lead', ext: '', hours: 'Direct at personal radio link', available: true, activeLink: true },
  { name: 'Principal\'s Grievance Cell', role: 'principal@greenwood.edu', ext: '', hours: 'Anticipated response: 5 calendar days', available: false },
]

export default function QueryHelpdesk() {
  const [activeTab, setActiveTab] = useState('All (6)')
  const [activeDept, setActiveDept] = useState('All Categories (6)')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Support & Assistance</a>
        <span>›</span>
        <span>Parent Query & Helpdesk Concierge</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <div className="flex items-center gap-10 mb-4">
            <h1 className="page-title">Parent Query & Grievance Helpdesk</h1>
            <span className="tag tag-green">ACTIVE CONCIERGE</span>
          </div>
          <p className="page-subtitle">Submit, track, and resolve queries across administration, fees, exams, bus transport, and faculty liaisons with institutional SLA guarantees.</p>
        </div>
        <div className="flex gap-10 flex-wrap">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Resolution Summary (PDF)</button>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Raise New Query</button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-4 mb-20">
        {[
          { label: 'TOTAL QUERIES RAISED', value: '6', sub: 'AY 2024–25', sub2: '● Aarav Sharma/Grade 10-B', color: 'var(--blue)', icon: '📋' },
          { label: 'UNDER REVIEW / ACTIVE', value: '1', sub: '● In Progress', sub2: 'Bursar Escalation', color: 'var(--orange)', icon: '⏳' },
          { label: 'RESOLVED & CLOSED', value: '5', sub: '100% On-Time', sub2: 'Avg. SLA: 4.2 Hours', color: 'var(--primary)', icon: '✅' },
          { label: 'GUARDIAN CSAT SCORE', value: '4.8', sub: '/5.0', sub2: '★ ★ ★ ★ ★', color: '#eab308', icon: '⭐' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div className="stat-label">{s.icon} {s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}<span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 400 }}>{s.sub}</span></div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub2}</div>
          </div>
        ))}
      </div>

      <div className="two-col">
        {/* Ticket List */}
        <div>
          <div className="flex items-center justify-between mb-12 flex-wrap gap-10">
            <div className="flex items-center gap-8 flex-1" style={{ minWidth: 200 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input className="form-input" style={{ paddingLeft: 32 }} placeholder="Search ticket #, subject, or staff keyword..." />
              </div>
              <select className="form-input" style={{ width: 'auto' }}>
                <option>STATUS: All (6)</option>
                <option>Under Review (1)</option>
                <option>Resolved (5)</option>
              </select>
            </div>
          </div>

          {/* Dept filter pills */}
          <div className="scroll-x mb-16">
            <div className="chip-tabs" style={{ flexWrap: 'nowrap' }}>
              {['All Categories (6)', 'Fees & Invoices (2)', 'Bus & Transport (1)', 'Exams & Records (1)', 'Teacher Consultation (1)', 'General'].map((d, i) => (
                <span key={i} className={`chip-tab ${activeDept === d ? 'active' : ''}`} onClick={() => setActiveDept(d)} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{d}</span>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)' }}>
            Active Feed & Case History <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--text-muted)' }}>4 Displayed  Sorted by: Recency</span>
          </div>

          {tickets.map((ticket, i) => (
            <div key={i} className="card" style={{ marginBottom: 16, border: '1.5px solid var(--border)' }}>
              <div className="card-body" style={{ padding: '16px' }}>
                <div className="flex items-center gap-8 mb-10 flex-wrap">
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-muted)' }}>{ticket.id}</span>
                  <span className={`tag ${ticket.statusColor}`} style={{ fontSize: 10 }}>{'● ' + ticket.status}</span>
                  <span className="tag tag-blue" style={{ fontSize: 10 }}>{ticket.dept}</span>
                  {ticket.priority && <span className="tag tag-yellow" style={{ fontSize: 10 }}>⏳ {ticket.priority}</span>}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{ticket.title}</div>
                {ticket.submitted && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Submitted: {ticket.submitted} • Target: {ticket.target}</div>}
                {ticket.closed && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Closed: {ticket.closed} • Resolution SLA: {ticket.resolutionSLA}</div>}

                {ticket.messages && ticket.messages.map((msg, mi) => (
                  <div key={mi} className="flex items-start gap-10" style={{ marginBottom: 12, padding: '10px 12px', background: msg.isOfficial ? 'var(--primary-lighter)' : 'var(--border-light)', borderRadius: 8, border: msg.isOfficial ? '1px solid #bbf7d0' : '1px solid var(--border)' }}>
                    <div className="avatar avatar-sm" style={{ background: msg.color, fontSize: 11 }}>{msg.role}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-8 mb-4">
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{msg.from}</span>
                        {msg.isOfficial && <span className="tag tag-green" style={{ fontSize: 10 }}>Official Action</span>}
                        <span style={{ fontSize: 11.5, color: 'var(--text-muted)', marginLeft: 'auto' }}>{msg.time}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{msg.content}</div>
                    </div>
                  </div>
                ))}

                {ticket.resolution && (
                  <div style={{ padding: '10px 12px', background: 'var(--accent-light)', borderRadius: 8, border: '1px solid #bbf7d0', marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Resolution Note</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ticket.resolution}</div>
                    {ticket.accreditedBy && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>Accredited by {ticket.accreditedBy}</div>}
                  </div>
                )}

                {ticket.attachment && (
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 10 }}>📎 {ticket.attachment}</div>
                )}

                {ticket.rating && (
                  <div className="flex items-center gap-8">
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#eab308', fontSize: 14 }}>★</span>)}
                    <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Guardian Rating: "{ticket.ratingText}"</span>
                  </div>
                )}

                <div className="flex gap-8 mt-10">
                  {ticket.status === 'Under Review' && <button className="btn btn-primary btn-xs"><Plus size={11} /> Add Follow-up Message</button>}
                  {ticket.status === 'Under Review' && <button className="btn btn-secondary btn-xs">Attach Document</button>}
                  {ticket.status === 'Resolved' && <button className="btn btn-secondary btn-xs">View Log History →</button>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Raise New Query */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Raise New Query</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Desk 24/7 – Every query triggers an institutional tracker with our automatic response windows.</span>
            </div>
            <div className="card-body" style={{ padding: '14px' }}>
              <div className="form-group">
                <label className="form-label">Concern Department</label>
                <select className="form-input">
                  <option>Fees & Accounts Division</option>
                  <option>Academic Affairs</option>
                  <option>Bus & Transport</option>
                  <option>Exams & Records</option>
                </select>
              </div>
              <div className="mb-12">
                <div className="form-label">Priority & SLA Commitment</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
                  {[{ label: 'Routine', sub: '48h SLA', active: true }, { label: 'Priority', sub: '24h SLA', active: false }, { label: 'Urgent', sub: 'Critical Same Day', active: false }].map((p, i) => (
                    <div key={i} style={{ padding: '8px 10px', borderRadius: 8, border: `1.5px solid ${p.active ? 'var(--primary)' : 'var(--border)'}`, background: p.active ? 'var(--primary-lighter)' : 'white', textAlign: 'center', cursor: 'pointer' }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: p.active ? 'var(--primary)' : 'var(--text-secondary)' }}>{p.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{p.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Query Subject</label>
                <input className="form-input" placeholder="Concise summary of your inquiry." />
              </div>
              <div className="form-group">
                <label className="form-label">Detailed Context & Details</label>
                <textarea className="form-input" rows={3} placeholder="Provide context, dates, teacher names, or relevant student IDs..." style={{ resize: 'vertical' }}></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Supporting Document</label>
                <div style={{ border: '2px dashed var(--border)', borderRadius: 8, padding: '14px', textAlign: 'center', cursor: 'pointer', background: 'var(--border-light)' }}>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>☁ Upload Receipt, Medical or Rubric note</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>PDF, PNG, JPG, up to 10MB</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Query to Institutional Desk</button>
            </div>
          </div>

          {/* Escalation Matrix */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Escalation Matrix</div>
              <span style={{ fontSize: 18 }}>🏢</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Reach appointed institutional leads if response exceeds guaranteed SLA windows.</div>
              {escalationMatrix.map((em, i) => (
                <div key={i} className="flex items-start gap-10" style={{ padding: '10px 0', borderBottom: i < escalationMatrix.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="avatar avatar-sm" style={{ background: i === 0 ? 'var(--primary)' : i === 1 ? '#f97316' : i === 2 ? '#3b82f6' : '#8b5cf6', fontSize: 11 }}>{em.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>
                      {em.name}
                      {em.available && <span className="tag tag-green" style={{ fontSize: 9, marginLeft: 6 }}>{em.activeLink ? 'Hotline Active' : 'Available'}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{em.role}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{em.ext}{em.hours}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Desk */}
          <div style={{ background: 'var(--red-light)', border: '1.5px solid #fecaca', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--red)', marginBottom: 6 }}>Need Immediate Front Desk Assistance?</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>In-house recognition at +918(14) 435-9000 (08:00 AM – 05:00 PM)</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Visiting: Mon–Fri • 09:00 AM – 01:00 PM</div>
          </div>
        </div>
      </div>
    </div>
  )
}
