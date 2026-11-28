
import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage.jsx";
import StudentDashboardApp from "./StudentDashboardApp.jsx";
import UnderMaintenance from "./Undermaintence.jsx";

import { apiGet, clearApiSession, hasApiSession } from "./api.js";
import { TrackingProvider } from "./context/TrackingContext.jsx";

// Lazy-loaded dashboards that are currently active
const PrincipalDashboard = lazy(
  () => import("./role-dashboards/PrincipalDashboard.jsx")
);

const AccountantDashboard = lazy(
  () => import("./role-dashboards/AccountantDashboard.jsx")
);

const SuperAdminDashboard = lazy(
  () => import("./role-dashboards/SuperAdminDashboard.jsx")
);

const DirectorDashboard = lazy(
  () => import("./role-dashboards/DirectorDashboard.jsx")
);

// Role-based dashboard mapping
const DASHBOARDS = {
  STUDENT: StudentDashboardApp,
  PARENT: UnderMaintenance,
  TEACHER: UnderMaintenance,
  PRINCIPAL: PrincipalDashboard,
  MANAGEMENT: UnderMaintenance,
  ACCOUNTANT: AccountantDashboard,
  DRIVER: UnderMaintenance,
  SUPER_ADMIN: SuperAdminDashboard,
  DIRECTOR: DirectorDashboard,
  ADMIN: SuperAdminDashboard,
};

// Role-based route paths
const ROLE_ROUTES = {
  SUPER_ADMIN: "/superadmin/dashboard",
  DIRECTOR: "/director/dashboard",
  PRINCIPAL: "/principal/dashboard",
  TEACHER: "/teacher/dashboard",
  MANAGEMENT: "/management/dashboard",
  ACCOUNTANT: "/accountant/dashboard",
  DRIVER: "/driver/dashboard",
  STUDENT: "/student/dashboard",
  PARENT: "/parent/dashboard",
  ADMIN: "/superadmin/dashboard",
};

function AppContent() {
  const [authState, setAuthState] = useState(() =>
    hasApiSession() ? "checking" : "anonymous"
  );

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const handleSessionExpired = () => {
      if (!active) return;

      clearApiSession();
      setUser(null);
      setAuthState("anonymous");
      navigate("/login", { replace: true });
    };

    window.addEventListener(
      "sms:session-expired",
      handleSessionExpired
    );

    if (!hasApiSession()) {
      setAuthState("anonymous");

      return () => {
        active = false;
        window.removeEventListener(
          "sms:session-expired",
          handleSessionExpired
        );
      };
    }

    apiGet("/auth/me")
      .then((currentUser) => {
        if (!active) return;

        setUser(currentUser);
        setAuthState("authenticated");

        const currentPath = window.location.pathname;

        if (currentPath === "/" || currentPath === "/login") {
          const rolePath = ROLE_ROUTES[currentUser.role] || "/";
          navigate(rolePath, { replace: true });
        }
      })
      .catch(() => {
        if (!active) return;

        clearApiSession();
        setUser(null);
        setAuthState("anonymous");
        navigate("/login", { replace: true });
      });

    return () => {
      active = false;

      window.removeEventListener(
        "sms:session-expired",
        handleSessionExpired
      );
    };
  }, [navigate]);

  const handleLoginSuccess = (authenticatedUser) => {
    const userInfo = authenticatedUser?.user || authenticatedUser;

    setUser(userInfo);
    setAuthState("authenticated");

    const rolePath = ROLE_ROUTES[userInfo.role] || "/";

    navigate(rolePath, { replace: true });
  };

  // Session verification screen
  if (authState === "checking") {
    return (
      <div
        aria-label="Checking session"
        style={{
          minHeight: "100vh",
          background: "#fff",
        }}
      />
    );
  }

  // Unauthenticated users
  if (authState === "anonymous") {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage onLoginSuccess={handleLoginSuccess} />
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    );
  }

  // Verify dashboard configuration
  const Dashboard = DASHBOARDS[user?.role];

  if (!Dashboard) {
    return (
      <div style={{ padding: 32 }}>
        This account does not have a configured dashboard.
      </div>
    );
  }

  return (
    <TrackingProvider>
      <Suspense
        fallback={
          <div
            aria-label="Loading dashboard"
            style={{
              minHeight: "100vh",
              background: "#fff",
            }}
          />
        }
      >
        <Routes>
          {/* Super Admin */}
          <Route
            path="/superadmin/*"
            element={<SuperAdminDashboard />}
          />

          {/* Director */}
          <Route
            path="/director/*"
            element={<DirectorDashboard />}
          />

          {/* Principal */}
          <Route
            path="/principal/dashboard/*"
            element={<PrincipalDashboard />}
          />

          {/* Teacher - Under Maintenance */}
          <Route
            path="/teacher/dashboard/*"
            element={
              <UnderMaintenance serviceName="Teacher Portal" />
            }
          />

          {/* Management - Under Maintenance */}
          <Route
            path="/management/dashboard/*"
            element={
              <UnderMaintenance serviceName="Management Portal" />
            }
          />

          {/* Accountant */}
          <Route
            path="/accountant/dashboard/*"
            element={<AccountantDashboard />}
          />

          {/* Driver - Under Maintenance */}
          <Route
            path="/driver/dashboard/*"
            element={
              <UnderMaintenance serviceName="Driver Portal" />
            }
          />

          {/* Student */}
          <Route
            path="/student/dashboard/*"
            element={<StudentDashboardApp />}
          />

          {/* Parent - Under Maintenance */}
          <Route
            path="/parent/dashboard/*"
            element={
              <UnderMaintenance serviceName="Parent Portal" />
            }
          />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              <Navigate
                to={ROLE_ROUTES[user?.role] || "/login"}
                replace
              />
            }
          />

          {/* Unknown route */}
          <Route
            path="*"
            element={
              <Navigate
                to={ROLE_ROUTES[user?.role] || "/login"}
                replace
              />
            }
          />
        </Routes>
      </Suspense>
    </TrackingProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
