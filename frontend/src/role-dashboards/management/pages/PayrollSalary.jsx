import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Send, CheckCircle, Printer } from 'lucide-react';

const payrollData = [
  { month: 'Jul', gross: 3820000, net: 3240000 },
  { month: 'Aug', gross: 3850000, net: 3260000 },
  { month: 'Sep', gross: 3900000, net: 3300000 },
  { month: 'Oct', gross: 3940000, net: 3340000 },
  { month: 'Nov', gross: 3960000, net: 3360000 },
  { month: 'Dec', gross: 4000000, net: 3400000 },
  { month: 'Jan 25', gross: 4060000, net: 3450000 },
  { month: 'Feb 25', gross: 4100000, net: 3490000 },
];

const salarySlips = [
  { id: 'EMP-2018-042', name: 'Dr. Alistair Evans', dept: 'Faculty', cadre: 'Sr. PGT Physics (Faculty)', basic: '$3,468.88', allowances: '$489.08', ot: '$0.00', deductions: '$428.90', net: '$3,380.00', bank: 'HDFC Bank ....9182', status: 'Disbursed', badge: 'badge-green' },
  { id: 'EMP-2015-018', name: 'Mrs. Sunita Rao', dept: 'Leadership', cadre: 'Leadership', basic: '$4,268.88', allowances: '$599.08', ot: '$0.00', deductions: '$686.90', net: '$4,120.00', bank: 'ICICI Bank ....4421', status: 'Disbursed', badge: 'badge-green' },
  { id: 'EMP-2020-089', name: 'Mr. Rajesh Sen', dept: 'Faculty', cadre: 'Faculty', basic: '$2,888.88', allowances: '$259.08', ot: '$0.00', deductions: '$316.90', net: '$2,740.00', bank: 'State Bank ....7731', status: 'Disbursed', badge: 'badge-green' },
  { id: 'DRV-007', name: 'Gurumurthy K.', dept: 'Transport', cadre: 'Fleet Senior', basic: '$956.83', allowances: '$129.83', ot: '$00.00', deductions: '$95.83', net: '$935.80', bank: 'Canara Bank ....1289', status: 'Disbursed', badge: 'badge-green' },
  { id: 'SWP-014', name: 'Ramesh Murthy', dept: 'Support', cadre: 'Support', basic: '$956.83', allowances: '$59.83', ot: '$40.88', deductions: '$78.83', net: '$670.00', bank: 'PNB Bank ....8840', status: 'Pending Clearance', badge: 'badge-yellow' },
];

const deptGroups = [
  { label: 'Faculty & Lecturers (142)', badge: 'badge-green', status: 'Disbursed' },
  { label: 'Support & Housekeeping (24)', badge: 'badge-blue', status: 'Disbursed' },
  { label: 'Security & Transport', badge: 'badge-blue', status: 'Disbursed' },
];

export default function PayrollSalary() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Management</span> <span>›</span>
        <span>Staff & HR</span> <span>›</span>
        <span>Compensation & Statutory Payroll</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-gray">Biometric Sync Active (210/210 Logged)</span>
        <span className="badge badge-blue">Cycle: 01 Feb – 28 Feb 2025</span>
      </div>

      <h1 className="page-title mb-2">Institutional Payroll, Disbursals<br />& Salary Slips Engine</h1>
      <p className="page-desc mb-3">Automated gross-to-net salary computation, biometric attendance integration, statutory PF/ESI/TDS tax deductions, and direct bank batch transfers.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Bank ACH/NEFT</button>
        <button className="btn btn-secondary btn-sm">Generate All Slips (PDF)</button>
        <button className="btn btn-primary btn-sm">Disburse Batch ($704,600)</button>
        <button className="btn btn-secondary btn-sm">+ Run Monthly Payroll</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Payroll Commitment</div>
          <div className="stat-card-value">$704,600</div>
          <div className="stat-card-sub">142 Faculty + 68 Support Staff</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Realized Disbursals</div>
          <div className="stat-card-value text-green">92%</div>
          <div className="stat-card-sub"><span className="badge badge-green">Disbursed</span></div>
          <div className="stat-card-sub text-xs text-muted">Processed: $648,232 • Pending: $56,368</div>
          <div className="mt-2">
            <div className="progress"><div className="progress-bar progress-green" style={{ width: '92%' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Statutory Compliance Hold</div>
          <div className="stat-card-value">$88,200</div>
          <div className="stat-card-sub">PF: $42.2k (Inst. Match) • ESI: $3.8k</div>
          <div className="stat-card-sub text-xs">Form 16/16A Ready • Challan Generated</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">TDS Withheld (YTD)</div>
          <div className="stat-card-value">$52,140</div>
          <div className="stat-card-sub">Form 16/16A Ready</div>
          <div className="stat-card-sub text-xs text-muted">Challan Generated</div>
        </div>
      </div>

      {/* Department filter tabs */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <button className="btn btn-primary btn-sm">All Employees (210)</button>
        <button className="btn btn-secondary btn-sm">Faculty & Lecturers (142)</button>
        <button className="btn btn-secondary btn-sm">Support & Housekeeping (24)</button>
        <button className="btn btn-secondary btn-sm">Security & Transport</button>
        <span className="badge badge-blue" style={{ alignSelf: 'center' }}>February 2025</span>
        <span className="badge badge-gray" style={{ alignSelf: 'center' }}>January 2025</span>
        <span className="badge badge-gray" style={{ alignSelf: 'center' }}>December 2024</span>
      </div>

      {/* Search & filter row */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <input className="input flex-1" style={{ maxWidth: 300 }} placeholder="Search by employee name, bank account, PAN, or designation…" />
        <button className="btn btn-secondary btn-sm">Department Filter</button>
        <button className="btn btn-secondary btn-sm">Status: All</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> CSV Export</button>
      </div>

      {/* Payroll Master Register Table */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📋 February 2025 Payroll Master Register</span>
          <span className="text-xs text-muted">Showing 5 of 210 Staff</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>EMP ID & NAME</th>
                <th>CADRE / DEPT</th>
                <th>BASE PAY</th>
                <th>ALLOWANCES</th>
                <th>OT / BONUS</th>
                <th>DEDUCTIONS</th>
                <th>NET PAYABLE</th>
                <th>BANK DETAILS</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {salarySlips.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: '#16a34a', color: '#fff' }}>{s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <div className="font-semibold text-sm">{s.name}</div>
                        <div className="text-xs text-muted">{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${s.dept === 'Leadership' ? 'badge-purple' : s.dept === 'Faculty' ? 'badge-blue' : 'badge-gray'}`}>{s.cadre}</span>
                  </td>
                  <td className="text-sm">{s.basic}</td>
                  <td className="text-sm">{s.allowances}</td>
                  <td className="text-sm">{s.ot}</td>
                  <td className="text-red font-semibold">{s.deductions}</td>
                  <td className="font-bold text-green">{s.net}</td>
                  <td className="text-xs text-muted">{s.bank}</td>
                  <td><span className={`badge ${s.badge}`}>{s.status}</span></td>
                  <td><button className="btn btn-secondary btn-sm"><Download size={10} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 – 5 of 210 staff payroll records</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">‹ 1</button>
              {[2, 42].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Salary Slip */}
      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-header">
          <div className="flex items-center gap-2">
            <div className="avatar" style={{ background: '#16a34a', color: '#fff', borderRadius: 8 }}>GH</div>
            <div>
              <div className="font-bold text-sm">GREENWOOD HIGH BOARD SCHOOL</div>
              <div className="text-xs text-muted">Digital Salary Slip</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm"><Printer size={10} /></button>
            <button className="btn btn-secondary btn-sm"><Download size={10} /></button>
          </div>
        </div>
        <div className="card-body">
          <div className="text-xs text-muted mb-3">Period: February 2025</div>
          <div className="grid-2 mb-3">
            {[
              ['Employee Name', 'Dr. Alistair Evans'],
              ['Designation & Dept', 'Sr. PGT Physics (Faculty)'],
              ['Staff/EMP ID', 'EMP-2018-042'],
              ['Statutory PF/UAN', '100828370528'],
              ['Days Payable', '28 / 28 Days (100% Biometric)'],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-muted">{k}</div>
                <div className="text-sm font-semibold">{v}</div>
              </div>
            ))}
          </div>

          <div className="grid-2 mb-3">
            {/* Earnings */}
            <div>
              <div className="font-bold text-sm mb-2 text-green">⬆ EARNINGS</div>
              {[
                ['Base Salary', '$3,468.88'],
                ['Allowances', '$488.00'],
                ['OT / Incentives', '$0.00'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span>Total Gross</span>
                <span>$3,888.88</span>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <div className="font-bold text-sm mb-2 text-red">⬇ DEDUCTIONS</div>
              {[
                ['PF Contribution', '$248.00'],
                ['TDS Income Tax', '$188.00'],
                ['Loss of Pay / ESI', '$0.00'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{k}</span>
                  <span className="text-red">{v}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-sm text-red mt-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                <span>Total Deduct</span>
                <span>$420.66</span>
              </div>
            </div>
          </div>

          <div className="metric-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div className="text-xs text-muted">TOTAL NET DISBURSED</div>
            <div className="font-bold" style={{ fontSize: 22, color: '#16a34a' }}>$3,380.00</div>
            <div className="text-xs text-muted">Credited to HDFC Bank (•••• 9182)</div>
          </div>

          <div className="flex justify-between items-center mt-3 text-xs text-muted">
            <div>
              <div>Bank UTR Transaction Hash:</div>
              <div className="font-semibold">UTR-640-26250228-98421</div>
            </div>
            <div className="text-right">
              <div>Dr. Arthur Sterling</div>
              <div>Managing Director & Trustee Signatory Seal</div>
              <span className="badge badge-green mt-1">Digitally Signed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
