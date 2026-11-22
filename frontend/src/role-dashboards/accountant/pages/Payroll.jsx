import React, { useState } from 'react';
import {
  ChevronRight, Download, FileText, CheckCircle2,
  Clock, AlertCircle, Users, Cpu, Shield, ChevronLeft, MoreHorizontal
} from 'lucide-react';

const employees = [
  { initials: 'AC', name: 'Dr. Akhtar Irani', designation: 'HOD Department. Regul Faculty', dept: 'EXP-1204 × Regular Faculty', basePay: '₹62,080', allowances: '+₹12,080', biometric: '0 LOP', pf: '₹12,080', tds: '₹11,200', net: '₹80,320', color: 'avatar-blue' },
  { initials: 'NR', name: 'Dr. Nandita Roy', designation: 'Senior Chemistry HOD, Dept. of Science', dept: 'EXP-2254 × Senior PGT', basePay: '₹86,080', allowances: '+₹10,080', biometric: '0 Dy Duty', pf: '₹11,958', tds: '₹9,190', net: '₹76,740', color: 'avatar-green' },
  { initials: 'RS', name: 'Mr. Rajnit Sen', designation: 'TGT Computer Science', dept: 'GMP-C254 × Senior PGT', basePay: '₹64,080', allowances: '+₹5,980', biometric: '0 LOP', pf: '₹6,498', tds: '₹1,200', net: '₹59,160', color: 'avatar-blue' },
  { initials: 'CD', name: 'Ms. Charu Davis', designation: 'TGT Group English Dept. of Languages', dept: 'EXP-2024 × Pooi Faculty', basePay: '₹58,080', allowances: '-₹7,080', biometric: '-21,553.0 (LOP)', pf: '₹7,518', tds: '₹3,196', net: '₹52,399', color: 'avatar-purple', alert: true },
  { initials: 'SB', name: 'Ramesh Babu', designation: 'Senior Bus Driver Motor Pool Driver Fleet Loc RI', dept: 'EXP-2014 × Pooi Faculty', basePay: '₹32,080', allowances: '+₹4,560', biometric: '0 LOP', pf: '₹6,498', tds: 'Exempt', net: '₹32,120', color: 'avatar-green' },
  { initials: 'SM', name: 'S. Murthy', designation: 'Senior Accounts Clerk Bursar Office', dept: 'GMP-O012 × Finance Staff', basePay: '₹26,080', allowances: '+₹4,080', biometric: '0 LOP', pf: '₹6,848', tds: '₹1,200', net: '₹35,760', color: 'avatar-blue' },
];

const statDeductions = [
  {
    title: 'Income Tax Sec 192 TDS', sub: 'CBDT Corporate TAN: GU80G01422A', amount: '₹4,82,000',
    detail: 'Total Tax Withheld: ₹3146 2 Major Periodic Code; Invoice #991', status: 'Completed', statusClass: 'pill-green'
  },
  {
    title: "Employees' Provident Fund", sub: 'EPFO Estb Code: GS(NG/24/929/18260', amount: '₹51,2409',
    detail: "Employee (12% Pool) ₹ 51,2409; Admin Fees (0.5%): ₹17,716; UAN concordance 100.0% (96/96 Rate)", status: 'Validated', statusClass: 'pill-green'
  },
  {
    title: 'ESI Statutory Remittance', sub: 'ESIC Code: 02000212100001000001', amount: '₹38,400',
    detail: "Eligible Staff: 48 Transport & Ancillary; Employee Deduction (1.75%): ₹7,300; Employer (3.25%): ₹61,700", status: 'Ready', statusClass: 'pill-blue'
  },
];

export default function Payroll() {
  const [activeTab, setActiveTab] = useState('All Staff (190)');
  const tabs = ['All Staff (190)', 'PGT/TGT Faculty (95)', 'Primary & PRT (46)', 'Admin & Lab (20)', 'Ancillary & Transport (29)'];

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item">Payroll &amp; Staff Disbursements</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">PAYROLL CYCLE: FEB 2025</span>
      </div>

      <div className="page-inner">
        {/* Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span className="badge badge-blue">CENTRAL TREASURY TERMINAL</span>
              <span className="badge badge-green">CBSE Form V Compliance</span>
            </div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Institutional Faculty &amp; Staff Payroll Console</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              Monthly salary disbursement for ongoing, biometric attendance deductions, Section 192/125 compliance, PF/ESI withholding, and direct NEFT bank batch transfers.
            </div>
          </div>
          <div className="page-header-actions">
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--gray-700)' }}>C. Ramanathan (BMC Key Active: #GW-CFO-P921)</span>
            <button className="btn btn-outline btn-sm">Biometric Sync</button>
            <button className="btn btn-outline btn-sm"><Download size={13} /> Slips &amp; Form 16</button>
            <button className="btn btn-outline btn-sm">PP/TIS Report</button>
            <button className="btn btn-primary btn-sm">Execute NEFT Batch</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card good">
            <div className="stat-label"><Users size={12} /> GROSS MONTHLY BILL</div>
            <div className="stat-value">₹24,85,000</div>
            <div className="stat-sub">
              <span className="badge badge-blue">90 Staff</span>
              <span style={{ marginLeft: 4 }}>43 Faculty + 11 Support</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap', fontSize: 10, color: 'var(--gray-500)' }}>
              <span>Gross Allowances +₹1 M&lt;Ajt</span>
            </div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">NET BANK OUTFLOW</div>
            <div className="stat-value">₹18,50,400</div>
            <div className="stat-sub">Scheduled: Feb 28, 2025</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Settlement Channel: HDFC Corporate A/C •</div>
          </div>
          <div className="stat-card warn">
            <div className="stat-label">STATUTORY WITHHOLDINGS</div>
            <div className="stat-value">₹6,73,000</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="tag tag-blue">TDS ₹4.82 L</span>
              <span className="tag tag-blue">PF ₹51.22 L</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>ESI Pool Fund •</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">BIOMETRIC CONCORDANCE</div>
            <div className="stat-value">99.4%</div>
            <div style={{ marginTop: 4 }}><span className="badge badge-green">Verified</span></div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap', fontSize: 10, color: 'var(--gray-500)' }}>
              <span>6 LOP Unpaid Leaves ct</span>
            </div>
          </div>
        </div>

        {/* Payroll Authorization Pipeline */}
        <div className="card section">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                DUAL-KEY GOVERNANCE PROTOCOL — Batch #GW-PAY-2025-028
              </div>
              <h3>Payroll Authorization Pipeline &amp; Sign-off Verification</h3>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="badge badge-blue">DSC KEY VERIFIED</span>
              <span className="badge badge-green">Hardware Token Connected</span>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 12 }}>
                  The dual-signature process includes Human Resources Director and Principal. All Principals have confirmed records. Final bank upload requires Bursar's Class-3DSC Cryptopoint: is Active
                </div>
                {/* Steps */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[
                    { num: '01', label: 'Attendance Log', sub: 'Locked 26-Feb', done: true },
                    { num: '02', label: 'Overtime TDS', sub: 'Audited (97.8%)', done: true },
                    { num: '03', label: 'TDS / PF & Allow...', sub: 'Verified (96.7%)', done: true },
                    { num: '04', label: 'Bursar DSC Sign', sub: 'Pending Busur Review', active: true },
                    { num: '05', label: 'HDFC-NEFT Push', sub: 'Post-auth Pending to Post', disabled: true },
                  ].map((step, i) => (
                    <div key={i} style={{
                      flex: '1 1 80px', background: step.active ? 'var(--warning-light)' : step.done ? 'var(--success-light)' : 'var(--gray-100)',
                      borderRadius: 8, padding: '8px 10px', textAlign: 'center',
                      border: `1px solid ${step.active ? '#f59e0b' : step.done ? 'var(--success)' : 'var(--gray-200)'}`,
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: step.active ? 'var(--warning)' : step.done ? 'var(--success)' : 'var(--gray-400)' }}>{step.num}</div>
                      <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{step.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 1 }}>{step.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: 260, flexShrink: 0 }}>
                <div style={{ background: 'var(--gray-50)', borderRadius: 10, padding: 14, border: '1px solid var(--gray-200)' }}>
                  <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>
                    eFees2031Aru (eFP9 146–27 Cert ID: OCG Bursar-Greenwood 01)
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 11 }}>Disbursement Value:</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>₹18,50,400</span>
                  </div>
                  <button className="btn btn-success" style={{ width: '100%', justifyContent: 'center', marginBottom: 8 }}>
                    <Shield size={13} /> Authorize &amp; Sign Salary Batch with Token
                  </button>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)', textAlign: 'center' }}>
                    🔐 Encrypted with SHA-256 &amp; HSM Protocol
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + Employee Table */}
        <div className="card section">
          <div className="card-header">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tabs.map(t => (
                <button key={t} className={`scroll-tab ${activeTab === t ? 'active' : ''}`} style={{ fontSize: 10 }} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div className="search-bar">
                <Search className="search-icon" size={13} />
                <input className="input" style={{ width: 180 }} placeholder="Search staff by ID, name, PAN" />
              </div>
              <button className="btn btn-outline btn-xs"><Download size={11} /></button>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>EMPLOYEE INFO</th>
                  <th>DESIGNATION</th>
                  <th>BASE PAY</th>
                  <th>ALLOWANCES</th>
                  <th>BIOMETRIC LOP</th>
                  <th>PF (9%)</th>
                  <th>TDS (192)</th>
                  <th>NET PAYABLE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e, i) => (
                  <tr key={i} style={{ background: e.alert ? 'var(--danger-light)' : 'transparent' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className={`avatar ${e.color}`} style={{ width: 32, height: 32, fontSize: 11 }}>{e.initials}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 12 }}>{e.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{e.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 11 }}>{e.designation}</td>
                    <td style={{ fontWeight: 600 }}>{e.basePay}</td>
                    <td style={{ fontWeight: 600, color: e.allowances.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{e.allowances}</td>
                    <td style={{ fontSize: 11, color: e.biometric.includes('LOP') && !e.biometric.startsWith('0') ? 'var(--danger)' : 'var(--gray-700)' }}>{e.biometric}</td>
                    <td style={{ fontWeight: 600 }}>{e.pf}</td>
                    <td style={{ fontWeight: 600 }}>{e.tds}</td>
                    <td style={{ fontWeight: 700, fontSize: 13 }}>{e.net}</td>
                    <td><button className="btn btn-outline btn-xs"><MoreHorizontal size={11} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing of 19 records • Batch Hash: #2813F-2025/03-GREENWOOD</span>
            <div className="pagination-pages">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span style={{ fontSize: 11, padding: '0 4px' }}>...</span>
              <button className="page-btn">32</button>
            </div>
          </div>
        </div>

        {/* Statutory Deductions */}
        <div style={{ marginBottom: 12 }}>
          <div className="section-title">Statutory Deductions &amp; Electronic Returns</div>
        </div>
        <div className="grid-3" style={{ marginBottom: 16 }}>
          {statDeductions.map((d, i) => (
            <div key={i} className="card">
              <div className="card-header">
                <h3>{d.title}</h3>
                <span className={`pill ${d.statusClass}`}>{d.status}</span>
              </div>
              <div className="card-body">
                <div style={{ fontSize: 10, color: 'var(--gray-500)', marginBottom: 4 }}>{d.sub}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{d.amount}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>{d.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="card">
          <div className="card-body" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <button className="btn btn-outline"><Download size={13} /> Download Challan 281P&amp;L &amp; 24Q Batch</button>
            <button className="btn btn-outline"><FileText size={13} /> Generate to Unified EPFO PCR File</button>
            <button className="btn btn-outline"><Download size={13} /> Export ESIC Monthly Return</button>
            <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>
              Greenwood High Finance Module confirming to CBSE Affiliation Byvers Clause 3, Rule 13 (Salary Payroll with 7th OFC)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Search(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
