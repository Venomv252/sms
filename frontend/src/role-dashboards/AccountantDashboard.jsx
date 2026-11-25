import React, { useState } from "react";
import {
  BarChart3,
  Bell,
  CircleDollarSign,
  CreditCard,
  DollarSign,
  FileText,
  LayoutDashboard,
  Menu,
  Percent,
  PieChart,
  Receipt,
  School,
  TrendingDown,
  TrendingUp,
  Users,
  UserPlus,
  UsersRound,
  Wallet,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearApiSession } from "../api.js";
import RoleSidebar from "../components/RoleSidebar.jsx";
import "./admin.css";
import "./platform-role-theme.css";
import "./director-theme.css";
import "./principal.css";

// Import Accountant pages
import AccountantOverview from "./accountant/pages/AccountantOverview.jsx";
import FeeCollection from "./accountant/pages/FeeCollection.jsx";
import FeeDefaulters from "./accountant/pages/FeeDefaulters.jsx";
import Concessions from "./accountant/pages/Concessions.jsx";
import FinanceReports from "./accountant/pages/FinanceReports.jsx";
import Transactions from "./accountant/pages/Transactions.jsx";
import StudentRegistration from "./accountant/pages/StudentRegistration.jsx";
import ParentRegistration from "./accountant/pages/ParentRegistration.jsx";
import StudentFeeManagement from "./accountant/pages/StudentFeeManagement.jsx";

const NAV = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, group: "OVERVIEW" },
  { id: "student-registration", label: "Register Student", icon: UserPlus, group: "USER MANAGEMENT" },
  { id: "parent-registration", label: "Register Parent", icon: UsersRound, group: "USER MANAGEMENT" },
  { id: "student-fees", label: "Student Fee Management", icon: CircleDollarSign, group: "FEE MANAGEMENT" },
  { id: "fee-collection", label: "Fee Collection", icon: DollarSign, group: "FEE MANAGEMENT" },
  { id: "defaulters", label: "Fee Defaulters", icon: TrendingDown, group: "FEE MANAGEMENT" },
  { id: "concessions", label: "Concessions & Discounts", icon: Percent, group: "FEE MANAGEMENT" },
  { id: "transactions", label: "Transaction History", icon: Receipt, group: "FINANCIAL" },
  { id: "reports", label: "Financial Reports", icon: BarChart3, group: "REPORTS" },
];

export default function AccountantDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(
    sessionStorage.getItem("sms_authenticated_user") || "{}",
  );

  const [page, setPage] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const pageTitle = NAV.find((n) => n.id === page)?.label || "Dashboard";
  
  // Prepare navigation items for RoleSidebar
  const navItems = NAV;

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <AccountantOverview setError={setError} setMessage={setMessage} />;
      case "student-registration":
        return <StudentRegistration setError={setError} setMessage={setMessage} />;
      case "parent-registration":
        return <ParentRegistration setError={setError} setMessage={setMessage} />;
      case "student-fees":
        return <StudentFeeManagement setError={setError} setMessage={setMessage} />;
      case "fee-collection":
        return <FeeCollection setError={setError} setMessage={setMessage} />;
      case "defaulters":
        return <FeeDefaulters setError={setError} setMessage={setMessage} />;
      case "concessions":
        return <Concessions setError={setError} setMessage={setMessage} />;
      case "transactions":
        return <Transactions setError={setError} setMessage={setMessage} />;
      case "reports":
        return <FinanceReports setError={setError} setMessage={setMessage} />;
      default:
        return <AccountantOverview setError={setError} setMessage={setMessage} />;
    }
  };

  return (
    <div className="platform-shell director-shell principal-role-shell accountant-role-shell">
      <RoleSidebar
        brandTitle={user.school?.name || "School ERP"}
        brandSubtitle="Accountant Portal"
        brandIcon={School}
        navLabel="FINANCE MANAGEMENT"
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
        userRole="Accountant"
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
            <span>ACCOUNTANT WORKSPACE</span>
            <h1>{pageTitle}</h1>
          </div>

          <div className="platform-top-actions">
            <span className="platform-live">
              <i /> Finance Active
            </span>
            
            <div className="platform-user-mini">
              <span>{user.firstName?.[0]}{user.lastName?.[0]}</span>
              <div>
                <strong>{user.firstName} {user.lastName}</strong>
                <small>Accountant</small>
              </div>
            </div>
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
