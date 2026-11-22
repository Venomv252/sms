import React from 'react'
import { Download, CheckCircle, Phone, Shield, Clock, AlertTriangle } from 'lucide-react'

const examSchedule = [
  { date: 'Monday, Mar 3, 2025', code: '041', subject: 'Mathematics Standard', time: '09:00–12:00 PM', hall: 'Hall A, Desk #24', wing: 'Wing-S', invigilator: 'Senior Board Panel ●' },
  { date: 'Wednesday, Mar 5, 2025', code: '086', subject: 'Science Theory', time: '09:00–12:00 PM', hall: 'Science Mock, Wing C, Lab 1', wing: 'Dr. S. Homosalat & Team', invigilator: 'Graded' },
  { date: 'Friday, Mar 7, 2025', code: '184', subject: 'English Language & Literature', time: '09:00–12:00 PM', hall: 'Hall B, Desk #12', wing: 'Wing-S Level', invigilator: 'Dept. of Humanities' },
  { date: 'Monday, Mar 10, 2025', code: '087', subject: 'Social Science', time: '09:00–11:00 AM', hall: 'Hall A, Desk #24', wing: 'Wing-S Level', invigilator: 'Senior Board Panel ●' },
  { date: 'Wednesday, Mar 12, 2025', code: '165', subject: 'Computer Applications', time: '09:00–11:00 AM', hall: 'Turing IT Lab', wing: 'Tech Wing, Level', invigilator: 'IT Systems Faculty' },
]

const sessionTimeline = [
  { time: '08:00 AM', label: 'Gate Open & Early Student Entry', active: false },
  { time: '08:30 AM Sharp', label: 'Biometric TurneLock', active: true },
  { time: '08:45 – 09:00 AM', label: 'Reading Window', active: false },
  { time: '09:00 – 12:00 PM', label: 'Exam Duration', active: false },
]

const archives = [
  { label: 'Term Mid-Year Solved Papers', desc: 'Combined 5 subjects (PDF x 5)', color: 'var(--blue-light)', textColor: 'var(--blue)' },
  { label: 'Pre-Board Answer Keys & Rubrics', desc: 'Teaching Reference + DPMs', color: 'var(--accent-light)', textColor: 'var(--primary)' },
  { label: 'Terms Seating Allocation Slips', desc: 'Physical Action: age → ref...', color: 'var(--orange-light)', textColor: 'var(--orange)' },
]

export default function ExamDatesheet() {
  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Exams & Results</a>
        <span>›</span>
        <span>Exam Datesheets & Hall Tickets</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Exam Datesheets, Seating & Digital Hall Tickets</h1>
          <p className="page-subtitle">Official institutional exam schedules, room allocations, reporting protocols, and downloadable admit cards for <strong>Aarav Sharma (Grade 10–B, Roll #24)</strong>.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm">Guidelines Handbook</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Download Verified Hall Ticket (PDF)</button>
        </div>
      </div>

      {/* Pre-board notice */}
      <div style={{ background: '#fff7ed', border: '1.5px solid #fed7aa', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--orange)', marginBottom: 4 }}>⏰ Pre-Board II Gate Entry Cutoff: 08:30 AM Sharp</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Gate security blocks entry strictly at 09:30 AM. Mandatory 15-minute question reading begins at 08:45 AM.</div>
        <div className="flex items-center gap-10 mt-8">
          <span className="tag tag-orange" style={{ fontSize: 10 }}>● ROLL VERIFIED: #F#24#912</span>
        </div>
      </div>

      {/* Digital Admit Card */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CBSE BOARD AFFILIATION #8241B • Center Grade #842</div>
            <div className="card-title">Digital Academic Admit Card & Seating Clearance</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>Greenwood High International School • Main Campus, Wing S Examination</div>
          </div>
          <div className="flex items-center gap-6">
            <span className="tag tag-green" style={{ fontSize: 11 }}>✓ Biometric Turnstile QR Clearance</span>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-2" style={{ gap: 20 }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px 20px' }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CANDIDATE FULL NAME</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Aarav Sharma</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Class 10-B/Science/Maths</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CBSE ROLL NUMBER</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>10248912</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Institutional Code: 01</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>DATE OF BIRTH</div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>14 Aug 2009</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Verified via Registry</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>EXAM CENTER & WING</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Center #8402</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Wing-S, Senior Grade</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>PRIMARY ASSIGNED DESK</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Desk #24 (Hall A)</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Row • Column 4</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>MOTHER / GUARDIAN</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Sunita Sharma</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Verified at Registry</div>
                </div>
              </div>

              <div style={{ marginTop: 16, background: 'var(--border-light)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>CANDIDATE IDENTIFICATION</div>
                <div style={{ fontSize: 12.5, fontWeight: 600 }}>Aarav Sharma</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>ID Digits: Verified</div>
              </div>

              <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--primary-lighter)', borderRadius: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>CHIEF EXAM COORDINATOR</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Valerie H. Sterling</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>✓ Authenticated Key Signed</div>
              </div>

              <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12 }}>
                GATE BARCODE TOKEN: 04-16-4912-IS<br />
                Hold barcode to turnstile when opening entry
              </div>
            </div>
            <div className="flex flex-col items-center" style={{ gap: 16 }}>
              <div style={{ width: 100, height: 120, background: 'var(--border-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border)' }}>
                <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)' }}>📷 PHOTO<br />VERIFIED</div>
              </div>
              <div className="qr-placeholder" style={{ width: 90, height: 90 }}>
                <div style={{ textAlign: 'center', fontSize: 10 }}>QR<br/>Code</div>
              </div>
              <button className="btn btn-primary btn-sm"><Download size={12} /> Print Official PDF Card</button>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Schedule Table */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>INSTITUTIONAL EXAMINATION DATESHEETS</div>
            <div className="card-title">Class 10-B standard secondary final Board examination plan</div>
          </div>
          <div className="flex gap-10">
            <span className="tag tag-green" style={{ fontSize: 11 }}>CBSE Pre-Board(II) (March 2025)</span>
            <span className="tag tag-blue" style={{ fontSize: 11 }}>Final AISSC Board Exams 2025 (March–April)</span>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>DATE & SCHEDULED TIMING</th>
                <th>SUBJECT & SYLLABUS CODE</th>
                <th>HALL & SEATING ALLOCATION</th>
                <th>INVIGILATOR PANEL</th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((exam, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>
                      {exam.date.split(',')[0].substring(0, 2)}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{exam.date}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{exam.time}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ background: 'var(--border-light)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', fontSize: 11, fontWeight: 700 }}>Code {exam.code}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{exam.subject}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{exam.hall}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{exam.wing}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{exam.invigilator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code of Conduct + Medical */}
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Institutional Exam Day Code of Conduct</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Strict CBSE compliance checklist to monitor class student others</span>
          </div>
          <div className="card-body">
            <div className="two-col" style={{ gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--primary)' }}>✓ Mandatory Permitted Items</div>
                {['Physical / Printed Hall Ticket: One-to-each or student with clean photos', 'Transparent Stationery Pouch: Own Pu board only', 'Institutional RID Identity Card: Greenwood student card or scan yard', 'Clear Transparent Water Bottle: Max 1/2 litre at Centre'].map((item, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>{item}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, color: 'var(--red)' }}>✗ Strictly Prohibited/Inside</div>
                {['Smartwatches & Digital Bands: Only authorized non-electronic items', 'Electronic Calculators: Standard non-popup cell only when designations allow', 'Mobile Phones & Earbuds: Auto-automatic correction and disciplinary process', 'Loose Study Notes: No paper prink, printed/notebooks, extension slides'].map((item, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--red)', fontWeight: 700 }}>✗</span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Medical & Scribe Helpline</div>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>For super medical in academic exam morning, special accommodations or certified medical authentication or CBSE Section in regulations.</div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CHIEF EXAM SUPERINTENDENT</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Dr. Valerie H. Sterling</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>+91 0(63) 481-8810 (Ext. 204)</div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>NURSE MEDICAL CENTER WING</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Nurse Station Room Dr. Ground Floor</div>
            </div>
            <div className="flex flex-col gap-8">
              <button className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}><Phone size={13} /> Call Superintendent Desk</button>
              <button className="btn btn-secondary btn-sm" style={{ justifyContent: 'center' }}>Request Medical Leave Protocol</button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Timeline */}
      <div className="card mb-20">
        <div className="card-header">
          <div className="card-title">SESSION TIMELINE (MORNING BATCH)</div>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
            {sessionTimeline.map((step, i) => (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: step.active ? 'var(--primary)' : 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step.active ? 'white' : 'var(--text-muted)', border: `2px solid ${step.active ? 'var(--primary)' : 'var(--border)'}` }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: step.active ? 'var(--primary)' : 'var(--text-primary)', marginTop: 6, textAlign: 'center' }}>{step.time}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 100 }}>{step.label}</div>
                </div>
                {i < sessionTimeline.length - 1 && <div style={{ flex: 1, height: 2, background: 'var(--border)', minWidth: 20 }}></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Archives */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">Term I & Mid-Year Examination Archives</div>
          <span className="tag tag-gray" style={{ fontSize: 10 }}>Previous quarter books, answer key applications, and verification class year-round records</span>
        </div>
        <div className="card-body">
          <div className="grid grid-3">
            {archives.map((a, i) => (
              <div key={i} style={{ background: a.color, border: `1px solid ${a.textColor}30`, borderRadius: 10, padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: a.textColor }}>{a.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.desc}</div>
                <button className="btn btn-secondary btn-xs" style={{ marginTop: 4 }}>Download →</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
