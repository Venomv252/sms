import React, { useState } from 'react'
import { Download, ExternalLink, CheckCircle, Clock, AlertCircle, BookOpen } from 'lucide-react'

const assignments = [
  {
    subject: 'Physics', chapter: 'Chapter 10', dueLabel: '● Due Today, 05:00 PM',
    title: 'Optics & Lens Formu...', turnitin: '0% (Clean)',
    teacher: 'Dr. Alistair Evans', details: 'Complete Problems 14 through 22 with ray diagrams.',
    progress: 6, total: 8, status: 'urgent', action1: 'View Worksheet', action2: 'Countersign',
    color: '#f97316'
  },
  {
    subject: 'Computer Applications', chapter: '', dueLabel: '● Due Tomorrow, 08:30 AM',
    title: 'Python BST Tree Trav...', turnitin: 'Code Syntax Passed',
    teacher: 'Mr. Rajesh Sen', details: 'Implement In-order, Pre-order & Post-order traversals with recursion.',
    progress: 1, total: 1, status: 'ready', action1: 'Inspect Code (.py)', action2: 'Review Draft',
    color: '#22c55e'
  },
  {
    subject: 'History & Civics', chapter: '', dueLabel: '● Due Friday, 03:00 PM',
    title: 'Nationalist Center...', turnitin: '',
    teacher: 'Mrs. N. Sen', details: 'Identity Champion, Kheda, Ahmedabad, and Dandion on the physical map.',
    progress: 0, total: 0, status: 'not-started', action1: 'Download Map Template', action2: 'Set Reminder',
    color: '#9ca3af'
  },
]

const diaryItems = [
  { label: "Tonight's Target Hours:", value: '1h 45m' },
  { label: "Student Self-Audit:", value: 'Logged by Aarav ✓' },
]

const graded = [
  { subject: 'MATHEMATICS', item: 'Ch8: Trigonometric Identities', score: '10/10', remark: '"Excellent step-by-step proof presentation. Neatly derived equations."', teacher: 'Mrs. Savita Roy', when: 'Graded Yesterday' },
  { subject: 'ENGLISH LITERATURE', item: "Essay: Shakespeare's Julius Caesar", score: '18/20', remark: '"Strong thesis, focus on concise transitions in the second argument."', teacher: 'Dr. Alistair Evans', when: 'Graded 3 days ago' },
  { subject: 'CHEMISTRY LAB', item: 'Practical Journal: Titration Curves', score: '15/15', remark: 'Certified with Honors by Dr. Shalini Menon. Graph observations match theoretical tolerances.', teacher: 'Dr. Shalini Menon', when: 'Graded Oct 20' },
]

const workload = [
  { day: 'MON', hours: 1.5, label: 'Physics, Eng', color: 'var(--primary)', pct: 60 },
  { day: 'TUE (TODAY)', hours: 1.75, label: 'Physics, Pyt...', color: 'var(--orange)', pct: 70, today: true },
  { day: 'WED', hours: 1.0, label: 'Maths Pract...', color: 'var(--primary)', pct: 40 },
  { day: 'THU', hours: 1.75, label: 'Chem, Hist...', color: 'var(--primary)', pct: 70 },
  { day: 'FRI', hours: 0.75, label: '5&1 Map W...', color: '#22c55e', pct: 30 },
]

export default function HomeworkAssignments() {
  const [activeTab, setActiveTab] = useState('Due Soon (2)')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Homework & Assignments</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Coursework, Homework & Daily Submissions</h1>
          <p className="page-subtitle">Track daily homework tasks, project deadlines, submission statuses, reporting feedback, and plagiarism reports for <strong>Aarav Sharma (Grade 10–B)</strong>.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm">● Sync Google Classroom</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Export Homework Digest (PDF)</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-4 mb-20">
        <div className="stat-card" style={{ borderTop: '3px solid var(--primary)' }}>
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={13} style={{ color: 'var(--primary)' }} />SUBMISSION COMPLIANCE</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>98.2%</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>54 of 55 on schedule</div>
          <div className="progress-bar"><div className="progress-fill green" style={{ width: '98%' }}></div></div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Top 5%</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--red)' }}>
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={13} style={{ color: 'var(--red)' }} />IMMEDIATE ATTENTION <span className="tag tag-orange" style={{ fontSize: 9, marginLeft: 4 }}>Tonight</span></div>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--red)' }}>2 Tasks</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>⚠ Awaiting parent countersign</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #3b82f6' }}>
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><BookOpen size={13} style={{ color: '#3b82f6' }} />COURSEWORK QUALITY</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#3b82f6' }}>9.4</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>/10 GPA</div>
          <div style={{ fontSize: 11.5, color: '#22c55e', marginTop: 4 }}>▲ 0.3 from Term I baseline</div>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid var(--primary)' }}>
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} style={{ color: 'var(--primary)' }} />EVENING LOAD <span className="tag tag-orange" style={{ fontSize: 9, marginLeft: 4 }}>Moderate</span></div>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>1h 45m</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Well within ICSE guidelines ✓</div>
        </div>
      </div>

      <div className="two-col mb-20">
        {/* Assignments Board */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Assignments Board</div>
            <div className="chip-tabs">
              {['Due Soon (2)', 'Pending Review (3)', 'Graded (18)'].map(t => (
                <span key={t} className={`chip-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ fontSize: 11 }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {assignments.map((a, i) => (
              <div key={i} style={{ border: `1.5px solid ${a.status === 'urgent' ? '#fed7aa' : a.status === 'ready' ? '#bbf7d0' : 'var(--border)'}`, borderRadius: 10, padding: 14, background: a.status === 'urgent' ? '#fff7ed' : a.status === 'ready' ? 'var(--primary-lighter)' : 'var(--border-light)' }}>
                <div className="flex items-center gap-8 mb-6">
                  {a.status === 'urgent' && <span className="tag tag-orange" style={{ fontSize: 10 }}>⏱ {a.dueLabel}</span>}
                  {a.status === 'ready' && <span className="tag tag-blue" style={{ fontSize: 10 }}>● {a.dueLabel}</span>}
                  {a.status === 'not-started' && <span className="tag tag-gray" style={{ fontSize: 10 }}>● {a.dueLabel}</span>}
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>{a.subject}{a.chapter && ` • ${a.chapter}`}</span>
                </div>
                {a.turnitin && (
                  <div style={{ marginBottom: 4 }}>
                    <span className={`tag ${a.turnitin.includes('Clean') ? 'tag-green' : 'tag-blue'}`} style={{ fontSize: 10 }}>
                      {a.turnitin.includes('Clean') ? '🔍 Turnitin ' : '✓ '}  {a.turnitin}
                    </span>
                  </div>
                )}
                {a.status === 'not-started' && <div className="tag tag-gray" style={{ fontSize: 10, marginBottom: 4 }}>Not Started</div>}
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 8 }}>Assigned by {a.teacher} • {a.details}</div>
                {a.progress > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(a.progress / a.total) * 100}%`, background: a.color }}></div>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 3 }}>● {a.progress} of {a.total} Problems Completed</div>
                  </div>
                )}
                <div className="flex gap-8">
                  <button className="btn btn-secondary btn-xs">{a.action1}</button>
                  <button className={`btn ${a.status === 'urgent' ? 'btn-primary' : 'btn-secondary'} btn-xs`}>{a.action2}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Parent Homework Diary */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">● Parent Homework Diary</div>
                <div className="card-subtitle">ICSE regulations require nightly guardian verification confirming the student has spent focused quiet hours on academic revision.</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '14px 16px' }}>
              {diaryItems.map((d, i) => (
                <div key={i} className="flex items-center justify-between" style={{ padding: '7px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>{d.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--primary-lighter)', borderRadius: 8 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 2 }} />
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.4 }}>I verify that Aarav has completed or drafted all assigned coursework for October 24 without external/unapproved aids.</span>
                </label>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                Acknowledge Aarav's Tonight Workload
              </button>
            </div>
          </div>

          {/* Graded */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Graded & Evaluated</div>
              <button className="btn btn-secondary btn-xs">View All (18)</button>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {graded.map((g, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < graded.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)' }}>{g.subject}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--primary)' }}>{g.score}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{g.item}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 4 }}>{g.remark}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{g.teacher} • {g.when}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Workload */}
      <div className="card mb-16">
        <div className="card-header">
          <div>
            <div className="card-title">Weekly Workload Distribution</div>
            <div className="card-subtitle">Prevent academic fatigue and ensure balanced study hours</div>
          </div>
          <span className="tag tag-green" style={{ fontSize: 11 }}>Optimal Threshold: &lt; 2.5 hrs/day</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            {workload.map((w, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 8 }}>
                  <div style={{ width: '70%', height: `${w.pct}%`, background: w.today ? w.color : 'var(--primary)', borderRadius: '4px 4px 0 0', opacity: w.today ? 1 : 0.6 }}></div>
                </div>
                <div style={{ fontSize: 13, fontWeight: w.today ? 800 : 600, color: w.today ? 'var(--orange)' : 'var(--text-primary)' }}>{w.hours}h</div>
                <div style={{ fontSize: 11, fontWeight: w.today ? 700 : 500, color: w.today ? 'var(--orange)' : 'var(--text-muted)', marginTop: 2 }}>{w.day}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{w.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--primary-lighter)', border: '1px solid #bbf7d0', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>Need Academic Support?</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Access Greenwood Peer Tutoring Hub →</div>
        </div>
        <button className="btn btn-primary btn-sm">Access Tutoring Hub</button>
      </div>
    </div>
  )
}
