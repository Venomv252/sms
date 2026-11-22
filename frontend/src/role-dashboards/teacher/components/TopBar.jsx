import React from 'react'
import { Bell, ChevronDown, Menu, Zap, Users, RefreshCw } from 'lucide-react'

export default function TopBar({ onMenuClick }) {
  return (
    <header className="topbar">
      {/* Hamburger — only visible on mobile via CSS */}
      <button onClick={onMenuClick} className="menu-btn" aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="topbar-logo">
        <div className="topbar-logo-icon">GH</div>
        <span>Greenwood High</span>
      </div>

      <span className="badge topbar-badge" style={{ background: '#16a34a' }}>FACULTY</span>

      <div className="topbar-info" style={{ fontSize: 12 }}>
        <span>AY 2024–25</span>
        <ChevronDown size={12} />
      </div>
      <div className="topbar-info" style={{ fontSize: 12 }}>
        <span>25 · Term II</span>
        <ChevronDown size={12} />
      </div>

      <div className="topbar-info" style={{ fontSize: 12 }}>
        <Users size={13} />
        <span>Grade 10-B (Homeroom)</span>
        <RefreshCw size={11} />
      </div>

      <div className="topbar-spacer" />

      <button className="topbar-btn topbar-btn-primary" style={{ fontSize: 11, padding: '5px 10px', whiteSpace: 'nowrap' }}>
        <Zap size={12} />
        Quick Mark / Log
      </button>

      <div className="topbar-notif">
        <Bell size={15} />
        <span className="topbar-notif-badge">3</span>
      </div>

      <div className="topbar-user">
        <div className="topbar-user-avatar">AE</div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Dr. Alistair Evans</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>#EMP-2018-042 · PGD Physics</div>
        </div>
        <ChevronDown size={12} style={{ color: '#94a3b8' }} />
      </div>
    </header>
  )
}
