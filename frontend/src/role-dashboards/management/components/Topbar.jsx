import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Plus, UserPlus, LogOut } from 'lucide-react';
import AddPrincipalModal from './AddPrincipalModal';
import { clearApiSession, apiGet } from '../../../api';

export default function Topbar() {
  const [showPrincipalModal, setShowPrincipalModal] = useState(false);
  const [schoolName, setSchoolName] = useState('School');
  const [academicYear, setAcademicYear] = useState('2024-25');

  useEffect(() => {
    // Fetch school info for topbar
    apiGet('/management/dashboard/statistics')
      .then((response) => {
        if (response.data?.school) {
          setSchoolName(response.data.school.name);
        }
        if (response.data?.academic) {
          setAcademicYear(response.data.academic.academicYear);
        }
      })
      .catch(() => {
        // Use defaults if fetch fails
      });
  }, []);

  const handleSignOut = () => {
    clearApiSession();
    window.location.reload();
  };
  return (
    <header className="topbar">
      {/* Brand */}
      <div className="topbar-brand">
        <span style={{ fontSize: 16 }}>🌿</span>
        <span className="topbar-brand-text">{schoolName}</span>
      </div>

      {/* Campus — hidden on mobile via CSS */}
      <div className="topbar-campus">
        <span style={{ fontSize: 10 }}>🏫</span>
        <span>{schoolName} Main Campus</span>
        <ChevronDown size={11} />
      </div>

      {/* AY badge — hidden on mobile via CSS */}
      <div className="topbar-badge">📅 AY {academicYear}</div>

      {/* Search */}
      <div className="topbar-search">
        <Search size={12} className="topbar-search-icon" />
        <input placeholder="Search students, staff, tickets, circulars…" />
      </div>

      <div className="topbar-spacer" />

      {/* Add Principal Button */}
      <button
        className="btn btn-primary btn-sm"
        onClick={() => setShowPrincipalModal(true)}
        title="Add Principal"
      >
        <UserPlus size={13} />
        <span className="hide-mobile">Add Principal</span>
      </button>

      {/* Action */}
      <button className="btn-action">
        <Plus size={13} />
        <span className="btn-action-text">Management Action</span>
      </button>

      {/* Bell */}
      <button className="topbar-icon-btn" aria-label="Notifications">
        <Bell size={14} />
        <span className="notification-dot" />
      </button>

      {/* Avatar */}
      <div className="topbar-avatar" title="Management Dashboard">
        MD
      </div>

      {/* Sign Out */}
      <button
        className="topbar-icon-btn"
        onClick={handleSignOut}
        title="Sign Out"
        aria-label="Sign Out"
      >
        <LogOut size={14} />
      </button>

      {/* Add Principal Modal */}
      <AddPrincipalModal
        isOpen={showPrincipalModal}
        onClose={() => setShowPrincipalModal(false)}
        onSuccess={(principal) => {
          console.log('Principal created:', principal);
        }}
      />
    </header>
  );
}
