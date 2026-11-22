import React, { useState } from 'react'
import { Award, Star, ChevronDown, Send } from 'lucide-react'

const remarks = [
  {
    teacher: 'Mrs. Savita Roy', role: 'Senior Mathematics Faculty • Grade 10 Lead', date: 'Feb 14, 2025',
    type: 'Commendation / Academic Praise', typeColor: 'tag-green',
    avatar: 'SR', avatarColor: 'var(--primary)',
    content: '"Aarav shows outstanding leadership in mathematics and algorithmic problem-solving. Participates enthusiastically in school debates and consistently assists peers."',
    validated: true, validatedBy: 'Validated by Academic Head', ref: 'Ref: GH/MATH/2025-098',
  },
  {
    teacher: 'Dr. Alistair Evans', role: 'Physics & Homeroom Mentor', date: 'Jan 29, 2025',
    type: 'Practical Excellence', typeColor: 'tag-blue',
    avatar: 'AE', avatarColor: '#3b82f6',
    content: '"Demonstrated remarkable scientific rigor during electromagnetism laboratory experiments. Thorough with lab documentation."',
    validated: true, validatedBy: 'Validated by Academic Head', ref: 'Ref: GH/SCI/2025-042',
  },
  {
    teacher: 'Mr. Rajesh Sen', role: 'Computer Science Faculty', date: 'Jan 10, 2025',
    type: 'Technical Distinction', typeColor: 'tag-purple',
    avatar: 'RS', avatarColor: '#8b5cf6',
    content: '"Exceptional programming logic shown in Python data structure implementations. Team player in robotics guild."',
    validated: true, validatedBy: 'Validated by Academic Head', ref: 'Ref: GH/ICT/2025-014',
  },
  {
    teacher: 'Coach Rawat', role: 'Director of Physical Education', date: 'Dec 18, 2024',
    type: 'Sports & Discipline', typeColor: 'tag-orange',
    avatar: 'CR', avatarColor: '#f97316',
    content: '"Exemplary sportsmanship as Vice Captain in Senior Cricket XI."',
    validated: true, validatedBy: 'Validated by Sports Board', ref: 'Ref: GH/PE/2024-312',
  },
]

const accolades = [
  { name: 'State Science Fair', desc: '1st Place in Regional Hydro-Renewables delivering 26 hours of representing Greenwood High.', tokens: 5, date: 'Awarded Jan 2025', icon: '🏆' },
  { name: 'Peer Math Mentoring', desc: 'Recognized for volunteering 24 hours of professional coaching to Grade 8 junior students.', tokens: 5, date: 'Awarded Dec 2024', icon: '🌟' },
  { name: 'Student Leadership', desc: 'Appointed Student Deputy Prefect for maintaining stellar discipline and peer guidance.', tokens: 5, date: 'Awarded Nov 2024', icon: '🎖' },
]

const behaviorMatrix = [
  { label: 'Academic Focus', score: 5.0 },
  { label: 'Respect & Courtesy', score: 5.0 },
  { label: 'Collaboration & Teamwork', score: 5.0 },
  { label: 'Uniform & Appearance', score: 5.0 },
  { label: 'Homework Regularity', score: 4.8 },
]

export default function TeacherRemarks() {
  const [noteIntent, setNoteIntent] = useState('thank')
  const [recipientFaculty, setRecipientFaculty] = useState('Dr. Alistair Evans (Homeroom)')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Communication & Feedback</a>
        <span>›</span>
        <span>Teacher Remarks & Discipline</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Faculty Remarks, Conduct & Discipline Ledger</h1>
          <p className="page-subtitle">Continuous behavioural assessments, classroom observations, merit accolades, and disciplinary logs for <strong>Aarav Sharma</strong>.</p>
        </div>
        <div className="flex gap-10">
          <span className="tag tag-green" style={{ fontSize: 12 }}>● Official ERP Academic Record</span>
          <button className="btn btn-secondary btn-sm">🖨</button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-4 mb-20">
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a5c3a 100%)', border: 'none' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>OVERALL STANDING</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 2 }}>Exemplary</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 6 }}>Top The Honor Roll (Top 2%)</div>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 20, fontSize: 11, color: 'white', fontWeight: 600 }}>Pillar of School Citizenship</span>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #eab308' }}>
          <div className="stat-label"><Star size={13} style={{ color: '#eab308' }} /> MERIT TOKENS</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#eab308' }}>15</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Earned</div>
          <div style={{ fontSize: 12, color: 'var(--primary)' }}>State Science Fair, Peer</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>+3 tokens since Dec 2024</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--blue)' }}>
          <div className="stat-label">DEMERITS / CITATIONS</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--blue)' }}>0</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Infractions</div>
          <div style={{ fontSize: 12, color: 'var(--primary)' }}>Zero formal or informal warnings</div>
          <div style={{ fontSize: 11.5, color: 'var(--primary)' }}>Impeccable discipline record</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--purple)' }}>
          <div className="stat-label">CLASS PUNCTUALITY</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--purple)' }}>99.2%</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>On-time classroom arrival</div>
          <div style={{ fontSize: 12, color: 'var(--text-primary)' }}>Overall 372 class periods tracked</div>
        </div>
      </div>

      <div className="two-col mb-20">
        {/* Remarks Timeline */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Timeline of Faculty Remarks</div>
              <div className="card-subtitle">Formal qualitative feedback recorded by subject heads</div>
            </div>
            <div className="flex gap-10">
              <select className="form-input" style={{ width: 'auto', fontSize: 12 }}>
                <option>All Disciplines</option>
              </select>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>AY 2024–25</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {remarks.map((r, i) => (
              <div key={i} style={{ padding: '16px 20px', borderBottom: i < remarks.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div className="flex items-start gap-12">
                  <div className="avatar avatar-md" style={{ background: r.avatarColor, fontSize: 13, flexShrink: 0 }}>{r.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-8 mb-4 flex-wrap">
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{r.teacher}</div>
                      <span className={`tag ${r.typeColor}`} style={{ fontSize: 10 }}>{r.type}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto', flexShrink: 0 }}>{r.date}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{r.role}</div>
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 10, padding: '10px 12px', background: 'var(--border-light)', borderRadius: 8 }}>
                      {r.content}
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="tag tag-green" style={{ fontSize: 10 }}>✓ {r.validatedBy}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{r.ref}</span>
                    </div>
                    <div className="flex gap-8 mt-8">
                      <button className="btn btn-secondary btn-xs">↩ Reply / Appreciate</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Behavioral Matrix */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>EVALUATION FRAMEWORK</div>
                <div className="card-title">Behavioral Matrix</div>
                <div className="card-subtitle">Term II Mid-Term</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {behaviorMatrix.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < behaviorMatrix.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--primary)' }}>{item.score} / 5.0</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(item.score / 5) * 100}%`, background: item.score >= 5 ? 'var(--primary)' : 'var(--orange)' }}></div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12.5, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                Classroom mentor comments: "Aarav models exemplary, compassionate group assignments."
              </div>
            </div>
          </div>

          {/* Parent Direct Portal */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>PARENT DIRECT PORTAL</div>
                <div className="card-title">Send appreciation or request clarification</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '14px 16px' }}>
              <div className="form-group">
                <label className="form-label">Recipient Faculty</label>
                <select className="form-input" value={recipientFaculty} onChange={e => setRecipientFaculty(e.target.value)}>
                  <option>Dr. Alistair Evans (Homeroom)</option>
                  <option>Mrs. Savita Roy (Mathematics)</option>
                  <option>Mr. Rajesh Sen (CS)</option>
                </select>
              </div>
              <div className="mb-12">
                <div className="form-label">Note Intent</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[{ id: 'thank', label: 'Thank You Note' }, { id: 'clarify', label: 'Seek Clarification' }].map(opt => (
                    <label key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: noteIntent === opt.id ? 'var(--primary)' : 'var(--text-secondary)' }}>
                      <input type="radio" name="noteIntent" checked={noteIntent === opt.id} onChange={() => setNoteIntent(opt.id)} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Message Content</label>
                <textarea className="form-input" rows={4} placeholder="Write a short note to the teacher..." style={{ resize: 'vertical' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={14} /> Dispatch to Faculty
              </button>
            </div>
          </div>

          {/* Honor Charter Info */}
          <div style={{ background: 'var(--primary-lighter)', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 6 }}>Greenwood High Honor Charter</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>Remarks and conduct rubrics adhere to the CBSE Pastoral Care Standard & Greenwood High Code of Ethics. Cumulative scores contribute toward the Annual Governor's Shield.</div>
          </div>
        </div>
      </div>

      {/* Accolades */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Recent Accolades & Citations</div>
            <div className="card-subtitle">Verified school badges and recognition credentials</div>
          </div>
          <span className="tag tag-green" style={{ fontSize: 11 }}>3 Active Certificates</span>
        </div>
        <div className="card-body">
          <div className="grid grid-3">
            {accolades.map((a, i) => (
              <div key={i} style={{ background: 'var(--primary-lighter)', border: '1.5px solid #bbf7d0', borderRadius: 10, padding: '14px' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary)', marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.4 }}>{a.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="tag tag-green" style={{ fontSize: 10 }}>+{a.tokens} Awarded Tokens</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>{a.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
