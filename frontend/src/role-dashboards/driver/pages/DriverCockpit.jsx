import React from 'react'
import {
  Clock, Thermometer, Fuel, Zap, Users, BookOpen,
  MapPin, Shield, Phone, AlertTriangle, ChevronRight,
  CheckCircle, AlertCircle, Navigation, Wifi
} from 'lucide-react'
import './DriverCockpit.css'

const stats = [
  { label: 'Students Onboard', value: '36', sub: '/38 assigned', note: '3 parent-verified absences', icon: Users, color: 'green' },
  { label: 'Faculty Commuters', value: '3', sub: 'onboard', note: '100% Local Compliance', icon: BookOpen, color: 'blue' },
  { label: 'Route Progress', value: '5', sub: '/8 stops', note: 'Next: ECC Rd Cross (1m)', icon: MapPin, color: 'orange' },
  { label: 'Nearest Fleet Backup', value: '1.4', sub: 'km away', note: 'Bus #08 / Guduru Mthy R.)', icon: Shield, color: 'purple' },
]

const waypoints = [
  { id: 1, name: 'Hope Farm Jn', time: '07:16 AM', status: 'cleared', boarded: 8 },
  { id: 2, name: 'ITPL Tech Park', time: '07:26 AM', status: 'cleared', boarded: 6 },
  { id: 3, name: 'Prestige Ozone', time: '07:37 AM', status: 'cleared', boarded: 9 },
  { id: 4, name: 'Palm Meadows', time: '07:47 AM', status: 'cleared', boarded: 7 },
  { id: 5, name: 'ECC Rd Cross', time: '07:56 AM', status: 'warning', boarded: 4, warning: true },
  { id: 6, name: 'Borewell Rd', time: '08:06 AM', status: 'upcoming', boarded: 4 },
  { id: 7, name: 'Varthur Kodi', time: '08:16 AM', status: 'upcoming', boarded: 2 },
  { id: 8, name: 'Greenwood High', time: '08:14 AM', status: 'terminal', boarded: 0 },
]

const students = [
  { name: 'Rohan Varma', grade: 'Gr-9-C', rfid: '#GW-9402', address: 'Prestige Lakeside', status: 'boarded', time: '07:16 AM', parent: 'Mr. Vikram Varma' },
  { name: 'Ananya Sengupta', grade: 'Gr-11-A', rfid: '#GW-7982', address: 'Palm Meadows', status: 'boarded', time: '07:24 AM', parent: 'Mrs. Supriya Sengupta' },
  { name: 'Kabir Mehta', grade: 'Gr-10-B', rfid: '#AW-1144', address: 'Prestige Cosmo', status: 'alert', alertType: 'App Absent + Medical', parent: 'Col. Rajesh Mehta' },
  { name: 'Tanvi lyerr', grade: 'Gr-6-B', rfid: '#GW-4491', address: 'Palm Meadows Rd', status: 'boarded', time: '07:47 AM', parent: 'Dr. Madhavan Iyer' },
  { name: 'Vivaan Mehra', grade: 'Gr-11-A', rfid: '#GW-8113', address: 'ECC Road Cross', status: 'absent', alertType: 'Absent + Infirmary', parent: 'Mrs. Neeta Mehra' },
  { name: 'Annu Sharma', grade: 'Gr-12-B', rfid: 'ST-N-8', address: 'Borewell Rd', status: 'waiting', alertType: 'Waiting at Stop', parent: 'Rajesh Sharma' },
]

const faculty = [
  { name: 'Dr. Alistair Evans', dept: 'HOD Physics', seat: '#03', status: 'onboard' },
  { name: 'Ms. Clara Davis', dept: 'TOT English', seat: '#04', status: 'onboard' },
  { name: 'Mr. Tariq Mansoor', dept: 'HOT Chemistry', seat: '#05', status: 'onboard' },
]

const fleet = [
  { id: 'Bus #08', driver: 'Gurumurthy', dist: '0.3 km', capacity: '2/36', link: true },
  { id: 'Bus #12', driver: 'Anthony', dist: '3.1 km', capacity: '4/36', link: false },
  { id: 'Bus #22 (IH)', driver: 'M. Anthony', dist: '4.9 km', capacity: '32/36', link: false },
]

const hotlines = [
  { label: 'Transport Control Room', contact: '+91-80-4969-494...', color: 'green' },
  { label: 'Campus First Aid & Infirmary', contact: '+91 80 4546-9969', color: 'red' },
  { label: 'Whitefield Fast Police Station', contact: '+91 80 2294-2105', color: 'blue' },
  { label: 'Manipal Hospital Ambulance', contact: '+91-80-4969-4549', color: 'orange' },
  { label: 'Fire & Emergency Station #4', contact: '+91 80 2563-1101', color: 'red' },
  { label: 'Traffic Control & Corridor Ops', contact: '+91 80 2294-2294', color: 'blue' },
]

const expenses = [
  { type: 'Diesel Top-up 50.1 ltr', voucher: 'IOCL Whitefield', amount: '₹42.50', status: 'Auto-Approved' },
  { type: 'Hope Farm Toll Long Fastag', voucher: 'NHAI', amount: '₹2.50', status: 'Auto-Approved' },
]

const incidents = [
  { type: 'warning', msg: 'BWS51B Road Trenching - 07:18 AM', detail: 'Trench work in progress, traffic delays expected along ECC Rd. Traffic placed with diversion — all buses are directed onto Varthur Kodi Rd.' },
]

export default function DriverCockpit() {
  return (
    <div className="cockpit">
      {/* ── Driver Status Banner ── */}
      <div className="driver-banner card">
        <div className="banner-left">
          <div className="driver-avatar lg">RB</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ fontSize: 16 }}>Ramesh Babu</span>
              <span className="badge badge-green">#DRV-007</span>
            </div>
            <div className="text-sm" style={{ color: 'var(--gray-500)', marginTop: 2 }}>
              Senior Intercity Driver • 12 Yrs • Route #14
            </div>
            <div className="flex gap-2 mt-1">
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>📞 +91 99842 11092</span>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>🪪 84-05-2017</span>
            </div>
          </div>
        </div>

        <div className="banner-metrics">
          <div className="metric-item">
            <span className="metric-label">SPEED</span>
            <span className="metric-value">32<small>/40</small></span>
            <span className="metric-unit">km/h</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">PRE-BAC</span>
            <span className="metric-value green">0.00%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">TEMP</span>
            <span className="metric-value">84°C</span>
            <span className="metric-sub">Normal</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">FUEL</span>
            <span className="metric-value">78%</span>
            <span className="metric-sub">Remaining</span>
          </div>
        </div>

        <div className="banner-clock">
          <div className="clock-time">05:08 AM</div>
          <div className="text-xs" style={{ color: 'var(--gray-500)', textAlign: 'center' }}>
            Find Farm road duty patrol...
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="stat-value">{s.value}</span>
              <span className="text-sm" style={{ color: 'var(--gray-500)' }}>{s.sub}</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-400)', marginTop: 2 }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Waypoints Strip ── */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="section-title">Route #14 Transit Waypoints (Whitefield Corridor)</div>
            <div className="section-subtitle">8 Defined Waypoints • AIS-140 GPS Telemetry Synced</div>
          </div>
          <div className="flex gap-2">
            <span className="badge badge-orange">⚠ Delay +10 min (Hope Farm Trenching)</span>
            <button className="btn btn-sm btn-primary">Send 5-min Proximity Alert to Stop 5# events</button>
          </div>
        </div>
        <div className="waypoints-strip">
          {waypoints.map((wp, i) => (
            <div key={wp.id} className={`wp-node ${wp.status}`}>
              <div className="wp-circle">{wp.status === 'cleared' ? <CheckCircle size={14} /> : wp.id}</div>
              <div className="wp-name">{wp.name}</div>
              <div className="wp-time">{wp.time}</div>
              {wp.boarded > 0 && <div className="wp-count">{wp.boarded} Boarded</div>}
              {wp.warning && <span className="badge badge-orange" style={{ fontSize: 9 }}>+4 Waiting</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Two column: Manifest + Faculty ── */}
      <div className="two-col-grid">
        {/* Student Manifest */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="section-title">Student Passenger Manifest & RFID Roll Call</div>
              <div className="section-subtitle">Last RFID Boarding Log • Total 38 Registered</div>
            </div>
            <div className="flex gap-2">
              <span className="badge badge-green">Boarded: 36</span>
              <span className="badge badge-red">Absent: 2</span>
            </div>
          </div>
          <div className="student-list">
            {students.map((s, i) => (
              <div key={i} className="student-row">
                <div className="student-avatar">{s.name.charAt(0)}</div>
                <div className="student-info">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ fontSize: 12 }}>{s.name}</span>
                    <span className="tag" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{s.grade}</span>
                    <span className="tag" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}>{s.rfid}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>📍 {s.address}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Parent: {s.parent}</div>
                </div>
                <div className="student-status">
                  {s.status === 'boarded' && <span className="badge badge-green">✓ Boarded {s.time}</span>}
                  {s.status === 'alert' && <span className="badge badge-red">⚠ {s.alertType}</span>}
                  {s.status === 'absent' && <span className="badge badge-orange">✗ {s.alertType}</span>}
                  {s.status === 'waiting' && <span className="badge badge-yellow">⌛ {s.alertType}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty + Fleet */}
        <div className="flex flex-col gap-3">
          {/* Faculty */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div className="section-title">Faculty Commuters</div>
              <span className="badge badge-green">3/3 Onboard</span>
            </div>
            {faculty.map((f, i) => (
              <div key={i} className="faculty-row">
                <div className="faculty-avatar">{f.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
                <div style={{ flex: 1 }}>
                  <div className="font-semibold" style={{ fontSize: 12 }}>{f.name}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{f.dept} • Seat {f.seat}</div>
                </div>
                <Phone size={14} style={{ color: 'var(--gray-400)', cursor: 'pointer' }} />
              </div>
            ))}
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 8 }}>
              ✓ All faculty as official on-transit Safety Marshals & Roll Verifiers
            </div>
          </div>

          {/* Nearest Support Fleet */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div className="section-title">Nearest Support Fleet</div>
              <span className="badge badge-green">3 ACTIVE</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 8 }}>Live GPS Proximity Radar</div>
            {fleet.map((f, i) => (
              <div key={i} className="fleet-row">
                <div className="fleet-id">{f.id}</div>
                <div style={{ flex: 1 }}>
                  <div className="font-medium" style={{ fontSize: 11 }}>{f.driver}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{f.dist} • Capacity {f.capacity}</div>
                </div>
                {f.link && <button className="btn btn-sm btn-primary">Link</button>}
              </div>
            ))}
            <button className="btn btn-danger btn-sm w-full mt-2">
              Report Breakdown / Request Replacement
            </button>
          </div>
        </div>
      </div>

      {/* ── Emergency Hotlines ── */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="section-title">Emergency Hotlines & Inter-Agency Command</div>
            <div className="section-subtitle">Direct priority-linked to Advanced ISP Communications</div>
          </div>
          <span className="badge badge-red">● High Priority 24/7 Block</span>
        </div>
        <div className="hotlines-grid">
          {hotlines.map((h, i) => (
            <div key={i} className="hotline-card">
              <div className="font-semibold" style={{ fontSize: 11 }}>{h.label}</div>
              <div className={`hotline-number ${h.color}`}>{h.contact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fuel + Incidents ── */}
      <div className="two-col-grid">
        {/* Fuel Ledger */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="section-title">Daily Fuel, Toll & Expense Ledger</div>
              <div className="section-subtitle">Real-time operational expense logging & pre-approved vouchers</div>
            </div>
            <span className="badge badge-green">IOCL Fleet Plus</span>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <div>
              <label className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Expense Type</label>
              <select style={{ marginTop: 4 }}>
                <option>Fuel (Diesel Ref)</option>
                <option>Toll / FASTag</option>
                <option>Petty Float</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Amount (₹) / Voucher</label>
              <input type="number" placeholder="e.g. 45.00" style={{ marginTop: 4 }} />
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Voucher / Receipt Reference</label>
              <input type="text" placeholder="e.g. Doc or receipt ref number" style={{ marginTop: 4 }} />
            </div>
          </div>
          <button className="btn btn-primary w-full">Log Shift Expense</button>

          <div className="mt-3">
            <div className="text-xs font-semibold" style={{ color: 'var(--gray-600)', marginBottom: 6 }}>
              SHIFT #14 VOUCHERS LOGGED TODAY
            </div>
            {expenses.map((e, i) => (
              <div key={i} className="expense-row">
                <div style={{ flex: 1 }}>
                  <div className="font-medium" style={{ fontSize: 11 }}>{e.type}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{e.voucher}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold" style={{ fontSize: 12 }}>{e.amount}</div>
                  <div className="text-xs" style={{ color: 'var(--green-primary)' }}>{e.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="section-title">Route Hazards & Incident Logging</div>
              <div className="section-subtitle">Report road obstacles, route directional flags, or near safety alerts</div>
            </div>
            <span className="badge badge-blue">Live Dispatch Link</span>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <div>
              <label className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Incident Category</label>
              <select style={{ marginTop: 4 }}>
                <option>Road Hazard / Utility Construction</option>
                <option>Student Pastoral Concern</option>
                <option>Vehicle Mechanical</option>
                <option>Traffic Incident</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: 'var(--gray-600)' }}>Details & Location Description</label>
              <textarea placeholder="e.g. Incoming vehicles ahead near Hope Farm junction..." style={{ marginTop: 4 }} />
            </div>
          </div>
          <button className="btn btn-primary w-full">Transmit Alert to Transport Admin</button>

          <div className="mt-3">
            <div className="text-xs font-semibold" style={{ color: 'var(--gray-600)', marginBottom: 6 }}>
              RECENT ACTIVITY LOGS FOR ROUTE #14
            </div>
            {incidents.map((inc, i) => (
              <div key={i} className="incident-row">
                <AlertTriangle size={13} style={{ color: '#f59e0b', flexShrink: 0, marginTop: 1 }} />
                <div>
                  <div className="font-semibold" style={{ fontSize: 11 }}>{inc.msg}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{inc.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
