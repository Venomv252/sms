import React from 'react';
import { Plus, Download } from 'lucide-react';

const bills = [
  { id: '#EXP-2025-0412', vendor: 'IOCL Depot Bulk Fuels', category: 'Fleet & Generator Ops', costCenter: 'CC: Transportation Unit', taxRef: 'INV-IOCL-85418', desc: 'Diesel for 28 buses…', amount: '$2,160', itcClaim: 'ITC Claim $', date: '22 Feb 2025', status: 'Approved & Cleared', badge: 'badge-green' },
  { id: '#EXP-2025-0409', vendor: 'BESCOM State Electricity Board', category: 'Campus Utilities & Power', costCenter: 'CC: Central Estate Facilities', taxRef: 'ELEC-FEB-2025-B1', desc: 'Main Substation…', amount: '$8,430', itcClaim: 'ITC Claim $', date: '20 Feb 2025', status: 'Pending Dean/Bursar', badge: 'badge-yellow' },
  { id: '#EXP-2025-0398', vendor: 'M/S Scientific Instruments Corp', category: 'Lab & Academic Equip.', costCenter: 'CC: Physics Dept Laboratories', taxRef: 'SCT-8821-B', desc: 'Ho-Yie Laser replacement…', amount: '$6,280', itcClaim: 'ITC Claim $', date: '19 Feb 2025', status: 'Approved & Cleared', badge: 'badge-green' },
  { id: '#EXP-2025-0420', vendor: 'CleanGuard Facilities Inc.', category: 'Sanitation Consumables', costCenter: 'CC: Housekeeping Logistics', taxRef: 'QG-2025-891', desc: 'Q1-Industrial floor…', amount: '$1,840', itcClaim: 'ITC Claim $', date: '23 Feb 2025', status: 'Pending Dean/Bursar', badge: 'badge-yellow' },
  { id: '#EXP-2025-0422', vendor: 'Tarang Event Stage & AV Logistics', category: 'Cultural Fest Logistics', costCenter: 'CC: Student Welfare & Arts', taxRef: 'TAV-7712', desc: 'Audio logging and LED…', amount: '$4,280', itcClaim: 'ITC Claim $', date: '24 Feb 2025', status: 'Approved & Cleared', badge: 'badge-green' },
];

const costCategories = [
  { name: 'Campus Utilities & Power', pct: 35, amt: '$76,476' },
  { name: 'Fleet Fuel & Service Maintenance', pct: 24, amt: '$52,440' },
  { name: 'Academic & Senior Laboratories', pct: 18, amt: '$39,330' },
  { name: 'Facilities, Sanitation & Estate Civil', pct: 14, amt: '$30,590' },
  { name: 'Administrative & Board Overheads', pct: 9, amt: '$19,665' },
];

const pettyFloatItems = [
  { desc: 'Urgent Student Sports First-Aid District Athletics Contingency Kit', amt: '$450.00' },
  { desc: 'Regional Quiz Travel Allowance State Olympiad Student Convoy…', amt: '$750.00' },
];

export default function BillsExpenditure() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Management</span> <span>›</span>
        <span>Finance & Operations</span> <span>›</span>
        <span>Accounts Payable & Campus Expenditure</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-gray">Bursar Audit Ledger Active • Updated 14 mins ago</span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="badge badge-gray">FISCAL ACCOUNTING DIVISION</span>
      </div>

      <div className="flex justify-between items-start flex-wrap gap-3 mb-4">
        <div>
          <h1 className="page-title mb-1">Bills,<br />Operational<br />Vouchers &<br />Miscellaneous<br />Expenditure</h1>
          <p className="page-desc" style={{ maxWidth: 320 }}>Statutory institutional payables, vendor invoices, utility billing, campus infrastructure maintenance, and discretionary operational expenses under Trustee oversight.</p>
        </div>
        <div className="flex gap-2 flex-wrap" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
          <button className="btn btn-primary btn-sm"><Plus size={11} /> + New Expense Voucher</button>
          <button className="btn btn-secondary btn-sm">Approve Pending Invoices</button>
          <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Ledger (CSV/Tally)</button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Total Outflows (MTD FEB)</div>
          <div className="stat-card-value">$218,500</div>
          <div className="stat-card-sub">48 vendor vouchers • 91% utilized</div>
          <div className="stat-card-sub text-xs text-muted">Budget: $240,000 • Cap: $21,500 rem.</div>
          <div className="mt-2"><div className="progress"><div className="progress-bar progress-green" style={{ width: '91%' }} /></div></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pending Approvals Queue</div>
          <div className="stat-card-value">6</div>
          <div className="stat-card-sub"><span className="badge badge-red">Invoices</span></div>
          <div className="stat-card-sub text-xs text-red">$18,450.00 Urgent Action</div>
          <div className="stat-card-sub text-xs text-muted">Awaiting Bursar & Board Trustee…</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Campus Utilities & Overheads</div>
          <div className="stat-card-value">$42,600</div>
          <div className="stat-card-sub">BESCOM Grid Diesel Bulk</div>
          <div className="stat-card-sub text-xs text-muted">Continuous Facilities & High-sp…</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">GST & Statutory ITC</div>
          <div className="stat-card-value">$16,840</div>
          <div className="stat-card-sub"><span className="badge badge-blue">GSTR-2B Matched</span></div>
          <div className="stat-card-sub text-xs text-muted">100% GSTR-2B Matched all institutional operating purchases</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-3 flex-wrap items-center">
        <button className="btn btn-primary btn-sm">All Vouchers (48)</button>
        <button className="btn btn-secondary btn-sm">Campus Utilities & Power (12)</button>
        <button className="btn btn-secondary btn-sm">Lab & Academic Equipment (14)</button>
        <button className="btn btn-secondary btn-sm">Fleet Fuel & M…</button>
        <span className="badge badge-gray" style={{ alignSelf: 'center' }}>Feb 01, 2025 – Feb 28, 2025 ⌄</span>
      </div>

      <div className="flex gap-2 mb-3 items-center">
        <input className="input flex-1" style={{ maxWidth: 260 }} placeholder="Search by voucher # or vendor…" />
        <span className="badge badge-green">STATUS: All Status ⌄</span>
        <span className="badge badge-gray">Approved & Cleared (38)</span>
        <span className="badge badge-yellow">Pending Dean/Bursar (6)</span>
        <span className="badge badge-blue">Scheduled for Payment (4)</span>
      </div>

      {/* Main Table */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">🧾 Audited Institutional Expense Ledger</span>
          <span className="text-xs text-muted">Displaying 5 of 48 active vouchers</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Voucher & Date</th>
                <th>Vendor / Payee</th>
                <th>Category & Cost Center</th>
                <th>Tax INV Ref</th>
                <th>Description & Purpose</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="font-semibold text-xs">{b.id}</div>
                    <div className="text-xs text-muted">{b.date}</div>
                  </td>
                  <td className="font-semibold text-sm">{b.vendor}</td>
                  <td>
                    <div className="text-xs">{b.category}</div>
                    <div className="text-xs text-muted">{b.costCenter}</div>
                  </td>
                  <td className="text-xs text-muted">{b.taxRef}</td>
                  <td className="text-xs text-muted">{b.desc}</td>
                  <td>
                    <div className="font-bold">{b.amount}</div>
                    <div className="text-xs text-muted">{b.itcClaim}</div>
                    <span className={`badge ${b.badge}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 to 5 of 48 active expenditure vouchers</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">‹ 1</button>
              {[2, 3, 10].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid-2">
        {/* Monthly Expense Distribution */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Monthly Expense Distribution by Cost Center</span>
            <span className="badge badge-blue">$219,500 Outlay</span>
          </div>
          <div className="card-body">
            {costCategories.map(c => (
              <div key={c.name} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{c.name}</span>
                  <span className="font-bold">{c.pct}% ({c.amt})</span>
                </div>
                <div className="progress">
                  <div className="progress-bar progress-green" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="text-xs text-muted mt-2">Target variance threshold: ±5%</div>
            <button className="btn btn-secondary btn-sm mt-2">Download Variance Audit PDF →</button>
          </div>
        </div>

        {/* Principal's Emergency Discretionary Float */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">💰 Principal's Emergency Discretionary Float</span>
            <span className="badge badge-green">Active Float</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Petty cash vault & immediate student contingency funds.</div>
            <div className="grid-2 mb-3">
              <div className="metric-box text-center">
                <div className="text-xs text-muted">Current Float Balance</div>
                <div className="font-bold text-green" style={{ fontSize: 18 }}>$3,800.00</div>
                <div className="text-xs text-muted">Revolving Limit: $5,000.00</div>
              </div>
              <div className="metric-box text-center">
                <div className="text-xs text-muted">Disbursed this Month</div>
                <div className="font-bold text-red" style={{ fontSize: 18 }}>$1,200.00</div>
                <div className="text-xs text-muted">24% utilized (Healthy)</div>
              </div>
            </div>
            <div className="text-xs font-semibold mb-2">Recent Discretionary Drawdowns</div>
            {pettyFloatItems.map((p, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex justify-between items-start">
                  <div className="text-xs text-muted flex-1">{p.desc}</div>
                  <div className="font-bold text-sm ml-2">{p.amt}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <button className="btn btn-primary btn-sm flex-1" style={{ justifyContent: 'center' }}>Replenish Petty Float</button>
              <button className="btn btn-secondary btn-sm">Audit Float Slips 🗃</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
