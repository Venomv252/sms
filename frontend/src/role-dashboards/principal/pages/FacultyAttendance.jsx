export default function FacultyAttendance() {
  const departments = [
    { name: 'Science & Research', sub: 'Physics, Chemistry, Biology', total: 22, present: 21, pct: 95.5, buffer: '6 (7 pools free)', avg: '25.6 / 26', health: 'Optimal', hc: 'green' },
    { name: 'Mathematics', sub: 'Core, Applied, Olympiad Club', total: 24, present: 23, pct: 95.8, buffer: '4 (2 contacts free)', avg: '25.1 / 26', health: 'Near Peak', hc: 'orange' },
    { name: 'Languages & Literature', sub: 'English, Hindi, Spanish, French', total: 26, present: 26, pct: 100, buffer: '8 (High serve capacity)', avg: '22.4 / 26', health: 'Optimal', hc: 'green' },
    { name: 'Humanities & Social Sci', sub: 'History, Pol Sci, Geography, Psych', total: 20, present: 19, pct: 95.5, buffer: '3 (Moderate buffer)', avg: '24.5 / 26', health: 'Optimal', hc: 'green' },
    { name: 'Commerce & Economics', sub: 'Acc. Enterpris, B.M, Paneconomics', total: 16, present: 16, pct: 100, buffer: '5 (Good flexibility)', avg: '23.1 / 26', health: 'Optimal', hc: 'green' },
    { name: 'Physical Education', sub: 'Track, Swimming, Field Sports', total: 12, present: 12, pct: 100, buffer: '4 (Available for cover)', avg: '31.0 / 26', health: 'Healthy', hc: 'blue' },
    { name: 'Visual & Performing Arts', sub: 'Painting, Sculpture, Orchestra', total: 10, present: 10, pct: 100, buffer: '2 (Elective coverage)', avg: '20.5 / 26', health: 'Healthy', hc: 'blue' },
  ]

  const proxies = [
    {
      period: 'P 04 | 10:45', grade: 'Class XII-A • Advanced Physics', room: 'Room 304 (Einstein Wing)',
      absent: 'Dr. N. Roy (ICBSE.Uni)', proxy: 'Ms. Arpita Sen (Vacant P4, Physics)', status: 'In-Classroom Verified',
      extra: 'Assigned Location: Chem Lab Set • Physical Biometric verification completed at 10:44 PM', c: 'green'
    },
    {
      period: 'P 04 | 10:55', grade: 'Class IX-C • Social Science', room: 'Room 117 (Tagore Hall)',
      absent: 'Mr. D. Sen (Robotics Lesson)', proxy: 'Ms. Kavita Menon (Dept Buffer)', status: 'Verified on SmartBoard',
      extra: 'Ch 7 Civics Quiz — Peer Mediation Active', c: 'green'
    },
    {
      period: 'P 05 | 11:50', grade: 'Class XI-B • Pure Mathematics', room: 'Ramanuj Lair II',
      absent: 'Mrs. A. Ray (Medical)', proxy: 'Mr. Tarun Desai (Calculus/Calc Sub)', status: 'Upcoming (8 mins)',
      extra: 'SMS Notified 07:53 AM', c: 'orange', action: 'Reassign'
    },
    {
      period: 'P 05 | 11:51', grade: 'Class X-D • Chemistry Practical Lab', room: 'Chem Lab 2',
      absent: 'Dr. N. Roy →', proxy: 'Lab Asst. Rajeshwar + Dr. Paul', status: 'Upcoming (After Lunch)',
      extra: 'Salt Analysis Kit Ready', c: 'blue', action: 'Reassign'
    },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>🔵 BIOMETRIC SYNC ACTIVE • DR.09 AM LOCK</span>
        <span style={{ color: 'var(--gray-500)' }}>ACADEMIC MONITORING</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Faculty Presence, Substitution & Academic Load</h1>
              <p className="page-title-sub">Real-time staff deployment telemetry, automated proxy assignment engine, and institutional workload distribution for Dr. Eleanor Varce's oversight</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">📋 Biometric Sync Log</button>
              <button className="btn btn-outline">📤 Export Ledger</button>
              <button className="btn btn-green">🚀 Deploy Emergency Proxy</button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Faculty Campus Presence</div>
            <div className="stat-value">139<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--gray-500)' }}>/142</span></div>
            <div className="stat-badge stat-badge-green">97.9% campus attendance</div>
            <div className="stat-sub">Duty-Sanctioned: 2 On Sanctioned</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Autonomous Substitutions</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>8<span style={{ fontSize: 16, fontWeight: 400 }}>/8</span></div>
            <div className="stat-badge stat-badge-green">100% Covered</div>
            <div className="stat-sub">0 Unclassified rooms</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Weekly Load</div>
            <div className="stat-value">24.2<span style={{ fontSize: 16, fontWeight: 400, color: 'var(--gray-500)' }}> p/wk</span></div>
            <div className="stat-badge stat-badge-blue">CBSE Optimal Zone (22-27)</div>
            <div className="stat-sub">0 Overloaded</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">First-Bell Functionality</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>99.3%</div>
            <div className="stat-badge stat-badge-green">138 checked-in</div>
            <div className="stat-sub">1 force recorded at 07:55 AM</div>
          </div>
        </div>

        <div className="grid-2">
          <div>
            {/* Proxy Substitution Radar */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <span className="dot dot-green live-dot"></span>
                    Autonomous Proxy Substitution Radar
                  </div>
                  <div className="card-subtitle">Auto-matched via autonomous AI Averies, timetable availability, and biometric sensor synchronization</div>
                </div>
                <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                  <span className="badge badge-orange">Today (9)</span>
                  <span className="badge badge-gray">Tomorrow (2)</span>
                  <span className="badge badge-gray">Audit History</span>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {proxies.map((p, i) => (
                <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 10, padding: 12, marginBottom: 10, borderLeft: `3px solid ${p.c === 'green' ? 'var(--green)' : p.c === 'orange' ? 'var(--orange)' : 'var(--blue)'}` }}>
                  <div className="flex items-start gap-2 mb-2">
                    <span style={{ background: p.c === 'green' ? 'var(--green)' : p.c === 'orange' ? 'var(--orange)' : 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, flexShrink: 0 }}>{p.period}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{p.grade}</div>
                      {p.room && <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{p.room}</div>}
                    </div>
                    <span className={`badge ${p.c === 'green' ? 'badge-green' : p.c === 'orange' ? 'badge-orange' : 'badge-blue'}`}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 6 }}>
                    Absent: <strong>{p.absent}</strong> → Proxy: <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>{p.proxy}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6 }}>{p.extra}</div>
                  {p.action && (
                    <button className="btn btn-outline btn-sm">{p.action}</button>
                  )}
                </div>
              ))}
              <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-500)', marginTop: 4, padding: 8, background: 'var(--green-light)', borderRadius: 8 }}>
                ✅ Periods 1–3 and 5 substitutions completed successfully without discrepancy
                <button className="btn btn-ghost btn-xs" style={{ marginLeft: 8 }}>View morning log</button>
              </div>
              </div>
            </div>
          </div>

          <div>
            {/* Sanctions Awaiting Seal */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Sanctions Awaiting Seal</div>
                <span className="badge badge-red">1 Principal's executive approval queue</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                {
                  init: 'NR', name: 'Dr. Nandita Roy', role: 'PGT Physics + Senior', status: 'On Duty',
                  purpose: 'Appointed State Science Olympiad Chief Jury panelist at IIT Delhi',
                  date: 'Date Oct 28 – 2X12 | All 6 Proxies Pushed', bg: 'var(--green)',
                },
                {
                  init: 'RS', name: 'Mr. Rajesh Sen', role: 'TGT Computer Science & AI', status: 'Escort Duty',
                  purpose: 'Escorting A Greenwood High Finalist to the CBSE AI Robotics Hackathon',
                  date: 'Date: Today 1 Day | Labor Session Needed', bg: 'var(--blue)',
                },
                {
                  init: 'SM', name: 'Mrs. Sunita Rao', role: 'HOD Mathematics', status: 'Medical',
                  purpose: 'Sudden viral fever and ENT consultation. Medical certificate uploaded.',
                  date: 'Date Oct 28 | Dr. Diogo substitute | Sanction Medical', bg: 'var(--red)',
                },
              ].map((s, i) => (
                <div key={i} className="sanction-item mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="avatar" style={{ background: s.bg, color: '#fff', width: 36, height: 36 }}>{s.init}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{s.role}</div>
                    </div>
                    <span className={`badge ${s.status === 'On Duty' ? 'badge-green' : s.status === 'Escort Duty' ? 'badge-blue' : 'badge-red'}`}>{s.status}</span>
                  </div>
                  <div style={{ fontSize: 11, marginBottom: 6 }}>
                    <strong>Purpose:</strong> {s.purpose}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 8 }}>{s.date}</div>
                  <div className="flex gap-2">
                    <button className="btn btn-green btn-sm">Approve & Seal</button>
                    <button className="btn btn-outline btn-sm">Review</button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department-wise Faculty Capacity */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Department-wise Faculty Capacity & Academic Pulse</div>
              <div className="card-subtitle">Real-time actual distribution capacity and weekly period actual location timetable viz</div>
            </div>
            <select className="btn btn-outline btn-sm" style={{ paddingRight: 8 }}>
              <option>Buffer Capacity (Highest) ↓</option>
              <option>Attendance %</option>
              <option>Weekly Load</option>
            </select>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Academic Department</th>
                  <th>Total Faculty</th>
                  <th>Present Today</th>
                  <th>Attendance Rate</th>
                  <th>Proxy Buffer (Available)</th>
                  <th>Avg Weekly Load</th>
                  <th>Workload Health</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{d.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{d.sub}</div>
                    </td>
                    <td style={{ fontWeight: 700, textAlign: 'center' }}>{d.total}</td>
                    <td style={{ fontWeight: 700, textAlign: 'center' }}>{d.present}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress" style={{ flex: 1, minWidth: 60 }}>
                          <div className="progress-bar progress-green" style={{ width: `${d.pct}%` }}></div>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 12, color: d.pct === 100 ? 'var(--green)' : 'var(--orange)' }}>{d.pct}%</span>
                      </div>
                    </td>
                    <td style={{ fontSize: 11 }}>{d.buffer}</td>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{d.avg}</td>
                    <td>
                      <span className={`badge ${d.hc === 'green' ? 'badge-green' : d.hc === 'orange' ? 'badge-orange' : 'badge-blue'}`}>{d.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
