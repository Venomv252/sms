import React from 'react';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  Clock, FileText, ArrowRight, Eye, Download, Send,
  RefreshCw, Zap, Shield, DollarSign, Users, CreditCard,
  ChevronRight, MoreHorizontal, Bell, Printer, Layers
} from 'lucide-react';

const feeEntries = [
  {
    initials: 'AS', name: 'Aarav Sharma', id: 'ADW-1018', class: 'Class 10-B',
    fee: 'Term IV Tuition + Robotics Lab', amount: '₹48,500', method: 'Razorpay UPI',
    status: 'Returnpay', statusClass: 'pill-yellow', time: '10:31 AM'
  },
  {
    initials: 'MK', name: 'Meera Krishnan', id: 'GrR-C GW-2018', class: 'Class G-6-C',
    fee: 'Annual Transport Route Bus BH', amount: '₹16,200', method: 'HDFC NetBanking',
    status: 'Settled', statusClass: 'pill-green', time: '09:52 AM'
  },
  {
    initials: 'KM', name: 'Kabir Mehta', id: 'GrI0-B GW-922', class: 'Grade 10-B',
    fee: 'Robotics Kit & Consumables', amount: '₹8,400', method: 'PineVabs POS Debit',
    status: 'Approved', statusClass: 'pill-green', time: '09:30 AM'
  },
  {
    initials: 'AS', name: 'Ananya Sain', id: 'Gr8-B GW-3921', class: 'Class 8-B',
    fee: 'Term IV Full Tuition', amount: '₹38,000', method: 'Cheque #Pl001 ICICI',
    status: 'In Clearing', statusClass: 'pill-yellow', time: '09:10 AM'
  },
  {
    initials: 'RV', name: 'Rohan Varma', id: 'Gr-9-C GW-9402', class: 'Grade 9-C',
    fee: 'Sports Uniform & Stationery Pack', amount: '₹6,500', method: 'Physical Cash',
    status: 'Receipt Issued', statusClass: 'pill-blue', time: '08:45 AM'
  },
];

const signoffItems = [
  {
    label: 'IOCL Bulk Diesel refuel (Greenwood Fleet)',
    sub: 'PO: 330 • 1400 Litres Centrix Tank Refill',
    amount: '₹1,42,800',
    status: 'Sign & Release NEFT',
    statusClass: 'btn-success'
  },
  {
    label: 'Overtime & Annual Sports Stipends',
    sub: '18 2-Activity Support Staff • Verified by HR',
    amount: '₹36,000',
    status: 'Review & Clear',
    statusClass: 'btn-outline'
  },
  {
    label: 'Answer Booklet Security Printing',
    sub: 'CBSE Center #4490 • Sribangi Security Printers',
    amount: '₹88,500',
    status: 'HSM Sign-Off',
    statusClass: 'btn-primary'
  },
];

export default function BursarCockpit() {
  return (
    <div>
      {/* Sub-header breadcrumb */}
      <div className="sub-header">
        <span className="sub-header-item active">Bursar Cockpit</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item">CBSE Sec 16 Institutional Bye-Laws Verified</span>
      </div>

      <div className="page-inner">
        {/* Page Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h1 className="page-header" style={{ marginBottom: 0 }}>Bursar's Financial Command &amp; Treasury</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              FY 2024–25 • Operation Day 24, February 2025 • Greenwood Education Trust Accounting Cluster 01
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-outline btn-sm"><Download size={13} /> Disbursement Voucher</button>
            <button className="btn btn-outline btn-sm"><FileText size={13} /> BRS Rec</button>
            <button className="btn btn-outline btn-sm"><FileText size={13} /> Daily Day-Book PDF</button>
            <button className="btn btn-success btn-sm"><CreditCard size={13} /> Record Fee Collection</button>
          </div>
        </div>

        {/* Period Status */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <div className="badge badge-green">PERIOD: FY 24-25 Q4 Open</div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 16 }}>
          <div className="stat-card good">
            <div className="stat-label"><TrendingUp size={12} /> TODAY'S FEE REVENUE</div>
            <div className="stat-value">₹18,42,500</div>
            <div className="stat-sub">
              <span className="stat-change stat-change-up">↑ +4.2%</span> 143 Accounts &nbsp;|&nbsp; 412 797s/cqi
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--gray-500)', marginBottom: 3 }}>
                <span>UPI 29%</span><span>NetBanq POS 21%</span><span>Cash 9%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill progress-fill-blue" style={{ width: '72%' }} /></div>
            </div>
          </div>

          <div className="stat-card good">
            <div className="stat-label">TERM IV COLLECTION RATE</div>
            <div className="stat-value">₹4.82 Cr</div>
            <div className="stat-sub">
              <span style={{ color: 'var(--warning)', fontSize: 11 }}>▲ ₹50.0 L Pending</span>
              <span className="badge badge-blue" style={{ marginLeft: 8 }}>92.7% Target</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 3 }}>
                <span style={{ color: 'var(--gray-500)' }}>1-44s Paid Students</span>
                <span className="tag tag-red">14s Defaulters</span>
              </div>
            </div>
          </div>

          <div className="stat-card good">
            <div className="stat-label"><Layers size={12} /> LIQUID TREASURY &amp; Petty Floats</div>
            <div className="stat-value">₹2,14,80,400</div>
            <div className="stat-sub">Combined Clearing &amp; Petty Float</div>
            <div style={{ marginTop: 6, fontSize: 10, color: 'var(--gray-500)' }}>
              SBI Escrow ₹1,45,00 &nbsp; Hand-Down ₹54,801
            </div>
          </div>

          <div className="stat-card alert">
            <div className="stat-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>7-DAY OUTFLOW LIABILITIES</span>
              <span className="tag tag-red">Due by Feb 28</span>
            </div>
            <div className="stat-value amount-danger">₹28,64,20</div>
            <div className="stat-sub">4 Combined Authorisation Batches</div>
            <div style={{ marginTop: 6, fontSize: 10, color: 'var(--gray-500)' }}>
              Staff Payroll Run ₹18,501 | Catering Services Vendor ₹4,20 L | Bus Fleet Diesel + Lube ₹5 ₹4 L
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid-2" style={{ gap: 16 }}>
          {/* Left column */}
          <div>
            {/* Real-Time Fee Counter */}
            <div className="card section">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="icon-wrap icon-wrap-blue"><Zap size={15} /></div>
                  <div>
                    <h3>Real-Time Fee Counter &amp; POS</h3>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Live gateway sync • 142 collections today</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-outline btn-xs">Expert Day-Book</button>
                  <button className="btn btn-outline btn-xs"><Download size={11} /> View All CSV</button>
                </div>
              </div>
              <div style={{ padding: '0 0' }}>
                {feeEntries.map((entry, i) => (
                  <div key={i} className="list-item" style={{ padding: '10px 16px' }}>
                    <div className="avatar avatar-blue" style={{ width: 34, height: 34, fontSize: 12 }}>
                      {entry.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: 12 }}>{entry.name}</span>
                        <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>{entry.id} • {entry.class}</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 1 }}>{entry.fee}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                        <span style={{ fontSize: 10, color: 'var(--gray-500)' }}>{entry.method}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="amount">{entry.amount}</div>
                      <div className={`pill ${entry.statusClass}`} style={{ marginTop: 3 }}>{entry.status}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-400)', marginTop: 2 }}>{entry.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aging Defaulters & Escalation */}
            <div className="card section">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="icon-wrap icon-wrap-red"><AlertTriangle size={15} /></div>
                  <div>
                    <h3>Aging Defaulters &amp; Escalation Pipeline</h3>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Outstanding Term IV: ₹38.00 Lakhs across 114 students</div>
                  </div>
                </div>
                <span className="tag tag-red">14 High-Risk Flagged</span>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 12 }}>
                  {[
                    { label: '1-15 Days', stage: 'Stage 1', amount: '₹18.4 Lakhs', count: '68 Students', action: 'WhatsApp & Portal Ping Active', actionClass: 'pill-blue' },
                    { label: '16-30 Days', stage: 'Stage 2', amount: '₹12.8 Lakhs', count: '32 Students', action: 'Registered Notice Dispatched', actionClass: 'pill-yellow' },
                    { label: '+30 Days', stage: 'Declared', amount: '₹6.8 Lakhs', count: '14 Students', actionClass: 'pill-red', action: 'Halt Ticket - Principal Sync' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: i === 2 ? 'var(--danger-light)' : 'var(--gray-50)', borderRadius: 8, padding: 10, border: `1px solid ${i === 2 ? 'var(--danger)' : 'var(--gray-200)'}` }}>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', fontWeight: 600 }}>{s.label}</div>
                      <span className={`pill ${s.actionClass}`} style={{ marginBottom: 4 }}>{s.stage}</span>
                      <div style={{ fontSize: 16, fontWeight: 700, color: i === 2 ? 'var(--danger)' : 'var(--gray-800)', marginTop: 2 }}>{s.amount}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{s.count}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>{s.action}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary btn-sm"><Send size={12} /> Batch WhatsApp Reminder (114)</button>
                  <button className="btn btn-outline btn-sm"><FileText size={12} /> Sec 13 Legal Notices</button>
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--warning)' }}>
                  ⏱ Apply Surcharge (+₹52/day)
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Bursar Sign-Off Queue */}
            <div className="card section">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="icon-wrap icon-wrap-yellow"><Shield size={15} /></div>
                  <div>
                    <h3>Bursar Sign-Off Queue</h3>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Disbursement mandates pending authorisation</div>
                  </div>
                </div>
                <span className="badge badge-red">9</span>
              </div>
              <div style={{ padding: 0 }}>
                {signoffItems.map((item, i) => (
                  <div key={i} className="list-item" style={{ padding: '10px 16px', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{item.label}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>{item.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="amount">{item.amount}</div>
                      <button className={`btn ${item.statusClass} btn-xs`} style={{ marginTop: 4 }}>{item.status}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Reconciliation */}
            <div className="card section">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="icon-wrap icon-wrap-green"><Landmark size={15} /></div>
                  <div>
                    <h3>Bank Reconciliation (BRS)</h3>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Real-time ledger matching with Core Banking</div>
                  </div>
                </div>
                <span className="badge badge-green">99.8% Concordance</span>
              </div>
              <div className="card-body">
                {[
                  { bank: 'SBI Central Escrow', acc: '****4312', variance: '3 Cheque in Transit', amount: '₹1,45,20,000', status: 'pill-green', statusLabel: 'Balanced' },
                  { bank: 'HDFC School Operations', acc: '****6103', variance: '0 Discrepancy', amount: '₹54,80,000', status: 'pill-red', statusLabel: 'Discrepancy' },
                ].map((b, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: i === 0 ? '1px solid var(--gray-100)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{b.bank}</div>
                        <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>A/c {b.acc}</div>
                        <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>
                          Bank Ledger ↔ ERP School Ledger
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="amount">{b.amount}</div>
                        <span className={`pill ${b.status}`}>{b.statusLabel}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 4 }}>
                      Bank Passport Balance: ₹1,45,20,000
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{b.variance}</div>
                  </div>
                ))}
                <div style={{ marginTop: 8, fontSize: 10, color: 'var(--success)' }}>
                  ✓ Automated SAP reconciliation completed at 06:00 IST
                </div>
              </div>
            </div>

            {/* Imprest Floats */}
            <div className="card section">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="icon-wrap icon-wrap-purple"><Wallet size={15} /></div>
                  <div>
                    <h3>Imprest Floats &amp; Petty Cash Dispatches</h3>
                    <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Daily operational expense vouchers verified via physical chits</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>Float Vault: ₹2,50,450 Available</span>
              </div>
              <div style={{ padding: 0 }}>
                {[
                  { name: 'Fleet Diesel Float - Bus #14 (Ramesh Babu)', voucher: '#VOUCH-8962 • Bus #14-5-IG-6H4 + Matching AS-143-Q3', amount: '₹4,925', status: 'Auto-Approved', statusClass: 'pill-green' },
                  { name: 'Chemistry Practical Salts Refill (Dr. Nandita Roy)', voucher: 'Voucher #VOUCH-8932 • Lab reagents borne agreed by HOD Finance Science', amount: '₹3,400', status: 'Approve', statusClass: 'pill-green', decline: true },
                  { name: 'Campus Botanical Seedlings & Fertilizer', voucher: 'Voucher #VOUCH-8932 • Ground maintenance Float replenishment', amount: '₹1,800', status: 'Imprest Settled', statusClass: 'pill-blue' },
                ].map((item, i) => (
                  <div key={i} className="list-item" style={{ padding: '10px 16px' }}>
                    <div className="icon-wrap icon-wrap-gray"><FileText size={14} /></div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>{item.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 1 }}>{item.voucher}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="amount">{item.amount}</div>
                      <div style={{ display: 'flex', gap: 4, marginTop: 4, justifyContent: 'flex-end' }}>
                        <span className={`pill ${item.statusClass}`}>{item.status}</span>
                        {item.decline && <span className="pill pill-red">Decline</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landmark(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22" /><line x1="6" y1="18" x2="6" y2="11" /><line x1="10" y1="18" x2="10" y2="11" /><line x1="14" y1="18" x2="14" y2="11" /><line x1="18" y1="18" x2="18" y2="11" /><polygon points="12 2 20 7 4 7" />
    </svg>
  );
}
