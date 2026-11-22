import React, { lazy, Suspense, useEffect, useState } from "react";
import LoginPage from "./components/LoginPage.jsx";
import StudentDashboardApp from "./StudentDashboardApp.jsx";
import ParentDashboardApp from "./parent-dashboard/ParentDashboardApp.jsx";
import { apiGet, clearApiSession, hasApiSession } from "./api.js";

// Load role dashboards only after authentication and role selection.
// Their CSS is global; eager imports caused dashboard styles to leak onto
// the login page even when the user was still anonymous.
const TeacherDashboard = lazy(
  () => import("./role-dashboards/teacher/App.jsx"),
);
const PrincipalDashboard = lazy(
  () => import("./role-dashboards/principal/App.jsx"),
);
const ManagementDashboard = lazy(
  () => import("./role-dashboards/management/App.jsx"),
);
const AccountantDashboard = lazy(
  () => import("./role-dashboards/accountant/App.jsx"),
);
const DriverDashboard = lazy(() => import("./role-dashboards/driver/App.jsx"));
const SuperAdminDashboard = lazy(
  () => import("./role-dashboards/SuperAdminDashboard.jsx"),
);
const DirectorDashboard = lazy(
  () => import("./role-dashboards/DirectorDashboard.jsx"),
);

const DASHBOARDS = {
  STUDENT: StudentDashboardApp,
  PARENT: ParentDashboardApp,
  TEACHER: TeacherDashboard,
  PRINCIPAL: PrincipalDashboard,
  MANAGEMENT: ManagementDashboard,
  ACCOUNTANT: AccountantDashboard,
  DRIVER: DriverDashboard,
  SUPER_ADMIN: SuperAdminDashboard,
  DIRECTOR: DirectorDashboard,
  ADMIN: SuperAdminDashboard, // compatibility for old sessions until they re-authenticate
};

export default function App() {
  const [authState, setAuthState] = useState(() =>
    hasApiSession() ? "checking" : "anonymous",
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    // api.js emits this event whenever the backend rejects a request because
    // the access token is missing, invalid, or expired.
    const handleSessionExpired = () => {
      if (!active) return;
      clearApiSession();
      setUser(null);
      setAuthState("anonymous");
    };

    window.addEventListener("sms:session-expired", handleSessionExpired);

    if (!hasApiSession()) {
      setAuthState("anonymous");
      return () => {
        active = false;
        window.removeEventListener("sms:session-expired", handleSessionExpired);
      };
    }

    apiGet("/auth/me")
      .then((currentUser) => {
        if (!active) return;
        setUser(currentUser);
        setAuthState("authenticated");
      })
      .catch(() => {
        if (!active) return;
        clearApiSession();
        setUser(null);
        setAuthState("anonymous");
      });

    return () => {
      active = false;
      window.removeEventListener("sms:session-expired", handleSessionExpired);
    };
  }, []);

  // Redirect at the token's actual expiry time, even if the user is idle
  // and no API request is made to discover the expired token.
  useEffect(() => {
    if (authState !== "authenticated") return undefined;

    const token = sessionStorage.getItem("sms_access_token");
    if (!token) {
      clearApiSession();
      setUser(null);
      setAuthState("anonymous");
      return undefined;
    }

    let timeoutId;

    try {
      const encodedPayload = token.split(".")[1];
      if (!encodedPayload) throw new Error("Invalid token");

      const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const expiresAt = Number(payload.exp) * 1000;
      const remainingMs = expiresAt - Date.now();

      if (!Number.isFinite(expiresAt) || remainingMs <= 0) {
        clearApiSession();
        setUser(null);
        setAuthState("anonymous");
        return undefined;
      }

      timeoutId = window.setTimeout(() => {
        clearApiSession();
        setUser(null);
        setAuthState("anonymous");
      }, remainingMs);
    } catch {
      // The backend remains authoritative. Invalid/malformed tokens are
      // rejected by /auth/me or the next API request and handled there.
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [authState]);

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser?.user || authenticatedUser);
    setAuthState("authenticated");
  };

  if (authState === "checking") {
    return (
      <div
        aria-label="Checking session"
        style={{ minHeight: "100vh", background: "#fff" }}
      />
    );
  }

  if (authState === "anonymous") {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const Dashboard = DASHBOARDS[user?.role];
  if (!Dashboard) {
    return (
      <div style={{ padding: 32 }}>
        This account does not have a configured dashboard.
      </div>
    );
  }

  // Student and parent apps are retained as before. Other role dashboards are
  // lazy-loaded so their styles cannot affect the login screen.
  if (user?.role === "STUDENT") return <StudentDashboardApp />;
  if (user?.role === "PARENT") return <ParentDashboardApp />;

  return (
    <Suspense
      fallback={
        <div
          aria-label="Loading dashboard"
          style={{ minHeight: "100vh", background: "#fff" }}
        />
      }
    >
      <Dashboard />
    </Suspense>
  );
}
