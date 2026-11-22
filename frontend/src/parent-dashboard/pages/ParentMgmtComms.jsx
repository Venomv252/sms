import React from 'react'
import { Download, Calendar, Bell, MessageSquare } from 'lucide-react'

export default function ParentMgmtComms() {
  return (
    <div>
      <div className="breadcrumb mb-8">
        <a href="#">Communication & Feedback</a>
        <span>›</span>
        <span>Parent-Management Comms</span>
      </div>
      <div className="flex items-start justify-between flex-wrap gap-12 mb-24">
        <div>
          <h1 className="page-title">Parent-Management Comms</h1>
          <p className="page-subtitle">Direct communication channel between parents and school management for Aarav Sharma (Grade 10-B).</p>
        </div>
        <div className="flex gap-10">
          <button className="btn btn-primary btn-sm"><MessageSquare size={14} /> New Message</button>
        </div>
      </div>

      <div className="two-col">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { from: 'Principal Dr. Evans', subject: 'Board Exam Preparation Guidelines 2025', time: '2 hours ago', tag: 'Academic', preview: 'Dear Parents, as we approach the CBSE Board examination cycle...', urgent: false },
            { from: 'Bursar Office', subject: 'Term III Fee Payment Reminder', time: 'Yesterday', tag: 'Finance', preview: 'This is a reminder that Term III fees of ₹45,000 are due by March 15, 2025...', urgent: true },
            { from: 'Transport Coordinator', subject: 'Route 14 Schedule Update – Monsoon Season', time: '3 days ago', tag: 'Transport', preview: 'Due to ongoing monsoon conditions, Route 14 will operate on revised...', urgent: false },
          ].map((msg, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer', borderLeft: msg.urgent ? '4px solid var(--orange)' : '4px solid var(--border)' }}>
              <div className="card-body" style={{ padding: '16px' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-10">
                    <div className="avatar avatar-sm" style={{ background: i === 0 ? 'var(--primary)' : i === 1 ? 'var(--orange)' : '#3b82f6', fontSize: 11 }}>
                      {msg.from.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{msg.from}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{msg.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <span className="tag tag-gray" style={{ fontSize: 10 }}>{msg.tag}</span>
                    {msg.urgent && <span className="tag tag-orange" style={{ fontSize: 10 }}>⚠ Action Required</span>}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{msg.subject}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>{msg.preview}</div>
                <div className="flex gap-8 mt-10">
                  <button className="btn btn-primary btn-xs">Read Full Message</button>
                  <button className="btn btn-secondary btn-xs">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Communication</div>
            </div>
            <div className="card-body" style={{ padding: '14px 16px' }}>
              <div className="form-group">
                <label className="form-label">To</label>
                <select className="form-input">
                  <option>Principal's Office</option>
                  <option>Bursar & Accounts</option>
                  <option>Academic Dean</option>
                  <option>Transport Coordinator</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="Brief subject line..." />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={5} placeholder="Your message to the management..." style={{ resize: 'vertical' }}></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Upcoming Events</div></div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              {[
                { date: 'Mar 1', event: 'PTM – Term II Review', type: 'Meeting' },
                { date: 'Mar 5', event: 'Pre-Board Examinations Begin', type: 'Exam' },
                { date: 'Mar 20', event: 'CBSE Board Exams Start', type: 'Board Exam' },
                { date: 'Mar 28', event: 'Annual Sports Day', type: 'Event' },
              ].map((ev, i) => (
                <div key={i} className="flex items-center gap-12" style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none' }}>
                  <div style={{ width: 40, textAlign: 'center', background: 'var(--primary-lighter)', borderRadius: 8, padding: '4px', flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--primary)' }}>{ev.date.split(' ')[1]}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Mar</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{ev.event}</div>
                    <span className="tag tag-gray" style={{ fontSize: 10 }}>{ev.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
