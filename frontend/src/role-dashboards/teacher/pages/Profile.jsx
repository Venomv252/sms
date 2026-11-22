import React from 'react'
import { Download, CheckCircle, Edit3, FileText, Award, Mail, Phone, MapPin } from 'lucide-react'

const degrees = [
  { abbr: 'PhD', title: 'Doctor of Philosophy (Ph.D.) in Condensed Matter Physics', inst: 'Indian Institute of Science (IISc), Bangalore', year: '2010–2016', note: 'Doctoral Dissertation with Highest Honors', color: 'av-purple' },
  { abbr: 'MSc', title: 'Master of Science (M.Sc.) in Applied Physics', inst: 'University of Delhi', year: '2009–2011', note: 'Graduate with Distinction (Rank 1 Gold Medalist) · Conference 2011', color: 'av-blue' },
  { abbr: 'BEd', title: 'Bachelor of Education (B.Ed.) in Secondary Science Pedagogy', inst: 'Central Institute of Education (CIE)', year: '2011–2012', note: 'NCTE Accredited · Conferred 2012', color: 'av-green' },
  { abbr: 'CERT', title: 'CBSE Senior Secondary Master Assessor Certification', inst: 'Central Board of Secondary Education – Academic Wing', year: 'Issued 2020', note: 'Standardized Evaluation & Curriculum Blueprints Verification', color: 'av-orange' },
]

const govDocs = [
  { name: 'Doctoral_Thesis_AE_4F_2...', size: '4.3 MB', tag: 'AISHE Verified' },
  { name: 'BE_Degree_CIE_Delhi_Univ_12', size: '2.1 MB', tag: 'NCTE Notarized' },
  { name: 'CBSE_Educator_Licence_REG-88', size: '', tag: 'Valid 2019 • Central Board Portal Registered' },
  { name: 'National_Police_Clearance_Cert...', size: '', tag: 'Statutory Child Safety Background Check • Renewed Annually' },
]

const committees = [
  { title: 'Physics Olympiad & STEM Club', role: 'Lead Patron', color: '#16a34a', badge: 'badge-green', detail: 'Supervising 64 student researchers, inter-science coordination, and national olympiad liaison. Weekly Meets at 3:30' },
  { title: 'Examination & Moderation Board', role: 'Core Member', color: '#3b82f6', badge: 'badge-blue', detail: 'Institutional question paper setting, internal assessment integrity, and CBSE moderation compliance. Bi-monthly Board Sittings' },
  { title: 'School Team Team', role: 'Team Tutor', color: '#7c3aed', badge: 'badge-purple', detail: 'Pastoral guidance, inter-team championship coordination, and student pastoral mentorship for 140 awards. Pastoral Care & Athletics' },
  { title: 'First Aid & Disaster Safety Warden', role: 'Active Responder', color: '#dc2626', badge: 'badge-red', detail: 'Certified Cross emergency response and laboratory safety protocols for Science Wing Lab L2. Zone: Sci-Wing Lab L2' },
]

const cpd = [
  { title: 'Modern Pedagogical AI in Science Classrooms', hrs: '12 hrs', tag: 'CBSE Training Hub · 12 Credit Hours · Certified' },
  { title: 'Laboratory Safety Protocols & Waste Management', hrs: '8 hrs', tag: 'National Safety Council Framework · 8 Credit Hours' },
  { title: 'Inclusive Classroom Strategies for Diverse Learners', hrs: '10 hrs', tag: 'Special Education & Needs (SEN) Cell · +10 Credit Hours' },
  { title: '8 hrs remaining to fulfill AY 2024-25 cycle', hrs: '8 hrs', tag: '', browse: true },
]

export default function Profile() {
  return (
    <div>
      <div className="breadcrumb">
        <span>Overview</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Teacher Profile &amp; Credentials</span>
      </div>

      <div className="flex items-center justify-between mb-4" style={{ flexWrap: 'wrap', gap: 8 }}>
        <h1 className="page-title">Teacher Profile, Institutional Dossier &amp; Credentials</h1>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm"><Edit3 size={13} /> Update Digital Signature</button>
          <button className="btn btn-outline btn-sm">Submit Service Request</button>
          <button className="btn btn-primary btn-sm"><Download size={13} /> Download Dossier (PDF)</button>
        </div>
      </div>
      <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Faculty employment records, statutory CBSE specifications, professional development credits, and institutional governance responsibilities.</div>

      {/* Profile Header */}
      <div className="card mb-4">
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>
          EMP #EMP-2018-042 · <span className="badge badge-green" style={{ fontSize: 10 }}>Regular Tenure</span> <span className="badge badge-blue" style={{ fontSize: 10, marginLeft: 4 }}>Senior PGT</span>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {/* Profile photo & info */}
          <div style={{ display: 'flex', gap: 16, flex: 2, minWidth: 280, alignItems: 'flex-start' }}>
            <div style={{ width: 88, height: 88, borderRadius: 12, background: 'linear-gradient(135deg, #16a34a, #15803d)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 28, flexShrink: 0, position: 'relative' }}>
              AE
              <div style={{ position: 'absolute', bottom: -4, right: -4, width: 20, height: 20, background: '#16a34a', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={12} style={{ color: 'white' }} />
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 22 }}>Dr. Alistair Evans, Ph.D.</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginTop: 2 }}>Senior Post-Graduate Teacher (PG1) – Physics &amp; Homeroom Lead Grade 10-B</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>Department of Natural Sciences · Greenwood High Senior Campus</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-green"><CheckCircle size={10} /> CBSE Registered Educator</span>
                <span className="badge badge-blue"><CheckCircle size={10} /> Dept. Head of Science Club</span>
                <span className="badge badge-purple">🏆 Dean's Commendation 2024</span>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'INSTITUTIONAL EMAIL', val: 'a.evans@greenwood.edu', icon: <Mail size={12} /> },
              { label: 'CONTACT & INTERCOM', val: 'WR 4507 77135 · ext. 204', icon: <Phone size={12} /> },
              { label: 'OFFICE ASSIGNMENT', val: 'Senior Wing Rm 204 (Physics Staff Room)', icon: <MapPin size={12} /> },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, background: '#f0fdf4', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.05em' }}>{c.label}</div>
                  <div style={{ fontWeight: 600, color: '#374151', fontSize: 13 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-side-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Degrees */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🎓 Academic &amp; Pedagogical Degrees</div>
              <span className="badge badge-green">4 Validated · Academic Registry</span>
            </div>
            {degrees.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < degrees.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div className={`avatar ${d.color}`} style={{ width: 40, height: 40, fontSize: 12, borderRadius: 8, flexShrink: 0 }}>{d.abbr}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{d.inst}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{d.year}</span>
                    <span style={{ fontSize: 11, color: '#374151' }}>{d.note}</span>
                  </div>
                </div>
                <CheckCircle size={16} style={{ color: '#16a34a', flexShrink: 0, marginTop: 2 }} />
              </div>
            ))}
          </div>

          {/* Statutory Verification Vault */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🔒 Statutory Verification Vault</div>
              <button className="btn btn-outline btn-sm">Upload Addendum</button>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Encrypted repository of attested credentials and government compliances</div>
            {govDocs.map((doc, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: i < govDocs.length - 1 ? '1px solid #f8fafc' : 'none' }}>
                <div style={{ width: 36, height: 40, background: '#fee2e2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={18} style={{ color: '#dc2626' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{doc.name}</div>
                  {doc.size && <div style={{ fontSize: 11, color: '#94a3b8' }}>{doc.size}</div>}
                  <div style={{ fontSize: 11, color: '#64748b' }}>{doc.tag}</div>
                </div>
                <button className="btn btn-outline btn-sm">View</button>
                <button className="btn btn-primary btn-sm"><Download size={12} /> Download</button>
              </div>
            ))}
          </div>

          {/* Institutional Governance */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">🏛️ Institutional Governance &amp; Committee Assignments</div>
              <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>Term Active · 4 Mandatory</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
              {committees.map((c, i) => (
                <div key={i} style={{ padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, borderTop: `3px solid ${c.color}` }}>
                  <span className={`badge ${c.badge}`} style={{ marginBottom: 6, display: 'inline-block' }}>{c.role}</span>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{c.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 10, fontSize: 12, color: '#15803d' }}>
              <strong>Institutional Compliance Attestation (AY 2024-25):</strong> This position is digitally notarized and cross-checked with the National Academic Repository (NEX). Last updated: 18 Oct 2024 by Registrar Office.
              <div style={{ marginTop: 4, fontFamily: 'monospace', fontSize: 11 }}>Signature ID: #EC6B0-Y8B-6619 - AE</div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Academic Load */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Academic Load &amp; Cohorts</div>
              <span className="badge badge-blue">105 Students Total</span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>AY 2024-25 · Term II Roster</div>
            {[
              { grade: 'Grade 10-B (Homeroom)', sub: 'Physics & Science · Sub Code 086', students: 42 },
              { grade: 'Grade 12-A (Advanced Senior)', sub: 'Physics & Advanced Lab Practicals', students: 28 },
              { grade: 'Grade 11-A (Foundational)', sub: 'Theoretical Mechanics & Optics', students: 35 },
            ].map((c, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{c.grade}</span>
                  <span style={{ fontWeight: 700, color: '#16a34a', fontSize: 14 }}>{c.students}</span>
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{c.sub}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '10px 8px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #86efac' }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>26</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Weekly Contact Periods</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '10px 8px', background: '#f0fdf4', borderRadius: 6, border: '1px solid #86efac' }}>
                <div style={{ fontWeight: 800, fontSize: 20 }}>3</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Class Sections</div>
              </div>
            </div>
          </div>

          {/* CPD */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">📚 Continuous Professional Development</div>
              <span style={{ fontWeight: 700, fontSize: 13 }}>44 / 50 hrs</span>
            </div>
            <div className="progress-bar mb-2" style={{ height: 8, borderRadius: 4 }}>
              <div className="progress-fill" style={{ width: '88%', height: 8 }} />
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Mandatory NEP 2020 & CBSE Standard (50 hrs/yr) · 88%</div>
            {cpd.filter(c => !c.browse).map((c, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #f8fafc', fontSize: 12 }}>
                <div style={{ fontWeight: 600 }}>{c.title} <span style={{ color: '#16a34a' }}>{c.hrs}</span></div>
                <div style={{ color: '#94a3b8' }}>{c.tag}</div>
              </div>
            ))}
            <button className="btn btn-outline btn-sm w-full mt-3">Browse CBSE 2024-25 cycle →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
