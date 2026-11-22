import React, { useState } from 'react'
import { Search, MessageSquare, Download, ExternalLink, ChevronDown, Bell } from 'lucide-react'

const filters = ['All Announcements (16)', 'Academic & Homework (6)', 'Class Tests & Revision (4)', 'Event & Co-curricular (3)', 'Homeroom Urgent']

const streamItems = [
  {
    teacher: 'Mrs. Savita Roy', role: 'Mathematics Faculty • Class 10-B', time: '2h ago',
    tag: 'Academic & Homework', tagDue: 'Due Monday',
    title: 'Trigonometry Formula Sheet & Exemplar Problems for Weekend Practice',
    desc: 'Kindly review the consolidated identity cheat sheet prior to solving exercises from RD Sharma Exemplar Chapter 8, Complete Section B questions (1 to 15) in your homework notebook.',
    attachment: 'Trigonometric_Identities_Summary.pdf', attachSize: 'J. Get',
    footer: 'Submission Portal Open',
    footerAction: 'Mark as Reviewed',
    avatar: 'SR', avatarColor: 'var(--primary)'
  },
  {
    teacher: 'Mr. Rajesh Sen', role: 'Computer Science Faculty', time: '6h ago',
    tag: 'LMS & LMS Update', tagDue: 'On-Session',
    title: 'Python File Handling Practice Set uploaded on Google Drive. Optional doubt session Friday 4 PM',
    desc: 'Module 4 worksheets are live on the GreenoodPortal. A live Google Meet session will take place Friday at 16:00 to solve doubts on CSV reader/writer modules and Exception Blocks.',
    attachment: 'LMS Assignment Link: /py-file-handling-10b',
    footer: 'Meeting link sent to school email',
    footerAction: 'Add to Calendar',
    footerAction2: 'Launch LMS',
    avatar: 'RS', avatarColor: '#3b82f6'
  },
  {
    teacher: 'Coach Rawat', role: 'Head of Physical Education', time: 'Yesterday',
    tag: 'Event & Co-curricular', tagDue: '● Activity Points',
    title: 'Athletic Trials post-lunch this Thursday – Sports kit compulsory',
    desc: 'Trials for 100m, 400m relay, Long Jump and Shot Put will commence at 13:45 on the Main Track. Students must bring school sports uniform and spiked shoes/running shoes.',
    attachment: '📍 Greenwood Athletic Arena',
    footer: 'Class Teacher Notified',
    footerAction: '',
    avatar: 'CR', avatarColor: '#f97316'
  },
  {
    teacher: 'Ms. Clare D\'Souza', role: 'English Language & Literature', time: 'Feb 20',
    tag: 'Oral Assessment', tagDue: '10 Marks ASL Internal',
    title: 'Shakespeare\'s Julius Caesar Act III Scene 2 soliloquy recitation schedule',
    desc: 'Antony\'s Forum Speech recitation evaluation starts next Monday. Roll Numbers 1 to 18 will present during Period 2, and Roll Numbers 19 to 26 during Period 6. Focus on intonation, pace, and vocal projection.',
    attachment: '● Aarav Sharma: Period 6 slot',
    footer: '',
    footerAction: 'View Criteria',
    avatar: 'CD', avatarColor: '#8b5cf6'
  },
]

export default function ClassAnnouncements() {
  const [activeFilter, setActiveFilter] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Communication & Feedback</a>
        <span>›</span>
        <span>Class Announcements & Broadcasts</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <div className="flex items-center gap-10 mb-4">
            <h1 className="page-title">Class Announcements</h1>
            <span className="tag tag-green">Grade 10-B Active Stream</span>
          </div>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><MessageSquare size={14} /> Ask Faculty</button>
          <button className="btn btn-secondary btn-sm">Preferences</button>
        </div>
      </div>

      {/* Pinned Homeroom Notice */}
      <div style={{ background: 'var(--yellow-light)', border: '1.5px solid #fde68a', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
        <div className="flex items-start gap-16">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-8 mb-8">
              <span className="tag tag-yellow" style={{ fontSize: 11 }}>📌 PINNED HOMEROOM NOTICE</span>
              <span className="tag tag-orange" style={{ fontSize: 11 }}>Mandatory Pre-Board Deliverable</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 'auto' }}>Issued Feb 22, 08:30 AM</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
              Grade 10-B: Intensive Science Revision & Lab Records Submission Schedule for Pre-Boards
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginBottom: 14 }}>
              All students must submit their complete Chemistry RecordBooks and Physics Practical Journals for external moderation-sign, All paperwork entries up to Experiment 14 must be countersigned and indexed.
            </div>
            <div className="grid grid-2" style={{ gap: 10, marginBottom: 12 }}>
              {[
                { label: 'CHEMISTRY RECORD SUBMISSION', value: 'Period 3', sub: 'Friday, Feb 28, 2025', sub2: 'Includes Volumetric Analysis & Salt Analysis rubrics (15 Marks).' },
                { label: 'PHYSICS JOURNAL MODERATION', value: 'Period 5', sub: 'Friday, Feb 28, 2025', sub2: '30m λ, Law graph & Focal length determinations verification.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{item.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{item.sub}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.sub2}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '8px 12px', marginBottom: 10 }}>
              <span style={{ fontSize: 14 }}>📎</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Grade10B_Science_PreBoard_Revision_Blueprint.pdf</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>2.2 MB • Marked Formative Study Plan & Board Checklist</span>
              <button className="btn btn-primary btn-xs" style={{ marginLeft: 'auto' }}>Download</button>
            </div>
            <div className="grid grid-2" style={{ gap: 10 }}>
              <div style={{ padding: '8px 12px', background: 'var(--primary-lighter)', borderRadius: 8, fontSize: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--primary)' }}>Student Acknowledged: Aarav Sharma</div>
                <div style={{ color: 'var(--text-muted)' }}>| Feb 12, 10:15 AM|</div>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--orange-light)', borderRadius: 8, fontSize: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--orange)' }}>Parent Countersign Not Required</div>
              </div>
            </div>
          </div>
          <div style={{ width: 160, flexShrink: 0 }}>
            <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', margin: '0 auto 8px' }}>AE</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Dr. Alistair Evans</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 6 }}>Homeroom Board & Faculty Grade 10-B HG Supervisor</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Class Acknowledgement</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', margin: '4px 0' }}>24 / 32 Students</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>62.5% confirmed</div>
              <div style={{ marginTop: 10, padding: '6px 10px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>Homeroom Hours:</div>
                <div style={{ color: 'var(--text-muted)' }}>08:00 – 08:30 AM</div>
                <div style={{ color: 'var(--text-muted)' }}>Room 104, Senior Block</div>
              </div>
              <button className="btn btn-secondary btn-xs" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Message Dr. Evans</button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center justify-between gap-12 mb-16 flex-wrap">
        <div className="chip-tabs scroll-x" style={{ flex: 1 }}>
          {filters.map((f, i) => (
            <span key={i} className={`chip-tab ${activeFilter === i ? 'active' : ''}`} onClick={() => setActiveFilter(i)} style={{ fontSize: 12, whiteSpace: 'nowrap' }}>{f}</span>
          ))}
        </div>
        <div className="flex items-center gap-10">
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="form-input" style={{ paddingLeft: 32, minWidth: 200 }} placeholder="Search circulars, subject topics..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>SORT:</span>
          <select className="form-input" style={{ width: 'auto' }}>
            <option>Most Recent</option>
            <option>Oldest First</option>
            <option>By Subject</option>
          </select>
        </div>
      </div>

      <div className="two-col">
        {/* Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>Subject Faculty Stream <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>FILTERED: SHOWING 4 OF 14</span></div>
          {streamItems.map((item, i) => (
            <div key={i} className="card" style={{ border: '1.5px solid var(--border)' }}>
              <div className="card-body" style={{ padding: '16px' }}>
                <div className="flex items-start gap-12">
                  <div className="avatar avatar-md" style={{ background: item.avatarColor }}>{item.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{item.teacher}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>{item.role}</span>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-8 mb-8">
                      <span className="tag tag-blue" style={{ fontSize: 10 }}>{item.tag}</span>
                      <span className="tag tag-orange" style={{ fontSize: 10 }}>{item.tagDue}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>{item.desc}</div>
                    {item.attachment && (
                      <div style={{ padding: '8px 12px', background: 'var(--border-light)', borderRadius: 8, fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 10 }}>
                        📎 {item.attachment}
                      </div>
                    )}
                    <div className="flex items-center gap-10">
                      {item.footer && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>✓ {item.footer}</span>}
                      {item.footerAction && <button className="btn btn-secondary btn-xs">{item.footerAction}</button>}
                      {item.footerAction2 && <button className="btn btn-primary btn-xs">{item.footerAction2}</button>}
                      {item.avatar === 'SR' && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>● Aarav Sharma: Period 6 slot</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Ask Teacher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">■ Direct Ask-Teacher Quick Inquiry</div>
                <div className="card-subtitle">Send a quick clarification to the subject teacher. Answers are discussed during morning homeroom or delivered via a portal memo.</div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Response expected by next Homeroom</span>
            </div>
            <div className="card-body" style={{ padding: '16px' }}>
              <div className="form-group">
                <label className="form-label">Select Faculty Member</label>
                <select className="form-input">
                  <option>Dr. Alistair Evans (Homeroom / Scienc...)</option>
                  <option>Mrs. Savita Roy (Mathematics)</option>
                  <option>Mr. Rajesh Sen (Computer Science)</option>
                </select>
              </div>
              <div className="grid grid-2 mb-12" style={{ gap: 12 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Inquiry Category</label>
                  <select className="form-input">
                    <option>Curriculum / Assignment Clarification</option>
                    <option>Exam Query</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Priority Flag</label>
                  <div className="flex gap-10 mt-6">
                    <label className="flex items-center gap-6" style={{ cursor: 'pointer', fontSize: 13 }}>
                      <input type="radio" name="priority" defaultChecked /> Normal
                    </label>
                    <label className="flex items-center gap-6" style={{ cursor: 'pointer', fontSize: 13, color: 'var(--orange)' }}>
                      <input type="radio" name="priority" /> ⏱ Time Sensitive
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">YOUR INQUIRY</label>
                <textarea className="form-input" rows={4} placeholder="Type your brief question here (e.g., 'Regarding Chapter 8 Exemplar question 12, can Aarav use the alternative identity derivation?')" style={{ resize: 'vertical' }}></textarea>
              </div>
              <div className="flex gap-10">
                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Clear</button>
                <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Submit Inquiry</button>
              </div>
            </div>
            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
              Logged from Rajesh Sharma (Guardian ID: GR-43PO2) • Linked student Aarav Sharma (10-B)
            </div>
          </div>

          {/* Notification Preferences */}
          <div style={{ background: 'var(--border-light)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Broadcast & Circular Notification Preferences</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Recent WhatsApp starts & post/digital entries are actives for Aarav's guardians</div>
            </div>
            <button className="btn btn-secondary btn-sm"><Bell size={14} /> Manage Delivery Channels</button>
          </div>
        </div>
      </div>
    </div>
  )
}
