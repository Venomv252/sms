import React, { useState } from 'react';
import {
  ChevronRight, Download, FileText, CheckCircle2,
  Shield, AlertCircle, Clock, TrendingUp, TrendingDown, Eye
} from 'lucide-react';

const incomeItems = [
  { category: 'Academic & School\nTuition Fee\n(International &\nDomestic)', fy2425: '₹14,50,300,000', fy2324: '₹13,20,311,000', variance: '+10%', varClass: 'num-green' },
  { category: 'Student Fleet\nTransportation &\nFacility Charges', fy2425: '₹1,41,61,000', fy2324: '₹1,43,110,000', variance: '-1.0%', varClass: 'num-red' },
  { category: 'CBSE\nAcademic\nEnrolment &\nConsumables', fy2425: '₹99,84,000', fy2324: '₹1,44,310,000', variance: '-31.0%', varClass: 'num-red' },
  { category: 'Other\n(Includes Club,\nAssociation Hub\nBinding, Misc.)', fy2425: '₹4,42,000', fy2324: '₹1,02,050', variance: '+74%', varClass: 'num-green' },
];

const expenseItems = [
  { category: 'Faculty & Staff\nCompensation\nComponent &\nMiscellaneous', fy2425: '₹8,65,06,480', fy2324: '₹8,00,22,000', variance: '+8%', varClass: 'num-red' },
  { category: 'Campus Asset\nMaintenance &\nInstitutional\nOverheads', fy2425: '₹20,24,11,480', fy2324: '₹19,10,22,000', variance: '+5.9%', varClass: 'num-red' },
  { category: 'Direct\nStatutory\nAffiliations &\nConsumables', fy2425: '₹99,80,160', fy2324: '₹94,22,000', variance: '+6.0%', varClass: 'num-red' },
  { category: 'Depreciation on\nScience, Art,<br />Design, Media\nStudios', fy2425: '₹98,20,480', fy2324: '₹94,05,000', variance: '+4.5%', varClass: 'num-red' },
  { category: 'CBSE\nFinancial-Leg\nDeposits &\nFinance Audit', fy2425: '₹44,37,250', fy2324: '₹40,37,000', variance: '+10%', varClass: 'num-red' },
  { category: 'Depreciation on\nSchool-Day\nBuilding &<br />Non-Movable...', fy2425: '₹1,61,20,680', fy2324: '₹1,32,20,000', variance: '+22%', varClass: 'num-red' },
  { category: 'CBSE\nAccreditation,\nAudit &\nPlatform Audit', fy2425: '₹44,37,250', fy2324: '₹40,19,000', variance: '+10%', varClass: 'num-red' },
];

export default function FinancialStatements() {
  const [activeTab, setActiveTab] = useState('P&L');

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Financial Statements &amp; Audit</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item">P&amp;L + Balance Sheet + MCA</span>
      </div>

      <div className="page-inner">
        {/* Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Institutional Financial Statements &amp; Statutory Audit Numbers</h1>
          </div>
          <div className="page-header-actions">
            <span className="badge badge-green">BRS / GL / MCA</span>
            <button className="btn btn-outline btn-sm"><Download size={13} /> Export Financial Snapshot</button>
            <button className="btn btn-success btn-sm"><Shield size={13} /> Forward Statutory Audit Committee</button>
          </div>
        </div>

        {/* Period stats */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span className="badge badge-blue">Statutory Period Booking</span>
          <span className="badge badge-green">Financial Year 2024–25 (Apr 2024–Mar 2025)</span>
          <span className="badge badge-gray">FY 2023–24 (Comparative)</span>
        </div>

        {/* Summary Stats */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card good">
            <div className="stat-label">TOTAL INSTITUTIONAL INCOME</div>
            <div className="stat-value">₹18,45,80</div>
            <div className="stat-sub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={11} color="var(--success)" />
              <span className="stat-change stat-change-up">+8.2% vs FY24</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">LICENSED GROSS EXPENDITURE</div>
            <div className="stat-value">₹14,62,40</div>
            <div className="stat-sub" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <TrendingUp size={11} color="var(--danger)" />
              <span className="stat-change stat-change-down">+6.1% increase</span>
            </div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">TOTAL OPERATING SURPLUS</div>
            <div className="stat-value">₹3,83,40</div>
            <div className="stat-sub">Operating Margin 20.8%</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">LATEST ACADEMIC FUND</div>
            <div className="stat-value">₹42,50,000</div>
            <div className="stat-sub">CBSE Trust Reserve &amp; Fund Corpus</div>
          </div>
        </div>

        {/* P&L Statement */}
        <div className="card section">
          <div className="card-header">
            <h3>Vision &amp; Reportable State Statement</h3>
            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>
              Final comparative FY 2024–25 vs FY 2023–24 for the Period Feb 2025
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>FOR AN INSTITUTIONAL PAYMENTS</th>
                  <th>SCHEDULE/G</th>
                  <th>FY'24-25</th>
                  <th>FY'23-24</th>
                  <th>VARIANCE (%)</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ background: 'var(--primary-light)', padding: '8px 12px', fontWeight: 700, fontSize: 12, color: 'var(--primary)' }}>
                    A. INSTITUTIONAL INCOME (REVENUE)
                  </td>
                </tr>
                {incomeItems.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 11, whiteSpace: 'pre-line' }}>{item.category}</td>
                    <td style={{ fontSize: 11 }}>—</td>
                    <td style={{ fontWeight: 700 }}>{item.fy2425}</td>
                    <td style={{ fontWeight: 600, color: 'var(--gray-500)' }}>{item.fy2324}</td>
                    <td style={{ fontWeight: 700 }} className={item.varClass}>{item.variance}</td>
                    <td><span className="pill pill-green">Verified</span></td>
                  </tr>
                ))}
                <tr style={{ background: 'var(--success-light)' }}>
                  <td style={{ fontWeight: 700, fontSize: 12 }}>Total Operational Income (A)</td>
                  <td></td>
                  <td style={{ fontWeight: 800, fontSize: 14, color: 'var(--success)' }}>₹18,45,80,000</td>
                  <td style={{ fontWeight: 700, color: 'var(--gray-500)' }}>₹15,80,80,000</td>
                  <td style={{ fontWeight: 700, color: 'var(--success)' }}>+17.0%</td>
                  <td><span className="pill pill-green">Verified</span></td>
                </tr>
                <tr>
                  <td colSpan={6} style={{ background: 'var(--danger-light)', padding: '8px 12px', fontWeight: 700, fontSize: 12, color: 'var(--danger)' }}>
                    B. INSTITUTIONAL EXPENDITURES (B)
                  </td>
                </tr>
                {expenseItems.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 11, whiteSpace: 'pre-line' }}>{item.category}</td>
                    <td style={{ fontSize: 11 }}>—</td>
                    <td style={{ fontWeight: 700 }}>{item.fy2425}</td>
                    <td style={{ fontWeight: 600, color: 'var(--gray-500)' }}>{item.fy2324}</td>
                    <td style={{ fontWeight: 700 }} className={item.varClass}>{item.variance}</td>
                    <td><span className="pill pill-green">Audited</span></td>
                  </tr>
                ))}
                <tr style={{ background: 'var(--danger-light)' }}>
                  <td style={{ fontWeight: 700, fontSize: 12 }}>Total Gross Expenditures (B)</td>
                  <td></td>
                  <td style={{ fontWeight: 800, fontSize: 14, color: 'var(--danger)' }}>₹14,62,40,000</td>
                  <td style={{ fontWeight: 700, color: 'var(--gray-500)' }}>₹15,20,10,000</td>
                  <td style={{ fontWeight: 700, color: 'var(--success)' }}>-3.8%</td>
                  <td><span className="pill pill-green">Audited</span></td>
                </tr>
                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                  <td style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>Net Institutional Surplus/Deficit (A–B)</td>
                  <td></td>
                  <td style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>₹3,83,40,000</td>
                  <td style={{ fontWeight: 700, color: '#cde0ff' }}>₹2,17,90,000</td>
                  <td style={{ fontWeight: 700, color: '#a3e3a3' }}>+22.84% (Marginal Reserve)</td>
                  <td><span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600 }}>Confirmed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Balance Sheet */}
        <div className="card section">
          <div className="card-header">
            <h3>Audited Balance Sheet &amp; Fiscal Capital Position</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-sm"><Eye size={13} /> View Full Balance Sheet</button>
              <button className="btn btn-primary btn-sm">Create Drop-Down Year Comparative</button>
            </div>
          </div>
          <div className="grid-2" style={{ gap: 16 }}>
            <div className="card-body">
              <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Liabilities &amp; Trust Funds</h4>
              {[
                { label: 'Deposit /Statement Pool', amount: '₹20,00,00,000' },
                { label: 'Infrastructure Campus Building Loan (Greenwood Foundation)', amount: '₹8,19,00,000' },
                { label: 'Grantor Grants &amp; Grants Source', amount: '₹20,90,00,000' },
                { label: 'Subsidiary Liability &amp; Comply Comms', amount: '₹1,1,00,000' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.amount}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontWeight: 700, fontSize: 13 }}>
                <span>Total Liabilities &amp; Trust Fund</span>
                <span>₹40,40,00,000</span>
              </div>
            </div>
            <div className="card-body" style={{ borderLeft: '1px solid var(--gray-200)' }}>
              <h4 style={{ fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Assets &amp; Capital Deployments</h4>
              {[
                { label: 'Institutional Fixed Assets Net (After Dep)', amount: '₹20,38,98,180' },
                { label: 'Govt. Trust Deposits &amp; Deferring Systems', amount: '₹9,78,30,000' },
                { label: 'Staff Bank Balances (+ Liquid Inventory)', amount: '₹2,74,00,000' },
                { label: 'Saving Stock &amp; Inventory Comms', amount: '₹38,00,000' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.amount}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontWeight: 700, fontSize: 13 }}>
                <span>Total Assets &amp; Deployments</span>
                <span>₹40,40,00,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Matrix */}
        <div className="card section">
          <div className="card-header">
            <h3>Statutory Compliance &amp; Charitable Trust Verification Matrix</h3>
            <span className="badge badge-green">5/5 COMPLIANT AUDITS</span>
          </div>
          <div className="grid-2" style={{ gap: 16, padding: 16 }}>
            {[
              { title: '80% Appropriation Allowance', sub: '80% Appropriation Test of Income as per IT act applicable for compliance as per CBSE Affiliate Byers Rules — The Calculation Target: 80% of Income', status: 'Completed', statusClass: 'pill-green', note: 'Target: ₹14.76 Cr met' },
              { title: 'CBSE Exam/Conduct-Form Signing', sub: "CBSE's Inspection of Section (1-2 of 94/5 of PCL's board), Exam Date — Assessment of 2024-25 in the Institutional Register", status: 'With Board Final', statusClass: 'pill-blue', note: 'GW-F-24-D / CFO Bursar' },
              { title: 'From Trust Physical Register', sub: 'CBSE Trust Register - Accounts in physical records to create per institutional records', status: 'Fully Up-to-date', statusClass: 'pill-green', note: '' },
              { title: 'Intermonth Committee Review', sub: 'CBSE Instruction – Board-Committee Meeting of both Sub and Internal Audit for all Finance and Education', status: 'In Progress', statusClass: 'pill-yellow', note: '4 Pending Progress' },
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid var(--gray-200)', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{item.title}</div>
                  <span className={`pill ${item.statusClass}`}>{item.status}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>{item.sub}</div>
                {item.note && <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{item.note}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Key Ledger Clearances */}
        <div className="card">
          <div className="card-header">
            <h3>Dual-Key Administrative Clearances &amp; Ledger Locking</h3>
          </div>
          <div style={{ display: 'flex', gap: 16, padding: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'BOOKS SEALING COMPLETED', status: 'Locked 14 Feb', statusClass: 'pill-green', icon: '🔒' },
              { label: 'BOOKS-END SEALED', status: 'Locked 21 Feb', statusClass: 'pill-green', icon: '🔒' },
              { label: 'Canvas/Books (IRQ)', status: '3 Working Days Remaining', statusClass: 'pill-yellow', icon: '⏳' },
            ].map((item, i) => (
              <div key={i} style={{ flex: '1 1 200px', background: 'var(--gray-50)', borderRadius: 8, padding: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{item.label}</div>
                  <span className={`pill ${item.statusClass}`} style={{ marginTop: 4 }}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid var(--gray-200)', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>✓ FY 2024-25 Closure: Ledger Locking Completed</span>
            <button className="btn btn-primary btn-sm">Finalize FY 2024–25 Ledger</button>
          </div>
        </div>
      </div>
    </div>
  );
}
