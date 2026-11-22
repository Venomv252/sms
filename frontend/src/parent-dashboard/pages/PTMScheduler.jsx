import React, { useState } from 'react'
import { Calendar, Clock, MapPin, QrCode, Video, Plus } from 'lucide-react'

const facultySlots = [
  { name: 'Dr. Alistair Evans', role: 'Physics & Homeroom Mentor', status: 'Booked', slot: '10:45 AM – 11:00 AM (Joint with Mathematics)', location: 'Science Wing 204', grade: '94%', gradeCode: 'A1', avatar: 'AE', color: 'var(--primary)' },
  { name: 'Mrs. Savita Roy', role: 'Mathematics Faculty', status: 'Booked', slot: '10:45 AM – 11:00 AM', location: 'Science Wing 204', grade: '88%', gradeCode: 'A2', avatar: 'SR', color: '#3b82f6' },
  { name: 'Mr. Tarun Das', slots: 3, status: 'Free', availableSlots: ['11:46 AM', '11:50 AM', '02:00 PM'], location: 'Turing Computing Lab/Main Blocin', grade: '98%', gradeCode: 'A1', role: 'Computer Sciences & Objectives', avatar: 'TD', color: '#8b5cf6' },
  { name: 'Ms. Clare D\'Souza', slots: 2, status: 'Free', availableSlots: ['01:15 PM', '01:45 PM'], location: 'Humanities Hall, Room 102', grade: '91%', gradeCode: 'A1', role: 'English Language & Lit.', avatar: 'CD', color: '#f97316' },
  { name: 'Mr. Anupam Kulkarni', slots: 3, status: 'Free', availableSlots: ['11:45 AM', '12:02 PM', '02:30 PM'], location: 'Social Sciences Wing, Room 109', grade: '86%', gradeCode: 'A2', role: 'Social Sciences & Civics', avatar: 'AK', color: '#ec4899' },
]

const historicalItems = [
  { teacher: 'Mathematics Review – Mrs. Savita Roy', topic: 'Coordinate Geometry & Step-by-Step Proofs', status: 'Resolved', date: 'Conducted: Nov 16, 2024', remark: '"Aarav understands theoretical core principles but skips intermediate calculation steps in Coordinate Geometry, leading to minor deduction in 4-mark questions. Reinforce daily 20-minute structured problem practice."', followUp: 'Completed RG Appraisal Chapter 7 exercises; score improved from 74% to 88% in mid-term tests.' },
  { teacher: 'Physics Review – Dr. Alistair Evans', topic: 'Laboratory Practical Record & Formula Precision', status: 'Tracked', date: '', remark: '', followUp: '' },
  { teacher: 'English Language – Ms. Clare D\'Souza', topic: 'Creative Writing Timing & Reading Journal', status: 'In Progress', date: '', remark: '', followUp: '' },
]

const guidelines = [
  { icon: '⏱', title: '15-Minute Strict Timexboxing', desc: 'To honor fellow families\' schedules, each consultation will begin 12 minutes with a wrapping notification.' },
  { icon: '🅿', title: 'Designated Gate 2 Parking', desc: 'North Car park, open for Parent vehicles. Please display your Greenwood Car Tag or show Fast-Truck Pass Token on entry.' },
  { icon: '👕', title: 'Student Attendance in School Uniform', desc: 'Students are expected to accompany guardians in regular school uniform as active stakeholders.' },
  { icon: '📋', title: 'Pre-Submitted Questions', desc: 'Faculty prior-view points shared 24 hours via the "Add Agenda Points" module above.' },
]

export default function PTMScheduler() {
  const [hybridMode, setHybridMode] = useState(false)

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Exams & Results</a>
        <span>›</span>
        <span>PTM Scheduler</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Parent-Teacher Meeting (PTM) Scheduler & Conference Records</h1>
          <p className="page-subtitle">Schedule 1-on-1 Consultations with subject teachers, review conference agendas, and inspect historical faculty feedback.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm">Window Open: Term II Review</button>
          <button className="btn btn-secondary btn-sm">Protocols</button>
        </div>
      </div>

      {/* Confirmed Session */}
      <div className="card mb-20" style={{ background: 'var(--primary-lighter)', border: '2px solid var(--primary)' }}>
        <div className="card-body" style={{ padding: '20px 24px' }}>
          <div className="flex items-center gap-10 mb-12">
            <span className="tag tag-green">CONFIRMED</span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Term II Mid-Year Evaluation Consultation</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>Booking Ref: #PTM-2025-108-084</span>
          </div>
          <div className="grid grid-2" style={{ gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>SESSION SCHEDULE</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Saturday, March 1, 2025</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--primary)', marginBottom: 12 }}>10:45 AM – 11:00 AM (15 Min Priority Slot)</div>
              <div className="flex items-center gap-8 mb-8">
                <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>Designated Venue: Science Wing, Room 204 2nd Floor; Elevator Bay B</div>
                </div>
              </div>
              <div className="flex items-center gap-8 mb-12">
                <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5 }}>Faculty Attendees: Dr. Alistair Evans & Mrs. Savita Roy</div>
                </div>
              </div>
              <div style={{ padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid var(--border)', marginBottom: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Parent Submitted Agenda Focus</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2 }}>Class 10-B Stream Counseling</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>"Discussing Class 11 stream selection (Physics/Maths/CS track), pre-board scorecard analysis, and upcoming practical laboratory timeline."</div>
              </div>
              <div className="flex gap-10">
                <button className="btn btn-secondary btn-sm"><Clock size={13} /> Reschedule Slot</button>
                <button className="btn btn-secondary btn-sm"><Plus size={13} /> Add Agenda Points</button>
                <button className="btn btn-secondary btn-xs">Download Pass & Calendar</button>
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>FAST-TRACK PASS</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Campus Gate & Room Token</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>TOKEN #24-B</div>
              <div className="qr-placeholder" style={{ width: 100, height: 100 }}>
                <div style={{ textAlign: 'center', fontSize: 10 }}>QR<br/>Code</div>
              </div>
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'white', borderRadius: 8, border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Security Check-In Ready</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Please scan this QR Code to the Science Wing Entry to Enable biometric-kiosk for contact-less attendance stamping.</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Gate 2 (Parent Parking Area)</div>
              </div>
              <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--blue-light)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>Hybrid Google Meet Option</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Switch if traveling or working remotely</div>
                </div>
                <div className={`switch ${hybridMode ? 'on' : ''}`} onClick={() => setHybridMode(!hybridMode)}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Slots */}
      <div className="section-title mb-4">Book Consultations by Subject Faculty</div>
      <div className="section-subtitle">Recommended limit: 3 faculty consultations per session to manage transit time</div>
      <div className="grid grid-3 mb-20">
        {facultySlots.map((faculty, i) => (
          <div key={i} className="card" style={{ borderTop: `3px solid ${faculty.color}` }}>
            <div className="card-body" style={{ padding: '14px' }}>
              <div className="flex items-center gap-10 mb-10">
                <div className="avatar avatar-md" style={{ background: faculty.color, fontSize: 13 }}>{faculty.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{faculty.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{faculty.role}</div>
                </div>
                <span className={`tag ${faculty.status === 'Booked' ? 'tag-green' : 'tag-blue'}`} style={{ fontSize: 10 }}>
                  {faculty.status === 'Booked' ? 'Booked' : `${faculty.slots} Slots Free`}
                </span>
              </div>

              {faculty.status === 'Booked' ? (
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Current Slot: {faculty.slot}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>📍 {faculty.location}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: faculty.color }}>Aarav Grade: {faculty.grade} ({faculty.gradeCode})</div>
                    </div>
                    <button className="btn btn-secondary btn-xs">View Insights</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>Select Preferred Slot:</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
                    {faculty.availableSlots.map((slot, si) => (
                      <button key={si} className="btn btn-secondary btn-xs" style={{ fontSize: 11 }}>{slot}</button>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Venue: {faculty.location}</div>
                  <div className="flex items-center justify-between">
                    <div style={{ fontSize: 13, fontWeight: 700, color: faculty.color }}>Aarav Grade: {faculty.grade} ({faculty.gradeCode})</div>
                    <button className="btn btn-primary btn-xs" style={{ background: faculty.color }}>Book Slot</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Special Session */}
        <div className="card" style={{ background: 'linear-gradient(135deg, #1a7a4a 0%, #1a5c3a 100%)', border: 'none' }}>
          <div className="card-body" style={{ padding: '14px', color: 'white' }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, marginBottom: 8 }}>SPECIAL SESSION</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Career Guidance Counselor</div>
            <div style={{ fontSize: 12.5, opacity: 0.85, marginBottom: 12 }}>Mrs. Neha Khurana • Stream Allocation & Global College Prep Guidance for Grade 10</div>
            <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 12, width: '100%', justifyContent: 'center', marginBottom: 6 }}>Walk-In Info & Roadmap</button>
          </div>
        </div>
      </div>

      <div className="two-col">
        {/* Historical Archive */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>HISTORICAL ARCHIVE</div>
              <div className="card-title">Term I Minutes & Action Log</div>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Conducted: Nov 16, 2024</span>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {historicalItems.map((item, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < historicalItems.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div className="flex items-center justify-between mb-4">
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{item.teacher}</div>
                  <span className={`tag ${item.status === 'Resolved' ? 'tag-green' : item.status === 'Tracked' ? 'tag-blue' : 'tag-orange'}`} style={{ fontSize: 10 }}>{item.status}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>{item.topic}</div>
                {item.remark && (
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontStyle: 'italic', margin: '8px 0', padding: '8px 12px', background: 'var(--border-light)', borderRadius: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>TEACHER RECOMMENDATION</div>
                    {item.remark}
                  </div>
                )}
                {item.followUp && (
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>✓ Parent & Student Follow-up Action: </span>
                    {item.followUp}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Guidelines */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>VISITOR NOTICE</div>
              <div className="card-title">Guidelines & Campus Protocol</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {guidelines.map((g, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < guidelines.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-lighter)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                  {g.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4 }}>{g.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{g.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12.5, color: 'var(--text-secondary)', textAlign: 'center' }}>
              Need help navigating campus? <strong>PTM Helpdesk ↗</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
