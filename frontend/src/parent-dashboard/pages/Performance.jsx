import React, { useState } from 'react'
import { Download, BarChart2, TrendingUp, BookOpen, Award, ChevronRight } from 'lucide-react'

const subjects = [
  { name: 'Mathematics (Adv.)', grade: 'A1', overall: 96, rank: 2, percentile: 96, classAvg: 78, topics: [{ name: 'Quadrature Polynomials & Checks', pct: 98 }, { name: 'Differential Equations', pct: 95 }, { name: 'Coordinate Geometry', pct: 90 }], color: 'var(--primary)' },
  { name: 'Comp. Science AI & AI', grade: 'A1', overall: 98, rank: 1, percentile: 99, classAvg: 71, topics: [{ name: 'Active GradScore 5 SQIT', pct: 99 }, { name: 'Relational in APTS & SQL Queries', pct: 97 }, { name: 'Algorithms & Computer-Wise Analytics', pct: 93 }], color: '#3b82f6' },
  { name: 'Science (Phys & Chem)', grade: 'A1', overall: 92, rank: 3, percentile: 94, classAvg: 75, topics: [{ name: 'Electrostatics & Optics', pct: 94 }, { name: 'Carbon Compounds & Polymers', pct: 90 }, { name: 'MRI Lab/Practices & Virus', pct: 88 }], color: '#8b5cf6' },
  { name: 'English Lang & Lit.', grade: 'A2', overall: 88, rank: 5, percentile: 88, classAvg: 74, topics: [{ name: 'Official Reading & Discipline', pct: 92 }, { name: 'Formal Essay & Analytical Writing', pct: 85 }, { name: 'Job Applications (PO.36)', pct: 82 }], color: '#f97316' },
  { name: 'Hindi Course A', grade: 'A1', overall: 90, rank: 4, percentile: 91, classAvg: 72, topics: [{ name: 'Poetry Grammar Placement', pct: 93 }, { name: 'Gram Synthesis Approach', pct: 88 }, { name: 'Batch Prep Interaction', pct: 86 }], color: '#10b981' },
  { name: 'Social Sciences', grade: 'A2', overall: 85, rank: 6, percentile: 80, classAvg: 70, topics: [{ name: 'Democratic Political Economics', pct: 89 }, { name: 'Nationalism in Oceans & India', pct: 85 }, { name: 'Map Work & Topography (20%)', pct: 75 }], color: '#eab308' },
]

const assessments = [
  { subject: 'Comp. Science', name: 'Unit Test 1 – Mathematics Class 10 – Physics', date: 'Oct 21, 2025', marks: '29/30', percentile: '29/10', teacherRemark: 'Applies and uses well-reasoned algorithms and code to push...' },
  { subject: 'Physics-Core', name: 'Unit Test 1 – Physics. Physics, Optics, High Subject Vibrations', date: 'Apr 10, 2025', marks: '4h/26', percentile: '49.13 Now', teacherRemark: 'Calmly and subject well-reasoned draft and step-by-step 250-word...' },
  { subject: 'Mathematics', name: 'Pre-Board Programmed Mean', date: 'Dec 03, 2025', marks: '80', percentile: '97 Hits', teacherRemark: 'Most I work more than via new here' },
  { subject: 'English', name: 'Assessment of Literature University (ASL)', date: 'Dec 08, 2025', marks: '38/40', percentile: '89.3%', teacherRemark: 'Contextually subject well-reasoned, Comprehensive...' },
]

const termGrowth = [
  { term: 'T-1 Oct', maths: 88, science: 85, english: 82 },
  { term: 'T-1 Nov', maths: 91, science: 87, english: 84 },
  { term: 'T-1 Dec', maths: 93, science: 89, english: 86 },
  { term: 'T-2 Jan', maths: 94, science: 91, english: 87 },
  { term: 'T-2 Feb', maths: 96, science: 92, english: 88 },
]

export default function Performance() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Performance (Subject-wise)</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Subject-wise Performance & Gradebook</h1>
          <div className="flex items-center gap-10 mt-6">
            <span className="tag tag-green">● SYNC ENABLED</span>
            <span style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>Continuous student evaluation, formative and summative assessments, chapter mastery scores, and quiz-predicted Grades (Gs. 0.0–4.0) for <strong>Aarav Sharma (Grade 10)</strong></span>
          </div>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><BarChart2 size={14} /> Compare with Class Average</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Download Verified Gradebook (PDF)</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-4 mb-20">
        {[
          { label: 'TERM GPA / GATE', value: '91.5%', sub: 'Distinction — Top 4%', sub2: 'A1 across major subjects', icon: Award },
          { label: 'CLASS STANDING', value: 'Rank 3', sub: 'of 43 students', sub2: '● Rank Indicator: Candidate', icon: BarChart2 },
          { label: 'CBSE CREDIT UNITS', value: '48 / 50', sub: 'All Completed', sub2: 'Board Commencement Ready', icon: BookOpen },
          { label: 'ASSESSMENT DETAIL', value: 'A1', sub: 'All A1 Completed', sub2: 'Board Commencement Activity', icon: TrendingUp },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="stat-card">
              <div className="stat-label"><Icon size={13} style={{ marginRight: 4 }} />{s.label}</div>
              <div className="stat-value" style={{ fontSize: 26, color: 'var(--primary)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
              {s.sub2 && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub2}</div>}
            </div>
          )
        })}
      </div>

      {/* Subject Cards */}
      <div className="section-title">Core Subject Mastery & Chapter Rubrics</div>
      <div className="grid grid-3 mb-20">
        {subjects.map((sub, i) => (
          <div key={i} className="subject-card">
            <div className="subject-card-header">
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{sub.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Class Rank #{sub.rank}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="tag tag-green">{sub.grade} Grade</span>
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div className="flex items-center gap-10 mb-10">
                <div style={{ fontSize: 30, fontWeight: 800, color: sub.color }}>{sub.overall}%</div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-muted)' }}>Overall</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Class avg: {sub.classAvg}%</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub.percentile}th Percentile</div>
                </div>
              </div>
              {sub.topics.map((t, ti) => (
                <div key={ti} style={{ marginBottom: 8 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '75%' }}>{t.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: sub.color }}>{t.pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${t.pct}%`, background: sub.color }}></div>
                  </div>
                </div>
              ))}
              <div className="flex gap-8 mt-10">
                <button className="btn btn-secondary btn-xs">✦ Rubrics →</button>
                <button className="btn btn-secondary btn-xs">✦ Analytics →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Trajectory + Cohort Distribution */}
      <div className="two-col mb-20">
        {/* Growth Chart */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Term vs Term & Growth Trajectory</div>
            <div className="flex gap-8">
              <span className="tag tag-green" style={{ fontSize: 10 }}>● Term I</span>
              <span className="tag tag-blue" style={{ fontSize: 10 }}>● Term I</span>
              <span className="tag tag-orange" style={{ fontSize: 10 }}>● Term I (LHL)</span>
            </div>
          </div>
          <div className="card-body">
            {/* Bar chart visualization */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140, padding: '0 10px' }}>
              {termGrowth.map((t, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 110 }}>
                    {[
                      { val: t.maths, color: 'var(--primary)' },
                      { val: t.science, color: '#8b5cf6' },
                      { val: t.english, color: '#3b82f6' },
                    ].map((bar, bi) => (
                      <div key={bi} style={{ width: 12, height: `${bar.val}%`, background: bar.color, borderRadius: '2px 2px 0 0', opacity: 0.85 }}></div>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', fontWeight: 500 }}>{t.term}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 12.5, color: 'var(--text-secondary)', padding: '10px 12px', background: 'var(--primary-lighter)', borderRadius: 8 }}>
              <strong>Big Takeaway:</strong> Our well-built strong academia candidates have to stand in science and Science last term. Aarav has built-in competencies for Boards last semester — Request Draft Creation →
            </div>
          </div>
        </div>

        {/* Cohort Percentile */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Cohort Percentile Distribution</div>
          </div>
          <div className="card-body">
            {[
              { label: '# 1 Students', pct: 8, color: '#ef4444' },
              { label: 'Aarav (A1) is in line', pct: 35, color: 'var(--primary)', highlight: true },
              { label: '', pct: 57, color: '#3b82f6' },
            ].map((row, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                {row.label && <div style={{ fontSize: 12.5, fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--primary)' : 'var(--text-secondary)', marginBottom: 4 }}>{row.label}</div>}
                <div className="progress-bar" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ width: `${row.pct}%`, background: row.color }}></div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{row.pct}%</div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--border-light)', borderRadius: 8 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 4 }}>CBSE Board Exam Readiness</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Predicted index: 93.8%</div>
            </div>
            <div className="flex items-center gap-12 mt-12">
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--border-light)', flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>AS</div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>13,004 Classrooms</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Regional Digital and Science...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Log */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Verified Formative Assessments & Unit Tests Log</div>
            <div className="card-subtitle">Continuous, data-verified and well-sorted by a teaching-led, algorithm to improve test-relevant</div>
          </div>
          <div className="flex gap-8">
            <span className="tag tag-green" style={{ fontSize: 10 }}>All Assessments</span>
            <span className="tag tag-gray" style={{ fontSize: 10 }}>Unit Tests</span>
            <span className="tag tag-gray" style={{ fontSize: 10 }}>Mid-Term Exams</span>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SUBJECT</th>
                <th>ASSESSMENT NAME</th>
                <th>EXAM DATE</th>
                <th>MAX MARKS</th>
                <th>MARKS SCORED</th>
                <th>PERCENTILE</th>
                <th>TEACHER REMARKS / ANNOTATION</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((a, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.subject}</td>
                  <td style={{ maxWidth: 180 }}>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</div>
                  </td>
                  <td style={{ fontSize: 12.5 }}>{a.date}</td>
                  <td style={{ fontSize: 12.5 }}>35</td>
                  <td>
                    <span className="tag tag-green" style={{ fontSize: 12 }}>{a.marks}</span>
                  </td>
                  <td style={{ fontSize: 12.5, fontWeight: 600 }}>{a.percentile}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 200 }}>{a.teacherRemark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>Showing all assessed class-page+s per request — for full 2024-03-2025 (33,180)</span>
          <div className="flex gap-8">
            <button className="btn btn-secondary btn-sm">Previous Test</button>
            <button className="btn btn-secondary btn-sm">Page left</button>
            <button className="btn btn-primary btn-sm">Next Test</button>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ marginTop: 20, background: 'var(--primary)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ color: 'white' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Need clarification on Aarav's chapter marks or percentile?</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>Academic Coordinator discussions are available for a redoubt over: they can communicate every Tuesday and Thursday.</div>
        </div>
        <button className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }}>Book Academic Consultation</button>
      </div>
    </div>
  )
}
