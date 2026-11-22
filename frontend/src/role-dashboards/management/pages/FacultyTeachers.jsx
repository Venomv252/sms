import React, { useState } from 'react';
import { Search, UserPlus, Download, RefreshCw } from 'lucide-react';

const faculty = [
  {
    id: 'EMP-2018-042', name: 'Dr. Alistair Evans', dept: 'Science & Technology', designation: 'Sr. PGT Physics & HoD Department',
    qual: 'Ph.D (BSc), M. Sc, B.Ed AP Physics & CBSE Verified', exp: 'Tenured (6 yrs)', load: '26 Periods / Wk', grades: '10, 9, B-A, 12, A-12',
    biometric: 'Present (07:42 AM)', rating: 98.2, status: 'Present', badge: 'badge-green',
  },
  {
    id: 'EMP-2015-018', name: 'Mrs. Sunita Rao', dept: 'Mathematics', designation: 'PGT Mathematics & Vice Principal Academics',
    qual: 'M. Sc (Gold Medal), M. Ed Linear Algebra • Board Examiner', exp: 'Tenured (9 yrs)', load: '22 Periods / Wk', grades: 'Grades 11-A',
    biometric: 'Present (07:35 AM)', rating: 99.4, status: 'Present', badge: 'badge-green',
  },
  {
    id: 'EMP-2020-089', name: 'Mr. Rajesh Sen', dept: 'Science & Technology', designation: 'TGT Computer Science & Robotics Lead',
    qual: 'M.Tech (Computer Engg), B.Ed • IEEE Member', exp: 'Tenured (3 yrs)', load: '28 Periods / Wk', grades: 'Grades 8, 9, 10 Labs',
    biometric: 'Present (07:50 AM)', rating: 96.8, status: 'Present', badge: 'badge-green',
  },
  {
    id: 'EMP-2016-031', name: 'Dr. Nandita Roy', dept: 'Science & Technology', designation: 'Senior PGT Chemistry & Lab Custodian',
    qual: 'Ph.D (Chemistry), Organic Attested • Safety Certified', exp: 'Tenured (8 yrs)', load: '24 Periods / Wk', grades: 'Grades 11-B, 12-A',
    biometric: 'On Duty (Olympiad Escort)', rating: 97.5, status: 'On Duty', badge: 'badge-blue',
  },
  {
    id: 'EMP-2022-114', name: 'Mr. Tariq Mansoor', dept: 'Humanities & Languages', designation: 'TGT English & Team Master (Ruby Team)',
    qual: 'M.A. English (Oxon), B.Ed Creative Rhetoric • Debate Patron', exp: 'Tenured (2 yrs)', load: '26 Periods / Wk', grades: 'Grades 9-A, A-8, 10-G',
    biometric: 'Present (07:48 AM)', rating: 95.1, status: 'Present', badge: 'badge-green',
  },
];

const deptTabs = ['All Departments (142)', 'Science & Tech (38)', 'Mathematics (24)', 'Humanities & Languages (32)', 'Commerce & Economics (18)'];

const attestationStats = [
  { label: 'Ph.D Holders', val: 18, sub: '12.6% Faculty' },
  { label: "Master's Degrees", val: 112, sub: '78.9% Std. Mod.' },
  { label: 'Bachelor B.Ed', val: 12, sub: '8.4% Foundation' },
  { label: 'NET / CTET Passed', val: 142, sub: '100% Pedagogical Norms' },
];

const workloadAlerts = [
  { dept: 'Science & Technology Wing (36 Faculty)', pct: 92, status: 'badge-red', label: '92% Capacity (Heavy Practical Lab Hours)' },
  { dept: 'Mathematics Department (24 Faculty)', pct: 88, status: 'badge-yellow', label: '88% Capacity (Standard Optimal)' },
  { dept: 'English & Humanities (32 Faculty)', pct: 84, status: 'badge-blue', label: '84% Capacity (Moderate Ready)' },
];

export default function FacultyTeachers() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(deptTabs[0]);

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.dept.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="breadcrumb">
        <span>Management</span> <span>›</span>
        <span>Staff & HR</span> <span>›</span>
        <span>Faculty & Academic Staff Roster</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-green">CBSE Affiliation Norms Compliant</span>
        <span className="badge badge-gray">Biometric Push Sync: 08:00 AM IST</span>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        <span className="badge badge-blue">IHR GOVERNANCE PORTAL</span>
        <span className="badge badge-gray">AY 2024–25 Term IV</span>
      </div>

      <h1 className="page-title mb-2">Faculty Master Directory &<br />Academic Credentials Ledger</h1>
      <p className="page-desc mb-3">Comprehensive personnel governance, subject specialization tracking, pedagogical load distribution, and statutory attendance ledger.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-primary btn-sm"><UserPlus size={11} /> + Onboard New Faculty</button>
        <button className="btn btn-secondary btn-sm"><RefreshCw size={11} /> Bulk Biometric Sync</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Faculty Ledger</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Total Teaching Faculty</div>
          <div className="stat-card-value">142</div>
          <div className="stat-card-sub">Active Roster</div>
          <div className="stat-card-sub text-xs text-muted">Full-time: 128 Adjunct/Guest: 14</div>
          <div className="mt-2"><span className="badge badge-green">100% PGT / TGT Certified</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Average Teaching Load</div>
          <div className="stat-card-value">24.2</div>
          <div className="stat-card-sub">Periods / Wk</div>
          <div className="stat-card-sub text-xs text-muted">Target: 22–26 • Balanced (93%)</div>
          <div className="mt-2">
            <div className="progress"><div className="progress-bar progress-green" style={{ width: '93%' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Biometric Punch Today</div>
          <div className="stat-card-value text-green">97.9%</div>
          <div className="stat-card-sub">139 / 142</div>
          <div className="stat-card-sub text-xs text-muted">139 Present • 3 Approved Leave</div>
          <div className="mt-2"><span className="badge badge-gray">0/142 — 0 days</span></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Monthly Academic Payroll</div>
          <div className="stat-card-value">$539.6k</div>
          <div className="stat-card-sub">month</div>
          <div className="stat-card-sub text-xs text-muted">Mean Base $3,800 / mo</div>
          <div className="mt-2"><span className="badge badge-blue">Disbursed</span></div>
        </div>
      </div>

      {/* Department Tabs */}
      <div className="card mb-4">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 8 }}>
          <div className="flex gap-2 flex-wrap">
            {deptTabs.map(t => (
              <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab(t)} style={{ fontSize: '10px', padding: '3px 8px' }}>{t}</button>
            ))}
          </div>
          <div className="flex gap-2" style={{ marginLeft: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input className="input" style={{ paddingLeft: 26, width: 220 }} placeholder="Search teacher by name, EmpID, subject…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm">Tenured Active (132)</button>
            <button className="btn btn-secondary btn-sm">Probationary (10)</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: '6px 16px' }}>
          <div className="flex gap-2 text-xs text-muted">
            <span className="badge badge-yellow">On-Duty Leave (3)</span>
            <span className="badge badge-red">Attestation Pending (2)</span>
          </div>
        </div>

        {/* Academic Personnel Ledger Header */}
        <div className="card-body" style={{ padding: '6px 16px', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between">
            <span className="section-title">Academic Personnel Ledger</span>
            <div className="flex gap-2">
              <span className="live-badge">Live Session 2024-Q4</span>
              <span className="text-xs text-muted">Sort: Seniority & Designation ↓</span>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>EMP ID & AVATAR</th>
                <th>FACULTY NAME & DESIGNATION</th>
                <th>DEPARTMENT & SUBJECTS</th>
                <th>ACADEMIC QUALIFICATIONS</th>
                <th>LOAD & COHORTS</th>
                <th>BIOMETRIC TODAY</th>
                <th>STUDENT RATING</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar" style={{ background: '#16a34a', color: '#fff' }}>{f.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                      <div className="text-xs text-muted">{f.id}</div>
                    </div>
                  </td>
                  <td>
                    <div className="font-semibold text-sm">{f.name}</div>
                    <div className="text-xs text-muted">{f.exp}</div>
                    <div className="text-xs text-muted">{f.designation}</div>
                  </td>
                  <td>
                    <div className="font-semibold text-xs">{f.dept}</div>
                  </td>
                  <td className="text-xs text-muted">{f.qual}</td>
                  <td>
                    <div className="font-semibold text-sm">{f.load}</div>
                    <div className="text-xs text-muted">{f.grades}</div>
                  </td>
                  <td>
                    <span className={`badge ${f.badge}`}>{f.biometric}</span>
                  </td>
                  <td>
                    <div className="font-bold text-green">{f.rating}%</div>
                    <div className="progress mt-1" style={{ width: 60 }}>
                      <div className="progress-bar progress-green" style={{ width: `${f.rating}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex justify-between items-center text-xs text-muted">
            <span>Showing 1 to 8 of 142 academic faculty members</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Previous</button>
              <button className="btn btn-primary btn-sm">1</button>
              {[2, 3, 29].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid-2 mb-4">
        {/* CBSE & Statutory Attestation Ledger */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📋 CBSE & Statutory Attestation Ledger</span>
            <span className="badge badge-green">100% PGT Compliant</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Regulatory mandate compliance according to CBSE Affiliation Bye-Laws 2018, Rule 53 (Teacher Qualifications & Service Rules).</div>
            <div className="grid-4 mb-3">
              {attestationStats.map(s => (
                <div key={s.label} className="metric-box text-center">
                  <div className="font-bold" style={{ fontSize: 18 }}>{s.val}</div>
                  <div className="text-xs font-semibold">{s.label}</div>
                  <div className="text-xs text-muted">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="text-xs text-muted">DigiLocker APAAR / PIN Synchronisation Ministry of National Teacher Registration</div>
            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="font-semibold">140 / 142 Synced</span>
              <span className="badge badge-green">Compliant</span>
            </div>
          </div>
        </div>

        {/* Workload Distribution */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Workload Distribution & Substitution Alert</span>
            <span className="badge badge-green">Active Day Lead</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Real-time classroom coverage, weekly instructional quota tracking, and automatic proxy teacher deployment.</div>
            {workloadAlerts.map((w, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold" style={{ maxWidth: 200 }}>{w.dept}</span>
                  <span className="font-bold">{w.pct}%</span>
                </div>
                <div className="progress mb-1">
                  <div className={`progress-bar ${w.pct >= 90 ? 'progress-red' : w.pct >= 85 ? 'progress-yellow' : 'progress-blue'}`} style={{ width: `${w.pct}%` }} />
                </div>
                <div className="text-xs text-muted">{w.label}</div>
              </div>
            ))}
            <div className="divider" />
            <div className="alert-bar alert-yellow" style={{ fontSize: 11, padding: '6px 10px' }}>
              ⚠ 2 Active Substitution Proxies Today – Class 11-B Chem & Class 9-A Rhetoric smoothly assigned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
