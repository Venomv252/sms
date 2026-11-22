import React from 'react'
import { Download, Plus, CheckCircle, AlertTriangle, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const units = [
  { name: 'Unit I: Mechanics & Kinematics', status: 'Completed', pct: 100, periods: '12/12', tag: 'badge-green' },
  { name: 'Unit II: Thermodynamics & Kinetic Theory', status: 'Completed', pct: 100, periods: '10/10', tag: 'badge-green' },
  { name: 'Unit III: Waves & Oscillations', status: 'Completed', pct: 100, periods: '12/12', tag: 'badge-green' },
  { name: 'Unit IV: Optics & Ray Diagrams', status: 'New Practicals', pct: 78, periods: '12/16', tag: 'badge-yellow' },
  { name: 'Unit V: Modern Physics & Dual Nature', status: 'Behind Grid', pct: 40, periods: '2/6', tag: 'badge-red' },
]

const grade12Units = [
  { name: 'Unit V: Wave Optics & Interference Verified', pct: 100, periods: '18/18', status: 'Completed', tag: 'badge-green' },
  { name: 'Unit F: Magnetism & AC Circuits', pct: 91, periods: '22/24', status: 'New Prediction', tag: 'badge-yellow' },
]

const weekSchedule = [
  { day: 'Monday', time: '09:00–10:00', cohort: 'Grade 10-B', room: 'Lab 204', topic: 'Ray Optics – Refraction Using Biprism', objectives: 'Derive conditions, sketch deflection angles, get freehand drawings', lab: 'Spreadsheet drawing tools', hw: 'NC-01 Assignment' },
  { day: 'Tuesday', time: '09:00–10:00', cohort: 'Grade 10-B', room: 'Rm Hall, Rm 15', topic: 'Alternating Current – CB Review', objectives: 'Two-pronged approach: AC impedance two-factor concepts and accuracy and qualify factor (Q)', lab: 'AC Digital Generator Circuit', hw: 'Ex 17 & 8 (Chapter B2)' },
  { day: 'Wednesday', time: '09:45–11:15', cohort: 'Grade 10-B', room: 'Physics Lab 21A', topic: 'Hands-on Lab: Determine Panel Length', objectives: 'Determine focal length of biconvex lens using optical bench', lab: 'Optical Benches (STEAM)', hw: 'Parental (Physics) Hmwk' },
  { day: 'Thursday', time: '09:00–10:00', cohort: 'Grade 10-B', room: 'Rm Hall, Rm 15', topic: 'Electromagnetic Vector', objectives: 'Analyse coil/mirror problem and interpret electromagnetic diagnostics signal', lab: 'Interactive Lab Session', hw: 'Chapter 8: Exercise 14B' },
  { day: 'Friday', time: '01:00–02:00', cohort: 'Grade 10-B', room: 'Rm Hall, Rm 15', topic: 'Modern Physics – Atom Exploratory Intro', objectives: 'Relativist atom spectrum: Lyman, Balmer, Paschen series with Rutherford Model', lab: 'Practice Problems Set', hw: 'Practice Problems Set' },
]

const subHandoffs = [
  { grade: 'Grade 10-B', topic: 'Assign Self-Study Revision #OP-04 Item in the 20-item Caliber Drawer E-Steamer – can be completed by sub-teacher available.', status: 'Nominate Sub-Maker' },
  { grade: 'Grade 12-A', topic: 'MIT Sour Course VCW Video Wide Screening: Families show. A system pre-configured on their platform stadium app for attendance.', status: 'All Instructions' },
]

export default function SyllabusProgress() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Academic Department of Sciences</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Curriculum Pacing &amp; Term II Lesson Tracker</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Curriculum Pacing &amp; Term II Lesson Tracker</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Real-time syllabus execution, CBSE statutory compliance audits, 3-tridedly tetrapedagogical logs for Dr. Alistair Evans.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Download Syllabus Audit Report</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> Add Lesson Plan</button>
        </div>
      </div>

      {/* Top stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Term Pacing</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>88.5%</div>
          <div className="stat-sub" style={{ color: '#16a34a' }}>–1.5% ahead</div>
          <div className="progress-bar mt-1"><div className="progress-fill" style={{ width: '88.5%' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Academic Summary</div>
          <div className="stat-value">42</div>
          <div className="stat-sub">Days Remaining</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Term End: Mar 31</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">CBSE Statutory Slot</div>
          <div className="stat-value" style={{ color: '#16a34a', fontSize: 18 }}>Ready</div>
          <div className="stat-sub">2 remaining for board exam</div>
          <span className="badge badge-green" style={{ fontSize: 10, marginTop: 4 }}>2 Readied</span>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lab Practicals</div>
          <div className="stat-value">24<span style={{ fontSize: 14, color: '#64748b' }}>/26</span></div>
          <div className="stat-sub">Concluded</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Remaining: 4%. 3 Lab</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Curriculum Progress */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Curriculum Progress by Cohort</div>
              <div className="flex gap-2">
                <span className="badge badge-blue">All Assigned</span>
                <span className="badge badge-gray">Senior Secondary</span>
              </div>
            </div>

            {/* Grade 10-B */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: '#e0f2fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13, color: '#0369a1', flexShrink: 0
                }}>10B</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>Grade 10-B Physics <span className="badge badge-green" style={{ marginLeft: 6 }}>Homeroom</span></div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Syllabus Code: CBSE-PHX · 30 Theory + 30 Practicals + 8 IL</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: 15 }}>88.5% on track</div>
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: '88.5%' }} />
                  </div>
                </div>
              </div>
              {units.map((u, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: '#64748b' }}>{u.periods} Periods</span>
                      <span className={`badge ${u.tag}`}>{u.status}</span>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: 7 }}>
                    <div className="progress-fill" style={{ width: `${u.pct}%`, height: 7, background: u.pct === 100 ? '#16a34a' : u.pct < 50 ? '#dc2626' : '#f59e0b' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}></span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{u.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Grade 12-A */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8, background: '#fef3c7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13, color: '#b45309', flexShrink: 0
                }}>12A</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>Grade 12-A Physics <span className="badge badge-orange" style={{ marginLeft: 6 }}>Advanced Board</span></div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Syllabus Code: CBSE-PHX · Advanced Guided Orientations</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: 15 }}>92.0% on track</div>
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
              {grade12Units.map((u, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                    <div className="flex gap-2">
                      <span style={{ fontSize: 12, color: '#64748b' }}>{u.periods}</span>
                      <span className={`badge ${u.tag}`}>{u.status}</span>
                    </div>
                  </div>
                  <div className="progress-bar" style={{ height: 7 }}>
                    <div className="progress-fill" style={{ width: `${u.pct}%`, height: 7, background: u.pct === 100 ? '#16a34a' : '#f59e0b' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Lesson Plan */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">📅 Weekly Lesson Plan &amp; Daily Schedule Matrix</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Overview of today's daily topic, syllabus pacing and upcoming deliverables for Week 2</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm"><ChevronLeft size={13} /> Feb 17–21</button>
                <button className="btn btn-primary btn-sm">Feb 17 – Feb 21 <ChevronRight size={13} /></button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>DAY &amp; TIME</th>
                    <th>COHORT &amp; ROOM</th>
                    <th>LESSON TOPIC</th>
                    <th>LEARNING OBJECTIVES</th>
                    <th>LAB / EQUIPMENT</th>
                    <th>HOMEWORK ASSIGNED</th>
                  </tr>
                </thead>
                <tbody>
                  {weekSchedule.map((w, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{w.day}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{w.time}</div>
                      </td>
                      <td>
                        <span className="badge badge-blue">{w.cohort}</span>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{w.room}</div>
                      </td>
                      <td style={{ fontWeight: 600, fontSize: 13, maxWidth: 150 }}>{w.topic}</td>
                      <td style={{ fontSize: 12, color: '#64748b', maxWidth: 180 }}>{w.objectives}</td>
                      <td style={{ fontSize: 12 }}>{w.lab}</td>
                      <td style={{ fontSize: 12 }}>{w.hw}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-Teacher Handoff */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔄 Sub-Teacher Lesson Handoff &amp; Continuity Protocols</div>
              <span className="badge badge-green">Standing Active</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>The system automates and expedites stand-in packages in the event of unscheduled/faculty absences or weekly symposium duty.</div>
            {subHandoffs.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i === 0 ? '1px solid #f1f5f9' : 'none', alignItems: 'flex-start' }}>
                <span className="badge badge-green" style={{ flexShrink: 0 }}>{s.grade}</span>
                <div style={{ flex: 1, fontSize: 13, color: '#374151' }}>{s.topic}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>Nominate Sub Maker</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>All Instructions</div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary w-full mt-3">Update Handoff Notes</button>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Departmental Moderation */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Departmental Moderation &amp; Compliance</div>
              <span className="badge badge-green">Approved</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f8fafc', marginBottom: 8 }}>
              <div className="avatar av-purple" style={{ width: 38, height: 38, borderRadius: 8, fontSize: 12 }}>SR</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Dr. S. Ramanujam</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Science Department Head · Greenwood High Senior Campus</div>
              </div>
            </div>
            {[
              { label: 'Weekly Contact', val: '26 Periods' },
              { label: 'Completion Lectures', val: '25/150' },
              { label: 'Attestation', val: '3 Booked' },
              { label: 'Students Blocked', val: '0' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f8fafc', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>{r.label}</span>
                <span style={{ fontWeight: 700 }}>{r.val}</span>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-3">View Sign-off History Logs</button>
          </div>

          {/* Active Lab Force */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: 'white' }}>
            <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE LAB FORCE</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'white' }}>Optics Lab Practical Station 03</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, lineHeight: 1.5 }}>
              Grade 12: independent practicals on Wednesday. Equipment pre-configured with complete focal-length benches.
            </div>
            <button className="btn btn-sm mt-3" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', width: '100%' }}>
              Request Lab Technician Assist
            </button>
          </div>

          {/* Inventory Check */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Inventory Check</div>
              <span className="badge badge-green">OKNO Ready</span>
            </div>
            <div style={{ fontWeight: 700, marginBottom: 10 }}>Ray Optics Bench Report</div>
            {[
              { item: 'From Dispersion Tests', val: '16/16 Available' },
              { item: 'Blade Laser Sources', val: '10/12 (Gap 2)' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ color: '#64748b' }}>{r.item}</span>
                <span style={{ fontWeight: 700 }}>{r.val}</span>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-3">View Syllabus Map →</button>
          </div>

          {/* CBSE Digital Sign-Off */}
          <div className="card" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <div style={{ fontSize: 11, color: '#15803d', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>CBSE Digital Sign-Off Task</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#166534', marginBottom: 4 }}>Pre-Board Moderation Upload</div>
            <div style={{ fontSize: 12, color: '#166534', marginBottom: 8 }}>Term II Practical Safety Protocol – Due Feb 28</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: '#15803d' }}>CBSE Portal</span>
              <span style={{ fontWeight: 700, color: '#dc2626' }}>OUT 8 Days</span>
            </div>
            <button className="btn btn-primary btn-sm w-full">Sign Digitally Now →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
