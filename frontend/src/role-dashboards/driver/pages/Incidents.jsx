import React, { useState } from 'react'
import { AlertTriangle, Shield, MapPin, Radio, ChevronRight, CheckCircle } from 'lucide-react'
import './Incidents.css'

const safetyStats = [
  { label: 'Corridor Safety Score', value: '99.4%', sub: 'Greenwood High Fleet Apex', badge: 'Gold Star', color: 'green' },
  { label: 'Active Road Obstacles', value: '01', sub: 'BWSSB trenching near Hope...', badge: '+10m Delay', color: 'orange' },
  { label: 'Student Behavioral Flags', value: '0', sub: 'All pastoral codes maintained today', badge: 'Clear Roster', color: 'green' },
  { label: 'Resolved Hazards (MTD)', value: '06', sub: 'Avg dispatch time: 4.2 mins', badge: 'All Corridor Cleared', color: 'blue' },
]

const hazardTypes = [
  { label: 'Road / Traffic Obstacle', desc: 'Flooding, construction, barricades' },
  { label: 'Student Pastoral Concern', desc: 'Swellbeing, wellness, friction' },
  { label: 'Parent Interaction / Ragu', desc: 'Entry, close, dispute, disquote' },
  { label: 'Mechanical / Cabin System', desc: 'A/c close, door latch, engine while' },
]

const stopOptions = [
  'Stop 01 - Hope Farm Junction',
  'Stop 02 - ITPL Tech Park Main Gate',
  'Stop 03 - Prestige Ozone Phase 1',
  'Stop 04 - Palm Meadows Hub',
  'Stop 05 - ECC Road Cross',
  'Stop 06 - Borewell Road Junction',
  'Stop 07 - Varthur Kodi Circle',
  'Stop 08 - Greenwood High Main Campus',
]

const urgencyLevels = [
  { label: 'Low Advisory', desc: 'No delay' },
  { label: 'Medium Impact', desc: '+10-15m Delay' },
  { label: 'Critical Halt', desc: 'Immediate Rescue' },
]

const recentIncidents = [
  {
    status: 'active',
    badge: 'ACTIVE OBSTACLE',
    time: '07:18',
    delay: '+10m Delay Impact',
    title: 'BWSSB Underground Trenching at Hope Farm Jn.',
    detail: 'A major water pipeline excavation has reduced inbound carriage to single lane. Heavy dumper packing into traffic.',
    actions: [
      'Traffic warden deployed at junction signal.',
      'Instant SMS broadcast pushed to Stop 5-8 parents.',
      'Dynamic geofence ETA re-calibrated (+10m)',
    ],
    reporter: 'Reported by Ramesh Babu',
    monitor: 'Monitoring by Fleet HQ',
  },
  {
    status: 'resolved',
    badge: 'RESOLVED',
    time: '2 Days Ago',
    variance: '4m Variance',
    title: 'Heavy Waterlogging at Borewell Road Underpass',
    detail: 'Underpass flooded after flash rain. Ramesh Babu executed authorized route deflection via Inner Circle Road with no student hazard.',
    closer: 'Closed by Gurmeet Singh (Transport Head) &nbsp;•&nbsp; Ticket #HZ-8812',
  },
  {
    status: 'pastoral',
    badge: 'PASTORAL NOTE',
    time: 'Yesterday PM',
    closed: 'Closed in Care App',
    title: 'Grade 8 Student Refusing Seatbelt during Deceleration',
    detail: 'Student in Seat 148 repeatedly unbuckled while bus approached Channahandra\'s stop. Escort Dr. Evans called a front safety suspension via designated bus audio intercom. Never exit the cockpit during conflict.',
    resolution: 'Pastoral Care Resolution: Handled via Restorative Dialogue. Parent signed off acknowledgment within the portal.',
  },
]

const sops = [
  {
    title: 'Roadside & Parent Escalation',
    detail: 'In cases of disgruntled motorists or delayed guardians at designated stops: maintain cabin doors locked, activate external hazard flashers, and engage only via designated bus audio intercom. Never exit the cockpit during conflict.',
    ref: 'SOP Ref: SEC-04B →'
  },
  {
    title: 'Motion Sickness & Transit Wellness',
    detail: 'Bus escort leads student to designated from-row wellness seat (Row 1-2). Provide pastoral paper bag, bottled electrolyte water, and regulate AC vent to 22°C. Driver alerts dispatch of a potential 3-minute curb response.',
    ref: 'SOP Ref: MED-12A →'
  },
  {
    title: 'Monsoon & Flash Waterlogging',
    detail: 'If water levels exceed bus wheel hub (18 inches at underpasses of Hope Farm low ground), immediately stop, halt bus, high-ground curb, transmit telemetry alert, and request automated route deflection via IPS bypass.',
    ref: 'SOP Ref: ENV-09C →'
  },
]

export default function Incidents() {
  const [selectedHazard, setSelectedHazard] = useState(0)
  const [selectedUrgency, setSelectedUrgency] = useState(1)
  const [selectedStop, setSelectedStop] = useState('Stop 03 - Hope Farm Junction')

  return (
    <div className="incidents-page">
      {/* Header */}
      <div className="card incidents-header">
        <div className="flex items-start gap-3 flex-wrap">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="badge badge-green" style={{ fontSize: 9 }}>● LIVE SAFETY OPS</span>
              <span className="badge badge-gray" style={{ fontSize: 9 }}>Corridor ID: BLR-WF-14-AM</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>
              Route #14 Whitefield Corridor Safety Command
            </h1>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }}>
              Real-time hazard telemetry, student transit pastoral log, and roadside incident reporting.
            </div>
          </div>
          <div className="incidents-pilots">
            <div className="pilot-chip">
              <div className="pilot-avatar green">RB</div>
              <div>
                <div className="text-xs font-semibold">Primary Pilot</div>
                <div style={{ fontSize: 12 }}>Ramesh Babu</div>
              </div>
            </div>
            <div className="pilot-chip">
              <div className="pilot-avatar blue">AE</div>
              <div>
                <div className="text-xs font-semibold">Bus Escort / Pastoral</div>
                <div style={{ fontSize: 12 }}>Dr. Alistair Evans</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safety stats */}
      <div className="incidents-stats-grid">
        {safetyStats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.color === 'green' ? 'text-green' : s.color === 'orange' ? 'text-orange' : ''}`} style={{ fontSize: 22 }}>
              {s.value}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge badge-${s.color === 'green' ? 'green' : s.color === 'orange' ? 'orange' : 'blue'}`} style={{ fontSize: 9 }}>{s.badge}</span>
            </div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="incidents-main-grid">
        {/* Left: Report form */}
        <div className="flex flex-col gap-3">
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-gray" style={{ fontSize: 9 }}>🔒 Bus KA-01-MJ-9941</span>
            </div>
            <div className="section-title mb-3">Report New Corridor Hazard or Pastoral Incident</div>
            <div className="section-subtitle mb-3">Direct telemetry uplink to Central Fleet Command and Campus Operations Desk.</div>

            {/* Step 1 */}
            <div className="step-header">
              <span className="step-num">1</span>
              <span className="font-semibold">INCIDENT & HAZARD CLASSIFICATION</span>
            </div>
            <div className="hazard-grid">
              {hazardTypes.map((h, i) => (
                <label key={i} className={`hazard-option ${selectedHazard === i ? 'selected' : ''}`} onClick={() => setSelectedHazard(i)}>
                  <input type="radio" name="hazard" checked={selectedHazard === i} onChange={() => setSelectedHazard(i)} />
                  <div>
                    <div className="font-semibold" style={{ fontSize: 11 }}>{h.label}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{h.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Step 2 */}
            <div className="step-header mt-4">
              <span className="step-num">2</span>
              <span className="font-semibold">ROUTE #14 WAYPOINT / STOP</span>
            </div>
            <div className="form-row">
              <div style={{ flex: 1 }}>
                <select value={selectedStop} onChange={e => setSelectedStop(e.target.value)}>
                  {stopOptions.map((s, i) => <option key={i}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div className="gps-pin-box">
                  <MapPin size={12} style={{ color: 'var(--green-primary)' }} />
                  <span>12.9845°N, 77.7567°E</span>
                  <span className="badge badge-green" style={{ fontSize: 9 }}>Live Telemetry</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-header mt-4">
              <span className="step-num">3</span>
              <span className="font-semibold">OPERATIONAL IMPACT & URGENCY</span>
            </div>
            <div className="urgency-options">
              {urgencyLevels.map((u, i) => (
                <label key={i} className={`urgency-option ${selectedUrgency === i ? 'selected-' + ['low','medium','critical'][i] : ''}`} onClick={() => setSelectedUrgency(i)}>
                  <input type="radio" name="urgency" checked={selectedUrgency === i} onChange={() => setSelectedUrgency(i)} />
                  <div>
                    <div className="font-semibold" style={{ fontSize: 11 }}>{u.label}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{u.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Step 4 */}
            <div className="step-header mt-4">
              <span className="step-num">4</span>
              <span className="font-semibold">FIELD DETAILS & CONTEXT</span>
              <span className="badge badge-gray" style={{ fontSize: 9 }}>Voice-to-Text Dictation</span>
            </div>
            <textarea placeholder="Describe obstruction, student name /grade if pastoral, lane blockage status, or exact meter/mark..." rows={4} style={{ marginTop: 6 }} />

            {/* Broadcast options */}
            <div className="broadcast-options mt-3">
              <label className="broadcast-check">
                <input type="checkbox" defaultChecked />
                <span>Notify Transport Head (Gurmeet Singh) & Campus Pastoral Desk via High-Priority SMS and Console Pager.</span>
              </label>
              <label className="broadcast-check">
                <input type="checkbox" defaultChecked />
                <span>Push Dynamic ETA (+10m) directly to Greenwood Guardian Parent App for Stops 04 through 08.</span>
              </label>
            </div>

            <button className="btn btn-primary w-full mt-3" style={{ padding: '11px' }}>
              <Radio size={14} /> Transmit Hazard Alert to Central Dispatch
            </button>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--green-primary)' }}>
                🔒 Encrypted Telemetry Channel
              </div>
            </div>
          </div>
        </div>

        {/* Right: Incident ledger + map */}
        <div className="flex flex-col gap-3">
          {/* Radar map */}
          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <span className="section-title">Corridor Radar View</span>
              <span className="badge badge-green" style={{ fontSize: 9 }}>Live Feed Active</span>
            </div>
            <div className="map-placeholder" style={{ height: 160 }}>
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #c8e8d4 0%, #b0d4bc 100%)',
                borderRadius: 8,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 6
              }}>
                <div style={{ background: '#f59e0b', color: '#fff', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
                  ⚠ Stop #03 – Hope Farm Junction Overpass
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-700)' }}>Slow Crowd: 14 km/h</div>
                <div style={{ background: 'var(--green-primary)', color: '#fff', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>
                  🚌 Bus #14 • Active
                </div>
              </div>
            </div>
          </div>

          {/* Incident ledger */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Corridor Incident Ledger</div>
                <div className="section-subtitle">Shift log for today and recent clearance reports</div>
              </div>
              <span className="badge badge-gray">3 Records</span>
            </div>
            <div className="incident-ledger">
              {recentIncidents.map((inc, i) => (
                <div key={i} className={`incident-ledger-item inc-${inc.status}`}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`badge badge-${inc.status === 'active' ? 'red' : inc.status === 'resolved' ? 'green' : 'blue'}`} style={{ fontSize: 9 }}>
                      {inc.badge}
                    </span>
                    <span className="text-xs font-semibold">{inc.time}</span>
                    {inc.delay && <span className="badge badge-orange" style={{ fontSize: 9 }}>{inc.delay}</span>}
                    {inc.variance && <span className="badge badge-gray" style={{ fontSize: 9 }}>{inc.variance}</span>}
                    {inc.closed && <span className="badge badge-blue" style={{ fontSize: 9 }}>{inc.closed}</span>}
                  </div>
                  <div className="font-semibold" style={{ fontSize: 12, marginBottom: 4 }}>{inc.title}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-600)' }}>{inc.detail}</div>
                  {inc.actions && (
                    <div className="mt-2">
                      <div className="text-xs font-semibold" style={{ color: 'var(--gray-500)', marginBottom: 3 }}>AUTOMATED DISPATCH ACTIONS</div>
                      {inc.actions.map((a, j) => (
                        <div key={j} className="text-xs flex gap-1" style={{ color: 'var(--gray-600)', marginBottom: 2 }}>
                          <span style={{ color: 'var(--green-primary)' }}>•</span> {a}
                        </div>
                      ))}
                      <div className="flex justify-between items-center mt-2 text-xs" style={{ color: 'var(--gray-500)' }}>
                        <span>{inc.reporter}</span>
                        <span>{inc.monitor}</span>
                      </div>
                    </div>
                  )}
                  {inc.closer && (
                    <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }} dangerouslySetInnerHTML={{ __html: inc.closer }} />
                  )}
                  {inc.resolution && (
                    <div className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600, marginTop: 4 }}>{inc.resolution}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SOPs */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="section-title">Greenwood High Transit Protocols</div>
            <div className="section-subtitle">Standard Operating Procedures: Roadside Conduct & Student Safety</div>
          </div>
          <span className="badge badge-gray" style={{ fontSize: 9 }}>Revision 2024.3 – Institutional Standards</span>
        </div>
        <div className="sop-cards-grid">
          {sops.map((s, i) => (
            <div key={i} className="sop-protocol-card">
              <div className="sop-icon">{['🛣', '🤒', '🌊'][i]}</div>
              <div>
                <div className="font-semibold mb-1" style={{ fontSize: 12 }}>{s.title}</div>
                <div className="text-xs" style={{ color: 'var(--gray-600)', lineHeight: 1.5 }}>{s.detail}</div>
                <button className="btn btn-outline btn-sm mt-2">{s.ref}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
