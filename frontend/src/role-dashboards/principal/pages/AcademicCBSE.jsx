export default function AcademicCBSE() {
  const subjects = [
    { code: 'PH', name: 'Physics', hod: 'Dr. P.K. Misra & Savita', curr: 'Ch 9-10 Physics Theory', pct: 96, board: '91:82', color: 'var(--green)', status: '8 Students requiring special attention', remarks: 'Optimal result about expected and met. Fa' },
    { code: 'CH', name: 'Chemistry', hod: 'Dr. S.R. Krishnaswamy', curr: '100% Theory', pct: '91:92', board: '91:92', color: 'var(--green)', status: '12 Students', remarks: 'Top progress report submitted on time 9%' },
    { code: 'MA', name: 'Mathematics', hod: 'Dr. D.P. Umesh Priya & Roy', curr: '100% Moderation & Coverage', pct: '72:83', board: '72:83', color: 'var(--blue)', status: '8 in Stress Calc', remarks: 'Special program in new direction added' },
    { code: 'EC', name: 'English Core', hod: 'HOD Team', curr: 'Daily Theory', pct: '82:81', board: '82:81', color: 'var(--teal)', status: 'None', remarks: 'ASL speed planning report 1 Part re' },
    { code: 'BI', name: 'Biology', hod: 'HOD Team', curr: 'Daily Theory', pct: '55:72', board: '55:72', color: 'var(--orange)', status: 'Disaster', remarks: 'Specimen document and first introduction' },
    { code: 'CS', name: 'Computer Science (083)', hod: 'HOD Team', curr: 'Daily Theory', pct: '83:2', board: '83:2', color: 'var(--purple)', status: 'None', remarks: 'All term updates updated. Full term No' },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag">NAAC GRADE-B ACTIVELY ACTIVE</span>
        <span style={{ color: 'var(--gray-500)' }}>CBSE OASIS ZONE-3 • CBSE OASIS: 44492</span>
        <span className="tag" style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}>AFFILIATION PROCESS</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Academic & CBSE Affiliation Governance</h1>
              <p className="page-title-sub">Directive oversight for Dr. Eleanor Varce • Term Curriculum Authority, (CBSE) Disclosures & Pre-Board Board Moderation</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">📊 Upload HOD Review</button>
              <button className="btn btn-green">Go to As Director/Executive</button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div className="stat-card">
            <div className="stat-label">Board Exam Readiness</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>98.4%</div>
            <div className="stat-badge stat-badge-green">+2.1% vs benchmark</div>
            <div className="stat-sub">Gr 12 — Board Practical Result & Final Exam Readiness</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Syllabus Completion</div>
            <div className="stat-value" style={{ color: 'var(--blue)' }}>94.2%</div>
            <div className="stat-badge stat-badge-blue">On Track</div>
            <div className="stat-sub">Science: 96% • Humanities: Avg 90%, Commerce 91%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Continuous Internal (CIE)</div>
            <div className="stat-value">100%</div>
            <div className="stat-badge stat-badge-green">All Evaluated</div>
            <div className="stat-sub">All internals processed, evaluated in confirmation with CBSE guidelines</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remedial Focus Cohort</div>
            <div className="stat-value" style={{ color: 'var(--orange)' }}>29</div>
            <div className="stat-sub">Students actively enrolled in dedicated re-teaching or focus-modelling protocols</div>
          </div>
        </div>

        {/* Subject Health Table */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">C1 Senior Secondary Subject Health & HOD Pacing Ledger</div>
              <div className="card-subtitle">Per-Department HOD Academic track-back • CBSE Academic Requirements</div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline btn-sm">Confirms with Past 15 ↑</button>
              <button className="btn btn-outline btn-sm">Filter Wing</button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Department & HOD</th>
                  <th>Current Topics</th>
                  <th>Today's Practicable</th>
                  <th>PCF Share</th>
                  <th>All Risk Status</th>
                  <th>HOD Operational Remarks</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: s.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{s.code}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 12 }}>{s.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{s.hod}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 11 }}>{s.curr}</td>
                    <td>
                      <div style={{ fontWeight: 700, color: s.color, fontSize: 13 }}>{s.pct}</div>
                      <div className="progress" style={{ marginTop: 4, width: 60 }}>
                        <div className="progress-bar" style={{ background: s.color, width: `${parseInt(s.pct) || 80}%` }}></div>
                      </div>
                    </td>
                    <td style={{ fontSize: 11 }}>{s.board}</td>
                    <td>
                      <span className="badge" style={{ background: s.color === 'var(--orange)' ? 'var(--orange-light)' : 'var(--green-light)', color: s.color === 'var(--orange)' ? 'var(--orange)' : 'var(--green-dark)' }}>
                        {s.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: 'var(--gray-600)' }}>{s.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom two columns */}
        <div className="grid-2">
          {/* CBSE OASIS */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">CBSE OASIS & Mandatory Public Disclosure</div>
                <div className="card-subtitle">Certification tracker, digital evidence log, regulatory upload status</div>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-green">Statutory: 100% Compliant</span>
                <span className="badge badge-blue">ITG Register</span>
              </div>
            </div>
            <div style={{ padding: '12px 14px' }}>
            {[
              { pct: '100%', title: 'Public Teacher Ratio (PTR) Compliance', detail: 'CBSE Section 12 verified with all staff deployment counted', color: 'green' },
              { pct: '100%', title: 'Special Education & Wellness Counsellor Ratio', detail: 'Child counselling available. Pre-disclosure filed. Inclusive help', color: 'green' },
              { pct: '100%', title: 'Fire Safety & Smoke Poke NDC Validation', detail: 'NOC Report from municipal body verification pending submission', color: 'green' },
              { pct: '100%', title: 'Safe Drinking Water & Sanitary Conditions', detail: '14 Sources validated. Certificate on facility at mandatory 04:16 attestation', color: 'green' },
              { pct: '', title: 'Compulsory Education & Corporal Law Grievances', detail: 'Physics, Chem, Bio laboratories compliant with >15 sq ft/student requirements', color: 'green' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{item.detail}</div>
                </div>
                {item.pct && <span className="badge badge-green">{item.pct}</span>}
              </div>
            ))}
            <button className="btn btn-green btn-sm w-full" style={{ marginTop: 8 }}>✓ Verify & Consolidate</button>
            </div>
          </div>

          {/* Marks Moderation */}
          <div>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Marks Moderation & Deviation Guard</div>
                <span className="badge badge-blue">AI Pre-Moderated: 42.6% Range</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 12 }}>
                CBSE Moderation engine performs the Dept Spread (A-1). A 4.5% in Mathematics is flagged where Dr. Umesh Varma reconciliation defect and waste management for applied Dept moderations in moderation 8.
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60, marginBottom: 8 }}>
                {[
                  { h: 30, c: 'var(--green)', l: 'Ph' },
                  { h: 50, c: 'var(--blue)', l: 'Ch' },
                  { h: 55, c: '#f87171', l: 'MA' },
                  { h: 40, c: 'var(--green)', l: 'Hist' },
                  { h: 35, c: 'var(--orange)', l: 'DES' },
                  { h: 20, c: 'var(--green)', l: 'CS' },
                ].map((b, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <div style={{ width: '100%', background: b.c, borderRadius: '2px 2px 0 0', height: `${b.h}px` }}></div>
                    <span style={{ fontSize: 9, color: 'var(--gray-500)' }}>{b.l}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-orange" style={{ fontSize: 11 }}>
                ⚠️ Mathematics Deviated Noted: 4.9% Deviation — Action recommendation: 5.6% Add Spread of 9.56 marks & remediation in 2 target examination centres.
              </div>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-blue btn-sm">Accept Moderation</button>
                <button className="btn btn-outline btn-sm">Cycle Modification</button>
              </div>
              </div>
            </div>

            {/* Targeted Remedial Intervention */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Targeted Remedial Intervention Registry</div>
                <div className="flex gap-2">
                  <span className="badge badge-blue">29 Scholars Enrolled</span>
                  <button className="btn btn-green btn-sm">Assign Mentor</button>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Scholar / Class</th>
                      <th>Subject</th>
                      <th>Pre-Board Score</th>
                      <th>Assigned Mentor</th>
                      <th>Attendance</th>
                      <th>Intervention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Aarav Singhania', cls: '12-A', sub: 'Mathematics', score: 48, mentor: 'Mrs. Sunita Rao', att: 95, status: 'In Track' },
                      { name: 'Diya K. Sharma', cls: '12-A', sub: 'Physics', score: 46, mentor: 'Dr. Abhijit Gupta', att: 90, status: 'In Track' },
                      { name: 'Rohan V. Mishra', cls: '12-B', sub: 'Accountancy', score: 44, mentor: 'Ms. Anand Kumar', att: 88, status: 'In Alert Plan' },
                      { name: 'Ananya C. Chawla', cls: '12-A', sub: 'Chemistry', score: 42, mentor: 'Dr. Novella Roy', att: 92, status: 'Initiated' },
                    ].map((s, i) => (
                      <tr key={i}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="avatar" style={{ width: 26, height: 26, fontSize: 9, background: 'var(--blue-light)', color: 'var(--blue)' }}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: 11 }}>{s.name}</div>
                              <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Gr {s.cls}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize: 11 }}>{s.sub}</td>
                        <td>
                          <span style={{ color: s.score < 45 ? 'var(--red)' : 'var(--orange)', fontWeight: 700 }}>{s.score}</span>
                          <span style={{ color: 'var(--gray-400)', fontSize: 10 }}>/60</span>
                        </td>
                        <td style={{ fontSize: 11 }}>{s.mentor}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ fontWeight: 700, fontSize: 11 }}>{s.att}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${s.status === 'In Track' ? 'badge-green' : s.status === 'In Alert Plan' ? 'badge-orange' : 'badge-blue'}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-3" style={{ fontSize: 11, color: 'var(--gray-500)' }}>
                <span>Displaying 4 of 29 enrolled scholars in the registry</span>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-xs">Previous Batch</button>
                  <span>Page 1 of 8</span>
                  <button className="btn btn-outline btn-xs">Next Batch</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
