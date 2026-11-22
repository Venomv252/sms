import React from 'react';
import { AlertTriangle, Phone, Shield, Video, Radio, FileText, CheckCircle } from 'lucide-react';

const interAgency = [
  {
    icon: '🚔', title: 'Whitefield East Police Division', badge: 'Jurisdiction 37 – 1.2 km away',
    contact: 'Station Inspector A. Reddy', direct: '+91 80 2294 2100', mobile: '+91 94808 01002',
    status: 'Morning Drill: 08:45 AM', badge2: 'badge-green',
  },
  {
    icon: '🏥', title: 'Manipal Hospital Emergency Trauma Unit', badge: 'Level 3 Trauma – 2.4 km away',
    contact: 'Dedicated Institutional Hotline', direct: '+91 80 4969 4969 | 108-Trauma', mobile: '',
    status: 'Ambulance #KA-01-G-7893', badge2: 'badge-blue',
  },
  {
    icon: '🚒', title: 'Karnataka Fire & Emergency Services', badge: 'Station Unit: F1A – Loaded 2025',
    contact: 'Div Officer Insp. M. Grande', direct: '+91 80 2552 1101 | 101-Whitefield', mobile: '',
    status: 'Hydrant Preset', badge2: 'badge-yellow',
  },
  {
    icon: '🚦', title: 'Whitefield Traffic Police – School Zone', badge: 'Controller: Post A4 Active – Now Smart',
    contact: 'Station Warden N. Ramesh & Partner', direct: 'Direct Warden #1 & School Traffic Assist', mobile: '',
    status: '07:30–08:30 AM / 02:30–03:45 PM', badge2: 'badge-green',
  },
];

const securityLogs = [
  { time: '10:11 AM', classification: 'Campus', description: 'Unidentified non-student person attempted unauthorized vehicle entrance received gate 5.', resolution: 'Cleared', badge: 'badge-green' },
  { time: '09:52 AM', classification: 'Access Toner!', description: 'Integrated smart check CPAG (AI-Surveillance) 1P40 deactivated for recalibration.', resolution: 'Recalibrated', badge: 'badge-blue' },
  { time: '09:28 AM', classification: 'Perimeter B1', description: 'Infirmary officer noted campus boundary secondary fence material 02–data.', resolution: 'Calibrated', badge: 'badge-blue' },
  { time: '09:05 AM', classification: 'GuardRoster', description: 'Night uniform guard check-in summary & authenticated 4 verified items.', resolution: 'Verified', badge: 'badge-green' },
];

const disasterZones = [
  { label: 'Assembly Point A: Primary Sports Oval', desc: 'Primary Wing Grades 5-8 & Early Years Capacity: 1,100 • Supervision: Confirmed', warden: 'Ms. Sukla Rao', floor: 'Level 1', ready: 'Prep Ready' },
  { label: 'Assembly Point B: Border Tennis Lawn', desc: 'Secondary Grades 9-12 + Admin Capacity: 1,350 • Routes Secured', warden: 'Dr. Roger Kant', floor: 'Ground', ready: 'Prep Ready' },
];

const broadcastChecklist = [
  { item: 'Parent SHS Broadcast', count: 3200, via: 'SMS', done: true },
  { item: 'Reachable Staff Contacts', count: 210, via: 'Email', done: true },
  { item: 'District Flash Broadcast', count: '–', via: 'ERP Push', done: true },
  { item: 'Fire Installation Magnetic Protocol Doors', count: '–', via: 'Auto Latch', done: true },
];

export default function EmergencyServices() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Campus Safety & Fleet</span> <span>›</span>
        <span>Emergency & Local Services</span>
      </div>

      {/* Status bar */}
      <div className="flex gap-3 mb-3 flex-wrap">
        <span className="badge badge-red" style={{ fontSize: '12px', padding: '4px 12px' }}>
          🔴 DETECTION ACTIVE • 8 LIVE INTER-AGENCY UPLINK
        </span>
        <span className="badge badge-green" style={{ padding: '4px 12px' }}>STATUS: 08:22:39</span>
        <span className="badge badge-gray">+91 80 2294 2100</span>
      </div>

      <h1 className="page-title mb-2">Campus Safety, Security Operations &<br />Inter-Agency Emergency Command</h1>
      <p className="page-desc mb-3">Direct technological and logical integration with Whitefield Police, Manipal Trauma Care, Fire Station Unit #4, and School Zone Traffic Wardens.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-danger btn-sm">🔒 Trigger Emergency Lockdown</button>
        <button className="btn btn-warning btn-sm">📻 Broadcast Staff Alert</button>
        <button className="btn btn-secondary btn-sm"><FileText size={11} /> SOP Handbook (PDF)</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Emergency Network</div>
          <div className="stat-card-value text-green">100%</div>
          <div className="stat-card-sub">Inter-Agency Online</div>
          <div className="stat-card-sub text-xs text-muted">All 4 dedicated emergency lines activated & verified (32 ago)</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Perimeter Gates</div>
          <div className="stat-card-value">4/4</div>
          <div className="stat-card-sub">Gates Armed & Monitored</div>
          <div className="stat-card-sub text-xs text-muted">Yesterday Auxiliary & Primary</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Fire & Pressure Systems</div>
          <div className="stat-card-value text-green">Grade A</div>
          <div className="stat-card-sub"><span className="badge badge-green">Verified</span></div>
          <div className="stat-card-sub text-xs text-muted">Fire System full check quarterly compliant</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Armed Response Ops</div>
          <div className="stat-card-value">16</div>
          <div className="stat-card-sub">Guards On Duty</div>
          <div className="stat-card-sub text-xs text-muted">16 Guards cleared biometric. All posts active.</div>
        </div>
      </div>

      {/* Direct Inter-Agency Dashboard */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">🛡 Direct Inter-Agency Dispatch Console</span>
          <div className="flex gap-2">
            <span className="badge badge-gray">Standby Active</span>
          </div>
        </div>
        <div className="card-body">
          <div className="grid-2">
            {interAgency.map((a, i) => (
              <div key={i} className="metric-box">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{a.title}</div>
                    <span className="badge badge-gray text-xs">{a.badge}</span>
                  </div>
                </div>
                <div className="text-xs text-muted mb-1">{a.contact}</div>
                <div className="text-xs font-bold mb-2">{a.direct}</div>
                <div className="text-xs text-muted mb-2">{a.status}</div>
                <div className="flex gap-2">
                  <button className="btn btn-primary btn-sm flex-1" style={{ justifyContent: 'center' }}>
                    <Phone size={10} /> Call Direct
                  </button>
                  <button className="btn btn-secondary btn-sm flex-1" style={{ justifyContent: 'center' }}>Dispatch Alert</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live feeds + Broadcast Matrix */}
      <div className="grid-2 mb-4">
        {/* CCTV Feeds */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📹 Live Feeds: Gate 1 & Transit Concourse</span>
            <span className="badge badge-red">⚠ BYC 51p after live</span>
          </div>
          <div className="card-body">
            <div className="grid-2 mb-3">
              {['CAM-21A • NORTH ENTRY-08', 'CAM-4 • BUS BAY CONCOURSE'].map((cam, i) => (
                <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '8px', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#94a3b8' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#4ade80' }}>● LIVE</div>
                  <div style={{ textAlign: 'center', fontSize: 11, color: '#64748b' }}>
                    <Video size={24} style={{ opacity: 0.4 }} />
                    <div style={{ fontSize: 9 }}>Camera Feed Active</div>
                  </div>
                  <div style={{ fontSize: 9 }}>{cam}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted">Comm Room Command Desk. Station #3/01 Floor 3A W, logged in. View All 128 Camera Grid →</div>
          </div>
        </div>

        {/* Broadcast Matrix */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📢 Emergency Broadcast Matrix</span>
            <span className="badge badge-yellow">Awaiting Authorise once activated</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Notification parameters when emergency broadcast is activated.</div>
            {broadcastChecklist.map((b, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                <CheckCircle size={14} color="#16a34a" />
                <div className="flex-1">
                  <div className="text-sm">{b.item}</div>
                  <div className="text-xs text-muted">{b.count !== '–' ? `${b.count} recipients` : ''} via {b.via}</div>
                </div>
                <span className="badge badge-green">Auto-Latch</span>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm mt-3" style={{ width: '100%', justifyContent: 'center' }}>
              Run Dry Mock Test Mode
            </button>
          </div>
        </div>
      </div>

      {/* Security Logs + Disaster Preparedness */}
      <div className="grid-2">
        {/* Security Logs */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🗂 Recent Security Log Events</span>
            <span className="text-xs text-muted">Past 24hrs status</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Classification</th>
                  <th>Incident Description</th>
                  <th>Status / Resolution</th>
                </tr>
              </thead>
              <tbody>
                {securityLogs.map((log, i) => (
                  <tr key={i}>
                    <td className="text-xs font-bold">{log.time}</td>
                    <td><span className={`badge ${log.badge}`}>{log.classification}</span></td>
                    <td className="text-xs">{log.description}</td>
                    <td><span className={`badge ${log.badge}`}>{log.resolution}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-body" style={{ padding: '8px 16px' }}>
            <div className="text-xs text-muted">Showing latest 3/1,875 audit events.</div>
            <button className="btn btn-secondary btn-sm mt-2">Report Full Audit Log (CSV)</button>
          </div>
        </div>

        {/* Disaster Preparedness */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🏃 Disaster Preparedness Matrix</span>
            <span className="badge badge-green">Level 1 Ready</span>
          </div>
          <div className="card-body">
            {disasterZones.map((z, i) => (
              <div key={i} className="metric-box mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#16a34a' }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="font-semibold text-sm">{z.label}</div>
                </div>
                <div className="text-xs text-muted mb-1">{z.desc}</div>
                <div className="flex justify-between text-xs">
                  <span>Warden: <span className="font-semibold">{z.warden}</span></span>
                  <span className="badge badge-green">{z.ready}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              View Floor-wise Evacuation Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
