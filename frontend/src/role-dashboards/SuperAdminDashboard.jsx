import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Bell,
  Settings,
  School,
  ShieldCheck,
  Trash2,
  UserRound,
  Users,
  X,
  Save,
} from "lucide-react";
import {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  clearApiSession,
} from "../api.js";
import CredentialDisplay from "../components/CredentialDisplay.jsx";
import SuperAdminDeleteConfirmation from "../components/SuperAdminDeleteConfirmation.jsx";
import "./admin.css";
import "./platform-role-theme.css";
import "./superadmin-zip-theme.css";

const EMPTY_SCHOOL = { name: "", code: "", address: "" };
const EMPTY_DIRECTOR = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  schoolIds: [],
};
const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
const NAV = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard, group: "PLATFORM", path: "/superadmin/dashboard" },
  { id: "schools", label: "Schools", icon: Building2, group: "INSTITUTIONS", path: "/superadmin/schools" },
  { id: "directors", label: "Directors", icon: Users, group: "INSTITUTIONS", path: "/superadmin/directors" },
  { id: "statistics", label: "Platform statistics", icon: BarChart3, group: "OVERSIGHT", path: "/superadmin/statistics" },
  { id: "health", label: "System health", icon: Activity, group: "OVERSIGHT", path: "/superadmin/health" },
];

export default function SuperAdminDashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("sms_authenticated_user") || "{}",
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [globalSearch, setGlobalSearch] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [schools, setSchools] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [directorForm, setDirectorForm] = useState(EMPTY_DIRECTOR);
  const [schoolForm, setSchoolForm] = useState(EMPTY_SCHOOL);
  const [saving, setSaving] = useState(false);
  const [savingSchool, setSavingSchool] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [editingDirector, setEditingDirector] = useState(null);
  const [directorSchoolSearch, setDirectorSchoolSearch] = useState("");
  const [editDirectorSchoolSearch, setEditDirectorSchoolSearch] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  
  // Cache to avoid re-fetching - PERFORMANCE OPTIMIZATION
  const [dataCache, setDataCache] = useState({ schools: null, directors: null, timestamp: null });
  const CACHE_DURATION = 30000; // 30 seconds
  
  // Determine current page from route
  const currentPath = location.pathname;
  const currentPage = currentPath.split('/').pop() || 'dashboard';
  
  // Lazy load data based on current route - PERFORMANCE OPTIMIZATION
  const loadData = useCallback(async (force = false) => {
    const page = location.pathname.split('/').pop();
    
    // Check cache first
    const now = Date.now();
    if (!force && dataCache.timestamp && (now - dataCache.timestamp) < CACHE_DURATION) {
      // Use cached data
      if (dataCache.schools) setSchools(dataCache.schools);
      if (dataCache.directors) setDirectors(dataCache.directors);
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      // Only load what's needed for current page
      if (page === 'dashboard') {
        // Dashboard needs both for overview
        const [s, d] = await Promise.all([
          apiGet("/platform/schools"),
          apiGet("/platform/directors"),
        ]);
        setSchools(s || []);
        setDirectors(d || []);
        setDataCache({ schools: s || [], directors: d || [], timestamp: Date.now() });
      } else if (page === 'schools' || page === 'directors' || page === 'statistics') {
        // These pages need both for assignments and stats
        const [s, d] = await Promise.all([
          apiGet("/platform/schools"),
          apiGet("/platform/directors"),
        ]);
        setSchools(s || []);
        setDirectors(d || []);
        setDataCache({ schools: s || [], directors: d || [], timestamp: Date.now() });
      } else if (page === 'health') {
        // Health page doesn't need data
        setLoading(false);
        return;
      }
    } catch (e) {
      setError(e.message || "Unable to load platform data.");
    } finally {
      setLoading(false);
    }
  }, [location.pathname, dataCache]);
  
  useEffect(() => {
    loadData();
  }, [location.pathname]); // Only reload when route changes
  const totals = useMemo(
    () =>
      schools.reduce(
        (a, s) => ({
          students: a.students + Number(s.studentCount || 0),
          collected: a.collected + Number(s.revenue?.collected || 0),
          pending: a.pending + Number(s.revenue?.pending || 0),
          users: a.users + Number(s.userCount || 0),
        }),
        { students: 0, collected: 0, pending: 0, users: 0 },
      ),
    [schools],
  );
  const globalFilteredSchools = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return schools;
    return schools.filter((s) => `${s.name || ""} ${s.code || ""} ${s.address || ""}`.toLowerCase().includes(query));
  }, [schools, globalSearch]);
  const globalFilteredDirectors = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    if (!query) return directors;
    return directors.filter((d) => `${d.firstName || ""} ${d.lastName || ""} ${d.username || ""} ${d.email || ""}`.toLowerCase().includes(query));
  }, [directors, globalSearch]);
  const filteredDirectorSchools = useMemo(() => {
    const query = directorSchoolSearch.trim().toLowerCase();
    if (!query) return schools;
    return schools.filter((s) =>
      `${s.name || ""} ${s.code || ""} ${s.address || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [schools, directorSchoolSearch]);
  const filteredEditDirectorSchools = useMemo(() => {
    const query = editDirectorSchoolSearch.trim().toLowerCase();
    if (!query) return schools;
    return schools.filter((s) =>
      `${s.name || ""} ${s.code || ""} ${s.address || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [schools, editDirectorSchoolSearch]);
  const createSchool = async (e) => {
    e.preventDefault();
    setSavingSchool(true);
    setError("");
    try {
      await apiPost("/platform/schools", {
        name: schoolForm.name.trim(),
        code: schoolForm.code.trim().toUpperCase(),
        address: schoolForm.address.trim(),
      });
      setSchoolForm(EMPTY_SCHOOL);
      setMessage(
        "School created successfully. You can now assign it to a Director.",
      );
      await loadData(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message || "Unable to create school.");
    } finally {
      setSavingSchool(false);
    }
  };
  const createDirector = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = {
        firstName: directorForm.firstName,
        lastName: directorForm.lastName,
        email: directorForm.email,
        username: directorForm.username,
        temporaryPassword: directorForm.password,
        schoolIds: directorForm.schoolIds,
      };
      
      const response = await apiPost("/platform/directors", payload);
      
      // Show credentials modal if credentials were returned
      if (response.credentials) {
        // Get school names for selected school IDs
        const selectedSchools = schools
          .filter(s => directorForm.schoolIds.includes(s.id))
          .map(s => s.name);
        
        setCreatedCredentials({
          username: response.credentials.username,
          password: response.credentials.password,
          role: "Director",
          name: `${directorForm.firstName} ${directorForm.lastName}`,
          email: directorForm.email,
          schools: selectedSchools,
        });
      }
      
      setDirectorForm(EMPTY_DIRECTOR);
      setDirectorSchoolSearch("");
      setMessage("Director account created successfully.");
      await loadData(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
  const saveSchool = async (e) => {
    e.preventDefault();
    try {
      await apiPatch(`/platform/schools/${editingSchool.id}`, {
        name: editingSchool.name,
        code: editingSchool.code,
        address: editingSchool.address,
      });
      setEditingSchool(null);
      setMessage("School updated.");
      await loadData(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteSchool = (s) => {
    setError("");
    setMessage("");
    setDeleteConfirmation({ type: "school", item: s });
  };
  const saveDirector = async (e) => {
    e.preventDefault();
    try {
      await apiPatch(`/platform/directors/${editingDirector.id}`, {
        firstName: editingDirector.firstName,
        lastName: editingDirector.lastName,
        username: editingDirector.username,
        email: editingDirector.email,
        schoolIds:
          editingDirector.schoolIds ??
          editingDirector.ownedSchools?.map((x) => x.schoolId) ??
          [],
      });
      setEditingDirector(null);
      setMessage("Director updated.");
      await loadData(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteDirector = (d) => {
    setError("");
    setMessage("");
    setDeleteConfirmation({ type: "director", item: d });
  };
  const confirmDelete = async () => {
    if (!deleteConfirmation || deletingRecord) return;
    const { type, item } = deleteConfirmation;
    const endpoint =
      type === "school"
        ? `/platform/schools/${item.id}`
        : `/platform/directors/${item.id}`;
    setDeletingRecord(true);
    setError("");
    setMessage("");
    try {
      await apiDelete(endpoint);
      setDeleteConfirmation(null);
      setMessage(
        type === "school"
          ? "School deleted successfully."
          : "Director deleted successfully.",
      );
      await loadData(true); // Force refresh, bypass cache
    } catch (err) {
      setError(err.message || `Unable to delete ${type}.`);
    } finally {
      setDeletingRecord(false);
    }
  };
  const schoolCards = (
    <div className="network-grid">
      {globalFilteredSchools.map((s) => (
        <article className="network-card" key={s.id}>
          <div className="network-card-top">
            <div className="network-school-mark">
              <School size={20} />
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
                title="Edit"
                onClick={() =>
                  setEditingSchool({
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
                title="Delete"
                onClick={() => deleteSchool(s)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
          <div className="network-metrics">
            <div>
              <span>Students</span>
              <strong>
                {Number(s.studentCount || 0).toLocaleString("en-IN")}
              </strong>
            </div>
            <div>
              <span>Fees collected</span>
              <strong>{money(s.revenue?.collected)}</strong>
            </div>
            <div>
              <span>Pending fees</span>
              <strong>{money(s.revenue?.pending)}</strong>
            </div>
          </div>
          <div className="network-director">
            <span>DIRECTOR</span>
            <strong>
              {s.directors?.length
                ? s.directors
                    .map((d) => `${d.firstName} ${d.lastName}`)
                    .join(", ")
                : "Not assigned"}
            </strong>
          </div>
          <div className="network-card-foot">
            <span>
              Added {new Date(s.createdAt).toLocaleDateString("en-IN")}
            </span>
            <span>{s.userCount || 0} user accounts</span>
          </div>
        </article>
      ))}
    </div>
  );
  const directorCards = (
    <div className="superadmin-director-list director-management-list">
      {globalFilteredDirectors.map((d) => (
        <article key={d.id}>
          {editingDirector?.id === d.id ? (
            <form className="director-edit-form" onSubmit={saveDirector}>
              <input
                aria-label="First name"
                required
                value={editingDirector.firstName}
                onChange={(e) =>
                  setEditingDirector({
                    ...editingDirector,
                    firstName: e.target.value,
                  })
                }
              />
              <input
                aria-label="Last name"
                required
                value={editingDirector.lastName}
                onChange={(e) =>
                  setEditingDirector({
                    ...editingDirector,
                    lastName: e.target.value,
                  })
                }
              />
              <input
                aria-label="Username"
                required
                value={editingDirector.username}
                onChange={(e) =>
                  setEditingDirector({
                    ...editingDirector,
                    username: e.target.value,
                  })
                }
              />
              <input
                aria-label="Email"
                required
                type="email"
                value={editingDirector.email}
                onChange={(e) =>
                  setEditingDirector({
                    ...editingDirector,
                    email: e.target.value,
                  })
                }
              />
              <div
                className="director-edit-assignments"
                aria-label="Assigned schools"
              >
                <input
                  className="school-assignment-search"
                  type="search"
                  placeholder="Search schools by name or code…"
                  aria-label="Search schools to assign"
                  value={editDirectorSchoolSearch}
                  onChange={(e) => setEditDirectorSchoolSearch(e.target.value)}
                />
                <div className="school-assignment-results">
                  {filteredEditDirectorSchools.map((s) => (
                    <label key={s.id}>
                      <input
                        type="checkbox"
                        checked={(
                          editingDirector.schoolIds ??
                          editingDirector.ownedSchools?.map(
                            (x) => x.schoolId,
                          ) ??
                          []
                        ).includes(s.id)}
                        onChange={(e) =>
                          setEditingDirector((current) => {
                            const ids =
                              current.schoolIds ??
                              current.ownedSchools?.map((x) => x.schoolId) ??
                              [];
                            return {
                              ...current,
                              schoolIds: e.target.checked
                                ? [...ids, s.id]
                                : ids.filter((id) => id !== s.id),
                            };
                          })
                        }
                      />
                      <span>
                        {s.name}
                        <small>{s.code}</small>
                      </span>
                    </label>
                  ))}
                  {filteredEditDirectorSchools.length === 0 && (
                    <small className="school-assignment-empty">
                      No schools match your search.
                    </small>
                  )}
                </div>
              </div>
              <button className="superadmin-icon-button">
                <Save size={15} />
              </button>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => setEditingDirector(null)}
              >
                <X size={15} />
              </button>
            </form>
          ) : (
            <>
              <div className="director-avatar">
                {d.firstName?.[0]}
                {d.lastName?.[0]}
              </div>
              <div className="superadmin-director-info">
                <strong>
                  {d.firstName} {d.lastName}
                </strong>
                <span>
                  @{d.username} · {d.email}
                </span>
                <small>
                  {d.ownedSchools?.length || 0} assigned schools:{" "}
                  {d.ownedSchools?.map((x) => x.school.name).join(", ") ||
                    "No school assigned"}
                </small>
              </div>
              <div className="superadmin-school-actions">
                <button
                  className="superadmin-icon-button"
                  title="Edit"
                  onClick={() => {
                    setEditDirectorSchoolSearch("");
                    setEditingDirector({
                      ...d,
                      schoolIds: d.ownedSchools?.map((x) => x.schoolId) || [],
                    });
                  }}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="superadmin-icon-button danger"
                  title="Delete"
                  onClick={() => deleteDirector(d)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
  
  const pageTitle = NAV.find((x) => x.path === currentPath)?.label || "Overview";

  return (
    <div className="platform-shell superadmin-role-shell">
      <aside className={`platform-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="platform-brand">
          <div className="platform-brand-icon">
            <ShieldCheck />
          </div>
          <div>
            <strong>SchoolERP</strong>
            <small>Super Admin Portal</small>
          </div>
          <button
            className="platform-close-nav"
            onClick={() => setMobileNav(false)}
          >
            <X />
          </button>
        </div>
        <div className="platform-nav-label">MAIN NAVIGATION</div>
        <nav>
          {NAV.map((item, index) => (
            <React.Fragment key={item.id}>
              {(index === 0 || NAV[index - 1].group !== item.group) && (
                <div className="platform-nav-group-label">{item.group}</div>
              )}
              <button
                className={currentPath === item.path ? "active" : ""}
                onClick={() => {
                  navigate(item.path);
                  setMobileNav(false);
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.id === "schools" && <em>{schools.length}</em>}
              </button>
            </React.Fragment>
          ))}
        </nav>
        <div className="platform-sidebar-bottom">
          <div className="platform-user">
            <div className="platform-user-avatar">
              {(user.firstName || "S").slice(0, 1)}
            </div>
            <div>
              <strong>{user.firstName || "Super Admin"}</strong>
              <small>Super Administrator</small>
            </div>
          </div>
          <button
            className="platform-signout"
            onClick={() => {
              clearApiSession();
              location.reload();
            }}
          >
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>
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
            <span>SUPER ADMIN PORTAL</span>
            <h1>{pageTitle}</h1>
          </div>
          <div className="superadmin-header-search">
            <Search size={16} />
            <input type="search" aria-label="Search schools and directors" placeholder="Search schools, directors…" value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
          </div>
          <div className="platform-top-actions superadmin-header-actions">
            <span className="platform-live"><i /> Live workspace</span>
            <button className="superadmin-header-icon" type="button" title="Notifications" aria-label="Notifications"><Bell size={18} /></button>
            <button className="superadmin-header-icon" type="button" title="Settings" aria-label="Settings"><Settings size={18} /></button>
            <div className="superadmin-header-user">
              <span>{(user.firstName || "S").slice(0, 1)}{(user.lastName || "").slice(0, 1)}</span>
              <div><strong>{[user.firstName, user.lastName].filter(Boolean).join(" ") || "Super Admin"}</strong><small>Super Administrator</small></div>
            </div>
            <button className="superadmin-refresh" onClick={() => loadData(true)} title="Refresh data" aria-label="Refresh data"><RefreshCw size={15} /></button>
          </div>
        </header>
        {(error || message) && (
          <div
            className={error ? "superadmin-error" : "superadmin-success"}
            role="status"
          >
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
        {loading && (
          <div className="superadmin-loading">Loading platform data…</div>
        )}
        
        <Routes>
          {/* Overview/Dashboard Route */}
          <Route path="dashboard" element={
            <>
              <section className="platform-page-intro">
                <div>
                  <h2>Welcome back, {user.firstName || "Super Admin"}</h2>
                  <p>
                    Your platform at a glance. Use the navigation to manage
                    schools, Directors, and platform performance.
                  </p>
                </div>
              </section>
              <section className="superadmin-overview superadmin-kpis">
                <article>
                  <Building2 />
                  <span>Schools</span>
                  <strong>{schools.length}</strong>
                  <small>Registered institutions</small>
                </article>
                <article>
                  <UserRound />
                  <span>Directors</span>
                  <strong>{directors.length}</strong>
                  <small>Platform accounts</small>
                </article>
                <article>
                  <GraduationCap />
                  <span>Total students</span>
                  <strong>{totals.students.toLocaleString("en-IN")}</strong>
                  <small>Across all schools</small>
                </article>
                <article>
                  <CircleDollarSign />
                  <span>Fees collected</span>
                  <strong>{money(totals.collected)}</strong>
                  <small>Recorded as paid</small>
                </article>
              </section>
              <div className="platform-overview-grid">
                <section className="superadmin-panel">
                  <div className="superadmin-section-title">
                    <div>
                      <h2>
                        <Building2 size={19} /> School network
                      </h2>
                      <p>High-level portfolio summary</p>
                    </div>
                    <button onClick={() => navigate("/superadmin/schools")}>View all</button>
                  </div>
                  {schools.slice(0, 4).map((s) => (
                    <div className="platform-compact-row" key={s.id}>
                      <div className="network-school-mark">
                        <School size={18} />
                      </div>
                      <div>
                        <strong>{s.name}</strong>
                        <small>
                          {s.code} ·{" "}
                          {s.directors?.[0]
                            ? `${s.directors[0].firstName} ${s.directors[0].lastName}`
                            : "No Director"}
                        </small>
                      </div>
                      <b>{s.studentCount || 0} students</b>
                    </div>
                  ))}
                  {!schools.length && (
                    <div className="superadmin-empty">No schools registered.</div>
                  )}
                </section>
                <section className="superadmin-panel">
                  <div className="superadmin-section-title">
                    <div>
                      <h2>
                        <Users size={19} /> Director summary
                      </h2>
                      <p>People managing your school network</p>
                    </div>
                    <button onClick={() => navigate("/superadmin/directors")}>Manage</button>
                  </div>
                  {directors.slice(0, 4).map((d) => (
                    <div className="platform-compact-row" key={d.id}>
                      <div className="director-avatar">
                        {d.firstName?.[0]}
                        {d.lastName?.[0]}
                      </div>
                      <div>
                        <strong>
                          {d.firstName} {d.lastName}
                        </strong>
                        <small>@{d.username}</small>
                      </div>
                      <b>{d.ownedSchools?.length || 0} schools</b>
                    </div>
                  ))}
                  {!directors.length && (
                    <div className="superadmin-empty">No Directors created.</div>
                  )}
                </section>
              </div>
            </>
          } />
          
          {/* Schools Route */}
          <Route path="schools" element={
          <>
            <section className="superadmin-panel">
              <div className="superadmin-section-title">
                <div>
                  <h2>
                    <Plus size={19} /> Create a school
                  </h2>
                  <p>
                    Register a school on the platform. You can assign it to a
                    Director after creation.
                  </p>
                </div>
              </div>
              <form
                className="director-create-grid school-create-grid"
                onSubmit={createSchool}
              >
                <label>
                  School name
                  <input
                    required
                    maxLength={120}
                    value={schoolForm.name}
                    onChange={(e) =>
                      setSchoolForm({ ...schoolForm, name: e.target.value })
                    }
                    placeholder="e.g. Greenwood International School"
                  />
                </label>
                <label>
                  School code
                  <input
                    required
                    minLength={3}
                    maxLength={24}
                    pattern="[A-Za-z0-9_-]+"
                    value={schoolForm.code}
                    onChange={(e) =>
                      setSchoolForm({
                        ...schoolForm,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="e.g. GREENWOOD"
                  />
                </label>
                <label className="school-address-field">
                  Address <span className="optional-label">(optional)</span>
                  <input
                    value={schoolForm.address}
                    onChange={(e) =>
                      setSchoolForm({ ...schoolForm, address: e.target.value })
                    }
                    placeholder="City, state, country"
                  />
                </label>
                <button className="director-submit" disabled={savingSchool}>
                  <Plus size={16} />
                  {savingSchool ? "Creating…" : "Create School"}
                </button>
              </form>
            </section>
            <section className="superadmin-panel">
              <div className="superadmin-section-title">
                <div>
                  <h2>
                    <Building2 size={19} /> School management
                  </h2>
                  <p>
                    Review school-level summaries, update school information, or
                    remove eligible empty schools.
                  </p>
                </div>
                <span className="superadmin-count">
                  {schools.length} schools
                </span>
              </div>
              {schools.length ? (
                schoolCards
              ) : (
                <div className="superadmin-empty">
                  No schools registered yet. Create your first school above.
                </div>
              )}
            </section>
          </>
          } />
          
          {/* Directors Route */}
          <Route path="directors" element={
          <>
            <section className="superadmin-panel">
              <div className="superadmin-section-title">
                <div>
                  <h2>
                    <Plus size={19} /> Create a Director
                  </h2>
                  <p>
                    Create platform-level access for a person responsible for
                    one or more schools.
                  </p>
                </div>
              </div>
              <form className="director-create-grid" onSubmit={createDirector}>
                <label>
                  First name
                  <input
                    required
                    value={directorForm.firstName}
                    onChange={(e) =>
                      setDirectorForm({
                        ...directorForm,
                        firstName: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    value={directorForm.lastName}
                    onChange={(e) =>
                      setDirectorForm({
                        ...directorForm,
                        lastName: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    value={directorForm.email}
                    onChange={(e) =>
                      setDirectorForm({
                        ...directorForm,
                        email: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Username
                  <input
                    required
                    minLength={3}
                    maxLength={30}
                    autoComplete="off"
                    value={directorForm.username}
                    onChange={(e) =>
                      setDirectorForm({
                        ...directorForm,
                        username: e.target.value,
                      })
                    }
                    placeholder="Username for login"
                  />
                </label>
                <label className="director-password-field">
                  Temporary password
                  <input
                    required
                    type="password"
                    minLength={8}
                    maxLength={72}
                    autoComplete="new-password"
                    value={directorForm.password}
                    onChange={(e) =>
                      setDirectorForm({
                        ...directorForm,
                        password: e.target.value,
                      })
                    }
                    placeholder="Temporary password"
                  />
                  <small>
                    8–72 characters. User should change after first login.
                  </small>
                </label>
                <fieldset className="director-school-assignment">
                  <legend>Assign schools</legend>
                  <p>
                    Select at least one school this Director will manage. You
                    can change assignments later.
                  </p>
                  {schools.length ? (
                    <>
                      <input
                        className="school-assignment-search"
                        type="search"
                        placeholder="Search by school name or code…"
                        aria-label="Search schools to assign"
                        value={directorSchoolSearch}
                        onChange={(e) =>
                          setDirectorSchoolSearch(e.target.value)
                        }
                      />
                      <div className="director-school-options">
                        {filteredDirectorSchools.map((s) => (
                          <label key={s.id}>
                            <input
                              type="checkbox"
                              checked={directorForm.schoolIds.includes(s.id)}
                              onChange={(e) =>
                                setDirectorForm((current) => ({
                                  ...current,
                                  schoolIds: e.target.checked
                                    ? [...current.schoolIds, s.id]
                                    : current.schoolIds.filter(
                                        (id) => id !== s.id,
                                      ),
                                }))
                              }
                            />
                            <span>
                              <strong>{s.name}</strong>
                              <small>{s.code}</small>
                            </span>
                          </label>
                        ))}
                        {filteredDirectorSchools.length === 0 && (
                          <small className="school-assignment-empty">
                            No schools match your search.
                          </small>
                        )}
                      </div>
                      <small className="school-assignment-selected">
                        {directorForm.schoolIds.length} school
                        {directorForm.schoolIds.length === 1 ? "" : "s"}{" "}
                        selected
                      </small>
                    </>
                  ) : (
                    <small className="director-no-schools">
                      No schools exist yet. Create a school before assigning it
                      to a Director.
                    </small>
                  )}
                </fieldset>
                <button
                  className="director-submit"
                  disabled={saving || directorForm.schoolIds.length === 0}
                >
                  <Plus size={16} />
                  {saving ? "Creating…" : "Create Director"}
                </button>
              </form>
            </section>
            <section className="superadmin-panel">
              <div className="superadmin-section-title">
                <div>
                  <h2>
                    <Users size={19} /> Director accounts
                  </h2>
                  <p>
                    Edit account details or remove Director access. School
                    records remain intact.
                  </p>
                </div>
                <span className="superadmin-count">
                  {directors.length} Directors
                </span>
              </div>
              {directorCards}
            </section>
          </>
          } />
          
          {/* Statistics Route */}
          <Route path="statistics" element={
          <>
            <section className="superadmin-overview superadmin-kpis">
              <article>
                <Building2 />
                <span>Schools</span>
                <strong>{schools.length}</strong>
                <small>Institutions in network</small>
              </article>
              <article>
                <Users />
                <span>All user accounts</span>
                <strong>{totals.users.toLocaleString("en-IN")}</strong>
                <small>Across all schools</small>
              </article>
              <article>
                <GraduationCap />
                <span>Students</span>
                <strong>{totals.students.toLocaleString("en-IN")}</strong>
                <small>Enrolled students</small>
              </article>
              <article>
                <CircleDollarSign />
                <span>Fees collected</span>
                <strong>{money(totals.collected)}</strong>
                <small>Recorded paid amount</small>
              </article>
            </section>
            <section className="superadmin-panel">
              <div className="superadmin-section-title">
                <div>
                  <h2>
                    <BarChart3 size={19} /> School financial and enrolment
                    summary
                  </h2>
                  <p>
                    Institution-level aggregates only. No individual student
                    records or marks are exposed.
                  </p>
                </div>
              </div>
              <div className="platform-stat-table">
                <div className="platform-stat-row heading">
                  <span>School</span>
                  <span>Students</span>
                  <span>Collected</span>
                  <span>Pending</span>
                </div>
                {globalFilteredSchools.map((s) => (
                  <div className="platform-stat-row" key={s.id}>
                    <span>
                      <strong>{s.name}</strong>
                      <small>{s.code}</small>
                    </span>
                    <b>{Number(s.studentCount || 0).toLocaleString("en-IN")}</b>
                    <b>{money(s.revenue?.collected)}</b>
                    <b>{money(s.revenue?.pending)}</b>
                  </div>
                ))}
              </div>
              <p className="superadmin-privacy-note">
                Revenue reflects fee-payment records and is not a measure of
                profit or net income.
              </p>
            </section>
          </>
          } />
          
          {/* Health Route */}
          <Route path="health" element={
          <section className="superadmin-panel platform-health-panel">
            <div className="superadmin-section-title">
              <div>
                <h2>
                  <Activity size={19} /> Platform health & school issues
                </h2>
                <p>Operational visibility and application health.</p>
              </div>
              <span className="health-badge">
                <AlertTriangle size={13} /> Monitoring setup needed
              </span>
            </div>
            <div className="health-notice">
              <div className="health-notice-icon">
                <AlertTriangle size={20} />
              </div>
              <div>
                <strong>
                  School-level error tracking is not connected yet
                </strong>
                <p>
                  The current backend logs errors to its server console but does
                  not persist them against a school. This dashboard will not
                  label a school as failing without recorded evidence.
                </p>
                <small>
                  Next step: add a central issue log with school, affected
                  module, error code, timestamp, and resolution status.
                </small>
              </div>
            </div>
            <div className="health-status-row">
              <span>
                <CheckCircle2 size={16} /> Dashboard data API
              </span>
              <strong className={error ? "health-unknown" : "health-ok"}>
                {error ? "Unavailable" : "Responding"}
              </strong>
            </div>
          </section>
          } />
          
          {/* Default redirect to dashboard */}
          <Route path="*" element={<Navigate to="/superadmin/dashboard" replace />} />
        </Routes>
      </main>
      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type={deleteConfirmation.type}
          item={deleteConfirmation.item}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirmation(null)}
          isDeleting={deletingRecord}
        />
      )}
      {editingSchool && (
        <div
          className="superadmin-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEditingSchool(null);
          }}
        >
          <form className="superadmin-modal" onSubmit={saveSchool}>
            <div className="superadmin-modal-heading">
              <h2>Edit school</h2>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => setEditingSchool(null)}
              >
                <X size={18} />
              </button>
            </div>
            <label>
              School name
              <input
                required
                value={editingSchool.name}
                onChange={(e) =>
                  setEditingSchool({ ...editingSchool, name: e.target.value })
                }
              />
            </label>
            <label>
              School code
              <input
                required
                minLength={3}
                maxLength={24}
                value={editingSchool.code}
                onChange={(e) =>
                  setEditingSchool({
                    ...editingSchool,
                    code: e.target.value.toUpperCase(),
                  })
                }
              />
            </label>
            <label>
              Address
              <textarea
                value={editingSchool.address}
                onChange={(e) =>
                  setEditingSchool({
                    ...editingSchool,
                    address: e.target.value,
                  })
                }
              />
            </label>
            <button className="director-submit">
              <Save size={16} /> Save changes
            </button>
          </form>
        </div>
      )}
      {createdCredentials && (
        <CredentialDisplay
          username={createdCredentials.username}
          password={createdCredentials.password}
          role={createdCredentials.role}
          name={createdCredentials.name}
          email={createdCredentials.email}
          schools={createdCredentials.schools}
          onClose={() => setCreatedCredentials(null)}
        />
      )}
    </div>
  );
}
