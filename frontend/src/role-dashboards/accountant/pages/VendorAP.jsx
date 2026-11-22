import React from 'react';
import { ChevronRight, Download, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const vendors = [
  { name: 'IOCL Fleet Diesel', invoiceNo: 'INV-24-8821', amount: '₹1,42,800', due: '28 Feb', status: 'Pending Auth', statusClass: 'pill-yellow', category: 'Fuel & Utilities' },
  { name: 'Sigma-Aldrich Scientific', amount: '₹24,800', invoiceNo: 'INV-BK-994', due: '1 Mar', status: 'Approved', statusClass: 'pill-green', category: 'Lab Supplies' },
  { name: 'HDFC Corporate CFR', amount: '₹2,160', invoiceNo: 'INV-HDFC-012', due: '15 Mar', status: 'Unmatched', statusClass: 'pill-red', category: 'Banking Charge' },
  { name: 'Ananya Term (Tuition)', amount: '₹55,000', invoiceNo: 'CHQ #PK031', due: '23 Feb', status: 'Pending', statusClass: 'pill-yellow', category: 'Fee Return' },
  { name: 'Indian Corporation', amount: '₹1,41,372', invoiceNo: 'INV-TTNS-092', due: '26 Feb', status: 'Matched', statusClass: 'pill-green', category: 'Transport' },
];

export default function VendorAP() {
  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Vendor Accounts Payable (AP)</span>
      </div>
      <div className="page-inner">
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Vendor Accounts Payable</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              Manage vendor invoices, purchase orders, and payment authorizations with 3-way matching.
            </div>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-outline btn-sm"><Plus size={13} /> New Invoice</button>
            <button className="btn btn-primary btn-sm"><Download size={13} /> Export AP Report</button>
          </div>
        </div>

        <div className="stats-grid" style={{ marginBottom: 16 }}>
          <div className="stat-card warn">
            <div className="stat-label">TOTAL PAYABLES</div>
            <div className="stat-value">₹8,42,580</div>
            <div className="stat-sub">22 Pending Invoices</div>
          </div>
          <div className="stat-card alert">
            <div className="stat-label">OVERDUE PAYMENTS</div>
            <div className="stat-value">₹1,84,200</div>
            <div className="stat-sub">4 Vendors Past Due</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">PAID THIS MONTH</div>
            <div className="stat-value">₹12,60,400</div>
            <div className="stat-sub">38 Invoices Cleared</div>
          </div>
          <div className="stat-card good">
            <div className="stat-label">3-WAY MATCH RATE</div>
            <div className="stat-value">94.2%</div>
            <div className="stat-sub">PO → GRN → Invoice</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Pending Vendor Invoices</h3>
            <button className="btn btn-primary btn-sm">Bulk Authorize</button>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>VENDOR NAME</th>
                  <th>INVOICE #</th>
                  <th>CATEGORY</th>
                  <th>AMOUNT</th>
                  <th>DUE DATE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, fontSize: 12 }}>{v.name}</td>
                    <td style={{ fontSize: 11, color: 'var(--gray-500)' }}>{v.invoiceNo}</td>
                    <td><span className="badge badge-gray">{v.category}</span></td>
                    <td style={{ fontWeight: 700 }}>{v.amount}</td>
                    <td style={{ fontSize: 11 }}>{v.due}</td>
                    <td><span className={`pill ${v.statusClass}`}>{v.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-success btn-xs">Approve</button>
                        <button className="btn btn-outline btn-xs">Hold</button>
                      </div>
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
