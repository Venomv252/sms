import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Routes, Route, useNavigate, useParams, Navigate, useLocation } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Building2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  RefreshCw,
  School,
  Users,
  X,
  Save,
} from "lucide-react";
import {
  apiGet,
  apiPatch,
  apiDelete,
  clearApiSession,
} from "../api.js";
import RoleSidebar from "../components/RoleSidebar.jsx";
import SchoolWorkspace from "./SchoolWorkspace.jsx";
import "./director.css";
import "./admin.css";
import "./director-theme.css";

const NAV = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard, group: "OVERVIEW", path: "/director/dashboard" },
  { id: "schools", label: "My schools", icon: Building2, group: "SCHOOL PORTFOLIO", path: "/director/schools" },
  { id: "statistics", label: "Statistics", icon: BarChart3, group: "SCHOOL PORTFOLIO", path: "/director/statistics" },
];

/**
 * Normalize school data to consistent property names
 * Backend returns inconsistent field names (studentCount vs students, etc.)
 */
function normalizeSchoolData(school) {
  if (!school) return null;
  
  return {
    id: school.id,
    name: school.name,
    code: school.code,
    address: school.address,
    createdAt: school.createdAt,
    // Standardize student count
    students: school.students ?? school.studentCount ?? 0,
    // Standardize user count
    users: school.users ?? school.userCount ?? 0,
    // Standardize staff count
    staff: school.staff ?? school.staffCount ?? 0,
    // Standardize teacher count
    teachers: school.teachers ?? school.teacherCount ?? 0,
    // Standardize notices
    activeNotices: school.activeNotices ?? school.noticeCount ?? 0,
    // Standardize attendance rate (can be null for no data)
    attendanceRate: school.attendanceRate ?? null,
  };
}

/**
 * Safe JSON parser for session storage
 */
function safeParseUser() {
  try {
    const stored = sessionStorage.getItem("sms_authenticated_user");
    if (!stored) return {};
    
    const parsed = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return {};
    
    return parsed;
  } catch (error) {
    console.error("Failed to parse user session:", error);
    // Clear corrupted session data
    sessionStorage.removeItem("sms_authenticated_user");
    return {};
  }
}

// Main Director Dashboard Component
function DirectorDashboardMain() {
  const user = safeParseUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cache to avoid re-fetching - PERFORMANCE OPTIMIZATION
  const [dataCache, setDataCache] = useState({ data: null, timestamp: null });
  const CACHE_DURATION = 30000; // 30 seconds
  
  // Track request to prevent race conditions
  const abortControllerRef = useRef(null);

  // Lazy load data - FIXED: Removed stale closures
  const load = useCallback(async (force = false) => {
    // Abort any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Check cache first
    const now = Date.now();
    if (!force && dataCache.data && dataCache.timestamp && (now - dataCache.timestamp) < CACHE_DURATION) {
      setOverview(dataCache.data);
      return;
    }

    setLoading(true);
    setError("");

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      // Use optimized dashboard stats endpoint
      const data = await apiGet("/platform/director/dashboard/stats");
      
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      // Normalize school data for consistency
      const normalizedData = {
        ...data,
        schools: (data.schools || []).map(normalizeSchoolData),
      };
      
      setOverview(normalizedData);
      setDataCache({ data: normalizedData, timestamp: Date.now() });
    } catch (e) {
      // Ignore abort errors
      if (e.name === 'AbortError') return;
      
      setError(e.message || "Unable to load your schools.");
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [dataCache.data, dataCache.timestamp]);

  useEffect(() => {
    load();
    
    // Cleanup: abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [location.pathname]);

  // Sync page state with actual route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/schools')) {
      setPage('schools');
    } else if (path.includes('/statistics')) {
      setPage('statistics');
    } else {
      setPage('dashboard');
    }
  }, [location.pathname]);

  const schools = overview?.schools || [];

  // Calculate totals with proper notices aggregation
  const totals = useMemo(
    () => ({
      students: overview?.overview?.totalStudents || 0,
      staff: overview?.overview?.totalStaff || 0,
      teachers: overview?.overview?.totalTeachers || 0,
      // Aggregate active notices from all schools
      notices: schools.reduce((sum, school) => sum + (school.activeNotices || 0), 0),
    }),
    [overview, schools],
  );

  const saveSchool = async (e) => {
    e.preventDefault();
    
    if (isSaving) return; // Prevent duplicate submissions

    setIsSaving(true);
    setError("");

    try {
      await apiPatch(`/platform/director/schools/${editing.id}`, {
        name: editing.name,
        code: editing.code,
        address: editing.address,
      });

      setEditing(null);
      setMessage("School information updated.");
      await load(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSchool = async (s) => {
    if (isDeleting) return; // Prevent duplicate deletions
    
    if (
      !window.confirm(
        `Delete ${s.name}? This is allowed only when the school has no users or notices.`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await apiDelete(`/platform/director/schools/${s.id}`);
      setMessage("School deleted.");
      await load(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const openSchool = (schoolId) => {
    navigate(`/director/schools/${schoolId}/overview`);
  };

  const pageTitle = NAV.find((n) => n.path === `/director/${page}`)?.label || "Overview";

  // Prepare navigation items for RoleSidebar
  const navItems = NAV.map(item => ({
    ...item,
    badge: item.id === "schools" ? schools.length : undefined,
  }));

  // Format numbers safely
  const formatNumber = (num) => {
    const value = Number(num || 0);
    return isNaN(value) ? 0 : value.toLocaleString("en-IN");
  };

  // Retry handler for error states
  const handleRetry = () => {
    setError("");
    load(true);
  };

  return (
    <div className="platform-shell director-shell director-role-shell">
      <RoleSidebar
        brandTitle="Greenwood High"
        brandSubtitle="School ERP Portal"
        brandIcon={Building2}
        navLabel="MY ORGANISATION"
        navItems={navItems}
        currentPage={page}
        onNavigate={(pageId) => {
          setPage(pageId);
          const item = NAV.find(n => n.id === pageId);
          if (item) navigate(item.path);
        }}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        user={user}
        userRole="Director"
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
            <span>DIRECTOR WORKSPACE</span>
            <h1>{pageTitle}</h1>
          </div>

          <div className="platform-top-actions superadmin-header-actions">
            <div className="superadmin-header-user">
              <span>{(user.firstName || "D").slice(0, 1)}{(user.lastName || "").slice(0, 1)}</span>
              <div><strong>{[user.firstName, user.lastName].filter(Boolean).join(" ") || "Director"}</strong><small>Director</small></div>
            </div>
            <button className="superadmin-refresh" type="button" onClick={() => load(true)} title="Refresh data" aria-label="Refresh data" disabled={loading}><RefreshCw size={15} /></button>
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

        <Routes>
          {/* Overview Route */}
          <Route path="dashboard" element={
            <>
              <section className="platform-page-intro">
                <div>
                  <h2>Welcome, {user.firstName || "Director"}</h2>
                  <p>
                    Manage your school portfolio, review operational summaries,
                    and open a school's management workspace.
                  </p>
                </div>
              </section>

              {loading && !overview ? (
                <>
                  {/* Skeleton KPI Cards */}
                  <section className="superadmin-overview superadmin-kpis">
                    <article className="skeleton-loading">
                      <Building2 />
                      <span>Schools</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Under your management</small>
                    </article>
                    <article className="skeleton-loading">
                      <GraduationCap />
                      <span>Students</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Across your schools</small>
                    </article>
                    <article className="skeleton-loading">
                      <Users />
                      <span>Teachers</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Teaching staff accounts</small>
                    </article>
                    <article className="skeleton-loading">
                      <Users />
                      <span>Staff accounts</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Total staff members</small>
                    </article>
                  </section>

                  {/* Skeleton Panel */}
                  <section className="superadmin-panel skeleton-loading">
                    <div className="superadmin-section-title">
                      <div>
                        <h2>
                          <School size={19} /> Your school portfolio
                        </h2>
                        <p>Open any school to access its operational workspace.</p>
                      </div>
                    </div>
                    <div className="network-grid">
                      {[1, 2, 3, 4].map((i) => (
                        <article className="network-card" key={i}>
                          <div className="network-card-top">
                            <div className="skeleton-icon"></div>
                            <div className="skeleton-content">
                              <div className="skeleton-line skeleton-line-title"></div>
                              <div className="skeleton-line skeleton-line-subtitle"></div>
                            </div>
                          </div>
                          <div className="skeleton-metrics">
                            <div className="skeleton-line"></div>
                            <div className="skeleton-line"></div>
                            <div className="skeleton-line"></div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </>
              ) : error && !overview ? (
                <section className="superadmin-panel">
                  <div className="superadmin-empty">
                    <p style={{ marginBottom: '16px' }}>Unable to load dashboard data.</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{error}</p>
                    <button onClick={handleRetry} style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      <RefreshCw size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      Retry
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  <section className="superadmin-overview superadmin-kpis">
                    <article>
                      <Building2 />
                      <span>Schools</span>
                      <strong>{schools.length}</strong>
                      <small>Under your management</small>
                    </article>

                    <article>
                      <GraduationCap />
                      <span>Students</span>
                      <strong>{formatNumber(totals.students)}</strong>
                      <small>Across your schools</small>
                    </article>

                    <article>
                      <Users />
                      <span>Teachers</span>
                      <strong>{formatNumber(totals.teachers)}</strong>
                      <small>Teaching staff accounts</small>
                    </article>

                    <article>
                      <Users />
                      <span>Staff accounts</span>
                      <strong>{formatNumber(totals.staff)}</strong>
                      <small>Total staff members</small>
                    </article>
                  </section>

                  <section className="superadmin-panel">
                    <div className="superadmin-section-title">
                      <div>
                        <h2>
                          <School size={19} /> Your school portfolio
                        </h2>
                        <p>Open any school to access its operational workspace.</p>
                      </div>

                      <button onClick={() => navigate("/director/schools")}>
                        Manage schools
                      </button>
                    </div>

                    {schools.length ? (
                      <div className="network-grid">
                        {schools.slice(0, 4).map((s) => (
                          <article className="network-card" key={s.id}>
                            <div className="network-card-top">
                              <div className="network-school-mark">
                                <School />
                              </div>

                              <div className="network-school-title">
                                <strong>{s.name}</strong>
                                <span>{s.code}</span>
                              </div>
                            </div>

                            <div className="network-metrics">
                              <div>
                                <span>Students</span>
                                <strong>{formatNumber(s.students)}</strong>
                              </div>

                              <div>
                                <span>Users</span>
                                <strong>{formatNumber(s.users)}</strong>
                              </div>

                              <div>
                                <span>Created</span>
                                <strong>
                                  {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : "—"}
                                </strong>
                              </div>
                            </div>

                            <button
                              className="director-open-school"
                              onClick={() => openSchool(s.id)}
                            >
                              Open school workspace <ArrowUpRight size={16} />
                            </button>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="superadmin-empty">
                        No schools have been assigned to your Director account yet.
                      </div>
                    )}
                  </section>
                </>
              )}
            </>
          } />

          {/* Schools Route */}
          <Route path="schools" element={
            <>
              {loading && !overview ? (
                <section className="superadmin-panel skeleton-loading">
                  <div className="superadmin-section-title">
                    <div>
                      <h2>
                        <Building2 size={19} /> Manage my schools
                      </h2>
                      <p>Loading schools...</p>
                    </div>
                  </div>
                  <div className="network-grid">
                    {[1, 2, 3, 4].map((i) => (
                      <article className="network-card" key={i}>
                        <div className="network-card-top">
                          <div className="skeleton-icon"></div>
                          <div className="skeleton-content">
                            <div className="skeleton-line skeleton-line-title"></div>
                            <div className="skeleton-line skeleton-line-subtitle"></div>
                          </div>
                        </div>
                        <div className="skeleton-metrics">
                          <div className="skeleton-line"></div>
                          <div className="skeleton-line"></div>
                          <div className="skeleton-line"></div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : error && !overview ? (
                <section className="superadmin-panel">
                  <div className="superadmin-empty">
                    <p style={{ marginBottom: '16px' }}>Unable to load schools.</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{error}</p>
                    <button onClick={handleRetry} style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      <RefreshCw size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      Retry
                    </button>
                  </div>
                </section>
              ) : (
                <section className="superadmin-panel">
                  <div className="superadmin-section-title">
                    <div>
                      <h2>
                        <Building2 size={19} /> Manage my schools
                      </h2>
                      <p>
                        View your assigned schools and open their management
                        workspaces.
                      </p>
                    </div>

                    <span className="superadmin-count">{schools.length} schools</span>
                  </div>

                  {schools.length ? (
                    <div className="network-grid">
                      {schools.map((s) => (
                        <article className="network-card" key={s.id}>
                          <div className="network-card-top">
                            <div className="network-school-mark">
                              <School />
                            </div>

                            <div className="network-school-title">
                              <strong>{s.name}</strong>
                              <span>
                                {s.code} · {s.address || "Address not added"}
                              </span>
                            </div>

                            <div className="network-actions">
                              <button
                                className="superadmin-icon-button"
                                title="Edit school"
                                disabled={isDeleting}
                                onClick={() =>
                                  setEditing({
                                    id: s.id,
                                    name: s.name,
                                    code: s.code,
                                    address: s.address || "",
                                  })
                                }
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                className="superadmin-icon-button danger"
                                title="Delete school"
                                disabled={isDeleting}
                                onClick={() => deleteSchool(s)}
                              >
                                <X size={15} />
                              </button>
                            </div>
                          </div>

                          <div className="network-metrics">
                            <div>
                              <span>Students</span>
                              <strong>{formatNumber(s.students)}</strong>
                            </div>

                            <div>
                              <span>Staff</span>
                              <strong>{formatNumber(s.staff)}</strong>
                            </div>

                            <div>
                              <span>Notices</span>
                              <strong>{formatNumber(s.activeNotices)}</strong>
                            </div>
                          </div>

                          <button
                            className="director-open-school"
                            onClick={() => openSchool(s.id)}
                            disabled={isDeleting}
                          >
                            Open school workspace <ArrowUpRight size={16} />
                          </button>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="superadmin-empty">
                      No schools have been assigned to your Director account yet.
                    </div>
                  )}
                </section>
              )}
            </>
          } />

          {/* Statistics Route */}
          <Route path="statistics" element={
            <>
              {loading && !overview ? (
                <>
                  <section className="superadmin-overview superadmin-kpis">
                    {[1, 2, 3, 4].map((i) => (
                      <article className="skeleton-loading" key={i}>
                        <Activity />
                        <span>Loading...</span>
                        <strong className="skeleton-text">--</strong>
                        <small>Please wait</small>
                      </article>
                    ))}
                  </section>
                  <section className="superadmin-panel skeleton-loading">
                    <div className="superadmin-section-title">
                      <div>
                        <h2>
                          <BarChart3 size={19} /> School comparison
                        </h2>
                        <p>Loading statistics...</p>
                      </div>
                    </div>
                  </section>
                </>
              ) : error && !overview ? (
                <section className="superadmin-panel">
                  <div className="superadmin-empty">
                    <p style={{ marginBottom: '16px' }}>Unable to load statistics.</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{error}</p>
                    <button onClick={handleRetry} style={{ padding: '8px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      <RefreshCw size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      Retry
                    </button>
                  </div>
                </section>
              ) : (
                <>
                  <section className="superadmin-overview superadmin-kpis">
                    <article>
                      <Building2 />
                      <span>Schools</span>
                      <strong>{schools.length}</strong>
                      <small>In your portfolio</small>
                    </article>

                    <article>
                      <GraduationCap />
                      <span>Students</span>
                      <strong>{formatNumber(totals.students)}</strong>
                      <small>Across all schools</small>
                    </article>

                    <article>
                      <Users />
                      <span>Staff</span>
                      <strong>{formatNumber(totals.staff)}</strong>
                      <small>Across all schools</small>
                    </article>

                    <article>
                      <Activity />
                      <span>Active notices</span>
                      <strong>{formatNumber(totals.notices)}</strong>
                      <small>Across all schools</small>
                    </article>
                  </section>

                  <section className="superadmin-panel">
                    <div className="superadmin-section-title">
                      <div>
                        <h2>
                          <BarChart3 size={19} /> School comparison
                        </h2>
                        <p>
                          High-level operational metrics. Individual student
                          performance is not shown here.
                        </p>
                      </div>
                    </div>

                    {schools.length ? (
                      <div className="platform-stat-table">
                        <div className="platform-stat-row heading">
                          <span>School</span>
                          <span>Students</span>
                          <span>Teachers</span>
                          <span>Attendance</span>
                        </div>

                        {schools.map((s) => (
                          <div className="platform-stat-row" key={s.id}>
                            <span>
                              <strong>{s.name}</strong>
                              <small>{s.code}</small>
                            </span>

                            <b>{formatNumber(s.students)}</b>
                            <b>{formatNumber(s.teachers)}</b>

                            <b>
                              {s.attendanceRate == null
                                ? "No data"
                                : `${s.attendanceRate}%`}
                            </b>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="superadmin-empty">
                        No schools available for comparison.
                      </div>
                    )}
                  </section>
                </>
              )}
            </>
          } />

          {/* School Workspace Route - Nested */}
          <Route path="schools/:schoolId/*" element={
            <SchoolWorkspaceRouter 
              schools={schools} 
              loading={loading} 
              error={error}
              onRetry={handleRetry}
            />
          } />

          {/* Default redirect to dashboard */}
          <Route path="*" element={<Navigate to="/director/dashboard" replace />} />
        </Routes>
      </main>

      {editing && (
        <div
          className="superadmin-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSaving) {
              setEditing(null);
            }
          }}
        >
          <form className="superadmin-modal" onSubmit={saveSchool}>
            <div className="superadmin-modal-heading">
              <h2>Edit school</h2>

              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => setEditing(null)}
                disabled={isSaving}
              >
                <X size={18} />
              </button>
            </div>

            <label>
              School name
              <input
                required
                disabled={isSaving}
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
            </label>

            <label>
              School code
              <input
                required
                minLength={3}
                maxLength={24}
                disabled={isSaving}
                value={editing.code}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />
            </label>

            <label>
              Address
              <textarea
                disabled={isSaving}
                value={editing.address}
                onChange={(e) =>
                  setEditing({ ...editing, address: e.target.value })
                }
              />
            </label>

            <button className="director-submit" disabled={isSaving}>
              <Save size={16} /> {isSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// School Workspace Router - handles nested routes for a specific school
function SchoolWorkspaceRouter({ schools, loading, error, onRetry }) {
  const { schoolId } = useParams();
  const navigate = useNavigate();

  // Show loading state while data is being fetched
  if (loading && schools.length === 0) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <RefreshCw className="sw-spin" size={24} style={{ marginBottom: '16px' }} />
        <h2>Loading school data...</h2>
        <p>Please wait while we fetch your school portfolio.</p>
      </div>
    );
  }

  // Show error state if data fetch failed
  if (error && schools.length === 0) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Unable to load schools</h2>
        <p style={{ color: '#6b7280', margin: '16px 0' }}>{error}</p>
        <button
          onClick={onRetry}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          Retry
        </button>
      </div>
    );
  }

  // Now check if school exists in loaded data
  const school = schools.find(s => s.id === schoolId);

  if (!school) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>School not found</h2>
        <p>This school is not in your portfolio.</p>
        <button
          onClick={() => navigate('/director/dashboard')}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="director-workspace">
      <header className="director-workspace-bar">
        <div>
          <span>DIRECTOR WORKSPACE</span>
          <strong>{school.name}</strong>
        </div>

        <button
          className="director-secondary"
          onClick={() => navigate('/director/dashboard')}
        >
          ← Director dashboard
        </button>

        <button
          className="director-logout"
          onClick={() => {
            clearApiSession();
            navigate("/login");
          }}
        >
          <LogOut size={16} /> Sign out
        </button>
      </header>

      <SchoolWorkspace
        school={school}
        onBack={() => navigate('/director/dashboard')}
      />
    </div>
  );
}

// Main export - wraps everything in Routes
export default function DirectorDashboard() {
  return (
    <Routes>
      <Route path="/*" element={<DirectorDashboardMain />} />
    </Routes>
  );
}
