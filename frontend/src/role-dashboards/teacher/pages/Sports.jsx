import React from 'react'
import { Trophy, Plus, Download, Users, Star, CheckCircle, Bell, Activity } from 'lucide-react'

const athletes = [
  { initials: 'HP', name: 'Rohan Patel', roll: '10-B · #04', event: '100m Dash', trial: '11.42s (School Top 3)', medical: 'Verified', consent: 'Signed', status: 'Confirmed', color: 'av-blue' },
  { initials: 'AM', name: 'Ananya Menon', roll: '10-B · #19', event: 'High Jump', trial: '1.58m (PB)', medical: 'Verified', consent: 'Signed', status: 'Confirmed', color: 'av-green' },
  { initials: 'VK', name: 'Vikram Kulkarni', roll: '11-C · #21', event: 'Table Tennis', trial: 'District Quarterfinalist', medical: 'Verified', consent: 'Signed', status: 'Select', color: 'av-orange' },
  { initials: 'TK', name: 'Tanya Kapoor', roll: '10-B · #11', event: '4x100m Relay', trial: '12.18s split', medical: 'Verified', consent: 'Pending', status: 'Remind Consent', color: 'av-red' },
]

const teams = [
  { name: 'School Team', pts: 640, sub: 'Track & Field · Scholastic Quiz', color: '#16a34a', mine: true },
  { name: 'Sports Team B', pts: 615, sub: 'Dominant in Football & Debate', color: '#dc2626' },
  { name: 'Sports Team C', pts: 590, sub: 'Swimming & Performing Arts', color: '#3b82f6' },
  { name: 'Topaz Titans', pts: 580, sub: 'Badminton & Fine Arts', color: '#f59e0b' },
]

const pointsLog = [
  { initials: 'AS', name: 'Aarav Sharma (10-B)', pts: '+15', time: '10:30 AM', desc: '1st Place Individual Scholastic round', color: 'av-green' },
  { initials: 'AS', name: 'Aarav Sqdn 4x100', pts: '+26', time: 'Yesterday', desc: 'Qualified with 82.84s record', color: 'av-blue' },
  { initials: 'MS', name: 'Maya Sen (11-A)', pts: '+10', time: '2 hrs ago', desc: 'Team standard bearer commendation', color: 'av-purple' },
  { initials: 'FC', name: 'Falcons Chess Quintet', pts: '+30', time: '3 days ago', desc: 'Board 1-3 sweeps vs Sapphires. Undefeated tournament run.', color: 'av-teal' },
]

const stemTracks = [
  { title: 'NSEP Olympiad Prep', students: 24, sub: 'Enrolled + Set Lab', track: 'TRACK 01' },
  { title: 'Regional Robotics', students: 18, sub: 'Enrolled · Arduino/C++', track: 'TRACK 02' },
  { title: 'Science Expo Booths', students: 22, sub: 'Enrolled · Physics Fair', track: 'TRACK 03' },
]

const pastoralItems = [
  { title: 'Team Spirit Commendation', detail: 'Kabir Mehta & Samara Das awarded for organizing the campus clean-up green drive. +10 Civic Merit · Logged by Evans' },
  { title: 'Assembly Leadership Duty', detail: 'Morning Assembly for School Team scheduled for Friday Anthem & Thought for the Day. Friday 02:45 AM · Prep Confirmed.' },
  { title: 'Team Uniform Inspection', detail: 'Weekly blazer and green tie inspection: 95% compliance across all cohorts. Next Check: Mon 8:00 AM' },
]

export default function Sports() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Evaluation &amp; Records</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Sports &amp; Activities</span>
        <span className="badge badge-green" style={{ marginLeft: 6 }}>SPORTS COORDINATOR CONSOLE · SCHOOL TEAM · AY 2024-25 Term II</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Team Mentorship, Sports &amp; Extra-Curricular Records</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Inter-Team Championship tracking, student athletic event rosters, co-curricular club governance, and merit points dispensation for School Team Team.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Export Team Dossier</button>
          <button className="btn btn-outline btn-sm"><Star size={13} /> + Nominate Athletes</button>
          <button className="btn btn-primary btn-sm"><Plus size={13} /> + Log Team Points / Merit</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Team Standing</div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>🥇 1st Place</div>
          <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>640 pts</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>↑ +25 pts lead</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Registered Cadets</div>
          <div className="stat-value">140</div>
          <div style={{ fontSize: 11 }}>Students · Grades 9 to 12</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>100% Assigned</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Championship Events</div>
          <div className="stat-value">4</div>
          <div style={{ fontSize: 11 }}>Sprint, Jump, Relay...</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>This Friday</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Club Directorate</div>
          <div className="stat-value">64</div>
          <div style={{ fontSize: 11 }}>Scholars</div>
          <div style={{ fontSize: 11, color: '#16a34a' }}>Physics &amp; Robotics · 92% Folio Index</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Inter-Team Championship Standing */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">🏆 Inter-Team Championship Standing</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Annual rolling merit ledger · Updated 40 minutes ago · Season 2024-25 Round 4 of 6</div>
              </div>
            </div>
            {teams.map((h, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 6, background: h.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{h.name}</span>
                        {h.mine && <span className="badge badge-green" style={{ fontSize: 10 }}>Your Team</span>}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{h.sub}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 18 }}>{h.pts} pts</span>
                </div>
                <div className="progress-bar" style={{ height: 7 }}>
                  <div className="progress-fill" style={{ width: `${(h.pts / 700) * 100}%`, height: 7, background: h.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Athletic Trials Roster */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏃 Athletic Trials &amp; Event Nomination Roster</div>
              <div className="flex gap-2">
                <div className="search-bar" style={{ minWidth: 150 }}>
                  <input placeholder="Filter athlete, event..." />
                </div>
                <button className="btn btn-outline btn-sm">Filter</button>
              </div>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ATHLETE CADET</th>
                    <th>CLASS &amp; ROLL</th>
                    <th>EVENT CATEGORY</th>
                    <th>TRIAL METRIC</th>
                    <th>MEDICAL CLEARANCE</th>
                    <th>PARENT CONSENT</th>
                    <th>QUICK ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {athletes.map((a, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <div className={`avatar ${a.color}`} style={{ width: 30, height: 30, fontSize: 11 }}>{a.initials}</div>
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{a.name}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: 12, color: '#64748b' }}>{a.roll}</td>
                      <td style={{ fontWeight: 600, fontSize: 13 }}>{a.event}</td>
                      <td style={{ fontSize: 12 }}>{a.trial}</td>
                      <td><span className="badge badge-green"><CheckCircle size={10} /> {a.medical}</span></td>
                      <td>
                        {a.consent === 'Pending'
                          ? <span className="badge badge-red">⚠ Pending</span>
                          : <span className="badge badge-green">✓ {a.consent}</span>
                        }
                      </td>
                      <td>
                        <button className={`btn btn-sm ${a.status === 'Confirmed' ? 'btn-primary' : a.status === 'Remind Consent' ? 'btn-outline' : 'btn-ghost'}`} style={{ fontSize: 11 }}>
                          {a.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#64748b' }}>Showing 4 of 28 nominated athletes for Greenwood Sports Gala.</span>
              <div className="flex gap-2">
                <button className="btn btn-outline btn-sm">Issue Bulk Team Jerseys</button>
                <button className="btn btn-primary btn-sm">Schedule Practice Session</button>
              </div>
            </div>
          </div>

          {/* Physics Olympiad & STEM */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔬 Physics Olympiad &amp; STEM Directorate</div>
              <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Lead: Dr. Evans</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
              {stemTracks.map((t, i) => (
                <div key={i} style={{ padding: 12, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{t.track}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#16a34a' }}>{t.students}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{t.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f0fdf4', borderRadius: 8, padding: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Problem Set Mastery Index</span>
                  <span style={{ fontWeight: 700, color: '#16a34a' }}>88%</span>
                </div>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Kinematics, Electrodynamics &amp; Wave Optics completed. 26 students on Dean's Honor Track</div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '88%' }} /></div>
              </div>
              <button className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>Log Lab Scores</button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Live Points Log */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Point Contributions</div>
              <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>Live audit ledger</span>
            </div>
            {pointsLog.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: i < pointsLog.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                <div className={`avatar ${p.color}`} style={{ width: 30, height: 30, fontSize: 11 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{p.desc}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{p.time}</div>
                </div>
                <span style={{ fontWeight: 800, color: '#16a34a', fontSize: 15, flexShrink: 0 }}>{p.pts}</span>
              </div>
            ))}
          </div>

          {/* Pastoral Care & Conduct Ledger */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏡 Pastoral Care &amp; Conduct Ledger</div>
              <span style={{ fontSize: 11, color: '#64748b' }}>Falcon Team</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Uniform inspections, assembly duties, and character commendations.</div>
            {pastoralItems.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < pastoralItems.length - 1 ? '1px solid #f8fafc' : 'none', fontSize: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                <div style={{ color: '#64748b', lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
            <button className="btn btn-primary btn-sm w-full mt-3"><Plus size={12} /> Add Pastoral Observation / Merit</button>
          </div>

          {/* Overall Attendance */}
          <div className="card" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
              <Activity size={16} style={{ color: '#16a34a' }} />
              <span style={{ fontSize: 13, color: '#15803d', fontWeight: 600 }}>Overall Saturday Attendance Ratio: 94.2%</span>
            </div>
            <button className="btn btn-outline btn-sm w-full">View Club Attendance Ledger →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
