import React, { useEffect, useState, useMemo } from "react";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Bus,
  Calendar,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Navigation,
  PackageCheck,
  RefreshCw,
  School,
  Settings,
  ShieldAlert,
  Users,
  UserCheck,
  X,
} from "lucide-react";
import {
  apiGet,
  clearApiSession,
} from "../api.js";
import RoleSidebar from "../components/RoleSidebar.jsx";
import "../role-dashboards/admin.css";
import "../role-dashboards/director-theme.css";
import "../role-dashboards/principal.css";
import Overview from "./principal/pages/Overview.jsx";
import Students from "./principal/pages/Students.jsx";
import Teachers from "./principal/pages/Teachers.jsx";
import Accountants from "./principal/pages/Accountants.jsx";
import Finance from "./principal/pages/Finance.jsx";
import Notices from "./principal/pages/Notices.jsx";
import Complaints from "./principal/pages/Complaints.jsx";
import Leaves from "./principal/pages/Leaves.jsx";
import Transport from "./principal/pages/Transport.jsx";
import LiveTracking from "./principal/pages/LiveTracking.jsx";
import AcademicCalendar from "./principal/pages/AcademicCalendar.jsx";
import Inventory from "./principal/pages/Inventory.jsx";
import Reports from "./principal/pages/Reports.jsx";
import AuditLogs from "./principal/pages/AuditLogs.jsx";

const NAV = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, group: "OVERVIEW" },
  { id: "students", label: "Students", icon: GraduationCap, group: "ACADEMICS" },
  { id: "teachers", label: "Teachers", icon: Users, group: "ACADEMICS" },
  { id: "academic-calendar", label: "Academic Calendar", icon: Calendar, group: "ACADEMICS" },
  { id: "accountants", label: "Accountants", icon: UserCheck, group: "ADMINISTRATION" },
  { id: "finance", label: "Finance", icon: CircleDollarSign, group: "ADMINISTRATION" },
  { id: "transport", label: "Transport", icon: Bus, group: "ADMINISTRATION" },
  { id: "live-tracking", label: "Live GPS Tracking", icon: Navigation, group: "ADMINISTRATION", badge: "LIVE" },
  { id: "leaves", label: "Leave & Approvals", icon: CheckCircle2, group: "ADMINISTRATION" },
  { id: "inventory", label: "Inventory", icon: PackageCheck, group: "ADMINISTRATION" },
  { id: "notices", label: "Notices", icon: Bell, group: "COMMUNICATION" },
  { id: "complaints", label: "Complaints", icon: MessageSquare, group: "COMMUNICATION" },
  { id: "reports", label: "Reports", icon: BarChart3, group: "REPORTS" },
  { id: "audit-logs", label: "Audit Logs", icon: ShieldAlert, group: "REPORTS" },
];

export default function PrincipalDashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("sms_authenticated_user") || "{}",
  );

  const [page, setPage] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pageTitle = NAV.find((n) => n.id === page)?.label || "Dashboard";
  
  // Prepare navigation items for RoleSidebar
  const navItems = NAV;

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <Overview setError={setError} setMessage={setMessage} />;
      case "students":
        return <Students setError={setError} setMessage={setMessage} />;
      case "teachers":
        return <Teachers setError={setError} setMessage={setMessage} />;
      case "accountants":
        return <Accountants setError={setError} setMessage={setMessage} schoolName={user.school?.name} />;
      case "finance":
        return <Finance setError={setError} setMessage={setMessage} />;
      case "notices":
        return <Notices setError={setError} setMessage={setMessage} />;
      case "complaints":
        return <Complaints setError={setError} setMessage={setMessage} />;
      case "leaves":
        return <Leaves setError={setError} setMessage={setMessage} />;
      case "transport":
        return <Transport setError={setError} setMessage={setMessage} />;
      case "live-tracking":
        return <LiveTracking setError={setError} setMessage={setMessage} />;
      case "academic-calendar":
        return <AcademicCalendar setError={setError} setMessage={setMessage} />;
      case "inventory":
        return <Inventory setError={setError} setMessage={setMessage} />;
      case "reports":
        return <Reports setError={setError} setMessage={setMessage} />;
      case "audit-logs":
        return <AuditLogs setError={setError} setMessage={setMessage} />;
      default:
        return <Overview setError={setError} setMessage={setMessage} />;
    }
  };

  return (
    <div className="platform-shell director-shell principal-role-shell">
      <RoleSidebar
        brandTitle={user.school?.name || "School ERP"}
        brandSubtitle="Principal Portal"
        brandIcon={School}
        navLabel="SCHOOL MANAGEMENT"
        navItems={navItems}
        currentPage={page}
        onNavigate={(pageId) => {
          setPage(pageId);
          setError("");
          setMessage("");
        }}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        user={user}
        userRole="Principal"
      />

      {mobileNav && (
        <button
          className="platform-nav-scrim"
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        />
      )}

      <main className="platform-main">
        <header className="platform-topbar">
          <button
            className="platform-menu-toggle"
            onClick={() => setMobileNav(true)}
          >
            <Menu />
          </button>

          <div>
            <span>PRINCIPAL WORKSPACE</span>
            <h1>{pageTitle}</h1>
          </div>

          <div className="platform-top-actions">
            <span className="platform-live">
              <i /> School Active
            </span>

            <button 
              className="superadmin-refresh" 
              onClick={() => {
                setError("");
                setMessage("");
                window.location.reload();
              }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
        </header>

        {(error || message) && (
          <div className={error ? "superadmin-error" : "superadmin-success"}>
            {error || message}

            <button
              onClick={() => {
                setError("");
                setMessage("");
              }}
            >
              <X size={15} />
            </button>
          </div>
        )}

        {renderPage()}
      </main>
    </div>
  );
}
