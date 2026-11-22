import React, { useState } from 'react';
import { Download, Upload, MapPin, Truck, FileText } from 'lucide-react';

const routes = [
  { num: '#14', name: 'Whitefield Corridor', driver: 'Ramesh Kumar', drv: 'DRV-222', status: 'On Time', students: '28/48', occupancy: 93, fuel: '94%', sla: '97%', etd: '07:35 AM', eta: '03:15 PM', badge: 'badge-green' },
  { num: '#04', name: 'Marathahalli - Central', driver: 'S. Nambiar', drv: 'DRV-207', status: 'On Time', students: '32/44', occupancy: 85, fuel: '89%', sla: '94%', etd: '07:40 AM', eta: '03:20 PM', badge: 'badge-green' },
  { num: '#11', name: 'Indiranagar Central', driver: 'D. Patil', drv: 'DRV-209', status: 'Delayed 22m', students: '40/40', occupancy: 100, fuel: '75%', sla: '72%', etd: '07:30 AM', eta: '03:30 PM', badge: 'badge-red' },
  { num: '#22', name: 'S. Kilburg', driver: 'A. Fernando', drv: 'DRV-312', status: 'On Time', students: '29/40', occupancy: 73, fuel: '91%', sla: '97%', etd: '07:45 AM', eta: '03:15 PM', badge: 'badge-green' },
  { num: '#H7', name: 'HSR Layout Section 2', driver: 'M. Krishnam', drv: 'DRV-401', status: 'On Time', students: '48/48', occupancy: 100, fuel: '88%', sla: '99%', etd: '07:35 AM', eta: '03:10 PM', badge: 'badge-green' },
  { num: '#B5', name: 'Koramangala City Phase 1', driver: 'B. Kulkarni', drv: 'DRV-315', status: 'On Time', students: '44/48', occupancy: 92, fuel: '95%', sla: '97%', etd: '07:40 AM', eta: '03:15 PM', badge: 'badge-green' },
];

const drivers = [
  { name: 'Ramnarayanan. D', id: 'DRV-227', score: '9.8/10', status: 'On Duty', badge: 'badge-green' },
  { name: 'Manikanta R.', id: 'DRV-072', score: '9.2/10', status: 'On Duty', badge: 'badge-green' },
  { name: 'S. Arghav', id: 'DRV-382', score: '9.5/10', status: 'Rest Day', badge: 'badge-gray' },
];

export default function TransportFleet() {
  const [tab, setTab] = useState('All Complete (20)');
  const tabs = ['All Complete (20)', 'Priority (4)', 'Amended (2)', 'In-Transit (1)'];

  return (
    <div>
      <div className="breadcrumb">
        <span>Campus Safety & Fleet</span> <span>›</span>
        <span>Transport & Drivers Fleet</span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="badge badge-yellow">48 CORRIDORS</span>
        <span className="badge badge-gray">Corridor Ops.</span>
      </div>

      <h1 className="page-title mb-2">Campus Transit Fleet,<br />Driver Telematics &<br />Route Logistics</h1>
      <p className="page-desc mb-3">Real-time GPS telemetry of fleet breakpoints & biometric corridor data, consumption auditing and autonomous bus corridors.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Upload size={11} /> Import Fleet Broadcast (RHS)</button>
        <button className="btn btn-secondary btn-sm">Fuel Bulk Regulation</button>
        <button className="btn btn-primary btn-sm"><Download size={11} /> Export Transport Logbook (CSV)</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Active Fleet / Duty</div>
          <div className="stat-card-value">28 / 28</div>
          <div className="stat-card-sub"><span className="badge badge-green">100% Active</span></div>
          <div className="stat-card-sub text-xs text-muted">2,050+ km Active Route Coverage</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Driver Safety Audit</div>
          <div className="stat-card-value">16 / 16</div>
          <div className="stat-card-sub"><span className="badge badge-green">Cleared</span></div>
          <div className="stat-card-sub text-xs text-muted">0.0% Non-Mandatory Infraction</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Fuel & Fleet Efficiency</div>
          <div className="stat-card-value text-green">98.4%</div>
          <div className="stat-card-sub">Fuel Efficiency</div>
          <div className="stat-card-sub text-xs text-muted">Pre 28 Refills • Efficiency 9 km/L • At Level</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Punctuality SLA</div>
          <div className="stat-card-value text-green">97.8%</div>
          <div className="stat-card-sub">On-time Dispatch</div>
          <div className="stat-card-sub text-xs text-muted">Services: 28/28m • Variance: ±2min</div>
        </div>
      </div>

      {/* Map + Driver Biometric */}
      <div className="grid-2 mb-4">
        <div className="card">
          <div className="card-header">
            <span className="card-title">🗺 Active Telematics Radar & Fleet Corridors</span>
            <span className="badge badge-green">Live Mission</span>
          </div>
          <div className="card-body">
            {/* Map placeholder */}
            <div style={{ background: 'linear-gradient(135deg, #e2f4ed, #d1fae5)', borderRadius: 10, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: '1px solid #bbf7d0', marginBottom: 12, overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', color: '#16a34a' }}>
                <MapPin size={32} />
                <div className="text-sm font-semibold mt-2">Whitefield, Bangalore</div>
                <div className="text-xs text-muted">Live GPS tracking active – 28 vehicles on map</div>
              </div>
              <span className="badge badge-green" style={{ position: 'absolute', top: 8, right: 8 }}>Live</span>
            </div>
            <div className="grid-3 text-center">
              {[
                { label: 'Morning Planned', val: '1,392 / 1,420' },
                { label: 'Average Fleet Dist.', val: '38.4 Mns' },
                { label: 'In-route Variance', val: '±0.4%' },
              ].map(m => (
                <div key={m.label}>
                  <div className="font-bold">{m.val}</div>
                  <div className="text-xs text-muted">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🧑 Daily Driver Biometric & ESC Vault</span>
            <span className="badge badge-green">On Duty</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Mandatory biometric sign-in audits before 6:20 AM. Daily compliance cross-validated: 0.33 mg/dL BrAT-4001.</div>
            {drivers.map((d, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar" style={{ background: '#16a34a', color: '#fff' }}>{d.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm">{d.name}</div>
                      <div className="text-xs text-muted">{d.id}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green">{d.score}</div>
                    <span className={`badge ${d.badge}`}>{d.status}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-3 text-xs text-muted">Digital G-cameras active and auto-license verification complete. Full Biometric Compliance certified daily.</div>
          </div>
        </div>
      </div>

      {/* Route Table */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📋 Real-Time Fleet Corridor Manifest & Telematics</span>
          <button className="btn btn-secondary btn-sm">Space Other Drone Corridor</button>
        </div>
        <div className="card-body" style={{ padding: '8px 0 0 0' }}>
          <div className="flex gap-2 px-4 pb-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Route # & Corridor Keypoints</th>
                <th>Driver Assigned</th>
                <th>Students</th>
                <th>Avg OTP / Occupancy</th>
                <th>Fuel / Efficiency</th>
                <th>ETD / ETA</th>
                <th>SLA Adherence</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div className="font-bold">{r.num}</div>
                    <div className="text-xs text-muted">{r.name}</div>
                  </td>
                  <td>
                    <div className="text-sm">{r.driver}</div>
                    <div className="text-xs text-muted">{r.drv}</div>
                  </td>
                  <td className="font-bold">{r.students}</td>
                  <td>
                    <div className="progress mb-1"><div className="progress-bar progress-green" style={{ width: `${r.occupancy}%` }} /></div>
                    <div className="text-xs">{r.occupancy}%</div>
                  </td>
                  <td>
                    <div className="font-semibold text-green">{r.fuel}</div>
                  </td>
                  <td className="text-xs">
                    <div>{r.etd}</div>
                    <div>{r.eta}</div>
                  </td>
                  <td>
                    <div className="progress mb-1"><div className={`progress-bar ${parseInt(r.sla) < 80 ? 'progress-red' : 'progress-green'}`} style={{ width: r.sla }} /></div>
                    <div className="text-xs">{r.sla}</div>
                  </td>
                  <td><span className={`badge ${r.badge}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="text-xs text-muted">Showing all 21 Active Corridors (COOS) connected per day</div>
        </div>
      </div>

      {/* Fuel + Driver License */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">⛽ Bulk Diesel Vault & Fuel Procurement Audit</span>
            <span className="badge badge-green">+4.5% Savings vs last term</span>
          </div>
          <div className="card-body">
            <div className="grid-2 mb-3">
              <div>
                <div className="text-xs text-muted">GreenWoodHigh Diesel Tank</div>
                <div className="font-bold" style={{ fontSize: 24 }}>8,450 L</div>
                <div className="text-xs text-muted">Capacity: 12,000L; Safe Reserve: 2,400L</div>
                <div className="progress mt-2"><div className="progress-bar progress-green" style={{ width: '70%' }} /></div>
              </div>
              <div>
                <div className="text-xs text-muted">Last refill 28 Buses</div>
                <div className="font-bold">148,920.4L</div>
                <div className="text-xs text-muted">Avg/Bus: 5320L • Receipt #</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">📋 Driver Licensing & RTO Statutory Compliance Vault</span>
            <span className="badge badge-green">Valid till Nov 2026</span>
          </div>
          <div className="card-body">
            <div className="grid-2 mb-3">
              <div>
                <div className="text-xs text-muted">RTO Certified Routes</div>
                <div className="font-bold">28 / 28 Certified</div>
                <span className="badge badge-green">Valid till Nov 2026</span>
              </div>
              <div>
                <div className="text-xs text-muted">Commercial Passed</div>
                <div className="font-bold">28 Valid</div>
                <span className="badge badge-green">Valid till Nov 2026</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn btn-secondary btn-sm flex-1" style={{ justifyContent: 'center' }}>View Compliance Grid</button>
              <button className="btn btn-primary btn-sm flex-1" style={{ justifyContent: 'center' }}>Re-notify Violations</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
