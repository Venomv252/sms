import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Download, Send, Filter, AlertTriangle, Lock } from 'lucide-react';

const defaulters = [
  {
    id: 'Adm #GH-2019-1082', name: 'Dev Malhotra', grade: '10-B', guardian: 'Rajesh Malhotra (Father) VP Logistics, Zenith Corp',
    feeDetails: 'Term 2 Tuition ($1,210) • Robotics Policy ($850) • Annual Transit Route ($1,100)',
    outstanding: '$8,150.00', dueDate: 'Due: Oct 31, 2024', overdue: '44 Days', status: 'LOCKED – NO ACCESS', badge: 'badge-red',
    auditTrail: 'Legal Demand Letter Attached Notice #2; Nov 12 Provisional Principal. No Response', portalBadge: 'badge-red',
  },
  {
    id: 'Adm #GH-2022-1419', name: 'Alisha Khan', grade: 'Middle (8-B)', guardian: 'Dr. Farhan Patel (Father) +1(650) 728-1059 Senior Orthodontist, Bangalore',
    feeDetails: 'Term 2 $1,210 • Annual Activity Levy ($850)',
    outstanding: '$5,250.00', dueDate: 'Due: Oct 20, 2024', overdue: '63 Days', status: 'ACTIVE ACCESS', badge: 'badge-yellow',
    auditTrail: 'Demand Notice Sent Nov 18 LMS Warning Against Action Follow-up Oct Official Bursar Desk', portalBadge: 'badge-green',
  },
  {
    id: 'Adm #GH-2021-1802', name: 'Kabir Mehta', grade: 'Grade 9 & 7 (Son)', guardian: 'Sunil Mehta (Father) +91(50)1 RK 818 Director, Apex Realty Corp',
    feeDetails: 'Term 2 ($1,410) • Science Academy Lab ($850) • Hosted Clearance ($350)',
    outstanding: '$12,050.00', dueDate: 'Sep 10, 2024', overdue: '96 Days • Severe', status: 'LOCKED – NO ACCESS', badge: 'badge-red',
    auditTrail: 'Past Legal Repossession Warning: a pre-Registered Posts Board Admin Warning Withheld', portalBadge: 'badge-red',
  },
  {
    id: 'Adm #GH-2019-2104', name: 'Rhea Sengupta', grade: 'Grade 9 + c (PR-2103)', guardian: 'Ananya Sengupta (Mother) Architect, Studio Paris',
    feeDetails: 'Term 2 ($1,210) • Hosted Guest ($240) • Direct Quartet ($240)',
    outstanding: '$5,320.00', dueDate: 'Due: Nov 05, 2024', overdue: '37 Days', status: 'ACTIVE ACCESS', badge: 'badge-yellow',
    auditTrail: 'No-Due Form Pending: Nov 18 Automatic WhatsApp Reminder Sent. Requested dispute term acknowledged. Scheduled auto-Seek Dec 05', portalBadge: 'badge-green',
  },
  {
    id: 'Adm #GH-2022-0887', name: 'Aryan Patel', grade: 'Ex-Grade 11', guardian: 'Bhavesh Patel (Father) +1(503) 425-481 Managing Partner, Aryan Phar…',
    feeDetails: 'Fixed Term Clearance ($1,410) • Damaged Equipment ($410) • Transport: ($420)',
    outstanding: '$7,820.00', dueDate: 'Due: Aug 18, 2024', overdue: 'TC Blocked', status: 'DEACTIVATED', badge: 'badge-red',
    auditTrail: "No-Due Form Logistic Notice #2 Nov 18 Provisional Settlement: Counter Auto-Block. Withheld Certificate, Passport Papers", portalBadge: 'badge-red',
  },
  {
    id: 'Adm #GH-2020-0778', name: 'Tanisha Iyer', grade: 'Grade 7-A', guardian: 'Karthikeyan Iyer (Father) +91600-3902-9123 Senior Lead Architect, Infosys',
    feeDetails: 'Term 2 $1,210 • Annual Co-Curriculum ($440)',
    outstanding: '$4,550.00', dueDate: 'Due: Dec 06, 2024', overdue: '49 Days', status: 'ACTIVE ACCESS', badge: 'badge-green',
    auditTrail: 'No-Due Form Pending: Nov 18 Automatic WhatsApp reminder: acknowledged Scheduled auto-Seek Dec 05', portalBadge: 'badge-green',
  },
];

const agingData = [
  { range: '≤30 Days (Reminder)', amt: 510000, label: '30.3%', color: '#16a34a' },
  { range: '30–45 Days (Notice)', amt: 812500, label: '24.8%', color: '#0ea5e9' },
  { range: '46–60 Days (Notice)', amt: 380000, label: '22.9%', color: '#f59e0b' },
  { range: '≥60 Days Critical', amt: 142500, label: '67.6%', color: '#ef4444' },
];

export default function FeesDefaulters() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Defaulters 64');
  const filters = ['All Defaulters 64', '30–46 Days $115.0k', '46–60 Days $122.8k', 'Critical ≥60 Days $142.8k'];

  const filtered = defaulters.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="breadcrumb">
        <span>Finance & Operations</span> <span>›</span>
        <span>Statutory Fee Recovery & Access Enforcement</span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="badge badge-red">📢 Broadcast Demand Notice (SMS/WA)</span>
        <span className="badge badge-gray">📄 Statutory Audit Statement (PDF)</span>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Recovery Register</button>
      </div>

      <h1 className="page-title mb-2">Fees & Defaulters Cockpit</h1>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Gross Annual Receivables YTD</div>
          <div className="stat-card-value">$5.20M</div>
          <div className="stat-card-sub">AY 2024 • 35 • Total Invoice Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Realised & Cleared</div>
          <div className="stat-card-value text-green">$4.82M</div>
          <div className="stat-card-sub"><span className="badge badge-green">Cleared</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Overdue Receivables</div>
          <div className="stat-card-value text-red">$380,000</div>
          <div className="stat-card-sub">64 Students Unsettled</div>
          <span className="badge badge-red mt-1">!</span>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">High Risk ≥60</div>
          <div className="stat-card-value">$142,500</div>
          <div className="stat-card-sub">M Accounts Legal Pending</div>
          <span className="badge badge-yellow mt-1">Portal Locks Active: 7 Students Suspended Admin & LMS Blocked</span>
        </div>
      </div>

      {/* Board Governance Rule */}
      <div className="card mb-4">
        <div className="card-header" style={{ background: '#fef2f2', borderColor: '#fca5a5' }}>
          <div>
            <span className="badge badge-green mb-1">Active Protocol</span>
            <div className="card-title">Board Governance Rule #14: Administrative Lockout Policy</div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm">View Detailed Sanctions Proposal</button>
            <button className="btn btn-danger btn-sm"><Lock size={11} /> Enforce 40-Day Mass Lockout (88)</button>
          </div>
        </div>
        <div className="card-body" style={{ background: '#fff5f5' }}>
          <div className="text-xs text-muted">Accounts more than 44-day overdue students are subject to progressive sanctions: <strong>withholding digital term marksheets</strong>, barring exam hall tickets, and auto-redirecting ERP authentication directly to the Bursar Payment Gateway.</div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-3 flex-wrap items-center">
        {filters.map(f => (
          <button key={f} className={`btn btn-sm ${activeFilter === f ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveFilter(f)}>{f}</button>
        ))}
        <div style={{ position: 'relative', marginLeft: 'auto' }}>
          <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input className="input" style={{ paddingLeft: 26, width: 220 }} placeholder="Filter by student, guardian…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-secondary btn-sm"><Filter size={11} /></button>
      </div>

      {/* Defaulter Table */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">⚠ Defaulter Registry</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student & Cohort</th>
                <th>Guardian & Contact</th>
                <th>Fee Breakup Overdue</th>
                <th>Outstanding Amount</th>
                <th>Ageing & Due</th>
                <th>Recovery Audit Trail</th>
                <th>Portal Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar" style={{ background: '#0ea5e9', color: '#fff' }}>{d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div>
                        <div className="font-semibold">{d.name}</div>
                        <div className="text-xs text-muted">{d.id}</div>
                        <div className="text-xs text-muted">{d.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-xs">
                    <div className="font-semibold">{d.guardian}</div>
                  </td>
                  <td className="text-xs text-muted" style={{ maxWidth: 180 }}>{d.feeDetails}</td>
                  <td>
                    <div className="font-bold text-red">{d.outstanding}</div>
                    <div className="text-xs text-muted">{d.dueDate}</div>
                  </td>
                  <td>
                    <span className={`badge ${d.badge}`}>{d.overdue}</span>
                  </td>
                  <td className="text-xs text-muted" style={{ maxWidth: 180 }}>{d.auditTrail}</td>
                  <td>
                    <span className={`badge ${d.portalBadge}`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 5 of 64 institutional defaulter accounts across Greenwood High</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Previous</button>
              <button className="btn btn-primary btn-sm">1</button>
              {[2, 3].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom analytics */}
      <div className="grid-3">
        {/* Aging breakdown */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Receivables Aging NDR Distribution Defaulter Breakdown</span>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-center mb-3">
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'conic-gradient(#ef4444 0% 30.3%, #0ea5e9 30.3% 55.1%, #f59e0b 55.1% 78%, #16a34a 78% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: 60, height: 60, background: '#fff', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="font-bold text-sm">$380k</div>
                  <div className="text-xs text-muted">Total Pending</div>
                </div>
              </div>
            </div>
            {[
              { label: '≥60 Days Critical', amt: '$142,500', pct: '67.6%', color: 'text-red' },
              { label: '46–60 Days Notice', amt: '$812,500', pct: '24.8%', color: 'text-blue' },
              { label: '30–40 Days', amt: '$380,000', pct: '22.9%', color: 'text-yellow' },
              { label: '≤ 30 Days (Reminder)', amt: '$10,000', pct: '30.3%', color: 'text-green' },
            ].map((a, i) => (
              <div key={i} className="flex justify-between items-center mb-2 text-xs">
                <span className="text-muted">{a.label}</span>
                <span className={`font-bold ${a.color}`}>{a.amt} <span className="text-muted">({a.pct})</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Gateway Intercept */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔐 Lockout User Experience Parent Gateway Intercept</span>
          </div>
          <div className="card-body">
            <div className="flex gap-2 mb-3">
              <span className="badge badge-red">Partial Lock Banner</span>
              <span className="badge badge-yellow">Active Screen Banner</span>
            </div>
            <div className="metric-box mb-3" style={{ background: '#fef2f2', borderColor: '#fca5a5', textAlign: 'center', padding: 20 }}>
              <div style={{ fontSize: 28 }}>🔒</div>
              <div className="font-bold text-red mt-2">Account Access Suspended</div>
              <div className="text-xs text-muted mt-1">Institutional fees for IQ domains pending; institutional generation-authorization progress report on website and/or per $200/day</div>
              <button className="btn btn-danger btn-sm mt-3" style={{ width: '100%', justifyContent: 'center' }}>Pay Outstanding Balance Online ($8,150)</button>
              <button className="btn btn-secondary btn-sm mt-2" style={{ width: '100%', justifyContent: 'center' }}>Contact Bursar Desk Directly</button>
            </div>
            <div className="text-xs text-muted text-center">Automatic unlock: instant upon payment settlement</div>
          </div>
        </div>

        {/* Terminal Fate */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">⛔ Terminal Fate Permanent Deactivation</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">For students leaving the institute OR failing to pay, freeze SRN access, freeze transcripts, and hold Transfer Certificate until full Bursar clearance. Records are permanently and part of the Bursar clearance process reported + logged.</div>
            <div className="metric-box mb-3">
              <div className="text-xs text-muted">Student Admission Number / QR</div>
              <div className="font-bold text-sm">Adm #GH-2022-0887</div>
              <div className="flex items-center gap-2 mt-2">
                <div style={{ width: 48, height: 48, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 20 }}>▦</div>
                <div className="text-xs text-muted">QR code for institutional record — scan to verify</div>
              </div>
            </div>
            <div className="alert-bar alert-red" style={{ fontSize: 10 }}>
              ⚠ Deactivation flags this profile across the Greenwood-wide student Trust ledger and institutional statutory authority.
            </div>
            <button className="btn btn-danger btn-sm mt-3" style={{ width: '100%', justifyContent: 'center' }}>🗑 Deactivate & Impound Records</button>
          </div>
        </div>
      </div>
    </div>
  );
}
