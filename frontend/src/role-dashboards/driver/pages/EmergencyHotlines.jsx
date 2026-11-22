import React from 'react'
import { Phone, Radio, AlertCircle, Mic } from 'lucide-react'
import './EmergencyHotlines.css'

const categories = [
  {
    title: 'Campus Authorities', type: 'Direct',
    contacts: [
      { name: 'Central Transport Control Room, Gurnm...', badge: 'Online 24/7', phone: '+91 80 6969 494...', primary: true },
      { name: 'Principal Dr. Eleanor...', badge: 'Override', phone: '+91 80 6969 4901' },
      { name: 'Campus Fir... Ext 108', phone: '+91 80 6969 4969', badge: 'Patrol 1' },
      { name: 'Campus Se... Patrol 1, Chief Ward...', phone: '+91 80 6969 4956' },
    ]
  },
  {
    title: 'Law Enforcement', type: 'Police',
    contacts: [
      { name: 'City Police – ERSS Insp...', badge: 'Toll-Free', phone: 'DIAL 112', bigDial: true },
      { name: 'Whitefield Ex... Inspector K...', badge: 'Local', phone: '+91 80 2294-3100' },
      { name: 'Duty Inspec... Direct Welf...', badge: 'Mobile', phone: '+91 94680 80122' },
      { name: 'School Zon... Inspector Nalay...', badge: 'Corridor', phone: '+91 80 2294-2294' },
    ]
  },
  {
    title: 'Trauma & Medics', type: 'Urgent',
    contacts: [
      { name: 'Campus First Aid & Infirmary, Dr. Sarita Nu...', badge: '< 6 Min ETA', phone: '+91 98450 69691', primary: true },
      { name: 'Manipal H...', badge: 'Trauma 1', phone: '080-4966-2222' },
      { name: 'Pediatric A...', badge: 'Advisory', phone: '1800 425 1213' },
      { name: 'St. John\'s E...', badge: 'Backup', phone: '080-2206-8000' },
    ]
  },
  {
    title: 'Fire & Rescue', type: 'HAZMAT',
    contacts: [
      { name: 'Karnataka State E..., Station E..., Emergency', badge: 'Emergency', phone: 'DIAL 101', bigDial: true, emergency: true },
      { name: 'Station #... Hydrant, Industrial Ar...', phone: '080-2531-1101' },
      { name: 'SDRF Flood...', badge: 'Storm', phone: '1077' },
      { name: 'Heavy Transit T...', badge: 'Rig', phone: '+91990003 8190' },
    ]
  },
]

const protocols = [
  {
    id: 'A',
    title: 'Road Traffic Collision & Student Evacuation',
    steps: [
      'Ensure parking brake engagement and hazard fasteners on. Evacuate students strictly to safe pedestrian sidewalks through Herb-side rear lanes.',
      'Deploy hazard warning triangle 80m behind coach.',
      'Conduct head-count roll call via onboard tablets.',
      'Do not leave student muster group unattended.',
    ]
  },
  {
    id: 'B',
    title: 'Severe Anaphylaxis / Epipen Administration',
    steps: [
      'Identify student roster medic tag. Epipen is in yellow cabin compartment above Driver Seat. Call #RD Dr. Kulkarni simultaneously.',
      'Administer firmly against outer mid-thigh for 10 sec.',
      'Divert immediately to nearest Manipal Hospital trauma.',
    ]
  },
  {
    id: 'C',
    title: 'Vehicle Fire / Smoke in Engine Bay',
    steps: [
      'Immediately ignition key off+P and battery isolation switch pull.',
      'Release manual alternator. Click officer toggles left and back.',
      'Unlatch 2x ABC Dry Powder 4kg extinguishers.',
      'Direct passengers upwind away from diesel tank.',
      'Dial 101 Station #4 Whitefield hydrant division.',
    ]
  },
  {
    id: 'D',
    title: 'Severe Weather & Flash Flood Guidelines',
    steps: [
      'Do not enter water crossings exceeding wheel hub depth (30cm). High clearance coaches are prone to hydrostatic engine lockups.',
      'Halt on high ground; request SDRF clearance.',
      'Keep air conditioning in cabin recirculate mode.',
      'Maintain direct radio ping every 5 minutes.',
    ]
  },
]

export default function EmergencyHotlines() {
  return (
    <div className="hotlines-page">
      {/* Header */}
      <div className="card hotlines-header">
        <div className="flex items-start gap-3 flex-wrap">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="badge badge-red" style={{ fontSize: 9 }}>DEFCON 4 • STANDARD OPERATIONS ACTIVE</span>
              <span className="badge badge-blue" style={{ fontSize: 9 }}>🔒 ENCRYPTED DIRECT VOIP SYNCED</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>
              Inter-Agency Crisis Command &<br/>Emergency Directory
            </h1>
            <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 6 }}>
              📍 GPS: 12.9696°N, 77.7693°E (LOCK) &nbsp;|&nbsp;
              GreenWood High Institutional Safety Grid. Active unit: Bus #14 WhitefieldExpress.
              Primary Pilot: Ramesh Babu (#DRV-007). All emergency channels trigger instant fleet-wide telemetry broadcasts and priority telecom bridging.
            </div>
          </div>
          <button className="btn btn-danger sos-broadcast-btn">
            <AlertCircle size={16} />
            <div>
              <div>SOS BROADCAST SOS</div>
              <div style={{ fontSize: 9, fontWeight: 400 }}>HOLD 5 SEC → DISPATCH TEAMS</div>
              <div style={{ fontSize: 9, fontWeight: 400 }}>Pushes Live Mic & ERSS Coordinates</div>
            </div>
          </button>
        </div>
      </div>

      {/* Contact categories */}
      <div className="contact-categories-grid">
        {categories.map((cat, i) => (
          <div key={i} className="contact-category card">
            <div className="flex justify-between items-center mb-3">
              <span className="section-title">{cat.title}</span>
              <span className={`badge ${
                cat.type === 'Direct' ? 'badge-green' :
                cat.type === 'Police' ? 'badge-blue' :
                cat.type === 'Urgent' ? 'badge-red' :
                'badge-orange'
              }`} style={{ fontSize: 9 }}>{cat.type}</span>
            </div>
            <div className="contact-list">
              {cat.contacts.map((c, j) => (
                <div key={j} className={`contact-item ${c.primary ? 'contact-primary' : ''}`}>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="font-semibold" style={{ fontSize: 11 }}>{c.name}</span>
                      {c.badge && <span className={`badge ${
                        c.badge === 'Online 24/7' ? 'badge-green' :
                        c.badge === 'Toll-Free' || c.badge === 'Emergency' ? 'badge-red' :
                        c.badge === 'Local' || c.badge === 'Mobile' ? 'badge-blue' :
                        'badge-orange'
                      }`} style={{ fontSize: 9 }}>{c.badge}</span>}
                    </div>
                    {c.bigDial ? (
                      <div style={{ fontSize: 20, fontWeight: 900, color: c.emergency ? '#dc2626' : '#1d4ed8', marginTop: 2 }}>
                        {c.phone}
                      </div>
                    ) : (
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-900)', marginTop: 2 }}>{c.phone}</div>
                    )}
                  </div>
                  <div className="contact-actions">
                    {c.bigDial ? (
                      <button className={`btn btn-sm ${c.emergency ? 'btn-danger' : 'btn-blue'}`}>
                        <Phone size={10} /> Dial
                      </button>
                    ) : (
                      <Phone size={14} style={{ color: 'var(--green-primary)', cursor: 'pointer' }} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map + Communication */}
      <div className="hotlines-mid-grid">
        {/* Map */}
        <div className="card">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="section-title">Real-Time Dispatch Beacon</div>
              <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Whitefield Outer Ring Corridor (Sector 48)</div>
            </div>
          </div>
          <div className="map-placeholder" style={{ height: 220 }}>
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(135deg, #c8e8d4 0%, #b0d4bc 100%)',
              borderRadius: 8,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 6, padding: 12
            }}>
              <div style={{ background: 'var(--green-primary)', color: '#fff', padding: '4px 12px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                KA-01-MJ-9941 (Moving @ 38 km/h)
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray-700)', fontWeight: 600 }}>Current Location: Post-School Rd</div>
              <div style={{ fontSize: 10, color: 'var(--gray-600)' }}>Nearest Medi... School...al (1.6 km)</div>
              <div className="hotlines-live-stats">
                <div className="live-stat">
                  <div className="font-bold">38 km/h</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Bus Speed</div>
                </div>
                <div className="live-stat">
                  <div className="font-bold">42 Children</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Students Aboard</div>
                </div>
                <div className="live-stat">
                  <div className="font-bold">VoLTE - 5G High</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Cell Signal</div>
                </div>
                <div className="live-stat">
                  <div className="font-bold text-green">Inspected Valid</div>
                  <div className="text-xs" style={{ color: 'var(--gray-500)' }}>First Aid Kit</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-2 text-xs" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>
            🛡 ISO 39001 Road Traffic Safety Compliant
          </div>
        </div>

        {/* Communication */}
        <div className="card">
          <div className="section-title mb-3">Rapid Voice Broadcast</div>
          <div className="text-xs" style={{ color: 'var(--gray-500)', marginBottom: 12 }}>
            Driver Ramesh Babu, tap to initiate immediate live conference bridge with Fleet Manager (Gurmeet) and Traffic Duty Officer.
          </div>
          <div className="comm-options">
            <div className="comm-option">
              <div>
                <div className="font-semibold" style={{ fontSize: 12 }}>Direct Dispatch Push-to-Talk</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Encrypted internal radio frequency</div>
              </div>
              <button className="btn btn-outline btn-sm">›</button>
            </div>
            <div className="comm-option">
              <div>
                <div className="font-semibold" style={{ fontSize: 12 }}>Silent Duress Beacon</div>
                <div className="text-xs" style={{ color: 'var(--gray-500)' }}>Communication without siren</div>
              </div>
              <button className="btn btn-outline btn-sm">›</button>
            </div>
          </div>
        </div>
      </div>

      {/* SOPs */}
      <div className="card">
        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="section-title">Emergency Standard Operating Protocols</div>
            <div className="section-subtitle">CRISIS MANUAL • INSTANT FIELD GUIDANCE</div>
          </div>
          <span className="text-xs" style={{ color: 'var(--gray-500)' }}>Select protocol to display mandatory steps</span>
        </div>
        <div className="sop-grid">
          {protocols.map((p) => (
            <div key={p.id} className={`sop-card sop-${p.id.toLowerCase()}`}>
              <div className="sop-header">
                <span className="sop-badge">PROTOCOL {p.id}</span>
              </div>
              <div className="font-semibold mb-2" style={{ fontSize: 12 }}>{p.title}</div>
              <ul className="sop-steps">
                {p.steps.map((s, i) => (
                  <li key={i}>
                    <div className="sop-check">✓</div>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="sop-footer">
          <div className="text-xs" style={{ color: 'var(--gray-500)' }}>
            ✓ Pre-Trip Safety Verification Logged. All 8 emergency exits unlatched & First Aid box sealed. &nbsp;•&nbsp; Logged at 06:45 AM IST
          </div>
          <button className="btn btn-outline btn-sm">Re-Verify Equipment</button>
        </div>
      </div>
    </div>
  )
}
