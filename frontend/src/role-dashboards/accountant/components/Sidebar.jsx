import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FileText, AlertTriangle, Users,
  Building2, Wallet, Landmark, Receipt, FileBarChart,
  CheckCircle2, Shield
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Bursar Cockpit', to: '/' },
  { icon: FileText, label: 'Fee Collection & Invoicing', to: '/fee-collection' },
  { icon: AlertTriangle, label: 'Defaulter Recovery & Aging', to: '/defaulter-recovery' },
  { icon: Users, label: 'Payroll & Staff Disbursements', to: '/payroll' },
  { icon: Building2, label: 'Vendor Accounts Payable (AP)', to: '/vendor-ap' },
  { icon: Wallet, label: 'Petty Cash & Imprest Floats', to: '/petty-cash' },
  { icon: Landmark, label: 'Bank Reconciliation (BRS)', to: '/bank-reconciliation' },
  { icon: Receipt, label: 'Statutory Taxes & GST/TDS', to: '/statutory-taxes' },
  { icon: FileBarChart, label: 'Financial Statements & Audit', to: '/financial-statements' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <div className="sidebar-section-title">Finance Management</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="sidebar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <CheckCircle2 size={12} color="var(--success)" />
            <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>Audit Trail Sync: Verified</span>
          </div>
          <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Books Sealed: 15:00 IST</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <Shield size={12} color="var(--primary)" />
            <span>Dual-Auth Active</span>
          </div>
        </div>
      </nav>
    </>
  );
}
