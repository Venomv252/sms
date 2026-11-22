import React, { useState } from 'react';
import { Plus, Download, CheckCircle, XCircle, Shield, QrCode } from 'lucide-react';

const certificates = [
  { id: 'TC-BTC-2024-049', type: 'Transfer Certificate', student: 'Aarav Aryan Singhania', studentSub: 'SB-GH-2019-1082 • Adm #GH-2019-1082', guardian: 'Mother & Father Singhania', date: 'Oct 18, 2024', status: 'Active & Board Synced', badge: 'badge-green', actions: ['download'] },
  { id: 'BAF-2024-039', type: 'Bonafide Letter', student: 'Niya Meeranakata', studentSub: 'SB-GH-2020 • Adm #GH-2020-1823', guardian: 'Verification by Dr. Eleanor Vance', date: 'Oct-Oct-2024', status: 'Active & Board Synced', badge: 'badge-green', actions: ['download'] },
  { id: 'CND-2024-059', type: 'Conduct & Character', student: 'Keiko Sudhikart Das', studentSub: 'SB-GH-2018 • Adm #GH-2018-0442', guardian: 'National Science Olympiad Hero', date: 'Oct 20, 2024', status: 'Cert-Verified', badge: 'badge-blue', actions: ['download'] },
  { id: 'TRN-2024-019', type: 'Duplicate Marksheet', student: 'Tanvi Ananya Mukherkh', studentSub: 'SB-GH-2020-1001 • Adm #GH-2020-1101', guardian: 'Board Migration / Scholarship', date: 'Oct-Oct-2024 (2024)', status: 'Active & Board Synced', badge: 'badge-green', actions: ['download'] },
  { id: 'TC-2024-0318-4', type: 'Transfer Certificate', student: 'Zaid Arman Qureshi', studentSub: 'SB-GH-2019-1012 • Adm #GH-2019-1012', guardian: 'Inter-State Relocation (Mumbai)', date: 'Oct-Oct-2024', status: 'Out. Clearance Pending (GT)', badge: 'badge-yellow', actions: ['approve', 'reject'] },
];

const certStats = [
  { label: 'TC Issued (TC)', val: 42, sub: '95 Done', badge: 'badge-blue' },
  { label: 'Bonafide Certificates', val: 310, sub: '+10% MoM', badge: 'badge-green' },
  { label: 'Character Endorsements', val: 185, sub: '100% disciplinary record', badge: 'badge-green' },
  { label: 'Marksheets & Hall Tickets', val: 64, sub: '64 unfulfilled', badge: 'badge-yellow' },
];

const recentDocs = [
  { id: 'TC 2024- Oct 18 ONLY→Adm (2022/GH)', type: 'Transfer Cert', student: 'Aaron Aryan Singhania', adm: 'GW-2016-0942 • Grades: B1, Sec 11 B4', date: '18-Oct-2024', status: 'Issued & Board Synced', badge: 'badge-green' },
  { id: 'BON-2024-0018-3', type: 'Bonafide Letter', student: 'Niya Meeranaksha', adm: 'GW-2016-0942', date: '19-Oct-2024', status: 'Issued & Board Synced', badge: 'badge-green' },
  { id: 'CD-2024-0019', type: 'Conduct & Character', student: 'Keiko Sudhikart Das', adm: '', date: '20-Oct-2024', status: 'Cert-Verified', badge: 'badge-blue' },
  { id: 'TRN-2024-019', type: 'Duplicate', student: 'Tanvi Ananya Mukherkh', adm: '', date: '01-Oct-2024', status: 'Active & Board Synced', badge: 'badge-green' },
  { id: 'TC-2024-0318-4', type: 'Transfer Cert', student: 'Zaid Arman Qureshi', adm: '', date: 'Oct-Oct-2024', status: 'Notify Bursar', badge: 'badge-yellow', action: 'notifyBursar' },
];

export default function TCCertificates() {
  const [studentId, setStudentId] = useState('GW-2016-0942');

  return (
    <div>
      <div className="breadcrumb">
        <span>Principal & Registrar Clearance Desk</span>
        <span>›</span>
        <span>CBSE / UDISE Compliance Ledger</span>
        <span style={{ marginLeft: 'auto' }} className="badge badge-blue">Report ID Queue (34)</span>
        <button className="btn btn-primary btn-sm"><Plus size={10} /> Issue New Document</button>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        <span className="badge badge-green">SECURITY STANDARD 256-Bit SHA Sign</span>
        <span className="badge badge-blue">BOARD GO-PAYMENT Live Embassy Ping</span>
        <span className="badge badge-gray">DISPENSATORY TOKEN Dr. A. Sterling (Active)</span>
        <span className="badge badge-green">SLA TARGET +4h Turnaround</span>
      </div>

      <h1 className="page-title mb-2">Official Certification &<br />Transfer Registry</h1>
      <p className="page-desc mb-3">Authorized portal for cryptographically signed Transfer Certificates (TC), Bonafide Credentials, Conduct Testimonials, and Institutional Transcripts with tamper-student QR verification.</p>

      {/* KPI Strip */}
      <div className="grid-5 mb-4">
        {certStats.map(k => (
          <div key={k.label} className="stat-card">
            <div className="stat-card-label">{k.label}</div>
            <div className="stat-card-value">{k.val}</div>
            <span className={`badge ${k.badge} mt-1`}>{k.sub}</span>
          </div>
        ))}
        <div className="stat-card">
          <div className="stat-card-label">Mean Approval Time</div>
          <div className="stat-card-value text-green">24.5 hrs</div>
          <div className="stat-card-sub text-xs text-muted">4.2 hrs faster vs AY23 SLA</div>
        </div>
      </div>

      {/* Digital Certificate Studio */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">🏛 Digital Certificate Studio</span>
          <div className="flex gap-2">
            <span className="badge badge-gray">Registry Item all 2</span>
          </div>
        </div>
        <div className="card-body">
          <div className="flex gap-3 flex-wrap mb-3">
            {['Transfer Certificates (16)', 'Bonafide Certificate', 'Character Certificate', 'Provisional Transcript'].map(t => (
              <button key={t} className="btn btn-secondary btn-sm">{t}</button>
            ))}
            <button className="btn btn-primary btn-sm">Smart Student ID</button>
          </div>

          <div className="grid-2">
            {/* Lookup form */}
            <div>
              <div className="text-xs font-semibold mb-2">Lookup Scholar Admission #</div>
              <div className="flex gap-2 mb-3">
                <input className="input flex-1" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="GW-2016-0942" />
                <button className="btn btn-primary btn-sm">Auto-Populate Data</button>
              </div>

              <div className="grid-2 mb-3">
                {[
                  ['Scholar Full Name', 'Aarav Aryan Singhania'],
                  ["Mother's & Father's Name", 'Meera Singhania & Rajesh Singhania'],
                  ['Date of Birth & Nationality', '14-Oct-2007  Indian'],
                  ['Date of First Admission & Class', '04-Apr-2018 in Grade VI'],
                  ['Class Last Studied & Board Stream', 'Grade III – Science (PCMB) – Phase'],
                  ['Attendance Record Days Present / Profile', '247/228 Academic Days (93.8%)'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs text-muted">{k}</div>
                    <div className="font-semibold text-sm">{v}</div>
                  </div>
                ))}
              </div>

              <div className="text-xs font-semibold mb-2">Reason for Leaving Greenwood High</div>
              <div className="text-sm mb-3">Completed Senior Secondary Higher Studies, Relocation for higher studies</div>

              {/* Clearances */}
              <div className="card-body" style={{ background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">Departmental Clearance Sign-Off (MANDATORY)</span>
                  <span className="badge badge-green">All 6 Nodes Verified</span>
                </div>
                <div className="grid-3">
                  {[
                    { label: 'Library Clearance', status: 'badge-green', val: '✓ Books cleared' },
                    { label: 'Lab Apparatus Check', status: 'badge-green', val: '✓ Physics chem (Now Cleared)' },
                    { label: 'Locker & Sports Kit', status: 'badge-green', val: '✓ Allocated by System Desk' },
                    { label: 'Nurse Fee Accounts', status: 'badge-green', val: '✓ Fully cleared, No balance' },
                    { label: 'Transport Clearance', status: 'badge-green', val: '✓ No pending' },
                    { label: 'Bursar Finance Ledger', status: 'badge-green', val: '✓ Zero outstanding balance' },
                  ].map((c, i) => (
                    <div key={i} className="text-xs">
                      <span className={`badge ${c.status}`}>{c.label}</span>
                      <div className="text-muted mt-1">{c.val}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary flex-1" style={{ justifyContent: 'center' }}>
                  <CheckCircle size={13} /> Affix Signature & Seal
                </button>
                <button className="btn btn-secondary flex-1" style={{ justifyContent: 'center' }}>
                  Attach Authorized Digital Sign-Off
                </button>
              </div>
            </div>

            {/* Live Document Preview */}
            <div className="card" style={{ border: '2px solid var(--primary)' }}>
              <div className="card-header" style={{ background: '#f0fdf4' }}>
                <span className="card-title text-green">📋 Live Document Proof</span>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm">Print →</button>
                  <button className="btn btn-primary btn-sm">Export Signed PDF</button>
                </div>
              </div>
              <div className="card-body" style={{ fontSize: 11 }}>
                <div className="text-center mb-2" style={{ borderBottom: '2px solid #16a34a', paddingBottom: 8 }}>
                  <div className="font-bold">🌿 GREENWOOD HIGH</div>
                  <div className="text-xs text-muted">INSTITUTIONAL CREDENTIAL & BAY SCHOOL</div>
                  <div className="text-xs">Aff to CBSE…Sr Sec School No: #13093 • Greenwood Campus, Bangalore…</div>
                </div>
                <div className="text-center font-bold mb-2" style={{ textDecoration: 'underline' }}>TRANSFER CERTIFICATE</div>
                <div className="grid-2">
                  {[
                    ['TC Date:', 'Date: Oct – Oct 04'],
                    ['CBSE No./TC (ONLY)', 'ELB-0641'],
                    ['GW-2016-0942', ''],
                    ['1. Name of the Pupil', 'Aarav Aryan Singhania'],
                    ["2. Mother's & Father's Names", 'Meera Singhania & Rajesh Singhania'],
                    ['3. Nationality & Domicile', 'Indian Karn(Vasai)'],
                    ['4. Date of Birth: (D-mm-yyy)', '14 – Oct – 2007 (Four Not Two Thousand Seven)'],
                    ['5. Date of Entry in Grade', 'Grade VI – Science(PCM+B) – Phase'],
                    ['6. Class Attended', 'Grade XI – Science (PCM)'],
                    ['7. School Board Exam Result', 'Passed & A QUAL PASS (86.4%)'],
                    ['8. Attendance Records', 'Class 247/228 Academic Days (93.8%)'],
                    ['9. General Conduct & Character', 'EXEMPLARY'],
                    ['10. Reason for Leaving', 'Completed Higher Studies; Higher Education Higher Education'],
                  ].map(([k, v], idx) => (
                    <div key={idx} style={{ gridColumn: '1 / -1' }} className="flex justify-between mb-1">
                      <span className="text-muted">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-3" style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                  <div>
                    <div className="text-xs text-muted">Digital Seal #D</div>
                    <div className="font-bold">Dr. Arthur Sterling</div>
                    <div className="text-xs text-muted">Managing Director & Trustee Signatory Seal</div>
                  </div>
                  <div style={{ width: 48, height: 48, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 20 }}>▦</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Issuance History */}
      <div className="card mb-4">
        <div className="card-header">
          <span className="card-title">📋 Document Issuance History & Audit Ledger</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm">Filter by Self vs Scholar</button>
            <button className="btn btn-secondary btn-sm">All Document Types</button>
            <button className="btn btn-secondary btn-sm"><Download size={11} /> Report CSV Ledger</button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tracking Ref #</th>
                <th>Certificate Type</th>
                <th>Scholar Name & ID</th>
                <th>Issue Date</th>
                <th>Destination / Purpose</th>
                <th>Verification Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentDocs.map((doc, i) => (
                <tr key={i}>
                  <td className="font-semibold text-xs">{doc.id}</td>
                  <td><span className="badge badge-gray">{doc.type}</span></td>
                  <td>
                    <div className="font-semibold">{doc.student}</div>
                    {doc.adm && <div className="text-xs text-muted">{doc.adm}</div>}
                  </td>
                  <td className="text-xs text-muted">{doc.date}</td>
                  <td className="text-xs text-muted">—</td>
                  <td><span className={`badge ${doc.badge}`}>{doc.status}</span></td>
                  <td>
                    <div className="flex gap-1">
                      {doc.action === 'notifyBursar' ? (
                        <button className="btn btn-warning btn-sm">Notify Bursar</button>
                      ) : (
                        <>
                          <button className="btn btn-primary btn-sm"><Download size={10} /></button>
                          <button className="btn btn-secondary btn-sm">🔁</button>
                          <button className="btn btn-secondary btn-sm">👁</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart ID Queue */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🆔 Smart KYC/Barcode Student ID Queue</span>
          <div className="flex gap-2">
            <span className="badge badge-green">Grade Privacy B – Ready: 35 Booked</span>
            <button className="btn btn-primary btn-sm">Speed Full Batch to Printer (34)</button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid-3">
            {[
              { name: 'Aarav Singhania', grade: 'Class 10-B', adm: 'Adm #GH-2019-1082', dob: 'Bld: Brown • B+', year: 'SY 2022-9032' },
              { name: 'Saniya M. Sen', grade: 'Class 8-B, Blk 21', adm: 'Blood: O+', dob: 'Bld: Brown • Day B', year: 'SV-2023-4480' },
              { name: 'Devank Kothari', grade: 'Class 8-B, Blk 14', adm: 'Blood: A-', dob: 'Bld: Brown • Day B', year: 'SY-2023-618' },
            ].map((card, i) => (
              <div key={i} className="metric-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="avatar" style={{ background: '#16a34a', color: '#fff' }}>{card.name[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{card.name}</div>
                    <div className="text-xs text-muted">{card.grade}</div>
                  </div>
                </div>
                <div className="text-xs text-muted">{card.adm}</div>
                <div className="text-xs text-muted"></div>
                <div className="text-xs text-muted">{card.dob}</div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-muted">{card.year}</div>
                  <span className="badge badge-green">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
