import React, { useState } from 'react';
import {
  Search, Download, QrCode, FileText, Printer, ChevronRight,
  RefreshCw, AlertCircle, CheckCircle2, Clock, CreditCard,
  Plus, Filter, ChevronLeft, ChevronDown
} from 'lucide-react';

const transactions = [
  { id: 'RCN-0881', student: 'Aarav Sharma', class: 'G-9, Sec A', feeHead: 'Botany Tutor & Robotics', amount: '₹48,350.00', method: 'UPI / Transact-ion', subLedger: 'Class 9 Sec A', status: 'Completed', statusClass: 'pill-green' },
  { id: 'RCN-0886', student: 'Meera Krishnan', class: 'Gr-9, C', feeHead: 'Annual Transport', amount: '₹16,200', method: 'Auto HI-NetBanking', subLedger: 'RecordedOK', status: 'Recorded/OK', statusClass: 'pill-green' },
  { id: 'RCN-0888', student: 'Kabir Mehta', class: 'G-10, B', feeHead: 'Robotics Kit & Conserv...', amount: '₹8,450.00', method: 'Cash Counter A Settle', subLedger: 'Cash 9 Serl-9', status: 'Cleared', statusClass: 'pill-blue' },
  { id: 'RCN-0889', student: 'Ananya Sain', class: 'Gr-8, B', feeHead: 'Term IV Full Tuition', amount: '₹38,000.00', method: 'SBI Cheque / CLRing', subLedger: 'Cleared 9 M-L-4', status: 'In CLRing', statusClass: 'pill-yellow' },
  { id: 'RCN-0891', student: 'Rohan Varma', class: 'Gr-9-C', feeHead: 'Sports Uniform', amount: '₹4,500', method: 'Cash P-Phys', subLedger: 'Cash Pendng', status: 'Cash Pending', statusClass: 'pill-yellow' },
];

export default function FeeCollection() {
  const [activeTab, setActiveTab] = useState('All Periods (107)');
  const tabs = ['All Periods (107)', 'UPI / Razorpay (61)', 'Cash POS (31)', 'Cheque (8)'];

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item">Fee Collection &amp; Invoicing</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">TERMINAL POS #402</span>
      </div>

      <div className="page-inner">
        {/* Page Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <div className="breadcrumb">
              <span>Bursar Operations</span>
              <ChevronRight size={10} />
              <span>Fee Collection &amp; Invoicing</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>Institutional Fee Invoicing &amp; Point-of-Sale Console</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              Live counter terminal for student tuition invoices, dynamic BharatQR-<br />linked, offline exchange registry, and digital one-POS LAN barcode generation.
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-outline btn-sm"><QrCode size={13} /> Scan #HRQ Badge</button>
            <button className="btn btn-outline btn-sm"><Download size={13} /> Expert Day-Book</button>
            <button className="btn btn-outline btn-sm"><Plus size={13} /> Sub-Generate form W</button>
            <button className="btn btn-primary btn-sm"><FileText size={13} /> Create Demand Note</button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card good">
            <div className="stat-label">TODAY'S POS COLLECTION</div>
            <div className="stat-value">₹14,85,600</div>
            <div className="stat-sub"><span className="stat-change stat-change-up">↑ 18.4%</span> 36 Transactions</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">ONE GATEWAY SETTLEMENTS</div>
            <div className="stat-value">₹3,56,900</div>
            <div className="stat-sub">Razorpay 3+ Auto-Reconcile</div>
          </div>
          <div className="stat-card warn">
            <div className="stat-label">PENDING DEMAND NOTES</div>
            <div className="stat-value">114</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
              <span className="tag tag-yellow">₹99,04,210 Total Calls</span>
              <span className="tag tag-red">Due Date: 23 Feb</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-label">PHYSICAL CASH/SAFE VAULT</div>
            <div className="stat-value">₹1,48,200</div>
            <div className="stat-sub">Sealed 1 to 30 • Customer K. Fee</div>
          </div>
        </div>

        {/* Search + Student Card + Terminal */}
        <div className="grid-2" style={{ gap: 16 }}>
          {/* Left: Student lookup + invoice */}
          <div>
            <div className="card">
              <div className="card-header">
                <h3>Student-Direction Instant Retrieval</h3>
              </div>
              <div className="card-body">
                {/* Search */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <div className="search-bar" style={{ flex: 1 }}>
                    <Search className="search-icon" size={14} />
                    <input className="input" style={{ width: '100%' }} placeholder="Aarav Sharma (ADW-1018)" defaultValue="Aarav Sharma (ADW-1018)" />
                  </div>
                  <button className="btn btn-primary btn-sm">Fetch</button>
                </div>

                {/* Student Card */}
                <div style={{ background: 'var(--primary-light)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className="avatar avatar-blue" style={{ width: 40, height: 40, fontSize: 15 }}>AS</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>Aarav Sharma</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-600)' }}>ADM 1006 • Grade 9 Class Gr-9B</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                        <span className="info-item"><span className="info-label">Roll</span><span className="info-value">AS-1</span></span>
                        <span className="info-item"><span className="info-label">CREDIT BASE</span><span className="info-value">#91327</span></span>
                        <span className="info-item"><span className="info-label">Academic Year</span><span className="info-value">2023-24</span></span>
                      </div>
                    </div>
                    <span className="pill pill-red">TERM IV Overdue</span>
                  </div>
                </div>

                {/* Term IV Fee Breakdown */}
                <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Term IV Fee Assessment Breakdown</h4>
                <div style={{ fontSize: 10, color: 'var(--gray-500)', marginBottom: 8 }}>TERM / SAC CODE: 999313</div>

                {[
                  { label: 'Term IV Composite Tuition Fee', sub: 'PO Admin calculate (no fee): Quarterly + per Div 0100 + 4106 × 43960', amount: '₹38,000.00', status: 'pill-yellow', statusLabel: 'Mandatory Head', checked: false },
                  { label: 'Advanced Physics & Robotics Lab Fee', sub: 'GrU: 3579-9455 to-test to 9 Instructional consumables (Teaching Fee)', amount: '₹6,500.00', status: 'pill-blue', statusLabel: 'Soc Included', checked: false },
                  { label: 'School Bus Route #14 (Quarterly Transit)', sub: 'mileage 5307 Fefta Campus AC5401o 580Line management', amount: '₹4,000.00', status: 'pill-green', statusLabel: 'Active Slot', checked: true },
                  { label: 'Late Payment Surcharge (6 Days Overdue)', sub: 'Check bio-verify Plevel for Identifier received Fees-level Institutional', amount: '+₹250.00', status: 'pill-red', statusLabel: 'Bursar Discrete', isWarning: true },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: item.isWarning ? '8px 10px' : '10px 0',
                    borderBottom: '1px solid var(--gray-100)',
                    background: item.isWarning ? 'var(--warning-light)' : 'transparent',
                    borderRadius: item.isWarning ? 6 : 0
                  }}>
                    <input type="checkbox" defaultChecked={item.checked} style={{ marginTop: 2 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 12, color: item.isWarning ? 'var(--warning)' : 'var(--gray-800)' }}>{item.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 12, color: item.isWarning ? 'var(--warning)' : 'var(--gray-800)' }}>{item.amount}</div>
                      <span className={`pill ${item.status}`} style={{ marginTop: 2 }}>{item.statusLabel}</span>
                    </div>
                  </div>
                ))}

                {/* Summary */}
                <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: 12, marginTop: 12 }}>
                  {[
                    { label: 'Gross Subtotal', amount: '₹48,500.00', color: 'var(--gray-800)' },
                    { label: 'Late Surcharge', amount: '+₹250.00', color: 'var(--warning)' },
                    { label: 'Robotics Consumables (GST/7%: GST 9% CL3: 5-SGSTN #PL 5: 1)', amount: '₹991.00 (Standard Custom)', color: 'var(--gray-600)' },
                    { label: 'Institutional Scholarship Concession', amount: '₹0.00', color: 'var(--success)' },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0' }}>
                      <span style={{ color: 'var(--gray-600)' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: row.color }}>{row.amount}</span>
                    </div>
                  ))}
                  <hr className="divider" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Net Payable Amount</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Net Forty-Eight Thousand Seven Hundred Fifty Only</div>
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gray-900)' }}>₹48,750.00</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 }}>SELECT SETTLEMENT BILL &amp; COUNTER INSTRUMENT</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {[
                      { label: 'UPI Pay-In QR / Auto BharatQR', icon: '📱', active: true },
                      { label: 'POS Card Swipe / Printside Terminal', icon: '💳' },
                      { label: 'Cash (Counter Safe) Immediate Receipt', icon: '💵' },
                      { label: 'DD / HDFC Cheque / CSN-3170 Clearing', icon: '🏦' },
                    ].map((m, i) => (
                      <div key={i} style={{
                        flex: '1 1 calc(50% - 6px)', minWidth: 120,
                        border: `2px solid ${m.active ? 'var(--primary)' : 'var(--gray-200)'}`,
                        borderRadius: 8, padding: '8px 10px', cursor: 'pointer', textAlign: 'center',
                        background: m.active ? 'var(--primary-light)' : '#fff', fontSize: 11,
                        fontWeight: m.active ? 700 : 400, color: m.active ? 'var(--primary)' : 'var(--gray-600)'
                      }}>
                        <div style={{ fontSize: 16, marginBottom: 2 }}>{m.icon}</div>
                        {m.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Apply Barcode Conversion</button>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Send SMS Link</button>
                </div>
                <button className="btn btn-success" style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}>
                  <Printer size={14} /> Authorize &amp; Print Thermal Receipt (₹8,VN)
                </button>
              </div>
            </div>
          </div>

          {/* Right: Terminal / QR + Cash Drawer */}
          <div>
            {/* Terminal */}
            <div className="card section">
              <div className="card-header">
                <h3>TERMINAL #102 LIVE</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="badge badge-green">Shared QR/VA</span>
                </div>
              </div>
              <div className="card-body" style={{ textAlign: 'center' }}>
                {/* QR Code placeholder */}
                <div style={{
                  width: 180, height: 180, background: 'var(--gray-100)',
                  borderRadius: 12, margin: '0 auto 12px', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  border: '2px dashed var(--gray-300)'
                }}>
                  <QrCode size={80} color="var(--gray-400)" />
                </div>
                <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--gray-900)' }}>₹48,750.00</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginBottom: 8 }}>greenwood.erp/feepay/AaravSharma</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span className="pill pill-yellow">Awaiting Gateway Webkoot</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 4 }}>
                  LUMINAIRE STATUS: Awaiting Gateway Webkoot...
                </div>
              </div>
            </div>

            {/* Cash Drawer */}
            <div className="card section">
              <div className="card-header">
                <h3>Cash Drawer Reconciliation</h3>
                <button className="btn btn-outline btn-xs"><RefreshCw size={11} /></button>
              </div>
              <div className="card-body">
                {[
                  { label: 'Opening Float ₹FLR-698:', amount: '₹15,600.00', color: 'var(--gray-800)' },
                  { label: 'Gross Counter Cash Collected:', amount: '+₹1,24,200.00', color: 'var(--success)' },
                  { label: 'Petty Vouchers Disbursed:', amount: '-₹00', color: 'var(--danger)' },
                  { label: 'Physical Cashier Drawer:', amount: '₹1,48,200.00', color: 'var(--primary)', bold: true },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 3 ? '1px solid var(--gray-100)' : 'none' }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>{r.label}</span>
                    <span style={{ fontSize: 12, fontWeight: r.bold ? 700 : 600, color: r.color }}>{r.amount}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <button className="btn btn-outline btn-sm" style={{ flex: 1 }}><Printer size={12} /> Print Belt Manual Deposit Citation</button>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>Seal Drawer To Day-End Audit</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Collections Ledger */}
        <div className="card section">
          <div className="card-header">
            <h3>Real-Time Collections Ledger</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className="badge badge-green">52 Entries Today</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {tabs.map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`scroll-tab ${activeTab === t ? 'active' : ''}`} style={{ fontSize: 10 }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>RECEIPT #</th>
                  <th>STUDENT &amp; SEC</th>
                  <th>PER HEADS</th>
                  <th>AMOUNT</th>
                  <th>UPI / TRANSACTION</th>
                  <th>SUB-LEDGER</th>
                  <th>STATUS</th>
                  <th>ACT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 11, color: 'var(--primary)' }}>{t.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{t.student}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{t.class}</div>
                    </td>
                    <td style={{ fontSize: 11 }}>{t.feeHead}</td>
                    <td style={{ fontWeight: 700 }}>{t.amount}</td>
                    <td style={{ fontSize: 11 }}>{t.method}</td>
                    <td style={{ fontSize: 11 }}>{t.subLedger}</td>
                    <td><span className={`pill ${t.statusClass}`}>{t.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-outline btn-xs"><Eye size={10} /></button>
                        <button className="btn btn-outline btn-xs"><Download size={10} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Showing 1–5 of 10 daily transactions • Day-Book Sealed by CFO</span>
            <div className="pagination-pages">
              <button className="page-btn"><ChevronLeft size={12} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn"><ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        {/* Treasury Sync */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <RefreshCw size={14} color="var(--primary)" />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Institutional Treasury &amp; Banking Synchronization</span>
              <span className="badge badge-green">Live Webhooks</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline btn-xs">Re-calculate Overdan Cohorts</button>
              <button className="btn btn-success btn-xs">Run Day-End Treasury Seal</button>
            </div>
          </div>
          <div style={{ padding: '10px 16px', fontSize: 11, color: 'var(--gray-600)' }}>
            Connected to CFO Core Banki-myath: Nodes #SJB-422 and Razorpay WebKount version. Last web-front-office Edi2 Exchange.
          </div>
        </div>
      </div>
    </div>
  );
}
