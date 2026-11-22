import React, { useState } from 'react'
import { Download, Send, Plus, FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

const petitions = [
  {
    id: '#REG-PHY-9401', priority: 'HIGH PRIORITY', amount: '$650.00',
    title: 'Requisition for Optical Bench Helium–Neon Laser Replacement (Sci-Wing Lab.2)',
    date: 'Feb 27',
    desc: 'Replacement to Upgrade 2 Lasers for Optical Bench Practicals. Equipment are now in Grade 12 Physics Practical (previously confirmed grade-standard B item in Cabinet Drawer E-Steamer). Formally non-discounting.',
    approvers: ['Dr. Namasa ra...', 'Dean Academi...', 'Bursar & Acco...'],
    status: 'non-protocol'
  },
  {
    id: '2024-2025-231', priority: 'Duty Leave',
    title: 'Duty Leave Application: CBSE National Science Olympiad Jury Duty',
    date: 'Mar 14–15',
    desc: 'Invited as senior jury member at CBSE National Science Olympiad in Chennai. Authorized Absence: March 14 to 15 (attendance normal). 2-day approved/verified.',
    approvers: ['Vice Principal: Mrs. Eleanor Vance', 'Check: Mr. Rajul Sen (45 Notifications Set)'],
    status: 'approved'
  },
  {
    id: 'SA – RK · 08', priority: 'Special Grant',
    title: 'Special Homeroom Remedial Cohort Allowance (Grade 10-B)',
    amount: '$180.00',
    date: 'Holding Closed. Sign-off',
    desc: '5.4 budget request for 4 weeks of afternoon tutoring tracks, provisional ex-workbooks, and cross-to-student-earn test preparation.',
    approvers: [],
    status: 'pending'
  },
]

const dispatches = [
  {
    sender: 'Mrs. Eleanor Vance · Principal',
    time: 'Feb 17, 11:15 AM',
    message: 'Important announcement from the Regional Department: the special lab grant of $840 has now been confirmed – Physics curriculum → Lab allocation: possession → receipt on completion page code.',
    color: 'av-purple'
  },
  {
    sender: 'Prof. V. Kapoor · Dean of Academics',
    time: 'Feb 15, 12:42 PM',
    message: 'Please be reminded that all Term I Physics practical lab audit student dates in the homeroom for counter-registration in Friday\'s work. Great work on the ordered pacing for grades.',
    color: 'av-blue'
  },
]

const complianceDocs = [
  { title: 'CBSE Senior Teacher Assessment Amendment', auth: 'Central Board Secondary Examinations', due: 'Jan 15, 2025', status: 'Signed & Sealed', priority: false },
  { title: 'Term II Practical Safety & Laser Protocol Certification', auth: 'District Education Board & Safety Officer', due: 'Feb 28, 2025', status: 'Out · 8 Days', priority: true },
  { title: 'Biometric Attendance & Substitute Affirmation (Term II)', auth: 'Greenwood High Directorate', due: 'Dec 29, 2024', status: 'Signed & Sealed', priority: false },
]

export default function ManagementComms() {
  const [category, setCategory] = useState('Lab Request Inc')

  return (
    <div>
      <div className="breadcrumb">
        <span>Communication &amp; Admin</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Management Comms</span>
        <span className="badge badge-blue" style={{ marginLeft: 6 }}>FACULTY SECRETARIAT · Reference: FSHC-FAC-2021-EV40</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Teacher–Management Comms &amp; Official Petitions</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Official administrative correspondence, leave requisitions, lab resource procurement, and regulatory compliance sign-offs with the Principal &amp; Dean's Office.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export Ledger (PDF)</button>
          <button className="btn btn-outline btn-sm">View Approval Proposal</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> + Submit New Formal Petition</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Active Petitions</div>
          <div className="stat-value">3</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>In Review · Dean &amp; Principal</div>
          <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600 }}>Priority Items: 1 High</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Sanctioned Transactions</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>12</div>
          <div style={{ fontSize: 11 }}>Approved</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Avg Approval: 3x (AY 2024-25)</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Response Time</div>
          <div className="stat-value">18 hrs</div>
          <div style={{ fontSize: 11 }}>Platform SLA: 3x</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>Fastest: 3.24 (Study Leave)</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Faculty Budget Allocation</div>
          <div className="stat-value">$1,450</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>72.5% used</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '72.5%' }} /></div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Physics &amp; Pedagogical Plan</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Petitions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Administrative Petitions &amp; Filings</div>
              <div className="flex gap-2">
                {['All (15)', 'Review (3)', 'Sanctioned (9)'].map(t => (
                  <button key={t} className="chip">{t}</button>
                ))}
              </div>
            </div>

            {petitions.map((p, i) => (
              <div key={i} style={{
                border: `1px solid ${p.priority === 'HIGH PRIORITY' ? '#fca5a5' : '#e2e8f0'}`,
                borderLeft: `4px solid ${p.priority === 'HIGH PRIORITY' ? '#dc2626' : p.priority === 'Duty Leave' ? '#3b82f6' : '#f59e0b'}`,
                borderRadius: 8, padding: 14, marginBottom: 10,
                background: p.priority === 'HIGH PRIORITY' ? '#fff5f5' : 'white'
              }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className={`badge ${p.priority === 'HIGH PRIORITY' ? 'badge-red' : p.priority === 'Duty Leave' ? 'badge-blue' : 'badge-yellow'}`}>
                    {p.priority}
                  </span>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{p.id}</span>
                  {p.amount && <span style={{ fontWeight: 800, fontSize: 16, marginLeft: 'auto', color: '#1e293b' }}>{p.amount}</span>}
                </div>

                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10, lineHeight: 1.5 }}>{p.desc}</div>

                {p.approvers.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {p.approvers.map((a, j) => (
                      <span key={j} className="badge badge-gray">{a}</span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  {p.status === 'approved' && (
                    <>
                      <span className="badge badge-green"><CheckCircle size={11} /> Sanctioned &amp; Dispatched</span>
                      <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>View Handover Notes</button>
                    </>
                  )}
                  {p.status === 'non-protocol' && (
                    <>
                      <span className="badge badge-yellow" style={{ fontSize: 10 }}>DON-OFF PROTOCOL CHAIN · Dean Approved → Dean Office: Final-ring</span>
                      <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>Send Clearer Memo</button>
                    </>
                  )}
                  {p.status === 'pending' && (
                    <>
                      <span className="badge badge-yellow">Feature Closed, Sign-off</span>
                      <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>View Opt Memo</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Administrative Direct Dispatches */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Administrative Direct Dispatches</div>
              <span style={{ fontSize: 12, color: '#64748b' }}>Live Textual Link</span>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12 }}>Confidential inter-departmental exchanges in full Leadership</div>

            {dispatches.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: i < dispatches.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                <div className={`avatar ${d.color}`} style={{ width: 34, height: 34, borderRadius: 8, flexShrink: 0 }}>
                  {d.sender.split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{d.sender}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{d.time}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{d.message}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Sign-Offs */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Administrative Compliance &amp; Regulatory Sign-offs</div>
              <span style={{ fontSize: 12, color: '#64748b' }}>2 of 3 Completed ●●○</span>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>STATUTORY COMPLIANCE DOCUMENT</th>
                    <th>REGULATORY AUTHORITY</th>
                    <th>DUE DATE</th>
                    <th>STATUS / VERIFICATION</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceDocs.map((doc, i) => (
                    <tr key={i} style={{ background: doc.priority ? '#fff5f5' : 'white' }}>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{doc.title}</td>
                      <td style={{ fontSize: 12, color: '#64748b' }}>{doc.auth}</td>
                      <td style={{ fontSize: 12, fontWeight: doc.priority ? 700 : 400, color: doc.priority ? '#dc2626' : '#374151' }}>
                        {doc.priority && <AlertTriangle size={11} style={{ display: 'inline', marginRight: 4 }} />}
                        {doc.due}
                      </td>
                      <td>
                        {doc.priority
                          ? <span className="badge badge-red"><AlertTriangle size={10} /> {doc.status}</span>
                          : <span className="badge badge-green"><CheckCircle size={10} /> {doc.status}</span>
                        }
                      </td>
                      <td>
                        {doc.priority
                          ? <button className="btn btn-primary btn-sm">Sign Digitally</button>
                          : <button className="btn btn-outline btn-sm">View Record</button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right - Petition Submission */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div className="card-title">Submit Formal Petition</div>
            <span className="badge badge-blue">Confidential</span>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div className="form-label">Category of Requisition / Communication</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {['Lab Request Inc', 'Duty / Medical Leave', 'Special Budget', 'Curriculum (Min)'].map((cat, i) => (
                <label key={i} style={{
                  display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer',
                  padding: '7px 10px', border: `1px solid ${category === cat ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: 6, background: category === cat ? '#f0fdf4' : 'white'
                }}>
                  <input type="radio" name="category" checked={category === cat} onChange={() => setCategory(cat)} style={{ accentColor: '#16a34a' }} />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Official Subject / Reference Matter</div>
            <input className="form-input" placeholder="e.g. Request for Physics Darkroom Air-Frable..." />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div className="form-label">Transit Approval Desk</div>
              <select className="form-select"><option>Principal's Vice...</option></select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <div className="form-label">Amount (if any) / Cost Code</div>
              <input className="form-input" placeholder="e.g. Amount or Leave Category" />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label">Administrative Justification &amp; Impacts</div>
            <textarea className="form-textarea" placeholder="Detail pedagogically cohesive, specific student-cohort impact, vendor/quotation evidence; or duty coverage arrangements..." />
          </div>

          <label style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 12, marginBottom: 14, cursor: 'pointer', lineHeight: 1.5 }}>
            <input type="checkbox" defaultChecked style={{ accentColor: '#16a34a', marginTop: 2 }} />
            I certify this correspondence aligns to the Greenwood Faculty Pastoral Governance Digital Signature. Once submitted, the petition will be reviewed by the principal.
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost btn-sm">Clear</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><Send size={12} /> Submit to Dean &amp; Principal</button>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 10, marginTop: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
              <Clock size={13} style={{ color: '#15803d' }} />
              <span style={{ fontWeight: 700, fontSize: 12, color: '#15803d' }}>Management SLA Guarantee</span>
            </div>
            <div style={{ fontSize: 12, color: '#166534', lineHeight: 1.5 }}>Status updates to submit before 17:00 hrs for average same-day response. Emergency (syllabus duty): 4 hours dispatch via standard SLA.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
