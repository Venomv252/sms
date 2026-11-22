import React from 'react'
import { Download, Award, BarChart2 } from 'lucide-react'

const termResults = [
  { subject: 'Computer Science', code: 'CS', t1: 96, t2: 98, grade: 'A1', maxMarks: 100 },
  { subject: 'Mathematics', code: 'MATH', t1: 93, t2: 96, grade: 'A1', maxMarks: 100 },
  { subject: 'Physics', code: 'PHY', t1: 90, t2: 92, grade: 'A1', maxMarks: 100 },
  { subject: 'Chemistry', code: 'CHEM', t1: 88, t2: 91, grade: 'A1', maxMarks: 100 },
  { subject: 'English Language', code: 'ENG', t1: 85, t2: 88, grade: 'A2', maxMarks: 100 },
  { subject: 'Hindi Course A', code: 'HIN', t1: 87, t2: 90, grade: 'A1', maxMarks: 100 },
  { subject: 'Social Science', code: 'SS', t1: 82, t2: 85, grade: 'A2', maxMarks: 100 },
]

export default function ResultsReportCards() {
  const avg = Math.round(termResults.reduce((sum, s) => sum + s.t2, 0) / termResults.length)

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Exams & Results</a>
        <span>›</span>
        <span>Results & Report Cards</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Results & Report Cards</h1>
          <p className="page-subtitle">Official term results and progress reports for Aarav Sharma (Grade 10-B, Roll #24).</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Download Report Card (PDF)</button>
        </div>
      </div>

      <div className="grid grid-4 mb-20">
        {[
          { label: 'CUMULATIVE SCORE', value: `${avg}%`, sub: 'Term II', color: 'var(--primary)' },
          { label: 'CLASS RANK', value: '#3', sub: 'of 43 Students', color: '#3b82f6' },
          { label: 'SUBJECTS CLEARED', value: '7/7', sub: 'All Passed', color: '#22c55e' },
          { label: 'OVERALL GRADE', value: 'A1', sub: 'Distinction', color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}`, textAlign: 'center' }}>
            <div className="stat-label" style={{ justifyContent: 'center' }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="card mb-20">
        <div className="card-header">
          <div className="card-title">Term-wise Subject Performance</div>
          <div className="flex gap-10">
            <span className="tag tag-blue" style={{ fontSize: 11 }}>● Term I</span>
            <span className="tag tag-green" style={{ fontSize: 11 }}>● Term II</span>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>CODE</th>
                <th>TERM I MARKS</th>
                <th>TERM II MARKS</th>
                <th>IMPROVEMENT</th>
                <th>GRADE</th>
                <th>PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {termResults.map((row, i) => {
                const improvement = row.t2 - row.t1
                return (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, fontSize: 14 }}>{row.subject}</td>
                    <td><span className="tag tag-gray" style={{ fontSize: 11 }}>{row.code}</span></td>
                    <td style={{ fontSize: 14, fontWeight: 600 }}>{row.t1}/{row.maxMarks}</td>
                    <td style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{row.t2}/{row.maxMarks}</td>
                    <td>
                      <span style={{ fontSize: 13, fontWeight: 700, color: improvement > 0 ? 'var(--primary)' : improvement < 0 ? 'var(--red)' : 'var(--text-muted)' }}>
                        {improvement > 0 ? '+' : ''}{improvement}
                      </span>
                    </td>
                    <td>
                      <span className={`tag ${row.grade === 'A1' ? 'tag-green' : 'tag-blue'}`} style={{ fontSize: 11 }}>{row.grade}</span>
                    </td>
                    <td style={{ minWidth: 120 }}>
                      <div className="progress-bar">
                        <div className="progress-fill green" style={{ width: `${row.t2}%` }}></div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header"><div className="card-title">Grade Distribution</div></div>
          <div className="card-body">
            {['A1', 'A2'].map((grade, i) => {
              const count = termResults.filter(s => s.grade === grade).length
              return (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{ fontWeight: 700, fontSize: 15 }}>Grade {grade}</span>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{count} Subjects</span>
                  </div>
                  <div className="progress-bar" style={{ height: 10 }}>
                    <div className="progress-fill green" style={{ width: `${(count / termResults.length) * 100}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Principal's Remark</div></div>
          <div className="card-body">
            <div style={{ fontSize: 14, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              "Aarav Sharma has shown exemplary academic performance in Term II. His consistent improvement across all subjects, particularly in Computer Science and Mathematics, reflects exceptional dedication and aptitude. He is well-positioned for the upcoming CBSE Board Examinations."
            </div>
            <div style={{ marginTop: 12, fontWeight: 600, color: 'var(--primary)' }}>— Dr. Evans, Principal</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Greenwood High International School</div>
          </div>
        </div>
      </div>
    </div>
  )
}
