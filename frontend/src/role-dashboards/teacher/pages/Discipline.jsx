import React, { useState } from 'react'
import { Plus, Award, AlertTriangle, Download, Search, Shield } from 'lucide-react'

const records = [
  { date: 'Feb 22, 2025\n10:45 AM', name: 'Aarav Sharma', roll: '108-91', type: 'Merit Token', pts: '+10 Merit Points', desc: 'Exemplary lab precision and safety rigor during electromagnetic induction...', ref: 'Dr. Sen', av: 'av-green' },
  { date: 'Feb 20, 2025\n08:15 AM', name: 'Kabir Mehta', roll: '108-16', type: 'Citation (Level 1)', pts: '-5 Merit Points', desc: 'Repeated uniform violation during morning assembly line. 1st formal warning.', ref: 'Cu...', av: 'av-orange' },
  { date: 'Feb 19, 2025\n03:30 PM', name: 'Devansh Kulkarni', roll: '108-31', type: 'Merit Token', pts: '+15 Merit Points', desc: 'Mentored peer group in Python recursion algorithms after school before team entry.', ref: 'Mr. B', av: 'av-blue' },
  { date: 'Feb 16, 2025\n07:56 AM', name: 'Vikramaditya Singh', roll: '108-22', type: 'Citation (Level 2)', pts: 'Detention –30 Pts', desc: 'Unexcused absence from zero-period practice preparation session. Recurrent...', ref: '', av: 'av-red', escalated: true },
]

const teams = [
  { name: 'School Team', pts: 640, sub: '+680 Merit Commendations · -40 Citations', status: 'LEADER', color: '#16a34a', mine: true },
  { name: 'Sports Team B', pts: 615, sub: '+690 Merit Commendations · -75 Citations', color: '#dc2626' },
  { name: 'Sports Team C', pts: 590, sub: '+630 Merit Commendations · -40 Citations', color: '#3b82f6' },
  { name: 'Topaz Titans', pts: 580, sub: '+610 Merit Commendations · -30 Citations', color: '#f59e0b' },
]

export default function Discipline() {
  const [activeTab, setActiveTab] = useState('All Records (58)')
  const [mode, setMode] = useState('merit')

  return (
    <div>
      <div className="breadcrumb">
        <span>Evaluation &amp; Records</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Discipline Ledger</span>
        <span className="badge badge-green" style={{ marginLeft: 6 }}>Campus Pastoral Governance · Active AY 2024-25</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="page-title">Discipline Ledger, Merit Tokens &amp; Conduct Tracking</h1>
          <div style={{ fontSize: 13, color: '#64748b' }}>Record student commendations, issue Team Merit points, document behavioral infractions, and enforce Greenwood High conduct charters for Grade 10-B.</div>
        </div>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><AlertTriangle size={13} /> + Log Conduct Citation</button>
          <button className="btn btn-primary btn-sm"><Award size={13} /> + Award Team Merit Token</button>
          <button className="btn btn-outline btn-sm"><Download size={13} /> Dean's Pastoral Report</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Total Merit Tokens</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>482</div>
          <div style={{ fontSize: 11 }}>Merit Points</div>
          <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>↑ +28% this wk</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Minor Infractions</div>
          <div className="stat-value" style={{ color: '#f59e0b' }}>5</div>
          <div style={{ fontSize: 11 }}>Logged Cases</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>3 Uniform · 2 Late Tardy Slips · All Remediated</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Escalated Pastoral Cases</div>
          <div className="stat-value" style={{ color: '#dc2626' }}>1</div>
          <div style={{ fontSize: 11 }}>Case Under Review</div>
          <div style={{ fontSize: 11, color: '#dc2626' }}>Dean Review → Vikramaditya</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Punctuality &amp; Honor Index</div>
          <div className="stat-value" style={{ color: '#16a34a' }}>96.4%</div>
          <div style={{ fontSize: 11 }}>Good Standing</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Grade 10-B Cohort (34 Pupils) · Rank #1 in Sept</div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Quick Record Entry */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">⚡ Quick Action Registry – Record Pastoral Entry</div>
              </div>
              <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Auto-synced with Registrar</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <button className={`btn btn-sm ${mode === 'merit' ? 'btn-primary' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setMode('merit')}>
                <Award size={13} /> Merit Token (+Merit Points)
              </button>
              <button className={`btn btn-sm ${mode === 'citation' ? 'btn-outline' : 'btn-outline'}`} style={{ flex: 1 }} onClick={() => setMode('citation')}>
                <AlertTriangle size={13} /> Conduct Citation (Pastoral)
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="form-label">Student Name &amp; Section</div>
                <input className="form-input" defaultValue="Aarav Sharma (10B-01) • Emerald" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <div className="form-label">Incident / Commendation Date</div>
                <input type="date" className="form-input" defaultValue="2025-02-23" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Commendation Category</div>
              <input className="form-input" defaultValue="Scholastic Excellence & Academic Diligence" />
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
              {['+5 Pts (Commendation)', '+10 Pts (Merit Token)', '+15 Pts (Distinction)', '+25 Pts (Dean Special)'].map((p, i) => (
                <button key={i} className={`btn btn-sm ${i === 1 ? 'btn-primary' : 'btn-outline'}`}>{p}</button>
              ))}
            </div>

            <div className="form-group">
              <div className="form-label">Behavioral Category / Notes</div>
              <textarea className="form-textarea" placeholder="Detail the context of the achievement or behavioral breach observed..." />
            </div>

            <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
              {['Notify Guardian via ERP SMS & Portal', 'Dr. Evans digital signature applied'].map((opt, i) => (
                <label key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: '#16a34a' }} />
                  {opt}
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm">Reset</button>
              <button className="btn btn-primary btn-sm"><Award size={13} /> Award Team Merit</button>
            </div>
          </div>

          {/* Audit Log */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📋 Audit Log &amp; Record History – Conduct &amp; Merit Roster — Grade 10-B</div>
              <div className="flex gap-2">
                <div className="search-bar" style={{ width: 180 }}>
                  <Search size={13} style={{ color: '#94a3b8' }} />
                  <input placeholder="Search student enroll #..." />
                </div>
                <select className="form-select" style={{ fontSize: 12, width: 'auto' }}>
                  <option>Feb 2025</option>
                </select>
              </div>
            </div>

            <div className="chip-group" style={{ marginBottom: 12 }}>
              {['All Records (58)', 'Merit Commendations (46)', 'Minor Citations (10)', 'Dean Escalations (2)'].map(t => (
                <button key={t} className={`chip${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>INCIDENT DATE</th>
                    <th>STUDENT &amp; ROLL #</th>
                    <th>TYPE</th>
                    <th>POINTS / IMPACT</th>
                    <th>DESCRIPTION &amp; CONTEXT</th>
                    <th>REF</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i} style={{ background: r.escalated ? '#fff5f5' : 'white' }}>
                      <td style={{ fontSize: 11, color: '#64748b', whiteSpace: 'pre-line' }}>{r.date}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <div className={`avatar ${r.av}`} style={{ width: 28, height: 28, fontSize: 10 }}>
                            {r.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 12 }}>{r.name}</div>
                            <div style={{ fontSize: 10, color: '#94a3b8' }}>{r.roll} · {r.team}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${r.type.includes('Merit') ? 'badge-green' : r.type.includes('Level 2') ? 'badge-red' : 'badge-yellow'}`}>
                          {r.type.includes('Merit') ? '🏅' : '⚠️'} {r.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: r.pts.startsWith('+') ? '#16a34a' : '#dc2626', fontSize: 13 }}>{r.pts}</td>
                      <td style={{ fontSize: 12, color: '#64748b', maxWidth: 220 }}>{r.desc}</td>
                      <td style={{ fontSize: 12, color: '#64748b' }}>{r.ref}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination" style={{ marginTop: 10, justifyContent: 'flex-end' }}>
              <button>←</button>
              <button className="active">1</button>
              <button>2</button>
              <button>5</button>
              <button>→</button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Annual Team Cup */}
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">🏆 Annual Team Cup</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Inter-Team Conduct League</div>
              </div>
              <span className="badge badge-blue">Term II Standings</span>
            </div>
            {teams.map((h, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 4, background: h.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 800, fontSize: 12, flexShrink: 0
                    }}>{i + 1}</div>
                    <div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{h.name}</span>
                        {h.status && <span className="badge badge-green" style={{ fontSize: 10 }}>{h.status}</span>}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{h.sub}</div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: 16 }}>{h.pts} pts</span>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div className="progress-fill" style={{ width: `${(h.pts / 700) * 100}%`, height: 6, background: h.color }} />
                </div>
              </div>
            ))}
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: 10, marginTop: 4 }}>
              <div style={{ fontSize: 12, color: '#92400e', lineHeight: 1.5 }}>
                <strong>Charter Rule 4.2 Reminder:</strong> Three Level-1 citations within 30 days automatically trigger a Level-2 Dean Pastoral Conference with parents.
              </div>
            </div>
          </div>

          {/* Dean's Honor Roll */}
          <div className="card" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <Shield size={16} style={{ color: '#16a34a' }} />
              <div style={{ fontWeight: 700, fontSize: 14, color: '#15803d' }}>Dean's Honor Roll Verification</div>
            </div>
            <div style={{ fontSize: 13, color: '#166534', lineHeight: 1.5, marginBottom: 10 }}>Students with 30+ merit nets qualify for semester distinction.</div>
            <button className="btn btn-outline btn-sm w-full">View Policy</button>
          </div>
        </div>
      </div>
    </div>
  )
}
