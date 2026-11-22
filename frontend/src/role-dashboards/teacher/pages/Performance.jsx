import React, { useState } from 'react'
import { Download, Calendar, TrendingUp, AlertTriangle, Plus } from 'lucide-react'

const quadrantStudents = {
  topLeft: [
    { name: 'Aarav Sharma', score: 'Avg 97.5%', tag: 'Physics Specialist', color: 'av-green', delta: '+4.2%' },
    { name: 'Chloe Lawrence', score: 'Avg 78.5%', tag: 'Top Score', color: 'av-blue', delta: '+3.6%' },
    { name: 'Ananya Roy', score: 'Avg 92.0%', tag: 'Nominated to Gumbo', color: 'av-purple', delta: '+5.1%' },
  ],
  topRight: [
    { name: 'Rohan Sengupta', score: '72% + 51%', tag: 'Hunt', color: 'av-teal', delta: '+12.0%' },
    { name: 'Devansh Kulkarni', score: '69% + 79% | Topdog', tag: '', color: 'av-orange', delta: '+10.2%' },
    { name: 'Maxi Miller', score: '65% + 63%', tag: '-4.9%', color: 'av-indigo', delta: '-4.9%' },
  ],
  bottomLeft: [
    { name: 'Tanya Mukherjee', score: 'Practicals: 49%', tag: 'Medical Leave', color: 'av-blue', flag: true },
    { name: 'Primus Jain', score: 'Scale: 75% – Formula Cap', tag: '', color: 'av-green' },
  ],
  bottomRight: [
    { name: 'Vikramaditya Singh', score: 'Avg 34% – Solo Velocity', tag: '3 Students', color: 'av-red', flag: true },
    { name: 'Kabir Hems', score: 'Degree Denies', tag: '', color: 'av-purple' },
  ],
}

const units = [
  { name: 'Unit 1: Kinematics & Newton Laws', pct: 94, status: '94% Mastered', tag: 'badge-green' },
  { name: 'Unit 2: Thermodynamics & Kinetic Theory', pct: 72, status: 'Held Back', tag: 'badge-yellow' },
  { name: 'Unit 3: Waves & Physics of Optics', pct: 86, status: '86% On Back', tag: 'badge-blue' },
  { name: 'Unit 4: Magnetism & AC Circuits', pct: 29, status: '29% In Progress', tag: 'badge-orange' },
  { name: 'Unit 6: Modern Physics', pct: 72, status: '72 Attention Needed', tag: 'badge-red' },
]

const months = [
  { month: 'Aug', val: 62 }, { month: 'Sep', val: 68 }, { month: 'Oct', val: 72 },
  { month: 'Nov', val: 75 }, { month: 'Dec', val: 78 }, { month: 'Jan', val: 80 },
  { month: 'Feb 25', val: 87, highlight: true },
]

const remedials = [
  { type: 'CUMC', title: 'Ray Optics Sign Conventions', time: 'Wed, Feb 26 • 3:00–3:30 PM', students: '8 Stu Targeted', scope: 'Scope As Acquired' },
  { type: 'CUMC', title: 'LCR Impedance & Phase Phasors', time: 'Thu Feb 27 • 16:30–17:00 IST', students: '11 Students Targeted', scope: 'Lab Assistant: Ms. Nair' },
  { type: 'CUMC', title: 'Photoelectric Equation Workshop', time: 'Sat, Mar 1 • 09:30–11:00 IST', students: '14 Students Targeted', scope: 'Parental 5% sessions dispatched' },
]

export default function Performance() {
  const [tab, setTab] = useState('Section 12: All (42 Students)')

  return (
    <div>
      <div className="breadcrumb">
        <span>Evaluation &amp; Records</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Monthly Performance</span>
        <span className="badge badge-blue" style={{ marginLeft: 6 }}>Term &amp; Analytics Cycle: Month: February 2025</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Cohort Academic Velocity &amp; Performance Intelligence</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>
            Comparative scholastic trend analysis, chapter-level competency gaps, and predictive board examination outcomes for Grade 10-B Physics Specialization.
          </div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm">Benchmark Parallel</button>
          <button className="btn btn-outline btn-sm"><Calendar size={13} /> Schedule Remedial</button>
          <button className="btn btn-primary btn-sm"><Download size={13} /> Export Report (PDF)</button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="chip-group" style={{ marginBottom: 16 }}>
        {['Cohort View', 'Section 12: All (42 Students)', 'Physics Honors Group', 'Lab Cohort Alpha', 'Lab Cohort Meta'].map((t, i) => (
          <button key={i} className={`chip${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>Last assessment ingested: Feb 24, 2025</div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Monthly Average Mastery</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>82.6%</div>
          <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>↑ +9.5% MoM</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>vs 78.5% in January</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '82.6%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Direct Remediation</div>
          <div className="stat-value">88%</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Identified concept defects with</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>fallback topics &amp; monthly lab score</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">AISSE P% Readiness</div>
          <div className="stat-value">18<span style={{ fontSize: 13, color: '#64748b' }}>/42</span></div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>42.8% of Cohort</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Calculated by Bayesian projection at monthly mid-terms</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lab-Score Distribution</div>
          <div style={{ fontWeight: 800, fontSize: 22, color: '#16a34a' }}>r = +0.89</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>High Reliability</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Theory: 0.74</div>
              <div style={{ fontSize: 10, color: '#94a3b8' }}>Lab Practicals: 0.17</div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Growth Trajectory */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📈 Longitudinal Cohort Growth Trajectory</div>
              <div className="flex gap-2">
                <span className="badge badge-gray" style={{ fontSize: 11 }}>● IB Avg (79%)</span>
                <span className="badge badge-blue" style={{ fontSize: 11 }}>Target (79%)</span>
                <span className="badge badge-green" style={{ fontSize: 11 }}>CBSE (100%)</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', padding: '12px 0', overflowX: 'auto', minHeight: 120 }}>
              {months.map((b, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, minWidth: 36 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: b.highlight ? '#16a34a' : '#64748b' }}>{b.val}%</div>
                  <div style={{
                    width: '80%',
                    height: `${b.val * 1.4}px`,
                    background: b.highlight ? '#16a34a' : '#e2e8f0',
                    borderRadius: '4px 4px 0 0',
                    minHeight: 20
                  }} />
                  <div style={{ fontSize: 10, color: '#94a3b8', whiteSpace: 'nowrap' }}>{b.month}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, borderTop: '1px solid #f8fafc', paddingTop: 10 }}>
              <div><div style={{ fontWeight: 700, color: '#16a34a' }}>+11.6%</div><div style={{ fontSize: 11, color: '#94a3b8' }}>Net Memorative Delta<br />5th Inclusion Imaggion</div></div>
              <div><div style={{ fontWeight: 700 }}>+4.2%</div><div style={{ fontSize: 11, color: '#94a3b8' }}>Parallel of Theoreticals<br />Higherize Dec 31–A (75 15)</div></div>
              <div><div style={{ fontWeight: 700 }}>±6.4%</div><div style={{ fontSize: 11, color: '#94a3b8' }}>Standard Deviation<br />Achieved form 21.2% in Sep</div></div>
            </div>
          </div>

          {/* Student Trajectory Quadrant */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📊 Student Trajectory Quadrant Matrix</div>
              <button className="btn btn-outline btn-sm">Cluster Notification</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { title: '✅ High Achievers', subtitle: 'Olympiad Track – 12 Students', students: quadrantStudents.topLeft, bg: '#f0fdf4', border: '#86efac' },
                { title: '📈 Trending CBSEbans', subtitle: 'Singh Velocity – 15 Students', students: quadrantStudents.topRight, bg: '#f0f9ff', border: '#7dd3fc' },
                { title: '⚠️ Inconsistent / Divergent Performers', subtitle: '– 8 Students', students: quadrantStudents.bottomLeft, bg: '#fffbeb', border: '#fcd34d' },
                { title: '🆘 At-Risk Cohort (Priority Action)', subtitle: '3 Students', students: quadrantStudents.bottomRight, bg: '#fff5f5', border: '#fca5a5' },
              ].map((quad, i) => (
                <div key={i} style={{ background: quad.bg, border: `1px solid ${quad.border}`, borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{quad.title}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10 }}>{quad.subtitle}</div>
                  {quad.students.map((s, j) => (
                    <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
                      <div className={`avatar ${s.color}`} style={{ width: 26, height: 26, fontSize: 10, flexShrink: 0 }}>
                        {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{s.name}</div>
                        <div style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.score}</div>
                      </div>
                      {s.delta && <span style={{ fontSize: 10, fontWeight: 700, color: s.delta.startsWith('+') ? '#16a34a' : '#dc2626', flexShrink: 0 }}>{s.delta}</span>}
                      {s.flag && <button className="btn btn-danger btn-sm" style={{ fontSize: 10, padding: '2px 6px', flexShrink: 0 }}>Assign Clinic</button>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Subject Competency Heatmap */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Subject Competency Heatmap</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>5 Units Active</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Class mastery per physics syllabus unit</div>
            {units.map((u, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{u.name}</span>
                  <span className={`badge ${u.tag}`} style={{ fontSize: 10, flexShrink: 0 }}>{u.status}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{
                    width: `${u.pct}%`,
                    background: u.pct >= 90 ? '#16a34a' : u.pct >= 70 ? '#f59e0b' : '#dc2626'
                  }} />
                </div>
              </div>
            ))}
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: 10, marginTop: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>👩‍🏫 Dr. Evans' Pedagogic Notes</div>
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>Last 4 deficits stem primarily from mathematical entrenchment narrowing transition from conceptual intuition. Transition to wave-packet visual simulations on March 1st.</div>
            </div>
          </div>

          {/* Remedial Action Planner */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">⚡ Remedial Action Planner</div>
              <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px' }}><Plus size={12} /></button>
            </div>
            {remedials.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '10px 0', borderBottom: i < remedials.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                <div style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 4, padding: '2px 6px', fontSize: 10, fontWeight: 700, height: 'fit-content', flexShrink: 0 }}>{r.type}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{r.time}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{r.students}</div>
                  <div style={{ fontSize: 11, color: '#16a34a' }}>{r.scope}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-2">View Past Remedial Outcomes &amp; Data Records</button>
          </div>

        </div>
      </div>

      {/* Footer audit */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, padding: '14px 16px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ fontSize: 12, color: '#64748b' }}>
          <strong>✓ Verified Monthly Audit: February Cycle</strong><br />
          Undefined sorting of Greenwood High Quality Assurance Criteria by Science Department &amp; Dean of Campus
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">Audit Log</button>
          <button className="btn btn-primary btn-sm">Publish to Department Head</button>
        </div>
      </div>
    </div>
  )
}
