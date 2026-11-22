export default function ParentEscalations() {
  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--orange-light)', color: 'var(--orange)' }}>OPEN ESCALATION PROTOCOL ACTIVE</span>
        <span style={{ color: 'var(--gray-500)' }}>Grievance Call Now: KGW-16-2021</span>
        <span style={{ color: 'var(--gray-500)', marginLeft: 'auto' }}>Desk AY 2025-26</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Parent Escalations & Bilateral Desk</h1>
              <p className="page-title-sub">Autonomous escalation console for Dr. Eleanor Varce. Reviews direct parent top complaints, endorses liaison to HOD Advisors, and keeps institutional obligations, and clear CBSE obligations.</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-outline">📝 Compose Advisory</button>
              <button className="btn btn-red">🚨 Emergency PTM</button>
              <button className="btn btn-outline">Solutions Council</button>
              <button className="btn btn-outline">📤 Export Dossier</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Desk In Total</div>
            <div className="stat-value" style={{ color: 'var(--red)' }}>2</div>
            <div className="stat-badge stat-badge-red">Immediate</div>
            <div className="stat-sub">In 48 hrs (Welfare Gr 10-B Planner — G + Matters pending IDs awaiting principal)</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">SLA Adherence</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>96.4%</div>
            <div className="stat-badge stat-badge-green">24h Verified</div>
            <div className="stat-sub">Average 147 hrs across 428 cases held since principal reports</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">PTD Achievement</div>
            <div className="stat-value">94.6%</div>
            <div className="stat-badge stat-badge-blue">Past Rate</div>
            <div className="stat-sub">More than 430 complaint parent responses kept per wellness standard with Principal</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Bilateral Enrolment</div>
            <div className="stat-value">1,890<span style={{ fontSize: 14 }}>/2,100</span></div>
            <div className="stat-badge stat-badge-green">90.0%</div>
            <div className="stat-sub">completion rate: 43 VPN access • 320 standard opt-in enrolment</div>
          </div>
        </div>

        {/* High Priority Escalations */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Principal's High-Priority Escalation Ledger</div>
            <div className="card-subtitle">Severity-tagged, auto-log, to Principal for direct following-up and clearing of escalation</div>
          </div>
          <div style={{ padding: '12px 14px' }}>

          {/* Escalation 1 */}
          <div className="escalation-card priority-high mb-3">
            <div className="flex items-start gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge badge-red">#EC-2025-045</span>
                  <span className="badge badge-orange">Requires Verice Review</span>
                  <span className="badge badge-gray">Transport Infrastructure • Priority Critical</span>
                  <span style={{ fontSize: 10, color: 'var(--gray-400)', marginLeft: 'auto' }}>August 7 Today</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
                  Route #14 Whitefield Corridor: 18-Minute Unannounced Inbound Delay
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 8 }}>
                  Parent: Mr. Viram Varma (Father of Ariya Verma, Gr-8C) Route #44 blockInnerseer at DWSE mention (2AM) Routed DMSE at bus-route in #14 Block-corridor Delay. Parent claims student not informed more. Main Transport Driver routes Delay: 08:50 - 09:07 AM (caused 18-min delay)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
                  {[
                    { label: 'Input Support', val: 'Outset Singh Now' },
                    { label: 'Bypass Distance', val: 'Report Distance + Reroute on DMSE Blocker' },
                    { label: 'GPS Log Attached', val: '✅' },
                  ].map((d, i) => (
                    <div key={i} style={{ padding: 8, background: 'var(--gray-50)', borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{d.label}</div>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{d.val}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-green btn-sm">✅ Endorse Resolution</button>
                  <button className="btn btn-outline btn-sm">📞 Mr. Civil Call</button>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation 2 */}
          <div className="escalation-card priority-medium mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-orange">#PEC-2025-049</span>
              <span className="badge badge-red">Activated Under-Vecide</span>
              <span className="badge badge-gray">Finance & Transit Desk • High Impact</span>
              <span style={{ fontSize: 10, color: 'var(--gray-400)', marginLeft: 'auto' }}>Logged: Thursday</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
              Grade 11-A Advanced Physics Lab Consumables Invoice Dispute
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 8 }}>
              Parent: Ms. Nanya Sengupta (Mother of Arjun Sengupta, Gr 11A). Invoice for fee-basis (₹ 4,500-recommended vs. the students opted for purely computational physics) from UNI.
              Bursar B. Ramakrishnan Mene: 'Castle ₹6-854 recommended for 100% similar and adequate ≥60 amendments.'
            </div>
            <div className="flex gap-2">
              <button className="btn btn-green btn-sm">Sanction Fee Credit</button>
              <button className="btn btn-outline btn-sm">🔍 Inspect Invoice</button>
              <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>₹850 Credit</span>
            </div>
          </div>

          {/* Escalation 3 */}
          <div className="escalation-card priority-low mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-blue">#PEC-2025-041</span>
              <span className="badge badge-gray">Record-Boarder Assigned</span>
              <span className="badge badge-gray">Academic Assessment & Mediation Appeal</span>
              <span style={{ fontSize: 10, color: 'var(--gray-400)', marginLeft: 'auto' }}>Logged: 8 days ago</span>
            </div>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
              Grade 10-JBPhysics Pre-Board Mark Verification & Step-Marking Query
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-600)', marginBottom: 8 }}>
              Parent: Col. Rajesh Mathur (Father of Karan Murthi, Gr-100, JB). Final representation corroborating deliberate marking in Section C Day Civics dimension. Candidate claims parity with CBSE marking theme 2024.
            </div>
            <div className="flex gap-2">
              <button className="btn btn-blue btn-sm">Re-try Mark Sheet</button>
              <button className="btn btn-outline btn-sm">View Report Sheet</button>
              <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Pre-Board Def Not Summed</span>
            </div>
          </div>
          </div>
        </div>

        <div className="grid-2">
          <div>
            {/* Executive Advisory Console */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Executive Advisory & Circular Console</div>
                <div className="card-subtitle">Exec level text Principal direct access to all notification dispatch channels</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Target Audience / Cohort</div>
                <div className="flex gap-2 flex-wrap">
                  {['All Parents/School (Distrib)', 'Faculty Channel', 'Review Docs', 'SeniorPTF Support', 'Circular (PDF)'].map((t, i) => (
                    <button key={i} className="btn btn-ghost btn-xs">{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Rotating Teletype / Official Latest</div>
                <div style={{ padding: 10, background: 'var(--gray-50)', borderRadius: 8, fontSize: 11, color: 'var(--gray-600)' }}>
                  Official Ledger: HOD Annual Consult Board broad reference and infrastructure buffer
                </div>
              </div>
              <div style={{ marginBottom: 10, fontSize: 11 }}>
                <strong>Principal's Formal Communication Memo</strong>
                <div style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-600)' }}>
                  Your Principal on Greenwood High Faculty or Council. Following the principal meeting on the Whitefield where our Transport Floor Director has permanently set email at temp Route #4 at the ECC Road. GPS performance data at Bus Report has been updated in program of in-minutes transport demand response.
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm">Save Draft</button>
                <button className="btn btn-green btn-sm">Seal & Broadcast</button>
              </div>
              </div>
            </div>

            {/* PTM Schedule */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Principal-Parent Bilateral PTM Schedule</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Showing: Thursday 22 March 2026</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              {[
                { time: '10:30 AM – 11:00 AM', room: 'Boardroom 2', parent: 'Mr. R. Ananthakrishnan', topic: '11th Academic Term Finances', note: 'Request for individual and more talk overdue to strong exemplary focus during evening pump terms.', sC: 'green' },
                { time: '02:30 PM – 03:00 PM', room: 'Virtual Online (Zoom)', parent: 'Dr. Malini & Mr. Rao', topic: 'Science Accommodation & Pastoral Committee', note: 'Appointment for review of Special Accommodation + Day Class on day basis status.', sC: 'blue' },
                { time: '04:18 PM – 04:48 PM', room: 'Justice Retd J. S. K. Chair', parent: 'Justice (Retd) J. S. K. Chair', topic: '11th Grade Transfer Review', note: 'Board academic oversight: Transfer and regulations together & sanct-interview at on the interview', sC: 'purple' },
              ].map((ptm, i) => (
                <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: 10, marginBottom: 8, borderTop: `2px solid ${ptm.sC === 'green' ? 'var(--green)' : ptm.sC === 'blue' ? 'var(--blue)' : 'var(--purple)'}` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{ptm.time}</span>
                    <span className="badge badge-gray">{ptm.room}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{ptm.parent}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 4 }}>{ptm.topic}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6 }}>{ptm.note}</div>
                  <div className="flex gap-2">
                    <button className={`btn btn-xs ${ptm.sC === 'green' ? 'btn-green' : ptm.sC === 'blue' ? 'btn-blue' : 'btn-outline'}`}>Confirm Bilateral</button>
                    <button className="btn btn-outline btn-xs">Cover Brief</button>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>

          <div>
            {/* Ombudsman Root-Cause */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Ombudsman Root-Cause Distribution</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>By Data</div>
              </div>
              <div style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Donut chart simulation */}
                <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                  <svg viewBox="0 0 42 42" width="120" height="120">
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#2563eb" strokeWidth="3" strokeDasharray="38 62" strokeDashoffset="0"/>
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#16a34a" strokeWidth="3" strokeDasharray="24 76" strokeDashoffset="-38"/>
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ea580c" strokeWidth="3" strokeDasharray="18 82" strokeDashoffset="-62"/>
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#7c3aed" strokeWidth="3" strokeDasharray="14 86" strokeDashoffset="-80"/>
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#6b7280" strokeWidth="3" strokeDasharray="6 94" strokeDashoffset="-94"/>
                    <text x="21" y="19" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#111827">62</text>
                    <text x="21" y="25" textAnchor="middle" fontSize="3" fill="#6b7280">Cases</text>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  {[
                    { label: 'Transport', pct: 38, c: 'var(--blue)' },
                    { label: 'Fee Lab Access', pct: 24, c: 'var(--green)' },
                    { label: 'Academics', pct: 18, c: 'var(--orange)' },
                    { label: 'Content & Faculty', pct: 14, c: 'var(--purple)' },
                    { label: 'Facility', pct: 6, c: 'var(--gray-400)' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <div className="dot" style={{ background: item.c }}></div>
                      <span style={{ fontSize: 11, flex: 1 }}>{item.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="alert alert-blue mt-3" style={{ fontSize: 11 }}>
                💡 Principal Executive Insight: Transport complaints concentration and transportation route issues count the institutional operational cost by over 38%. Recommend: route allocation workflow and academic route on-request.
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
