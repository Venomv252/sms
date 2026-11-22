export default function TimetableProxy() {
  const examMatrix = [
    { sub: 'Physics Theory', code: '04-2', date: 'Mon Feb 24, 2025', candidates: 230, halls: 'Halls H0-14 Srinivasa Block', facReq: '16 Faculty Compliant', status: 'Practise Venue Verified' },
    { sub: 'Mathematics Standard', code: '041', date: 'Mon March 1, 2025', candidates: 420, halls: 'Halls H0-5 Control Complex-Range', facReq: '18 Faculty Compliant', status: 'Practise Venue Verified' },
    { sub: 'Chemistry Theory', code: '043', date: 'Mon March 7, 2025', candidates: 210, halls: 'Halls H0-5 Entire Senior Block', facReq: '12 Faculty Compliant', status: 'Practise Venue Verified' },
    { sub: 'English Core', code: '301', date: 'Mon March 17, 2025', candidates: 448, halls: 'Halls H0-6 Contains Venue Block', facReq: '14 Faculty (13 +1 extra)', status: 'Venue & Seating Audit' },
  ]

  const periods = [
    { time: '09:30–10:30', subject: 'Physics', code: 'PHY-302', teacher: 'Dr. A. Bharadwaj', status: 'Completed', sC: 'green' },
    { time: '10:30–11:30', subject: 'Mathematics', code: 'MAT-307', teacher: 'Mrs. B. Srivastava', status: 'Completed', sC: 'green' },
    { time: '11:30–11:45', subject: 'English Core', code: 'ENG-301', teacher: 'Mr. T. Nandini', status: 'Active 🔴', sC: 'red' },
    { time: '11:45–12:30', subject: 'Biology Lab', code: 'BIO-315', teacher: 'Dr. M. Savitha', status: 'Upcoming', sC: 'orange' },
    { time: '12:30–01:30', subject: 'Chemistry Practical', code: 'CHE-313', teacher: 'Dr. A. Nair', status: 'Upcoming', sC: 'orange' },
    { time: '02:00–03:00', subject: 'Robotics & AI', code: 'CS-417', teacher: 'Dr. K. Mira Rao/Wright', status: 'Not Yet', sC: 'gray' },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>CBSE Center: #4492</span>
        <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>FACTUAL ON CRITERION ENGINE</span>
        <span style={{ color: 'var(--gray-500)' }}>AI 2024–25, 1st TERM II</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Master Timetable, Venue Logistics & Autonomous Proxy Command</h1>
              <p className="page-title-sub">Real-time algorithm-driven timetable automation, autonomous faculty substitution decision, and critical allocation management by the Office of the Principal</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">Now Resolve</button>
              <button className="btn btn-orange">⚡ Trigger Proxy Engine</button>
              <button className="btn btn-outline">📋 Publish Board Metrics</button>
              <button className="btn btn-green">🔒 Reserve Venues</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Institutional Load</div>
            <div className="stat-value">1,420<span style={{ fontSize: 14, fontWeight: 400 }}>/1,120</span></div>
            <div className="stat-badge stat-badge-green">105% Grade (Pde-Off: 96% +</div>
            <div className="stat-sub">6 Substitution Halls + 6 by</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Autonomous Proxies</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>8<span style={{ fontSize: 14 }}> Today</span></div>
            <div className="stat-badge stat-badge-green">Deployed</div>
            <div className="stat-sub">0 Unmanaged Halls + 0 by Scheduling</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Venue Logistics Load</div>
            <div className="stat-value">88.5%<span style={{ fontSize: 14, fontWeight: 400 }}> Peak</span></div>
            <div className="stat-badge stat-badge-orange">Auditorium, 6 Science Labs, ST...</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">CBSE Board Readiness</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>100%</div>
            <div className="stat-badge stat-badge-green">Confirmed</div>
            <div className="stat-sub">≥450 Candidates + 32 More Halls</div>
          </div>
        </div>

        <div className="grid-2">
          <div>
            {/* Live Class Timetable */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <span className="dot dot-green live-dot"></span>
                    Live Class Timetable Stream
                  </div>
                  <div className="card-subtitle">Displaying an active class schedule, advanced boarding and real-time class progress for Wing.</div>
                </div>
                <div className="flex gap-1">
                  {['Grade 10+8', 'Grade 11', 'Grade 12 Science', 'Grade 9+A'].map((g, i) => (
                    <button key={i} className={`btn btn-xs ${i === 0 ? 'btn-green' : 'btn-ghost'}`}>{g}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10, padding: '8px 10px', background: 'var(--gray-50)', borderRadius: 8, fontSize: 11 }}>
                <strong>Section B (Secondary Wing)</strong> — Class Monitor: Ms. Radhika Krishnan on Recall, 010 (Blackboard Track) is open.
                <br /><span style={{ color: 'var(--gray-400)' }}>Current Period is (11:45 AM)</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Subject</th>
                      <th>Code</th>
                      <th>Teacher</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {periods.map((p, i) => (
                      <tr key={i} style={{ background: p.sC === 'red' ? 'var(--red-light)' : 'transparent' }}>
                        <td style={{ fontSize: 11, fontWeight: 600 }}>{p.time}</td>
                        <td style={{ fontWeight: 600, fontSize: 12 }}>{p.subject}</td>
                        <td style={{ fontSize: 11, color: 'var(--gray-500)' }}>{p.code}</td>
                        <td style={{ fontSize: 11 }}>{p.teacher}</td>
                        <td>
                          <span className={`badge ${p.sC === 'green' ? 'badge-green' : p.sC === 'red' ? 'badge-red' : p.sC === 'orange' ? 'badge-orange' : 'badge-gray'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Engine */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Autonomous AI Proxy Engine</div>
                <div className="flex gap-2">
                  <span className="badge badge-orange">Auto-Fulfilled: 3</span>
                  <span className="badge badge-gray">3 AI Assessed</span>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { cls: 'Bio Lab • Grade 10-B', period: 'Period II (Resumed)', absent: 'Mrs. K. & S. (Maternity Emergency)', proxy: 'Mr. A. Bio', status: 'Lesson Plan Loaded', sC: 'green' },
                { cls: 'Mathematics • Grade 12-Sci', period: 'Period II (Resumed)', absent: 'Mr. A. (Sharma Diploma Emergency)', proxy: 'Mrs. Priya A. Dev', status: 'Assessment Launched', sC: 'blue' },
                { cls: 'Economics • Grade 11-Com', period: 'Period II (Resumed)', absent: 'Mrs. E. Needs (National Export)', proxy: 'Mr. T. Nandini', status: '3 Mins In Dev', sC: 'orange', action: 'View All Proxy Logic' },
                { cls: 'Social Sciences • Grade 9-C', period: 'Period II (Resumed)', absent: 'Mr. Mr. T. Surati (Staff Development →)', proxy: 'Ms. T. Curson', status: 'LMS In Dev', sC: 'orange' },
              ].map((a, i) => (
                <div key={i} style={{ padding: '8px 10px', border: '1px solid var(--gray-200)', borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${a.sC === 'green' ? 'var(--green)' : a.sC === 'blue' ? 'var(--blue)' : 'var(--orange)'}` }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span style={{ fontWeight: 700, fontSize: 12 }}>{a.cls}</span>
                    <span className={`badge ${a.sC === 'green' ? 'badge-green' : a.sC === 'blue' ? 'badge-blue' : 'badge-orange'}`}>{a.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>Absent: {a.absent} → <span style={{ fontWeight: 600, color: 'var(--green-dark)' }}>{a.proxy}</span></div>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm w-full mt-2">View All 11 Proxy Logic</button>
              </div>
            </div>
          </div>

          <div>
            {/* Executive Venue Allocations */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Executive Venue Allocations</div>
                <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>Today</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { venue: 'Main School Auditorium', cap: 'Capacity 760 Seats Available', time: '02:20 PM – 5:00 PM', event: 'Grade 10 Annual Day Rehearsal: Captured choreography, lighting grade-boosting superseded by Dance of Arms', sC: 'blue' },
                { venue: 'STEM & Robotics Arena', cap: '070 Cadres + 10', time: '03:00 PM – 5:30 PM', event: 'Regional Inter-School Hackathon Prep: Autonomous proxy team of 5, Emergency AI due logging.', sC: 'green' },
                { venue: 'Olympic Oval Track', cap: 'Distance/Lane Controls Limits', time: '04:00 PM – 06:30 PM', event: 'Discus Junior-Olympics: State meet qualifications, digital option timing gear setup.', sC: 'teal' },
                { venue: 'Athletic Filed Clinics', cap: 'State meet', time: '04:00 PM – 06:30 PM', event: 'Athletics qualification & timings.', sC: 'orange' },
              ].map((v, i) => (
                <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: 10, marginBottom: 8, borderLeft: `3px solid ${v.sC === 'blue' ? 'var(--blue)' : v.sC === 'green' ? 'var(--green)' : v.sC === 'teal' ? 'var(--teal)' : 'var(--orange)'}` }}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{v.venue}</div>
                    <span style={{ fontSize: 10, color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>{v.time}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>{v.cap}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-700)' }}>{v.event}</div>
                </div>
              ))}
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 4 }}>6 more blocks for 2 blocks and 5 AI events 3 proxy assignment under follow up</div>
              <button className="btn btn-ghost btn-sm w-full mt-2">Manage Status of 3 Shares</button>
              </div>
            </div>

            {/* CBSE Exam Matrix */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Upcoming CBSE Examination Matrix & Seating Roster</div>
                  <div className="card-subtitle">Center Post Programme Protocols, CCTv, waitlists align, and Strict GSE Number Decisions</div>
                </div>
                <div className="flex gap-2">
                  <span className="badge badge-blue">Seating Directly: 54-Seat Plot</span>
                  <button className="btn btn-ghost btn-sm">Download Form 9A</button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Examination Paper</th>
                      <th>Paper Code</th>
                      <th>Date & Time</th>
                      <th>Registered Candidates</th>
                      <th>Halls Allocated</th>
                      <th>Invigilators</th>
                      <th>Moderation Sign-Off</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examMatrix.map((e, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, fontSize: 12 }}>{e.sub}</td>
                        <td style={{ fontSize: 11, color: 'var(--gray-500)' }}>{e.code}</td>
                        <td style={{ fontSize: 11 }}>{e.date}</td>
                        <td style={{ fontWeight: 700, textAlign: 'center' }}>{e.candidates}</td>
                        <td style={{ fontSize: 11 }}>{e.halls}</td>
                        <td style={{ fontSize: 11 }}>{e.facReq}</td>
                        <td>
                          <span className={`badge ${i < 3 ? 'badge-green' : 'badge-orange'}`}>{e.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 8 }}>
                📡 CBSE Satellite Protocol: This digital optical devices synchronized with CBSE Observer Centre. Data auto-synced at regular intervals.
                <button className="btn btn-green btn-xs" style={{ marginLeft: 8 }}>Verify All ✓</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
