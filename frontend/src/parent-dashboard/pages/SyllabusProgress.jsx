import React from 'react'
import { Download, BookOpen, CheckCircle } from 'lucide-react'

const subjects = [
  { name: 'Computer Science', coverage: 92, chapters: 12, completed: 11, upcoming: 'Python OOP & Inheritance', color: '#3b82f6' },
  { name: 'Mathematics (Adv.)', coverage: 88, chapters: 15, completed: 13, upcoming: 'Differential Equations', color: 'var(--primary)' },
  { name: 'Physics', coverage: 85, chapters: 14, completed: 12, upcoming: 'Wave Optics', color: '#8b5cf6' },
  { name: 'Chemistry', coverage: 82, chapters: 16, completed: 13, upcoming: 'Electrochemistry', color: '#f97316' },
  { name: 'English Language', coverage: 84, chapters: 10, completed: 8, upcoming: 'Drama & Prose Analysis', color: '#22c55e' },
  { name: 'Social Science', coverage: 78, chapters: 18, completed: 14, upcoming: 'Globalization & Trade', color: '#ec4899' },
]

export default function SyllabusProgress() {
  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Syllabus & Course Progress</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Syllabus & Course Progress</h1>
          <p className="page-subtitle">Track curriculum completion across all subjects for Aarav Sharma (Grade 10-B).</p>
        </div>
        <button className="btn btn-primary btn-sm"><Download size={14} /> Download Progress Report</button>
      </div>

      <div className="grid grid-3 mb-20">
        {[
          { label: 'OVERALL COMPLETION', value: '85%', sub: 'Term II Progress', color: 'var(--primary)' },
          { label: 'CHAPTERS COMPLETED', value: '71/85', sub: 'All Subjects', color: '#3b82f6' },
          { label: 'ON TRACK FOR BOARDS', value: '6/6', sub: 'All Subjects', color: '#22c55e' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}`, textAlign: 'center' }}>
            <div className="stat-label" style={{ justifyContent: 'center' }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2">
        {subjects.map((sub, i) => (
          <div key={i} className="card">
            <div className="card-body" style={{ padding: '16px' }}>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{sub.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{sub.completed}/{sub.chapters} Chapters Completed</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: sub.color }}>{sub.coverage}%</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Coverage</div>
                </div>
              </div>
              <div className="progress-bar" style={{ height: 10, marginBottom: 10 }}>
                <div className="progress-fill" style={{ width: `${sub.coverage}%`, background: sub.color }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={13} style={{ color: 'var(--text-muted)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Next: <strong>{sub.upcoming}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
