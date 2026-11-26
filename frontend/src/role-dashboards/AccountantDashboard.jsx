import React, { useState } from "react";
import {
  LayoutDashboard,
  Menu,
  School,
  UserPlus,
  UsersRound,
  CircleDollarSign,
  DollarSign,
  TrendingDown,
  Percent,
  Receipt,
  BarChart3,
  X,
  RefreshCw,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import RoleSidebar from "../components/RoleSidebar.jsx";
import "./admin.css";
import "./accountant-theme.css";

// Import Accountant pages
import AccountantOverview from "./accountant/pages/AccountantOverview.jsx";
import FeeCollection from "./accountant/pages/FeeCollection.jsx";
import FeeDefaulters from "./accountant/pages/FeeDefaulters.jsx";
import Concessions from "./accountant/pages/Concessions.jsx";
import FinanceReports from "./accountant/pages/FinanceReports.jsx";
import Transactions from "./accountant/pages/Transactions.jsx";
import StudentRegistration from "./accountant/pages/StudentRegistration.jsx";
import ParentRegistration from "./accountant/pages/ParentRegistration.jsx";
import TeacherRegistration from "./accountant/pages/TeacherRegistration.jsx";
import StaffRegistration from "./accountant/pages/StaffRegistration.jsx";
import StudentFeeManagement from "./accountant/pages/StudentFeeManagement.jsx";

const NAV = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, group: "OVERVIEW" },
  { id: "student-registration", label: "Register Student", icon: UserPlus, group: "USER MANAGEMENT" },
  { id: "parent-registration", label: "Register Parent", icon: UsersRound, group: "USER MANAGEMENT" },
  { id: "teacher-registration", label: "Register Teacher", icon: GraduationCap, group: "USER MANAGEMENT" },
  { id: "staff-registration", label: "Register Staff", icon: Briefcase, group: "USER MANAGEMENT" },
  { id: "student-fees", label: "Student Fee Management", icon: CircleDollarSign, group: "FEE MANAGEMENT" },
  { id: "fee-collection", label: "Fee Collection", icon: DollarSign, group: "FEE MANAGEMENT" },
  { id: "defaulters", label: "Fee Defaulters", icon: TrendingDown, group: "FEE MANAGEMENT" },
  { id: "concessions", label: "Concessions & Discounts", icon: Percent, group: "FEE MANAGEMENT" },
  { id: "transactions", label: "Transaction History", icon: Receipt, group: "FINANCIAL" },
  { id: "reports", label: "Financial Reports", icon: BarChart3, group: "REPORTS" },
];

export default function AccountantDashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("sms_authenticated_user") || "{}",
  );

  const [page, setPage] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pageTitle = NAV.find((item) => item.id === page)?.label || "Dashboard";
  const navItems = NAV;
  const firstName = String(user.firstName || "").trim();
  const lastName = String(user.lastName || "").trim();
  const cleanLastName = /^[.\s]+$/.test(lastName) ? "" : lastName;
  const displayName =
    String(user.name || "").trim() ||
    [firstName, cleanLastName].filter(Boolean).join(" ") ||
    "Accountant";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const handleNavigate = (pageId) => {
    setPage(pageId);
    setError("");
    setMessage("");
    setMobileNav(false);
  };

  const renderPage = () => {
    const pageProps = { setError, setMessage };

    switch (page) {
      case "student-registration":
        return <StudentRegistration {...pageProps} />;
      case "parent-registration":
        return <ParentRegistration {...pageProps} />;
      case "teacher-registration":
        return <TeacherRegistration {...pageProps} />;
      case "staff-registration":
        return <StaffRegistration {...pageProps} />;
      case "student-fees":
        return <StudentFeeManagement {...pageProps} />;
      case "fee-collection":
        return <FeeCollection {...pageProps} />;
      case "defaulters":
        return <FeeDefaulters {...pageProps} />;
      case "concessions":
        return <Concessions {...pageProps} />;
      case "transactions":
        return <Transactions {...pageProps} />;
      case "reports":
        return <FinanceReports {...pageProps} />;
      case "overview":
      default:
        return <AccountantOverview {...pageProps} />;
    }
  };

  return (
    <div className="platform-shell accountant-role-shell">
      <RoleSidebar
        brandTitle={user.school?.name || "School ERP"}
        brandSubtitle="Accountant Portal"
        brandIcon={School}
        navLabel="FINANCE MANAGEMENT"
        navItems={navItems}
        currentPage={page}
        onNavigate={handleNavigate}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        user={user}
        userRole="Accountant"
      />

      {mobileNav && (
        <button
          className="platform-nav-scrim"
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileNav(false)}
        />
      )}

      <main className="platform-main">
        <header className="platform-topbar">
          <button
            className="platform-menu-toggle"
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileNav(true)}
          >
            <Menu />
          </button>

          <div className="accountant-page-heading">
            <span>ACCOUNTANT WORKSPACE</span>
            <h1>{pageTitle}</h1>
          </div>

          <div className="platform-top-actions">
            <div className="platform-user-mini">
              <span aria-hidden="true">{initials || "A"}</span>
              <div className="platform-user-details">
                <strong>{displayName}</strong>
                <small>Accountant</small>
              </div>
            </div>

            <button
              className="superadmin-refresh"
              type="button"
              onClick={() => window.location.reload()}
              title="Refresh dashboard"
              aria-label="Refresh dashboard"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </header>

        {(error || message) && (
          <div className={error ? "superadmin-error" : "superadmin-success"} role="alert">
            <span>{error || message}</span>
            <button
              type="button"
              aria-label="Dismiss message"
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
