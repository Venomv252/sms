import React, { useState } from 'react';
import {
  ChevronRight, Download, RefreshCw, CheckCircle2,
  AlertCircle, Clock, FileText, ChevronLeft, Shield
} from 'lucide-react';

const reconEntries = [
  {
    date: '24 Feb 2025', checkNo: 'UTR #AND(CM17001)', narration: 'Razorpay Term IV Online Online — 12 Student Tax Transactions', erpAmount: '₹3,84,900', bankAmount: '₹3,86,900', status: 'Exact Matched', statusClass: 'pill-green'
  },
  {
    date: '23 Feb 2025', checkNo: "Chq #PO31", narration: "Ananya Term (Gr 7-4 Tuition Fee); AN5-Aru (5 HDFC-Bk S-10/02)", erpAmount: '₹55,000', bankAmount: '₹0 (Pending)', status: 'CTS-In-Transit', statusClass: 'pill-yellow'
  },
  {
    date: '22 Feb 2025', checkNo: 'INV-994', narration: 'Sigma-Aldrich Chemicals Pvt Ltd — Chemistry Lab Reagents II #L015', erpAmount: '₹24,800', bankAmount: '₹24,800', status: 'Cheque-Cleared', statusClass: 'pill-green'
  },
  {
    date: '21 Feb 2025', checkNo: 'INV-HDFC-012', narration: 'HDFC Corporate CFR — Periodic-bank Charge Account of school A/c GST', erpAmount: '₹0', bankAmount: '₹2,160', status: 'Unmatched', statusClass: 'pill-red'
  },
  {
    date: '20 Feb 2025', checkNo: 'UTR-ACT – PT-120', narration: 'Indian Corporation — State Bank Transfer Tuition Level II Disbursement Set', erpAmount: '₹1,41,372', bankAmount: '₹1,41,372', status: 'Exact Match', statusClass: 'pill-green'
  },
];

const bankAccounts = [
  { name: 'SBI Central Escrow', number: '****4312', balance: '₹1,45,20,000', variance: '₹8,400', status: 'Active Console', statusClass: 'pill-green', items: 4, reconciled: true },
  { name: 'HDFC Operations & TC', number: '****8802', balance: '₹54,80,000', variance: '₹0', status: '100% Balanced', statusClass: 'pill-green', items: 0, reconciled: true },
  { name: 'ICICI Razorpay Gateway', number: '₹1,12,40,000', balance: '₹93,200', variance: '₹93,200', status: '3-Batch Sync', statusClass: 'pill-blue', items: 3, reconciled: false },
];

export default function BankReconciliation() {
  const [activeTab, setActiveTab] = useState('Unmatched Cheques (4)');

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Bank Reconciliation (BRS)</span>
      </div>

      <div className="page-inner">
        {/* Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <span className="badge badge-blue">BRS PERIOD: FEBRUARY 2025</span>
            </div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Institutional Treasury &amp; BRS Console</h1>
          </div>
          <div className="page-header-actions">
            <span className="badge badge-green">A/P LIVE SYNC</span>
            <span className="badge badge-green">ERPol Working</span>
            <button className="btn btn-outline btn-sm">● Re-Auto-Reconcile Button</button>
            <button className="btn btn-primary btn-sm"><Download size={13} /> Export SignedOff (PDF)</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card">
            <div className="stat-label">BANK PASSBOOK BALANCE</div>
            <div className="stat-value">₹1,99,00,000</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Aggregate Across 3 Direct Accounts</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">SCHOOL LEDGER BALANCE</div>
            <div className="stat-value">₹1,99,91,600</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>Cash Flow Register (GTR)</div>
          </div>
          <div className="stat-card alert">
            <div className="stat-label">TOTAL NET DISCREPANCY</div>
            <div className="stat-value amount-danger">₹91,600</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="tag tag-yellow">2 Cheques + 1 Summary Transit</span>
              <span className="tag tag-red">Pending</span>
            </div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">RECONCILIATION RATE</div>
            <div className="stat-value">99.4%</div>
            <div style={{ marginTop: 4 }}>
              <div className="progress-bar"><div className="progress-fill progress-fill-green" style={{ width: '99%' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 10, color: 'var(--gray-500)' }}>
              <span>4 UF Matching Clears</span>
              <span>6 Actions</span>
            </div>
          </div>
        </div>

        {/* Bank Accounts */}
        <div className="card section">
          <div className="card-header">
            <h3>Institutional Bank Accounts (3 Active)</h3>
          </div>
          <div style={{ display: 'flex', gap: 12, padding: 16, flexWrap: 'wrap' }}>
            {bankAccounts.map((acc, i) => (
              <div key={i} style={{
                flex: '1 1 200px', border: `2px solid ${acc.reconciled ? 'var(--success)' : 'var(--primary)'}`,
                borderRadius: 10, padding: 14, cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{acc.name}</div>
                  <span className={`pill ${acc.statusClass}`}>{acc.status}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 8 }}>A/c {acc.number}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{acc.balance}</div>
                {acc.variance !== '₹0' && (
                  <div style={{ fontSize: 11, color: 'var(--warning)' }}>Variance: {acc.variance}</div>
                )}
                <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 6 }}>
                  {acc.items} Uncleared items &nbsp;•&nbsp; Inspect Schedule →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BRS Adjustment Statement */}
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <h3>SBI Escrow • BRS Adjustment Statement</h3>
              <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>Dated: 24 Feb 2025</span>
            </div>
            <div className="card-body">
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 10 }}>
                As per Sec 109 CBSE Affiliation Financial Norms (FY 24-25 — Rule 42/24)
              </div>
              {[
                { label: 'Balance as per Bank Passbook (SBI Escrow):', amount: '₹1,45,20,000', color: 'var(--gray-800)', note: 'Validated as on 24th Feb at 17:00' },
                { label: 'ADD: CHEQUES DEPOSITED BUT NOT YET CREDITED BY BANK', amount: '+₹26,800', color: 'var(--success)', note: '• Ananya Term (Gr-9-4 Tuition Fee) Cheque on 23rd Feb 55,000\n• Chq #PK031 ↑ = Ananya Term Refund to School bank - Reconcile' },
                { label: 'LESS: CHEQUES ISSUED BY SCHOOL BUT NOT PRESENTED', amount: '-₹35,200', color: 'var(--danger)', note: '• Chq#08990 • Sigma-Aldrich Biotech Suppliers — Issued 24th Feb ₹24,800\n• Chq#08905 • Mooves Equipment Repair Imprest — Issued 23 Feb in school running-vendor physic-presentation at SBI Bank' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-700)', flex: 1 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: item.color, flexShrink: 0, marginLeft: 8 }}>{item.amount}</div>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4, whiteSpace: 'pre-line' }}>{item.note}</div>
                </div>
              ))}
              <div style={{ background: 'var(--primary)', borderRadius: 8, padding: '12px 16px', marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 12 }}>Balance as per Greenwood Cash Book</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 18 }}>₹1,45,11,600</div>
              </div>
              <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 8 }}>
                ⚡ Status: Temporarily in Transit, normal GI-RDG reconciling sequence — 3 clicks remaining
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Reconciliation Engine Telemetry</h3>
              <span className="badge badge-green">99.4% Accuracy</span>
            </div>
            <div className="card-body">
              <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 12 }}>
                Performance reconciliation machine tracking outstanding transactions for stamps and digital, cross-checking numbers, and transactions.
              </div>
              {[
                { label: 'Direct UPI & Reference Match:', count: '616 Items (99.2%)', color: 'var(--success)' },
                { label: 'CTS Cheques (2.1%):', count: '24 Items (2.1%)', color: 'var(--warning)' },
                { label: 'Unknown / Manual intervention needed:', count: '3 Items (0.4%)', color: 'var(--danger)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: item.color }}>{item.count}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ background: 'var(--success-light)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 700 }}>INFLOW CLEARED</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--success)' }}>₹19,60,000</div>
                </div>
                <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>OUTFLOW CLEARED</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>₹19,60,000</div>
                </div>
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: 'var(--gray-500)' }}>NEXT API POLLING: 10 Seconds (18:15:09)</div>
              <hr className="divider" />
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Statutory Audit Sign-Off</div>
              <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>G. Singh &amp; Associates, Chartered Accountants</div>
              <div style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-600)' }}>
                DIGITAL SIGNATURE CERTIFICATE AND DSC<br />
                Certifying: C. Ramanathan (CFO &amp; Bursar)<br />
                Cert ID: G-DSC-GW-2025-24-05X09 168
              </div>
              <button className="btn btn-success" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <Shield size={13} /> Seal Monthly BRS Period
              </button>
            </div>
          </div>
        </div>

        {/* Reconciliation Ledger */}
        <div className="card section" style={{ marginTop: 16 }}>
          <div className="card-header">
            <h3>Reconciliation Ledger &amp; Exception Handling</h3>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Unmatched Cheques (4)', 'Unlinked Charges (1)', 'Direct Debits (2)'].map(t => (
                <button key={t} className={`scroll-tab ${activeTab === t ? 'active' : ''}`} style={{ fontSize: 10 }} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
              <button className="scroll-tab" style={{ fontSize: 10 }}>Auto-Matched (640)</button>
            </div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-500)', padding: '6px 16px' }}>
            Live filtered bank-ledger versus erp-engine discrepancies. Auto-Matched (640)
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>CHQ # / NOTICE / BENEFICIARY</th>
                  <th>NARRATION / DESCRIPTION</th>
                  <th>ERP BOOK ENTRY</th>
                  <th>BANK STATEMENT</th>
                  <th>CLASSIFICATION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {reconEntries.map((e, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 11 }}>{e.date}</td>
                    <td style={{ fontWeight: 600, fontSize: 11, color: 'var(--primary)' }}>{e.checkNo}</td>
                    <td style={{ fontSize: 11, maxWidth: 220 }}>{e.narration}</td>
                    <td style={{ fontWeight: 600 }}>{e.erpAmount}</td>
                    <td style={{ fontWeight: 600 }}>{e.bankAmount}</td>
                    <td><span className={`pill ${e.statusClass}`}>{e.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {e.statusClass === 'pill-red' && <button className="btn btn-primary btn-xs">Post Debit</button>}
                        {e.statusClass === 'pill-yellow' && <button className="btn btn-outline btn-xs">Flag Branch</button>}
                        {e.statusClass === 'pill-green' && <button className="btn btn-outline btn-xs">View</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing of 847 Items for BRS | Reconciled 100% Based match.</span>
            <div className="pagination-pages">
              <button className="page-btn"><ChevronLeft size={12} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn"><ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--success-light)', borderRadius: 8, padding: 12, fontSize: 11, color: 'var(--success)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span>CBSE Financial Compliance: All financial operations maintain per-ledger balances exceeding statutory reserves.</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline btn-sm">Next Board Audit: March 30, 2025</button>
            <button className="btn btn-primary btn-sm">Download Complete Audit Binder</button>
          </div>
        </div>
      </div>
    </div>
  );
}
