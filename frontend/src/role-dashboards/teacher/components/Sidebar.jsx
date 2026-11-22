import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, UserCheck, Calendar, ClipboardList,
  BookOpen, Upload, BarChart2, TrendingUp, MessageSquare,
  Shield, Activity, Megaphone, AlertCircle, MessageCircle,
  Newspaper, Trophy, Bus, HelpCircle, LogOut, X
} from 'lucide-react'

const navItems = [
  { section: 'OVERVIEW' },
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Teacher Profile & Credentials', icon: UserCheck, path: '/profile' },
  { label: 'Teacher Class Schedule', icon: Calendar, path: '/schedule' },
  { section: 'DAILY CLASSROOM OPS' },
  { label: 'Attendance', icon: ClipboardList, path: '/attendance' },
  { label: 'Homework & Assignments', icon: BookOpen, path: '/homework' },
  { label: 'Syllabus Progress', icon: TrendingUp, path: '/syllabus' },
  { label: 'Study Material Upload', icon: Upload, path: '/study-material' },
  { section: 'EVALUATION & RECORDS' },
  { label: 'Results & Exam Marks', icon: BarChart2, path: '/results' },
  { label: 'Monthly Performance', icon: Activity, path: '/performance' },
  { label: 'Remarks & Feedback', icon: MessageSquare, path: '/remarks' },
  { label: 'Discipline Ledger', icon: Shield, path: '/discipline' },
  { label: 'Sports & Activities', icon: Trophy, path: '/sports' },
  { section: 'COMMUNICATION & ADMIN' },
  { label: 'Announcements', icon: Megaphone, path: '/announcements' },
  { label: 'Parent Complaints', icon: AlertCircle, path: '/parent-complaints' },
  { label: 'Management Comms', icon: MessageCircle, path: '/management-comms' },
  { label: 'Circulars & Notices', icon: Newspaper, path: '/circulars' },
  { label: 'Transit & Logistics', icon: Bus, path: '/transit' },
  { section: '' },
  { label: 'Quick Support', icon: HelpCircle, path: '#' },
  { label: 'Logout', icon: LogOut, path: '#' },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (path) => {
    if (path !== '#') navigate(path)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${open ? ' visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">GH</div>
          <div>
            <div className="sidebar-logo-text">Greenwood High</div>
            <div className="sidebar-logo-sub">TEACHER PORTAL</div>
          </div>
          <button onClick={onClose} className="sidebar-close-btn">
            <X size={16} />
          </button>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-avatar">AE</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Dr. Alistair Evans</div>
            <div className="sidebar-user-status">● On Duty · Rm 204</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {navItems.map((item, i) => {
            if (item.section !== undefined) {
              return item.section
                ? <div key={i} className="sidebar-section-label">{item.section}</div>
                : <div key={i} style={{ height: 8 }} />
            }
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={i}
                className={`sidebar-item${isActive ? ' active' : ''}`}
                onClick={() => handleNav(item.path)}
              >
                <Icon size={15} />
                {item.label}
              </button>
            )
          })}
        </div>
      </aside>
    </>
  )
}
