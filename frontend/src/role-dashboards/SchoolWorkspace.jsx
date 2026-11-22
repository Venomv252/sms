import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  IndianRupee,
  Megaphone,
  RefreshCw,
  Search,
  Users,
  Wallet,
  UserPlus,
  Copy,
  X,
  KeyRound,
  Check,
  Pencil,
} from "lucide-react";
import { apiGet, apiPost, apiPatch, apiDelete } from "../api.js";
import "./school-workspace.css";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "students", label: "Students", icon: GraduationCap },
  { id: "teachers", label: "Teachers", icon: Users },
  { id: "principals", label: "Principals", icon: UserPlus },
  { id: "academics", label: "Academics", icon: BookOpen },
  { id: "homework", label: "Homework", icon: ClipboardList },
  { id: "notices", label: "Notices", icon: Megaphone },
  { id: "finance", label: "Finance", icon: Wallet },
];

const fullName = (person) =>
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") || "Unnamed";

const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <article className="sw-stat-card">
      <div className="sw-stat-icon"><Icon size={19} /></div>
      <div className="sw-stat-label">{label}</div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function EmptyState({ children }) {
  return <div className="sw-empty">{children}</div>;
}

export default function SchoolWorkspace({ school, onBack }) {
  const [section, setSection] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [principalModal, setPrincipalModal] = useState(false);
  const [principalForm, setPrincipalForm] = useState({ firstName: "", lastName: "", email: "", username: "", temporaryPassword: "" });
  const [creatingPrincipal, setCreatingPrincipal] = useState(false);
  const [principalError, setPrincipalError] = useState("");
  const [createdPrincipal, setCreatedPrincipal] = useState(null);
  const [copiedField, setCopiedField] = useState("");
  const [editingPrincipal, setEditingPrincipal] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiGet(
        `/platform/director/schools/${school.id}/workspace`,
      );
      setData(result);
    } catch (err) {
      setError(err.message || "Unable to load this school's records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(null);
    setSection("overview");
    load();
  }, [school.id]);

  const openPrincipalModal = () => {
    setPrincipalForm({ firstName: "", lastName: "", email: "", username: "", temporaryPassword: "" });
    setPrincipalError("");
    setCreatedPrincipal(null);
    setCopiedField("");
    setEditingPrincipal(null);
    setPrincipalModal(true);
  };

  const openEditPrincipalModal = (principal) => {
    setEditingPrincipal({
      id: principal.id,
      firstName: principal.name.split(" ")[0] || "",
      lastName: principal.name.split(" ").slice(1).join(" ") || "",
      email: principal.email,
      username: principal.username,
    });
    setPrincipalError("");
    setPrincipalModal(true);
  };

  const deletePrincipal = async (principal) => {
    if (!window.confirm(`Delete ${principal.name}? This will remove their access to the school management system.`)) {
      return;
    }

    try {
      await apiDelete(`/platform/director/schools/${school.id}/principal/${principal.id}`);
      setMessage("Principal account deleted successfully.");
      await load();
    } catch (err) {
      setError(err.message || "Unable to delete principal account.");
    }
  };

  const savePrincipal = async (event) => {
    event.preventDefault();
    setCreatingPrincipal(true);
    setPrincipalError("");
    
    try {
      let result;
      
      if (editingPrincipal) {
        // Update existing principal
        result = await apiPatch(
          `/platform/director/schools/${school.id}/principal/${editingPrincipal.id}`,
          {
            firstName: editingPrincipal.firstName.trim(),
            lastName: editingPrincipal.lastName.trim(),
            email: editingPrincipal.email.trim(),
          }
        );
        setMessage("Principal account updated successfully.");
        setPrincipalModal(false);
        setEditingPrincipal(null);
      } else {
        // Create new principal
        result = await apiPost(
          `/platform/director/schools/${school.id}/principal`,
          {
            firstName: principalForm.firstName.trim(),
            lastName: principalForm.lastName.trim(),
            email: principalForm.email.trim(),
            username: principalForm.username.trim(),
            temporaryPassword: principalForm.temporaryPassword.trim(),
          }
        );
        if (!result?.credentials?.username || !result?.credentials?.temporaryPassword) {
          throw new Error("Principal was created, but credentials were not returned. Contact the administrator before retrying.");
        }
        setCreatedPrincipal(result);
      }
      
      await load();
    } catch (err) {
      setPrincipalError(err.message || "Unable to save the Principal account.");
    } finally {
      setCreatingPrincipal(false);
    }
  };

  const copyCredential = async (value, field) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
    } catch {
      setPrincipalError("Clipboard access was blocked. Please select and copy the credential manually.");
    }
  };

  const stats = data?.stats || {};
  const students = data?.students || [];
  const teachers = data?.teachers || [];
  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter((student) =>
      [
        fullName(student.user),
        student.rollNumber,
        student.grade,
        student.section,
        student.user?.email,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [students, search]);

  if (loading && !data) {
    return (
      <div className="sw-shell">
        <div className="sw-loading"><RefreshCw className="sw-spin" /> Loading {school.name} records…</div>
      </div>
    );
  }

  return (
    <div className="sw-shell">
      <nav className="sw-nav" aria-label="School workspace sections">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={section === id ? "active" : ""}
            onClick={() => setSection(id)}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </nav>

      {error && <div className="sw-error">{error}</div>}
      {message && <div className="sw-success">{message}</div>}
      {loading && data && <div className="sw-refreshing">Updating records…</div>}

      {!data && !loading && (
        <EmptyState>School records could not be loaded. Check the backend and try again.</EmptyState>
      )}

      {data && section === "overview" && (
        <>
          <div className="sw-welcome">
            <div>
              <h2>School overview</h2>
              <p>Live summary calculated from this school's records.</p>
            </div>
            <div className="sw-welcome-actions">
              <span className="sw-live"><i /> Connected to school data</span>
            </div>
          </div>

          <section className="sw-stats-grid">
            <StatCard icon={GraduationCap} label="Students" value={stats.students ?? 0} note="Enrolled student records" />
            <StatCard icon={Users} label="Teachers" value={stats.teachers ?? 0} note={`${stats.otherStaff ?? 0} other staff accounts`} />
            <StatCard icon={BookOpen} label="Classes" value={stats.classes ?? 0} note={`${stats.subjects ?? 0} subjects configured`} />
            <StatCard icon={Activity} label="Today's attendance" value={stats.attendanceToday == null ? "No data" : `${stats.attendanceToday}%`} note={`${stats.presentToday ?? 0} present / ${stats.attendanceRecordsToday ?? 0} marked`} />
            <StatCard icon={IndianRupee} label="Fees collected" value={money(stats.feeCollected)} note="Paid fee records only" />
            <StatCard icon={ClipboardList} label="Results published" value={stats.resultsPublished ?? 0} note={`${stats.pendingFeeRecords ?? 0} pending fee records`} />
          </section>

          <div className="sw-content-grid">
            <section className="sw-panel">
              <div className="sw-panel-heading"><div><h3>Recent students</h3><p>Latest student records added to this school</p></div><button onClick={() => setSection("students")}>View all shown</button></div>
              {students.length ? (
                <div className="sw-table-wrap"><table><thead><tr><th>Student</th><th>Roll no.</th><th>Class</th><th>Added</th></tr></thead><tbody>
                  {students.slice(0, 5).map((s) => <tr key={s.id}><td><strong>{fullName(s.user)}</strong><small>{s.user?.email}</small></td><td>{s.rollNumber}</td><td>{s.grade}-{s.section}</td><td>{dateLabel(s.createdAt)}</td></tr>)}
                </tbody></table></div>
              ) : <EmptyState>No student records found.</EmptyState>}
            </section>
            <section className="sw-panel">
              <div className="sw-panel-heading"><div><h3>Latest notices</h3><p>Active notices published by this school</p></div><button onClick={() => setSection("notices")}>View notices</button></div>
              {(data.notices || []).length ? <div className="sw-list">
                {data.notices.slice(0, 5).map((notice) => <article key={notice.id}><div><strong>{notice.title}</strong><p>{notice.category} · {dateLabel(notice.publishDate)}</p></div><span className={`sw-priority ${String(notice.priority).toLowerCase()}`}>{notice.priority}</span></article>)}
              </div> : <EmptyState>No active notices.</EmptyState>}
            </section>
          </div>
        </>
      )}

      {data && section === "students" && (
        <section className="sw-panel">
          <div className="sw-panel-heading"><div><h2>Student directory</h2><p>Showing the latest {students.length} student records. Total enrolled: {stats.students ?? 0}.</p></div><label className="sw-search"><Search size={15}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search loaded records" /></label></div>
          {filteredStudents.length ? <div className="sw-table-wrap"><table><thead><tr><th>Student</th><th>Roll number</th><th>Class</th><th>Email</th><th>Added</th></tr></thead><tbody>
            {filteredStudents.map((s) => <tr key={s.id}><td><strong>{fullName(s.user)}</strong></td><td>{s.rollNumber}</td><td>{s.grade}-{s.section}</td><td>{s.user?.email || "—"}</td><td>{dateLabel(s.createdAt)}</td></tr>)}
          </tbody></table></div> : <EmptyState>No matching student records in the latest records returned.</EmptyState>}
        </section>
      )}

      {data && section === "teachers" && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Faculty directory</h2><p>Total teachers: {stats.teachers ?? 0}. Latest records returned below.</p></div></div>
          {teachers.length ? <div className="sw-table-wrap"><table><thead><tr><th>Teacher</th><th>Employee ID</th><th>Designation</th><th>Department</th><th>Email</th></tr></thead><tbody>
            {teachers.map((t) => <tr key={t.id}><td><strong>{fullName(t.user)}</strong></td><td>{t.employeeId}</td><td>{t.designation}</td><td>{t.department}</td><td>{t.user?.email || "—"}</td></tr>)}
          </tbody></table></div> : <EmptyState>No teacher records found.</EmptyState>}
        </section>
      )}

      {data && section === "principals" && (
        <section className="sw-panel">
          <div className="sw-panel-heading">
            <div>
              <h2>Principal accounts</h2>
              <p>Administrative users with Principal role for this school.</p>
            </div>
            <button className="sw-button sw-button-primary" onClick={openPrincipalModal}>
              <UserPlus size={15} /> Add Principal
            </button>
          </div>
          {(data.principals || []).length ? (
            <div className="sw-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(data.principals || []).map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.email}</td>
                      <td>{p.username}</td>
                      <td>{dateLabel(p.createdAt)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="sw-icon-button"
                            title="Edit principal"
                            onClick={() => openEditPrincipalModal(p)}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            className="sw-icon-button sw-icon-button-danger"
                            title="Delete principal"
                            onClick={() => deletePrincipal(p)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState>No Principal accounts found. Click "Add Principal" to create one.</EmptyState>
          )}
        </section>
      )}

      {data && section === "academics" && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Academic schedule</h2><p>Class timetable records configured for this school.</p></div></div>
          {(data.schedules || []).length ? <div className="sw-table-wrap"><table><thead><tr><th>Day</th><th>Period</th><th>Time</th><th>Class</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead><tbody>
            {data.schedules.map((item) => <tr key={item.id}><td>{item.dayOfWeek}</td><td>{item.period}</td><td>{item.startTime}–{item.endTime}</td><td>{item.class.grade}-{item.class.section}</td><td>{item.class.subject.name}</td><td>{fullName(item.class.teacher.user)}</td><td>{item.room || "—"}</td></tr>)}
          </tbody></table></div> : <EmptyState>No timetable records found.</EmptyState>}
        </section>
      )}

      {data && section === "homework" && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Homework</h2><p>Recent homework assigned to classes in this school.</p></div></div>
          {(data.homework || []).length ? <div className="sw-table-wrap"><table><thead><tr><th>Title</th><th>Subject</th><th>Class</th><th>Due date</th><th>Total marks</th><th>Submissions</th></tr></thead><tbody>
            {data.homework.map((item) => <tr key={item.id}><td><strong>{item.title}</strong></td><td>{item.subject.name}</td><td>{item.class.grade}-{item.class.section}</td><td>{dateLabel(item.dueDate)}</td><td>{item.totalMarks}</td><td>{item._count.submissions}</td></tr>)}
          </tbody></table></div> : <EmptyState>No homework records found.</EmptyState>}
        </section>
      )}

      {data && section === "notices" && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>School notices</h2><p>Active notices published for {data.school.name}.</p></div></div>
          {(data.notices || []).length ? <div className="sw-list sw-notice-list">
            {data.notices.map((notice) => <article key={notice.id}><div><strong>{notice.title}</strong><p>{notice.content}</p><small>{notice.category} · Published {dateLabel(notice.publishDate)}{notice.expiryDate ? ` · Expires ${dateLabel(notice.expiryDate)}` : ""}</small></div><span className={`sw-priority ${String(notice.priority).toLowerCase()}`}>{notice.priority}</span></article>)}
          </div> : <EmptyState>No active notices.</EmptyState>}
        </section>
      )}

      {data && section === "finance" && (
        <section className="sw-stats-grid sw-finance-grid">
          <StatCard icon={IndianRupee} label="Fees collected" value={money(stats.feeCollected)} note="Sum of payments marked PAID" />
          <StatCard icon={Wallet} label="Pending fee records" value={stats.pendingFeeRecords ?? 0} note="Pending, overdue or partial" />
          <StatCard icon={ClipboardList} label="Results published" value={stats.resultsPublished ?? 0} note="Result records for enrolled students" />
        </section>
      )}

      {principalModal && (
        <div className="sw-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !creatingPrincipal) {
            setPrincipalModal(false);
            setEditingPrincipal(null);
          }
        }}>
          <section className="sw-principal-modal" role="dialog" aria-modal="true" aria-labelledby="sw-principal-title">
            <div className="sw-modal-heading">
              <div>
                <span className="sw-modal-eyebrow">SCHOOL ADMINISTRATION</span>
                <h2 id="sw-principal-title">{createdPrincipal ? "Principal account created" : editingPrincipal ? "Edit Principal" : "Add Principal"}</h2>
                <p>{school.name}</p>
              </div>
              <button className="sw-modal-close" type="button" onClick={() => {
                setPrincipalModal(false);
                setEditingPrincipal(null);
              }} aria-label="Close">
                <X size={19} />
              </button>
            </div>

            {createdPrincipal ? (
              <div className="sw-credentials">
                <div className="sw-credentials-success"><Check size={17} /> Principal account created successfully</div>
                <p className="sw-credentials-person">{createdPrincipal.principal?.name}</p>
                <p className="sw-credentials-email">{createdPrincipal.principal?.email}</p>
                <div className="sw-credential-row">
                  <div><small>Username</small><strong>{createdPrincipal.credentials.username}</strong></div>
                  <button type="button" onClick={() => copyCredential(createdPrincipal.credentials.username, "username")}>
                    {copiedField === "username" ? <Check size={15}/> : <Copy size={15}/>} {copiedField === "username" ? "Copied" : "Copy"}
                  </button>
                </div>
                <div className="sw-credential-row">
                  <div><small>Temporary password</small><strong>{createdPrincipal.credentials.temporaryPassword}</strong></div>
                  <button type="button" onClick={() => copyCredential(createdPrincipal.credentials.temporaryPassword, "password")}>
                    {copiedField === "password" ? <Check size={15}/> : <Copy size={15}/>} {copiedField === "password" ? "Copied" : "Copy"}
                  </button>
                </div>
                <button className="sw-button sw-button-primary sw-copy-all" type="button" onClick={() => copyCredential(
                  `School: ${school.name}\nName: ${createdPrincipal.principal?.name}\nEmail: ${createdPrincipal.principal?.email}\nUsername: ${createdPrincipal.credentials.username}\nTemporary password: ${createdPrincipal.credentials.temporaryPassword}`,
                  "all",
                )}>
                  {copiedField === "all" ? <Check size={15}/> : <Copy size={15}/>} {copiedField === "all" ? "Copied all credentials" : "Copy all credentials"}
                </button>
                <div className="sw-credentials-warning"><KeyRound size={16}/> Save these credentials now. The temporary password will not be available again after closing this window.</div>
                <button className="sw-button sw-button-light sw-modal-done" type="button" onClick={() => {
                  setPrincipalModal(false);
                  setCreatedPrincipal(null);
                }}>Done</button>
              </div>
            ) : editingPrincipal ? (
              <form className="sw-principal-form" onSubmit={savePrincipal}>
                <p className="sw-form-description">Update the principal's information. Username cannot be changed.</p>
                <div className="sw-form-grid">
                  <label>First name<input required maxLength={60} value={editingPrincipal.firstName} onChange={(e) => setEditingPrincipal({ ...editingPrincipal, firstName: e.target.value })} placeholder="First name"/></label>
                  <label>Last name<input required maxLength={60} value={editingPrincipal.lastName} onChange={(e) => setEditingPrincipal({ ...editingPrincipal, lastName: e.target.value })} placeholder="Last name"/></label>
                </div>
                <label>Email address<input required type="email" maxLength={254} value={editingPrincipal.email} onChange={(e) => setEditingPrincipal({ ...editingPrincipal, email: e.target.value })} placeholder="principal@school.edu"/></label>
                <label>Username (read-only)<input disabled value={editingPrincipal.username} style={{background: '#f9faf9', cursor: 'not-allowed'}}/></label>
                {principalError && <div className="sw-error">{principalError}</div>}
                <div className="sw-form-footer">
                  <button className="sw-button sw-button-light" type="button" disabled={creatingPrincipal} onClick={() => {
                    setPrincipalModal(false);
                    setEditingPrincipal(null);
                  }}>Cancel</button>
                  <button className="sw-button sw-button-primary" type="submit" disabled={creatingPrincipal}>
                    <Check size={15}/> {creatingPrincipal ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="sw-principal-form" onSubmit={savePrincipal}>
                <p className="sw-form-description">Create the account for the Principal responsible for this school. Provide login credentials below.</p>
                <div className="sw-form-grid">
                  <label>First name<input required maxLength={60} autoComplete="given-name" value={principalForm.firstName} onChange={(e) => setPrincipalForm({ ...principalForm, firstName: e.target.value })} placeholder="First name"/></label>
                  <label>Last name<input required maxLength={60} autoComplete="family-name" value={principalForm.lastName} onChange={(e) => setPrincipalForm({ ...principalForm, lastName: e.target.value })} placeholder="Last name"/></label>
                </div>
                <label>Email address<input required type="email" maxLength={254} autoComplete="email" value={principalForm.email} onChange={(e) => setPrincipalForm({ ...principalForm, email: e.target.value })} placeholder="principal@school.edu"/></label>
                <div className="sw-form-grid">
                  <label>Username<input required minLength={3} maxLength={50} autoComplete="username" value={principalForm.username} onChange={(e) => setPrincipalForm({ ...principalForm, username: e.target.value })} placeholder="principal.username"/></label>
                  <label>Temporary password<input required minLength={8} maxLength={100} type="text" autoComplete="new-password" value={principalForm.temporaryPassword} onChange={(e) => setPrincipalForm({ ...principalForm, temporaryPassword: e.target.value })} placeholder="Temporary password"/></label>
                </div>
                {principalError && <div className="sw-error">{principalError}</div>}
                <div className="sw-form-footer">
                  <button className="sw-button sw-button-light" type="button" disabled={creatingPrincipal} onClick={() => setPrincipalModal(false)}>Cancel</button>
                  <button className="sw-button sw-button-primary" type="submit" disabled={creatingPrincipal}>
                    <UserPlus size={15}/> {creatingPrincipal ? "Creating account…" : "Create Principal"}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
