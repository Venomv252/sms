import React from 'react';
import { Menu, Bell, ChevronDown } from 'lucide-react';

export default function TopBar({ onMenuToggle }) {
  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
        <Menu size={20} />
      </button>

      <div className="topbar-logo">
        <div className="logo-icon">GH</div>
        <div>
          <div>Greenwood High</div>
          <div className="logo-sub">CBSE Affiliation #930421</div>
        </div>
      </div>

      <div className="topbar-module">
        <div className="module-title">Bursar &amp; Finance Office</div>
        <div className="module-sub">Central Accounting &amp; Treasury Administration</div>
      </div>

      <div className="topbar-badges">
        <span className="badge badge-blue">FY 2024–25 Q4</span>
        <span className="badge badge-green">Available ₹4.82 Cr</span>
        <span className="badge badge-yellow">LIVE TREASURY DESK</span>
        <span className="badge badge-green">CBSE Sec 16 Institutional Bye-Laws Verified</span>
      </div>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        <button className="btn btn-primary">
          <span>Record Payment</span>
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '4px' }}>
          <Bell size={18} color="var(--gray-600)" />
          <span style={{
            position: 'absolute', top: 0, right: 0,
            width: 8, height: 8, background: 'var(--danger)',
            borderRadius: '50%', border: '2px solid #fff'
          }} />
        </button>
        <div className="topbar-user">
          <div className="avatar avatar-blue">CR</div>
          <div className="user-info">
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-800)' }}>C. Ramanathan</div>
            <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Chief Financial Officer</div>
          </div>
          <ChevronDown size={14} color="var(--gray-400)" />
        </div>
      </div>
    </header>
  );
}
