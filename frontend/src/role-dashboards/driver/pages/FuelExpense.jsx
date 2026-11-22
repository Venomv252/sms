import React, { useState } from 'react'
import { Wallet, Camera, Download, Eye } from 'lucide-react'
import './FuelExpense.css'

const topStats = [
  { label: 'Monthly Fuel Quota', value: '642 /850L', sub: '208 L Available • 75.9% Consumed', bar: 75.9, barColor: '#f59e0b' },
  { label: 'Fuel Efficiency', value: '4.2 km/L', sub: 'Target Band: 4.0 - 4.5 km/L', badge: 'AIS-140 Verified Telematics', badgeColor: 'green' },
  { label: 'Petty Operating Float', value: '₹3,150', sub: 'Weekly Spend: ~₹1,850.00 • Sanctioned Float: ₹5,000.00', sub2: 'in hand' },
  { label: 'Toll FASTag Balance', value: '₹3,420', sub: 'Auto-Recharge ICICI Pool', sub2: 'Threshold: Trigger ≤₹1,000', badge: 'Ready', badgeColor: 'green' },
]

const ledgerEntries = [
  { date: 'Today 05:40 AM', ref: '#VOUCH-8821', type: 'Diesel Top-up', detail: '50.0 Liters @₹98.50/L', vendor: 'IOCL Whitefield Station #14', amount: '₹4,925.00', status: 'Bursar Pre-Approved', statusColor: 'orange' },
  { date: 'Today 07:38 AM', ref: '#FAST-1092', type: 'FASTag Surcharge', detail: 'Hope Farm Corridor Toll Gate #3', vendor: 'NHAI FASTag Auto-Plaza', amount: '₹45.00', status: 'Direct Debit', statusColor: 'blue' },
  { date: 'Yesterday 04:15 PM', ref: '#PUBC-4432', type: 'Rear Valve & Nitrogen Top-up', detail: 'Outer Tyre Valve Replacement', vendor: 'Sri Balaji Tyres & Service', amount: '₹250.00', status: 'Petty Cash Reimbursed', statusColor: 'green' },
  { date: '22 Feb 2025 11:20 AM', ref: '#DEF-3019', type: 'AdBlue Exhaust Fluid', detail: '10.0 Liters Jerry Can Refill', vendor: 'IOCL Whitefield Station #14', amount: '₹680.00', status: 'Audited', statusColor: 'green' },
  { date: '20 Feb 2025 06:05 AM', ref: '#VOUCH-8790', type: 'Diesel Top-up', detail: '48.0 Liters @₹98.50/L', vendor: 'IOCL Whitefield Station #14', amount: '₹4,728.00', status: 'Settled', statusColor: 'green' },
]

const weeklyData = [155, 148, 156, 142]

export default function FuelExpense() {
  const [expenseType, setExpenseType] = useState('Diesel Top-up')
  const [activeFilter, setActiveFilter] = useState('All Vouchers')
  const filters = ['All Vouchers', 'Diesel Only', 'FASTag Tolls', 'Petty Float']

  return (
    <div className="fuel-page">
      {/* Header */}
      <div className="card fuel-header">
        <div className="flex items-center gap-3">
          <div className="fuel-icon"><Wallet size={20} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>Route #14 Whitefield Express</div>
            <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
              Ashok Leyland Falcon • KA-01-MJ-9941 &nbsp;|&nbsp;
              Assigned Driver: Ramesh Babu (#DRV-007) &nbsp;|&nbsp;
              Bursar Fleet Account: GWH-BLR-TRANS-2025
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wallet size={14} style={{ color: 'var(--blue)' }} />
            <div>
              <div className="text-xs font-semibold">FLEET CARD LINK</div>
              <div className="text-xs" style={{ color: 'var(--gray-500)' }}>IOCL Corporate #9921-4820</div>
            </div>
            <span className="badge badge-green">● Active</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="fuel-stats-grid">
        {topStats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="fuel-stat-value">{s.value}</div>
            {s.sub2 && <div className="text-xs font-semibold" style={{ color: 'var(--gray-700)' }}>{s.sub2}</div>}
            {s.bar !== undefined && (
              <div className="progress-bar mt-1">
                <div className="progress-fill" style={{ width: `${s.bar}%`, background: s.barColor }}></div>
              </div>
            )}
            <div className="stat-sub">{s.sub}</div>
            {s.badge && <span className={`badge badge-${s.badgeColor} mt-1`} style={{ fontSize: 9 }}>{s.badge}</span>}
          </div>
        ))}
      </div>

      <div className="fuel-main-grid">
        {/* Left: Form + Ledger */}
        <div className="flex flex-col gap-3">
          {/* Log voucher */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Log Fuel or Transit Voucher</div>
                <div className="section-subtitle">Real-time ledger submission to GreenWood Bursar Accounts</div>
              </div>
              <button className="btn btn-outline btn-sm">Voucher Draft</button>
            </div>

            <div className="form-grid">
              <div>
                <label className="form-label">EXPENSE CATEGORY</label>
                <select value={expenseType} onChange={e => setExpenseType(e.target.value)} style={{ marginTop: 4 }}>
                  <option>Diesel Top-up</option>
                  <option>FASTag Toll</option>
                  <option>Petty Float Expense</option>
                  <option>Maintenance / Repair</option>
                </select>
              </div>
              <div>
                <label className="form-label">FUEL STATION / VENDOR OUTLET</label>
                <input type="text" defaultValue="IOCL Whitefield Station #1" style={{ marginTop: 4 }} />
              </div>
            </div>

            {/* Fuel meter details */}
            <div className="fuel-meter-section">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold">🔢 FUEL METER DETAILS</span>
                <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Odometer must match GPS telematics</span>
              </div>
              <div className="fuel-meter-grid">
                <div>
                  <label className="form-label">Odometer (km)</label>
                  <input type="number" defaultValue="142860" style={{ marginTop: 4 }} />
                </div>
                <div>
                  <label className="form-label">Liters Pumped</label>
                  <input type="number" defaultValue="45.0" style={{ marginTop: 4 }} />
                </div>
                <div>
                  <label className="form-label">Rate / Liter (₹)</label>
                  <input type="number" defaultValue="98.50" style={{ marginTop: 4 }} />
                </div>
              </div>
              <div className="calculated-cost">
                <span className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Calculated Total Fuel Cost:</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--gray-900)' }}>₹4,432.50</span>
              </div>
            </div>

            {/* Attestation */}
            <div className="attestation-grid">
              <div className="receipt-upload">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--gray-600)' }}>PRINTED RECEIPT SNAPSHOT</div>
                <button className="upload-btn">
                  <Camera size={18} />
                  <div>Tap to Snap Invoice</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>PNG/JPG or PDF (Max 8MB)</div>
                </button>
              </div>
              <div className="digital-attest">
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--gray-600)' }}>DRIVER DIGITAL ATTESTATION</div>
                <div className="attest-box">
                  <div className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 700 }}>✓ Ramesh Babu (#DRV-007)</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Auth Token: GWE-SIG-9941</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }}>GPS timestamp upon confirmation</div>
                </div>
                <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 6 }}>🔒 Encrypted instant push to Bursar ERP</div>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-3" style={{ padding: '11px' }}>
              Submit Voucher to Bursar →
            </button>
          </div>

          {/* Siphon guard */}
          <div className="card siphon-guard">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">● AIS-140 SIPHON GUARD</span>
                <span className="badge badge-green" style={{ fontSize: 9 }}>Zero Anomalies</span>
              </div>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-600)', marginBottom: 8 }}>
              Ultrasonic tank sensor linked with fuel inlet lock. 100% matched with telematics GPS telemetry along Route 14.
            </div>
            <div className="flex gap-4">
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Tank Level (Live)</div><div className="font-bold">148.5 L</div></div>
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Status</div><div className="font-bold" style={{ color: 'var(--green-primary)' }}>Secured</div></div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Recent Transit & Fuel Expense Ledger</div>
                <div className="section-subtitle">Verified digital vouchers for Route #14 Whitefield Express</div>
              </div>
            </div>
            <div className="filter-tabs" style={{ marginBottom: 12 }}>
              {filters.map((f, i) => (
                <button key={i} className={`filter-tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="ledger-table-wrapper">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>DATE & TIME</th>
                    <th>VOUCHER REF #</th>
                    <th>EXPENSE TYPE & DETAILS</th>
                    <th>VENDOR / TOLL STATION</th>
                    <th>AMOUNT PAID</th>
                    <th>SETTLEMENT STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {ledgerEntries.map((e, i) => (
                    <tr key={i}>
                      <td>
                        <div className="font-semibold" style={{ fontSize: 11 }}>{e.date.split(' ')[0]}</div>
                        <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{e.date.split(' ').slice(1).join(' ')}</div>
                      </td>
                      <td><span className="font-mono" style={{ fontSize: 11 }}>{e.ref}</span></td>
                      <td>
                        <div className="font-semibold" style={{ fontSize: 11 }}>{e.type}</div>
                        <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{e.detail}</div>
                      </td>
                      <td className="text-xs" style={{ color: 'var(--gray-600)' }}>{e.vendor}</td>
                      <td><span className="font-bold">{e.amount}</span></td>
                      <td>
                        <span className={`badge badge-${e.statusColor === 'green' ? 'green' : e.statusColor === 'orange' ? 'orange' : 'blue'}`} style={{ fontSize: 9 }}>
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-3 flex-wrap gap-2">
              <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
                ● Showing last 5 of 38 logged vouchers for February 2025 cycle
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm"><Download size={11} /> Download PDF Statement</button>
                <button className="btn btn-outline btn-sm"><Eye size={11} /> View All Transactions</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chart */}
        <div className="flex flex-col gap-3" style={{ maxWidth: 280 }}>
          <div className="card">
            <div className="flex justify-between items-center mb-1">
              <span className="section-title">Monthly Fuel Velocity</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 12 }}>
              February 2025<br/>
              Liters consumed vs student passenger km per academic week.
            </div>
            <div className="fuel-chart">
              {weeklyData.map((v, i) => (
                <div key={i} className="fuel-bar-col">
                  <div className="fuel-bar-label">{v}L</div>
                  <div className="fuel-bar-track">
                    <div className="fuel-bar-fill" style={{
                      height: `${(v / 170) * 100}%`,
                      background: i === 3 ? 'var(--green-light)' : 'var(--green-primary)'
                    }}></div>
                  </div>
                  <div className="fuel-bar-week">W{i + 1}{i === 3 ? '*' : ''}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-2 text-xs">
                <span style={{ width: 10, height: 10, background: 'var(--green-primary)', borderRadius: 2, display: 'inline-block' }}></span>
                Actual Diesel Consumed
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span style={{ width: 10, height: 10, background: 'var(--green-light)', borderRadius: 2, display: 'inline-block', border: '1px solid var(--green-primary)' }}></span>
                Est. vs Capacity
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
