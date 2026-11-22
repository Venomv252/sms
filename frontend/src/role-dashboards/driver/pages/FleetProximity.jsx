import React from 'react'
import { Radio, Users, Navigation, Phone, Mic, Send } from 'lucide-react'
import './FleetProximity.css'

const nearbyBuses = [
  {
    id: 'Bus #08', dist: '1.4 km', driverId: '#DRV-014',
    driver: 'Gurumurthy', stop: 'ECC Rd & Kadugodi Route',
    detail: 'Approx 3mins drive from your coordinate',
    occupancy: '38/40 Seats (2 Spare Available)',
    status: '30 km/h • Eastbound',
    loc: 'ECC Rd Jnc.',
    color: '#2d9560'
  },
  {
    id: 'Bus #12', dist: '3.1 km', driverId: '#DRV-022',
    driver: 'S. Anthony', stop: 'ITPL & Hoodi Link',
    detail: 'Moving via Graphite India Junction',
    occupancy: 'Occupancy 32/36 Seats (4 Spare Available)',
    status: '24 km/h • Slow',
    loc: 'Graphite India St...',
    color: '#1d4ed8'
  },
  {
    id: 'Bus #22', dist: '4.8 km', driverId: '#DRV-022',
    driver: 'M. Anthony', stop: 'Central Standby Spare',
    detail: 'Emergency Replacement / Ready at Depot',
    occupancy: 'Spare Seat Inventory: 0/42 Occupied (Full 42 Spare)',
    status: 'Stationary',
    loc: 'Kundanahalli...',
    color: '#9333ea',
    isStandby: true
  },
  {
    id: 'Bus #05', dist: '4.2 km', driverId: '#DRV-00..',
    driver: 'H. Siddar...', stop: 'Varthur & Marathahalli',
    detail: 'Approaching Varthur Lake Cross',
    occupancy: 'Occupancy 35/40 Seats (5 Spare Available)',
    status: '38 km/h • Normal',
    loc: 'Varthur Kodi R...',
    color: '#f59e0b'
  },
]

const logs = [
  { sender: 'Central Fleet Dispatch (Gurmeet Singh)', type: 'Broadcast Alert', time: '07:48 AM • Automated Audio Log #89', msg: '"Heavy traffic buildup at Varthur Kodi lake road. Bus #14 and #08 advised to take bypass if needed."', outgoing: false },
  { sender: 'Bus #08 (Gurumurthy K.) To Whitefield Channel', type: 'Verified Driver VHF', time: '07:35 AM', msg: '"All clear at Kadugodi cross. Running on time."', outgoing: false },
  { sender: 'Bus #14 (Ramesh Babu - You)', type: 'Outgoing Transmission', time: '07:20 AM • Outgoing Voice Log', msg: '"Slow moving traffic near Hope Farm due to pipeline trenching. 10m delay informed to dispatch."', outgoing: true },
]

export default function FleetProximity() {
  return (
    <div className="fleet-page">
      <div className="fleet-main-grid">
        {/* Left: Radar + Bus list + Log */}
        <div className="flex flex-col gap-3">
          {/* Radar card */}
          <div className="card">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="section-title">Dynamic Proximity Radar</span>
                  <span className="badge badge-blue" style={{ fontSize: 9 }}>● AIS-140 CERTIFIED NODE</span>
                </div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
                  Current Node: Bus #14 (Whitefield Sector) &nbsp;•&nbsp; Real-time vector radar centered on Bus #14 (Whitefield Sector)
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge badge-gray">Active Fleet: 20 Buses</span>
                <span className="badge badge-green">● 3km Range: 4 Buses Nearby</span>
                <span className="badge badge-gray">Radio: CH 04 (Whitefield)</span>
                <span className="badge badge-orange">Dispatch: 18ms (Gurmeet S.)</span>
              </div>
            </div>

            <div className="radar-container">
              <div className="radar-sweep-label">5 KM SWEEP</div>
              <div className="radar-canvas">
                <div className="radar-ring ring-1"></div>
                <div className="radar-ring ring-2"></div>
                <div className="radar-ring ring-3"></div>
                <div className="radar-center">YOU<br/>(14)<br/>• 0 km</div>
                <div className="radar-bus" style={{ top: '20%', left: '60%' }}>#12<br/>1.4 km</div>
                <div className="radar-bus standby" style={{ top: '55%', right: '10%' }}>#18<br/>3.1 km</div>
                <div className="radar-bus spare" style={{ bottom: '22%', left: '55%' }}>#22<br/>Spare Unit</div>
                <div className="radar-bus" style={{ top: '40%', right: '22%' }}>#05<br/>4.2 km</div>
                <div className="radar-label" style={{ top: '55%', right: '10%' }}>Spare Unit • Kundanahalli</div>
              </div>
              <div className="radar-legend">
                <span><span className="status-dot dot-green"></span> Regular Active Bus</span>
                <span><span className="status-dot" style={{ background: '#9333ea' }}></span> Reserve Standby Depot</span>
                <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Telemetry Refresh: Every 3s via NaviC/GPS</span>
              </div>
            </div>
          </div>

          {/* Nearby buses */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Nearby School Buses within Corridor</div>
                <div className="section-subtitle">Direct contact coordinates, live seating capacity & tactical sync actions</div>
              </div>
              <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Sorted by Radial Distance</span>
            </div>
            <div className="bus-cards-grid">
              {nearbyBuses.map((bus, i) => (
                <div key={i} className="bus-card">
                  <div className="bus-card-header">
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ fontSize: 14 }}>{bus.id}</span>
                      {bus.isStandby && <span className="badge badge-orange" style={{ fontSize: 9 }}>STANDBY</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation size={11} style={{ color: 'var(--gray-400)' }} />
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{bus.dist}</span>
                    </div>
                  </div>
                  <div className="font-semibold" style={{ fontSize: 12, color: 'var(--gray-700)' }}>{bus.stop}</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', margin: '3px 0' }}>{bus.detail}</div>
                  <div className="bus-driver-row">
                    <div className="bus-driver-avatar" style={{ background: bus.color }}>
                      {bus.driver.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div className="font-semibold" style={{ fontSize: 11 }}>{bus.driver}</div>
                      <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{bus.driverId}</div>
                    </div>
                    <Phone size={13} style={{ color: 'var(--gray-400)', marginLeft: 'auto', cursor: 'pointer' }} />
                  </div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)', margin: '4px 0' }}>
                    {bus.occupancy}
                  </div>
                  <div className="flex justify-between items-center text-xs" style={{ color: 'var(--gray-600)', marginBottom: 6 }}>
                    <span>🚌 {bus.status}</span>
                    <span>📍 {bus.loc}</span>
                  </div>
                  <div className="bus-actions">
                    <button className="btn btn-primary btn-sm">
                      <Radio size={11} /> Direct Radio Intercom
                    </button>
                    {bus.isStandby ? (
                      <button className="btn btn-outline btn-sm">Request Dispatch to Route</button>
                    ) : (
                      <button className="btn btn-outline btn-sm">
                        <Users size={11} /> {bus.id === 'Bus #12' ? 'Sync Transit Pace' : 'Request Transfer'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch log */}
          <div className="card">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="section-title">Whitefield Corridor Live Dispatch & Inter-Bus Log</div>
                <div className="section-subtitle">Real-time transcripts & voice telemetry notes recorded on Channel 4</div>
              </div>
              <span className="badge badge-green" style={{ fontSize: 9 }}>● Active Recording Enabled</span>
            </div>
            <div className="log-list">
              {logs.map((log, i) => (
                <div key={i} className={`log-entry ${log.outgoing ? 'log-outgoing' : ''}`}>
                  <div className="log-avatar">{log.sender.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold" style={{ fontSize: 11 }}>{log.sender}</span>
                      <span className={`badge ${log.outgoing ? 'badge-blue' : 'badge-gray'}`} style={{ fontSize: 9 }}>{log.type}</span>
                    </div>
                    <div style={{ fontSize: 12, margin: '3px 0', color: 'var(--gray-800)' }}>{log.msg}</div>
                    <div className="text-xs" style={{ color: 'var(--gray-500)' }}>{log.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="log-input-row">
              <input type="text" placeholder="Type text alert to broadcast on Channel 4..." />
              <button className="btn btn-primary btn-sm"><Send size={12} /> Broadcast</button>
            </div>
          </div>
        </div>

        {/* Right: Rapid Tactical Action Bay */}
        <div className="flex flex-col gap-3" style={{ maxWidth: 280 }}>
          <div className="card">
            <div className="flex items-center gap-2 mb-1">
              <span className="badge badge-orange" style={{ fontSize: 9 }}>INSTANT COORDINATION TOOLS</span>
            </div>
            <div className="section-title mb-3">Rapid Tactical Action Bay</div>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 12 }}>
              Direct telemetry-linked protocols to nearby drivers for passenger management or roadside contingencies.
            </div>

            <div className="tactical-actions">
              <div className="tactical-action">
                <div className="tactical-action-icon red">📡</div>
                <div>
                  <div className="font-semibold" style={{ fontSize: 12 }}>Broadcast Fleet Proximity Alert</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Triggers instant push buzzer on Bus #08, #12 & #05</div>
                </div>
                <button className="btn btn-outline btn-sm">→</button>
              </div>
              <div className="tactical-action">
                <div className="tactical-action-icon blue">🚌</div>
                <div>
                  <div className="font-semibold" style={{ fontSize: 12 }}>Initiate Convoy / Buddy Drive</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Locks paired speed & spacing with Bus #08 (ECC Route)</div>
                </div>
                <button className="btn btn-outline btn-sm">→</button>
              </div>
              <div className="tactical-action">
                <div className="tactical-action-icon green">👥</div>
                <div>
                  <div className="font-semibold" style={{ fontSize: 12 }}>Request Student Transfer / Backup</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>6 Total Spare Seats combined in Bus #08 & #12</div>
                </div>
                <button className="btn btn-primary btn-sm">→</button>
              </div>
            </div>

            <div className="ptt-button">
              <div>
                <div className="font-semibold" style={{ fontSize: 12 }}>Push-To-Talk Radio (CH 0.4)</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Encrypted internal radio frequency</div>
              </div>
              <button className="btn btn-primary btn-sm">
                <Mic size={12} /> HOLD TO SPEAK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
