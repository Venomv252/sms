export default function PrincipalCockpit() {
  const subjects = [
    { sub: 'Physics', pct: 96, c: '#16a34a' },
    { sub: 'Chemistry', pct: 94, c: '#16a34a' },
    { sub: 'Mathematics', pct: 98, c: '#2563eb' },
    { sub: 'English Core', pct: 92, c: '#16a34a' },
    { sub: 'Economics', pct: 91, c: '#16a34a' },
    { sub: 'Biology', pct: 95, c: '#0d9488' },
  ]

  const bellCurve = [
    { pct: 22, label: '51–60%', c: '#f87171' },
    { pct: 46, label: '61–70%', c: '#fb923c' },
    { pct: 21, label: '71–80%', c: '#facc15' },
    { pct: 9,  label: '81–90%', c: '#4ade80' },
    { pct: 3,  label: '91–100%', c: '#16a34a' },
  ]

  return (
    <div>
      {/* Meta bar */}
      <div className="page-meta-bar">
        <span className="tag" style={{ background: '#fef2f2', color: '#dc2626', display:'flex', alignItems:'center', gap:4 }}>
          <span className="dot dot-red live-dot"></span> LIVE EXECUTIVE DESK
        </span>
        <span style={{ color: 'var(--gray-500)' }}>AY 2024–25 • Term I • Day 147 of 220</span>
        <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>CBSE Affiliation #1035421</span>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--gray-500)' }}>NAAC Grade A+</span>
      </div>

      <div className="page-inner">
        {/* Page Header */}
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">
                Principal Cockpit
                <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--gray-400)' }}>— Daily</span>
              </h1>
              <p className="page-title-sub">Campus Pulse &amp; Academic Leadership</p>
              <p style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-500)', maxWidth: 600 }}>
                AI 4-Campus Wings Operating Normally • Morning Assembly @ 08:10 AM (Grade 10 Presentations) • Board Practical Moderation Week
              </p>
            </div>
            <div className="page-actions">
              <button className="btn btn-green">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/></svg>
                Broadcast Faculty
              </button>
              <button className="btn btn-outline">
                Sanctions (9) <span className="badge badge-orange" style={{ marginLeft: 4 }}>Pending</span>
              </button>
              <button className="btn btn-outline">Daily Digest</button>
              <button className="btn btn-outline">SOP Protocol</button>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-1">
              <div className="stat-label">Total Student Attendance</div>
              <svg className="stat-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5" style={{opacity:0.25}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>97.5%</div>
            <span className="stat-badge stat-badge-green">▲ 0.4%</span>
            <div className="stat-sub">2,385 / 2,450 On Campus</div>
            <hr className="divider" />
            <div style={{ display: 'flex', gap: 8, fontSize: 10, color: 'var(--gray-500)', flexWrap:'wrap' }}>
              <span>42 Absent (Pro: K16)</span>
              <span>14 Med Leave</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="flex items-center justify-between mb-1">
              <div className="stat-label">Faculty Status &amp; Proxies</div>
            </div>
            <div className="stat-value">139<span style={{ fontSize: 15, fontWeight: 500, color: 'var(--gray-400)' }}>/142</span></div>
            <span className="stat-badge stat-badge-blue">97.9%</span>
            <div className="stat-sub">100% Proxies Autonomous</div>
            <hr className="divider" />
            <div style={{ display: 'flex', gap: 6, fontSize: 10, flexWrap:'wrap' }}>
              <span className="badge badge-orange">2 On Sanctioned Leave</span>
              <span className="badge badge-green">Deployed 07:58 AM</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Academic Health Index</div>
            <div className="stat-value" style={{ color: 'var(--blue)' }}>91.4%</div>
            <span className="stat-badge stat-badge-green">▲ 2.6% vs last week</span>
            <div className="stat-sub">Gr 10 &amp; 12 Board Readiness</div>
            <hr className="divider" />
            <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Syllabus Pacing: <strong style={{color:'var(--green)'}}>On Schedule</strong></div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Discipline &amp; Parental Radar</div>
            <div className="stat-value" style={{ color: 'var(--orange)' }}>2</div>
            <span className="stat-badge stat-badge-orange">Action Needed</span>
            <div className="stat-sub">0 Severe Incidents • 94.6% CSI</div>
            <hr className="divider" />
            <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Transport • 1 Fire Appeal • Infirmary: Stable</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid-2">
          {/* ── LEFT ── */}
          <div>
            {/* Live Academic Velocity */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <span className="dot dot-green live-dot"></span>
                    Senior Secondary Live Academic Velocity
                  </div>
                  <div className="card-subtitle">Real-time CBSE curriculum compliance &amp; lecture progression tracking</div>
                </div>
                <span className="badge badge-orange">Live: Period 3 (10:45 AM)</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, padding: '12px 14px' }}>
                {subjects.map(s => (
                  <div key={s.sub} style={{ padding: '10px 12px', background: 'var(--gray-50)', borderRadius: 8, borderLeft: `3px solid ${s.c}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6, color: 'var(--gray-700)' }}>{s.sub}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: s.c }}>{s.pct}%</div>
                    <div className="progress" style={{ marginTop: 6 }}>
                      <div className="progress-bar" style={{ background: s.c, width: `${s.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Autonomous Faculty Substitution */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">
                    <span className="dot dot-blue live-dot"></span>
                    Autonomous Faculty Substitution Radar
                  </div>
                  <div className="card-subtitle">Periods 1 to 4 — AI-matched via timetable &amp; biometric sync</div>
                </div>
                <span className="badge badge-green">100% Filled</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                {
                  period: 'P3', subject: 'Class IX-C • Advanced Physics',
                  room: 'Room 304 (Einstein Wing)', absent: 'Dr. N. Roy (ICBSE.Uni)',
                  proxy: 'Ms. Arpita Sen (Vacant P4, Physics)', status: 'In-Classroom Verified',
                  note: 'Assigned: Chem Lab • Physical Biometric verification completed at 10:44 PM', c: 'green',
                },
                {
                  period: 'P6', subject: 'Gr 10-B • Mathematics',
                  room: 'Ramanuj Lab II', absent: 'Mrs. K. Meera (Sick Leave)',
                  proxy: 'Mr. Tarun Desai (Calculus Sub)', status: 'Pre-Scheduled',
                  note: 'SMS Notified 07:53 AM • SmartBoard queued', c: 'blue',
                },
              ].map((s, i) => (
                <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: '10px 12px', marginBottom: 8, borderLeft: `3px solid ${s.c === 'green' ? 'var(--green)' : 'var(--blue)'}` }}>
                  <div className="flex items-center gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
                    <span style={{ background: s.c === 'green' ? 'var(--green)' : 'var(--blue)', color: '#fff', fontWeight: 700, fontSize: 10, padding: '2px 7px', borderRadius: 4 }}>{s.period}</span>
                    <span style={{ fontWeight: 700, fontSize: 12 }}>{s.subject}</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{s.room}</span>
                    <span className={`badge ${s.c === 'green' ? 'badge-green' : 'badge-blue'}`} style={{ marginLeft: 'auto' }}>{s.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-700)', marginBottom: 4 }}>
                    Absent: <strong>{s.absent}</strong> → Proxy: <strong style={{ color: s.c === 'green' ? 'var(--green-dark)' : 'var(--blue)' }}>{s.proxy}</strong>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{s.note}</div>
                </div>
              ))}
              </div>
            </div>

            {/* Academic Bell Curve */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Term II Academic Bell Curve &amp; Pre-Board Projections</div>
                  <div className="card-subtitle">Based on CBSE internal assessment scores across 420 Grade 10 &amp; 12 candidates</div>
                </div>
                <button className="btn btn-outline btn-sm">Full Moderation Sheet →</button>
              </div>
              {/* Bar chart */}
              <div style={{ padding: '12px 14px 0' }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 90, marginBottom: 14, padding: '0 4px' }}>
                {bellCurve.map((b) => (
                  <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--gray-600)' }}>{b.pct}%</span>
                    <div style={{ width: '100%', background: b.c, borderRadius: '4px 4px 0 0', height: `${b.pct * 1.7}px`, transition: 'height 0.3s' }}></div>
                    <span style={{ fontSize: 9, color: 'var(--gray-500)', textAlign: 'center', lineHeight: 1.2 }}>{b.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ padding: 10, background: 'var(--green-light)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, color: 'var(--green-dark)', fontSize: 12, marginBottom: 3 }}>🏆 Top Departmental Score</div>
                  <div style={{ color: 'var(--gray-700)', fontSize: 11 }}>Science &amp; Physics Dept avg rating at 92.4% cohort average across all term papers</div>
                </div>
                <div style={{ padding: 10, background: 'var(--blue-light)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue)', fontSize: 12, marginBottom: 3 }}>🥇 Inter-School Topper</div>
                  <div style={{ color: 'var(--gray-700)', fontSize: 11 }}>Arjun Sharma (Gr 12 Chemistry) Pre-Board 99.2% — All-India record</div>
                </div>
              </div>
              </div>
            </div>

            {/* Campus Operations */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">📍 Campus Operations &amp; Infirmary Care Status</div>
                <span className="badge badge-green">All Corridors Clear</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, padding: '12px 14px' }}>
                {[
                  { label: 'Perimeter Gates', val: '4/4', sub: 'Automated biometric gates sealed. Visitor escorts on badge ID protocol.', tag: '✓ Chief Warden Notified', c: 'var(--green)' },
                  { label: 'Fleet Status', val: '38/38', sub: 'All morning bus routes accounted for. GPS Synchronized at 07:54 AM.', tag: '✓ GPS Logs Synced', c: 'var(--blue)' },
                  { label: 'Infirmary', val: '2 Beds', sub: 'Viaan Mehra (Gr 9 Ankle Sprain). Parents Informed at 10:10 AM.', tag: '✓ Dr. Kulkarni On-Duty', c: 'var(--orange)' },
                ].map((item) => (
                  <div key={item.label} style={{ padding: 12, background: 'var(--gray-50)', borderRadius: 8, borderTop: `3px solid ${item.c}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: item.c }}>{item.val}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 5, lineHeight: 1.4 }}>{item.sub}</div>
                    <div style={{ marginTop: 8, fontSize: 10, fontWeight: 600, color: item.c }}>{item.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            {/* Sanctions Desk */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Principal's Sanctions Desk</div>
                  <div className="card-subtitle">Requires executive sign-off and digital seal</div>
                </div>
                <span className="badge badge-red">4 Pending</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                {
                  type: 'Faculty On-Duty Leave', name: 'Dr. Nandita Roy • Senior PGT Chemistry',
                  detail: 'Appointed State Science Olympiad Chief Jury panelist at IIT Delhi',
                  meta: 'Date Oct 28–29 • All 6 Proxies Pushed', actions: ['Decline', 'Sanction'],
                  actionC: 'green', borderC: 'var(--green)',
                },
                {
                  type: 'Transfer Certificate (TC)', name: 'Aarav Aryan Singhania • Gr 12-A',
                  detail: 'Scheduled relocation. Early Matriculation. Library, Accounts, Lab & Sports dues cleared.',
                  meta: '4 Clearances Verified', actions: ['Affix Digital Seal'],
                  actionC: 'blue', borderC: 'var(--blue)',
                },
                {
                  type: 'Emergency Float Replenishment', name: '₹1,200 Petty Imprest',
                  detail: 'Inter-School Athletics Championship transport meals & medical emergency items. Bursar Pre-Audited.',
                  meta: 'Bursar Approved', actions: ['Authorize Outflow'],
                  actionC: 'orange', borderC: 'var(--orange)',
                },
              ].map((s, i) => (
                <div key={i} className="sanction-item" style={{ borderLeft: `3px solid ${s.borderC}`, marginBottom: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gray-400)', marginBottom: 4 }}>{s.type}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 3 }}>{s.detail}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{s.meta}</div>
                  <div className="flex gap-2 mt-2">
                    {s.actions.map((a, j) => (
                      <button key={j} className={`btn btn-sm ${j === s.actions.length - 1 ? (s.actionC === 'orange' ? 'btn-orange' : s.actionC === 'blue' ? 'btn-blue' : 'btn-green') : 'btn-outline'}`}>{a}</button>
                    ))}
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Parental & Pastoral Escalations */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Parental &amp; Pastoral Escalations</div>
                <span className="badge badge-orange">2 Active</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                {
                  id: '#ELG-2025-089', time: '08:12 AM Today',
                  title: 'Route #14 (Whitefield) 18-min Arrival Delay',
                  detail: 'Parent: Neha Verma — Outer Ring Rd Block. Transport coordinator requested immediate inspection for pre-board students.',
                  tag: 'Parent SMS & Portal', action: 'Summon Log', c: 'orange',
                },
                {
                  id: '#DISC-2025-068', time: 'Yesterday',
                  title: 'Grade 11-A Robinson Lab Fee Discrepancy',
                  detail: "Parent's appeal: double billing during reserve switch. Bursar audit confirms optional enrol — recommends automated fee-credit.",
                  tag: 'Bursar Recommends Waiver', action: 'Endorse Waiver', c: 'blue',
                },
              ].map((e, i) => (
                <div key={i} className="escalation-card" style={{ borderLeft: `3px solid ${e.c === 'orange' ? 'var(--orange)' : 'var(--blue)'}`, marginBottom: 10 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>{e.id}</span>
                    <span style={{ fontSize: 10, color: 'var(--gray-400)', marginLeft: 'auto' }}>{e.time}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 8 }}>{e.detail}</div>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 10, background: 'var(--gray-100)', padding: '2px 8px', borderRadius: 4 }}>{e.tag}</span>
                    <button className={`btn btn-xs ${e.c === 'orange' ? 'btn-orange' : 'btn-blue'}`} style={{ marginLeft: 'auto' }}>{e.action}</button>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Executive Engagements */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Executive Engagements &amp; Milestones</div>
                <span style={{ fontSize: 11, color: 'var(--gray-400)' }}>Next 48 Hours</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { time: 'Today 07:30', title: 'HOD Academic Review: Physics & Math', detail: 'Principal • Board Room • Practice referral marks & remediation interviews', tag: 'Confirmed' },
                { time: 'Today 09:00', title: 'Board Result Moderation Committee', detail: 'Academic Council Chamber • Scrutiny of grade marks & remediation efficacy across Gr 12', tag: 'Confirmed' },
                { time: 'Today 16:00', title: 'Executive Board & Trustee Briefing', detail: 'Submit AY 2025–26 admission yield projections and annual governance report', tag: 'Prepare Deck' },
              ].map((e, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <div style={{ minWidth: 72, fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>{e.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{e.detail}</div>
                    <span className="badge badge-gray mt-1">{e.tag}</span>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Intervention Plans */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Speedfall Report Group</div>
                <button className="btn btn-blue btn-sm">View Intervention Plans</button>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 10 }}>
                19 students (9 students) enrolled in covering CBSE clinic. AI-assigned mentors tracking progress.
              </div>
              <div className="flex items-center gap-3">
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, marginBottom: 4 }}>Intervention Coverage</div>
                  <div className="progress">
                    <div className="progress-bar progress-green" style={{ width: '74%' }}></div>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 3 }}>74% of flagged students in active plan</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--orange)' }}>19</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Students</div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
