export default function ApprovalsLeaves() {
  const auditTrail = [
    {
      agent: 'D.A.V. Veruce', sanction: 'Annual CBSE Science Fee Budget (₹4,100)', fine: 'Grade', step: 'Today, 02:42 AM (Out Of: 52:00 AM)', time: 'Today, 01:24:50 AM', status: 'Sealed & Signed', sC: 'green'
    },
    {
      agent: 'D.A.V. Veruce', sanction: 'CBSE 3rd Moderation Fuel Budget ($150)', fine: 'Safety', step: '04/A1-821', time: 'Today 04:51 PM', status: 'Returned', sC: 'red'
    },
    {
      agent: 'D.A.V. Veruce', sanction: 'Sabbatical Leave Prof. V. Sharma (2 Weeks)', fine: 'Safety', step: 'Gr 10/A', time: 'Yesterday, 11:20 AM', status: 'Sealed & Signed', sC: 'green'
    },
  ]

  return (
    <div>
      <div className="page-meta-bar">
        <span className="tag" style={{ background: 'var(--green-light)', color: 'var(--green-dark)' }}>EXECUTIVE CBSE: G8b</span>
        <span className="tag" style={{ background: 'var(--blue-light)', color: 'var(--blue)' }}>+ B-ESA: 2024-2025</span>
        <span style={{ color: 'var(--gray-500)' }}>Desk AY date 03:07 — Executive CBSE 2024</span>
      </div>
      <div className="page-inner">
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h1 className="page-title">Executive Sanctions & Institutional Leave Desk</h1>
              <p className="page-title-sub">Sovereignty-authenticated workflow space of Director & Principal Dr. Eleanor Varce. Reviews and approves sanctions to approvals, authorizations, institutional digital seals, and clear CBSE obligations.</p>
            </div>
            <div className="page-actions">
              <button className="btn btn-orange">🔏 Affix Digital-Seal Chain Approval</button>
              <button className="btn btn-outline">📋 Sanctions Ledger</button>
              <button className="btn btn-outline">Leave Dashbx</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Awaiting Signature</div>
            <div className="stat-value" style={{ color: 'var(--red)' }}>6</div>
            <div className="stat-badge stat-badge-red">3 High Priority</div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Transport: 2, Exams: 1, Finance: 2, Plans: 1</div>
            <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>Endorsed Balance: Review Items</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Clearances Processed (YTD)</div>
            <div className="stat-value">148</div>
            <div className="stat-badge stat-badge-blue">100% within digital QQ</div>
            <div className="stat-sub">Totalised from: 98.2 flow. 38 Delay Hours: 36 5 Days</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Term Leave Processed</div>
            <div className="stat-value">3.2<span style={{ fontSize: 14 }}> hrs</span></div>
            <div className="stat-badge stat-badge-green">71-vs-3h Min SLA</div>
            <div className="stat-sub">High-Volume average. 88.4% SLAs. 5-Days Large: 1</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Statutory Compliance</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>100%</div>
            <div className="stat-badge stat-badge-green">Confirmed on file across all leaves</div>
            <div className="stat-sub">Coverage audit. 7 audit checks passed</div>
          </div>
        </div>

        {/* Executive Sanctions Ledger */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Executive Sanctions Ledger</div>
            <div className="card-subtitle">Strict access institutional only. In the sanction log permanently by Principal Dr. Eleanor Varce</div>
            <select className="btn btn-outline btn-sm" style={{ marginLeft: 'auto' }}>
              <option>Categorized Review ▼</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Faculty On-Duty Academic Leave */}
            <div className="sanction-item" style={{ borderTop: '3px solid var(--blue)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-blue">Faculty On-Duty Academic Leave</span>
                <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>Pending</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar avatar-blue" style={{ width: 30, height: 30, fontSize: 10 }}>NT</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>Dr. Nandita Roy</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>CBSE Section 12 • Institutional Regulation</div>
                </div>
              </div>
              <div style={{ fontSize: 11, marginBottom: 4 }}><strong>Purpose:</strong> Chief Jury Chairperson • Class Connection Limits • 27 - 28 (Academic term)</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 6 }}>
                CBSE Delegation: Assigned to Key Committee on CBSE in Assignment. 14 Day Actual Normal Retention
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-500)', marginBottom: 4 }}>HOD Enrollment</div>
                <div className="flex gap-2">
                  <span className="badge badge-gray">Delivery</span>
                  <span className="badge badge-gray">No Class</span>
                  <span className="badge badge-gray">Accounts</span>
                  <span className="badge badge-gray">Improved A Retained</span>
                </div>
              </div>
              <button className="btn btn-blue btn-sm w-full">Affix Digital Seal & Issue TC</button>
            </div>

            {/* Student Official TC */}
            <div className="sanction-item" style={{ borderTop: '3px solid var(--orange)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-orange">Student Official TC & Matriculation</span>
                <span className="badge badge-red" style={{ marginLeft: 'auto' }}>Immediate</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="avatar avatar-orange" style={{ width: 30, height: 30, fontSize: 9 }}>AS</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>Aarav Aryan Singhania</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>CBSE Section 13: Force Figurement & Record-Seal</div>
                </div>
              </div>
              <div style={{ fontSize: 11, marginBottom: 8 }}>
                Appointment for TC: 23:41:20 AM A-6 Appointment Point 30/20:1.21.22 Principal-on-Form CBSE Affiliation Clearance and TC 4A-P-078
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 4, marginBottom: 8 }}>
                {['Library', 'Learntimes', 'Accounts', 'Eligibility/Clearance'].map((c, i) => (
                  <div key={i} style={{ padding: '4px 6px', background: 'var(--gray-50)', borderRadius: 4, fontSize: 9, textAlign: 'center' }}>{c}</div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', marginBottom: 6 }}>
                Statutory TC Clearance: B2B Immediate: 2025-26. View TC Vault Archive
              </div>
              <button className="btn btn-orange btn-sm w-full">Affix Digital Seal & Issue TC</button>
            </div>

            {/* Emergency Float */}
            <div className="sanction-item" style={{ borderTop: '3px solid var(--red)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-red">Emergency Float & Imprest Sanction</span>
                <span className="badge badge-orange" style={{ marginLeft: 'auto' }}>Aut Float</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Institutional Binary of Summary Interventions Term 1</div>
              <div style={{ fontWeight: 700, fontSize: 11, color: 'var(--orange)' }}>VENDOR RPP #83, #92</div>
              <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--red)', margin: '6px 0' }}>₹1,200.00</div>
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 2 }}>Invocation: Nutrition Proceduror Kit: Bus Transport Reserves (₹-805-700: ₹150-200 & 50 monthly)</div>
              <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Sent from High-School Operations</div>
              <button className="btn btn-red btn-sm">🚨 Authorize Outflow</button>
            </div>

            {/* CBSE Center Layout */}
            <div className="sanction-item" style={{ borderTop: '3px solid var(--purple)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-purple">CBSE Center Layout & Seating Matrix</span>
                <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Event Matrix</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Center #4402 Seating-Plan Finalization</div>
              <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 6 }}>
                380 effective candidates (Physics & Chemistry), inauguration matrix: 124 compliance-12 No. Halls. Center Supervisor Rooms Ready.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8, fontSize: 10 }}>
                <div style={{ padding: 6, background: 'var(--gray-50)', borderRadius: 6 }}>
                  <div style={{ color: 'var(--gray-400)' }}>CCV-Sync: Ready</div>
                  <div style={{ fontWeight: 600 }}>1.0m Gap Compliant</div>
                </div>
                <div style={{ padding: 6, background: 'var(--gray-50)', borderRadius: 6 }}>
                  <div style={{ color: 'var(--gray-400)' }}>Center Agent Verified</div>
                  <div style={{ fontWeight: 600 }}>Inspection: 98 Hours</div>
                </div>
              </div>
              <button className="btn btn-purple btn-sm w-full">✅ Approve a Center Plan</button>
            </div>
          </div>
        </div>

        <div className="grid-2">
          {/* Student Medical & Convalescence */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Student Medical & Convalescence Authorizations</div>
                <div className="card-subtitle">Formal leave measures for academic convalescence in students with day in-patient or day clinical visit</div>
              </div>
              <span className="badge badge-blue">3 Pending For Doctors Clearance</span>
            </div>
            {[
              {
                init: 'MK', name: 'Meena Krishnan', cls: 'Class 6-C-Plt • First Three Wanst MBBS',
                dx: 'Acute Appendicitis Recovery (4-Day Recovery), Infirmary: In-Charge Now',
                doc: 'Dr. J. Darmikar, MD Cleared',
                action1: 'Review Doctor Notes', action2: 'Download medically Apt', authorize: 'Authorize Convalescence',
                c: 'red',
              },
              {
                init: 'TD', name: 'Tamim Dashinski', cls: 'Grade 8-C • PatHome: 5 days Business',
                dx: 'Dental Rectox: Hairline Fracture 2 Day Pending, Dental Rectox Infirmary 4:24:47 AM',
                doc: 'Apollo for Academic Term for Relief Test',
                action1: 'Review Doctor Notes', action2: 'Order', authorize: 'Authorize Convalescence',
                c: 'orange',
              },
            ].map((s, i) => (
              <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar" style={{ background: s.c === 'red' ? 'var(--red-light)' : 'var(--orange-light)', color: s.c === 'red' ? 'var(--red)' : 'var(--orange)' }}>{s.init}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{s.cls}</div>
                  </div>
                  <span className={`badge ${s.c === 'red' ? 'badge-red' : 'badge-orange'}`}>{s.c === 'red' ? 'Post-Surgery' : 'In-Hospitals'}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 4 }}>{s.dx}</div>
                <div style={{ fontSize: 11, marginBottom: 6 }}><strong>Clinical Diagnosis by:</strong> {s.doc}</div>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-xs">{s.action1}</button>
                  <button className="btn btn-outline btn-xs">{s.action2}</button>
                  <button className={`btn btn-xs ${s.c === 'red' ? 'btn-red' : 'btn-orange'}`} style={{ marginLeft: 'auto' }}>{s.authorize}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Cryptographic Ledger */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Cryptographic Ledger & Audit Trail</div>
              <div className="card-subtitle">Immutable audit sanctions from institutional sanctions (cryptosanctioning use)</div>
              <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Ledger Synced Sec</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Sanction Agent</th>
                    <th>Sanction Title & Fine</th>
                    <th>Case Ref</th>
                    <th>Timestamp</th>
                    <th>Executive Sign</th>
                    <th>Status (Seal)</th>
                  </tr>
                </thead>
                <tbody>
                  {auditTrail.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 11 }}>{row.agent}</td>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{row.sanction}</div>
                        <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Grade: {row.fine}</div>
                      </td>
                      <td style={{ fontSize: 11, color: 'var(--gray-500)' }}>{row.step}</td>
                      <td style={{ fontSize: 11 }}>{row.time}</td>
                      <td style={{ fontSize: 11 }}>Digitally Signed</td>
                      <td>
                        <span className={`badge ${row.sC === 'green' ? 'badge-green' : 'badge-red'}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 8 }}>
              ⚡ DHC, DIG Consulting centralized in centralized sync audit to the GSO Pay CBSE Major ERP.
              <br />Transport Common Cryptographic Ledgers (CFV-FBF): A
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
