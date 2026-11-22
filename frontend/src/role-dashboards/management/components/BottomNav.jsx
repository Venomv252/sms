import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, DollarSign, Truck, MoreHorizontal, X,
  FileText, BarChart2, Award, Calendar, Briefcase, UserCheck,
  CreditCard, Receipt, TrendingUp, Package, Heart, Siren, MessageSquare,
} from 'lucide-react';

/* The 4 primary tabs always visible in the bottom bar */
const PRIMARY_TABS = [
  { label: 'Cockpit',   icon: LayoutDashboard, path: '/' },
  { label: 'Students',  icon: Users,           path: '/students' },
  { label: 'Finance',   icon: DollarSign,      path: '/fee-collection' },
  { label: 'Fleet',     icon: Truck,           path: '/transport' },
];

/* All sections shown inside the "More" drawer */
const MORE_SECTIONS = [
  { section: 'OVERVIEW', items: [
    { label: 'Executive Summary',          icon: FileText,       path: '/executive-summary' },
  ]},
  { section: 'STUDENTS & ACADEMICS', items: [
    { label: 'Fees & Defaulters',          icon: DollarSign,     path: '/fees' },
    { label: 'Results & Marks',            icon: BarChart2,      path: '/results' },
    { label: 'TC & Certificates',          icon: Award,          path: '/certificates' },
    { label: 'Timetable & Routine',        icon: Calendar,       path: '/timetable' },
  ]},
  { section: 'STAFF & HR', items: [
    { label: 'Faculty & Teachers',         icon: Briefcase,      path: '/faculty' },
    { label: 'Support Staff',              icon: UserCheck,      path: '/support-staff' },
    { label: 'Payroll & Salary Slips',     icon: CreditCard,     path: '/payroll' },
  ]},
  { section: 'FINANCE & OPERATIONS', items: [
    { label: 'Bills & Misc Expenditure',   icon: Receipt,        path: '/bills' },
    { label: 'ITR & Financial Reports',    icon: TrendingUp,     path: '/financial-reports' },
    { label: 'Uniforms & Books Inventory', icon: Package,        path: '/inventory' },
  ]},
  { section: 'CAMPUS SAFETY', items: [
    { label: 'Medical & Infirmary',        icon: Heart,          path: '/medical' },
    { label: 'Emergency & Local Services', icon: Siren,          path: '/emergency' },
  ]},
  { section: 'GOVERNANCE', items: [
    { label: 'Parent Inquiries',           icon: MessageSquare,  path: '/parent-inquiries' },
  ]},
];

export default function BottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  /* Is the current route one that doesn't appear in PRIMARY_TABS? */
  const moreActive = !PRIMARY_TABS.some(t => t.path === location.pathname);

  return (
    <>
      {/* ── Bottom nav bar ── */}
      <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
        {PRIMARY_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              className={`bottom-nav-item ${isActive(tab.path) ? 'active' : ''}`}
              onClick={() => go(tab.path)}
              aria-label={tab.label}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}

        {/* More button */}
        <button
          className={`bottom-nav-item bottom-nav-more ${moreActive && !open ? 'active' : ''} ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="More pages"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <MoreHorizontal size={20} />}
          <span>More</span>
        </button>
      </nav>

      {/* ── Backdrop ── */}
      <div
        className={`more-drawer-backdrop ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── More drawer (slides up from bottom) ── */}
      <div
        className={`more-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="All pages"
      >
        <div className="more-drawer-header">
          <h3>All Modules</h3>
          <button className="more-drawer-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {MORE_SECTIONS.map((section) => (
          <div key={section.section}>
            <div className="more-drawer-section-label">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  className={`more-drawer-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => go(item.path)}
                >
                  <Icon size={16} color={isActive(item.path) ? 'var(--primary)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
