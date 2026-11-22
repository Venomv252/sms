import React, { useState } from 'react'
import { Bot, Send, Edit3, CheckCircle, AlertTriangle, MessageSquare, Plus } from 'lucide-react'

const students = [
  {
    name: 'Aarav Sharma', roll: 'Roll #108-01', gpa: '3.94', track: 'Physics Track A+', published: true,
    subject: 'ACADEMIC EXCELLENCE & PEER MENTORING',
    date: 'Feb 18, 2025 • 01:40 PM',
    remark: 'Aarav exhibits exceptional academic consistency and disciplined classroom engagement. To secure top-rankings in the upcoming Board Examinations, I recommend dedicating 20 minutes daily to structured long-form essay structuring and cartographic map practices in Social Studies. His leadership during the Optics refraction lab was commendable.',
    tags: ['Olympiad Candidate', 'Diligent Researcher', 'Peer Mentor'],
    parentSigned: 'Parent Verified & Signed by Mr. Rajesh Sharma on Feb 20, 2025 (Parent Portal)',
    color: 'av-green'
  },
  {
    name: 'Vikramaditya Singh', roll: 'Roll #108-22', gpa: '2.82', track: 'Term Attendance: 81.4%', published: false,
    subject: 'ACADEMIC REINFORCEMENT & FOCUS INTERVENTION',
    date: 'Feb 19, 2025 • 11:35 AM',
    remark: 'Vikramaditya demonstrates strong conceptual intuition during practical experiments, but lapses in homework submission and attendance have impeded theoretical mastery. Recommended for Wednesday Remedial Clinic in Ray Optics to solidify core problem-solving frameworks before Term II Finals.',
    tags: ['Remedial Clinic Assigned', 'Assignment Delays', 'Laboratory Aptitude'],
    parentSigned: 'Awaiting Parent Signature · Mrs. Renuka Singh (Automated SMS dispatch on Feb 19, 2025)',
    color: 'av-red', actionRequired: true
  },
  {
    name: 'Chloe Lawrence', roll: 'Roll #108-05', gpa: '3.86', track: 'Science Exhibition Lead', published: true,
    subject: 'SCIENTIFIC RIGOR & ANALYTICAL CLARITY',
    date: 'Feb 17, 2025 • 05:12 PM',
    remark: 'Chloe\'s laboratory documentation in optics experiments is exemplary. Her meticulous error analysis and systematic logbooks set a benchmark for the entire homeroom cohort. Continuing this rigor will position her strongly for the National Science Fellowship shortlist.',
    tags: ['Exemplary Lab Work', 'Scientific Inquirer'],
    parentSigned: 'Parent Verified & Signed by Dr. Marcus Lawrence on Feb 18, 2025 (SMS Link)',
    color: 'av-blue'
  },
  {
    name: 'Rohan Varma', roll: 'Roll #108-08', gpa: '3.10', track: 'Sports Vice-Captain', published: false, draft: true,
    subject: 'DRAFTING TERM EVALUATION',
    date: 'Auto-saved 2 mins ago',
    remark: 'Rohan displays vibrant leadership on the athletic field and maintains steady classroom attentiveness. To elevate his physics and calculus scores, establishing a structured evening study regimen is recommended before the final.',
    tags: [],
    color: 'av-purple'
  },
]

const phrases = [
  '"Consistently demonstrates inquisitive intellectual drive and elevates homeroom discussion."',
  '"Needs closer attention to deadline adherence and regular documentation of lab practicals."',
  '"Exhibits exemplary laboratory safety discipline and supports peers during complex experimental setups."',
]

export default function Remarks() {
  const [selectedTone, setSelectedTone] = useState('Encouraging')
  const [filterTab, setFilterTab] = useState('All Students (42)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Evaluation &amp; Records</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Remarks &amp; Feedback</span>
        <span className="badge badge-yellow" style={{ marginLeft: 6 }}>TERM II MID-TERM REPORTING PERIOD · ACTIVE (CLOSES IN 5 DAYS)</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Student Mentorship, Term Remarks &amp; Pedagogical Feedback</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Draft, calibrate, and dispatch qualitative evaluations, official report card appraisals, and actionable academic interventions for Grade 10-B.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Bot size={13} /> Batch Greenwood AI</button>
          <button className="btn btn-outline btn-sm"><MessageSquare size={13} /> Pastoral Notes (3)</button>
          <button className="btn btn-primary btn-sm"><Send size={13} /> Publish All to Parent Portals</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Remarks Published</div>
          <div className="stat-value">36<span style={{ fontSize: 14, color: '#64748b' }}>/42</span></div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>85.7% Completion · 6 Remaining</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Parent Acknowledgments</div>
          <div className="stat-value">29<span style={{ fontSize: 14, color: '#64748b' }}>/36</span></div>
          <div style={{ fontSize: 11 }}>80.3% Sign-off Rate · 7 Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Faculty Commendations</div>
          <div className="stat-value">48</div>
          <div style={{ fontSize: 11 }}>Badges Issued</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>+16 vs Term I · Physics Lab &amp; Mo...</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Intervention Mandates</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>12</div>
          <div style={{ fontSize: 11, color: '#dc2626' }}>Action Items · Remedials &amp; Clinic</div>
          <span className="badge badge-red" style={{ fontSize: 10, marginTop: 4 }}>4 Urgent</span>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Filter tabs */}
          <div className="chip-group">
            {['All Students (42)', 'Pending Draft (6)', 'Published (36)', 'Needs Response (4)'].map((t) => (
              <button key={t} className={`chip${filterTab === t ? ' active' : ''}`} onClick={() => setFilterTab(t)}>{t}</button>
            ))}
            <div className="search-bar" style={{ marginLeft: 'auto', minWidth: 200 }}>
              <input placeholder="Search name or enroll AI..." />
            </div>
          </div>

          {/* Student Remarks */}
          {students.map((s, i) => (
            <div key={i} style={{
              border: `1px solid ${s.actionRequired ? '#fca5a5' : '#e2e8f0'}`,
              borderRadius: 10, padding: 16,
              background: s.actionRequired ? '#fff8f8' : 'white'
            }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <div className={`avatar ${s.color}`} style={{ width: 42, height: 42, borderRadius: 8, fontSize: 14, flexShrink: 0 }}>
                  {s.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{s.roll} · GPA: {s.gpa} · {s.track}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
                    {s.published && <span className="badge badge-green">● Published</span>}
                    {s.actionRequired && <span className="badge badge-red">⚠ Action Required</span>}
                    {s.draft && <span className="badge badge-gray">Draft in Progress</span>}
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{s.date}</span>
                  </div>
                </div>
                <div className="flex gap-2" style={{ flexShrink: 0 }}>
                  <button className="btn btn-outline btn-sm"><Edit3 size={12} /> Edit</button>
                  {s.actionRequired && (
                    <button className="btn btn-sm" style={{ color: '#dc2626', borderColor: '#fca5a5', background: 'white', border: '1px solid #fca5a5', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer' }}>
                      Resend Parent SMS
                    </button>
                  )}
                </div>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.subject}</div>
                <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, margin: 0 }}>{s.remark}</p>
              </div>

              {s.tags.length > 0 && (
                <div className="flex gap-2 mb-3" style={{ flexWrap: 'wrap' }}>
                  {s.tags.map((tag, j) => <span key={j} className="badge badge-blue">{tag}</span>)}
                </div>
              )}

              {s.draft && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  {['Deadline adherence', 'Lab group collaboration'].map((q, j) => (
                    <span key={j} className="badge badge-gray">{q}</span>
                  ))}
                  <span className="badge badge-green">+ Calculus clinic</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748b', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ flex: 1 }}>{s.parentSigned}</span>
                {s.draft ? (
                  <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#16a34a' }} /> Visible to Parents on Portal
                    </label>
                    <button className="btn btn-outline btn-sm">Save Draft</button>
                    <button className="btn btn-primary btn-sm">Publish Remark</button>
                  </div>
                ) : !s.actionRequired ? (
                  <button className="btn btn-outline btn-sm">View Full History</button>
                ) : (
                  <button className="btn btn-outline btn-sm">Schedule Parent Meet</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right - AI Assistant */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">🤖 Assistant</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Greenwood Pedagogical LLM v3.2</div>
              </div>
              <span className="badge badge-green">Smart Co-Pilot</span>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>Pedagogical Tone Profile</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {['Encouraging', 'Rigorous', 'Goal-Oriented'].map(tone => (
                  <button key={tone} className={`btn btn-sm ${selectedTone === tone ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setSelectedTone(tone)}>{tone}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>Institutional Phrase Bank</div>
              {phrases.map((phrase, i) => (
                <div key={i} style={{
                  background: '#f8fafc', borderRadius: 6, padding: '8px 10px',
                  marginBottom: 6, cursor: 'pointer', fontSize: 12, color: '#374151',
                  border: '1px solid #e2e8f0', lineHeight: 1.5
                }}>
                  {phrase}
                </div>
              ))}
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Customize Bank →</div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginBottom: 8, textTransform: 'uppercase' }}>4 Remaining Drafts</div>
              <button className="btn btn-outline btn-sm w-full">
                <Bot size={12} /> Generate customized drafts from quota scores
                <span className="badge badge-blue" style={{ marginLeft: 4, fontSize: 10 }}>Auto-Draft</span>
              </button>
            </div>
          </div>

          {/* Pastoral Care */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">💚 Pastoral Care &amp; Coordination</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Faculty-Only Confidential Ledger</span>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 8, padding: 10, marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                <div className="avatar av-teal" style={{ width: 28, height: 28, fontSize: 11 }}>EV</div>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 12 }}>Mrs. Elena Vance</span>
                  <span style={{ fontSize: 11, color: '#64748b' }}> · Yesterday · 16:00</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
                Re: <strong>Vikramaditya Singh</strong> – "Met with Vikramaditya regarding test anxiety and sleep schedule adjustments. Recommend Dr Evans provide him with extended 6-minute pre-reading for the Ray Optics module."
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Status: In Observation</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div className="avatar av-green" style={{ width: 28, height: 28, fontSize: 11 }}>AE</div>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: 10, flex: 1, fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
                Re: <strong>Ananya Roy</strong> – "Noticed marked increase in confidence during peer tutoring sessions. Recommended for Student Council Academic Ambassador nomination."
              </div>
            </div>
            <textarea className="form-textarea" placeholder="Add private note for Counselor..." style={{ minHeight: 60 }} />
            <button className="btn btn-primary btn-sm mt-2 w-full"><Plus size={12} /> Add Note</button>
          </div>
        </div>
      </div>
    </div>
  )
}
