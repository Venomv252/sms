import React, { useState } from 'react'
import { Download, MapPin, Phone, Clock, Shield } from 'lucide-react'

const stopTimeline = [
  { stop: 'Greenwood High Senior Campus', time: '03:23 PM', status: 'Departed', color: 'var(--primary)' },
  { stop: 'Sarjapur Transit Junction', time: '03:55 PM', status: 'Completed', color: 'var(--primary)' },
  { stop: 'HSR Layout Sector 2 (Gate)', time: '04:12 PM', status: 'Next Stop', color: 'var(--orange)', isNext: true },
  { stop: 'Oakwood Enclave Gate 1 (Aarav\'s Stop)', time: '04:45 PM', status: 'Pending', color: '#9ca3af' },
]

const rfidLog = [
  { date: 'Today (Mon, 18 Nov)', morning: '06:24 AM', morningDesc: 'Greenwood Gate 1', afternoon: '03:32 PM', afternoonDesc: 'Aarav Bus # 14', dropOff: '04:50 PM', dropOffDesc: 'Oakwood Enclave', verification: 'Verified' },
  { date: 'Fri, 15 Nov', morning: '07:04 AM', morningDesc: 'Greenwood Gate 1', afternoon: '03:40 PM', afternoonDesc: 'Aarav Bus # 14', dropOff: '04:44 PM', dropOffDesc: 'Parent Self-Pickup', verification: 'Complete' },
  { date: 'Thu, 14 Nov', morning: '07:15 AM', morningDesc: 'Greenwood Gate 1', afternoon: '04:04 PM', afternoonDesc: 'Late Bus #13', dropOff: '05:42 PM', dropOffDesc: 'Late Bus #13 PM', verification: 'Complete' },
  { date: 'Wed, 13 Nov', morning: '07:05 AM', morningDesc: 'Greenwood Gate 1', afternoon: '03:24 PM', afternoonDesc: 'Aarav Bus # 14', dropOff: '04:40 PM', dropOffDesc: 'Oakwood Enclave', verification: 'Complete' },
  { date: 'Tue, 12 Nov', morning: '06:59 AM', morningDesc: 'Greenwood Gate 1', afternoon: '03:23 PM', afternoonDesc: 'Aarav Bus # 14', dropOff: '04:42 PM', dropOffDesc: 'Oakwood Enclave', verification: 'Complete' },
]

const boardingOptions = [
  { label: 'Boarding School Bus #14 (Regular)', sub: 'Scheduled Drop 03:11 • Oakwood Enclave', active: true, icon: '🚌' },
  { label: 'Absent / Parent Self-Pickup', sub: 'Notified 01:30 PM', active: false, icon: '🚗' },
  { label: 'Late Activity Bus #L-02', sub: 'Depart: 05:30 PM (Report 03:45, +5 Students)', active: false, icon: '🚌' },
  { label: 'Full Leave / Medical Sick', sub: 'Notify from homeroom auto-marks today', active: false, icon: '🏥' },
]

export default function CommuteBus() {
  const [selectedBoarding, setSelectedBoarding] = useState(0)

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Operations & Fees</a>
        <span>›</span>
        <span>Bus & Commute Tracker</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <div className="flex items-center gap-10 mb-4">
            <h1 className="page-title">Child Commute & Live Fleet Dispatch</h1>
            <span className="tag tag-green">Bus #14 (Regular) • Active</span>
          </div>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-secondary btn-sm">Helpdesk · Est. 444</button>
          <button className="btn btn-primary btn-sm">Sync Fleet Monitor</button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-4 mb-20">
        {[
          { label: 'LIVE SPEED', value: '34 km/s', sub: 'Governor Safe', color: 'var(--primary)' },
          { label: 'ETA DROP-OFF', value: '04:12 PM', sub: 'Est. Arrival (16 min delay)', color: '#f97316' },
          { label: 'CURRENT SECTOR', value: 'Outer Ring Rd F...', sub: 'Next: Stop 34 58 Sec 32', color: '#3b82f6' },
          { label: "TODAY'S BOARDING", value: 'Bus #14 Regular', sub: 'Confirmed 04:08', color: 'var(--primary)' },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <div className="stat-label" style={{ color: s.color }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="two-col mb-20">
        {/* Boarding Preference */}
        <div className="card">
          <div className="card-header">
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>DRIVER CONSOLE SYNC</div>
              <div className="card-title">Afternoon Dispatch Preference</div>
              <div className="card-subtitle">Cut off warning: Changes submit restrictions at 02:30 PM. Only the active driver is alerted to departure & pick-up commitment.</div>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {boardingOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => setSelectedBoarding(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${selectedBoarding === i ? 'var(--primary)' : 'var(--border)'}`, background: selectedBoarding === i ? 'var(--primary-lighter)' : 'white', cursor: 'pointer', marginBottom: 8 }}
              >
                <span style={{ fontSize: 18 }}>{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--text-primary)' }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{opt.sub}</div>
                </div>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selectedBoarding === i ? 'var(--primary)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selectedBoarding === i && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--primary)' }}></div>}
                </div>
              </div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Update Boarding Status</button>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>Last save: Today, 03:35 AM by Rajesh Sharma (Father)</div>
          </div>
        </div>

        {/* Live Map + Stop Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Map Placeholder */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>SATELLITE TELEMETRICS</div>
                <div className="card-title">Live Bus #14 Tracker</div>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>GPS is good 5% (Pulling strong)</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              <div className="map-placeholder" style={{ height: 160 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>🗺</div>
                  <div style={{ fontSize: 12 }}>Live GPS Map</div>
                  <div style={{ fontSize: 11, marginTop: 2 }}>Bus #14 • Route to Oakwood Enclave</div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Current Milestone:</strong> Approaching Stop 34/58 Sector 32
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Distance Remaining: 4.8 km</div>
              </div>
            </div>
          </div>

          {/* Stop Timeline */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Stop-By-Stop Progress Timeline</div>
              <span className="tag tag-blue" style={{ fontSize: 10 }}>Afternoon Return Bus</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {stopTimeline.map((stop, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: stop.status === 'Departed' || stop.status === 'Completed' ? stop.color : stop.isNext ? stop.color : '#9ca3af20', border: `2px solid ${stop.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: stop.status === 'Departed' || stop.status === 'Completed' ? 'white' : stop.color, fontWeight: 700 }}>
                      {stop.status === 'Departed' || stop.status === 'Completed' ? '✓' : i + 1}
                    </div>
                    {i < stopTimeline.length - 1 && <div style={{ width: 2, height: 20, background: stop.status === 'Departed' || stop.status === 'Completed' ? stop.color : 'var(--border)', marginTop: 4 }}></div>}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: stop.isNext ? stop.color : 'var(--text-primary)' }}>{stop.stop}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Estimated Arrival: {stop.time}</div>
                    <span className={`tag ${stop.status === 'Departed' || stop.status === 'Completed' ? 'tag-green' : stop.isNext ? 'tag-orange' : 'tag-gray'}`} style={{ fontSize: 10, marginTop: 4, display: 'inline-block' }}>
                      {stop.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Route Crew */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>ASSIGNED FLEET</div>
            <div className="card-title">Route 14 Crew Manifest</div>
          </div>
          <span className="tag tag-gray" style={{ fontSize: 10 }}>3(2)+1+1</span>
        </div>
        <div className="card-body">
          <div className="grid grid-2" style={{ gap: 16, marginBottom: 16 }}>
            {[
              { role: 'PRIMARY DRIVER', name: 'Suresh', lastName: 'Patel', id: 'VGC-GC...', available: true },
              { role: 'ROUTE ESCORT', name: 'Sunita...', lastName: 'Avish', id: 'Verified AEO31', available: true },
            ].map((crew, i) => (
              <div key={i} style={{ background: 'var(--border-light)', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="avatar avatar-md" style={{ background: i === 0 ? 'var(--primary)' : '#3b82f6', fontSize: 13 }}>{crew.name.charAt(0)}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>{crew.role}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{crew.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{crew.lastName}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>ID: {crew.id}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-2" style={{ gap: 12 }}>
            {[
              { label: 'Designated Stop', value: 'Oakwood Enclave Gate 1' },
              { label: 'GPS Geo-Coordinates', value: '10.924°N, 77.7474° E' },
              { label: 'Daily Pickup / Drop', value: '07:12 AM / 04:12 PM' },
            ].map((info, i) => (
              <div key={i}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RFID Swipe Log */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>SAFETY COMPLIANCE</div>
            <div className="card-title">Past 7 Days RFID & Biometric Swipe Manifest</div>
          </div>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Download Attendance Report</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>DATE & DAY</th>
                <th>MORNING PICK UP TAP</th>
                <th>CAMPUS ARRIVAL TAP</th>
                <th>AFTERNOON DEPARTURE TAP</th>
                <th>DROP-OFF TAP</th>
                <th>VERIFICATION</th>
              </tr>
            </thead>
            <tbody>
              {rfidLog.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.date}</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{row.morning}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{row.morningDesc}</div>
                  </td>
                  <td style={{ fontSize: 12.5 }}>—</td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{row.afternoon}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{row.afternoonDesc}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{row.dropOff}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{row.dropOffDesc}</div>
                  </td>
                  <td>
                    <span className={`tag ${row.verification === 'Verified' ? 'tag-green' : 'tag-blue'}`} style={{ fontSize: 10 }}>
                      ● {row.verification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transport Desk Service */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>TRANSPORT DESK SERVICE</div>
            <div className="card-title">Special Commute Request or Temporary Stop Change</div>
            <div className="card-subtitle">Submit all ad hoc-based forms for one-time transfers to temporary guardian pick-ups, or emergency guardian passes.</div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-2" style={{ gap: 16, marginBottom: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Request Type</label>
              <select className="form-input">
                <option>Temporary Deboarding Stoppage Change</option>
                <option>Emergency Guardian Pickup</option>
                <option>Medical Leave Transport</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Effective Date(S)</label>
              <input type="date" className="form-input" defaultValue="2024-11-19" />
            </div>
          </div>
          <div className="grid grid-2" style={{ gap: 16, marginBottom: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Authorized Contact / Escort Name</label>
              <input className="form-input" placeholder="e.g. Neha Sharma (Aunt)" />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Authorized Contact Mobile</label>
              <input className="form-input" placeholder="+91 0000 000000" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Reason & Location Specifics</label>
            <textarea className="form-input" rows={3} placeholder="Provide the trip and meeting booking address; enter precise name/destination (unit) information." style={{ resize: 'vertical' }}></textarea>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Submit Request to Transport Desk</button>
          <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>● Approvals require Transport Coordinator digital sign-off, and typically SLA: 45 mins</div>
        </div>
      </div>
    </div>
  )
}
