import React, { useState } from 'react'
import { AlertCircle, Clock, MapPin, Phone, Truck, CheckSquare, Radio } from 'lucide-react'
import './Breakdown.css'

const topStats = [
  { label: 'Fleet Dispatch SLA', value: '≤ 12.0 mins', sub: 'Average today: 9.4 mins' },
  { label: 'Pass. Reroute Safety', value: '08:30 AM IST', sub: 'Guaranteed arrival' },
  { label: 'Nearby Standby Bus', value: 'Bus #22 (Depot)', sub: '1 mins driving ETA' },
  { label: 'Current Vehicle Status', value: 'Safe In Transit', sub: '0 logged faults today' },
]

const causeOptions = [
  { label: 'Engine Overheat / Coolant Leak', desc: 'Steam observed, temperature gauge above 110°C.' },
  { label: 'Flat Tyre / Puncture', desc: 'Rear dual tyre punctured, vehicle immobile safely.' },
  { label: 'Transmission / Clutch Failure', desc: "Gear shifting locked, clutch pedal loss of pressure." },
  { label: 'Electrical / Alternator Fault', desc: 'Main cluster off, battery depleted, won\'t crank.' },
  { label: 'Brake System Warning', desc: 'Pneumatic pressure low warning buzzer sounding.' },
  { label: 'Minor Collision / Fender Bender', desc: 'No student injuries. Minor front bumper scraping.' },
]

const safetyChecks = [
  'Location Secured: Bus is safely steered to road shoulder / service lane with double hazard blinkers ON.',
  'Warning Perimeter: Retro-reflective emergency warning triangle deployed 30 meters behind bus.',
  'Student Escort Control: All 36 students remain seated inside air-conditioned cabin supervised by 3 Faculty Escorts (Mrs. Radhika, Mr. David, Mrs. Sumathi).',
]

const reliefDirectory = [
  { id: 'Standby Bus #22', driver: 'Driver M. Anthony', depot: 'Kundanahalli Fleet Depot • Stby 4.', phone: '+91  98651 77884', status: 'Available', statusColor: 'green', action: 'Direct Call' },
  { id: 'Heavy Duty Tow #TOW-02', operator: 'Operator: Suresh Gowda', dist: 'Whitefield Fleet Yard • 6.8m away', phone: '+91 98450 31200', status: 'On-Call', statusColor: 'orange', action: 'Dial Yard' },
  { id: 'AutoDesk Rapid Van', chief: 'Chief Tech: Imran Khan (Falcon Certified)', equipped: 'Equipped for Coolant, Air-Breaks & Tyre Replacement', phone: '+91  98458 08521', status: 'Patrolling', statusColor: 'blue', action: 'Dispatch Van' },
]

const incidents = [
  { date: '16 Jun 2025', type: 'Radiator Hose Pitched', resolved: true, duration: '13 min', detail: 'Replaced hose, coolant flushed.' },
  { date: '02 Nov 2024', type: 'Rear Left Outer Puncture', resolved: true, duration: '15.5 min', detail: 'Mobile jack applied, stepney wheel mounted.' },
]

const broadcastItems = [
  { label: 'Central Fleet Transport Control (Gurmeet Singh + Lead Dispatcher)', detail: 'Immediately in high-priority ping and dispatcher on-scene incident ticket logged.' },
  { label: 'Director & Principal Desk (Dr. Eleanor Vance)', detail: 'Executive event SMS and institutional notification dispatched.' },
  { label: 'Automated Parent Cabin Broadcast (EMS & Greenwood Parent App Push)', detail: '"school Bus #14 experienced a minor mechanical delay at ECC Rd. Students are completely safe with faculty escorts. Standby relief bus dispatched. ETA update in 5 mins."', highlight: true, recipients: '38 Parent recipients queued automatically based on active RFID roll call' },
  { label: 'Campus Main Gate Reception & Primary Wing Coordinators', detail: 'Class homeroom teachers notified of delayed zero-period attendance.' },
]

export default function Breakdown() {
  const [selectedCause, setSelectedCause] = useState(0)
  const [selectedMode, setSelectedMode] = useState('central')
  const [checkedSafety, setCheckedSafety] = useState([true, true, true])

  const toggleSafety = (i) => {
    setCheckedSafety(prev => {
      const n = [...prev]; n[i] = !n[i]; return n
    })
  }

  return (
    <div className="breakdown-page">
      {/* Header */}
      <div className="card breakdown-header">
        <div className="flex items-center gap-3 mb-1">
          <span className="badge badge-blue" style={{ fontSize: 9 }}>STANDARD OPERATIONS ACTIVE</span>
          <span className="badge badge-gray" style={{ fontSize: 9 }}>Fleet Protocol V2.2 ▸</span>
        </div>
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={22} style={{ color: '#dc2626' }} />
              <h1 style={{ fontSize: 24, fontWeight: 800 }}>Emergency Incident &<br/>Rapid Bus Replacement</h1>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
              Live GPS Telemetry Sync: KA-01-MJ-9941<br/>
              Assigned: Bus #14 (Ashok Leyland Falcon Heavy) • Capacity: 44 Seater • Current Load: 36 Students + 3 Escorts
            </div>
          </div>
          <div className="sla-card">
            <div className="text-xs font-semibold" style={{ color: 'var(--gray-500)' }}>PROTOCOL SLA TARGET</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--gray-900)' }}>12 Min Dispatch</div>
            <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Resolve by OA-SOP-2025</div>
          </div>
          <button className="btn btn-danger">
            <AlertCircle size={14} /> Report Active Breakdown
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="breakdown-stats-grid">
        {topStats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 17 }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="breakdown-main-grid">
        {/* Left: Protocol form */}
        <div className="flex flex-col gap-3">
          {/* Section title */}
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-gray" style={{ fontSize: 9 }}>DRIVER ACTION PROTOCOL</span>
              <span className="badge badge-blue" style={{ fontSize: 9 }}>SOP Form #BRK-2025</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              Breakdown Diagnostic & Instant Replacement Dispatch
            </div>
          </div>

          {/* Step 1: Cause */}
          <div className="card">
            <div className="step-header">
              <span className="step-num">1</span>
              <span className="font-semibold">Breakdown Cause & Primary Severity</span>
              <span className="badge badge-red" style={{ fontSize: 9 }}>* Required for dispatch mechanics</span>
            </div>
            <div className="cause-grid">
              {causeOptions.map((c, i) => (
                <label key={i} className={`cause-option ${selectedCause === i ? 'selected' : ''}`} onClick={() => setSelectedCause(i)}>
                  <input type="radio" name="cause" checked={selectedCause === i} onChange={() => setSelectedCause(i)} />
                  <div>
                    <div className="font-semibold" style={{ fontSize: 11 }}>{c.label}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{c.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Safety */}
          <div className="card">
            <div className="step-header">
              <span className="step-num">2</span>
              <span className="font-semibold">Vehicle & Passenger Safe Haven Verification</span>
            </div>
            <div className="safety-checks">
              {safetyChecks.map((check, i) => (
                <label key={i} className={`safety-check ${checkedSafety[i] ? 'checked' : ''}`}>
                  <input type="checkbox" checked={checkedSafety[i]} onChange={() => toggleSafety(i)} />
                  <span style={{ fontSize: 12 }}>{check}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Dispatch mode */}
          <div className="card">
            <div className="step-header">
              <span className="step-num">3</span>
              <span className="font-semibold">Passenger Offload & Relief Dispatch Mode</span>
            </div>
            <div className="dispatch-modes">
              <label className={`dispatch-option ${selectedMode === 'central' ? 'selected' : ''}`} onClick={() => setSelectedMode('central')}>
                <input type="radio" name="mode" checked={selectedMode === 'central'} onChange={() => setSelectedMode('central')} />
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ fontSize: 12 }}>Option A: Central Standby Bus #22</span>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>Recommended</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }}>
                    Dispatches from Kundanahalli Depot (4.2 km)<br/>
                    Direct Arrival ETA: 11 mins<br/>
                    All 36 students transferred together. Single transfer, zero roster fragmentation.
                  </div>
                </div>
              </label>
              <label className={`dispatch-option ${selectedMode === 'split' ? 'selected' : ''}`} onClick={() => setSelectedMode('split')}>
                <input type="radio" name="mode" checked={selectedMode === 'split'} onChange={() => setSelectedMode('split')} />
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ fontSize: 12 }}>Option B: Split Across Nearby Fleet</span>
                    <span className="badge badge-gray" style={{ fontSize: 9 }}>Adv-Moc.</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }}>
                    Bus #08 (12 vacant seats) + Bus #12 (4 seats)<br/>
                    Synchronized Arrival ETA: 7 mins & 14 mins<br/>
                    Splits students across two active routes needing to compute.
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Step 4: Broadcast */}
          <div className="card">
            <div className="step-header">
              <span className="step-num">4</span>
              <span className="font-semibold">Automated Multi-Channel Communication Broadcast</span>
            </div>
            <div className="broadcast-list">
              {broadcastItems.map((b, i) => (
                <label key={i} className="broadcast-item">
                  <input type="checkbox" defaultChecked />
                  <div>
                    <div className="font-semibold" style={{ fontSize: 11 }}>{b.label}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{b.detail}</div>
                    {b.recipients && (
                      <div className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600, marginTop: 4 }}>{b.recipients}</div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button className="btn btn-danger w-full" style={{ padding: '12px' }}>
            <AlertCircle size={16} /> Authorize Emergency Relief Protocol
          </button>
          <div className="text-xs" style={{ color: 'var(--gray-500)', textAlign: 'center' }}>
            🔒 Ramesh Babu authenticated as current shift commander.
          </div>
        </div>

        {/* Right: Relief Directory + Map + History */}
        <div className="flex flex-col gap-3">
          {/* Relief Directory */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <span className="section-title">Relief Directory</span>
              <span className="badge badge-green">3 READY</span>
            </div>
            <div className="relief-list">
              {reliefDirectory.map((r, i) => (
                <div key={i} className="relief-card">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold" style={{ fontSize: 12 }}>{r.id}</span>
                    <span className={`badge badge-${r.statusColor === 'green' ? 'green' : r.statusColor === 'orange' ? 'orange' : 'blue'}`} style={{ fontSize: 9 }}>{r.status}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', margin: '3px 0' }}>
                    {r.driver || r.operator || r.chief}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
                    {r.depot || r.dist || r.equipped}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{r.phone}</span>
                    <button className={`btn btn-sm ${r.statusColor === 'green' ? 'btn-primary' : 'btn-outline'}`}>
                      <Phone size={11} /> {r.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="card">
            <div className="section-title mb-2">ECC Breakdown Zone <span className="text-xs" style={{ color: 'var(--gray-500)', fontWeight: 400 }}>Live Sector 4</span></div>
            <div className="map-placeholder" style={{ height: 180 }}>
              <div style={{
                background: 'linear-gradient(135deg, #d1e8d4 0%, #b8d4bc 100%)',
                width: '100%', height: '100%',
                borderRadius: 8,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 6
              }}>
                <div style={{ background: 'var(--green-primary)', color: '#fff', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                  🚌 Bus #14 Stationary
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-700)' }}>Pin: 12.9498°N, 77.7099°E</div>
              </div>
            </div>
          </div>

          {/* Incident History */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <span className="section-title">Recent Incident History</span>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Bus #14 Logs</span>
            </div>
            <div className="incident-history">
              {incidents.map((inc, i) => (
                <div key={i} className="inc-row">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold" style={{ fontSize: 11 }}>{inc.date}</div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{inc.type}</div>
                      <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Resolution Time: {inc.duration} • {inc.detail}</div>
                    </div>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>Resolved</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="annual-clearance">
              <div>
                <div className="font-semibold" style={{ fontSize: 12 }}>ANNUAL CLEARANCE INDEX</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Resolution Time: 99.4% (Greenwood Standard)</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-primary)' }}>99.4%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
