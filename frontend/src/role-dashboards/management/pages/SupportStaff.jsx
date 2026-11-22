import React from 'react';
import { UserPlus, Download, Shield } from 'lucide-react';

const staff = [
  { id: 'SWP-014', badge_id: 'Zone Lead', name: 'Ramesh Murthy', role: 'Head Housekeeping / Sweeper', zone: 'Academic Block Wing A & B', shift: '06:30 AM – 03:30 PM', biometric: '06:18 AM (Thumb OK)', supervisor: 'Mr. T. Murthy', kit: 'Cleaned & Disinfected', status: 'Active on Duty', statusBadge: 'badge-green' },
  { id: 'SEC-003', badge_id: 'Phase Alpha', name: 'Bahadur Singh', role: 'Senior Campus Security Guard', zone: 'Main Gate & Turnstile 1', shift: '06:00 AM – 06:00 PM (Shift A)', biometric: '05:45 AM (Facial Sync)', supervisor: 'Chief Balaji H.', kit: 'Radio Ch 1 / Baton / Body-cam', status: 'On Gate Duty', statusBadge: 'badge-green' },
  { id: 'DRV-007', badge_id: 'Heavy Badge', name: 'Gurumurthy K.', role: 'Senior Bus Driver', zone: 'Route #08 (Indiranagar Exp)', shift: '06:00 AM – 05:30 PM', biometric: '05:52 AM (BAC 0.00%)', supervisor: 'Fleet Mgr Ramesh', kit: 'Bus #KA-03-FA-4122 Ready', status: 'Corridor Active', statusBadge: 'badge-blue' },
  { id: 'GRD-005', badge_id: 'Post B', name: 'Muniswamy N.', role: 'Head Gardener', zone: 'Olympic Oval & Botanical Garden', shift: '07:00 AM – 04:00 PM', biometric: '06:50 AM (Thumb OK)', supervisor: 'Estate Officer Verma', kit: 'Mower & Irrigation Kit OK', status: 'Active on Duty', statusBadge: 'badge-green' },
  { id: 'SWP-021', badge_id: 'Hygiene Lead', name: 'Kamala Devi', role: 'Restroom Sanitation Specialist', zone: 'Senior Secondary Wing C (Girls)', shift: '06:20 AM – 03:30 PM', biometric: '06:22 AM (Thumb OK)', supervisor: 'Supervisor Murthy', kit: 'Chemical Hazard Kit Checked', status: 'Hourly Log Complete', statusBadge: 'badge-green' },
];

const qrMatrix = [
  { zone: 'Wing A & B Academic Restrooms', time: 'Scanned: 09:45 AM by R. Murthy', grade: 'A+', status: 'Clean' },
  { zone: 'Senior Secondary Wing C (Girls)', time: 'Scanned: 09:30 AM by Kamala Devi', grade: 'A+', status: 'Clean' },
  { zone: 'Dining Hall & Kitchen Scullery', time: 'Scanned: 09:15 AM by S. Anand', grade: '—', status: 'Steam Sanitized' },
];

const perimeterGates = [
  { gate: 'Main Gate & Turnstile 1', guard: 'Guard: Bahadur Singh | RFID', visitors: 'Visitor Badges: 48', status: 'Intercom Active' },
  { gate: 'Transit Gate 3', guard: 'Guard: Vikram Rana | RFID Scanner Active', visitors: '', status: 'Intercom Active' },
  { gate: 'Sports Pavilion Gate 4', guard: 'Guard M. Gujar | Perimeter Sensor OK', visitors: '', status: 'Intercom Active' },
];

const consumables = [
  { item: 'Hospital Grade Floor Disinfectant', pct: 84, unit: '420 L remaining', status: 'OK' },
  { item: 'Heavy Duty PPE Gloves & Goggles', pct: 92, unit: '180 sets in stock', status: 'OK' },
  { item: 'Driver High-Vis Uniform 65%', pct: 65, unit: 'Re-order in 12 days', status: 'Low' },
  { item: 'Organic Turf Fertilizer & Sprinklers', pct: 78, unit: '1.2 Tons remaining', status: 'OK' },
];

export default function SupportStaff() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Management</span> <span>›</span>
        <span>Staff & HR</span> <span>›</span>
        <span>Support Staff Operations & Field Services</span>
      </div>

      <h1 className="page-title mb-2">Support Staff, Housekeeping<br />& Campus Services Console</h1>
      <p className="page-desc mb-3">Shift rosters, duty logs, biometric attendance, zone-wise sanitization, grounds upkeep, and campus safety workforce tracking.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Shield size={11} /> Daily Safety & Sanitization Audit</button>
        <button className="btn btn-secondary btn-sm">📻 Broadcast Duty Roster</button>
        <button className="btn btn-primary btn-sm"><UserPlus size={11} /> + Register Support Staff</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Total Support Roster</div>
          <div className="stat-card-value">68</div>
          <div className="stat-card-sub">Active Personnel</div>
          <div className="stat-card-sub text-xs text-muted">Housekeepr: 24 | Guards: 16 | D…</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Biometric Punch-In Today</div>
          <div className="stat-card-value">66 / 68</div>
          <div className="stat-card-sub"><span className="badge badge-green">97.1%</span></div>
          <div className="stat-card-sub text-xs text-muted">2 Approved Sick Relief on Standby</div>
          <div className="mt-2">
            <div className="progress"><div className="progress-bar progress-green" style={{ width: '97%' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Hygiene & Sanitization Audit</div>
          <div className="stat-card-value text-green">100%</div>
          <div className="stat-card-sub"><span className="badge badge-green">Passed</span></div>
          <div className="stat-card-sub text-xs text-muted">Wings A, B, C, D, Labs & Dinin…</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Drivers Breathalyzer & Safety</div>
          <div className="stat-card-value">16 / 16</div>
          <div className="stat-card-sub"><span className="badge badge-green">0.00% BAC</span></div>
          <div className="stat-card-sub text-xs text-muted">Zero Infractions | Pre-Trip Rost…</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="flex gap-2 flex-wrap">
            <button className="btn btn-primary btn-sm">All Support 68</button>
            <button className="btn btn-secondary btn-sm">Housekeeping & Sweepers 24</button>
            <button className="btn btn-secondary btn-sm">Security Guards 16</button>
            <button className="btn btn-secondary btn-sm">Bus Drivers 16</button>
          </div>
          <input className="input" style={{ width: 200 }} placeholder="Search employee, badge #, zone, route…" />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Badge & Photo</th>
                <th>Staff Name & Cadre</th>
                <th>Allocated Zone / Route</th>
                <th>Shift Timings</th>
                <th>Biometric Punch-In</th>
                <th>Supervisor</th>
                <th>Kit / PPE Status</th>
                <th>Operational Status</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar" style={{ background: '#16a34a', color: '#fff' }}>{s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <div className="text-xs font-bold">{s.id}</div>
                        <span className="badge badge-gray" style={{ fontSize: 9 }}>{s.badge_id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-muted">{s.role}</div>
                  </td>
                  <td className="text-xs">{s.zone}</td>
                  <td className="text-xs">{s.shift}</td>
                  <td>
                    <span className="badge badge-green" style={{ fontSize: 9 }}>{s.biometric}</span>
                  </td>
                  <td className="text-xs">{s.supervisor}</td>
                  <td className="text-xs text-muted">{s.kit}</td>
                  <td><span className={`badge ${s.statusBadge}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 – 5 of 68 support staff personnel</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">‹ 1</button>
              {[2, 3, 14].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 panels */}
      <div className="grid-3">
        {/* QR Hygiene Matrix */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔲 QR Hygiene Matrix</span>
            <span className="badge badge-green">32/32 Cleared</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Hourly digital audit logs verified across secondary washrooms, corridors and common cafeterias.</div>
            {qrMatrix.map((q, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{q.zone}</div>
                    <div className="text-xs text-muted">{q.time}</div>
                  </div>
                  <div className="text-right">
                    {q.grade && <div className="font-bold text-green">{q.grade}</div>}
                    <span className={`badge ${q.status === 'Clean' ? 'badge-green' : 'badge-blue'}`}>{q.status}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted mt-2">Next inspection round in 42 mins • <span className="text-blue">Audit Log Archive →</span></div>
          </div>
        </div>

        {/* Perimeter & Gate Watch */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔒 Perimeter & Gate Watch</span>
            <span className="badge badge-green">All Gates Secure</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Live feed from optical turnstiles, visitor badging checkpoints, and quick emergency SOS intercoms.</div>
            {perimeterGates.map((g, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{g.gate}</div>
                    <div className="text-xs text-muted">{g.guard}</div>
                    {g.visitors && <div className="text-xs text-muted">{g.visitors}</div>}
                  </div>
                  <span className="badge badge-green">{g.status}</span>
                </div>
              </div>
            ))}
            <div className="text-xs text-muted mt-2">18/18 Intercom Channels Active • <span className="text-blue">Gate Dashboard →</span></div>
          </div>
        </div>

        {/* Consumables & PPE Store */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🗃 Consumables & PPE Store</span>
            <span className="text-xs text-muted">Month: March 2025</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Central store supply levels for hospital-grade detergents, safety gloves, uniform sets and fuel allocations.</div>
            {consumables.map((c, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold" style={{ maxWidth: 160 }}>{c.item}</span>
                  <span className={`font-bold ${c.status === 'Low' ? 'text-red' : 'text-green'}`}>{c.pct}%</span>
                </div>
                <div className="progress mb-1">
                  <div className={`progress-bar ${c.status === 'Low' ? 'progress-yellow' : 'progress-green'}`} style={{ width: `${c.pct}%` }} />
                </div>
                <div className="text-xs text-muted">{c.unit}</div>
              </div>
            ))}
            <div className="divider" />
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm flex-1" style={{ justifyContent: 'center' }}>Restock PO #8894 pending dispatch</button>
              <button className="btn btn-primary btn-sm">Store Requisition →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
