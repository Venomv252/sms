import React from "react";
import { X, LogOut } from "lucide-react";
import { clearApiSession } from "../api.js";
import { useNavigate } from "react-router-dom";
import "./RoleSidebar.css";

/**
 * Reusable Sidebar Component for all role dashboards
 * Provides consistent green-themed sidebar with navigation
 * 
 * @param {Object} props
 * @param {string} props.brandTitle - Main brand title (e.g., "Greenwood High")
 * @param {string} props.brandSubtitle - Subtitle (e.g., "School ERP Portal")
 * @param {React.ReactNode} props.brandIcon - Icon component for brand
 * @param {string} props.navLabel - Main navigation label (e.g., "MY ORGANISATION")
 * @param {Array} props.navItems - Navigation items array with structure:
 *   [{ id: string, label: string, icon: Component, group: string, badge?: string|number }]
 * @param {string} props.currentPage - Current active page id
 * @param {function} props.onNavigate - Callback when nav item clicked: (pageId) => void
 * @param {boolean} props.mobileNav - Mobile navigation open state
 * @param {function} props.setMobileNav - Function to toggle mobile nav
 * @param {Object} props.user - User object with firstName, lastName, role
 * @param {string} props.userRole - Display role (e.g., "Super Administrator")
 */
export default function RoleSidebar({
  brandTitle,
  brandSubtitle,
  brandIcon: BrandIcon,
  navLabel,
  navItems = [],
  currentPage,
  onNavigate,
  mobileNav,
  setMobileNav,
  user = {},
  userRole,
}) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    clearApiSession();
    navigate("/login");
  };

  return (
    <aside className={`platform-sidebar ${mobileNav ? "is-open" : ""}`}>
      <div className="platform-brand">
        <div className="platform-brand-icon">
          {BrandIcon && <BrandIcon />}
        </div>

        <div>
          <strong>{brandTitle}</strong>
          <small>{brandSubtitle}</small>
        </div>

        <button
          className="platform-close-nav"
          onClick={() => setMobileNav(false)}
        >
          <X />
        </button>
      </div>

      {navLabel && <div className="platform-nav-label">{navLabel}</div>}

      <nav>
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Show group label before first item or when group changes */}
            {item.group && (index === 0 || navItems[index - 1].group !== item.group) && (
              <div className="platform-nav-group-label">{item.group}</div>
            )}
            
            <button
              className={currentPage === item.id ? "active" : ""}
              onClick={() => {
                onNavigate(item.id);
                setMobileNav(false);
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              
              {/* Badge support (number or text) */}
              {item.badge && (
                <em className="sidebar-badge">{item.badge}</em>
              )}
            </button>
          </React.Fragment>
        ))}
      </nav>

      <div className="platform-sidebar-bottom">
        <div className="platform-user">
          <div className="platform-user-avatar">
            {(user.firstName || userRole?.charAt(0) || "U").slice(0, 1).toUpperCase()}
          </div>

          <div>
            <strong>{user.firstName || userRole || "User"}</strong>
            <small>{userRole}</small>
          </div>
        </div>

        <button
          className="platform-signout"
          onClick={handleSignOut}
        >
          <LogOut size={17} /> Sign out
        </button>
      </div>
    </aside>
  );
}
