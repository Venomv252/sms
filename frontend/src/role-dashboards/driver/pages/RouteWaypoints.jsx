import React, { useState } from 'react'
import {
  Navigation, Clock, Gauge, Users, Shield, Zap,
  CheckCircle, AlertTriangle, MapPin, Phone, Radio
} from 'lucide-react'
import './RouteWaypoints.css'

const topStats = [
  { label: 'Waypoint Progress', icon: Navigation, value: 'Stop 5/8', sub: 'ECC Road Cross', color: 'blue' },
  { label: 'Terminal ETA', icon: Clock, value: '08:14 AM', sub: '≈ +10 min delay (Traffic)', color: 'green' },
  { label: 'Distance Gauge', icon: Gauge, value: '28.4 km', sub: '16.8 km remaining • 41.5% Corridor cleared', color: 'orange' },
  { label: 'Manifest Check', icon: Users, value: '36/38', sub: 'Onboard Active • 2 Absent • Verified by Portal', color: 'purple' },
  { label: 'Speed Governor', icon: Zap, value: '32 km/h', sub: 'Gov. Limit: 40 km/h Max • Compliant (Zone Green)', color: 'green' },
]

const stops = [
  { id: 1, name: '01. Hope Farm Junction', sub: 'Opposite Metro Pillar 142', status: 'cleared', time: 'Cleared 07:16 AM', sched: 'Schd: 07:15 AM (+1m)', boarded: 8 },
  { id: 2, name: '02. ITPL Tech Park Main Gate', sub: 'Gate 2 Dedicated Bus Bay', status: 'cleared', time: 'Cleared 07:26 AM', sched: 'Schd: 07:25 AM (+1m)', boarded: 6 },
  { id: 3, name: '03. Prestige Ozone Phase 1', sub: 'Ozone Club House Arch', status: 'cleared', time: 'Cleared 07:37 AM', sched: 'Schd: 07:35 AM (+2m)', boarded: 9 },
  { id: 4, name: '04. Palm Meadows Hub', sub: 'Mulberry Lane Security Cabin', status: 'cleared', time: 'Cleared 07:47 AM', sched: 'Schd: 07:46 AM (+1m)', boarded: 7 },
  { id: 5, name: '05. ECC Road Cross', sub: 'Windmills Apt Corner, Outer Service Bay', status: 'active', time: 'NOW APPROACHING', sched: 'Schd: 07:54 AM | Expected 07:56 AM', boarded: 4, eta: 'ETA 2 mins (0.4 km away)' },
  { id: 6, name: '06. Borewell Road Junction', sub: 'Post Office Turn', status: 'upcoming', time: 'Upcoming', sched: 'Schd: 08:06 AM', boarded: 4 },
  { id: 7, name: '07. Varthur Kodi Circle', sub: 'Lake View Point', status: 'warning', time: 'Upcoming', sched: 'Schd: 08:16 AM', boarded: 2, warning: 'Trench Work Warning' },
  { id: 8, name: '08. Greenwood High Main Campus', sub: 'Sector 48 Campus Drop-off Gate 3', status: 'terminal', time: 'Final Terminal', sched: 'Schd: 08:14 AM | (Delivered by 08:24 AM)', boarded: 36, note: 'All 36 Debark' },
]

const activeStudents = [
  { name: 'Ananya Rao', grade: 'Grade 9-A', rfid: '#ST-412', status: 'Ready at Bay' },
  { name: 'Rohan Mehra', grade: 'Grade 9-A', rfid: '#ST-890', status: 'Ready at Bay' },
  { name: 'Kavya Nambiar', grade: 'Grade 4-C', rfid: '#ST-114', status: 'Ready at Bay' },
  { name: 'Tanya Sethi', grade: 'Grade 11-PCM', rfid: '#ST-093', status: 'Guardian with ward' },
]

export default function RouteWaypoints() {
  const [activeStop] = useState(5)

  return (
    <div className="route-page">
      {/* Top stats */}
      <div className="route-stats-grid">
        {topStats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={13} style={{ color: 'var(--green-primary)' }} />
              <span className="stat-label">{s.label}</span>
            </div>
            <div className="stat-value" style={{ fontSize: 18 }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main two col */}
      <div className="route-main-grid">
        {/* Left: Active waypoint + Stop list */}
        <div className="flex flex-col gap-3">
          {/* Active Waypoint */}
          <div className="card active-waypoint-card">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge badge-green" style={{ fontSize: 10 }}>● ACTIVE WAYPOINT • APPROACH ZONE</span>
                  <span className="badge badge-orange">ETA 2 Mins (0.4 km away)</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 4 }}>STOP #05 OF 08</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.1 }}>
                  ECC Road Cross
                </div>
                <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--gray-500)', fontSize: 12 }}>
                  <MapPin size={12} />
                  <span>Landmark: Windmills Apartment Corner, Outer Service Bay</span>
                </div>
              </div>
              <div className="manifest-target">
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>MANIFEST TARGET</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--gray-900)' }}>4 Students</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>All Parent Phones Synced</div>
              </div>
            </div>

            <div className="awaiting-students">
              {activeStudents.map((s, i) => (
                <div key={i} className="awaiting-student">
                  <div className="student-chip-avatar">{s.name.split(' ').map(n=>n[0]).join('')}</div>
                  <div>
                    <div className="font-semibold" style={{ fontSize: 11 }}>{s.name}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{s.grade} • {s.rfid}</div>
                    <div className="text-xs" style={{ color: 'var(--green-primary)' }}>● {s.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="btn btn-primary flex-1">
                <CheckCircle size={13} /> Mark Stop Arrived
              </button>
              <button className="btn btn-outline flex-1">
                <Radio size={13} /> Trigger 5-min Proximity SMS (4)
              </button>
            </div>
            <button className="btn btn-sm w-full mt-2" style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa' }}>
              <AlertTriangle size={12} /> Report Road Hazard
            </button>
          </div>

          {/* Stop Sequence */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Complete Corridor Stop Sequence</div>
                <div className="section-subtitle">Real-time schedule variance, student boarding tally, and stop clearance status</div>
              </div>
              <span className="badge badge-gray">8 Total Stops</span>
            </div>
            <div className="stop-list">
              {stops.map((stop) => (
                <div key={stop.id} className={`stop-item stop-${stop.status}`}>
                  <div className="stop-dot">
                    {stop.status === 'cleared' && <CheckCircle size={16} style={{ color: 'var(--green-primary)' }} />}
                    {stop.status === 'active' && <div className="active-dot"></div>}
                    {(stop.status === 'upcoming' || stop.status === 'terminal') && <div className="upcoming-dot"></div>}
                    {stop.status === 'warning' && <AlertTriangle size={16} style={{ color: '#f59e0b' }} />}
                  </div>
                  <div className="stop-info">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold" style={{ fontSize: 12 }}>{stop.name}</span>
                      {stop.warning && <span className="badge badge-orange" style={{ fontSize: 9 }}>{stop.warning}</span>}
                      {stop.status === 'active' && <span className="badge badge-green" style={{ fontSize: 9 }}>NOW APPROACHING</span>}
                      {stop.status === 'terminal' && <span className="badge badge-blue" style={{ fontSize: 9 }}>Final Terminal</span>}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{stop.sub} • {stop.sched}</div>
                  </div>
                  <div className="stop-count">
                    <span className="font-bold" style={{ fontSize: 13 }}>{stop.boarded}</span>
                    <span className="text-xs" style={{ color: 'var(--gray-500)' }}>
                      {stop.note || (stop.status === 'cleared' ? 'Boarded' : 'Waiting')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Re-route, GPS, map, vehicle load */}
        <div className="flex flex-col gap-3">
          {/* Dynamic Re-route */}
          <div className="card">
            <div className="flex items-center gap-2 mb-2">
              <span className="section-title">DYNAMIC RE-ROUTE</span>
              <span className="badge badge-green" style={{ fontSize: 9 }}>Recommended</span>
            </div>
            <div className="font-semibold" style={{ fontSize: 13 }}>Bypass Varthur Kodi Jam</div>
            <div className="text-xs" style={{ color: 'var(--gray-500)', margin: '4px 0 10px' }}>
              Divert via Kadugodi Peripheral Ring Road before Stop 7 to bypass BWSSB trench congestion.
            </div>
            <div className="reroute-stats">
              <div className="reroute-stat">
                <div className="font-semibold">+1.2 km</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Distance Delta</div>
              </div>
              <div className="reroute-stat">
                <div className="font-semibold">-8 mins</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Time Delta saved</div>
              </div>
              <div className="reroute-stat">
                <div className="font-semibold">Auto-Push</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Parent Reroute SMS</div>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-2">Apply Ring Road Detour</button>
          </div>

          {/* GPS Telemetry */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <span className="section-title">AIS-140 GPS TELEMETRY</span>
              <span className="badge badge-green" style={{ fontSize: 9 }}>LOCKED (4G VoLTE)</span>
            </div>
            <div className="gps-grid">
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Ping Latency / Rate</div><div className="font-semibold" style={{ fontSize: 12 }}>3.4 KB/s • 38ms</div></div>
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Packet Loss Rate</div><div className="font-semibold" style={{ color: 'var(--green-primary)', fontSize: 12 }}>0.00% (Lossless)</div></div>
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Satellite Fix Count</div><div className="font-semibold" style={{ fontSize: 12 }}>14 Sats (GNSS+NavIC)</div></div>
              <div><div className="text-xs" style={{ color: 'var(--gray-500)' }}>Geofence Boundary</div><div className="font-semibold" style={{ fontSize: 12 }}>In Whitefield Sub-Zone 4</div></div>
            </div>
          </div>

          {/* Map */}
          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <span className="section-title">Live Corridor Geofence</span>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Scale: 1:18,000</span>
            </div>
            <div className="map-placeholder" style={{ height: 200 }}>
              <div className="map-inner">
                <div className="map-bus-marker">🚌 KA-01-MJ-9941 (32 km/h)</div>
                <div className="map-label">Next Stop Proximity</div>
                <div className="map-label green">ECC Road: 420m remaining</div>
                <div className="map-label">Live AIS Ping: 2.1s ago</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="btn btn-outline btn-sm flex-1"><Phone size={12} /> Transit Dispatcher</button>
              <button className="btn btn-outline btn-sm flex-1">School Transport Desk</button>
            </div>
          </div>

          {/* Vehicle Load */}
          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <span className="section-title">Vehicle Load & Balance</span>
              <span className="badge badge-orange">85% Occupancy</span>
            </div>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 6 }}>
              Capacity: 36 seated / 42 seats &nbsp;&nbsp; 6 seats available
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '85%', background: '#f59e0b' }}></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
                ✓ Child Check System Armed
              </span>
              <span className="text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
                RFID Sensor Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
