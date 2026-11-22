import React, { useState } from "react";
import BackendDataPanel from "../components/BackendDataPanel.jsx";
import { Modal } from "../Layout.jsx";

const installments = [
  {
    term: "Term I (Apr – Jul 2024)", amount: "₹70,000", status: "Paid in Full",
    paid: "Paid on Apr 10, 2024", txn: "Txn: TXN-940319B", receipt: "REC-2024-0412", paid: true,
  },
  {
    term: "Term II (Aug – Nov 2024)", amount: "₹70,000", status: "Paid in Full",
    paid: "Paid on Aug 14, 2024", txn: "Txn: TXN-3418723", receipt: "REC-2024-8891", paid: true,
  },
  {
    term: "Term III (Dec 2024 – Mar 2025)", amount: "₹45,000", status: "Payable Now",
    paid: "Final Due Date: March 15, 2025", txn: "Invoice: INV-2025-6385", receipt: null, paid: false,
  },
];

const breakdown = [
  { label: "Tuition & Instruction", sub: "CBSE standard & advisory faculty", pct: "62%", amount: "₹28,000", color: "#087f5b" },
  { label: "STEM & Science Labs", sub: "Apparatus, Physics consumables", pct: "14%", amount: "₹6,500", color: "#1971c2" },
  { label: "AC Transport (Route #14)", sub: "Indiranagar → Greenwood Campus", pct: "11%", amount: "₹5,000", color: "#e67700" },
  { label: "Campus Wi-Fi & Software", sub: "LMS license, cloud, ms-campus", pct: "8%", amount: "₹3,500", color: "#7048e8" },
  { label: "Library, Digital Repository & Exam Blueprint Access", sub: "10/10 high-school access, mock board assessment bundles", pct: "6%", amount: "₹2,000", color: "#c2255c" },
];

const receipts = [
  { ref: "REC-2024-8891", date: "14 Aug 2024", desc: "Term II Fee (Full)", amount: "₹70,000", method: "HDFC NetBanking", txn: "TXN-3418723" },
  { ref: "REC-2024-0412", date: "10 Apr 2024", desc: "Term I (Full Fee)", amount: "₹70,000", method: "Razorpay UPI", txn: "TXN-944733" },
  { ref: "REC-2024-0199", date: "22 Mar 2024", desc: "Annual Re-enrollment & Locker", amount: "₹5,000", method: "SBI Corporate", txn: "TXN-871640" },
];

export default function FeeManagement({ showToast }) {
  const [payModal, setPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState("upi");
  const [queryModal, setQueryModal] = useState(false);

  return (
    <div className="page-container">
      <BackendDataPanel endpoint="/fees" title="Fee ledger from database" fields={[{ key: "receiptNumber", label: "Receipt" }, { key: "amount", label: "Amount" }, { key: "term", label: "Term" }, { key: "status", label: "Status" }, { key: "dueDate", label: "Due date" }, { key: "paymentMethod", label: "Method" }]} />
      <div className="breadcrumb">ADMINISTRATION & ACCOUNTS &nbsp;›&nbsp; STUDENT FEE LEDGER</div>
      <div className="page-header-row" style={{ flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="page-title">Fee Management &<br />Official Receipts</h1>
          <p className="page-subtitle">Overview of academic fee instalments, paid receipts, Transport & lab levies, and verified online payments for Academic Year 2024–26.</p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="green-button btn" onClick={() => setPayModal(true)}>💳 Pay Outstanding Term Dues</button>
          <button className="outline-btn btn" onClick={() => showToast("Downloading statement PDF...")}>⬇ Download Statement (FY 2024–25)</button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="fee-stats-grid">
        <div className="fee-stat">
          <div className="fee-stat-label">TOTAL ANNUAL FEE</div>
          <div className="fee-stat-value">₹1,85,000</div>
          <div style={{ fontSize: 11, color: "#087f5b", marginTop: 6 }}>FY 2024–25</div>
          <div style={{ fontSize: 11, color: "#777", marginTop: 3 }}>Approved by Academic Council</div>
        </div>
        <div className="fee-stat green">
          <div className="fee-stat-label" style={{ color: "#9de8cf" }}>TOTAL AMOUNT PAID</div>
          <div className="fee-stat-value">₹1,40,000</div>
          <div style={{ fontSize: 11, color: "#9de8cf", marginTop: 6 }}>● Term I & II fully cleared</div>
        </div>
        <div className="fee-stat orange">
          <div className="fee-stat-label">UPCOMING DUE</div>
          <div className="fee-stat-value">₹45,000</div>
          <div style={{ fontSize: 11, color: "#e67700", marginTop: 6 }}>Due Mar 15, 2025 &nbsp;·&nbsp; Term III Final</div>
        </div>
        <div className="fee-stat">
          <div className="fee-stat-label">STANDING & CONCESSIONS</div>
          <div className="fee-stat-value green-text" style={{ fontSize: 22 }}>Good Standing</div>
          <div style={{ marginTop: 8 }}>
            <span className="badge-chip green" style={{ fontSize: 11 }}>Zero Penalties</span>
          </div>
          <div style={{ fontSize: 11, color: "#777", marginTop: 6 }}>rebate applied</div>
        </div>
      </div>

      <div className="fee-layout">
        {/* Left */}
        <div>
          {/* Installment Schedule */}
          <div className="panel" style={{ marginBottom: 18 }}>
            <div className="panel-heading compact">
              <div>
                <h2>Term Installment Schedule & Ledger</h2>
                <p>Breakdown of mandatory academic term and current settlement status</p>
              </div>
              <span className="badge-chip" style={{ fontSize: 11 }}>3 Installments Configured</span>
            </div>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              {installments.map((inst, i) => (
                <div key={i} className={`fee-installment ${inst.paid ? "paid" : "due"}`}>
                  <div className="fee-inst-icon">{inst.paid ? "✅" : "📅"}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                      <strong style={{ fontSize: 14 }}>{inst.term}</strong>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <strong style={{ fontSize: 18 }}>{inst.amount}</strong>
                        <span className={`badge-chip ${inst.paid ? "green" : "orange"}`}>{inst.status}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>{inst.paid_text || inst.paid}</p>
                    <p style={{ fontSize: 12, color: "#777" }}>{inst.txn}</p>
                    {inst.receipt && (
                      <p style={{ fontSize: 12, color: "#777" }}>Receipt: {inst.receipt}</p>
                    )}
                    {!inst.receipt && (
                      <p style={{ fontSize: 12, color: "#d63333" }}>Zero Late Fine Active</p>
                    )}
                  </div>
                  <div>
                    {inst.paid ? (
                      <button className="outline-btn btn" style={{ fontSize: 12 }} onClick={() => showToast("Opening receipt...")}>📄 Receipt</button>
                    ) : (
                      <button className="green-button btn" style={{ fontSize: 12 }} onClick={() => setPayModal(true)}>💳 Pay Now</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Itemized Breakdown */}
          <div className="panel" style={{ marginBottom: 18 }}>
            <div className="panel-heading compact">
              <div>
                <h2>Itemized Component Breakdown (Term III)</h2>
                <p>Tuition, instructional facilities and extra-curricular levies for Grade-10-B.</p>
              </div>
              <strong style={{ color: "var(--green)", fontSize: 16 }}>Term Total: ₹45,000</strong>
            </div>
            {/* Donut viz */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16, marginBottom: 18 }}>
              {breakdown.map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, display: "inline-block", flexShrink: 0 }}></span>
                  <span style={{ color: "#555" }}>{b.pct}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {breakdown.map(b => (
                <div key={b.label} className="fee-breakdown-row">
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: b.color + "22", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", background: b.color, display: "block" }}></span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 13 }}>{b.label}</strong>
                    <p style={{ fontSize: 11, color: "#777", marginTop: 2 }}>{b.sub}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: 15, color: b.color }}>{b.amount}</strong>
                    <div style={{ fontSize: 11, color: "#aaa" }}>{b.pct}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receipts Table */}
          <div className="panel">
            <div className="panel-heading compact">
              <div>
                <h2>Official Receipts & Tax Invoices</h2>
                <p>Authenticated GSTIN tax invoices with institutional seal & bursar signatures.</p>
              </div>
              <span style={{ fontSize: 11, color: "#777" }}>CBSE AFFILIATION #310193</span>
            </div>
            <div className="results-table-wrap" style={{ marginTop: 16 }}>
              <table className="report-table">
                <thead>
                  <tr><th>RECEIPT #</th><th>DATE</th><th>DESCRIPTION</th><th>AMOUNT</th><th>METHOD</th><th>ACTION</th></tr>
                </thead>
                <tbody>
                  {receipts.map((r, i) => (
                    <tr key={i}>
                      <td><strong style={{ fontSize: 12, color: "var(--green)" }}>{r.ref}</strong><br /><span style={{ fontSize: 10, color: "#aaa" }}>{r.txn}</span></td>
                      <td style={{ fontSize: 12 }}>{r.date}</td>
                      <td style={{ fontSize: 12 }}>{r.desc}</td>
                      <td><strong>{r.amount}</strong></td>
                      <td>
                        <span className="badge-chip" style={{ fontSize: 10 }}>{r.method}</span>
                      </td>
                      <td>
                        <button className="outline-btn btn" style={{ fontSize: 11, padding: "5px 10px" }} onClick={() => showToast(`Downloading ${r.ref}...`)}>📄 PDF Rec.</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <p style={{ fontSize: 11, color: "#777" }}>Official seal valid under Section 80C IT Act for tuition rate claims.</p>
              <button className="link-btn" onClick={() => showToast("Opening archive 2022–24...")}>Archive Prior Years (2022–24)</button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* Online Payment Panel */}
          <div className="panel" style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{ fontSize: 14 }}>💳 Online Payment</h3>
              <span className="badge-chip green" style={{ fontSize: 10 }}>256-Bit SSL</span>
            </div>
            <div style={{ background: "#f8fff8", border: "1px solid #c8ecd8", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>PAYABLE INSTALLMENT</div>
              <strong style={{ fontSize: 14 }}>Term III Due</strong>
              <div style={{ fontSize: 12, color: "#777" }}>Due Date: 15 Mar 2025 · Term Balance</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--green)", marginTop: 6 }}>₹45,000</div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: "#555", marginBottom: 10 }}>SELECT PAYMENT METHOD</div>
            {[
              { id: "upi", icon: "📱", label: "Instant UPI", sub: "GPay, PhonePe, Paytm — No transaction surcharges. Real-time receipt." },
              { id: "netbanking", icon: "🏦", label: "Net Banking", sub: "All major Indian public & private banks." },
              { id: "card", icon: "💳", label: "Debit / Credit Card", sub: "Visa, Mastercard, RuPay & international." },
              { id: "virtual", icon: "🏫", label: "School Virtual Account (NEFT/RTGS)", sub: "Unique student challan generation." },
            ].map(m => (
              <div key={m.id}
                className={`pay-method-row ${payMethod === m.id ? "selected" : ""}`}
                onClick={() => setPayMethod(m.id)}
              >
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: 13 }}>{m.label}</strong>
                  <p style={{ fontSize: 11, color: "#777" }}>{m.sub}</p>
                </div>
                <div className={`pay-radio ${payMethod === m.id ? "active" : ""}`}></div>
              </div>
            ))}

            <div style={{ background: "#f8f8ff", borderRadius: 10, padding: 12, marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>Installment Base</span><strong>₹45,000</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>Convenience Fee</span><strong>₹0 (School Absorbed)</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span>Gateway Fee</span><strong>₹0</strong>
              </div>
              <div style={{ height: 1, background: "#eee", margin: "8px 0" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700 }}>
                <span>Payable Total</span><strong style={{ color: "var(--green)" }}>₹45,000</strong>
              </div>
            </div>
            <button className="green-button btn" style={{ width: "100%", justifyContent: "center", marginTop: 14, fontSize: 14 }} onClick={() => { setPayModal(true); }}>
              💳 Proceed to Pay ₹45,000
            </button>
            <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {["🔒 Razorpay Secure", "HDFC SmartHub", "PCI-DSS Level 1"].map(b => (
                <span key={b} style={{ fontSize: 10, color: "#aaa", background: "#f5f5f5", padding: "3px 8px", borderRadius: 8 }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Scholarship */}
          <div className="panel" style={{ marginBottom: 14 }}>
            <div className="panel-heading compact">
              <h3 style={{ fontSize: 13 }}>🏅 Scholarships & Waivers</h3>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: "#777" }}>Merit Scholarship Tier 1</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "var(--green)" }}>₹10,000<small style={{ fontSize: 13, fontWeight: 400 }}> /yr</small></div>
                </div>
                <span className="badge-chip green">Active</span>
              </div>
              <p style={{ fontSize: 12, color: "#555", marginTop: 8, lineHeight: 1.6 }}>Awarded to Aarav Sharma for Top 5% ranking in Grade 9 Board Foundation examinations. Automatically adjusted in Term I & Term fees.</p>
              <div style={{ marginTop: 10, fontSize: 12, color: "#777" }}>Sibling Concession: N/A (Single Child)</div>
            </div>
          </div>

          {/* Bursar */}
          <div className="panel">
            <h3 style={{ fontSize: 13, marginBottom: 12 }}>🏢 Bursar & Accounts Desk</h3>
            <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
              <div>📍 Office Location:</div>
              <div>Room 104, Ground Floor, Academic Admin Wing</div>
              <div style={{ marginTop: 8 }}>⏰ Visiting Hours:</div>
              <div>Mon – Fri: 08:30 AM – 03:30 PM (Sat: 09:00 AM – 12:30 PM)</div>
              <div style={{ marginTop: 8 }}>📧 Direct Email:</div>
              <a href="mailto:accounts@greenwood.edu" style={{ color: "var(--green)" }}>accounts@greenwood.edu</a>
              <div style={{ marginTop: 8 }}>📞 Extn: +91.22.3345.4789 (Ext. 204)</div>
            </div>
            <button className="outline-btn btn" style={{ marginTop: 14, width: "100%", justifyContent: "center" }} onClick={() => setQueryModal(true)}>
              🎫 Raise Fee Query / Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Pay Modal */}
      {payModal && (
        <Modal title="Complete Payment — Term III" onClose={() => setPayModal(false)}>
          <p className="modal-desc">You are paying <strong>₹45,000</strong> for Term III (Dec 2024 – Mar 2025) via <strong>{payMethod === "upi" ? "UPI" : payMethod === "netbanking" ? "Net Banking" : payMethod === "card" ? "Card" : "NEFT/RTGS"}</strong>.</p>
          {payMethod === "upi" && (
            <div>
              <label className="field-label">UPI ID</label>
              <input className="modal-input" placeholder="yourname@upi" />
            </div>
          )}
          {payMethod === "netbanking" && (
            <div>
              <label className="field-label">Select Bank</label>
              <select className="modal-input">
                {["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "Kotak Mahindra", "PNB"].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
          )}
          {payMethod === "card" && (
            <div>
              <label className="field-label">Card Number</label>
              <input className="modal-input" placeholder="XXXX XXXX XXXX XXXX" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <div><label className="field-label">Expiry</label><input className="modal-input" placeholder="MM/YY" /></div>
                <div><label className="field-label">CVV</label><input className="modal-input" placeholder="•••" type="password" /></div>
              </div>
            </div>
          )}
          {payMethod === "virtual" && (
            <div style={{ background: "#f0f8ff", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Virtual Account Details</div>
              <div style={{ fontSize: 12, color: "#555" }}>Account Name: Greenwood High School</div>
              <div style={{ fontSize: 12, color: "#555" }}>Account No: 402910083847234</div>
              <div style={{ fontSize: 12, color: "#555" }}>IFSC: HDFC0001234</div>
              <div style={{ fontSize: 12, color: "#555", marginTop: 6 }}>Reference: GHS-STU-24-024-T3</div>
            </div>
          )}
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setPayModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setPayModal(false); showToast("✓ Payment of ₹45,000 initiated successfully!"); }}>
              💳 Pay ₹45,000
            </button>
          </div>
        </Modal>
      )}

      {/* Query Modal */}
      {queryModal && (
        <Modal title="Raise Fee Query" onClose={() => setQueryModal(false)}>
          <p className="modal-desc">Submit a fee-related query to the Bursar's office. Response within 24 business hours.</p>
          <label className="field-label">Query Type</label>
          <select className="modal-input">
            <option>Receipt not received</option>
            <option>Payment not reflected</option>
            <option>Scholarship query</option>
            <option>Fee structure clarification</option>
            <option>Other</option>
          </select>
          <label className="field-label">Description</label>
          <textarea className="modal-textarea" placeholder="Describe your query in detail..." />
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => setQueryModal(false)}>Cancel</button>
            <button className="modal-btn-primary" onClick={() => { setQueryModal(false); showToast("✓ Fee query submitted! Reference ID: FQ-2025-0847"); }}>Submit Query</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
