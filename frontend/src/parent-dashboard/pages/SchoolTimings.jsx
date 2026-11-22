import React from 'react'
import { Download, Clock, Shield, AlertTriangle, CheckCircle, Phone } from 'lucide-react'

const schedule = [
  { time: '06:00 AM – 08:00 AM', event: 'Campus Gate Open & Arrival', detail: 'Students arriving on campus. Reporting required by 08:00 AM.', isHighlight: false, color: 'var(--primary)' },
  { time: '07:00 AM • 08:30 AM', event: 'Gate Closure Cutoff & Security', detail: '● Critical! Students arriving after 08:30 AM may risk a Late Slip. More than 3 late entries trigger parent notification.', isHighlight: true, color: 'var(--red)' },
  { time: '08:00 AM – 08:30 AM', event: 'Morning Assembly & Homeroom Roll', detail: 'All students report to Homeroom for attendance, announcements & flag ceremony.', isHighlight: false, color: '#3b82f6' },
  { time: '09:00 AM – 10:30 AM', event: 'Morning Academic Block (Periods 1–2)', detail: 'Core subject periods begin. Classroom entry strictly after bell.', isHighlight: false, color: '#22c55e' },
  { time: '10:45 AM – 11:35 AM', event: 'Period 3 & 4 – STEM & Computer Science Labs', detail: 'Lab Policy: Students must wear compliant lab attire; no food or beverages inside.', isHighlight: false, color: '#8b5cf6' },
  { time: '12:00 PM – 01:30 PM (60 mins)', event: 'Lunch Break & Club Meetings', detail: 'Cafeteria open. student representatives may hold brief team briefings.', isHighlight: false, color: '#f97316' },
  { time: '01:30 PM – 04:10 PM', event: 'Periods 5 & 6: Regional Economics & Modern Languages', detail: 'Afternoon academic block. Assessment activities may be scheduled during this window.', isHighlight: false, color: 'var(--primary)' },
  { time: '04:10 PM – 05:10 PM', event: 'Sports & Extra-Curricular Activities', detail: 'Athletics, clubs, and school activities. Sports kit mandatory.', isHighlight: true, color: '#ec4899' },
  { time: '05:30 PM', event: 'Final Bell & Transport Dispatch', detail: 'Bus Route 14: Departs 05:30 PM sharp from Oakwood Enclave Gate 1.', isHighlight: false, color: 'var(--primary)' },
]

const uniforms = [
  { day: 'Mon & Tue', type: 'Formal Winter Uniform', color: '#1a4731', items: ['Class 10-B Specific', 'CSRE logo emblem on blazer', 'Dark trousers/navy pleated skirt', 'Polished black shoes', 'Club participation badge'], active: false },
  { day: 'Wednesday', type: 'Sports Uniform', items: ['Prescribed sports t-shirt', 'Athletic trousers/track pants', 'school badge & SUL cap', 'Sport shoes only', 'Communication uniform accredited'], active: true, isToday: true },
  { day: 'Thursday', type: 'Regular Day Uniform', items: ['Standard white shirt', 'Plain navy trousers/skirt', 'Tie Compulsory (3B model)', 'Standard school shoes', 'Optional uniform accessory'], active: false },
  { day: 'Fri & Sat', type: 'Club & Activity Casual', items: ['Activity t-shirts allowed', 'Comfortable track bottoms', 'Club-specific lanyards', 'Closed-toe shoes only'], active: false },
]

const conductProtocols = [
  { title: 'Student Uniform Policy & Fine Details', sub: 'Extra Call', desc: 'Any student arriving on campus past 08:00 AM will trigger an official CSRE-0210 Missed Registration Report. More than 3 such incidents in an academic term results in academic record annotation and parent-meeting mandate.', tag: 'tag-orange', tagLabel: 'Extra Call' },
  { title: 'Campus Boundary Regulation (Level: Institutional)', sub: 'Security Level', desc: 'Students are restricted from leaving the campus boundary at any time during the school session (08:00 AM – 03:00 PM) without a guardian-verified exit pass issued by the school security office.', tag: 'tag-red', tagLabel: 'Security Level' },
  { title: 'Student Identification & Fast-Track Gift ID Process', sub: '', desc: 'Students ID card must be worn at all times inside the campus perimeter per School Regulation 5.3. Lost cards report to Branch 3.', tag: null },
  { title: 'Digital Gate Exit Delay Workflow', sub: 'Primary Process', desc: "This is activated automatically when significant time delays are observed. For any non-routine emergency early departures, a guardian is expected to:\n1. Log in using the Parent Portal ID.\n2. Submit an Emergency Exit Request to the Homeroom Teacher.\n3. Take the student's exit through Gate 2 (Visitor Area).", tag: 'tag-blue', tagLabel: 'Primary Process' },
]

export default function SchoolTimings() {
  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Overview</a>
        <span>›</span>
        <span>School Timings & Uniform Charter</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Campus Timings, Uniform Schedule & Conduct Charter</h1>
          <p className="page-subtitle">Official daily schedule for campus, mandatory uniform timings and regulations, and conduct policy for Greenwood High Secondary School students. Applies to Grade 10-B and all secondary sections.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Student Handbook (PDF)</button>
          <button className="btn btn-primary btn-sm">Uniform Vendor Outlets</button>
        </div>
      </div>

      {/* Academic Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a5c3a 100%)', borderRadius: 12, padding: '14px 20px', marginBottom: 20 }}>
        <div className="flex items-center justify-between flex-wrap gap-12">
          <div style={{ color: 'white' }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, marginBottom: 2 }}>● NEXT SCHEDULE CHANGE: March 1 to March 4</div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>Today is Wednesday — Regular Academic Schedule with Sports Period</div>
            <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 4 }}>Gate entry timed at 08:00 AM sharp. All new final schedule from 9:00 AM. Morning announcements at 08:05 AM from gate status_admin..</div>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, color: 'white', flexShrink: 0 }}>Current Phase: Academic Week 1</span>
        </div>
      </div>

      <div className="two-col mb-20">
        {/* Daily Bell Schedule */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Daily Bell Schedule & Academic Milestones</div>
            </div>
            <span className="tag tag-green" style={{ fontSize: 11 }}>● AY/2024-2025</span>
          </div>
          <div className="card-body" style={{ padding: '12px 0' }}>
            {schedule.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 20px', background: s.isHighlight ? (s.color === 'var(--red)' ? 'var(--red-light)' : 'var(--accent-light)') : 'white', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ width: 4, borderRadius: 2, background: s.color, flexShrink: 0 }}></div>
                <div style={{ minWidth: 140, flexShrink: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: s.color }}>{s.time}</div>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{s.event}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 2 }}>{s.detail}</div>
                  {s.isHighlight && <span className={`tag ${s.color === 'var(--red)' ? 'tag-red' : 'tag-green'}`} style={{ fontSize: 10, marginTop: 4, display: 'inline-block' }}>
                    {s.color === 'var(--red)' ? '⚠ Critical Timing' : '● Start of Class Period'}
                  </span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Student Today Card */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Aarav Sharma</div>
              <span className="tag tag-green" style={{ fontSize: 10 }}>● Live Day Status</span>
            </div>
            <div className="card-body" style={{ padding: '14px 16px' }}>
              {[
                { label: 'Today\'s Status', value: 'Present ●', color: 'var(--primary)' },
                { label: 'Today in Class', value: 'Period 4, Computer Science', color: 'var(--text-primary)' },
                { label: 'Live Location', value: 'Wing 204 • Turing IT Lab', color: 'var(--blue)' },
                { label: 'Gate Entry', value: '07:54 AM • Main Gate 2', color: 'var(--text-secondary)' },
                { label: 'Bus Punctuality', value: '● On Time Today', color: 'var(--primary)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Operational Hours */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Campus Operational Hours</div>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {[
                { label: 'Campus Clinic', value: '07:45 AM – 04:30 PM' },
                { label: 'Campus Gate Open', value: '06:30 AM – 08:00 PM' },
                { label: 'Library Hours', value: '08:00 AM – 05:00 PM' },
                { label: 'Final Departure', value: '05:30 PM' },
              ].map((o, i) => (
                <div key={i} className="flex items-center justify-between" style={{ padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none' }}>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{o.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{o.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Uniform Schedule */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>DRESS CODE CALENDAR</div>
            <div className="card-title">Weekly Uniform Dress Code Schedule</div>
            <div className="card-subtitle">Secondary School Plan 101 on even day with date schedule</div>
          </div>
          <span className="tag tag-green" style={{ fontSize: 10 }}>● Checked to follow the School Grooming Mandatory</span>
        </div>
        <div className="card-body">
          <div className="grid grid-4" style={{ gap: 16 }}>
            {uniforms.map((u, i) => (
              <div key={i} style={{ border: u.isToday ? '2px solid var(--primary)' : '1.5px solid var(--border)', borderRadius: 10, padding: 14, background: u.isToday ? 'var(--primary-lighter)' : 'white', position: 'relative' }}>
                {u.isToday && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: '0 0 8px 8px' }}>TODAY'S</div>}
                <div style={{ display: 'flex', gap: 6, marginBottom: 8, marginTop: u.isToday ? 10 : 0 }}>
                  <div style={{ width: 32, height: 40, background: u.color || '#1a4731', borderRadius: 4 }}></div>
                  <div style={{ width: 32, height: 40, background: '#2d2d2d', borderRadius: 4 }}></div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{u.day}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 8 }}>{u.type}</div>
                {u.items.map((item, ii) => (
                  <div key={ii} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 3, display: 'flex', gap: 6 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conduct Protocols */}
      <div className="grid grid-2 mb-20">
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CAMPUS GATE SECURITY & CONDUCT PROTOCOLS</div>
              <div className="card-title">Campus Gate Security & Conduct Protocols</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {conductProtocols.slice(0, 2).map((p, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div className="flex items-center gap-8 mb-4">
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{p.title}</div>
                  {p.tag && <span className={`tag ${p.tag}`} style={{ fontSize: 10 }}>{p.tagLabel}</span>}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.desc}</div>
                <button className="btn btn-secondary btn-xs" style={{ marginTop: 8 }}>View to Report Station →</button>
                <button className="btn btn-secondary btn-xs" style={{ marginLeft: 8 }}>View the Security Advance</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Authorized Uniform Outlets</div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {[
              { name: 'Institutional School & Uniform Co.', location: 'Whitefield, Bengaluru', discount: '10% Discount', phone: 'Mon-Fri 09:00 AM – 09:00 PM' },
              { name: 'Learners Wear & Grooming Co.', location: 'Near Greenwood High', discount: '15% Off', phone: '' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i === 0 ? '1px solid var(--border-light)' : 'none' }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginBottom: 4 }}>{s.location}</div>
                <div className="flex gap-8">
                  <span className="tag tag-green" style={{ fontSize: 10 }}>{s.discount}</span>
                  {s.phone && <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{s.phone}</span>}
                </div>
              </div>
            ))}
            <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Book Appointment at Uniform Outlet</button>
          </div>
        </div>
      </div>

      {/* Protocol footer */}
      {conductProtocols.slice(2).map((p, i) => (
        <div key={i} className="card mb-14">
          <div className="card-body" style={{ padding: '16px 20px' }}>
            <div className="flex items-start justify-between">
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-8 mb-4">
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.title}</div>
                  {p.tag && <span className={`tag ${p.tag}`} style={{ fontSize: 10 }}>{p.tagLabel}</span>}
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{p.desc}</div>
              </div>
            </div>
            {i === 1 && (
              <div style={{ marginTop: 12 }}>
                <button className="btn btn-primary btn-sm">Submit a Safety Gate Pass Request For An Early</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
