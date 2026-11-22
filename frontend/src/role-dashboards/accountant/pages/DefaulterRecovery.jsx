import React, { useState } from 'react';
import {
  ChevronRight, Download, FileText, Send, AlertTriangle,
  MessageSquare, Phone, ChevronLeft, Filter, Search, Eye
} from 'lucide-react';

const defaulters = [
  {
    name: 'Vikramaditya Singhania', id: 'Adm #GW-8112', class: 'Gr-12-A Science',
    guardian: 'Mr. V. K. Singhania / +91-96-402 IEE Lab', feeHeads: "Term'IV & IEE Lab",
    overdue: '₹76,000', days: 42,
    stage: 'Stage 3 (Withhold)', stageClass: 'pill-red',
    commLog: 'Notice Sent Feb 10; Parent requested bilateral PTM'
  },
  {
    name: 'Tanya Deshmukh', id: 'Adm #GW-3104', class: 'Gr-8B',
    guardian: 'Mr. Dinesh Mukh / +91-90281 Sinhala', feeHeads: "Term'IV Transport & Tuition",
    overdue: '₹42,500', days: 29,
    stage: 'Stage 2 (Registered)', stageClass: 'pill-yellow',
    commLog: '2 SMS Sent; 1 Call logged; Unresponsive on Feb 11'
  },
  {
    name: 'Kabo Chopra', id: 'Adm #OW-1721', class: 'Gr-10-C',
    guardian: 'Mrs. Shalini Chopra / +91-91470 15295', feeHeads: "Term'IV Tuition Fee",
    overdue: '₹38,000', days: 22,
    stage: 'Stage 2 (Formal Notice)', stageClass: 'pill-yellow',
    commLog: 'Parent confirmed Feb 26 payment'
  },
  {
    name: 'Aryan K. Patel', id: 'Adm #GW-822', class: 'Gr-9-B Commerce',
    guardian: 'Mr. N. Patel / +91(510) 68378', feeHeads: 'Annual Computer & Tuition',
    overdue: '₹34,200', days: 10,
    stage: 'Stage 1 (Soft Reminder)', stageClass: 'pill-blue',
    commLog: 'Formal notification read; automated reminder sent'
  },
  {
    name: 'Maenakshi Sundaram', id: 'Adm #GW-341', class: 'Gr-6-A',
    guardian: 'Dr. B. Sundaram / #331', feeHeads: "Term'IV Composite Fee",
    overdue: '₹28,000', days: 8,
    stage: 'Stage 1 (Soft Reminder)', stageClass: 'pill-blue',
    commLog: 'Automated SMS Received, next billing cycle'
  },
];

const hardshipCases = [
  {
    id: 'HF-2024-89',
    name: 'Rohan Gupta (Gr 9-C)',
    desc: 'Medical emergency declared by guardian. Requesting Equal monthly instalments for ₹32,000 balance without hourly penalty.',
    status: 'Approve 3-EMI',
    statusClass: 'btn-primary'
  },
  {
    id: 'HF-2024-91',
    name: 'Ananya Sengupta (Gr11-A)',
    desc: "Parent employment transition. Requesting payment for February March for ₹36,000 term fees.",
    status: 'Grant Extension',
    statusClass: 'btn-success'
  },
  {
    id: 'HF-2024-94',
    name: 'Dev & Diya Nair (Twins - Gr 4 & 7)',
    desc: 'Sibling Concession approval request for lab & semi-curricula fees amounting to ₹24,000 total.',
    status: 'Principal Review',
    statusClass: 'btn-outline'
  },
];

export default function DefaulterRecovery() {
  const [activeFilter, setActiveFilter] = useState('All Defaulters (114)');
  const filters = ['All Defaulters (114)', 'Grade 10 Batch – 19', 'Grade 12 (Board Batch – 22)', 'Arrears >₹10,000 (5)'];

  return (
    <div>
      <div className="sub-header">
        <span className="sub-header-item">Bursar Operations</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item active">Defaulter Recovery &amp; Aging</span>
        <ChevronRight size={12} color="var(--gray-400)" />
        <span className="sub-header-item">Statutory Arrears Pipeline (Q4)</span>
      </div>

      <div className="page-inner">
        {/* Header */}
        <div className="page-header-row" style={{ marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 700 }}>Fee Defaulter Aging &amp; Stage Escalation</h1>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>
              Institutional recovery pipeline, graded arrears management, parent communication triggers, and board-ticket withholding governance under CBSE statutory compliance.
            </div>
          </div>
          <div className="page-header-actions">
            <span className="badge badge-red">114 Accounts in Arrears</span>
            <button className="btn btn-outline btn-sm"><Download size={13} /> Export Master Dossier</button>
            <button className="btn btn-outline btn-sm"><FileText size={13} /> Legal Demand Notices</button>
            <button className="btn btn-outline btn-sm"><FileText size={13} /> Principal &amp; Board List</button>
            <button className="btn btn-primary btn-sm"><Send size={13} /> Batch WhatsApp (114)</button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 16 }}>
          {[
            { label: 'TOTAL ARREARS', value: '₹38,00,000', sub: '114 students (Gr 1 to G12)', change: '7.3% Overdue', color: 'alert' },
            { label: 'STAGE 1: 1–15 Safe Recovery', value: '₹18,40,000', sub: '68 Students in Initial Buffer', sub2: 'Automated SMS 95% Need • WhatsApp', color: '' },
            { label: 'STAGE 2: 16–30 Formal Notice', value: '₹12,80,000', sub: '32 Students in Escalation', sub2: 'Tele-Counsel:ng 24 Pending Calls', color: 'warn' },
            { label: 'STAGE 3: +30 Withhold Status', value: '₹6,80,000', sub: '14 High-Risk Defaulters', sub2: 'Board/Hold Tickets: Principal Review', color: 'alert' },
          ].map((s, i) => (
            <div key={i} className={`stat-card ${s.color}`}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
              {s.sub2 && <div style={{ fontSize: 10, color: 'var(--gray-500)', marginTop: 2 }}>{s.sub2}</div>}
            </div>
          ))}
        </div>

        {/* Funnel + Broadcast buttons */}
        <div className="card section">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={14} color="var(--danger)" />
              <h3>Institutional Defaulter Funnel &amp; Stage Governance</h3>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm"><Send size={12} /> Trigger Automated IVR Broadcast</button>
              <button className="btn btn-outline btn-sm">Apply ₹52/Day Surcharge</button>
              <button className="btn btn-outline btn-sm">Block Hall / Ticket Release</button>
              <button className="btn btn-success btn-sm">Recommend LMI / Waiver Plan</button>
            </div>
          </div>
          <div className="card-body">
            {/* Pipeline bar */}
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ width: '48%', background: '#3b82f6' }} title="Stage 1" />
              <div style={{ width: '33%', background: '#f59e0b' }} title="Stage 2" />
              <div style={{ width: '19%', background: '#ef4444' }} title="Stage 3" />
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
              <span>● Stage 1: 1–15 Days Overdue — ₹18,40,000 (48.4% of total arrears) • 68 Students</span>
              <span>● Stage 2: 16–30 Days Overdue — ₹12,80,000 (33.7% of 99% of total arrears) • 32 Students</span>
              <span style={{ color: 'var(--danger)' }}>● Stage 3: 30+ Days Critical — ₹6,80,000 (17.9% of 99% of total arrears) • 14 Students</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="scroll-tabs" style={{ marginBottom: 12 }}>
          {filters.map(f => (
            <button key={f} className={`scroll-tab ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
          <button className="scroll-tab">Bus Route Commuters (31)</button>
          <button className="scroll-tab">Hardship Requests (8)</button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div className="search-bar" style={{ flex: 1, maxWidth: 300 }}>
            <Search className="search-icon" size={14} />
            <input className="input" style={{ width: '100%' }} placeholder="Search student, Adm #, or guardian" />
          </div>
        </div>

        {/* Main Table */}
        <div className="card section">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={14} color="var(--danger)" />
              <h3>Defaulter Recovery Worklist &amp; Audit Roster</h3>
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>Showing 5 of 114 Records</div>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-500)', padding: '8px 16px' }}>
            Displaying priority accounts requiring intervention before Board examination hall ticket lockout
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>STUDENT / ADMISSION</th>
                  <th>CLASS &amp; SEC</th>
                  <th>GUARDIAN CONTACT</th>
                  <th>FEE HEAD(S)</th>
                  <th>OVERDUE</th>
                  <th>PAST DAYS</th>
                  <th>RECOVERY STAGE</th>
                  <th>COMMUNICATION LOG</th>
                </tr>
              </thead>
              <tbody>
                {defaulters.map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 12 }}>{d.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{d.id}</div>
                    </td>
                    <td style={{ fontSize: 12 }}>{d.class}</td>
                    <td style={{ fontSize: 11, color: 'var(--gray-600)' }}>{d.guardian}</td>
                    <td style={{ fontSize: 11 }}>{d.feeHeads}</td>
                    <td><div style={{ fontWeight: 700, color: 'var(--danger)', fontSize: 13 }}>{d.overdue}</div></td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: 13, color: d.days > 30 ? 'var(--danger)' : d.days > 15 ? 'var(--warning)' : 'var(--gray-700)' }}>
                        {d.days} Days
                      </div>
                    </td>
                    <td><span className={`pill ${d.stageClass}`}>{d.stage}</span></td>
                    <td style={{ fontSize: 10, color: 'var(--gray-600)', maxWidth: 160 }}>{d.commLog}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <span>Rows per page: 10 &nbsp; | &nbsp; 1–5 of 114 Defaulters</span>
            <div className="pagination-pages">
              <button className="page-btn"><ChevronLeft size={12} /></button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span style={{ fontSize: 11, color: 'var(--gray-400)', padding: '0 4px' }}>...</span>
              <button className="page-btn">12</button>
              <button className="page-btn"><ChevronRight size={12} /></button>
            </div>
          </div>
        </div>

        {/* Hardship + Statutory Audit */}
        <div className="grid-2" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3>Active Financial Hardship &amp; EMI Appeals</h3>
              </div>
              <span className="badge badge-yellow">3 Pending Bursar &amp; Principal Sanctions</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', padding: '6px 16px' }}>
              Discretionary waiving and submitted under Greenwood Student Fund Guidelines. Final sanction requires joint approval of Dr. Eswaran (Principal) &amp; C. Ramanathan (CFO).
            </div>
            <div>
              {hardshipCases.map((c, i) => (
                <div key={i} className="list-item" style={{ padding: '12px 16px' }}>
                  <div className="icon-wrap icon-wrap-yellow"><AlertTriangle size={14} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>Case #{c.id} • {c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 3 }}>{c.desc}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button className="btn btn-outline btn-xs"><Eye size={11} /> View Proof</button>
                    <button className={`btn ${c.statusClass} btn-xs`}>{c.status}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Statutory Audit Governance</h3>
              <span className="badge badge-green">All Communications</span>
            </div>
            <div className="card-body">
              {[
                { item: 'All audit communications and workflows are sent only by and in accordance with statutory guidelines under Indian priority-limited academic institution statute.', status: 'In Progress' },
                { item: 'Section W, Mukondai (Solutions) Instruction/regulation on regulatory 999', status: 'Verified' },
                { item: 'CBSE Examination Regulatory Authority (TRAI) OG team Institutional manual reminder templates.', status: 'Pending' },
              ].map((g, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 11, color: 'var(--gray-600)' }}>
                  <div style={{ marginBottom: 4 }}>{g.item}</div>
                  <span className={`pill ${g.status === 'Verified' ? 'pill-green' : g.status === 'Pending' ? 'pill-yellow' : 'pill-blue'}`}>{g.status}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 11 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Legal Ref:</span>
                  <span style={{ color: 'var(--gray-500)' }}>Ref: GW-LEGAL-2424</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span>Latest Desk:</span>
                  <span style={{ color: 'var(--gray-500)' }}>Ref: OW-LEGAL-2424</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
