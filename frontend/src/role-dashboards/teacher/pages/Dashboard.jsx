import React from 'react'
import {
  AlertTriangle, Upload, Eye, BookOpen, Clock, ChevronRight,
  Users, FileText, TrendingUp, CheckCircle, Bell, Star,
  Activity, Clipboard, MessageSquare, Calendar, BarChart2, Zap, Bus, Shield
} from 'lucide-react'

const todaySchedule = [
  { time: '08:00', endTime: '08:50', subject: 'Grade 10-B Homeroom', room: 'Rm 204 (Wing)', tag: 'Daily Advisory', status: 'done' },
  { time: '08:50', endTime: '09:40', subject: 'Grade 10-B Physics', room: 'Rm 204 · Theory: Faraday\'s Law', tag: 'Live Next', status: 'live' },
  { time: '09:45', endTime: '11:15', subject: 'Grade 12-A Practical Lab', room: 'Sci-Wing Lab 2', tag: '90 Min Block', status: 'upcoming' },
  { time: '11:45', endTime: '12:35', subject: 'Academic Planning & Free Prep', room: 'Faculty Common', tag: 'Non-Contact', status: 'upcoming' },
  { time: '01:15', endTime: '02:05', subject: 'Remedial Clinic / Problem Solving', room: 'Tutorial Room 3', tag: 'Small Group', status: 'upcoming' },
]

const homeworkList = [
  { title: 'Optics & Lens Numerical Worksheet', class: 'Grade 10-B · Physics', due: 'Due Today 05:00 PM', dueRaw: 'Due Today', submissions: '34/42 (81%)', pending: '8 Pending Parent Countersign', status: 'urgent' },
  { title: 'Physics Practical Journal Verification', class: 'Grade 12-A · Advanced Physics', due: 'Due Friday Mar 01', dueRaw: 'Due Fri Mar 01', submissions: '18/42 (43%)', pending: '24 In Progress', status: 'pending' },
  { title: 'Nationalist Centers Map Work & Topography', class: 'Grade 10-B · Cross-Curricular', due: 'Due Monday Mar 04', dueRaw: 'Due Mon Mar 04', submissions: '39/42 Finished', pending: '', status: 'good' },
]

const homeroomStudents = [
  { roll: '108-01', initials: 'AS', name: 'Aarav Sharma', entry: '07:46 AM', p1: 'P', p2: 'A', status: 'present' },
  { roll: '108-02', initials: 'AM', name: 'Ananya Mukherjee', entry: '07:51 AM', p1: 'P', p2: 'L', status: 'late' },
  { roll: '108-08', initials: 'RV', name: 'Rohan Varma', entry: '09:04 AM', p1: 'P', p2: 'L', status: 'late' },
  { roll: '108-14', initials: 'TM', name: 'Tanya Mukherjee', entry: 'Medical Leave', p1: 'M', p2: 'A', status: 'medical' },
  { roll: '108-22', initials: 'VS', name: 'Vikramaditya Singh', entry: 'No Tag Logged', p1: 'A', p2: 'A', status: 'absent', flag: true },
  { roll: '108-30', initials: 'ZP', name: 'Zoya Patel', entry: '07:39 AM', p1: 'P', p2: 'A', status: 'present' },
]

const periodBadge = (v) => {
  const styles = {
    P: { bg: '#dcfce7', color: '#166534' },
    L: { bg: '#fef3c7', color: '#b45309' },
    A: { bg: '#fee2e2', color: '#991b1b' },
    M: { bg: '#dbeafe', color: '#1d4ed8' },
  }
  const s = styles[v] || { bg: '#f1f5f9', color: '#64748b' }
  return <span style={{ background: s.bg, color: s.color, fontWeight: 700, fontSize: 11, padding: '2px 7px', borderRadius: 4 }}>{v}</span>
}

const syllabusUnits = [
  { name: 'Unit III: Electromagnetic Induction', pct: 92, status: 'Completed', tag: 'badge-green' },
  { name: 'Unit IV: Electronics', pct: 78, status: 'In Progress', tag: 'badge-blue' },
  { name: 'Unit V: Modern Physics', pct: 40, status: 'Behind Grid', tag: 'badge-red' },
]

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>Wednesday, February 26, 2025 · Lesson Planner</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>Good morning, Dr. Alistair Evans</h1>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Senior Post-Graduate Teacher · Physics & Homeroom Lead Grade 10-B</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><TrendingUp size={13} /> Lesson Plan</button>
          <button className="btn btn-primary btn-sm"><Upload size={13} /> Upload Homework for Tonight</button>
        </div>
      </div>

      {/* Alert banner */}
      <div className="alert alert-danger" style={{ marginBottom: 10 }}>
        <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <strong>HOMEROOM FULL CALL OVERDUE</strong> – Homeroom has Full Call for Grade 10-B, as pending the Attendance Dean's Office lock down at 08:30 AM EST. Unverified rosters will trigger automated escalation SMS notices to campus security and parent contacts.
        </div>
        <button className="btn btn-sm" style={{ background: '#dc2626', color: 'white', flexShrink: 0, marginLeft: 8 }}>
          Mark Full Attendance
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Today's Periods</div>
          <div className="stat-value">5</div>
          <div className="stat-sub">Periods</div>
          <div style={{ fontSize: 11, color: '#16a34a', marginTop: 2 }}>39 students attended</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Monthly Attendance</div>
          <div className="stat-value">39</div>
          <div className="stat-sub" style={{ color: '#16a34a' }}>All Checked in</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '92.8%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Next Exam</div>
          <div className="stat-value" style={{ fontSize: 18, lineHeight: 1.1 }}>18 To<br />Grade</div>
          <div className="stat-sub">Pre-Board Moderation</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Open Assignments</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>2</div>
          <div className="stat-sub">Open</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Saturday, 02 PM</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Syllabus Paced</div>
          <div className="stat-value" style={{ color: '#16a34a', fontSize: 22 }}>88.5%</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '88.5%' }} /></div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>-1.5% ahead</div>
        </div>
      </div>

      <div className="main-side-layout">
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Today's Teaching Schedule */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Today's Teaching &amp; Labs</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Wednesday · 5 Periods · 2 Labs</div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-green">5 Periods</span>
                <span className="badge badge-blue">2 Labs</span>
              </div>
            </div>
            {todaySchedule.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 8px', borderBottom: i < todaySchedule.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: s.status === 'live' ? '#f0fdf4' : 'transparent',
                borderRadius: s.status === 'live' ? 6 : 0,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 10,
                  background: s.status === 'done' ? '#f1f5f9' : s.status === 'live' ? '#16a34a' : '#e0f2fe',
                  color: s.status === 'done' ? '#94a3b8' : s.status === 'live' ? 'white' : '#0369a1'
                }}>
                  {s.time}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{s.subject}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.room}</div>
                </div>
                <span className={`badge ${s.status === 'done' ? 'badge-gray' : s.status === 'live' ? 'badge-green' : 'badge-blue'}`}>
                  {s.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Grade 10-B Homeroom Roll Call */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Grade 10-B – Homeroom Roll Call</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Bus Present: 27 · Home Present: 12 · Full Register</div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-green">39 Present</span>
                <button className="btn btn-primary btn-sm" style={{ fontSize: 11 }}>Submit to Dean's Office</button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#f8fafc' }}>
                    <th style={{ padding: '7px 10px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>Roll</th>
                    <th style={{ padding: '7px 10px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>Student</th>
                    <th style={{ padding: '7px 10px', textAlign: 'left', fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>Entry</th>
                    <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>P1</th>
                    <th style={{ padding: '7px 10px', textAlign: 'center', fontWeight: 700, color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>P2</th>
                  </tr>
                </thead>
                <tbody>
                  {homeroomStudents.map((s) => (
                    <tr key={s.roll} style={{ borderTop: '1px solid #f1f5f9', background: s.status === 'absent' ? '#fff5f5' : 'white' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 700, color: s.status === 'absent' ? '#dc2626' : '#1e293b', fontSize: 11 }}>{s.roll}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div className="avatar" style={{ width: 26, height: 26, fontSize: 10,
                            background: s.status === 'present' ? '#16a34a' : s.status === 'late' ? '#f59e0b' : s.status === 'medical' ? '#3b82f6' : '#dc2626'
                          }}>{s.initials}</div>
                          <span style={{ fontWeight: 600, fontSize: 12 }}>{s.name}</span>
                          {s.flag && <span className="badge badge-red" style={{ fontSize: 9, padding: '1px 5px' }}>Absent</span>}
                        </div>
                      </td>
                      <td style={{ padding: '8px 10px', fontSize: 11, color: '#64748b' }}>
                        {s.status === 'absent'
                          ? <span className="badge badge-red" style={{ fontSize: 10 }}>No Tag</span>
                          : s.status === 'medical'
                            ? <span className="badge badge-blue" style={{ fontSize: 10 }}>Medical</span>
                            : <span style={{ color: '#374151' }}>{s.entry}</span>
                        }
                      </td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{periodBadge(s.p1)}</td>
                      <td style={{ padding: '8px 10px', textAlign: 'center' }}>{periodBadge(s.p2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Homework & Assignment Broadcast */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 Homework &amp; Assignment Broadcast</div>
              <button className="btn btn-primary btn-sm"><FileText size={12} /> + Create Assignment</button>
            </div>
            {homeworkList.map((hw, i) => (
              <div key={i} style={{
                padding: '12px', borderRadius: 8,
                border: `1px solid ${hw.status === 'urgent' ? '#fca5a5' : '#e2e8f0'}`,
                borderLeft: `4px solid ${hw.status === 'urgent' ? '#dc2626' : hw.status === 'pending' ? '#f59e0b' : '#16a34a'}`,
                background: hw.status === 'urgent' ? '#fff8f8' : 'white',
                marginBottom: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{hw.class}</span>
                  <span className={`badge ${hw.status === 'urgent' ? 'badge-red' : hw.status === 'good' ? 'badge-green' : 'badge-yellow'}`}>{hw.dueRaw}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{hw.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Submissions: <strong>{hw.submissions}</strong></span>
                  {hw.pending && <span style={{ fontSize: 11, color: '#f59e0b' }}>⚠ {hw.pending}</span>}
                  <button className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>Review &amp; Grade</button>
                </div>
              </div>
            ))}
          </div>

          {/* Exam Results */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📊 Exam Results &amp; Marks Entry Status</div>
              <span className="badge badge-yellow">Qualify 70% Rules</span>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>38<span style={{ fontSize: 16, color: '#64748b' }}>/42</span></div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Pre-Board Score</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>79.4%</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Batch Average Score</div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>22</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>Students Enrolled</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm"><Eye size={12} /> View Full Roster</button>
              <button className="btn btn-primary btn-sm">Lock &amp; Dispatch Grades</button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Curriculum & Notes Compliance */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📚 Curriculum &amp; Notes Compliance</div>
              <span className="badge badge-green">Approved</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Grade 10-B Physics</span>
                <span style={{ fontWeight: 800, color: '#16a34a', fontSize: 13 }}>88.5%</span>
              </div>
              <div className="progress-bar mb-2"><div className="progress-fill" style={{ width: '88.5%' }} /></div>
            </div>
            {syllabusUnits.map((u, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{u.name}</span>
                  <span className={`badge ${u.tag}`}>{u.status}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${u.pct}%`, background: u.pct >= 90 ? '#16a34a' : u.pct >= 70 ? '#f59e0b' : '#dc2626' }} />
                </div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-2">View Syllabus Map →</button>
          </div>

          {/* Discipline & Merit Ledger */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🛡️ Discipline &amp; Merit Ledger</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }}><Star size={12} /> Merit Token</button>
              <button className="btn btn-danger btn-sm" style={{ flex: 1 }}><Shield size={12} /> Conduct Citation</button>
            </div>
            {[
              { name: 'Aarav Sharma', type: 'Merit Token (+10 Pts)', pts: '+10 Pts', tag: 'badge-green', av: 'av-green' },
              { name: 'Kabir Mehta', type: 'Conduct Citation (-5 Pts)', pts: '-5 Pts', tag: 'badge-red', av: 'av-orange' },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div className={`avatar ${d.av}`} style={{ width: 28, height: 28, fontSize: 11 }}>
                  {d.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{d.type}</div>
                </div>
                <span className={`badge ${d.tag}`}>{d.pts}</span>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-2">Submit to 5th Form Student Cousins</button>
          </div>

          {/* Sports & Team Mentorship */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏆 Sports &amp; Team Mentorship</div>
              <span className="badge badge-green">1st Place</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>140</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Mentoring Mins</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>+25 pts</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Sprint Lead</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['SPRINT: 04.2s', 'JUMP: 5.8m'].map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', padding: '8px', background: '#f8fafc', borderRadius: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.split(': ')[1]}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.split(': ')[0]}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>View &amp; Activities</button>
            </div>
          </div>

          {/* Homeroom Transit Broadcast */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">
                  <Bus size={14} style={{ display: 'inline', marginRight: 6, color: '#16a34a' }} />
                  Homeroom Transit &amp; Broadcast
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Bus #14 &amp; 10 Student Count · Drop GPS Active</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
              {[{ label: 'Active Routes', val: 3 }, { label: 'GPS Active', val: '● LIVE' }, { label: 'Delays', val: 1 }].map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', padding: 8, background: '#f8fafc', borderRadius: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: i === 2 ? '#dc2626' : '#1e293b' }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff5f5', border: '1px solid #fca5a5', borderRadius: 6, padding: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#991b1b' }}>⚠ Route #14 Whitefield +12m delay</div>
              <div style={{ fontSize: 11, color: '#dc2626' }}>Metro works corridor: Revised ETA 08:08 AM</div>
            </div>
            <button className="btn btn-primary btn-sm w-full"><Zap size={12} /> Broadcast Route Delay SMS</button>
          </div>

          {/* Parent & Student Inquiries */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">💬 Parent &amp; Student Inquiries</div>
              <span className="badge badge-yellow">5 Awaiting Reply</span>
            </div>
            {[
              { name: 'Aarav Sharma', subject: 'Academic Lab Hours Waiver – National Science Camp', tag: 'Urgent', color: 'badge-red', av: 'av-green' },
              { name: 'Rohan Varma', subject: 'Academic Counseling on Physics Trigonometric Vectors', tag: 'In Progress', color: 'badge-yellow', av: 'av-blue' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div className={`avatar ${p.av}`} style={{ width: 30, height: 30, fontSize: 11 }}>
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{p.subject}</div>
                </div>
                <span className={`badge ${p.color}`}>{p.tag}</span>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-2">View All Inquiries →</button>
          </div>

        </div>
      </div>
    </div>
  )
}
