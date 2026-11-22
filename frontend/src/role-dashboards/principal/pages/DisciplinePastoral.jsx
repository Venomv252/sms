export default function DisciplinePastoral() {
  const incidents = [
    {
      avatar: 'AR', name: 'Ashiv Ray', cls: 'Grade 10-B', id: 'D: IDA-2022-893',
      level: 'Level 1 Minor', levelC: 'green', finding: 'Unauthorized distraction using a Device during a study break',
      reporting: 'Reg. Dr. S. K. Neil (Physics HOD)', corrective: 'Digital detox studying during free assignment, reformulated to Station for 24h.',
      bilateral: 'Parent SMS & Portal', action: 'Endorsed', actionC: 'green'
    },
    {
      avatar: 'NM', name: 'Nanya Munjee', cls: 'Grade 9-B', id: 'D: IDA-2025-479',
      level: 'Level 1 Minor', levelC: 'green', finding: 'Missing formal blazer during Investiture Ceremony',
      reporting: 'Reg. Dr. (Perfect Council)', corrective: 'Uniform compliance counselling, issued around self-Inspection check, scheduled tomorrow.',
      bilateral: 'App Notice Send', action: 'Endorsed', actionC: 'green'
    },
    {
      avatar: 'KC', name: 'Kabir Chopra', cls: 'Grade 10-C', id: 'D: IDA-2023-773',
      level: 'Level 2 Moderate', levelC: 'orange', finding: 'Basketball court dispute escalating to minor altercation',
      reporting: 'Reg. (Sports Crew)', corrective: 'Peer mediation with counsellor. 3-match inter-team athletic suspension.',
      bilateral: 'Dean Notice', action: 'Requires Mentor Review', actionC: 'orange'
    },
    {
      avatar: 'TD', name: 'Tanya Desai', cls: 'Grade 8-B', id: 'D: IDA-2024-1022',
      level: 'Level 1 Minor', levelC: 'green', finding: 'Absent 15 minutes past in homeroom bell at 3 connected uses',
      reporting: 'Trip Books (last connected use)', corrective: 'Transport auto SMS to parent: 3 Missed, family Transport lead.',
      bilateral: 'Automated SMS', action: 'Endorsed', actionC: 'green'
    },
  ]

  const teams = [
    { name: 'School Team', rank: 1, pts: 4890, acs: 640, civility: 280, sports: 1020, service: 990, c: '#16a34a' },
    { name: 'Sapphire Titans', rank: 2, pts: 4610, acs: 180, civility: 120, sports: 110, service: 300, c: '#2563eb' },
    { name: 'Sports Team B', rank: 3, pts: 4340, acs: 1320, civility: 128, sports: 1250, service: 720, c: '#dc2626' },
    { name: 'Sports Team D', rank: 4, pts: 4190, acs: 1400, civility: 990, sports: 780, service: 810, c: '#ea580c' },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--purple-light)', color: 'var(--purple)' }}>OFFICE OF INSTITUTIONAL</span>
        <span style={{ color: 'var(--gray-500)' }}>PASTORAL CARE & STATUTORY COMPLIANCE</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Discipline, Pastoral Code & Merit Governance</h1>
              <p className="page-title-sub">Real-time oversight of Greenwood Honor Charter, affirmative restorative interventions, Inter-team merit distribution, and statutory anti-bullying safeguards under Principal jurisdiction.</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">🏆 Issue Merit Award</button>
              <button className="btn btn-outline">📝 Log Pastoral Note</button>
              <button className="btn btn-outline">Honor Roll</button>
              <button className="btn btn-green">⚖ Convene Disciplinary Board</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Campus Conduct Index</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>98.6%</div>
            <div className="stat-badge stat-badge-green">-0.4%</div>
            <div className="stat-sub">2.4% of 2,450 students in good standing</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Level 3 Severe Incidents</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>0</div>
            <div className="stat-badge stat-badge-green">Active / Term Q4</div>
            <div className="stat-sub">Zero Tolerance Bullying Audit Certified</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Level 1 Incidents</div>
            <div className="stat-value" style={{ color: 'var(--orange)' }}>4</div>
            <div className="stat-sub">Logged today: 21 Uniform Discipline • 0 Hallway Running</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #1a2332, #16a34a)', border: 'none' }}>
            <div className="stat-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Weekly Character Merits</div>
            <div className="stat-value" style={{ color: '#fff' }}>1,420<span style={{ fontSize: 14 }}>pts</span></div>
            <div style={{ color: '#4ade80', fontSize: 12, fontWeight: 700, marginTop: 4 }}>School Team leading team cup +340 today</div>
          </div>
        </div>

        {/* Incident Register */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Principal's Incident & Mediation Register</div>
              <div className="card-subtitle">Statutory ledger of disciplinary hearings, restorative counselling conditions, and procedural endorsements. AY 2024–25</div>
            </div>
            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-blue">All Incidents (4)</span>
              <span className="badge badge-gray">Level 1: Minor (3)</span>
              <span className="badge badge-orange">Level 2: Moderate (1)</span>
              <span className="badge badge-gray">Level 2: Sound (0)</span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Case / Scholar</th>
                  <th>Grade & Section</th>
                  <th>Classification</th>
                  <th>Finding & Reporting Pathway</th>
                  <th>Corrective Actions</th>
                  <th>Bilateral Comms</th>
                  <th>Principal Sign-Off</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((inc, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 9, background: 'var(--blue-light)', color: 'var(--blue)' }}>{inc.avatar}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 12 }}>{inc.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{inc.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{inc.cls}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{inc.section || '—'}</div>
                    </td>
                    <td>
                      <span className={`badge ${inc.levelC === 'green' ? 'badge-green' : 'badge-orange'}`}>{inc.level}</span>
                    </td>
                    <td style={{ fontSize: 11, maxWidth: 160 }}>
                      <div style={{ marginBottom: 2 }}>{inc.finding}</div>
                      <div style={{ color: 'var(--gray-400)', fontSize: 10 }}>{inc.reporting}</div>
                    </td>
                    <td style={{ fontSize: 11, maxWidth: 160 }}>{inc.corrective}</td>
                    <td>
                      <span className="badge badge-gray">{inc.bilateral}</span>
                    </td>
                    <td>
                      <span className={`badge ${inc.actionC === 'green' ? 'badge-green' : 'badge-orange'}`}>{inc.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 8 }}>
            ✅ All records encrypted & retained in accordance with CBSE Pastoral Audit Chapter 7: Protection of Minors. Pastoral Register: V. P. Archana Sengupta
          </div>
        </div>

        <div className="grid-2">
          {/* Merit Points */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">🏆 Four Teams Character & Merit Cup</div>
                <div className="card-subtitle">Character and achievement distribution (tracking per 2 wks)</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Cumulative AY 24–25</div>
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
            {teams.map((h, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: h.c }}></div>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{h.name}</span>
                    <span className={`badge ${i === 0 ? 'badge-green' : i === 1 ? 'badge-blue' : i === 2 ? 'badge-red' : 'badge-orange'}`}>RANK {h.rank}</span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 16, color: h.c }}>{h.pts.toLocaleString()} pts</span>
                </div>
                <div className="progress" style={{ height: 8, marginBottom: 4 }}>
                  <div className="progress-bar" style={{ background: h.c, width: `${(h.pts / 5000) * 100}%` }}></div>
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--gray-500)' }}>
                  <span>Academics: {h.acs}</span>
                  <span>Civility: {h.civility}</span>
                  <span>Sports: {h.sports}</span>
                  <span>Service: {h.service}</span>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Restorative Justice */}
          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Restorative Justice Interventions</div>
                <div className="card-subtitle">AI-curated, teacher- and Dean-run affirmative restorative interventions</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { num: '01', title: 'Social Emotional Guided Circle', status: 'Stage 2 of 2', detail: 'Facilitated by principal/Synergising 9+ participants', c: 'blue' },
                { num: '02', title: 'Digital Citizenship Refresher', status: 'Completed', detail: 'Grade 314 (Moderator: Cloud Cell) • Grades 9 + 10', c: 'green' },
                { num: '03', title: 'Peer-to-Peer Empathy Workshop', status: 'Scheduled Tds', detail: 'Grade 9 & 11 Form Tutors • Officially conducted', c: 'purple' },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 mb-3">
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: r.c === 'green' ? 'var(--green-light)' : r.c === 'blue' ? 'var(--blue-light)' : 'var(--purple-light)', color: r.c === 'green' ? 'var(--green-dark)' : r.c === 'blue' ? 'var(--blue)' : 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{r.num}</div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center justify-between gap-2">
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{r.title}</div>
                      <span className={`badge ${r.c === 'green' ? 'badge-green' : r.c === 'blue' ? 'badge-blue' : 'badge-purple'}`}>{r.status}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{r.detail}</div>
                  </div>
                </div>
              ))}
              </div>
            </div>

            {/* Anti-Bullying */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Anti-Bullying & Statutory Child Protection Vigilance Cell</div>
                <span className="badge badge-green">Audit Status: 100% Compliant</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {[
                  { label: 'Anonymous Grievance Drop-Box', icon: '📥', detail: 'Physical secured drop-box at BCA and encrypted digital one. Cleared daily by 09:00 by the Child Welfare Officer.', sub: 'Last audit: Today, 09:03 AM • Clear Record' },
                  { label: 'POSCO Safety Committee', icon: '🛡', detail: 'Bi-Annual Statutory Audit', sub: 'All 42 teaching & 68 ancillary transport personnel verified with zero compliance on record. Next CBSE Filing: May 30, 2025 Certified' },
                  { label: 'Digital Wellness & Campus Net Safeguards', icon: '📡', detail: 'Active Firewall Detection on campus Wi-Fi + flagged AI reports + anonymous counsellor channels', sub: 'Real-time Sentinel: 24/7 • Active Shield' },
                ].map((b, i) => (
                  <div key={i} style={{ padding: 10, background: 'var(--gray-50)', borderRadius: 8 }}>
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{b.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>{b.detail}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 6, borderTop: '1px solid var(--gray-200)', paddingTop: 6 }}>{b.sub}</div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
