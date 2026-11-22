import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Download, RefreshCw, Search } from 'lucide-react';

const invoices = [
  { inv: '#INV-2025-T2-0891', student: 'Aarav Lavarya', adm: 'ADM 2021-0492', grade: 'Grade 10-A', amount: '$1,435.00', waiver: '-$215.25 (Sibling)', net: '$1,219.75', dueDate: '10 Jan 2025', status: 'Paid Online', badge: 'badge-green', ref: 'pay_4pu6054958' },
  { inv: '#INV-2025-T2-0892', student: 'Sophia Mehta', adm: 'ADM 2019-1123', grade: 'Grade 12-Science', amount: '$1,780.00', waiver: '$0.00', net: '$1,780.00', dueDate: '28 Feb 2025', status: 'Pending', badge: 'badge-yellow', ref: '' },
  { inv: '#INV-2025-T2-0893', student: 'Rohan Rajesh', adm: 'ADM 2023-0691', grade: 'Grade 8-B', amount: '$1,225.00', waiver: '$0.00', net: '$1,225.00', dueDate: '15 Jan 2025', status: 'Overdue (38d)', badge: 'badge-red', ref: '' },
  { inv: '#INV-2025-T2-0894', student: 'Kavya Chawla', adm: 'ADM 2020-3011', grade: 'Grade 5-C', amount: '$1,030.00', waiver: '-$100.00 (Staff Kid)', net: '$930.00', dueDate: '15 Jan 2025', status: 'Part Paid ($430 Bal)', badge: 'badge-orange', ref: 'IPI-490031-HOR-' },
  { inv: '#INV-2025-T2-0895', student: 'Devansh Varma', adm: 'ADM 2018-0160', grade: 'Grade 11-Commerce', amount: '$1,780.00', waiver: '-$445.00 (Merit Top 5%)', net: '$1,335.00', dueDate: '05 Jan 2025', status: 'Paid Online', badge: 'badge-green', ref: 'ch_3ok7073110c' },
];

const gradeBands = [
  { band: 'Pre-Primary (Nurs – KG2)', tuition: '$650.00', stem: '$45.00', sports: '$30.00', exam: '$30.00', total: '$820.00', policy: 'Standard Cohort' },
  { band: 'Primary (Grades 1–3)', tuition: '$780.00', stem: '$85.00', sports: '$45.00', exam: '$45.00', total: '$1,030.00', policy: 'Sibling 15% Waiver' },
  { band: 'Middle School (Grades 4–8)', tuition: '$890.00', stem: '$140.00', sports: '$135.00', exam: '$60.00', total: '$1,225.00', policy: 'Bus Corridor Zone A-C' },
  { band: 'Secondary (Grades 9–10)', tuition: '$1,020.00', stem: '$180.00', sports: '$140.00', exam: '$95.00', total: '$1,435.00', policy: 'Merit Top 5% (25%)' },
  { band: 'Sr. Secondary (11–12 Sci/Comm)', tuition: '$1,250.00', stem: '$260.00', sports: '$150.00', exam: '$120.00', total: '$1,780.00', policy: 'Lab Intensive Cost' },
];

const paymentModes = [
  { mode: 'UPI/NetBank', pct: 68 },
  { mode: 'Credit/Debit', pct: 25 },
  { mode: 'EDU Cheques', pct: 8 },
  { mode: 'Counter Cash', pct: 2 },
];

export default function FeeCollection() {
  const [search, setSearch] = useState('');
  const filtered = invoices.filter(inv =>
    inv.student.toLowerCase().includes(search.toLowerCase()) ||
    inv.inv.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="breadcrumb">
        <span>Finance & Operations</span> <span>›</span>
        <span>Bursar & Finance Registry</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-gray">AY 2024–25 | Cycle Term II</span>
      </div>

      <h1 className="page-title mb-2">Institutional Invoicing &<br />Treasury Reconciliation</h1>
      <p className="page-desc mb-3">Statutory student receivable accounting, ledger automation, surcharge matrices, and integrated payment gateway reconciliation engine.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm">💵 Cashier POS / Counter Desk</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Ledger Export (CSV/Tally)</button>
        <button className="btn btn-secondary btn-sm"><RefreshCw size={11} /></button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Term II Invoiced</div>
          <div className="stat-card-value">$2,600,000</div>
          <div className="stat-card-sub">Total at demand across 2,450 enrolled students</div>
          <div className="stat-card-sub text-xs text-muted">General Auto-Generated: 100% (2,450 Issued)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Realized Collections</div>
          <div className="stat-card-value text-green">$2,410,000</div>
          <div className="stat-card-sub">
            <span className="badge badge-red">Outstanding area: $190,000 (7.3%)</span>
          </div>
          <div className="stat-card-sub text-xs">
            <div className="flex items-center gap-2 mt-1">
              <div className="progress flex-1"><div className="progress-bar progress-green" style={{ width: '92.7%' }} /></div>
              <span>92.7%</span>
            </div>
          </div>
          <div className="stat-card-sub text-xs text-muted">Settlement SLA: T+1 Institutional Batch</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Payment Modes</div>
          <div className="stat-card-sub font-semibold">Multi-Rail</div>
          {paymentModes.map(p => (
            <div key={p.mode} className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-muted" style={{ minWidth: 90 }}>{p.mode}</span>
              <span className="font-bold">{p.pct}%</span>
            </div>
          ))}
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Payment Gateway MDR</div>
          <div className="stat-card-value">$4,120</div>
          <div className="stat-card-sub">Processing cost efficiency: 0.16% overall</div>
          <div className="stat-card-sub text-xs text-muted">Partner Gateways: Razorpay + Stripe EDU</div>
        </div>
      </div>

      {/* Grade-Band Fee Structure */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📊 Grade-Band Fee Structure & Surcharge Rules</span>
          <button className="btn btn-primary btn-sm">Configure Surcharge</button>
        </div>
        <div className="card-body" style={{ paddingBottom: 4 }}>
          <div className="text-xs text-muted mb-3">Board-sanctioned tuition slabs, experiential lab surcharges, and discount waiver rules for AY 2024-25.</div>
        </div>
        <div className="grid-2 mb-4" style={{ margin: '0 16px 16px' }}>
          <div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Academic Band</th>
                    <th>Tuition (Term)</th>
                    <th>STEM/ICT Lab</th>
                    <th>Sports & Amenities</th>
                    <th>Exam & Board</th>
                    <th>Standard Total</th>
                    <th>Applicable Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {gradeBands.map(g => (
                    <tr key={g.band}>
                      <td className="font-semibold text-sm">{g.band}</td>
                      <td>{g.tuition}</td>
                      <td>{g.stem}</td>
                      <td>{g.sports}</td>
                      <td>{g.exam}</td>
                      <td className="font-bold text-green">{g.total}</td>
                      <td><span className="badge badge-gray">{g.policy}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <div className="metric-box flex-1">
                <div className="font-semibold">Institutional Sibling Concession</div>
                <div className="text-muted">Second child automatically qualifies for 15% tuition waiver; third child 25%.</div>
              </div>
              <div className="metric-box flex-1">
                <div className="font-semibold">Merit & Endowment Scholarship</div>
                <div className="text-muted">Approved by Board Trustees; applied against invoice before generation.</div>
              </div>
            </div>
          </div>

          {/* Settlement mode panel */}
          <div className="card" style={{ border: 'none', boxShadow: 'none' }}>
            <div className="card-header" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <span className="card-title text-green">Settlement Mode</span>
              <span className="live-badge">Live Synced</span>
            </div>
            <div className="card-body">
              <div className="text-xs text-muted mb-2">Statutory Gateway Auditor</div>
              <div className="text-xs font-semibold mb-3">Direct institutional payouts into State Bank of India Educational Current A/c #7842-10…</div>
              {[
                { label: 'Razorpay EDU—Settlement', amount: '$182,450.00', detail: 'Batch #RZP-2025–0211 SBIND0483', time: 'Today, 04:30 AM (UTR:' },
                { label: 'Stripe Express Payout', amount: '$94,120.00', detail: 'Transfer #po_1QJK942', time: 'Yesterday, 11:45 PM' },
                { label: 'Over-The-Counter Cash Vault', amount: '$14,600.00', detail: 'Security Cash Van escort', time: '19 Feb 2025, 04:00 PM' },
              ].map((s, i) => (
                <div key={i} className="metric-box mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-sm">{s.label}</div>
                      <div className="text-xs text-muted">{s.detail}</div>
                      <div className="text-xs text-muted">{s.time}</div>
                    </div>
                    <div className="font-bold text-green">{s.amount}</div>
                  </div>
                </div>
              ))}
              <div className="metric-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className="flex justify-between">
                  <div className="font-semibold">SBI Transit Balance</div>
                  <div className="font-bold text-green">$32,840.10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📋 Term II Invoicing Ledger & Student Receivables</span>
          <div className="flex gap-2 flex-wrap">
            <button className="btn btn-primary btn-sm">All (2,450)</button>
            <button className="btn btn-secondary btn-sm">Paid Online (2,772)</button>
            <button className="btn btn-secondary btn-sm">Pending (118)</button>
            <button className="btn btn-secondary btn-sm">Overdue (42)</button>
            <button className="btn btn-secondary btn-sm">Partial Installment (18)</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: '8px 16px', borderBottom: '1px solid var(--border)' }}>
          <div className="flex gap-2 flex-wrap items-center">
            <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input className="input" style={{ paddingLeft: 26, width: 260 }} placeholder="Filter by Student Name, Admission #, Roll # or Invoice ID…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">📅 01 Jan 2025 – 28 Feb 2025</button>
            <button className="btn btn-secondary btn-sm">🎓 Class Grade</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Student Name & ID</th>
                <th>Class / Stream</th>
                <th>Gross Amount</th>
                <th>Waiver / Subsidy</th>
                <th>Net Payable</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th>Gateway Ref #</th>
                <th>E-Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.inv}>
                  <td className="font-semibold text-xs">{inv.inv}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: '#0ea5e9', color: '#fff' }}>{inv.student.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <div className="font-semibold">{inv.student}</div>
                        <div className="text-xs text-muted">{inv.adm}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm">{inv.grade}</td>
                  <td className="font-bold">{inv.amount}</td>
                  <td className="text-xs text-green">{inv.waiver}</td>
                  <td className="font-bold text-green">{inv.net}</td>
                  <td className="text-xs text-muted">{inv.dueDate}</td>
                  <td><span className={`badge ${inv.badge}`}>{inv.status}</span></td>
                  <td className="text-xs text-muted">{inv.ref || '—'}</td>
                  <td>
                    {inv.status.startsWith('Paid') ? (
                      <button className="btn btn-secondary btn-sm"><Download size={10} /></button>
                    ) : (
                      <button className="btn btn-secondary btn-sm" style={{ fontSize: 10 }}>👁</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 – 5 of 2,450 issued bills.</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">‹ 1</button>
              {[2, 3, 490].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
