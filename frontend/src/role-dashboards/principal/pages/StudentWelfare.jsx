export default function StudentWelfare() {
  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>🟢 CAMPUS SANCTUARY LIVE</span>
        <span style={{ color: 'var(--gray-500)' }}>Session AY 2025-26</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Student Welfare, Health Sanctuary & Pastoral Oversight</h1>
              <p className="page-title-sub">Comprehensive pediatric triage, chronic health alert matrices, and pastoral counseling operations under Principal Dr. Eleanor Varce's direct oversight.</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">📞 Contact Lead Doctor</button>
              <button className="btn btn-outline">Convene Pastoral Council</button>
              <button className="btn btn-outline">Report Health Roster</button>
              <button className="btn btn-green">📢 Broadcast Advisory</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Infirmary Census</div>
            <div className="stat-value" style={{ color: 'var(--orange)' }}>2<span style={{ fontSize: 14 }}>/4 beds</span></div>
            <div className="stat-sub">Acuity Low: 1 (Rya) +1 Sports</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Critical Care Register</div>
            <div className="stat-value" style={{ color: 'var(--red)' }}>184</div>
            <div className="stat-badge stat-badge-red">100% Notified</div>
            <div className="stat-sub">Severe Allergies: 3 • Asthma, T1, etc.</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Student Attendance Today</div>
            <div className="stat-value">97.5%</div>
            <div className="stat-sub">2,388 | 42 Absent • 14 Med Leave</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Pastoral & Counselling</div>
            <div className="stat-value" style={{ color: 'var(--purple)' }}>12</div>
            <div className="stat-badge stat-badge-purple">Active Cases</div>
            <div className="stat-sub">6 Dual / KGS Pre-Board Pastoral Care</div>
          </div>
        </div>

        {/* Live Triage Board */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <span className="dot dot-green live-dot"></span>
                Live Campus Health & Infirmary Triage Board
              </div>
              <div className="card-subtitle">
                Lead Physician: Dr. Sumathi Kulkarni, MD • Nursing: Dr. Saranya Menon • Emergency Duty Coordinator: Dr. Ramani
              </div>
            </div>
            <span className="badge badge-orange">Bed Occupancy 2/4</span>
          </div>
          <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              {
                init: 'VN', name: 'Viaan Mehra', id: '#OW-2019-A10', status: 'Bed 1 + Triaged', sBg: 'var(--red)',
                vitals: 'Temp 100.4°F + SpO2 95%', dx: 'Asthma/Inhaled 250mg dose II albuterol', action: 'Mother interacting via call (10:10 AM)', c: 'red'
              },
              {
                init: 'TK', name: 'Tanya Kapoor', id: '#OW-2018-101', status: 'Bed 2 + Come Home', sBg: 'var(--orange)',
                vitals: 'Purely Stable', dx: 'Evaluation MILD Lateral Sprain (Ankle). Physiotherapy. proper compression', action: 'Father acknowledged SMS alert (10:08 AM)', c: 'orange'
              },
              {
                init: 'DK', name: 'Devesh Korteri', id: '#OW-2026-100', status: 'Discharged to Class', sBg: 'var(--green)',
                vitals: 'Normal Vitals', dx: 'Gr 10-C Adhitya. Dr. D. Kulkarni. induced Wheeze Assessment to Check Refraction Mode (PMVh). Counselled by Dr. Sunita Kulkarni, MD', action: 'Cleared 10:15 AM', c: 'green'
              },
            ].map((p, i) => (
              <div key={i} style={{ border: `2px solid ${p.c === 'red' ? 'var(--red-light)' : p.c === 'orange' ? 'var(--orange-light)' : 'var(--green-light)'}`, borderRadius: 10, padding: 12 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar" style={{ background: p.sBg, color: '#fff', width: 32, height: 32, fontSize: 11 }}>{p.init}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{p.id}</div>
                  </div>
                  <span className={`badge ${p.c === 'red' ? 'badge-red' : p.c === 'orange' ? 'badge-orange' : 'badge-green'}`}>{p.status}</span>
                </div>
                <div style={{ fontSize: 11, marginBottom: 4 }}><strong>Vitals:</strong> {p.vitals}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 4 }}>{p.dx}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-500)', fontStyle: 'italic' }}>{p.action}</div>
              </div>
            ))}
          </div>
          </div>
        </div>

        <div className="grid-2">
          <div>
            {/* Special Needs & Chronic */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Special Needs & Chronic Health Protocols</div>
                <span className="badge badge-blue">38 Active Flags</span>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 12 }}>
                {[
                  { label: 'Epi-Pens', val: 18, sub: 'Validated as of Aug 10th', c: 'var(--red)' },
                  { label: 'Gluten/Nut Allergy', val: 34, sub: 'Direct Catering Compliance', c: 'var(--orange)' },
                  { label: 'Registered', val: 92, sub: 'IEP/Session designation req', c: 'var(--blue)' },
                ].map((it, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 12, background: 'var(--gray-50)', borderRadius: 8 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: it.c }}>{it.val}</div>
                    <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>{it.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>{it.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Campus Chronic Cohort Mapping (Gr 1047 Briefing): 100% Signed</div>
              {[
                { label: 'Asthma (92)', c: 'var(--orange)' },
                { label: 'Allergies (42+vars) (44)', c: 'var(--red)' },
                { label: 'Hearts/Cardiac (120)', c: 'var(--blue)' },
                { label: 'Diabetes (24)', c: 'var(--purple)' },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                  <div className="dot" style={{ background: it.c }}></div>
                  <span style={{ fontSize: 11 }}>{it.label}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Priority High-Care Students Monitored This Week:</div>
              {[
                { name: 'Rohini Singhania (Gr 7-A)', dx: 'Diabetes T1B, CHC System Bluster', detail: 'Infirmary tag: Stable' },
                { name: 'Ananya Venkatesh (Gr 11-2)', dx: 'Severe Factors', detail: 'Dual returns in Class 314' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '8px 10px', background: 'var(--gray-50)', borderRadius: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{s.dx}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{s.detail}</div>
                </div>
              ))}
              </div>
            </div>

            {/* Wing Attendance Monitor */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Wing-by-Wing Attendance & Medical Anomaly Monitor</div>
                <div className="flex gap-2">
                  <span className="badge badge-purple">AI Active</span>
                  <button className="btn btn-ghost btn-xs">Senior</button>
                  <button className="btn btn-ghost btn-xs">Secondary</button>
                  <button className="btn btn-ghost btn-xs">Middle</button>
                  <button className="btn btn-ghost btn-xs">Primary</button>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { wing: 'Senior Secondary (Gr 10-12)', pct: 98.2, val: '628 / 635', c: 'var(--green)' },
                { wing: 'Secondary Wing (Gr 6-9)', pct: 97.4, val: '604 / 620', c: 'var(--blue)' },
                { wing: 'Primary (Gr 1-5)', pct: 97.6, val: '575 / 589', c: 'var(--teal)' },
              ].map((w, i) => (
                <div key={i} style={{ padding: '10px', border: '1px solid var(--gray-100)', borderRadius: 8, marginBottom: 8 }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{w.wing}</span>
                    <span style={{ fontWeight: 800, color: w.c, fontSize: 14 }}>{w.pct}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ background: w.c, width: `${w.pct}%` }}></div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>{w.val}</div>
                </div>
              ))}
              <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Students Flagged for Direct Principal / Intervention:</div>
              {[
                { name: 'Ariv S. Sharma', cls: 'Grade 11', detail: '2 Consecutive Days Absent — No leave application filed with Senior Mentor Parent App', action: 'Parent Outreach', a2: 'Call Guardian', c: 'red' },
                { name: 'Surya Mahtra', cls: 'Grade 9', detail: 'Post-Surgical Convalescence — Parents in recovery. Post-Surgical (Medical Center authorized, med, day ago)', action: 'Home Study Sync', a2: 'Classroom Sync', c: 'orange' },
                { name: 'Reyush Dasgupta', cls: 'Grade 8', detail: 'Chronic Medical/Allergy Absence Patient, BRMSCI day, 60-day absence concerns flagged', action: 'Attendance Audit', a2: 'Schedule Meeting', c: 'orange' },
                { name: 'Ishaan & Dev V. (Twins)', cls: 'Grade 6-7', detail: 'Visit Wheelchair Cluster. Different infirmary. Parent Infirmary with the confirmed same rooms testing at home', action: 'Class Continuation Sure', a2: 'Drop Sensor Room', c: 'blue' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '8px 10px', border: '1px solid var(--gray-200)', borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${s.c === 'red' ? 'var(--red)' : s.c === 'orange' ? 'var(--orange)' : 'var(--blue)'}` }}>
                  <div className="flex items-start gap-2">
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{s.name} <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>| {s.cls}</span></div>
                      <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{s.detail}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className={`btn btn-xs ${s.c === 'red' ? 'btn-red' : s.c === 'orange' ? 'btn-orange' : 'btn-blue'}`}>{s.action}</button>
                    <button className="btn btn-outline btn-xs">{s.a2}</button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          <div>
            {/* Pastoral Care */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Pastoral Care & Wellbeing</div>
                <div className="flex gap-2">
                  <span className="badge badge-gray">1 Avg Note</span>
                  <span className="badge badge-purple">Mg. Nagele</span>
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 8 }}>WEEKLY PASTORAL WRAP TO — Yesterday, 04:35 PM</div>
              <div className="alert alert-blue" style={{ fontSize: 11, marginBottom: 12 }}>
                "The pre-board stress interventions are progressing positively. We completed the Community Pressure workshop for 180 senior students. Named adverse behaviors and emotional crossed campus-wide."
              </div>
              {[
                { title: 'Peer-Based Exam Anxiety Circle', status: 'Active 9 Curriculum', detail: 'Daily 09, one-paced team equally in critical feelings and psychological review of Senior Governing Mentor', pct: 94, c: 'var(--green)' },
                { title: 'Peer-Buddy Integration Circle', status: 'Middle Wing', detail: 'Welcoming five in-room students to identify where Senior Councillor Ami dedicated senior student mentors.', issues: '1 — 2 Grievances', c: 'var(--blue)' },
                { title: 'Sleep Hygiene & Digital Detox Guidance', status: 'Boarding & Dormitories', detail: 'Parents surveyed contacted in surveys of how. Hostel room tiny lit + worked into dorm of 10-43 PM maintained.', issues: 'Hostel Warden (Signed)', c: 'var(--purple)' },
              ].map((item, i) => (
                <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: 10, marginBottom: 8 }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
                    <span className={`badge ${i === 0 ? 'badge-green' : i === 1 ? 'badge-blue' : 'badge-purple'}`}>{item.status}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 4 }}>{item.detail}</div>
                  {item.pct && (
                    <div>
                      <div className="progress">
                        <div className="progress-bar progress-green" style={{ width: `${item.pct}%` }}></div>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>{item.pct}% Attendance</div>
                    </div>
                  )}
                  {item.issues && <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>{item.issues}</div>}
                </div>
              ))}
              </div>
            </div>

            {/* Grievance & Sessions */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Grievances & Sessions Registry</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { type: 'Academic Pressure', sub: 'Grade 1–5', score: 98.1, note: 'Healthy, consistent' },
                { type: 'Peer Conflict', sub: 'Grade 6–9', score: 94.2, note: 'Monitored' },
                { type: 'Exam Anxiety', sub: 'Grade 10–12', score: 87.6, note: 'Active Support' },
              ].map((g, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{g.type} <span style={{ fontWeight: 400, color: 'var(--gray-500)' }}>• {g.sub}</span></div>
                    <div className="progress mt-1">
                      <div className="progress-bar" style={{ background: g.score > 95 ? 'var(--green)' : g.score > 90 ? 'var(--blue)' : 'var(--orange)', width: `${g.score}%` }}></div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{g.score}%</div>
                  <span className={`badge ${g.score > 95 ? 'badge-green' : g.score > 90 ? 'badge-blue' : 'badge-orange'}`}>{g.note}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
