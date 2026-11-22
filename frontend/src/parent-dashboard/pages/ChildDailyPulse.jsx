import React from 'react'
import { Download, Calendar, Activity, BookOpen, Award } from 'lucide-react'

const subjects = [
  { name: 'Computer Science', code: 'A1', color: '#3b82f6', grade: 'Grade A1', score: 98, percentile: 99, avgPct: 75, syllabus: 92, strength: 'Binary Search Trees, OOP Concepts', latest: 'Recent Lab Quiz: 26/25' },
  { name: 'Mathematics', code: 'A1', color: 'var(--primary)', grade: 'Grade A1', score: 96, percentile: 96, avgPct: 73, syllabus: 86, strength: 'Coordinates, Geometry, Statistics', latest: 'Weekly Trigonometry Test: 49 / 50' },
  { name: 'Science Core', code: 'A1', color: '#8b5cf6', grade: 'Grade A1', score: 92, percentile: 94, avgPct: 71, syllabus: 80, strength: 'Electromagnetism, Bonding', latest: 'Practical Lab Examination: 29 / 30' },
  { name: 'Hindi Course A', code: 'A1', color: '#22c55e', grade: 'Grade A1', score: 90, percentile: 88, avgPct: 69, syllabus: 90, strength: 'Poetry Recitation, Spoken', latest: 'Creative Writing Assessment: 18 / 20' },
  { name: 'English Language', code: 'A2', color: '#f97316', grade: 'Grade A2', score: 88, percentile: 84, avgPct: 72, syllabus: 84, strength: 'Analytical Prose, Critical Review', latest: 'Reading Comprehension Test: 22 / 25' },
  { name: 'Social Studies', code: 'A2', color: '#ec4899', grade: 'Grade A2', score: 85, percentile: 80, avgPct: 68, syllabus: 82, strength: 'Maps & Historical Timelines', latest: 'Map Geo Practical: 12 / 20' },
]

const bellFlow = [
  { time: '09:00–09:50', subject: 'P1 Mathematics (Adv.) Trigonometry', status: 'Completed', color: 'var(--primary)' },
  { time: '09:55–10:45', subject: 'P2 Chemistry (Organic Compounds)', status: 'Completed', color: '#8b5cf6' },
  { time: '10:50–11:40', subject: 'P3 English Adv. AI (Literature)', status: 'Completed', color: '#3b82f6' },
  { time: '10:46–11:34', subject: 'P4 Computer Science', status: 'In Progress', color: '#22c55e' },
  { time: '11:35–12:25', subject: 'P5 Social Science – (History/Civics)', status: 'Upcoming', color: '#f97316' },
  { time: '12:00–01:30', subject: 'P6 Physical Education', status: 'Upcoming', color: '#ec4899' },
]

export default function ChildDailyPulse() {
  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Child Daily Pulse & Analytics</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Child Daily Pulse & Subject Performance Analytics</h1>
          <p className="page-subtitle">Comprehensive granular tracking of attendance, real-time campus dwell status, subject competencies, chapter test scores, and homework completion for <strong>Aarav Sharma (Grade 10-B, Roll #24)</strong>.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Download Gradebook (PDF)</button>
          <button className="btn btn-primary btn-sm"><Calendar size={14} /> Schedule Academic Consultation</button>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="card mb-20" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a5c3a 100%)', border: 'none' }}>
        <div className="card-body" style={{ padding: '14px 20px' }}>
          <div className="grid grid-3" style={{ gap: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>ACTIVE ON-CAMPUS</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>● Present — Room 204 (Science Wing, 2nd Floor)</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Today, Term II, Week 18</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>CURRENT CLASS</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Period 4: Computer Science</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Python Lab x5 Room Report • 06:49 AM via Main Gate 2</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>HEALTH & DINING</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Normal Threshold (96.4°C)</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Lunch: Veg Paneer Basket loaded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Homework Action */}
      <div style={{ background: 'var(--orange-light)', border: '1.5px solid #fed7aa', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--orange)', marginBottom: 4 }}>Homework Action Items for Tonight (2):</div>
        <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Timely digital portions listed here, and for easy reference:</div>
        <div className="flex gap-12 mt-8 flex-wrap">
          <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>● Physics: Electromagnetic Numericals: 5:00 PM Today</span>
          <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>● Python: BST Traversal Code: Tomorrow 8:30 AM</span>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-4 mb-20">
        {[
          { label: 'TERM CUMULATIVE', value: '93.2%', sub: 'Top 5%', sub2: '▲ 2.4% Mid-Term Deduction', color: 'var(--primary)' },
          { label: 'CLASS DIVISION', value: 'Rank 2', sub: 'of 43 Students', sub2: '● Dean\'s List Candidate', color: '#3b82f6' },
          { label: 'SYLLABUS COVERAGE', value: '88.5%', sub: 'Target: 85%', sub2: 'On Schedule', color: '#8b5cf6' },
          { label: 'CAMPUS PUNCTUALITY', value: '146/155', sub: 'Days Present', sub2: '0 Unexcused Tardiness Events', color: '#22c55e', sub3: '99.2%' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div className="stat-label" style={{ color: s.color }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
            {s.sub2 && <div style={{ fontSize: 11, color: i === 0 ? '#22c55e' : 'var(--text-muted)' }}>{s.sub2}</div>}
          </div>
        ))}
      </div>

      {/* Subject Cards */}
      <div className="section-title">Subject-wise Competency & Performance</div>
      <div className="section-subtitle">Detailed breakdown of all academic domains, curriculum mapping, and recent assessments</div>
      <div className="grid grid-3 mb-20">
        {subjects.map((sub, i) => (
          <div key={i} className="subject-card" style={{ borderTop: `3px solid ${sub.color}` }}>
            <div className="subject-card-header">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{sub.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub.desc || (sub.code === 'A1' ? 'Core Academic Subject' : 'Language & Humanities')}</div>
              </div>
              <div style={{ padding: '3px 10px', background: sub.color + '20', borderRadius: 20, fontSize: 12, fontWeight: 700, color: sub.color, flexShrink: 0 }}>
                Grade {sub.code}
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: sub.color, marginBottom: 2 }}>{sub.score}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>CURRENT SCORE</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 12, marginBottom: 8 }}>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Percentile</div>
                <div style={{ fontWeight: 700, color: sub.color }}>{sub.percentile}th</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)' }}>Class Avg</div>
                <div style={{ fontWeight: 700 }}>{sub.avgPct}%</div>
              </div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 2 }}>Syllabus Completion</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${sub.syllabus}%`, background: sub.color }}></div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{sub.syllabus}%</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Key Strengths: <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{sub.strength}</span></div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{sub.latest}</div>
          </div>
        ))}
      </div>

      {/* Attendance + Faculty Card */}
      <div className="two-col mb-20">
        {/* Attendance Velocity */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Term Attendance Velocity</div>
            <span className="tag tag-green" style={{ fontSize: 10 }}>Overall 94.2%</span>
          </div>
          <div className="card-body">
            <div className="grid grid-3" style={{ gap: 12, marginBottom: 16 }}>
              {[
                { label: 'DAYS PRESENT', value: 146, color: 'var(--primary)' },
                { label: 'MEDICAL LEAVES', value: 9, color: 'var(--orange)', sub: 'Certified' },
                { label: 'UNEXCUSED', value: 0, color: 'var(--blue)', sub: 'Flawless Record' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '10px', background: 'var(--border-light)', borderRadius: 8 }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>{s.label}</div>
                  {s.sub && <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.sub}</div>}
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>MONTH-BY-MONTH PERCENTAGE (JAN–FEB) TARGET: ≥80%</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80 }}>
              {[
                { month: 'Jun', val: 85 }, { month: 'Jul', val: 90 }, { month: 'Aug', val: 88 },
                { month: 'Sep', val: 92 }, { month: 'Oct', val: 95 }, { month: 'Nov', val: 93 },
                { month: 'Dec', val: 91 }, { month: 'Feb', val: 96 },
              ].map((m, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '80%', height: `${m.val - 70}%`, background: m.val >= 95 ? 'var(--primary)' : 'var(--blue)', borderRadius: '2px 2px 0 0', minHeight: 8 }}></div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{m.month}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>● Aarav's daily attendance often 1% average 18.2% merging</div>
          </div>
        </div>

        {/* Faculty Card */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Dr. Alistair Evans</div>
            <span className="tag tag-green" style={{ fontSize: 10 }}>Normal Rate</span>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Homeroom Board & Faculty Senior Faculty</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>
              "Aarav has exceptional academic consistency and disciplined classroom engagement. To exercise top-tier skills at the upcoming Board examinations, I recommend dedicating 20 minutes to structured long-form essay structuring and cartographic map puzzles in Social Studies."
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 12 }}>Logged: Wednesday, 03:15 PM • Parent Seen Logged</div>
            <div className="flex gap-8">
              <button className="btn btn-secondary btn-sm"><Activity size={13} /> Message Dr. Evans</button>
              <button className="btn btn-primary btn-sm">Full Term Card</button>
            </div>

            {/* Student activity summary */}
            <div style={{ marginTop: 14, background: 'var(--primary-lighter)', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary)', marginBottom: 4 }}>Student Activities</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Contributed 40 activity points</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                <span className="tag tag-green" style={{ fontSize: 10 }}>1st Place</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Debate Performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Academic Flow */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Today's Academic Flow & Bells</div>
            <div className="card-subtitle">Timecard for Tuesday, Grade 10 Sec. Term II Schedule</div>
          </div>
          <span className="tag tag-green" style={{ fontSize: 10 }}>Day 3 Cycle</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
            {bellFlow.map((period, i) => (
              <div key={i} style={{ minWidth: 140, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${period.status === 'In Progress' ? period.color : 'var(--border)'}`, background: period.status === 'In Progress' ? period.color + '15' : period.status === 'Completed' ? 'var(--border-light)' : 'white', textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{period.time}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: period.status === 'In Progress' ? period.color : period.status === 'Completed' ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{period.subject}</div>
                <div style={{ marginTop: 8 }}>
                  <span className={`tag ${period.status === 'Completed' ? 'tag-gray' : period.status === 'In Progress' ? 'tag-green' : 'tag-blue'}`} style={{ fontSize: 10 }}>
                    {period.status === 'Completed' ? 'Completed' : period.status === 'In Progress' ? '● In Session' : 'Upcoming'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
