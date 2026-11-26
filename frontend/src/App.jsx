import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import StudentDashboardApp from "./StudentDashboardApp.jsx";
import ParentDashboardApp from "./parent-dashboard/ParentDashboardApp.jsx";
import { apiGet, clearApiSession, hasApiSession } from "./api.js";
import { TrackingProvider } from "./context/TrackingContext.jsx";

// Load role dashboards only after authentication and role selection.
// Their CSS is global; eager imports caused dashboard styles to leak onto
// the login page even when the user was still anonymous.
const TeacherDashboard = lazy(
  () => import("./role-dashboards/teacher/App.jsx"),
);
const PrincipalDashboard = lazy(
  () => import("./role-dashboards/PrincipalDashboard.jsx"),
);
const ManagementDashboard = lazy(
  () => import("./role-dashboards/management/App.jsx"),
);
const AccountantDashboard = lazy(
  () => import("./role-dashboards/AccountantDashboard.jsx"),
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
  ADMIN: "/superadmin/dashboard", // compatibility
};

function AppContent() {
  const [authState, setAuthState] = useState(() =>
    hasApiSession() ? "checking" : "anonymous",
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    // api.js emits this event whenever the backend rejects a request because
    // the access token is missing, invalid, or expired.
    const handleSessionExpired = () => {
      if (!active) return;
      clearApiSession();
      setUser(null);
      setAuthState("anonymous");
      navigate("/login");
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
        
        // Redirect to role-specific dashboard if on root or login page
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
        navigate("/login");
      });

    return () => {
      active = false;
      window.removeEventListener("sms:session-expired", handleSessionExpired);
    };
  }, [navigate]);

  // Redirect at the token's actual expiry time, even if the user is idle
  // and no API request is made to discover the expired token.
  useEffect(() => {
    if (authState !== "authenticated") return undefined;

    const token = sessionStorage.getItem("sms_access_token");
    if (!token) {
      clearApiSession();
      setUser(null);
      setAuthState("anonymous");
      navigate("/login");
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
        navigate("/login");
        return undefined;
      }

      timeoutId = window.setTimeout(() => {
        clearApiSession();
        setUser(null);
        setAuthState("anonymous");
        navigate("/login");
      }, remainingMs);
    } catch {
      // The backend remains authoritative. Invalid/malformed tokens are
      // rejected by /auth/me or the next API request and handled there.
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [authState, navigate]);

  const handleLoginSuccess = (authenticatedUser) => {
    const userInfo = authenticatedUser?.user || authenticatedUser;
    setUser(userInfo);
    setAuthState("authenticated");
    
    // Navigate to role-specific dashboard after login
    const rolePath = ROLE_ROUTES[userInfo.role] || "/";
    navigate(rolePath, { replace: true });
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
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

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
            style={{ minHeight: "100vh", background: "#fff" }}
          />
        }
      >
        <Routes>
          {/* Super Admin routes - nested */}
          <Route path="/superadmin/*" element={<SuperAdminDashboard />} />
          
          {/* Director routes - nested */}
          <Route path="/director/*" element={<DirectorDashboard />} />
          
          {/* Principal routes */}
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          
          {/* Teacher routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          
          {/* Management routes */}
          <Route path="/management/dashboard" element={<ManagementDashboard />} />
          
          {/* Accountant routes */}
          <Route path="/accountant/dashboard" element={<AccountantDashboard />} />
          
          {/* Driver routes */}
          <Route path="/driver/dashboard" element={<DriverDashboard />} />
          
          {/* Student routes - nested with wildcard */}
          <Route path="/student/dashboard/*" element={<StudentDashboardApp />} />
          
          {/* Parent routes */}
          <Route path="/parent/dashboard" element={<ParentDashboardApp />} />
          
          {/* Redirect root to role-specific dashboard */}
          <Route 
            path="/" 
            element={<Navigate to={ROLE_ROUTES[user?.role] || "/login"} replace />} 
          />
          
          {/* Catch-all: redirect to role dashboard */}
          <Route 
            path="*" 
            element={<Navigate to={ROLE_ROUTES[user?.role] || "/login"} replace />} 
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
