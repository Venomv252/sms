import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiGet } from '../../../api';
import {
  LayoutDashboard, FileText, Users, DollarSign, BarChart2,
  Award, Calendar, Briefcase, UserCheck, CreditCard, Receipt,
  TrendingUp, Package, Truck, Heart, Siren, MessageSquare, Settings,
} from 'lucide-react';

export const navItems = [
  { section: 'OVERVIEW', items: [
    { label: 'Management Cockpit',        icon: LayoutDashboard, path: '/' },
    { label: 'Executive Summary',         icon: FileText,        path: '/executive-summary' },
  ]},
  { section: 'STUDENTS & ACADEMICS', items: [
    { label: 'Student Registry & Profiles',icon: Users,          path: '/students' },
    { label: 'Fees & Defaulters',          icon: DollarSign,     path: '/fees' },
    { label: 'Results & Marks',            icon: BarChart2,      path: '/results' },
    { label: 'TC & Certificates',          icon: Award,          path: '/certificates' },
    { label: 'Timetable & Routine',        icon: Calendar,       path: '/timetable' },
  ]},
  { section: 'STAFF & HUMAN RESOURCES', items: [
    { label: 'Faculty & Teachers',         icon: Briefcase,      path: '/faculty' },
    { label: 'Support Staff',              icon: UserCheck,      path: '/support-staff' },
    { label: 'Payroll & Salary Slips',     icon: CreditCard,     path: '/payroll' },
  ]},
  { section: 'FINANCE & OPERATIONS', items: [
    { label: 'Fee Collection & Invoicing', icon: Receipt,        path: '/fee-collection' },
    { label: 'Bills & Misc Expenditure',   icon: DollarSign,     path: '/bills' },
    { label: 'ITR & Financial Reports',    icon: TrendingUp,     path: '/financial-reports' },
    { label: 'Uniforms & Books Inventory', icon: Package,        path: '/inventory' },
  ]},
  { section: 'CAMPUS SAFETY & FLEET', items: [
    { label: 'Transport & Drivers Fleet',  icon: Truck,          path: '/transport' },
    { label: 'Medical & Infirmary',        icon: Heart,          path: '/medical' },
    { label: 'Emergency & Local Services', icon: Siren,          path: '/emergency' },
  ]},
  { section: 'INSTITUTIONAL GOVERNANCE', items: [
    { label: 'Parent Inquiries & Complaints', icon: MessageSquare, path: '/parent-inquiries' },
  ]},
];

export default function Sidebar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [schoolName, setSchoolName] = useState('School');
  const [schoolCode, setSchoolCode] = useState('ERP');

  useEffect(() => {
    // Fetch school info for sidebar branding
    apiGet('/management/dashboard/statistics')
      .then((response) => {
        if (response.data?.school) {
          setSchoolName(response.data.school.name);
          setSchoolCode(response.data.school.code);
        }
      })
      .catch(() => {
        // Use defaults if fetch fails
      });
  }, []);

  // Generate initials from school name
  const initials = schoolName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">{initials}</div>
        <div>
          <div className="sidebar-logo-text">{schoolName}</div>
          <div className="sidebar-logo-sub">Board ERP System</div>
        </div>
      </div>

      {/* Nav items */}
      {navItems.map((section) => (
        <div key={section.section}>
          <div className="sidebar-section-label">{section.section}</div>
          {section.items.map((item) => {
            const Icon     = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={13} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-item" style={{ padding: 0 }}>
          <Settings size={13} />
          <span>ERP Node Control</span>
          <span style={{ marginLeft: 'auto', fontSize: '9px', background: '#16a34a', color: '#fff', padding: '1px 5px', borderRadius: '3px' }}>v4.2</span>
        </div>
      </div>
    </aside>
  );
}
