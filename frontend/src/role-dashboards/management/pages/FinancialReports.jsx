import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Upload, Download, FileText, CheckCircle } from 'lucide-react';

const incomeData = [
  { name: 'Tuition Fees & Term Invoicing', amt: 4600000, type: 'income' },
  { name: 'Bus Exam & Transportation Levy', amt: 420000, type: 'income' },
  { name: 'Laboratory Sports & Exam Fees', amt: 140000, type: 'income' },
  { name: 'Endowments & Educational Grants', amt: 80000, type: 'income' },
];

const expenditureData = [
  { name: 'Academic Faculty Salaries (41% of receipts)', amt: 2180000, pct: '41.8%' },
  { name: 'Support & Admin Payroll', amt: 680000, pct: '13.0%' },
  { name: 'Campus Civil & Building Maintenance', amt: 160000, pct: '3.0%' },
  { name: 'Bus Fleet Diesel & Insurance 7.3%', amt: 380000, pct: '7.3%' },
  { name: 'Books, Uniforms, Lab & Server Cloud', amt: 310000, pct: '5.9%' },
  { name: 'Depreciation on Fixed Assets & Labs', amt: 220000, pct: '4.2%' },
];

const quarterlyTDS = [
  { q: 'Q1 Jan', tds: 59000, paid: true },
  { q: 'Q2 Apr', tds: 57000, paid: true },
  { q: 'Q3 Jun', tds: 57000, paid: true },
  { q: 'Q4 Oct', tds: 57000, paid: true },
];

const tdsForms = [
  { form: 'TDS Contractors (Sec 194C)', no: 'Form 269 Filed', badge: 'badge-green' },
  { form: 'TCS Form (Sec M)', no: '(SEC M)', badge: 'badge-gray' },
];

const auditorNotes = [
  { item: 'Section 11/12 Exemption Eligible', val: 'No Tax Liability', icon: '✅' },
  { item: 'No Penaltis vs 2148/0', val: 'Settled', icon: '✅' },
  { item: 'Received other 0 Discrepancy', val: '', icon: '✅' },
];

const pieData = [
  { name: 'Operational Payroll & Lab', value: 290, color: '#0ea5e9' },
  { name: 'Building Sinking Fund (Capex)', value: 90, color: '#16a34a' },
];

export default function FinancialReports() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Finance & Operations</span> <span>›</span>
        <span>ITR & Financial Reports</span>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        <span className="badge badge-gray" style={{ fontSize: 11, padding: '3px 10px' }}>STATUTORY AUDIT & INCOME TAX COMPLIANCE</span>
        <span className="badge badge-gray">CONSOUR • FY 2024–26 (JAN 29 JAY 2025–26)</span>
      </div>

      <h1 className="page-title mb-2">ITR-7 Statutory Filings,<br />Balance Sheet &<br />Audited Financial Reports</h1>
      <p className="page-desc mb-3">Trustee financial disclosures, Section 12A/80G charitable exemptions, GST reconciliation (GSTR-1& 3B), and annual institutional balance sheet.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Upload size={11} /> Upload CA Signed Report (3CD)</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Download Form ITR/FORM</button>
        <button className="btn btn-secondary btn-sm">Export Balance Sheet</button>
        <button className="btn btn-primary btn-sm">File Advance</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-5 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Gross Revenue</div>
          <div className="stat-card-value">₹5,240,000</div>
          <div className="stat-card-sub"><span className="badge badge-green">100% Accounted</span></div>
          <div className="stat-card-sub text-xs text-muted">Tuition ₹4.6 • Transport ₹420 • Misc ₹220k</div>
          <div className="stat-card-sub text-xs text-muted">Auditors 18 17. Verified ✓</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Charitable Exemption</div>
          <div className="stat-card-value text-green">100% Compliant</div>
          <div className="stat-card-sub"><span className="badge badge-green">86% Applied</span></div>
          <div className="stat-card-sub text-xs text-muted">₹4,466,000 applied to educational objectives</div>
          <div className="stat-card-sub text-xs text-muted">Direct Section 12A: 0 Tax Exemption</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Advance Tax Paid</div>
          <div className="stat-card-value">₹1,48,000</div>
          <div className="stat-card-sub"><span className="badge badge-green">Q1–Q4 Cleared</span></div>
          <div className="stat-card-sub text-xs text-muted">All 4 instalments cleared (Challan ITD-250)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">GST Input (ITC)</div>
          <div className="stat-card-value">₹68,450</div>
          <div className="stat-card-sub"><span className="badge badge-blue">GSTR-2B Matched</span></div>
          <div className="stat-card-sub text-xs text-muted">Reconciled on computers, diesel & labs</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">ITR Filing Status</div>
          <div className="stat-card-value text-green">Filed ✓</div>
          <div className="stat-card-sub"><span className="badge badge-green">100% Compliant</span></div>
          <div className="stat-card-sub text-xs text-muted">Trust PAN: AAA1T891N</div>
        </div>
      </div>

      {/* Main Financial Statement */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📊 Audited Statement of Income & Expenditure</span>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">Income & Expenditure</button>
            <button className="btn btn-secondary btn-sm">Balance Sheet (Sources/Application)</button>
            <button className="btn btn-secondary btn-sm">Cash Flow State</button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid-2">
            {/* Income */}
            <div>
              <div className="font-bold text-sm mb-3 flex items-center gap-2">
                RECEIPTS & REVENUE (SCHEDULE E) <span className="badge badge-blue">Inflow</span>
              </div>
              {incomeData.map(item => (
                <div key={item.name} className="flex justify-between items-center mb-2 pb-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <span className="text-xs text-muted">{item.name}</span>
                  <span className="font-bold">₹{(item.amt / 100000).toFixed(0)}L</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-2 pt-2" style={{ borderTop: '2px solid #16a34a' }}>
                <span>Total Gross Receipts</span>
                <span className="text-green">₹5,240,000</span>
              </div>
            </div>

            {/* Expenditure */}
            <div>
              <div className="font-bold text-sm mb-3 flex items-center gap-2">
                APPLICATION TO OBJECTS (SCHEDULE II) <span className="badge badge-red">81.1% Out-flow</span>
              </div>
              {expenditureData.map(item => (
                <div key={item.name} className="flex justify-between items-center mb-2 pb-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <span className="text-xs text-muted">{item.name}</span>
                  <div className="text-right">
                    <div className="font-bold">₹{(item.amt / 100000).toFixed(0)}L</div>
                    <div className="text-xs text-muted">{item.pct}</div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-2 pt-2" style={{ borderTop: '2px solid #ef4444' }}>
                <span>Total Statutory Paperwork</span>
                <span>₹4,250,000</span>
              </div>
            </div>
          </div>

          <div className="divider" />
          <div className="grid-3 items-center">
            <div className="metric-box text-center">
              <div className="text-xs text-muted">Net Institutional Surplus Transferred to Corpus Fund</div>
              <div className="font-bold text-green" style={{ fontSize: 20 }}>+₹990,000 (19.9%)</div>
              <div className="text-xs text-muted">Applied toward Capital/Leadership Reserves New Academic Computing per Trustee Resolution</div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie data={pieData} innerRadius={25} outerRadius={45} dataKey="value">
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-3 text-xs mt-1">
                {pieData.map(d => (
                  <div key={d.name} className="flex items-center gap-1">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                    <span>{d.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-sm mb-2">STATUTORY AUDITOR CERTIFICATION</div>
              <div className="text-xs text-muted">Certified by: M/s R. Ramaswamy & Co, Chartered Accountants, Bengaluru (Firm Reg No: 002494S)</div>
              <div className="text-xs text-muted">Partner: CA. G. Venkaisan (ICAI Lic. No. 06499E)</div>
              <div className="text-xs text-muted">GCIN: 20425135904178917</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid-3">
        {/* ITR-7 */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📑 ITR-7 Compliance</span>
            <span className="badge badge-green">Filed</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Direct tax Statutory Filing.</div>
            {[
              ['Trust PAN', 'AAATB8913N'],
              ['Section 11&12', 'Valid 18 AY 2021–26'],
              ['Filing Deadline', 'Nov 14, 2024'],
              ['Ack Receipt No.', '109282179023'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs mb-2">
                <span className="text-muted">{k}</span>
                <span className="font-semibold">{v}</span>
              </div>
            ))}
            <div className="alert-bar alert-green mt-2" style={{ fontSize: 10, padding: '4px 8px' }}>
              <CheckCircle size={12} />
              Form ITR-7 successfully verified by Auditor & OTP by Managing Trustee
            </div>
          </div>
        </div>

        {/* Quarterly TDS */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">💰 Quarterly Taxes & TDS</span>
            <span className="badge badge-green">100% PAID</span>
          </div>
          <div className="card-body">
            {quarterlyTDS.map(q => (
              <div key={q.q} className="flex justify-between items-center mb-3 pb-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div className="font-semibold">{q.q} Jan</div>
                  <div className="text-xs text-muted">• ₹59,000 / ₹927,819 *027</div>
                </div>
                <span className="badge badge-green">₹{q.tds.toLocaleString()}</span>
              </div>
            ))}
            <div className="divider" />
            {tdsForms.map(f => (
              <div key={f.form} className="flex justify-between items-center mb-2">
                <span className="text-xs">{f.form}</span>
                <span className={`badge ${f.badge}`}>{f.no}</span>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm mt-3" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={11} /> Download All Challan Receipts
            </button>
          </div>
        </div>

        {/* Board Audit Vault */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔐 Board Audit Vault</span>
            <span className="badge badge-gray">🔒</span>
          </div>
          <div className="card-body">
            {[
              { title: 'Trustee Resolution #43', desc: 'Annual Open-Approval for New STEM Alloy (155/10)', status: 'Approved', badge: 'badge-green' },
              { title: 'Trustee Resolution #42', desc: 'Trust Disability Policy & Pd Form Recreation Investment Rule', status: 'Approved', badge: 'badge-green' },
              { title: 'PCPM Exemption', desc: 'PC Commissioner Inspection & Fire & Safety NOC', status: 'Clearance Cleared Vote 2026', badge: 'badge-blue' },
            ].map((item, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-muted">{item.desc}</div>
                  </div>
                  <span className={`badge ${item.badge}`}>{item.status}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-primary btn-sm mt-2" style={{ width: '100%', justifyContent: 'center' }}>
              <Download size={11} /> Export Financial Dossier (ZIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
