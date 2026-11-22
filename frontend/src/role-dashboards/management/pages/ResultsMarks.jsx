import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Upload, Download, Printer, CheckSquare, RefreshCw } from 'lucide-react';

const cohorts = [
  { id: 'GR12-PCMB', grade: 'Grade 12 Science (PCMB)', teacher: 'Dr. Raghavendra Rao', hod: 'HOD Physics Dept', enrolled: 42, avgScore: 91.5, topSub: 'Computer Sci (91.9%)', remedial: 0, status: 'CBSE Verified', badge: 'badge-green' },
  { id: 'GR10-SA', grade: 'Grade 10 – Science A', teacher: 'Mrs. Shalini Mohan', hod: 'HOD Mathematics', enrolled: 38, avgScore: 88.4, topSub: 'Mathematics (91.8%)', remedial: 2, status: 'CBSE Verified', badge: 'badge-green' },
  { id: 'GR12-COMM', grade: 'Grade 12 Commerce', teacher: 'Mr. Anand Kulkarni', hod: 'HOD Accountancy & Bus.', enrolled: 36, avgScore: 84.8, topSub: 'Economics (87.4%)', remedial: 0, status: 'Auto-Calculated', badge: 'badge-blue' },
  { id: 'GR10-ENG', grade: 'Grade 10 Section A', teacher: 'Ms. Patricia Grove', hod: 'Secondary Board Cohort', enrolled: 40, avgScore: 86.2, topSub: 'English Lit (89.6%)', remedial: 1, status: 'CBSE Verified', badge: 'badge-green' },
  { id: 'GR9-FOUND', grade: 'Grade 9 – Foundation', teacher: 'Mr. Deepak Nar', hod: 'HOD Local Sciences', enrolled: 39, avgScore: 82.1, topSub: 'Social Studies (82.7%)', remedial: 5, status: 'Pending HOD Seal', badge: 'badge-yellow' },
];

const bellCurveData = [
  { range: '91–100%', count: 630, pct: '17.5%' },
  { range: '81–90%', count: 900, pct: '34.35%' },
  { range: '71–80%', count: 520, pct: '21.6%' },
  { range: '61–70%', count: 260, pct: '11.6%' },
  { range: '41–60%', count: 121, pct: '7.1%' },
  { range: 'Essential Repeat (<40%)', count: 29, pct: '1.2%' },
];

const honors = [
  { label: 'BEST ACADEMIC SECTION', val: 'Grade 12 – Science & Physics', sub: '91.9% Average GPA' },
  { label: 'HIGHEST SUBJECT MARK', val: 'Mathematics (Gr. 10)', sub: '97.1% Cohort-wide Average' },
  { label: 'TOP SCHOLAR OF TERM', val: 'Aarav Sharma (10-B)', sub: '99.2% Aggregate' },
];

export default function ResultsMarks() {
  const [activeTab, setActiveTab] = useState('All Grades (Pre-K to 12)');
  const tabs = ['All Grades (Pre-K to 12)', 'Senior Secondary (11–12)', 'Secondary (9–10)'];

  const filteredCohorts = cohorts.filter(c => {
    if (activeTab === 'Senior Secondary (11–12)') return c.id.startsWith('GR12');
    if (activeTab === 'Secondary (9–10)') return c.id.startsWith('GR10') || c.id.startsWith('GR9');
    return true;
  });

  return (
    <div>
      <div className="breadcrumb">
        <span>Students & Academics</span> <span>›</span>
        <span>Results & Marks</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-blue">ACADEMIC EXCELLENCE & CBSE MODERATION</span>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <span className="badge badge-green">ACADEMIC EXCELLENCE</span>
        <span className="badge badge-gray">Board Directive 2024/CBSE-SBC</span>
      </div>

      <h1 className="page-title mb-2">Institutional Academic Results,<br />Report Card Engine &<br />Board Examination Analytics</h1>
      <p className="page-desc mb-3">Comprehensive grade distribution across Pre-K to Grade-12, CBSE board moderation thresholds, automated digital report card compilation, and academic/remedial cohort tracking.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-secondary btn-sm"><Upload size={11} /> Upload Marksheet</button>
        <button className="btn btn-secondary btn-sm">Moderate Scale</button>
        <button className="btn btn-primary btn-sm">Publish Batch</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export Ledger</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-5 mb-4">
        {[
          { label: 'Overall Pass Rate', val: '98.8%', sub: '+1.4% prev term', badge: 'High Distinction', badgeClass: 'badge-green' },
          { label: 'CBSE Pre-Board Merit', val: '42.6%', sub: 'W/Scholars to Gr 11 & 12', badge: '90%+ Bracket', badgeClass: 'badge-blue' },
          { label: 'Report Cards Generated', val: '2,450', sub: '2,450 / 2,450 Closed', badge: '100% Sealed', badgeClass: 'badge-green' },
          { label: 'Academic Remedial Cohort', val: '29', sub: 'Below 50% Threshold', badge: 'Clinic Active', badgeClass: 'badge-red' },
          { label: 'Board Moderation Status', val: 'Verified', sub: 'QR Verified 0 Pending Arbitration', badge: 'CBSE Matched', badgeClass: 'badge-green' },
        ].map(k => (
          <div key={k.label} className="stat-card">
            <div className="stat-card-label">{k.label}</div>
            <div className="stat-card-value">{k.val}</div>
            <span className={`badge ${k.badgeClass} mt-1`}>{k.badge}</span>
            <div className="stat-card-sub mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab filters + table */}
      <div className="card mb-4">
        <div className="card-header">
          <div className="flex gap-2 flex-wrap">
            {tabs.map(t => (
              <button key={t} className={`btn btn-sm ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="input" placeholder="Filter by class, section or subject…" />
            <button className="btn btn-secondary btn-sm"><Download size={11} /></button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Cohort / Section</th>
                <th>Class Teacher & HOD</th>
                <th>Enrolled Pupils</th>
                <th>Class Avg Score</th>
                <th>Top Performing Subject</th>
                <th>Remedial</th>
                <th>Moderation Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCohorts.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="font-semibold">{c.grade}</div>
                    <div className="text-xs text-muted">{c.id}</div>
                  </td>
                  <td>
                    <div className="text-sm">{c.teacher}</div>
                    <div className="text-xs text-muted">{c.hod}</div>
                  </td>
                  <td className="font-bold text-center">{c.enrolled}</td>
                  <td>
                    <div className="font-bold text-green">{c.avgScore}% ▬</div>
                    <div className="progress mt-1"><div className="progress-bar progress-green" style={{ width: `${c.avgScore}%` }} /></div>
                  </td>
                  <td className="text-sm">{c.topSub}</td>
                  <td>
                    <span className={`badge ${c.remedial > 0 ? 'badge-red' : 'badge-green'}`}>{c.remedial}</span>
                  </td>
                  <td><span className={`badge ${c.badge}`}>{c.status}</span></td>
                  <td><button className="btn btn-secondary btn-sm">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-body" style={{ padding: '10px 16px' }}>
          <div className="flex justify-between text-xs text-muted">
            <span>Showing 5 of 64 Cohorts | ₹ All 2,450 academic cohort records synchronized</span>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Previous</button>
              <button className="btn btn-primary btn-sm">1</button>
              <button className="btn btn-secondary btn-sm">2</button>
              <button className="btn btn-secondary btn-sm">3</button>
              <button className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3 mb-4">
        {/* Bell Curve */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">CBSE Moderation Bell Curve</span>
            <span className="badge badge-green">Graded Gaussian</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Grade breakdown across term II enrolled 3,450 candidates for Term II index moderation.</div>
            {bellCurveData.map(b => (
              <div key={b.range} className="flex items-center gap-2 mb-2">
                <div className="text-xs" style={{ minWidth: 130 }}>{b.range}</div>
                <div className="flex-1">
                  <div className="progress">
                    <div className="progress-bar progress-green" style={{ width: `${(b.count / 900) * 100}%` }} />
                  </div>
                </div>
                <div className="text-xs font-semibold" style={{ minWidth: 40 }}>{b.count}</div>
                <div className="text-xs text-muted" style={{ minWidth: 40 }}>{b.pct}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Report Card Vault */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🔐 Digital Report Card Vault</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Official institutionally sealed in Report Card review with automated receipt dispatch.</div>
            <div className="metric-box mb-2">
              <div className="text-xs text-muted">GreenwoodHigh Official</div>
              <div className="font-bold">Deepak Kothari</div>
              <div className="text-xs text-muted">Roll No 2492-094 • Oct C 12, 2024</div>
              <div className="flex justify-between mt-2">
                <div>
                  <div className="text-xs text-muted">Physics (042)</div>
                  <div className="font-bold">95 / 100</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Chemistry (043)</div>
                  <div className="font-bold">94 / 100</div>
                </div>
              </div>
              <div className="flex justify-between mt-1">
                <div>
                  <div className="text-xs text-muted">Mathematics (041)</div>
                  <div className="font-bold">99 / 100</div>
                </div>
                <div>
                  <div className="text-xs text-muted">Comp Sci (083)</div>
                  <div className="font-bold">99 / 100</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="badge badge-green">QR Verified</span>
                <div>
                  <div className="text-xs font-semibold">Dr. Eleanor Vance</div>
                  <div className="text-xs text-muted">Director & Principal</div>
                </div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Patent eMS App</button>
          </div>
        </div>

        {/* Academic Honors */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🏆 Institutional Launches – Academic Honors</span>
          </div>
          <div className="card-body">
            {honors.map(h => (
              <div key={h.label} className="metric-box mb-2">
                <div className="text-xs text-muted">{h.label}</div>
                <div className="font-bold">{h.val}</div>
                <div className="text-xs text-muted">{h.sub}</div>
              </div>
            ))}
            <div className="mt-3">
              <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Remedial Clinic Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
