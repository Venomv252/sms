import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, MapPin, Users, Radio, Wrench,
  Wallet, AlertTriangle, Phone, Menu, X, Shield,
  Wifi, AlertCircle
} from 'lucide-react'
import './Layout.css'

const navItems = [
  { path: '/', label: 'Driver Cockpit', icon: LayoutDashboard },
  { path: '/route-waypoints', label: 'Route & Waypoints', icon: MapPin },
  { path: '/student-roster', label: 'Student Roster & Roll Call', icon: Users },
  { path: '/fleet-proximity', label: 'Fleet Proximity Radar', icon: Radio },
  { path: '/breakdown', label: 'Breakdown & Replacement', icon: Wrench },
  { path: '/fuel-expense', label: 'Fuel & Expense Ledger', icon: Wallet },
  { path: '/incidents', label: 'Incidents & Complaints', icon: AlertTriangle },
  { path: '/emergency-hotlines', label: 'Emergency Hotlines', icon: Phone },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="layout">
      {/* Topbar */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="brand">
            <div className="brand-icon"><Shield size={16} /></div>
            <div>
              <div className="brand-name">GreenWood High</div>
              <div className="brand-sub">Driver Transit ERP</div>
            </div>
          </div>
        </div>

        <div className="topbar-center">
          <div className="route-badge">
            <span className="dot-green status-dot"></span>
            <span>#14 Whitefield Express</span>
            <span className="sep">•</span>
            <span>Heavy Bus</span>
            <span className="sep">•</span>
            <span className="mono">KA-01-MJ-9941</span>
          </div>
        </div>

        <div className="topbar-right">
          <div className="gps-status">
            <span className="dot-green status-dot"></span>
            <span>GPS LIVE (3.4 KB/S)</span>
          </div>
          <button className="btn btn-danger btn-sm sos-btn">
            <AlertCircle size={13} /> SOS Alert
          </button>
          <div className="driver-badge">
            <div className="driver-avatar">RB</div>
            <div>
              <div className="driver-name">Ramesh Babu</div>
              <div className="driver-id">#DRV-007</div>
            </div>
          </div>
        </div>
      </header>

      <div className="layout-body">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="route-info-sidebar">
            <span>● ROUTE 14</span>
            <span className="mono">KA-01-MJ-9941</span>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`nav-item ${location.pathname === path ? 'nav-item-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={15} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="sidebar-driver">
            <div className="driver-avatar sm">RB</div>
            <div>
              <div className="driver-name">Ramesh Babu</div>
              <div className="driver-id">#DRV-007 • Driver</div>
            </div>
            <div className="dot-green status-dot"></div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
