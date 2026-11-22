import React, { useState } from 'react';
import {
  ChevronRight, Download, FileText, CheckCircle2,
  Shield, AlertCircle, Clock, Filter, Send, Eye
} from 'lucide-react';

const filingLedger = [
  {
    period: 'Jan 2025 + GSTR-38', section: 'Sec 59', nature: 'Monthly Outward Supplies & TC Summary', turnover: '₹6,24,721', tax: '₹27,850', due: '20 Feb 2025', status: 'Filed & Ack', statusClass: 'pill-green', challan: '#AA279(325004YR'
  },
  {
    period: 'Jan 2025 + GSTR-1', section: 'Sec 37', nature: 'Outward B2B — B2C Supplies (E-invoiced)', turnover: '₹6,24,721', tax: '—', due: '3 Feb 2025', status: 'Filed Dynamic!', statusClass: 'pill-green', challan: '#AA279B(325004105'
  },
  {
    period: "Q3 FY25 + Form 24Q", section: 'Sec 192', nature: 'Quarterly TDS on Faculty & Staff Salaries', turnover: '₹74,55,000', tax: '₹14,46,000', due: '31 Jan 2025', status: 'Clean PYV', statusClass: 'pill-green', challan: 'NSDL-2025-0844'
  },
  {
    period: "Q3 FY25 + Form 26Q", section: '194C / 194J', nature: 'Quarterly TDS on Vendors & Professional Fees', turnover: '₹44,46,000', tax: '₹92,100', due: '31 Jan 2025', status: 'Verified', statusClass: 'pill-green', challan: 'NSDL-2026-0844'
  },
  {
    period: 'Jan 2025 + EPF ECR', section: 'EPF Act', nature: 'Provident Fund Contribution (12% Emp + 13% Trust)', turnover: '₹31,80,000', tax: '₹3,17,910', due: '15 Feb 2025', status: 'Paid & Rec', statusClass: 'pill-green', challan: '010(0)3000384948'
  },
];

const gstMatrix = [
  { code: 'SAC P992 + Tuition & Composite Fee', amount: '₹4,82,00,000', rate: 'Nil (0%)', status: 'pill-green' },
  { code: 'SAC P91 + Al: Biotech & Lab Kits', amount: '₹44,450', rate: '18% GST (86% GST)', status: 'pill-yellow' },
  { code: "SAC P965 + Third-Party Transport", amount: '₹72.66 AM (18% GST)', rate: '18% GST', status: 'pill-yellow' },
  { code: 'GSTR-28 + ERP — 100% Reconciliation (RO Mismatch)', amount: '', rate: 'Match Engine', status: 'pill-green' },
];

export default function StatutoryTaxes() {
  const [activeFilter, setActiveFilter] = useState('All Things');

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Statutory Taxes &amp; GST/TDS</span>
      </div>

      <div className="page-inner">
        {/* Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span className="badge badge-blue">CBDT &amp; CBNC</span>
              <span className="badge badge-green">COMPLIANT · 100% AUDIT SAFE</span>
            </div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Statutory Taxes &amp; Withholding Registry</h1>
          </div>
          <div className="page-header-actions">
            <span style={{ fontSize: 11 }}>TIN: BL80091213</span>
            <span style={{ fontSize: 11 }}>GSTIN: 29AAAA60000A1Z6</span>
            <button className="btn btn-outline btn-sm"><FileText size={13} /> Form 24Q/26Q XML%</button>
            <button className="btn btn-primary btn-sm"><Send size={13} /> Generate Challan ITNS 281</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card warn">
            <div className="stat-label">MONTHLY TDS WITHHELD</div>
            <div className="stat-value">₹5,12,700</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="tag tag-blue">Sec 192 ₹4,82,001 • Due 07 Mar</span>
            </div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>194C/J ₹30.7K</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">GST OUTPUT LIABILITY</div>
            <div className="stat-value">₹1,12,450</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Tuition Fees ₹64K+ & Exempt</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Late: ₹44K+</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">INPUT TAX CREDIT (ITC)</div>
            <div className="stat-value">₹84,600</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Diesel, Lab Hardware, IT: 100% Matched</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">NET GST CASH OUTFLOW</div>
            <div className="stat-value">₹27,850</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Offset: Satisfied Prep — ITC GSTT</div>
          </div>
        </div>

        {/* TDS Desk + GST Governance */}
        <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
          {/* TDS Desk */}
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div className="icon-wrap icon-wrap-blue"><FileText size={15} /></div>
                <div>
                  <h3>TDS Withholding &amp; Challan 281 Desk</h3>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Direct Tax Central Registries Income Tax Dept Compliance</div>
                </div>
              </div>
              <span className="badge badge-green">FPR v6.4 Validated</span>
            </div>
            <div className="card-body">
              {[
                { section: 'SECTION 192', sub: '110% Faculty & Staff', amount: '₹4,82,000', note: 'Form 24Q Q4 Ready', color: 'var(--primary)' },
                { section: 'SECTION 194C', sub: 'Contractors @ 1%-2%', amount: '₹12,450', note: 'Catering, Security, Fleet', color: 'var(--warning)' },
                { section: 'SECTION 194J', sub: 'Professionals @ 10%', amount: '', note: 'Consultants, Auditors, Guests', color: 'var(--purple)' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'var(--gray-50)', borderRadius: 8, padding: '10px 14px',
                  marginBottom: 8, borderLeft: `3px solid ${s.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 12, color: s.color }}>{s.section}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-600)', marginTop: 2 }}>{s.sub}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>{s.note}</div>
                    </div>
                    {s.amount && <div style={{ fontWeight: 700, fontSize: 16 }}>{s.amount}</div>}
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderTop: '1px solid var(--gray-100)', marginTop: 4 }}>
                <div style={{ background: 'var(--gray-100)', borderRadius: 6, padding: '4px 8px', fontSize: 11 }}>
                  HDFC Corporate Tax Electronic Gateway<br />
                  <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>Unified Corporate A/C 087213092853 Challan Pool</span>
                </div>
                <button className="btn btn-success btn-sm">Authorize Electronic Tax Debit via DSC</button>
              </div>
              <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 6 }}>
                ✓ NRSL-PVU Pile #4 Brick-Free &nbsp;|&nbsp; 2048-Bit Token DSC Active
              </div>
            </div>
          </div>

          {/* GST Governance */}
          <div className="card">
            <div className="card-header">
              <h3>GST Governance Matrix</h3>
              <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>GST Educational Governance on Rule 720/21</span>
            </div>
            <div className="card-body">
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 10 }}>
                Notification 12/2017-CTRS: Pre-school up to higher secondary education (Tuition, Boarding, Exam Fees) is strictly 0% NIL GST under SAC P992.
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 4 }}>Revenue Classification (FY24 – 98.2% Exempt / 1.5% Taxable):  27.02%</div>
                <div className="progress-bar"><div className="progress-fill progress-fill-green" style={{ width: '98%' }} /></div>
              </div>
              {gstMatrix.map((item, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{item.code}</div>
                    {item.amount && <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{item.amount}</div>}
                  </div>
                  <span className={`pill ${item.status}`} style={{ flexShrink: 0 }}>{item.rate}</span>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 4 }}>Auto-Sync TRACES Visit</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filing Ledger */}
        <div className="card section">
          <div className="card-header">
            <h3>Statutory Deductions &amp; Electronic Returns Ledger</h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['All Things', 'Direct Tax (TDS)', 'Indirect Tax (GST)', 'Social Security (PF/ESI)'].map(f => (
                <button key={f} className={`scroll-tab ${activeFilter === f ? 'active' : ''}`} style={{ fontSize: 10 }} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-500)', padding: '6px 16px' }}>
            Live filings status across Direct tax, Indirect tax and Statutory Social Security
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>PERIOD / RETURN</th>
                  <th>TAX SECTION</th>
                  <th>NATURE OF PAYMENT</th>
                  <th>GROSS TURNOVER</th>
                  <th>TAX / LIABILITY</th>
                  <th>STATUTORY DUE</th>
                  <th>FILING STATUS</th>
                  <th>CHALLAN / ACK #</th>
                </tr>
              </thead>
              <tbody>
                {filingLedger.map((row, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 11 }}>{row.period}</div>
                    </td>
                    <td style={{ fontSize: 11 }}>{row.section}</td>
                    <td style={{ fontSize: 11, maxWidth: 200 }}>{row.nature}</td>
                    <td style={{ fontWeight: 600 }}>{row.turnover}</td>
                    <td style={{ fontWeight: 600 }}>{row.tax}</td>
                    <td style={{ fontSize: 11 }}>{row.due}</td>
                    <td><span className={`pill ${row.statusClass}`}>{row.status}</span></td>
                    <td style={{ fontSize: 10, color: 'var(--gray-500)' }}>{row.challan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form 16 Dispatch + Auditor Seal */}
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div>
                <h3>Form 16 &amp; Form 16A Digital Dispatch Console</h3>
                <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Automated TRACES-Based, Payroll PDF generation with DSC authentication</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-green">192/190 Verified</span>
              </div>
            </div>
            <div className="card-body">
              <div className="grid-3" style={{ gap: 8 }}>
                <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--primary)' }}>190</div>
                  <div style={{ fontSize: 10, color: 'var(--primary)' }}>PART A (TRACES PORTAL)</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>100% PAN Linked & Synced</div>
                </div>
                <div style={{ background: 'var(--gray-100)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--gray-700)' }}>₹4.82 Cr</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>PART B (ERP ANNEXURE)</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Regime-Wise Deductions</div>
                </div>
                <div style={{ background: 'var(--success-light)', borderRadius: 8, padding: 10, textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--success)' }}>24</div>
                  <div style={{ fontSize: 10, color: 'var(--success)' }}>FORM 16A (DEOCNR)</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Contractor & Professional</div>
                </div>
              </div>
              <button className="btn btn-success" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <Send size={13} /> Batch Email Form 16 to Staff
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Auditor Seal — Statutory Compliance Status</h3>
            </div>
            <div className="card-body">
              {[
                { label: 'TDS Challan Reconciled', value: '100% OK', color: 'var(--success)' },
                { label: 'GSTR-28 vs 3B Variance', value: '₹0.00', color: 'var(--success)' },
                { label: 'EPFO / ESIC Sealing', value: 'Closed Q3', color: 'var(--gray-600)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color }}>{item.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, background: 'var(--gray-50)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>Mrs. Sundaram &amp; Narayanan LLP</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Chartered Accountants</div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>FIRM: 004285</div>
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--gray-500)' }}>
                GSTN: 29041184A44F902 &nbsp;|&nbsp; View Audit Dossier
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--gray-500)' }}>
                Algorithm: Sign-256 with RSA Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
