import React from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const radarData = [
  { subject: 'Academics', A: 95 }, { subject: 'Finance', A: 88 },
  { subject: 'Safety', A: 100 }, { subject: 'HR', A: 82 },
  { subject: 'Fleet', A: 97 }, { subject: 'Governance', A: 91 },
];

const trendData = [
  { q: 'Q1 22', enroll: 2280, fee: 92 }, { q: 'Q2 22', enroll: 2295, fee: 93 },
  { q: 'Q3 23', enroll: 2340, fee: 90 }, { q: 'Q4 23', enroll: 2380, fee: 94 },
  { q: 'Q1 24', enroll: 2400, fee: 91 }, { q: 'Q2 24', enroll: 2430, fee: 95 },
  { q: 'Q3 24', enroll: 2450, fee: 94 }, { q: 'Q4 24', enroll: 2450, fee: 96 },
];

const kpiSummary = [
  { icon: '🎓', label: 'Total Enrollment', val: '2,450', sub: 'of 2,500 capacity', change: '+6.2%', up: true },
  { icon: '💰', label: 'Annual Revenue', val: '₹52.4L', sub: 'Gross Receipts', change: '+8.1%', up: true },
  { icon: '📚', label: 'Pass Rate', val: '98.8%', sub: 'All Grades', change: '+1.4%', up: true },
  { icon: '🚌', label: 'Fleet Uptime', val: '97.8%', sub: '28 Buses Active', change: '+0.6%', up: true },
  { icon: '👨‍🏫', label: 'Staff Count', val: '210', sub: '143 Faculty + 67 Staff', change: '+4', up: true },
  { icon: '😊', label: 'Parent CSAT', val: '94.6%', sub: 'Satisfaction Score', change: '-0.3%', up: false },
];

export default function ExecutiveSummary() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Overview</span> <span>›</span>
        <span>Executive Summary</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="badge badge-green">AY 2024–25 Q4</span>
        <span className="badge badge-blue">Board Governance Report</span>
      </div>

      <h1 className="page-title mb-2">Greenwood High –<br />Executive Summary Dashboard</h1>
      <p className="page-desc mb-4">Comprehensive AY 2024-25 overview for board review covering academics, finance, operations, safety, and governance KPIs.</p>

      {/* KPI Grid */}
      <div className="grid-3 mb-4">
        {kpiSummary.map(k => (
          <div key={k.label} className="stat-card">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ fontSize: 20 }}>{k.icon}</span>
              <div className="stat-card-label">{k.label}</div>
            </div>
            <div className="stat-card-value">{k.val}</div>
            <div className="stat-card-sub">{k.sub}</div>
            <span className={`stat-card-change mt-1 ${k.up ? 'change-up' : 'change-down'}`}>{k.change} YoY</span>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-4">
        {/* Performance Radar */}
        <div className="card">
          <div className="card-header"><span className="card-title">🎯 Institutional Performance Radar – AY 2024-25</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <Radar dataKey="A" stroke="#16a34a" fill="#16a34a" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment & Fee Trend */}
        <div className="card">
          <div className="card-header"><span className="card-title">📈 Enrollment & Fee Collection Trend</span></div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData} margin={{ left: -20 }}>
                <XAxis dataKey="q" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="enroll" name="Enrollment" stroke="#16a34a" fill="#dcfce7" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Board Highlights */}
      <div className="card mb-4">
        <div className="card-header"><span className="card-title">🏆 Board Highlights & Achievements – AY 2024-25</span></div>
        <div className="card-body">
          <div className="grid-3">
            {[
              { title: 'Academic Excellence', items: ['98.8% overall pass rate — highest in 5 years', 'Aarav Sharma – 99.2% aggregate (Topper)', '42.6% students in CBSE Pre-Board Merit bracket'] },
              { title: 'Safety & Infrastructure', items: ['100% inter-agency emergency integration achieved', 'Grade A fire & pressure system certification', 'New CCTV grid – 128 cameras, all operational'] },
              { title: 'Governance & Compliance', items: ['ITR-7 filed on time, 100% tax compliant', 'UDISE+ and DigiLocker integration complete', 'CBSE affiliation renewed — #1930281'] },
            ].map(sec => (
              <div key={sec.title}>
                <div className="font-bold mb-2 text-green">{sec.title}</div>
                {sec.items.map(item => (
                  <div key={item} className="flex items-start gap-2 mb-2 text-xs">
                    <span className="text-green mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <div className="card-header"><span className="card-title">⚡ Board Action Items for Q4</span><span className="badge badge-red">4 High Priority</span></div>
        <div className="card-body">
          <div className="grid-2">
            {[
              { priority: 'High', item: 'Resolve 4 board-level parent escalations (legal risk)', deadline: 'Nov 10, 2024', owner: 'Principal Office', badge: 'badge-red' },
              { priority: 'High', item: 'Complete KYC verification for 14 students (compliance)', deadline: 'Nov 15, 2024', owner: 'Admin Dept', badge: 'badge-red' },
              { priority: 'Medium', item: 'Fill 7 faculty vacancies (Science & Commerce)', deadline: 'Dec 01, 2024', owner: 'HR Dept', badge: 'badge-yellow' },
              { priority: 'Medium', item: 'Restock school blazers (4 units – critically low)', deadline: 'Nov 20, 2024', owner: 'Store Dept', badge: 'badge-yellow' },
            ].map(a => (
              <div key={a.item} className="metric-box">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`badge ${a.badge} mb-1`}>{a.priority} Priority</span>
                    <div className="font-semibold text-sm">{a.item}</div>
                    <div className="text-xs text-muted">Deadline: {a.deadline} • Owner: {a.owner}</div>
                  </div>
                  <button className="btn btn-secondary btn-sm">Track</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
