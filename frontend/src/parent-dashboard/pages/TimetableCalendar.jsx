import React, { useState } from 'react'
import { Download, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const activeDayIdx = 2 // Wednesday

const timetable = {
  Monday: [
    { period: 'P1', subject: 'Mathematics (Adv.)', room: 'Room 234', time: '09:00–09:50 AM', teacher: 'Mr. Rajesh K. • Topic: Quadratic Polynomials & Checks', color: 'var(--primary)' },
    { period: 'P2', subject: 'Chemistry Practical', room: 'Lab Session', time: '09:55–10:45 AM', teacher: 'Dr. David Bradley • Lab 210 • Organic Chemistry (Rings & Chains)', color: '#8b5cf6', tag: 'Lab Session' },
    { period: 'P3', subject: 'English Literature', room: 'Room 204', time: '10:00–10:40 AM', teacher: 'Prof. Clara D\'Souza • Room 204 • Narrative Techniques (Julius Caesar)', color: '#3b82f6' },
    { period: 'P4', subject: 'Computer Applications', room: 'CS Lab', time: '10:45–11:30 AM', teacher: 'Mr. Rajesh Sen & SOL Quarter', color: '#22c55e', tag: 'Elapsed Period', tagColor: 'tag-orange' },
    { period: '', subject: 'Morning Nutrition Recess (25 mins)', room: '', time: '11:30–11:55 AM', teacher: '', isBreak: true },
    { period: 'P5', subject: 'Lunch Break & Campus Recreation', room: '', time: '12:00–01:30 PM (60 mins)', teacher: '', isBreak: true },
    { period: 'P6', subject: 'Social Sciences (History)', room: 'Room 204', time: '01:30–02:20 PM', teacher: 'Mrs. Lakshmi Dutt & Study Group', color: '#f97316' },
    { period: 'P7', subject: 'Physical Education / Athletics', room: 'High Oval Track', time: '02:35–03:06 PM', teacher: 'Coach Rawat • Track Sprinting Drills & school relay', color: '#ec4899' },
    { period: 'P8', subject: 'Remedial Support & Robotics Club', room: 'Integration Studio', time: '03:00–03:30 PM', teacher: 'Faculty Coordinator • Problem-solving & Active Integration', color: '#6366f1' },
  ]
}

const calEvents = {
  26: [{ label: 'Head/The Th.', color: '#22c55e' }],
  27: [{ label: 'Trimmer Table', color: '#f97316' }],
  28: [{ label: 'Tests PTMs', color: '#3b82f6' }],
  1: [{ label: 'Grad Cycle...', color: 'var(--primary)' }],
  2: [{ label: 'Parent Focus...', color: '#8b5cf6' }],
  4: [{ label: 'Mock Test T&E', color: '#f97316' }],
  5: [{ label: 'Mock Test T&L', color: '#f97316' }],
  12: [{ label: 'Regular Class', color: 'var(--primary)' }],
  16: [{ label: 'Parent Focus...', color: '#ec4899' }],
  19: [{ label: 'Mock Tests T&...', color: '#f97316' }],
  22: [{ label: 'Semester Meet', color: '#3b82f6' }],
  25: [{ label: 'Scheduled Hol.', color: '#9ca3af' }],
  26: [{ label: 'Pre-Board S...', color: 'var(--primary)' }],
}

const bellSchedule = [
  { label: 'Opens Gate & Campus Access', time: '07:10 – 08:00 AM', color: 'var(--primary)' },
  { label: 'Homeroom Assembly & Reg.', time: '07:45 – 08:00 AM', color: '#3b82f6' },
  { label: 'First Warning Bell', time: '08:45 AM', color: '#f97316' },
  { label: 'Morning Academic Block', time: '08:00 – 11:36 AM', color: 'var(--primary)' },
  { label: 'Social Cafeteria / Lunch', time: '11:40 AM – 01:00 PM', color: '#22c55e' },
  { label: 'Post-Lunch Academic Block', time: '01:35 – 03:00 PM', color: '#8b5cf6' },
  { label: 'Final Dismissal & Departure', time: '03:10 PM', color: '#f97316' },
]

export default function TimetableCalendar() {
  const [activeDay, setActiveDay] = useState(activeDayIdx)

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Academics & Progress</a>
        <span>›</span>
        <span>Timetable & Academic Calendar</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Academic Schedule & Calendar</h1>
          <p className="page-subtitle">Class 10-B Master Routine, Institutional Key Dates, and Bell Schedules</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Calendar size={14} /> Sync iCal / Google</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Download PDF</button>
        </div>
      </div>

      {/* Academic Year Progress */}
      <div className="card mb-20">
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <div className="flex items-center justify-between flex-wrap gap-12 mb-14">
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>ACADEMIC YEAR</div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>Academic Year 2024–25 <span className="tag tag-green" style={{ fontSize: 11 }}>● Term II in Progress</span></div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Week 18 • 42 Instructions Days Remaining</div>
            </div>
            <div style={{ minWidth: 140 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Term Progress</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>75% Complete</span>
              </div>
              <div className="progress-bar" style={{ height: 8 }}>
                <div className="progress-fill green" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          <div className="grid grid-3" style={{ gap: 12 }}>
            {[
              { date: 'Mar 1–4', label: 'PRE-BOARDS', desc: 'Pre-Board Study Leave', color: '#fef9c3', textColor: '#a16207', tag: 'Mar 1–4' },
              { date: 'Mar 14', label: 'GAZETTED BREAK', desc: 'Mid-Festival Reviews, Non-Academic Break', color: '#fff7ed', textColor: '#c2410c', tag: 'Mar 14' },
              { date: 'Mar 20+', label: 'BOARD EXAMS', desc: 'Final AISSCE Board Exams', color: 'var(--accent-light)', textColor: 'var(--primary)', tag: 'Starts Mar 20' },
            ].map((e, i) => (
              <div key={i} style={{ background: e.color, border: `1px solid ${e.textColor}30`, borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: e.textColor, textTransform: 'uppercase', marginBottom: 4 }}>{e.label}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 2 }}>{e.desc}</div>
                <span className="tag" style={{ background: e.color, color: e.textColor, border: `1px solid ${e.textColor}40`, fontSize: 10 }}>{e.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col mb-20">
        {/* Weekly Interactive Timetable */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>SECTION ROUTINE</div>
              <div className="card-title">Weekly Interactive Timetable</div>
              <div className="card-subtitle">Aarav Sharma • Class 10-B  • Room 201</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {/* Day selector tabs */}
            <div className="scroll-x" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 6 }}>
              {days.map((d, i) => (
                <button key={i} className={`chip-tab ${activeDay === i ? 'active' : ''}`} onClick={() => setActiveDay(i)} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                  {d} {i === activeDayIdx ? '(Today)' : ''}
                </button>
              ))}
            </div>
            <div style={{ padding: '12px 16px' }}>
              {(timetable.Monday || []).map((cls, i) => {
                if (cls.isBreak) {
                  return (
                    <div key={i} style={{ padding: '8px 12px', background: 'var(--border-light)', borderRadius: 8, margin: '6px 0', fontSize: 12.5, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{cls.subject}</span>
                      <span style={{ fontWeight: 600 }}>{cls.time}</span>
                    </div>
                  )
                }
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-light)', alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: cls.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: cls.color, flexShrink: 0, marginTop: 2 }}>
                      {cls.period}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex items-center gap-8 mb-2">
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{cls.subject}</div>
                        {cls.tag && <span className={`tag ${cls.tagColor || 'tag-green'}`} style={{ fontSize: 10 }}>{cls.tag}</span>}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cls.teacher}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: cls.color }}>{cls.time.split('–')[0]}</div>
                      {cls.room && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{cls.room}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ padding: '10px 16px', background: 'var(--border-light)', margin: '10px 16px', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)' }}>
              DAILY CAMPUS NOTE • Lab Safety Gear: Students scheduled for Chem Lab 2 must wear compliant with lab facilities next instruction and ongoing training Process 5.
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Bell Schedule */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Bell Schedule</div>
                <div className="card-subtitle">School Standard, Room-Trained</div>
              </div>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {bellSchedule.map((b, i) => (
                <div key={i} className="flex items-center gap-10" style={{ padding: '7px 0', borderBottom: i < bellSchedule.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, flexShrink: 0 }}></div>
                  <div className="flex-1">
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{b.label}</div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>{b.time}</div>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: '10px 12px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                On Exam Day May 20: Library Seating activities could be given as any study period at any 2 sessions for classrooms periods.
              </div>
            </div>
          </div>

          {/* Today's Uniform */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Today's Uniform</div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Wednesday</span>
            </div>
            <div className="card-body" style={{ padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>Mid-Week Formal Attire</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10 }}>Forest green blazer, formal trousers/navy skirt, white shirt with tie, and polished black shoes. Sports shoes allowed only on sports days.</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 40, height: 50, background: '#166534', borderRadius: 6 }}></div>
                <div style={{ width: 40, height: 50, background: '#1a2e1a', borderRadius: 6 }}></div>
                <div style={{ width: 40, height: 50, background: '#f0f0f0', borderRadius: 6 }}></div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>Next Uniform Change: Thursday (PE backfield)</div>
            </div>
          </div>

          {/* Dean of Studies */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Dean of Studies Office</div>
            </div>
            <div className="card-body" style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
              coord@greenwood.edu →
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Calendar */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>INSTITUTIONAL SCHEDULE</div>
            <div className="card-title">Institutional Academic Calendar (Term II)</div>
            <div className="card-subtitle">Critical class schedules, assessment cycles, and community events for February & March 2025</div>
          </div>
          <div className="flex gap-8">
            <button className="btn btn-secondary btn-xs"><ChevronLeft size={12} /></button>
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>February – March 2025</span>
            <button className="btn btn-secondary btn-xs"><ChevronRight size={12} /></button>
            <button className="btn btn-secondary btn-xs">Month</button>
            <button className="btn btn-secondary btn-xs">Agenda</button>
          </div>
        </div>
        <div className="card-body">
          {/* Legend */}
          <div className="flex gap-12 mb-16 flex-wrap">
            {[
              { color: 'var(--red)', label: '● Exam Cycles & Assessments' },
              { color: '#9ca3af', label: '● School Holidays & Breaks' },
              { color: '#3b82f6', label: '● Sports & Cultural Events' },
              { color: '#ec4899', label: '● PTMs & Council Assemblies' },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-6">
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }}></div>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
              <div key={d} style={{ textAlign: 'center', padding: '6px 0', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>{d}</div>
            ))}
            {/* February calendar days - starting Wed */}
            {[...Array(3)].map((_, i) => <div key={`empty-${i}`} style={{ padding: '6px', minHeight: 48 }}></div>)}
            {[...Array(28)].map((_, i) => {
              const day = i + 1
              const events = calEvents[day]
              const isToday = day === 20
              return (
                <div key={day} style={{ padding: '4px', minHeight: 52, border: '1px solid var(--border-light)', borderRadius: 4, background: isToday ? 'var(--primary-lighter)' : 'white', cursor: 'pointer' }}
                  onMouseEnter={e => { if (!isToday) e.currentTarget.style.background = 'var(--border-light)' }}
                  onMouseLeave={e => { if (!isToday) e.currentTarget.style.background = 'white' }}>
                  <div style={{ fontWeight: isToday ? 800 : 500, fontSize: 12.5, color: isToday ? 'var(--primary)' : 'var(--text-primary)', marginBottom: 4 }}>{day}{isToday ? ' •' : ''}</div>
                  {events && events.map((ev, ei) => (
                    <div key={ei} style={{ fontSize: 9.5, padding: '1px 4px', borderRadius: 3, background: ev.color + '25', color: ev.color, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 1 }}>
                      {ev.label}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, background: 'var(--primary-lighter)' }}>
          <div className="flex items-center gap-8">
            <span style={{ fontSize: 20 }}>📅</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>Always up to date with live feeds.</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Sync automatically to Android, AppStore and Outlook Calendar</div>
            </div>
          </div>
          <div className="flex gap-10">
            <button className="btn btn-secondary btn-sm">Google Calendar Sync</button>
            <button className="btn btn-primary btn-sm">Apple Calendar (iCal)</button>
          </div>
        </div>
      </div>
    </div>
  )
}
