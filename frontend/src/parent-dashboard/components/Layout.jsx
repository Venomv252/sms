import React, { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Activity, Clock, CheckSquare, BarChart2,
  BookOpen, BookMarked, Calendar, ClipboardList, Award,
  AlarmClock, Star, HelpCircle, MessageSquare, Bell, Megaphone,
  DollarSign, Bus, ChevronDown, Menu, X, GraduationCap, Zap, Users
} from 'lucide-react'

const navItems = [
  { section: 'OVERVIEW' },
  { label: 'Dashboard',                    path: '/dashboard',           icon: LayoutDashboard },
  { label: 'Child Daily Pulse',            path: '/child-daily-pulse',   icon: Activity },
  { label: 'School Timings & Uniform',     path: '/school-timings',      icon: Clock },

  { section: 'ACADEMICS & PROGRESS' },
  { label: 'Attendance Tracker',           path: '/attendance',          icon: CheckSquare },
  { label: 'Performance (Subject-wise)',   path: '/performance',         icon: BarChart2 },
  { label: 'Homework & Assignments',       path: '/homework',            icon: BookOpen },
  { label: 'Syllabus & Course Progress',   path: '/syllabus',            icon: BookMarked },
  { label: 'Timetable & Academic Calendar',path: '/timetable',           icon: Calendar },

  { section: 'EXAMS & RESULTS' },
  { label: 'Exam Datesheet & Hall Tickets',path: '/exam-datesheet',      icon: ClipboardList },
  { label: 'Results & Report Cards',       path: '/results',             icon: Award },
  { label: 'PTM Scheduler',               path: '/ptm-scheduler',       icon: AlarmClock },

  { section: 'COMMUNICATION & FEEDBACK' },
  { label: 'Teacher Remarks & Discipline', path: '/teacher-remarks',     icon: Star },
  { label: 'Query & Helpdesk',            path: '/query-helpdesk',      icon: HelpCircle },
  { label: 'Parent-Management Comms',     path: '/parent-management',   icon: MessageSquare },
  { label: 'Notice Board & Circulars',    path: '/notice-board',        icon: Bell },
  { label: 'Class Announcements',         path: '/class-announcements', icon: Megaphone },

  { section: 'OPERATIONS & FEES' },
  { label: 'Fee Payment & Invoices',      path: '/fee-payment',         icon: DollarSign },
  { label: 'Child Commute & Bus Tracker', path: '/commute-bus',         icon: Bus },
  { label: 'Family Profile & Records',    path: '/family-profile',      icon: Users },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="app-layout">

      {/* ── Overlay ── */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={closeSidebar}
      />

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">GH</div>
          <div className="logo-text">
            <h2>Greenwood High</h2>
            <p>ERP Parent Portal</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item, idx) => {
            if (item.section) {
              return <div key={idx} className="nav-section-label">{item.section}</div>
            }
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                onClick={closeSidebar}
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">AS</div>
          <div className="user-info">
            <h4>Aarav Sharma</h4>
            <p>Class 10-B · Dr. A. Evans</p>
          </div>
          <ChevronDown size={13} style={{ marginLeft: 'auto', color: 'var(--text-muted)', flexShrink: 0 }} />
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-content">

        {/* ── Topbar ── */}
        <header className="topbar">
          <div className="topbar-left">
            {/* Hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Chips – hidden progressively at small sizes */}
            <div className="topbar-chip" style={{ minWidth: 0 }}>
              <span className="dot" />
              AY 2024–25 · Term II
            </div>
            <div className="topbar-chip secondary" style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <GraduationCap size={12} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                Aarav Sharma – Grade 10-B
              </span>
            </div>
          </div>

          <div className="topbar-right">
            <button className="btn btn-primary btn-sm">
              <Zap size={13} />
              <span className="hide-xs">Quick Action</span>
            </button>

            <div className="topbar-icon-btn">
              <Bell size={16} />
              <span className="badge">3</span>
            </div>

            <div className="topbar-user">
              <div className="topbar-user-avatar">RS</div>
              <div className="topbar-user-info">
                <h4>Rajesh &amp; Sunita Sharma</h4>
                <p>Guardian Account</p>
              </div>
              <ChevronDown size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
