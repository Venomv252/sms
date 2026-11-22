import React, { useState } from "react";
import { Modal } from "../Layout.jsx";

const stopTimeline = [
  { num: 1, name: "Fleet Central Depot (Whitefield)", tag: "Route Start", scheduled: "06:40 AM", actual: "06:40 AM", boarded: null },
  { num: 2, name: "Magnolia Residence Gate 1", tag: "4 Boarded", scheduled: "06:55 AM", actual: "06:55 AM + 1min", boarded: 4 },
  { num: 3, name: "Oakwood Enclave Main Gate (Aarav's Stop)", tag: "Pickup Stop", scheduled: "07:12 AM", actual: "07:14 AM", boarded: null, yours: true },
  { num: 4, name: "Green Glen Crossroads", tag: "7 Boarded", scheduled: "07:20 AM", actual: "07:28 AM + 4min", boarded: 7 },
  { num: 5, name: "Greenwood High Campus Arrival (Gate 2)", tag: "Destination", scheduled: "07:45 AM", actual: "07:46 AM", boarded: null, destination: true },
];

const rfidLog = [
  { date: "Today\n26 Feb", morning: "07:14 AM (Oakwood Enclave)", school: "07:46 AM (Campus Gate)", tuition: "Scheduled\n02:00 PM", drop: "Est.\n02:20 PM", status: "LIVE", live: true },
  { date: "Wed\n25 Feb", morning: "07:17 AM (Oakwood Enclave)", school: "07:43 AM", tuition: "02:52 PM", drop: "03:00 PM", status: "Complete (Dual)", complete: true },
  { date: "Tue\n24 Feb", morning: "07:15 AM (Daymond Enclave)", school: "03:53 PM", tuition: "02:35 PM", drop: "03:00 PM", status: "Complete (Dual)", complete: true },
  { date: "Mon\n24 Feb", morning: "07:18 AM (Daymond Enclave)", school: "Absent", tuition: "02:35 PM", drop: "03:00 PM", status: "Complete (Dual)", complete: true },
  { date: "Fri\n21 Feb", morning: "07:30 AM", school: "07:42 AM", tuition: "03:52 PM", drop: "03:45 PM", status: "Complete (Dual)", complete: true },
  { date: "Thu\n20 Feb", morning: "07:22 AM", school: "07:40 AM", tuition: "02:22 PM", drop: "02:55 PM", status: "Private Commute Daily", private: true },
];

export default function Transport({ showToast }) {
  const [stopChangeModal, setStopChangeModal] = useState(false);
  const [delayModal, setDelayModal] = useState(false);
  const [dispatchModal, setDispatchModal] = useState(false);
  const [guardianName, setGuardianName] = useState("");
  const [guardianTime, setGuardianTime] = useState("");

  return (
    <div className="page-container">
      <div className="breadcrumb">Campus & Operations &nbsp;›&nbsp; Transport & Commute</div>
      <div className="page-header-row" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">School Bus & Daily Transport Tracking</h1>
          <p className="page-subtitle">Live GPS telemetry, pickup/stop schedule, driver contact and emergency broadcast.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="outline-btn btn" onClick={() => setStopChangeModal(true)}>📍 Request Stop Change</button>
          <button className="btn" style={{ background: "#fff0f0", color: "#d63333", border: "1px solid #ffd0d0", borderRadius: 20 }} onClick={() => setDelayModal(true)}>🚨 Report Bus Delay</button>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        <span className="badge-chip green" style={{ fontSize: 12 }}>● Route #4 • Operational & On Time</span>
        <span style={{ fontSize: 12, color: "#555" }}>🌅 Morning Pickup: 07:12 AM &nbsp;·&nbsp; 🌆 Evening Drop: 03:45 PM (today early drop: 02:25 PM)</span>
        <span className="badge-chip" style={{ fontSize: 11 }}>📡 Telematics Live: Last ping 47s ago</span>
      </div>

      {/* Info Cards */}
      <div className="transport-stats-grid">
        <div className="transport-stat">
          <div className="transport-stat-label">ASSIGNED BUS</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 22 }}>🚌</span>
            <div>
              <strong style={{ fontSize: 18 }}>Bus #14</strong>
              <div style={{ fontSize: 11, color: "#777" }}>(Deluxe)</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 6 }}>AA-01-EQ-9821 &nbsp;·&nbsp; 52 Seater + AC</div>
          <div style={{ fontSize: 11, color: "#087f5b" }}>Next →&nbsp; Departs 02:00 PM</div>
        </div>

        <div className="transport-stat">
          <div className="transport-stat-label">CURRENT POSITIONING</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 22 }}>📍</span>
            <div>
              <strong style={{ fontSize: 16 }}>Campus Bay #3</strong>
              <div style={{ fontSize: 11, color: "#777" }}>Parked</div>
            </div>
          </div>
        </div>

        <div className="transport-stat">
          <div className="transport-stat-label">DESIGNATED STOP</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 22 }}>🏘</span>
            <div>
              <strong style={{ fontSize: 15 }}>Oakwood Enclave</strong>
              <div style={{ fontSize: 11, color: "#777" }}>Stop #3 &nbsp;·&nbsp; Main Gate, Sector 4, Main → School 12 km</div>
            </div>
          </div>
        </div>

        <div className="transport-stat">
          <div className="transport-stat-label">CREW ON DUTY</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <div style={{ background: "var(--green)", color: "#fff", borderRadius: "50%", width: 36, height: 36, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>SK</div>
            <div>
              <strong style={{ fontSize: 13 }}>Suresh K. & Sunita</strong>
              <div style={{ fontSize: 11, color: "#087f5b" }}>Verified Driver & Escort</div>
              <div style={{ fontSize: 10, color: "#777" }}>Badge: 39B-401</div>
            </div>
          </div>
        </div>
      </div>

      <div className="transport-layout">
        {/* Left */}
        <div>
          {/* Live Telematics */}
          <div className="panel" style={{ marginBottom: 18 }}>
            <div className="panel-heading compact">
              <div>
                <h2>🗺 Live GPS Map & Route Telematics</h2>
                <p>Real-time coordinates synced from on-board OBD-16 quad-sim unit</p>
              </div>
              <span className="badge-chip green" style={{ fontSize: 11 }}>GPS Accurate to 1.8m</span>
            </div>
            {/* Map placeholder */}
            <div className="transport-map" onClick={() => showToast("Opening live map view...")}>
              <div className="transport-map-inner">
                <div style={{ fontSize: 32 }}>🗺</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>Live Bus Tracking</div>
                <div style={{ fontSize: 11, color: "#9de8cf", marginTop: 4 }}>Bus #14 — Campus Bay #3 (Parked)</div>
                <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 11 }}>
                  <span>⚡ Speed: 0 km/h (Stationary)</span>
                  <span>⛽ Fuel: 78%</span>
                  <span>📡 RFID Verifier: Online</span>
                </div>
              </div>
            </div>
            <div style={{ background: "#f0fff8", borderRadius: 8, padding: "8px 12px", marginTop: 10, fontSize: 12, color: "#087f5b" }}>
              ✓ All 38 registered students are accounted for on morning arrival route. &nbsp;·&nbsp; Automated alert SMS sent to parents at 07:47 AM.
            </div>
          </div>

          {/* Stop Timeline */}
          <div className="panel" style={{ marginBottom: 18 }}>
            <div className="panel-heading compact">
              <div>
                <h2>🚏 Commute Schedule & Stop Timeline</h2>
                <p>Real-time halt Non/Morning Inbound &amp; Special Foundations Day Afternoon Outbound</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span className="badge-chip green">Morning Bus (Completed)</span>
                <span className="badge-chip orange">Evening Bus (Upcoming)</span>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              {stopTimeline.map((stop, i) => (
                <div key={i} className={`stop-row${stop.yours ? " your-stop" : ""}${stop.destination ? " destination-stop" : ""}`}>
                  <div className={`stop-num ${stop.destination ? "dest" : stop.yours ? "yours" : ""}`}>{stop.num}</div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 13 }}>{stop.name}</strong>
                    {stop.yours && <span style={{ background: "#dff9ef", color: "#087f5b", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 5, marginLeft: 8 }}>Your Pickup Stop</span>}
                    {stop.destination && <span style={{ background: "#dde8ff", color: "#1971c2", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 5, marginLeft: 8 }}>Destination</span>}
                    <div style={{ fontSize: 11, color: "#777", marginTop: 3 }}>{stop.boarded ? `${stop.boarded} students boarded` : stop.tag}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 12 }}>
                    <div>Sched: <strong>{stop.scheduled}</strong></div>
                    <div style={{ color: stop.actual?.includes("+") ? "#e67700" : "#087f5b" }}>Actual: {stop.actual}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RFID Log */}
          <div className="panel">
            <div className="panel-heading compact">
              <div>
                <h2>📟 RFID Student Swipes & Commute Log</h2>
                <p>Recorded contactless biometric and smart ID card scans across all gates</p>
              </div>
              <button className="outline-btn btn" style={{ fontSize: 12 }} onClick={() => showToast("Exporting CSV...")}>⬇ Export CSV</button>
            </div>
            <div className="results-table-wrap" style={{ marginTop: 14 }}>
              <table className="report-table">
                <thead>
                  <tr><th>DATE</th><th>MORNING BOARDING</th><th>SCHOOL ARRIVAL</th><th>TUITION DEPT.</th><th>EVENING DROP-OFF</th><th>VERIFICATION</th></tr>
                </thead>
                <tbody>
                  {rfidLog.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 11, whiteSpace: "pre-line", fontWeight: 700 }}>{r.date}</td>
                      <td style={{ fontSize: 11 }}>{r.morning}</td>
                      <td style={{ fontSize: 11 }}>{r.school}</td>
                      <td style={{ fontSize: 11 }}>{r.tuition}</td>
                      <td style={{ fontSize: 11 }}>{r.drop}</td>
                      <td>
                        {r.live ? <span className="badge-chip green" style={{ fontSize: 10 }}>● LIVE</span>
                          : r.complete ? <span className="badge-chip" style={{ fontSize: 10, background: "#dde8ff", color: "#1971c2" }}>✓ Complete (Dual)</span>
                          : r.private ? <span className="badge-chip" style={{ fontSize: 10, background: "#fff4e0", color: "#e67700" }}>Private Commute</span>
                          : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Assigned Staff */}
          <div className="panel" style={{ marginBottom: 14 }}>
            <div className="panel-heading compact">
              <h3 style={{ fontSize: 13 }}>👤 Assigned Staff & Desk</h3>
              <span className="badge-chip green" style={{ fontSize: 10 }}>Verified Crew</span>
            </div>
            <div style={{ marginTop: 14 }}>
              {[
                { initials: "SK", name: "Suresh Kumar", role: "Bus Driver", detail: "10+ yrs at Greenwood. Badge 39B-401", btns: ["📞 Call Driver", "💬 Quick SMS"] },
                { initials: "SD", name: "Sunita Devi", role: "Bus Lady Attendant", detail: "", btns: ["📞"] },
                { initials: "TO", name: "Transport OfficialDesk", role: "Admin Wing • Ext. 404 / 405", detail: "", btns: [] },
              ].map(s => (
                <div key={s.name} style={{ marginBottom: 12, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <div style={{ background: "var(--green)", color: "#fff", borderRadius: "50%", width: 32, height: 32, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{s.initials}</div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: 13 }}>{s.name}</strong>
                      <p style={{ fontSize: 11, color: "#777" }}>{s.role}</p>
                    </div>
                  </div>
                  {s.detail && <p style={{ fontSize: 11, color: "#555" }}>{s.detail}</p>}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                    {s.btns.map(b => (
                      <button key={b} className="outline-btn btn" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => showToast(`${b} — connecting...`)}>{b}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Transport Advisory */}
          <div className="panel" style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, marginBottom: 12 }}>🚨 Active Transport Advisory</h3>
            {[
              { tag: "EARLY DEPARTURE SCHEDULE", color: "#d63333", date: "Feb 24 – Feb 26", text: "Founder's Day Final Rehearsal Timing: All buses will depart campus at 02:00 PM prompt." },
              { tag: "WEATHER & TRAFFIC", color: "#e67700", date: "", text: "Outer Ring Road/Flyover maintenance works may affect Route 14. Will be re-routed via 8 Banglore Trunk Road to ensure on-time student drop." },
            ].map((a, i) => (
              <div key={i} style={{ background: a.color + "11", borderLeft: `3px solid ${a.color}`, borderRadius: 8, padding: "10px 12px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: a.color }}>{a.tag}</span>
                  {a.date && <span style={{ fontSize: 10, color: "#777" }}>{a.date}</span>}
                </div>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{a.text}</p>
                {i === 1 && <div style={{ fontSize: 10, color: "#777", marginTop: 4 }}>Circular Ref: DRTW/Notif/2025/018</div>}
              </div>
            ))}
          </div>

          {/* Self-Commute / Stop Change */}
          <div className="panel">
            <h3 style={{ fontSize: 13, marginBottom: 8 }}>🔄 Self-Commute / Stop Change</h3>
            <p style={{ fontSize: 12, color: "#777", marginBottom: 12 }}>Submit a transport prior notice for today's evening journey.</p>
            <label className="field-label">Afternoon Commutation</label>
            <select className="modal-input" style={{ marginBottom: 12 }}>
              <option>Standard Bus/Route #14 – C</option>
              <option>Private Vehicle (Guardian Pickup)</option>
              <option>Self-Commute (Public Transport)</option>
            </select>
            <label className="field-label">Authorizing Guardian & Note</label>
            <input className="modal-input" style={{ marginBottom: 8 }} placeholder="e.g. Mother picking Aarav by 02:15 PM" value={guardianName} onChange={e => setGuardianName(e.target.value)} />
            <input className="modal-input" style={{ marginBottom: 12 }} placeholder="Authorizing guardian time e.g. 02:15 PM" value={guardianTime} onChange={e => setGuardianTime(e.target.value)} />
            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: "#555", marginBottom: 14, lineHeight: 1.5 }}>
              <input type="checkbox" style={{ marginTop: 2 }} />
              I confirm that I have the authorized parent/guardian permission and request this change to the standard bus/commute routine.
            </label>
            <button className="green-button btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => { showToast("✓ Dispatch authorization submitted!"); setGuardianName(""); setGuardianTime(""); }}>
              ▶ Submit Dispatch Authorization
            </button>
          </div>
        </div>
      </div>

      {/* Stop Change Modal */}
      {stopChangeModal && (
        <Modal title="Request Stop Change" onClose={() => setStopChangeModal(false)}>
          <p className="modal-desc">Submit a permanent or temporary change to your designated bus stop. Changes take effect from the next school day after approval.</p>
          <label className="field-label">Request Type</label>
          <select className="modal-input">
            <option>Permanent Stop Change</option>
            <option>Temporary (1–5 days)</option>
            <option>Add New Stop</option>
          </select>
          <label className="field-label">New Stop Address</label>
          <input className="modal-input" placeholder="Enter new pickup/drop-off address..." />
          <label className="field-label">Effective Date</label>
          <input type="date" className="modal-input" />
          <label className="field-label">Reason</label>
          <textarea className="modal-textarea" placeholder="Brief reason for the stop change..." />
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setStopChangeModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setStopChangeModal(false); showToast("✓ Stop change request submitted! Ref: SCR-2025-0284"); }}>Submit Request</button>
          </div>
        </Modal>
      )}

      {/* Delay Report Modal */}
      {delayModal && (
        <Modal title="Report Bus Delay / Issue" onClose={() => setDelayModal(false)}>
          <p className="modal-desc">Report a bus delay, no-show, or safety concern to the Transport Office immediately.</p>
          <label className="field-label">Issue Type</label>
          <select className="modal-input">
            <option>Bus delayed more than 15 minutes</option>
            <option>Bus did not arrive</option>
            <option>Driver not at stop</option>
            <option>Safety concern on bus</option>
            <option>Route deviation noticed</option>
            <option>Other</option>
          </select>
          <label className="field-label">Current Location</label>
          <input className="modal-input" placeholder="Where are you now?" />
          <label className="field-label">Additional Details</label>
          <textarea className="modal-textarea" placeholder="Describe what happened..." />
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setDelayModal(false)}>Cancel</button>
            <button className="modal-btn-primary" style={{ background: "#d63333" }} onClick={() => { setDelayModal(false); showToast("🚨 Delay report sent to Transport Office!"); }}>
              🚨 Send Urgent Report
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
