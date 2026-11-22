import React from 'react';
import { Heart, AlertTriangle, Download, Plus } from 'lucide-react';

const patients = [
  {
    id: 'VM', name: 'Vivaan Mehra', grade: 'Grade 9-B', time: '09:14 AM', complaint: 'Sudden Loss of Consciousness in Running – Respiratory Block', vitals: '100.9°F / SpO2: 94%', treatment: 'Paracetamol suspension administered; observation started in Bed 1', doctor: 'Dr. S. Kulk', badge: 'badge-red',
  },
  {
    id: 'TK', name: 'Tanya Kapoor', grade: 'Grade 10-B', time: '08:40 AM', complaint: 'Acute Ankle Sprain (Inverted) – No skeletal fracture', vitals: 'Pulse 80, No Trauma Sign', treatment: 'RICE Protocol applied – compression support, foot elevated Bed #4', doctor: 'Sister Chin…', badge: 'badge-yellow',
  },
  {
    id: 'DK', name: 'Devesh Kothari', grade: 'Grade 12-B', time: '10:03 AM', complaint: 'Emergency-Induced Bronchospasm', vitals: '92% SpO2, HR: Walk < 98, HR 40', treatment: 'Salbutamol inhaler x2 administered nebuliser monitored', doctor: 'Dr. Row Mar', badge: 'badge-yellow',
  },
  {
    id: 'AI', name: 'Ananya Iyer', grade: 'Grade 6-A', time: '10:30 AM', complaint: 'Superficial Laceration – right wrist jog', vitals: 'Vitals Normal', treatment: 'Chlorhexidine wound clean + antiseptic irrigation applied + bandaged Pt. 2024-2025', doctor: 'Sister Chin…', badge: 'badge-green',
  },
];

const medications = [
  { name: 'Bolument Anti-Tablets', type: 'Antibiotic', stock: 14, unit: '100mg/Day Dosage', reorder: 22, status: 'OK', badge: 'badge-green' },
  { name: 'Paediatric Paracetamol', type: 'Analgesic', stock: 48, unit: 'WHO Promote ORI', reorder: 160, status: 'Stocked', badge: 'badge-green' },
  { name: 'Silver Sulfodiazine Burns Gel', type: 'Physiological burns', stock: 18, unit: 'tubes', reorder: 35, status: 'Low Stock', badge: 'badge-yellow' },
];

const immunization = [
  { prog: 'Blood Organ Registry', pct: '100% Verified (2,450 / 2,450)', badge: 'badge-green' },
  { prog: 'Annual Eye & Dental Checkups', pct: '88% (12,156 Students checked)', badge: 'badge-blue' },
  { prog: 'Tetanus Toxoid ITT (Up-to-date)', pct: 'Pre: 4% Documented', badge: 'badge-yellow' },
];

export default function MedicalInfirmary() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Campus Safety & Fleet</span> <span>›</span>
        <span>Medical & Infirmary</span>
      </div>

      {/* Live telemetry bar */}
      <div className="alert-bar alert-blue mb-3">
        <span className="live-badge">LIVE INFIRMARY TELEMETRY ACTIVE</span>
        <span className="text-xs">Manipal Hospital Emergency Transit Network: Synchronised & Verified | Response time: &lt;9mins</span>
        <span className="text-xs" style={{ marginLeft: 'auto' }}>Station: #MED-BLDG-B</span>
      </div>

      <h1 className="page-title mb-2">Campus Infirmary, Student<br />Health Records &<br />Medical Operations</h1>
      <p className="page-desc mb-3">Real-time clinic bed occupancy, acute treatment logs, emergency medical profiles, chronic care registry, and ambulance dispatch readiness.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Health Dossier</button>
        <button className="btn btn-danger btn-sm">🚑 Emergency Ambulance Dispatch</button>
        <button className="btn btn-primary btn-sm"><Plus size={11} /> Log New Patient Intake</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Clinic Bed Occupancy</div>
          <div className="stat-card-value">2 / 6</div>
          <div className="stat-card-sub"><span className="badge badge-yellow">Live Ready</span></div>
          <div className="stat-card-sub text-xs text-muted">Bed #1 – Grade 9-B Fever</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">On-Duty Medical Team</div>
          <div className="stat-card-value">1 MD + 2 RN</div>
          <div className="stat-card-sub"><span className="badge badge-green">Certified</span></div>
          <div className="stat-card-sub text-xs text-muted">Dr. Sunita Kulkarni on Campus</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Emergency Ambulance</div>
          <div className="stat-card-value">KA-01-G-9901</div>
          <div className="stat-card-sub"><span className="badge badge-green">100% Full</span></div>
          <div className="stat-card-sub text-xs text-muted">Driver: Ramesh, on cabin</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Critical Health Alerts</div>
          <div className="stat-card-value text-red">184</div>
          <div className="stat-card-sub"><span className="badge badge-red">Active Alert</span></div>
          <div className="stat-card-sub text-xs text-muted">Allergen: agrarian, asthma and lipid protocols: immunization AAG enrolled students; Homeroom 100% Trained</div>
        </div>
      </div>

      {/* Active triage table */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">Infirmary Active Triage & Day Patient Register</span>
          <div className="flex gap-2">
            <button className="btn btn-primary btn-sm">All Active Cases (4)</button>
            <button className="btn btn-secondary btn-sm">Recovered & Discharged Today (2)</button>
            <button className="btn btn-secondary btn-sm">Emergency Assistants (0)</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: '6px 0 0 0' }}>
          <div className="flex gap-2 px-4 pb-2 text-xs text-muted">
            <span>All Active Cases (4)</span>
            <span>|</span>
            <span>Chronic Care Follower ups (8)</span>
            <span>|</span>
            <span>Emergency Assistants (0)</span>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Patient & Student ID</th>
                <th>Grade / Admission</th>
                <th>Intake Time</th>
                <th>Chief Complaint & Vitals</th>
                <th>Vital Flags</th>
                <th>Treatment Administered</th>
                <th>Attending Provider</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar" style={{ background: ['#ef4444','#f59e0b','#f59e0b','#16a34a'][patients.indexOf(p)], color: '#fff' }}>{p.id}</div>
                      <div className="font-semibold">{p.name}</div>
                    </div>
                  </td>
                  <td className="text-sm">{p.grade}</td>
                  <td className="text-sm font-semibold">{p.time}</td>
                  <td className="text-xs">{p.complaint}</td>
                  <td><span className={`badge ${p.badge}`}>{p.vitals}</span></td>
                  <td className="text-xs">{p.treatment}</td>
                  <td className="text-sm">{p.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="text-xs text-muted">Displaying 4 active cases logged today • Auto-refreshing every 30s</div>
          <button className="btn btn-secondary btn-sm mt-2"><Download size={11} /> Download Incident Ledger (CSV)</button>
        </div>
      </div>

      {/* Pharmacy + Immunization */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">💊 Clinic Formulary: Pharmacy & Emergency Medication Inventory</span>
            <div className="flex gap-2">
              <span className="badge badge-green">Synced & Confirmed</span>
              <span className="badge badge-blue">2 Alerts Active</span>
            </div>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Critical pharma inventory verified by pharmacist daily. Automatic reorder-event alerts trigger when levels fall to reorder threshold.</div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Medication Item</th>
                    <th>Type</th>
                    <th>Stock</th>
                    <th>Reorder</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map(m => (
                    <tr key={m.name}>
                      <td>
                        <div className="font-semibold text-xs">{m.name}</div>
                        <div className="text-xs text-muted">{m.type}</div>
                      </td>
                      <td className="text-xs">{m.unit}</td>
                      <td className="font-bold">{m.stock}</td>
                      <td className="text-xs text-muted">{m.reorder} units</td>
                      <td><span className={`badge ${m.badge}`}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divider" />
            <div className="flex justify-between text-xs text-muted">
              <span>Monthly Pharma Audit Passed: 03 Nov, 2024</span>
              <button className="btn btn-primary btn-sm">Open Full Dispensary Ledger →</button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">💉 Health Canopy: Annual Screening & Immunization</span>
            <span className="font-bold" style={{ color: '#16a34a' }}>2,450</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Facilitates institutional compliance veterinary screening, dental follow-up visits, and immunization cascade for all 2,450 enrolled students.</div>
            {immunization.map(im => (
              <div key={im.prog} className="metric-box mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">{im.prog}</div>
                    <div className="text-xs text-muted">{im.pct}</div>
                  </div>
                  <span className={`badge ${im.badge}`}>Active</span>
                </div>
              </div>
            ))}
            <div className="divider" />
            <div className="text-xs text-muted">6.8 pending potential week notifications & consultations.</div>
            <button className="btn btn-secondary btn-sm mt-2">Send Broadcast Notification</button>
          </div>
        </div>
      </div>
    </div>
  );
}
