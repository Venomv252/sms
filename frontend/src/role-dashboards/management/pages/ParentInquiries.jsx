import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MessageSquare, Calendar, Radio, Download, Search, Filter } from 'lucide-react';

const tickets = [
  { id: '#ESC-2025-089', date: 'Feb 23, 07:48 AM', student: 'Rohan Varma', studentId: 'Grade 9-C • Adm #881', parent: 'Mr. Vikram Varma', phone: '+919845 110/0 •', email: 'vikram@managea...', category: 'Transport Delay', issue: 'Bus Route #14 Whitefield routing 15 min…', tag: 'Route 14', tagBadge: 'badge-orange', urgent: false },
  { id: '#ESC-2025-088', date: 'Feb 23, 04:12 AM', student: 'Ananya Sengupta', studentId: 'Grade 7-A • Adm #7943', parent: 'Mrs. Supriya Sengupta', phone: '+91 93241 330 19 •', email: 'supriya.d@institutiou.com', category: 'Fee Discrepancy', issue: 'Dispute on Lab Fee Surcharge for Term II…', tag: 'Billing Term II', tagBadge: 'badge-red', urgent: true },
  { id: '#ESC-2025-063', date: 'Feb 23, 04:30 PM', student: 'Kabir Mehta', studentId: 'Grade 10-B • Adm #8401', parent: 'Col. Rajesh Mehta', phone: '+917710 54228 •', email: 'r-mehta@q.gov.in', category: 'Academic Appeal', issue: 'Request for grade re-check in Physics Pre-…', tag: 'Physics Pre-Board', tagBadge: 'badge-blue', urgent: false },
  { id: '#ESC-2025-074', date: '', student: 'Tamil Iyer', studentId: 'Grade 6-B • Adm #9120', parent: 'Dr. Madhavaniyer', phone: '+91999 02 285471 •', email: 'miyer@manipalhealthcorp.com', category: 'Infirmary', issue: 'Parent allergy cross-contamination notice of…', tag: 'Canteen Menu', tagBadge: 'badge-yellow', urgent: false },
];

const sentimentData = [
  { name: 'Transport', value: 38, color: '#0ea5e9' },
  { name: 'Fee & %', value: 26, color: '#ef4444' },
  { name: 'Academic', value: 20, color: '#8b5cf6' },
  { name: 'Canteen', value: 16, color: '#f59e0b' },
];

const ptmSlots = [
  { time: '06:20 AM – 09:30 AM', type: 'Junior Wing (Grades 1-5)', total: 1890, confirmed: 2100, open: '10% Open', confirmed_pct: 76 },
];

const venueAlloc = [
  { venue: 'Senior Wing (Grades 11 & 12) Classrooms 201-25 – 36 Faculty', pct: 98, status: 'Full' },
  { venue: 'Middle Wing (Grades 6-10) Central Library & AV Hall – 48 Faculty', pct: 92, status: 'Full' },
  { venue: 'Primary Wing (Pre-K to 5) Junior Activity Hall – 32 Faculty', pct: 82, status: '' },
];

export default function ParentInquiries() {
  const [activeTab, setActiveTab] = useState('All Inquiries (64)');
  const tabs = ['All Inquiries (64)', 'Urgent Escalations (4)', 'Fee & Billing (32)', 'Transp…'];

  return (
    <div>
      <div className="breadcrumb">
        <span>Institutional Governance</span> <span>›</span>
        <span>Parent Inquiries & Complaints</span>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        <span className="badge badge-green">BOARD GOVERNANCE & PARENT RELATIONS PROTOCOL • OMBUDSMAN ACTIVE</span>
        <span className="badge badge-blue">Statutory Level 3 Shield</span>
      </div>

      <h1 className="page-title mb-2">Parent Escalations,<br />Institutional Inquiries<br />& PTM Governance Desk</h1>
      <p className="page-desc mb-3">Centralised oversight of parent grievances, fee disputes, academic appeals, transport complaints, and bilateral management-parent official communications.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-primary btn-sm"><Radio size={11} /> Broadcast Circular</button>
        <button className="btn btn-secondary btn-sm"><Calendar size={11} /> Schedule Emergency PTM</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Dossier</button>
        <button className="btn btn-secondary btn-sm"><MessageSquare size={11} /></button>
      </div>

      {/* KPI Strip */}
      <div className="grid-5 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Total Inquiries Logged (MTD)</div>
          <div className="stat-card-value">64</div>
          <div className="stat-card-sub"><span className="badge badge-green">91% Resolved</span></div>
          <div className="stat-card-sub text-xs text-muted">59 resolved within 24h SLA</div>
          <div className="stat-card-sub text-xs text-muted">Avg 6.2h TAT</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Board Level Escalations</div>
          <div className="stat-card-value text-red">04</div>
          <div className="stat-card-sub"><span className="badge badge-red">High Priority</span></div>
          <div className="stat-card-sub text-xs text-muted">Awaiting Principal & Trustee</div>
          <div className="stat-card-sub text-xs text-muted">0 Statutory Notices</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Parent Satisfaction (CSAT)</div>
          <div className="stat-card-value text-green">94.6%</div>
          <div className="stat-card-sub"><span className="badge badge-green">Excellent</span></div>
          <div className="stat-card-sub text-xs text-muted">Based on 420 verified ratings</div>
          <div className="stat-card-sub text-xs text-muted">–5.2% Benchmark</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">PTM Appointments Completed</div>
          <div className="stat-card-value">1,890</div>
          <div className="stat-card-sub"><span className="badge badge-green">90% Attendance</span></div>
          <div className="stat-card-sub text-xs text-muted">/2,100 Term Rounds 330 Reschedules</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Avg Turnaround</div>
          <div className="stat-card-value">6.2h</div>
          <div className="stat-card-sub text-xs text-green">−40m vs Target</div>
        </div>
      </div>

      {/* Ticket Table */}
      <div className="card mb-4">
        <div className="card-header" style={{ flexWrap: 'wrap', gap: 8 }}>
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <div className="flex gap-2" style={{ marginLeft: 'auto' }}>
            <div style={{ position: 'relative' }}>
              <Search size={12} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input className="input" style={{ paddingLeft: 26, width: 200 }} placeholder="Search ticket #, student, phone or issue" />
            </div>
            <button className="btn btn-secondary btn-sm"><Filter size={11} /></button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket ID & Date</th>
                <th>Student & Class</th>
                <th>Parent / Guardian Details</th>
                <th>Category & Grievance Issue</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td>
                    <div className="font-bold">{t.id}</div>
                    <div className="text-xs text-muted">{t.date}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: '#0ea5e9', color: '#fff' }}>{t.student[0]}</div>
                      <div>
                        <div className="font-semibold">{t.student}</div>
                        <div className="text-xs text-muted">{t.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">{t.parent}</div>
                    <div className="text-xs text-muted">{t.phone}</div>
                    <div className="text-xs text-muted">{t.email}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{t.category}</span>
                      <span className={`badge ${t.tagBadge}`}>{t.tag}</span>
                      {t.urgent && <span className="badge badge-red">🔴 Urgent</span>}
                    </div>
                    <div className="text-xs text-muted">{t.issue}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '10px 16px' }}>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Showing 1–4 of 64 active parent inquiries</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Previous</button>
              <button className="btn btn-primary btn-sm">1</button>
              {[2,3,16].map(n => <button key={n} className="btn btn-secondary btn-sm">{n}</button>)}
              <button className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 panels */}
      <div className="grid-3">
        {/* Executive Broadcast */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📢 Executive Broadcast</span>
            <span className="badge badge-green">Two-way parent advisory dispatch</span>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <div className="text-xs text-muted mb-1">Select Parent Cohort</div>
              <select className="input" style={{ width: '100%' }}>
                <option>Bus Route #14 Whitefield Corridor(s)</option>
                <option>All Parents</option>
                <option>Grade 10 Parents</option>
              </select>
            </div>
            <div className="text-xs font-semibold mb-2">Transmission Protocol</div>
            {[
              { label: 'ERP Parent App Push/Intent (100%)', checked: true },
              { label: 'SMS Flash Gateway    Priority 1', checked: true },
              { label: 'Registered Email + Board Digital Seal', checked: true },
            ].map((ch, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input type="checkbox" defaultChecked={ch.checked} />
                <span className="text-xs">{ch.label}</span>
              </div>
            ))}
            <div className="mb-2">
              <div className="text-xs font-semibold mb-1">Circular Subject</div>
              <input className="input" style={{ width: '100%' }} placeholder="Advisory Memo Benching Diversion for…" />
            </div>
            <div className="mb-3">
              <div className="text-xs font-semibold mb-1">Executive Note</div>
              <textarea className="input" style={{ width: '100%', height: 80, resize: 'vertical', fontFamily: 'inherit', fontSize: 11 }} defaultValue="Dear Greenwood Parents, Please note an interim 10-minute departure reschedulation starting tomorrow for the BI street altercation..." />
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Radio size={12} /> Broadcast Official Circular
            </button>
          </div>
        </div>

        {/* PTM Master */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📅 Term II PTM Master</span>
            <span className="live-badge">Live Session</span>
          </div>
          <div className="card-body">
            <div className="metric-box mb-3">
              <div className="text-xs text-muted">Conference allocation & timings</div>
              <div className="font-bold">Saturday, March 15, 2025</div>
              <div className="text-xs">06:20 AM – 02:30 PM (PM |31)</div>
              <div className="flex gap-4 mt-2">
                <div><div className="font-bold">1,890 / 2,100</div><div className="text-xs text-muted">Total Booked</div></div>
                <div><div className="font-bold">76%</div><div className="text-xs text-muted">Confirmed</div></div>
                <div><div className="font-bold">10%</div><div className="text-xs text-muted">Open</div></div>
              </div>
            </div>
            <div className="text-xs font-semibold mb-2">Venue & Wing Allocation</div>
            {venueAlloc.map((v, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted" style={{ flex: 1 }}>{v.venue}</span>
                  <span className={`badge ${v.pct >= 95 ? 'badge-red' : v.pct >= 85 ? 'badge-yellow' : 'badge-green'}`}>{v.pct}% {v.status}</span>
                </div>
                <div className="progress"><div className={`progress-bar ${v.pct >= 95 ? 'progress-red' : v.pct >= 85 ? 'progress-yellow' : 'progress-green'}`} style={{ width: `${v.pct}%` }} /></div>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm mt-3" style={{ width: '100%', justifyContent: 'center' }}>Reallocate Unattended Slots</button>
          </div>
        </div>

        {/* Sentiment / Root Cause */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Root-Cause Sentiment</span>
            <span className="text-xs text-muted">Ombudsman grievance categorisation</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ResponsiveContainer width={110} height={110}>
                <PieChart>
                  <Pie data={sentimentData} innerRadius={30} outerRadius={50} dataKey="value">
                    {sentimentData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div>
                <div className="font-bold" style={{ fontSize: 24 }}>64</div>
                <div className="text-xs text-muted">Cases</div>
                {sentimentData.map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-xs mt-1">
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                    <span>{d.name}: {d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="divider" />
            <div className="text-xs font-semibold mb-2">Average Turnaround Time (TAT)</div>
            {[
              { label: 'Transport Desk', val: '3.5 hrs', note: '−40m vs Target' },
              { label: 'Finance & Bursur B.', val: '8.0 hrs', note: 'Within SLA' },
              { label: 'Academics & Exams', val: '12.0 hrs', note: 'Needs Review' },
              { label: 'Ombudsman Desk Audit', val: '—', note: 'Compliant' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between mb-1 text-xs">
                <span className="text-muted">{t.label}</span>
                <div className="text-right">
                  <span className="font-semibold">{t.val}</span>
                  <span className={`ml-2 text-xs ${t.note.includes('Needs') ? 'text-red' : 'text-green'}`}>{t.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
