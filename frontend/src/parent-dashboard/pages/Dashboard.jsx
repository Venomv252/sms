import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp, AlertTriangle, Clock, CheckCircle, FileText,
  Users, Star, Zap, ChevronRight, MapPin, Phone, BookOpen,
  Activity, Award, MessageSquare, Bell, Calendar, BarChart2
} from 'lucide-react'

const liveUpdates = [
  { time: 'Today, 10:45 AM', type: 'Attendance', text: 'Aarav marked Present in Morning Assembly & Roll Call', icon: CheckCircle, color: 'green' },
  { time: 'Today, 09:30 AM', type: 'Academic', text: 'Physics – Chapter 10: Optics & Lens Formula assigned by Dr. Alistair Evans', icon: BookOpen, color: 'blue' },
  { time: 'Yesterday', type: 'Performance', text: 'Mathematics Unit Test scored 29/30 — Top 5% of class', icon: Star, color: 'yellow' },
  { time: 'Feb 20', type: 'Notice', text: 'Pre-Board Study Leave announced: March 1–4. Campus access restricted.', icon: Bell, color: 'orange' },
  { time: 'Feb 19', type: 'Fee', text: 'Term III Fee ₹45,000 due March 15, 2025 — Pay via Portal', icon: AlertTriangle, color: 'red' },
]

const topSubjects = [
  { subject: 'Computer Science (System)', score: 98, grade: 'A1', color: 'var(--primary)' },
  { subject: 'Mathematics (Advanced)', score: 96, grade: 'A1', color: 'var(--primary)' },
  { subject: 'Hindi Course A (Literature)', score: 90, grade: 'A1', color: '#3b82f6' },
  { subject: 'English Language & Literature', score: 88, grade: 'A2', color: '#8b5cf6' },
  { subject: 'Social Sciences (History/Eco/Pol.Sc)', score: 85, grade: 'A2', color: '#f97316' },
]

const pendingActions = [
  { title: 'Countersign Physics assignment', due: 'Today 5 PM', urgent: true },
  { title: 'Term III Fee ₹45,000 pending', due: 'Mar 15, 2025', urgent: true },
  { title: 'Review & sign CBSE Hall Ticket', due: 'Feb 28', urgent: false },
  { title: 'PTM slot booking for Term II review', due: 'Mar 1', urgent: false },
]

const quickStats = [
  { label: 'Attendance', value: '94.2%', sub: '146/155 days', color: 'var(--primary)', icon: CheckCircle, path: '/attendance' },
  { label: 'Class Rank', value: '#3', sub: 'of 43 students', color: '#3b82f6', icon: Award, path: '/performance' },
  { label: 'Term GPA', value: '₹41,000', sub: 'Paid this Term', color: '#8b5cf6', icon: FileText, path: '/fee-payment' },
  { label: 'Pending', value: '2', sub: 'Action Required', color: '#ef4444', icon: AlertTriangle, path: '/homework' },
]

const feeData = {
  annual: '₹1,85,000',
  paid: '₹1,40,000',
  due: '₹45,000',
  dueDate: 'Mar 15',
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div>
      {/* Hero / Guardian Greeting */}
      <div className="card mb-20" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a5c3a 100%)', border: 'none' }}>
        <div className="card-body" style={{ padding: '20px 24px' }}>
          <div className="flex items-center justify-between flex-wrap gap-12">
            <div className="flex items-center gap-16">
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: 'white', flexShrink: 0 }}>
                AS
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 2 }}>GUARDIAN: RAJESH & SUNITA SHARMA</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'white' }}>Aarav Sharma</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Grade 10-B • Roll #24 • Greenwood High International School</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>Today (Tuesday, Oct 13, 2026) • P4 Computer Science on Campus</div>
              </div>
            </div>
            <div className="flex items-center gap-10 flex-wrap">
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>SYNC STATUS</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>● Live Sync Active</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>DOCUMENTS</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>4 KYC Verified</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px 14px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>PUNCTUALITY</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>99.2% On-Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-4 mb-20">
        {quickStats.map((s, i) => {
          const Icon = s.icon
          return (
            <Link key={i} to={s.path} style={{ textDecoration: 'none' }}>
              <div className="stat-card" style={{ borderLeft: `4px solid ${s.color}`, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="stat-label" style={{ color: s.color }}>{s.label}</div>
                  <Icon size={18} style={{ color: s.color, opacity: 0.7 }} />
                </div>
                <div className="stat-value" style={{ fontSize: 30, color: s.color }}>{s.value}</div>
                <div className="stat-meta">{s.sub}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Main Grid: Live Updates + Actions */}
      <div className="two-col mb-20">
        {/* Live Updates Feed */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Live Comms & Driver Daily Status Dispatcher</div>
              <div className="card-subtitle">Real-time home-to-school updates • Last synced: just now</div>
            </div>
            <span className="tag tag-green">● Live & Tracking</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {liveUpdates.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="flex items-start gap-12" style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-light)' }}>
                  <div className={`avatar avatar-sm avatar-${item.color}`} style={{ flexShrink: 0, marginTop: 2, fontSize: 11, width: 28, height: 28 }}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-8 mb-4">
                      <span className={`tag tag-${item.color}`} style={{ fontSize: 10 }}>{item.type}</span>
                      <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{item.text}</div>
                  </div>
                </div>
              )
            })}
            <div style={{ padding: '12px 20px', textAlign: 'center' }}>
              <button className="btn btn-secondary btn-sm">Enable Driver & Status Target</button>
            </div>
          </div>
        </div>

        {/* Pending Actions & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Today's Commute */}
          <div className="card">
            <div className="card-header" style={{ paddingBottom: 12, paddingTop: 12 }}>
              <div className="card-title" style={{ fontSize: 14 }}>Today's Commute & Boarding Status for Aarav</div>
              <Link to="/commute-bus"><span className="tag tag-green" style={{ cursor: 'pointer', fontSize: 11 }}>Keep Tracking Live</span></Link>
            </div>
            <div className="card-body" style={{ padding: '12px 16px' }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Transport Route</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Bus #14 (Regular)</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Oakwood Enclave Gate 1 • 07:12 AM/12 PM</div>
                </div>
                <div className="tag tag-green">● Active</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, padding: '3px 8px', background: 'var(--border-light)', borderRadius: 6, color: 'var(--text-secondary)', fontWeight: 500 }}>+91 XXXXXXXXXX</span>
                <span style={{ fontSize: 11, padding: '3px 8px', background: 'var(--border-light)', borderRadius: 6, color: 'var(--text-secondary)', fontWeight: 500 }}>+91 XXXXXXXXXX</span>
              </div>
            </div>
          </div>

          {/* 2 Pending Actions */}
          <div className="card">
            <div className="card-header" style={{ paddingTop: 12, paddingBottom: 12 }}>
              <div className="card-title" style={{ fontSize: 14 }}>Pending Action Required</div>
              <span className="tag tag-red">{pendingActions.length} Tasks</span>
            </div>
            <div className="card-body" style={{ padding: '8px 0' }}>
              {pendingActions.map((a, i) => (
                <div key={i} className="flex items-center gap-12" style={{ padding: '10px 16px', borderBottom: i < pendingActions.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                  <div className="notif-dot" style={{ background: a.urgent ? 'var(--red)' : 'var(--orange)' }}></div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due: {a.due}</div>
                  </div>
                  {a.urgent && <span className="tag tag-red" style={{ fontSize: 10 }}>Urgent</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="grid grid-3 mb-20">
        {/* Subject Performance Table */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <div className="card-header">
            <div>
              <div className="card-title">Subject-Wise Performance Team</div>
              <div className="card-subtitle">Class 10-B Faculty Curricula</div>
            </div>
            <span className="tag tag-blue">Class Average →</span>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            {topSubjects.map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div className="flex items-center justify-between mb-4">
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.subject}</div>
                  <div className="flex items-center gap-6" style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.score}%</span>
                    <span className="tag tag-green" style={{ fontSize: 10 }}>{s.grade}</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${s.score}%`, background: s.color }}></div>
                </div>
              </div>
            ))}
            <Link to="/performance"><button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>Download Verified Gradebook PDF</button></Link>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Today's Pending & Routing Tasks</div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            <div className="urgent-box mb-12">
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', marginBottom: 6 }}>● OVERDUE — Countersign Required</div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Physics – Optics & Lens Formula</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Dr. Alistair Evans • Due Today 5 PM</div>
              <div className="flex gap-8 mt-8">
                <button className="btn btn-primary btn-xs">Countersign Now</button>
                <button className="btn btn-secondary btn-xs">View Worksheet</button>
              </div>
            </div>
            <div className="highlight-box mb-12">
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Ready for Final Submission</div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Python BST Tree Traversal</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Mr. Rajesh Sen • Code Syntax Passed</div>
            </div>
            <div style={{ background: 'var(--border-light)', borderRadius: 8, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>NOT STARTED</div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Nationalist Center... Map Work</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Mrs. N. Sen • Due Friday 3 PM</div>
            </div>
          </div>
        </div>

        {/* Fee & Financial Summary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Fee Management & Ledger</div>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            <div className="flex items-center gap-8 mb-12">
              <span className="tag tag-green" style={{ fontSize: 10 }}>Remind CBSE 2025 CBF</span>
              <span className="tag tag-orange" style={{ fontSize: 10 }}>Revoke MRC 2025 OBF</span>
            </div>
            <div className="flex items-end gap-6 mb-4">
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹1,40,000</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--primary)' }}>₹45,000</span>
              <span className="tag tag-red" style={{ fontSize: 10 }}>Due Soon</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>Due Mar 15 • Installment Term III • Pay Now &gt;</div>
            <div className="fee-row" style={{ fontSize: 13, paddingTop: 6 }}>
              <span>AC Dedicated Transport</span><span style={{ fontWeight: 700 }}>₹5,000</span>
            </div>
            <div className="fee-row" style={{ fontSize: 13 }}>
              <span>Classroom Teaching & Faculty</span><span style={{ fontWeight: 700 }}>₹28,000</span>
            </div>
            <div className="fee-row" style={{ fontSize: 13 }}>
              <span>Science & Robotics Labs</span><span style={{ fontWeight: 700 }}>₹6,500</span>
            </div>
            <div className="fee-row" style={{ fontSize: 13 }}>
              <span>Digital LMS & Campus Wi-Fi</span><span style={{ fontWeight: 700 }}>₹3,500</span>
            </div>
            <div className="fee-row" style={{ fontSize: 13 }}>
              <span>CBSE Pre-Board Assessments</span><span style={{ fontWeight: 700 }}>₹2,000</span>
            </div>
            <div style={{ borderTop: '2px solid var(--primary)', paddingTop: 10, marginTop: 6, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15 }}>
              <span>Net Due</span><span style={{ color: 'var(--red)' }}>₹45,000</span>
            </div>
            <Link to="/fee-payment"><button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Pay ₹45,000 · Term III Fee →</button></Link>
          </div>
        </div>
      </div>

      {/* Faculty Performance Scoreboard + PTM + Student Voice */}
      <div className="grid grid-2 mb-20">
        {/* Faculty Scoreboard */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Faculty Performance Scoreboard</div>
              <div className="card-subtitle">All-guardian reviewed & Ranked</div>
            </div>
            <span className="tag tag-green" style={{ fontSize: 10 }}>● Community Noticed</span>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            {[
              { name: 'Dr. Alistair Evans', role: 'Physics & Homeroom Lead Faculty', rank: 1, rating: 4.8, dept: '0 Demerits / 0 Citations' },
              { name: 'Mrs. Savita Roy', role: 'Mathematics Faculty • Class 10-B', rank: 2, rating: 4.7, dept: '0 Demerits / 0 Citations' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-12" style={{ padding: '10px 0', borderBottom: '1px solid var(--border-light)' }}>
                <div className="avatar avatar-md avatar-green" style={{ background: i === 0 ? 'var(--primary)' : 'var(--blue)' }}>{f.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{f.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.role}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--primary)' }}>#{f.rank}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>★ {f.rating}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <Link to="/teacher-remarks" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>View All Faculty Remarks</Link>
            </div>
          </div>
        </div>

        {/* PTM Schedule */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">PTM/HES Homeroom Scheduler</div>
            <Link to="/ptm-scheduler"><span className="tag tag-green" style={{ cursor: 'pointer', fontSize: 11 }}>● Live Confirmed</span></Link>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            <div className="tag tag-green mb-8" style={{ fontSize: 11 }}>● Last Confirmed</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Saturday, March 1, 2025</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>10:45 AM — 11:00 AM (15 Min Priority Slot) • Confident: P1, Savitha Park</div>
            <div style={{ background: 'var(--border-light)', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>Booking Appointments</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Need to schedule a Mid-Term Review</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Reply until Faculty Dr. Alistair Evans confirms</div>
            </div>
            <Link to="/ptm-scheduler"><button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Add Reminder Group</button></Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Guardian Queries + Notice Board */}
      <div className="grid grid-2 mb-20">
        {/* Parent Query */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Parent Query & Helpdesk Concierge</div>
            <div className="flex gap-8">
              <span className="tag tag-green" style={{ fontSize: 10 }}>All Resolved</span>
              <Link to="/query-helpdesk" className="btn btn-secondary btn-xs">View All</Link>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            <div className="chip-tabs mb-12 scroll-x">
              {['All Tickets', 'School Model', 'Grade 0 Grade', 'Access & Add Grade', 'Access & Add Ins.', 'Leadership'].map((t, i) => (
                <span key={i} className={`chip-tab ${i === 0 ? 'active' : ''}`} style={{ fontSize: 11 }}>{t}</span>
              ))}
            </div>
            <div className="alert alert-blue" style={{ marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Transport Route Mock</div>
                <div style={{ fontSize: 12.5, marginTop: 2 }}>Inquiry about Olympiad National Camp registration fee waiver</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>Submitted: Feb 18, 2025 • Target: Feb 22, 2025</div>
              </div>
            </div>
            <div className="alert alert-green">
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Bus & Commute • Resolved</div>
                <div style={{ fontSize: 12.5, marginTop: 2 }}>Transport Route 14 morning pick-up delay during rainy days</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>Closed: Feb 10, 2025 • Resolution SLA: 2.1 Hrs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Notice Board & Campus Regulations</div>
            <Link to="/notice-board" className="btn btn-secondary btn-xs">View All 18</Link>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            <div style={{ background: 'var(--primary-lighter)', border: '1px solid #bbf7d0', borderRadius: 8, padding: '12px 14px', marginBottom: 10 }}>
              <div className="flex items-center justify-between mb-4">
                <span className="tag tag-red" style={{ fontSize: 10 }}>CRITICAL NOTICE</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Today</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Student Activities</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 4 }}>School Management Council Agenda — Academic Competitions</div>
            </div>
            {[
              { title: 'Founder\'s Day Rehearsal – Feb 28 Early Dismissal', tag: 'General Campus' },
              { title: 'Grade 10 Pre-Board Assessment Blueprint & Hall Ticket Issuance', tag: 'Academics' },
              { title: 'Annual Campus Medical & Vision Screening Report', tag: 'Health & Wellness' },
            ].map((n, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none' }}>
                <div className="flex items-center gap-6 mb-2">
                  <span className="tag tag-gray" style={{ fontSize: 10 }}>{n.tag}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rank Widget */}
      <div className="grid grid-2">
        <div className="card" style={{ background: 'linear-gradient(135deg, #1a7a4a 0%, #1a5c3a 100%)', border: 'none' }}>
          <div className="card-body" style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 4 }}>OVERALL STANDING IN SCHOOL & COUNCIL</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: 'white', lineHeight: 1 }}>Rank #1 <span style={{ fontSize: 20 }}>(840 Pts)</span></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>Activity Points • F Grade 10-B Top Academic Performer</div>
            <div className="flex gap-8 mt-12">
              {['School Management Council', '0 Demerits / 0 Citations', 'Class Teacher Notified'].map((badge, i) => (
                <span key={i} style={{ background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, color: 'white' }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Student Council & Councils</div>
          </div>
          <div className="card-body" style={{ padding: '14px 16px' }}>
            {[
              { title: 'School Management Council', role: 'Active Member', date: 'Agenda' },
              { title: 'Student Council Lead', role: '0 Demerits / 0 Citations', date: 'Active' },
              { title: 'Class Teacher Notified', role: 'Student Activities', date: 'In Progress' },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between" style={{ padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--border-light)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.role}</div>
                </div>
                <span className="tag tag-green" style={{ fontSize: 10 }}>{c.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
