import React, { useState } from 'react';
import { Calendar, Plus, RefreshCw, Printer, Download } from 'lucide-react';

const periods = [
  { period: 'Period 1\n08:00 AM –\n09:00 AM', subject: 'Advanced Mathematics', code: 'MAT', faculty: 'Mrs. Sunita Rao', vim: 'Room 204 (Wing B)', substitution: 'Regular In-Routine', subBadge: 'badge-green' },
  { period: 'Period 2\n09:05 AM –\n10:00 AM', subject: 'Physics & Mechanics', code: 'PHY', faculty: 'Dr. Arthur Pires', vim: 'Physics Lab 2 (Wing B)', substitution: 'Regular In-Routine', subBadge: 'badge-green' },
  { period: 'Period 3 ⚡\n10:20 AM –\n11:20 AM', subject: 'Organic Chemistry', code: 'CHM', faculty: 'Mr. Tanit Planower', vim: 'Chem Lab East', substitution: 'AI Covered with Sub', subBadge: 'badge-yellow' },
  { period: 'Period 4\n11:25 AM –\n12:10 PM', subject: 'English Case Study', code: 'ENG', faculty: 'Ms. Radhika Mohan', vim: 'Room 204 (Wing B)', substitution: 'Regular In-Routine', subBadge: 'badge-green' },
  { period: 'Period 5\n01:00 PM –\n01:55 PM', subject: 'Computer Science & AI', code: 'CS', faculty: 'Mr. Vikram Priya', vim: 'STEM Robotics Arena', substitution: 'Regular In-Routine', subBadge: 'badge-green' },
  { period: 'Period 6\n02:00 PM –\n02:55 PM', subject: 'Biology / Genetics', code: 'BIO', faculty: 'Mrs. Nandita Roy', vim: 'Bioresearch Lab', substitution: 'AI Assigned Today', subBadge: 'badge-blue' },
  { period: 'Zero Period /\nRemedial', subject: 'Doubt Clearing & Blend Prep', code: '–', faculty: 'Doubt Faculty Pool', vim: 'Central Library, Conference Hal', substitution: 'Scheduled', subBadge: 'badge-gray' },
];

const boardExams = [
  { date: 'Mar 10, 2025', time: '09:30 AM – 12:30 PM', exam: 'Advanced Mathematics', grade: 'Grade 12 / Grade 10', venue: 'Main Auditorium', chief: 'Mrs. Sujata Rao', status: 'Confirmed', badge: 'badge-green' },
  { date: 'Mar 14, 2025', time: '09:30 AM – 12:30 PM', exam: 'Physics / Applied Math', grade: 'Grade 12 / Grade 11', venue: 'Classrooms 201-25', chief: 'Ms. Gupta', status: 'Confirmed', badge: 'badge-green' },
  { date: 'Apr 03, 2025', time: '09:30 AM – 12:30 PM', exam: 'English & Chemistry', grade: 'Grade 9+', venue: 'Exam Hall A', chief: 'Mr. Vikram Priya', status: 'Confirmed', badge: 'badge-green' },
  { date: 'Apr 18, 2025', time: '09:00 AM – 12:30 PM', exam: 'Mathematics / Applied Math', grade: 'Grade 11 & 12', venue: 'Classrooms 201-36', chief: 'Mrs. Sujata Rao', status: 'Pending', badge: 'badge-yellow' },
  { date: 'Apr 28, 2025', time: '09:00 AM – 12:00 PM', exam: 'Robotics & Computer Science', grade: 'Grade 12 / Grade 10', venue: 'STEM Lab Block', chief: 'Mr. Vikram Priya', status: 'Approved', badge: 'badge-blue' },
];

const campusVenueBookings = [
  { venue: 'Main Auditorium', event: 'Annual Day Cultural Rehearsals', date: '22:00 – 05:00', status: 'Live Today', badge: 'badge-green' },
  { venue: 'Olympics Oval (3:30 AM – 4:00 AM)', event: 'Annual Track & Field Test Prep', date: '', status: 'Completed', badge: 'badge-gray' },
  { venue: 'Biology Quad (3:30 – 5:00 PM)', event: 'CBSE Regional Induction Prog.', date: '', status: 'Confirmed', badge: 'badge-blue' },
];

const substitutions = [
  { time: 'ON-DUTY 24H+ / REGULAR', faculty: 'Dr. Pandila Roy', dept: 'HOD-Chemistry (Chem.) – State Service Dispensed', status: 'CB Approved', badge: 'badge-green' },
  { time: '12:15 PM – Period 6', faculty: 'Ms. Tara Menon', dept: 'Physics Dept – Proxy Teacher', status: 'Rejected', badge: 'badge-red' },
  { time: '01:00 PM – Period 6', faculty: 'Mrs. Benita Sinha', dept: 'Accountable Physics Dept.', status: 'Accepted', badge: 'badge-green' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday (Club & Electives)', 'Current Ent. Period (8:01–9:30)'];

export default function Timetable() {
  const [activeDay, setActiveDay] = useState('Monday');

  return (
    <div>
      <div className="breadcrumb">
        <span>Students & Academics</span> <span>›</span>
        <span>Timetable & Routine</span>
      </div>

      <div className="flex gap-2 mb-2 flex-wrap">
        <span className="badge badge-green">CENTRAL ACADEMIC</span>
        <span className="badge badge-gray">SCHEDULING & VENUE OPERATIONS • AY 2024–25</span>
        <span className="badge badge-blue">Board Directive AY 2024/CBSE-SBC</span>
      </div>

      <h1 className="page-title mb-2">Master Timetable,<br />Examination Schedule<br />& Campus Venue Matrix</h1>
      <p className="page-desc mb-3">Institutionalised student allocation, teacher substitution engines, CBSE board examination center logistics, and auditorium/sports/field instructions.</p>

      <div className="page-actions mb-4">
        <button className="btn btn-primary btn-sm"><Plus size={11} /> New Schedule Revision</button>
        <button className="btn btn-secondary btn-sm">Trigger AI Substitution</button>
        <button className="btn btn-secondary btn-sm"><Printer size={11} /> Publish Datesheet</button>
        <button className="btn btn-secondary btn-sm"><Download size={11} /> Export</button>
      </div>

      {/* KPI Strip */}
      <div className="grid-4 mb-4">
        <div className="stat-card">
          <div className="stat-card-label">Weekly Instructional Sessions</div>
          <div className="stat-card-value">1,420</div>
          <div className="stat-card-sub">/1,450 • 98% Formulated</div>
          <div className="stat-card-sub text-xs text-muted">Class hours, Environmental classes</div>
          <span className="badge badge-green mt-2">98% Formulated</span>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Substitutions Today</div>
          <div className="stat-card-value">3</div>
          <div className="stat-card-sub"><span className="badge badge-yellow">Deployed Today</span></div>
          <div className="stat-card-sub text-xs text-muted">All 3 subject teachers deployed; Supervisor in educational absences</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Appointments this week (Board)</div>
          <div className="stat-card-value">Term II & Final</div>
          <div className="stat-card-sub"><span className="badge badge-green">CBSE Approved</span></div>
          <div className="stat-card-sub text-xs text-muted">Grading / Academic halls confirmed; Venue finalized after signing</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Campus Venue Utilization</div>
          <div className="stat-card-value text-green">88.5%</div>
          <div className="stat-card-sub"><span className="badge badge-yellow">High Activity</span></div>
          <div className="stat-card-sub text-xs text-muted">Academic on STEM Expo 4 Active Halls & Ample Theatre</div>
        </div>
      </div>

      {/* Academic Timetable Matrix */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📅 Academic Timetable Matrix</span>
          <div className="flex gap-2 flex-wrap">
            <button className="btn btn-primary btn-sm">Grade 10 III</button>
            <button className="btn btn-secondary btn-sm">Grade 12 Science</button>
            <button className="btn btn-secondary btn-sm">Grade 12 Commerce</button>
            <button className="btn btn-secondary btn-sm">Sheets 9-11</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: '8px 16px' }}>
          <div className="flex gap-2 flex-wrap mb-2">
            {days.map(d => (
              <button key={d} className={`btn btn-sm ${activeDay === d ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveDay(d)} style={{ fontSize: '10px', padding: '3px 8px' }}>{d}</button>
            ))}
          </div>
          <div className="alert-bar alert-green mb-3" style={{ fontSize: '11px', padding: '5px 10px' }}>
            ✅ Timetable Audit Status: No errors listed. All timetable periods are scheduled on {activeDay}. Faculty available and ZERO CONFLICTS
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Period & Time</th>
                <th>Subject & Curriculum Code</th>
                <th>Assigned Faculty</th>
                <th>Venue / Lab</th>
                <th>Substitution / Proxy</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((p, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'pre-line' }} className="text-xs font-semibold">{p.period}</td>
                  <td>
                    <div className="font-semibold">{p.subject}</div>
                    <span className="badge badge-gray">{p.code}</span>
                  </td>
                  <td className="text-sm">{p.faculty}</td>
                  <td className="text-xs">{p.vim}</td>
                  <td><span className={`badge ${p.subBadge}`}>{p.substitution}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-3 mb-4">
        {/* AI Substitution */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🤖 AI Substitution Engine</span>
            <span className="badge badge-green">Autonomous</span>
          </div>
          <div className="card-body">
            <div className="text-xs text-muted mb-3">Real-time CBSE 40:03 Scaling</div>
            {substitutions.map((s, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted">{s.time}</div>
                    <div className="font-semibold text-sm">{s.faculty}</div>
                    <div className="text-xs text-muted">{s.dept}</div>
                  </div>
                  <span className={`badge ${s.badge}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Board Exam Bookings */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">📝 Term II Board Exam Bookings</span>
            <span className="badge badge-green">AISF / ASCSC</span>
          </div>
          <div className="card-body" style={{ padding: '8px 12px' }}>
            {boardExams.map((e, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <div style={{ minWidth: 40, textAlign: 'center', background: '#f0fdf4', borderRadius: 6, padding: '4px' }}>
                  <div className="text-xs text-muted">{e.date.split(' ')[0]}</div>
                  <div className="font-bold text-green">{e.date.split(' ')[1]}</div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{e.exam}</div>
                  <div className="text-xs text-muted">{e.time}</div>
                  <div className="text-xs text-muted">Chief Invigilator: {e.chief}</div>
                </div>
                <span className={`badge ${e.badge}`}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Venue Bookings */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">🏛 Campus Venue Bookings</span>
            <span className="badge badge-red">Live Track!</span>
          </div>
          <div className="card-body">
            {campusVenueBookings.map((v, i) => (
              <div key={i} className="metric-box mb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{v.venue}</div>
                    <div className="text-xs text-muted">{v.event}</div>
                    {v.date && <div className="text-xs text-muted">{v.date}</div>}
                  </div>
                  <span className={`badge ${v.badge}`}>{v.status}</span>
                </div>
              </div>
            ))}
            <div className="divider" />
            <div className="flex gap-2 mt-2">
              <button className="btn btn-secondary btn-sm flex-1" style={{ justifyContent: 'center' }}>Hall Tickets</button>
              <button className="btn btn-secondary btn-sm flex-1" style={{ justifyContent: 'center' }}>Roll Stickers</button>
            </div>
            <button className="btn btn-primary btn-sm mt-2" style={{ width: '100%', justifyContent: 'center' }}>Reserve Campus Venue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
