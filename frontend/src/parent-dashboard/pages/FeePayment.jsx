import React, { useState } from 'react'
import { Download, CreditCard, Phone } from 'lucide-react'

const invoices = [
  { id: 'INV-2025-8891', date: 'Feb 15, 2025', desc: 'Term III Installment\nTuition, Consumables & Transport', amount: '₹45,000', method: 'Pending Settlement', status: 'Due (Mar 15)', statusColor: 'tag-red', action: 'Pay Now' },
  { id: 'INV-2024-8342', date: 'Oct 04, 2024', desc: 'Term II Installment\nTuition, Sports, Complex & Modules', amount: '₹70,000', method: '✓ UPI • Axis Bank', status: 'Paid', statusColor: 'tag-green', action: null },
  { id: 'INV-2024-8312', date: 'Jun 12, 2024', desc: 'Term I Installment\nAdministration-renewal, Annual Activity & Tuitikin', amount: '₹70,000', method: '✓ HDFC Net Banking', status: 'Paid', statusColor: 'tag-green', action: null },
  { id: 'INV-2024-8045', date: 'Jun 05, 2024', desc: 'CBSE Academic Books & Sports Kit\nGrade 10 Booklist, Lab Manuals, Emerald Sports Kit', amount: '₹8,450', method: '✓ Credit Card (Visa)', status: 'Paid', statusColor: 'tag-green', action: null },
]

const feeBreakdown = [
  { label: 'Tuition & Instructional Fee', desc: 'Classroom teaching, Faculty & Facility', amount: '₹28,000' },
  { label: 'AC Dedicated Commute', desc: 'Route#14 (Wing school to Section 2)', amount: '₹5,000' },
  { label: 'Science & Robotics Labs', desc: 'Physics, Chemistry & AI simulations', amount: '₹6,500' },
  { label: 'Digital LMS & Campus Wi-Fi', desc: 'Campus, MS license & High-speed internet', amount: '₹3,500' },
  { label: 'CBSE Pre-Board Assessments', desc: 'Exam papers, ref formal evaluation & frst', amount: '₹2,000' },
]

export default function FeePayment() {
  const [selectedPayment, setSelectedPayment] = useState('upi')

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Operations & Fees</a>
        <span>›</span>
        <span>Fee Payment & Invoices</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Academic Fee Management & Official Invoices</h1>
          <p className="page-subtitle">Review term installments, instant online fee settlement, tax-deductible 80(C) receipts, and detailed fee ledger for <strong>Aarav Sharma (Grade 10–B & Roll 24)</strong>.</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Download 80(C) Certificate</button>
          <button className="btn btn-secondary btn-sm">Fee Helpdesk</button>
        </div>
      </div>

      {/* Fee Summary */}
      <div className="grid grid-4 mb-20">
        {[
          { label: 'TOTAL ANNUAL FEE', value: '₹1,85,000', sub: 'AY 25 (Terms I, II, III)', color: 'var(--text-primary)', icon: '🏫' },
          { label: 'CLEARED AMOUNT', value: '₹1,40,000', sub: 'Terms I & II Cleared & Verified in Ledger', pct: 75.6, color: 'var(--primary)', icon: '✅' },
          { label: 'OUTSTANDING BALANCE', value: '₹45,000', sub: 'Due Mar 15, 2025', dueTag: true, color: 'var(--red)', icon: '⚠' },
          { label: 'MERIT SCHOLARSHIP', value: '₹10,000', sub: 'Applied to Annual Wld • Approved by Board', color: '#22c55e', icon: '🏆', sub2: 'Grade 9 Board Ranking (Top 1%)' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div className="stat-label">{s.icon} {s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            {s.pct && (
              <div className="progress-bar" style={{ marginTop: 6 }}>
                <div className="progress-fill green" style={{ width: `${s.pct}%` }}></div>
              </div>
            )}
            {s.dueTag && <span className="tag tag-red" style={{ fontSize: 10, marginTop: 6, display: 'inline-block' }}>● Due Soon</span>}
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{s.sub}</div>
            {s.sub2 && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub2}</div>}
          </div>
        ))}
      </div>

      <div className="two-col mb-20">
        {/* Payment Gateway */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>● IMMEDIATE TERM III SETTLEMENT</div>
              <div className="card-title">Direct School Fee Gateway</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Payable Amount</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'var(--text-primary)' }}>₹45,000.00</div>
            </div>

            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>SELECT PAYMENT METHOD</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
              {[
                { id: 'upi', label: 'Instant UPI', sub: '0% Surcharge' },
                { id: 'netbanking', label: 'Net Banking', sub: 'All Banks' },
                { id: 'card', label: 'Debit/Credit', sub: 'Visa/Mastercard' },
                { id: 'neft', label: 'NEFT/RTGS', sub: 'Bravant Grp' },
              ].map(p => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPayment(p.id)}
                  style={{ padding: '8px', borderRadius: 8, border: `2px solid ${selectedPayment === p.id ? 'var(--primary)' : 'var(--border)'}`, background: selectedPayment === p.id ? 'var(--primary-lighter)' : 'white', cursor: 'pointer', textAlign: 'center' }}
                >
                  <div style={{ fontWeight: 700, fontSize: 13, color: selectedPayment === p.id ? 'var(--primary)' : 'var(--text-primary)' }}>{p.label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{p.sub}</div>
                </div>
              ))}
            </div>

            {selectedPayment === 'upi' && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  {['GPay', 'PhonePe', 'Paytm'].map((app, i) => (
                    <button key={i} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: 11 }}>{app}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input className="form-input" defaultValue="sharma.rajesh@icicl" style={{ flex: 1 }} placeholder="UPI ID or Scan QR" />
                  <button className="btn btn-secondary btn-sm">Generate QR</button>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>Zero transaction fees. Payment reflects within 60 seconds on the institutional ledger.</div>
              </div>
            )}

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 16, fontWeight: 800 }}>
              🔒 Proceed to Pay ₹45,000 →
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>
              <span>256-bit Bank Grade SSL Encryption</span>
              <span>•</span>
              <span>PCI-DSS Level 1</span>
              <span>•</span>
              <span>Instant GST Receipt</span>
              <span>•</span>
              <span>RBI Guidelines Compliant</span>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>LEDGER SPECIFICATION</div>
              <div className="card-title">Term III Fee Breakdown</div>
              <div className="card-subtitle">Jan–Mar 2025</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            {feeBreakdown.map((item, i) => (
              <div key={i} className="fee-row">
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>{item.amount}</div>
              </div>
            ))}
            <div style={{ borderTop: '2px solid var(--primary)', paddingTop: 12, marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: 16 }}>Term III Net Due</span>
              <span style={{ fontWeight: 900, fontSize: 18, color: 'var(--primary)' }}>₹45,000</span>
            </div>
            <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--orange-light)', border: '1px solid #fed7aa', borderRadius: 8, fontSize: 12.5, color: 'var(--orange)' }}>
              <strong>Important Notice:</strong> Late fees of ₹50/day apply for payments received post-March 15, 2025. All fees paid before are fully eligible for income tax exemption under Section 80(C) of the IT Act.
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div className="card-title">■ Official Tax Invoices & Historical Ledger</div>
            <div className="card-subtitle">Verified GST-compliant invoices, transaction IDs, and downloadable official digital stamps</div>
          </div>
          <div className="flex gap-10">
            <div style={{ position: 'relative' }}>
              <input className="form-input" style={{ paddingRight: 8 }} placeholder="Search invoice ref..." />
            </div>
            <button className="btn btn-secondary btn-sm">Filter</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>INVOICE #</th>
                <th>DATE</th>
                <th>TERM / DESCRIPTION</th>
                <th>AMOUNT</th>
                <th>PAYMENT METHOD</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary)' }}>{inv.id}</td>
                  <td style={{ fontSize: 13 }}>{inv.date}</td>
                  <td style={{ maxWidth: 200 }}>
                    {inv.desc.split('\n').map((line, li) => (
                      <div key={li} style={{ fontSize: li === 0 ? 13.5 : 12, fontWeight: li === 0 ? 600 : 400, color: li === 0 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{line}</div>
                    ))}
                  </td>
                  <td style={{ fontWeight: 800, fontSize: 15 }}>{inv.amount}</td>
                  <td style={{ fontSize: 13 }}>{inv.method}</td>
                  <td>
                    <span className={`tag ${inv.statusColor}`} style={{ fontSize: 11 }}>● {inv.status}</span>
                  </td>
                  <td>
                    <div className="flex gap-6">
                      {inv.action ? (
                        <button className="btn btn-primary btn-xs">{inv.action}</button>
                      ) : (
                        <>
                          <button className="btn btn-secondary btn-xs">⬇</button>
                          <button className="btn btn-secondary btn-xs">🖨</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Certificate */}
      <div className="card mb-20" style={{ background: 'var(--primary-lighter)', border: '1.5px solid #bbf7d0' }}>
        <div className="card-body" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary)', marginBottom: 4 }}>Income Tax Rebate Certificate (FY 2024–25)</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Consolidated documentation of pure Tuition Fee paid eligible under Sec 80(C) with Greenwood High official seal.</div>
          </div>
          <button className="btn btn-secondary btn-sm"><Download size={14} /> Export Consolidated FY 24–25 Statement</button>
        </div>
      </div>

      {/* Helpdesk */}
      <div className="grid grid-2">
        <div className="card" style={{ background: 'var(--border-light)' }}>
          <div className="card-body" style={{ padding: '16px 20px' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Institutional Fee Helpdesk & Reconciliation</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Have questions regarding bank transfer or insurance, corporate reimbursement vouchers, or scholarship credits? Reach out to the Greenwood High Finance Office.</div>
            <div className="flex gap-12 flex-wrap">
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>Email Desk:</div>
                <div style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>accounts@greenwood.edu</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>Counter Hours</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>MON–FRI 08:30 AM – 03:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ background: 'var(--orange-light)', border: '1.5px solid #fed7aa' }}>
          <div className="card-body" style={{ padding: '16px 20px' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--orange)' }}>Discrepancy in Ledger?</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>Attach your UTR number or bank transaction confirmation screenshot for 2-hour priority audit.</div>
            <button className="btn btn-primary btn-sm">Raise Fee Query</button>
            <button className="btn btn-secondary btn-sm" style={{ marginLeft: 8 }}>FAQ & Policies</button>
          </div>
        </div>
      </div>
    </div>
  )
}
