import React, { useEffect, useMemo, useState } from "react";
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
  setActiveSchoolId,
  getActiveSchoolId,
} from "../api.js";
import SchoolWorkspace from "./SchoolWorkspace.jsx";
import "./director.css";
import "./admin.css";
import "./platform-role-theme.css";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "OVERVIEW" },
  { id: "schools", label: "My schools", icon: Building2, group: "SCHOOL PORTFOLIO" },
  { id: "statistics", label: "Statistics", icon: BarChart3, group: "SCHOOL PORTFOLIO" },
];

export default function DirectorDashboard() {
  const user = JSON.parse(
    sessionStorage.getItem("sms_authenticated_user") || "{}",
  );

  const [page, setPage] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const [activeSchool, setActiveSchool] = useState(getActiveSchoolId());

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      setOverview(await apiGet("/platform/director/overview"));
    } catch (e) {
      setError(e.message || "Unable to load your schools.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const schools = overview?.schools || [];
  const selected = schools.find((s) => s.id === activeSchool);

  const totals = useMemo(
    () =>
      schools.reduce(
        (a, s) => ({
          students: a.students + Number(s.students || 0),
          staff: a.staff + Number(s.staffCount || 0),
          notices: a.notices + Number(s.activeNotices || 0),
        }),
        { students: 0, staff: 0, notices: 0 },
      ),
    [schools],
  );

  const saveSchool = async (e) => {
    e.preventDefault();

    try {
      await apiPatch(`/platform/director/schools/${editing.id}`, {
        name: editing.name,
        code: editing.code,
        address: editing.address,
      });

      setEditing(null);
      setMessage("School information updated.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSchool = async (s) => {
    if (
      !window.confirm(
        `Delete ${s.name}? This is allowed only when the school has no users or notices.`,
      )
    ) {
      return;
    }

    try {
      await apiDelete(`/platform/director/schools/${s.id}`);
      setMessage("School deleted.");
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const openSchool = (id) => {
    setActiveSchoolId(id);
    setActiveSchool(id);
  };

  if (selected)
    return (
      <div className="director-workspace">
        <header className="director-workspace-bar">
          <div>
            <span>DIRECTOR WORKSPACE</span>
            <strong>{selected.name}</strong>
          </div>

          <button
            className="director-secondary"
            onClick={() => {
              setActiveSchoolId(null);
              setActiveSchool(null);
            }}
          >
            ← Director dashboard
          </button>

          <button
            className="director-logout"
            onClick={() => {
              clearApiSession();
              location.reload();
            }}
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>

        <SchoolWorkspace school={selected} onBack={() => {
            setActiveSchoolId(null);
            setActiveSchool(null);
          }} />
      </div>
    );

  const pageTitle = NAV.find((n) => n.id === page)?.label || "Overview";

  return (
    <div className="platform-shell director-shell director-role-shell">
      <aside className={`platform-sidebar ${mobileNav ? "is-open" : ""}`}>
        <div className="platform-brand">
          <div className="platform-brand-icon">
            <Building2 />
          </div>

          <div>
            <strong>Greenwood High</strong>
            <small>School ERP Portal</small>
          </div>

          <button
            className="platform-close-nav"
            onClick={() => setMobileNav(false)}
          >
            <X />
          </button>
        </div>

        <div className="platform-nav-label">MY ORGANISATION</div>

        <nav>
          {NAV.map((n, index) => (
            <React.Fragment key={n.id}>
              {(index === 0 || NAV[index - 1].group !== n.group) && (
                <div className="platform-nav-group-label">{n.group}</div>
              )}
              <button
                className={page === n.id ? "active" : ""}
                onClick={() => {
                  setPage(n.id);
                  setMobileNav(false);
                }}
              >
                <n.icon size={18} />
                <span>{n.label}</span>
                {n.id === "schools" && <em>{schools.length}</em>}
              </button>
            </React.Fragment>
          ))}
        </nav>

        <div className="platform-sidebar-bottom">
          <div className="platform-user">
            <div className="platform-user-avatar">
              {(user.firstName || "D").slice(0, 1)}
            </div>

            <div>
              <strong>{user.firstName || "Director"}</strong>
              <small>Director</small>
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
            <span>DIRECTOR WORKSPACE</span>
            <h1>{pageTitle}</h1>
          </div>

          <div className="platform-top-actions">
            <span className="platform-live">
              <i /> Account active
            </span>

            <button className="superadmin-refresh" onClick={load}>
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

        {loading && (
          <div className="superadmin-loading">
            Loading your school portfolio…
          </div>
        )}

        {!loading && page === "overview" && (
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
                <strong>{totals.students.toLocaleString("en-IN")}</strong>
                <small>Across your schools</small>
              </article>

              <article>
                <Users />
                <span>Staff accounts</span>
                <strong>{totals.staff.toLocaleString("en-IN")}</strong>
                <small>Teachers and school staff</small>
              </article>

              <article>
                <Activity />
                <span>Active notices</span>
                <strong>{totals.notices.toLocaleString("en-IN")}</strong>
                <small>Across your schools</small>
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

                <button onClick={() => setPage("schools")}>
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
                          <strong>{s.students || 0}</strong>
                        </div>

                        <div>
                          <span>Teachers</span>
                          <strong>{s.teachers || 0}</strong>
                        </div>

                        <div>
                          <span>Attendance</span>
                          <strong>
                            {s.attendanceRate == null
                              ? "—"
                              : `${s.attendanceRate}%`}
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

        {!loading && page === "schools" && (
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
                          onClick={() => deleteSchool(s)}
                        >
                          <X size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="network-metrics">
                      <div>
                        <span>Students</span>
                        <strong>{s.students || 0}</strong>
                      </div>

                      <div>
                        <span>Staff</span>
                        <strong>{s.staffCount || 0}</strong>
                      </div>

                      <div>
                        <span>Notices</span>
                        <strong>{s.activeNotices || 0}</strong>
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
        )}

        {!loading && page === "statistics" && (
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
                <strong>{totals.students.toLocaleString("en-IN")}</strong>
                <small>Across all schools</small>
              </article>

              <article>
                <Users />
                <span>Staff</span>
                <strong>{totals.staff.toLocaleString("en-IN")}</strong>
                <small>Across all schools</small>
              </article>

              <article>
                <Activity />
                <span>Active notices</span>
                <strong>{totals.notices}</strong>
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

                    <b>{s.students || 0}</b>
                    <b>{s.teachers || 0}</b>

                    <b>
                      {s.attendanceRate == null
                        ? "No data"
                        : `${s.attendanceRate}%`}
                    </b>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {editing && (
        <div
          className="superadmin-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setEditing(null);
          }}
        >
          <form className="superadmin-modal" onSubmit={saveSchool}>
            <div className="superadmin-modal-heading">
              <h2>Edit school</h2>

              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => setEditing(null)}
              >
                <X size={18} />
              </button>
            </div>

            <label>
              School name
              <input
                required
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
                value={editing.address}
                onChange={(e) =>
                  setEditing({ ...editing, address: e.target.value })
                }
              />
            </label>

            <button className="director-submit">
              <Save size={16} /> Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
