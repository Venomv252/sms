import React from 'react';
import { ChevronRight, Download, Plus, CheckCircle2 } from 'lucide-react';

const vouchers = [
  { id: '#VOUCH-8961', requester: 'Ramesh Babu (Bus #14)', purpose: 'Fleet Diesel Float', amount: '₹4,925', status: 'Auto-Approved', statusClass: 'pill-green', date: '21 Feb' },
  { id: '#VOUCH-8932', requester: 'Dr. Nandita Roy', purpose: 'Chemistry Practical Salts Refill', amount: '₹3,400', status: 'Pending Approval', statusClass: 'pill-yellow', date: '21 Feb' },
  { id: '#VOUCH-8932', requester: 'Campus Botanical', purpose: 'Seedlings & Fertilizer', amount: '₹1,800', status: 'Imprest Settled', statusClass: 'pill-blue', date: '20 Feb' },
  { id: '#VOUCH-8920', requester: 'Science Dept', purpose: 'Lab Glassware Replacement', amount: '₹2,200', status: 'Approved', statusClass: 'pill-green', date: '19 Feb' },
  { id: '#VOUCH-8915', requester: 'Admin Office', purpose: 'Stationery Replenishment', amount: '₹890', status: 'Settled', statusClass: 'pill-green', date: '18 Feb' },
];

export default function PettyCash() {
  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Petty Cash &amp; Imprest Floats</span>
      </div>
      <div className="page-inner">
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Petty Cash &amp; Imprest Float Management</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              Daily operational expense vouchers verified via physical chits with department-wise float allocation.
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-outline btn-sm"><Plus size={13} /> New Voucher</button>
            <button className="btn btn-primary btn-sm"><Download size={13} /> Float Report</button>
          </div>
        </div>

        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card good">
            <div className="stat-label">FLOAT VAULT BALANCE</div>
            <div className="stat-value">₹2,50,450</div>
            <div className="stat-sub">Available for Dispatch</div>
          </div>
          <div className="stat-card warn">
            <div className="stat-label">TODAY'S DISBURSEMENTS</div>
            <div className="stat-value">₹10,125</div>
            <div className="stat-sub">6 Vouchers Raised</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">PENDING APPROVALS</div>
            <div className="stat-value">3</div>
            <div className="stat-sub">Awaiting Authorization</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">MONTHLY UTILIZATION</div>
            <div className="stat-value">68.4%</div>
            <div className="stat-sub">Of ₹50,000 Budget</div>
          </div>
        </div>

        {/* Float allocation by department */}
        <div className="grid-2" style={{ gap: 16, marginBottom: 16 }}>
          <div className="card">
            <div className="card-header"><h3>Department Float Allocation</h3></div>
            <div className="card-body">
              {[
                { dept: 'Science Lab', allocated: '₹25,000', used: '₹18,200', pct: 72 },
                { dept: 'Transport / Fleet', allocated: '₹30,000', used: '₹22,400', pct: 74 },
                { dept: 'Administrative', allocated: '₹10,000', used: '₹4,200', pct: 42 },
                { dept: 'Sports & Grounds', allocated: '₹8,000', used: '₹3,100', pct: 38 },
                { dept: 'Campus Maintenance', allocated: '₹12,000', used: '₹9,800', pct: 81 },
              ].map((d, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--gray-100)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                    <span style={{ fontWeight: 600 }}>{d.dept}</span>
                    <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{d.used} / {d.allocated}</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${d.pct > 80 ? 'progress-fill-red' : d.pct > 60 ? 'progress-fill-yellow' : 'progress-fill-green'}`} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Float Replenishment Schedule</h3></div>
            <div className="card-body">
              <div style={{ fontSize: 11, color: 'var(--gray-600)', marginBottom: 12 }}>
                Next Float Replenishment: <strong>28 February 2025</strong>
              </div>
              {[
                { label: 'Opening Float (Feb 1)', amount: '₹3,00,000', color: 'var(--gray-700)' },
                { label: 'Total Disbursed (Feb)', amount: '₹49,550', color: 'var(--danger)' },
                { label: 'Receipts Collected', amount: '₹0', color: 'var(--success)' },
                { label: 'Current Balance', amount: '₹2,50,450', color: 'var(--primary)', bold: true },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                  <span style={{ color: 'var(--gray-600)' }}>{r.label}</span>
                  <span style={{ fontWeight: r.bold ? 700 : 600, color: r.color }}>{r.amount}</span>
                </div>
              ))}
              <button className="btn btn-success" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }}>
                <CheckCircle2 size={13} /> Request Float Top-Up
              </button>
            </div>
          </div>
        </div>

        {/* Voucher Table */}
        <div className="card">
          <div className="card-header">
            <h3>Petty Cash Voucher Register</h3>
            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>All Entries • February 2025</div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>VOUCHER #</th>
                  <th>REQUESTED BY</th>
                  <th>PURPOSE</th>
                  <th>AMOUNT</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((v, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 11, color: 'var(--primary)' }}>{v.id}</td>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{v.requester}</td>
                    <td style={{ fontSize: 11 }}>{v.purpose}</td>
                    <td style={{ fontWeight: 700 }}>{v.amount}</td>
                    <td style={{ fontSize: 11 }}>{v.date}</td>
                    <td><span className={`pill ${v.statusClass}`}>{v.status}</span></td>
                    <td>
                      {v.status === 'Pending Approval' ? (
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-success btn-xs">Approve</button>
                          <button className="btn btn-outline btn-xs">Reject</button>
                        </div>
                      ) : (
                        <button className="btn btn-outline btn-xs">View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
