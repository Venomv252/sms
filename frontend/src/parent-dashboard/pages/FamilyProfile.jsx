import React, { useState } from 'react'
import { Download, Eye, Shield, Phone, MapPin, AlertCircle, Plus, ChevronDown } from 'lucide-react'

const documents = [
  { name: 'Father Aadhaar Card', status: 'Verified', detail: 'XXXX-XXXX-4569 • UIDAI DigitLocker', verified: true, icon: '🪪' },
  { name: 'Mother Aadhaar Card', status: 'Verified', detail: 'XXXX-XXXX-8912 • UIDAI DigitLocker', verified: true, icon: '🪪' },
  { name: 'Proof of Residence', status: 'Verified Dec 2021', detail: 'BESCOM Electricity Utility Bill • Acct.#90428-BLR', verified: true, icon: '📄' },
  { name: 'Family Medical Health Insur...', status: 'Star Health Cover', detail: 'Policy #SR-882910 • Valid: Thru Oct 2025', verified: false, icon: '🏥' },
]

const escorts = [
  { name: 'Rajesh Sharma', role: 'Self / Primary', parentId: 'Parent ID: #GW-P-4401', approved: true },
  { name: 'Sunita Sharma', role: 'Primary', parentId: 'Parent ID: #GW-P-4402', approved: true },
  { name: 'Driver Ramesh', role: 'Verified Driver', badge: 'Badge #ESC-584 • Exp. May 2025', approved: true, driver: true },
]

const commPrefs = [
  { label: 'Critical SMS Alerts', desc: 'Gate In/Out, Bus breakdown alerts, Emergency advisories.', enabled: true },
  { label: 'WhatsApp Daily Broadcasts', desc: 'Daily homework digests, attendance confirmation, report cards', enabled: true },
  { label: 'Email Newsletters & Finance', desc: 'Instant / As Published • Weekly Consolidated', enabled: true },
]

export default function FamilyProfile() {
  const [switchStates, setSwitchStates] = useState([true, true, true])

  const toggleSwitch = (i) => {
    const next = [...switchStates]
    next[i] = !next[i]
    setSwitchStates(next)
  }

  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Overview</a>
        <span>›</span>
        <span>Family Profile & Records</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <div className="flex items-center gap-10 mb-4">
            <h1 className="page-title">Parent Profile & Family Management</h1>
            <span className="tag tag-green">KYC Verified AY 2024–25</span>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm">
          <Download size={14} /> Bonafide Certificate Pack
        </button>
      </div>
      <div className="flex justify-end mb-16">
        <button className="btn btn-primary btn-sm">Request Details Update</button>
      </div>

      {/* Student Switch */}
      <div className="card mb-20" style={{ background: 'var(--primary-lighter)', border: '1.5px solid #bbf7d0' }}>
        <div className="card-body" style={{ padding: '14px 20px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>ENROLLED WARDS UNDER GUARDIANSHIP</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Switch Active Student Profile</div>
          <div className="flex items-center gap-12 flex-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--primary)', borderRadius: 10, padding: '10px 14px', color: 'white' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>AS</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Aarav... ● Active</div>
                <div style={{ fontSize: 11.5, opacity: 0.8 }}>Grade 10-B • Rol... ATTENDANCE 96.4%</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: 'var(--text-muted)' }}>AN</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Anany... Sibling</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Grade 6-A • A Roll #...</div>
              </div>
              <button className="btn btn-secondary btn-xs">Switch</button>
            </div>
          </div>
        </div>
      </div>

      <div className="two-col mb-20">
        {/* Primary Guardians */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>OFFICIAL LEGAL RECORDS</div>
          </div>
          <div className="section-title" style={{ marginBottom: 14 }}>
            <span>Primary Guardians & Residence</span>
            <span style={{ fontSize: 18 }}>👨‍👩‍👦</span>
          </div>

          <div className="grid grid-2 mb-16">
            {[
              { name: 'Rajesh Sha...', role: 'Father • Primary', jobTitle: 'Sr. Director, Soft...', phone: '+919845012345', email: 'rajesh.sharmagtechmat...', aadhaar: true, pan: true },
              { name: 'Sunita Sha...', role: 'Mother • Primary', jobTitle: 'Principal Urban A...', phone: '+919845067890', email: 'sunita.archstudio@gmail...', aadhaar: true, coa: true },
            ].map((g, i) => (
              <div key={i} className="card" style={{ border: '1.5px solid var(--border)' }}>
                <div className="card-body" style={{ padding: '14px' }}>
                  <div className="flex items-center gap-10 mb-10">
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: i === 0 ? 'var(--blue-light)' : 'var(--purple-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: i === 0 ? 'var(--blue)' : 'var(--purple)' }}>
                      {g.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{g.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{g.jobTitle}</div>
                    </div>
                    <span className="tag tag-blue" style={{ marginLeft: 'auto', fontSize: 10 }}>{g.role.split(' • ')[0]}<br />{g.role.split(' • ')[1]}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                    <Phone size={12} style={{ display: 'inline', marginRight: 6, color: 'var(--text-muted)' }} />{g.phone}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>✉ {g.email}</div>
                  <div className="flex gap-6 flex-wrap">
                    {g.aadhaar && <span className="tag tag-green" style={{ fontSize: 10 }}>Aadhaar Verified</span>}
                    {g.pan && <span className="tag tag-green" style={{ fontSize: 10 }}>PAN Verified</span>}
                    {g.coa && <span className="tag tag-green" style={{ fontSize: 10 }}>COA Reg. Valid</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-2 mb-16">
            <div className="card">
              <div className="card-body" style={{ padding: '14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>📍 PERMANENT RESIDENCE</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>#402 Palm Meadows, Phase-2</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 6 }}>Varthur Main Road, Whitefield, Bengaluru, Karnataka — 560066</div>
                <div className="flex gap-6">
                  <span className="tag tag-gray" style={{ fontSize: 10 }}>Dev-Zone Bus Route #481</span>
                  <span className="tag tag-green" style={{ fontSize: 10 }}>Verified Dec 2024</span>
                </div>
              </div>
            </div>
            <div className="card" style={{ background: 'var(--red-light)', border: '1.5px solid #fecaca' }}>
              <div className="card-body" style={{ padding: '14px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--red)', marginBottom: 6 }}>🚨 EMERGENCY CONTACT</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Col. K. R. Sharma</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginBottom: 6 }}>Grandfather (Retd. Army Off.)</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--red)' }}>+919448011223</div>
                <div style={{ marginTop: 8 }}>
                  <button className="btn btn-xs" style={{ background: 'var(--red)', color: 'white', fontSize: 11 }}><Phone size={11} /> Call</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Escort Authorization */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>CAMPUS GATE SECURITY</div>
                <div className="card-title">Escort Authorization</div>
                <div className="card-subtitle">Campus security requires biometric/badge verification against this list for student gate departure at 03:20 PM.</div>
              </div>
              <span style={{ fontSize: 18 }}>👥4</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {escorts.map((e, i) => (
                <div key={i} className="flex items-center gap-10" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <div className="avatar avatar-sm" style={{ background: i === 0 ? 'var(--primary)' : i === 1 ? '#8b5cf6' : '#f97316', fontSize: 12 }}>
                    {e.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{e.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.role}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{e.parentId || e.badge}</div>
                  </div>
                  {e.approved && <span className="tag tag-green" style={{ fontSize: 10 }}>✓</span>}
                </div>
              ))}
              <button className="btn btn-secondary btn-xs" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
                <Plus size={12} /> Add Authorized Escort / Van Driver
              </button>
            </div>
          </div>

          {/* Communication Preferences */}
          <div className="card">
            <div className="card-header">
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>DELIVERY CHANNELS</div>
                <div className="card-title">Communication Preferences</div>
              </div>
              <span style={{ fontSize: 16, cursor: 'pointer' }}>⚙</span>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {commPrefs.map((pref, i) => (
                <div key={i} className="flex items-start gap-12" style={{ padding: '10px 0', borderBottom: i < commPrefs.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="flex-1">
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{pref.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{pref.desc}</div>
                  </div>
                  <div className={`switch ${switchStates[i] ? 'on' : ''}`} onClick={() => toggleSwitch(i)}></div>
                </div>
              ))}
              <div style={{ padding: '10px 0' }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 4 }}>Correspondence Language</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>All portal notices & official circulars</div>
                <select className="form-input" style={{ maxWidth: 160 }}>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Documents */}
      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 2 }}>SCHOOL REGISTRAR VAULT</div>
            <div className="card-title">Official Identification & KYC Documents</div>
          </div>
          <span className="tag tag-blue" style={{ fontSize: 10 }}>4 Documents In Order</span>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {documents.map((doc, i) => (
            <div key={i} className="flex items-center gap-12" style={{ padding: '10px 12px', background: 'var(--border-light)', borderRadius: 10, border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 22 }}>{doc.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-8">
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{doc.name}</div>
                  <span className={`tag ${doc.verified ? 'tag-green' : 'tag-orange'}`} style={{ fontSize: 10 }}>
                    {doc.verified ? '✓ ' : ''}{doc.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{doc.detail}</div>
              </div>
              <div className="flex gap-8">
                <button className="btn btn-secondary btn-xs"><Eye size={12} /></button>
                <button className="btn btn-secondary btn-xs"><Download size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bonafide Download */}
      <div className="card mb-16" style={{ background: 'var(--primary-lighter)', border: '1.5px solid #bbf7d0' }}>
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <div className="flex items-center justify-between flex-wrap gap-12">
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 4 }}>Consolidated Bonafide & Verification PDF</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Includes institutional stamps, student enrollment affidavits & guardian credentials.</div>
            </div>
            <button className="btn btn-primary"><Download size={14} /> Download Official Pack (.ZIP)</button>
          </div>
        </div>
      </div>

      {/* Compliance Footer */}
      <div style={{ background: 'var(--border-light)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div className="flex items-start gap-10">
          <Shield size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <strong>Student Record Privacy & Data Protection Compliance:</strong> Under NEP and CBSE institutional guidelines, modifications to Guardian identity, legal surname, or residence require Registrar Desk audit within 24 business hours.
          </div>
        </div>
        <button className="btn btn-secondary btn-sm">Submit KYC Correction</button>
      </div>
    </div>
  )
}
