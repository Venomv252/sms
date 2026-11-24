import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
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
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { apiGet, apiPost, apiPatch, apiDelete } from "../api.js";
import CredentialDisplay from "../components/CredentialDisplay.jsx";
import SuperAdminDeleteConfirmation from "../components/SuperAdminDeleteConfirmation.jsx";
import "./school-workspace.css";

const SECTIONS = [
  { id: "overview", label: "Overview", icon: Activity, path: "overview" },
  { id: "students", label: "Students", icon: GraduationCap, path: "students" },
  { id: "teachers", label: "Teachers", icon: Users, path: "teachers" },
  { id: "principals", label: "Principals", icon: UserPlus, path: "principals" },
  { id: "academics", label: "Academics", icon: BookOpen, path: "academics" },
  { id: "homework", label: "Homework", icon: ClipboardList, path: "homework" },
  { id: "notices", label: "Notices", icon: Megaphone, path: "notices" },
  { id: "finance", label: "Finance", icon: Wallet, path: "finance" },
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
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current section from URL path
  const currentPath = location.pathname.split('/').pop();
  const section = currentPath || "overview";
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [principalModal, setPrincipalModal] = useState(false);
  const [principalForm, setPrincipalForm] = useState({ firstName: "", lastName: "", email: "", username: "", temporaryPassword: "" });
  const [creatingPrincipal, setCreatingPrincipal] = useState(false);
  const [principalError, setPrincipalError] = useState("");
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [editingPrincipal, setEditingPrincipal] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // Cache for different sections - PERFORMANCE OPTIMIZATION
  const [sectionCache, setSectionCache] = useState({});
  
  // Track in-flight requests to prevent duplicate API calls
  const inflightRequests = useMemo(() => new Set(), []);
  const CACHE_DURATION = 30000; // 30 seconds

  // Lazy load data per section - PERFORMANCE OPTIMIZATION
  const load = async (targetSection = section, force = false) => {
    const cacheKey = targetSection;
    const now = Date.now();
    
    // Prevent duplicate in-flight requests
    if (inflightRequests.has(cacheKey)) {
      console.log(`[SchoolWorkspace] Skipping duplicate request for section: ${cacheKey}`);
      return;
    }
    
    // Check cache first
    if (!force && sectionCache[cacheKey] && (now - sectionCache[cacheKey].timestamp) < CACHE_DURATION) {
      setData(sectionCache[cacheKey].data);
      return;
    }
    
    setLoading(true);
    setError("");
    
    // Mark request as in-flight
    inflightRequests.add(cacheKey);
    
    try {
      let result;
      
      // Load only what's needed for the current section
      switch (targetSection) {
        case "overview":
          result = await apiGet(`/platform/director/schools/${school.id}/overview`);
          break;
        case "students":
          result = await apiGet(`/platform/director/schools/${school.id}/students`);
          break;
        case "teachers":
          result = await apiGet(`/platform/director/schools/${school.id}/teachers`);
          break;
        case "principals":
          result = await apiGet(`/platform/director/schools/${school.id}/principals`);
          break;
        case "academics":
          result = await apiGet(`/platform/director/schools/${school.id}/academics`);
          break;
        case "notices":
          result = await apiGet(`/platform/director/schools/${school.id}/notices`);
          break;
        case "homework":
          result = await apiGet(`/platform/director/schools/${school.id}/homework`);
          break;
        case "finance":
          // Finance uses overview stats
          result = await apiGet(`/platform/director/schools/${school.id}/overview`);
          break;
        default:
          result = await apiGet(`/platform/director/schools/${school.id}/overview`);
      }
      
      setData(result);
      
      // Update cache
      setSectionCache(prev => ({
        ...prev,
        [cacheKey]: { data: result, timestamp: Date.now() }
      }));
    } catch (err) {
      setError(err.message || "Unable to load this school's records.");
    } finally {
      setLoading(false);
      // Remove from in-flight requests
      inflightRequests.delete(cacheKey);
    }
  };

  // Load data when section changes
  useEffect(() => {
    load(section);
  }, [section, school.id]);
  
  // Helper to get data from either old or new structure
  const getData = (key) => {
    if (!data) return [];
    
    // New structure with pagination: { data: [...], pagination: {...} }
    if (Array.isArray(data.data)) {
      return data.data; // For paginated lists (students, teachers, notices, homework)
    }
    
    // New structure: data.data contains nested objects
    if (data.data) {
      // For academics endpoint: { data: { classes: [], subjects: [], schedules: [] } }
      if (data.data[key]) return data.data[key];
      
      // For single object responses
      return data.data;
    }
    
    // Old structure: direct access
    return data[key] || [];
  };

  const openPrincipalModal = () => {
    setPrincipalForm({ firstName: "", lastName: "", email: "", username: "", temporaryPassword: "" });
    setPrincipalError("");
    setCreatedCredentials(null);
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
    setDeleteConfirmation({ principal });
  };

  const confirmDeletePrincipal = async () => {
    if (!deleteConfirmation) return;
    
    setDeleting(true);
    try {
      await apiDelete(`/platform/director/schools/${school.id}/principal/${deleteConfirmation.principal.id}`);
      setMessage("Principal account deleted successfully.");
      setDeleteConfirmation(null);
      
      // Don't reload entire workspace - too slow
      // Just update the principals data manually
      const currentPrincipals = data?.data || data || [];
      const updatedPrincipals = Array.isArray(currentPrincipals) 
        ? currentPrincipals.filter(p => p.id !== deleteConfirmation.principal.id)
        : [];
      
      setData({ data: updatedPrincipals });
      
      // Invalidate cache for principals section
      setSectionCache(prev => {
        const newCache = { ...prev };
        delete newCache.principals;
        return newCache;
      });
      // await load(); // REMOVED - performance optimization
    } catch (err) {
      setError(err.message || "Unable to delete principal account.");
    } finally {
      setDeleting(false);
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
        const payload = {
          firstName: principalForm.firstName.trim(),
          lastName: principalForm.lastName.trim(),
          email: principalForm.email.trim(),
          username: principalForm.username.trim(),
          temporaryPassword: principalForm.temporaryPassword.trim(),
          schoolId: school.id, // Pass school ID for Director role
        };
        
        result = await apiPost(
          `/management/principal/create`,
          payload
        );
        
        console.log('✅ Principal creation result:', result);
        
        // Force show modal - check multiple possible response structures
        const credentials = result?.data?.credentials || result?.credentials;
        
        if (credentials && (credentials.username || credentials.temporaryPassword)) {
          console.log('✅ Credentials found, showing modal:', credentials);
          
          setCreatedCredentials({
            username: credentials.username,
            password: credentials.temporaryPassword || credentials.password,
            role: "Principal",
            name: `${principalForm.firstName} ${principalForm.lastName}`,
            email: principalForm.email,
            schools: school.name,
          });
          
          // Close the form modal
          setPrincipalModal(false);
          
          // Force a small delay to ensure state updates
          setTimeout(() => {
            console.log('✅ Credential state should be set now');
          }, 100);
        } else {
          console.error('❌ NO CREDENTIALS IN RESPONSE!');
          console.error('Full response:', JSON.stringify(result, null, 2));
          
          // Show alert with actual response
          alert(`Principal created but credentials missing!\n\nCheck console for details.\n\nResponse: ${JSON.stringify(result).substring(0, 200)}`);
        }
        
        setMessage("Principal account created successfully.");
        
        // Invalidate cache to force reload
        setSectionCache(prev => {
          const newCache = { ...prev };
          delete newCache.principals;
          return newCache;
        });
        await load("principals", true); // Force reload principals
      }
      
      // Don't reload entire workspace - just refresh principals section if needed
      // await load(); // REMOVED - too slow, loads 16 queries worth of data
    } catch (err) {
      setPrincipalError(err.message || "Unable to save the Principal account.");
    } finally {
      setCreatingPrincipal(false);
    }
  };

  const stats = data?.data?.stats || data?.stats || {};
  const students = Array.isArray(data?.data) ? data.data : (data?.data?.students || []);
  const teachers = Array.isArray(data?.data) ? data.data : (data?.data?.teachers || []);
  const pagination = data?.pagination || null; // For paginated responses
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
        {SECTIONS.map(({ id, label, icon: Icon, path }) => (
          <button
            key={id}
            className={section === id ? "active" : ""}
            onClick={() => navigate(`../${path}`, { relative: "path" })}
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

      <Routes>
        {/* Overview Route */}
        <Route path="overview" element={
          data && (
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
              <div className="sw-panel-heading"><div><h3>Recent students</h3><p>Latest student records added to this school</p></div><button onClick={() => navigate("../students", { relative: "path" })}>View all shown</button></div>
              {students.length ? (
                <div className="sw-table-wrap"><table><thead><tr><th>Student</th><th>Roll no.</th><th>Class</th><th>Added</th></tr></thead><tbody>
                  {students.slice(0, 5).map((s) => <tr key={s.id}><td><strong>{fullName(s.user)}</strong><small>{s.user?.email}</small></td><td>{s.rollNumber}</td><td>{s.grade}-{s.section}</td><td>{dateLabel(s.createdAt)}</td></tr>)}
                </tbody></table></div>
              ) : <EmptyState>No student records found.</EmptyState>}
            </section>
            <section className="sw-panel">
              <div className="sw-panel-heading"><div><h3>Latest notices</h3><p>Active notices published by this school</p></div><button onClick={() => navigate("../notices", { relative: "path" })}>View notices</button></div>
              {getData('notices').length ? <div className="sw-list">
                {getData('notices').slice(0, 5).map((notice) => <article key={notice.id}><div><strong>{notice.title}</strong><p>{notice.category} · {dateLabel(notice.publishDate)}</p></div><span className={`sw-priority ${String(notice.priority).toLowerCase()}`}>{notice.priority}</span></article>)}
              </div> : <EmptyState>No active notices.</EmptyState>}
            </section>
          </div>
        </>
          )
        } />

        {/* Students Route */}
        <Route path="students" element={
          data && (
        <section className="sw-panel">
          <div className="sw-panel-heading"><div><h2>Student directory</h2><p>{pagination ? `Showing ${students.length} of ${pagination.total} students (Page ${pagination.page} of ${pagination.pages})` : `Showing ${students.length} student records. Total enrolled: ${stats.students ?? 0}.`}</p></div><label className="sw-search"><Search size={15}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search loaded records" /></label></div>
          {filteredStudents.length ? <div className="sw-table-wrap"><table><thead><tr><th>Student</th><th>Roll number</th><th>Class</th><th>Email</th><th>Added</th></tr></thead><tbody>
            {filteredStudents.map((s) => <tr key={s.id}><td><strong>{fullName(s.user)}</strong></td><td>{s.rollNumber}</td><td>{s.grade}-{s.section}</td><td>{s.user?.email || "—"}</td><td>{dateLabel(s.createdAt)}</td></tr>)}
          </tbody></table></div> : <EmptyState>No matching student records in the latest records returned.</EmptyState>}
        </section>
          )
        } />

        {/* Teachers Route */}
        <Route path="teachers" element={
          data && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Faculty directory</h2><p>Total teachers: {stats.teachers ?? 0}. Latest records returned below.</p></div></div>
          {teachers.length ? <div className="sw-table-wrap"><table><thead><tr><th>Teacher</th><th>Employee ID</th><th>Designation</th><th>Department</th><th>Email</th></tr></thead><tbody>
            {teachers.map((t) => <tr key={t.id}><td><strong>{fullName(t.user)}</strong></td><td>{t.employeeId}</td><td>{t.designation}</td><td>{t.department}</td><td>{t.user?.email || "—"}</td></tr>)}
          </tbody></table></div> : <EmptyState>No teacher records found.</EmptyState>}
        </section>
          )
        } />

        {/* Principals Route */}
        <Route path="principals" element={
          data && (
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
          {((data?.data || data || []).length) ? (
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
                  {(data?.data || data || []).map((p) => (
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
          )
        } />

        {/* Academics Route */}
        <Route path="academics" element={
          data && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Academic schedule</h2><p>Class timetable records configured for this school.</p></div></div>
          {getData('schedules').length ? <div className="sw-table-wrap"><table><thead><tr><th>Day</th><th>Period</th><th>Time</th><th>Class</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead><tbody>
            {getData('schedules').map((item) => <tr key={item.id}><td>{item.dayOfWeek}</td><td>{item.period}</td><td>{item.startTime}–{item.endTime}</td><td>{item.class.grade}-{item.class.section}</td><td>{item.class.subject.name}</td><td>{fullName(item.class.teacher.user)}</td><td>{item.room || "—"}</td></tr>)}
          </tbody></table></div> : <EmptyState>No timetable records found.</EmptyState>}
        </section>
          )
        } />

        {/* Homework Route */}
        <Route path="homework" element={
          data && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>Homework</h2><p>Recent homework assigned to classes in this school.</p></div></div>
          {getData('homework').length ? <div className="sw-table-wrap"><table><thead><tr><th>Title</th><th>Subject</th><th>Class</th><th>Due date</th><th>Total marks</th><th>Submissions</th></tr></thead><tbody>
            {getData('homework').map((item) => <tr key={item.id}><td><strong>{item.title}</strong></td><td>{item.subject.name}</td><td>{item.class.grade}-{item.class.section}</td><td>{dateLabel(item.dueDate)}</td><td>{item.totalMarks}</td><td>{item._count.submissions}</td></tr>)}
          </tbody></table></div> : <EmptyState>No homework records found.</EmptyState>}
        </section>
          )
        } />

        {/* Notices Route */}
        <Route path="notices" element={
          data && (
        <section className="sw-panel"><div className="sw-panel-heading"><div><h2>School notices</h2><p>Active notices published for {school.name}.</p></div></div>
          {getData('notices').length ? <div className="sw-list sw-notice-list">
            {getData('notices').map((notice) => <article key={notice.id}><div><strong>{notice.title}</strong><p>{notice.content}</p><small>{notice.category} · Published {dateLabel(notice.publishDate)}{notice.expiryDate ? ` · Expires ${dateLabel(notice.expiryDate)}` : ""}</small></div><span className={`sw-priority ${String(notice.priority).toLowerCase()}`}>{notice.priority}</span></article>)}
          </div> : <EmptyState>No active notices.</EmptyState>}
        </section>
          )
        } />

        {/* Finance Route */}
        <Route path="finance" element={
          data && (
        <section className="sw-stats-grid sw-finance-grid">
          <StatCard icon={IndianRupee} label="Fees collected" value={money(stats.feeCollected)} note="Sum of payments marked PAID" />
          <StatCard icon={Wallet} label="Pending fee records" value={stats.pendingFeeRecords ?? 0} note="Pending, overdue or partial" />
          <StatCard icon={ClipboardList} label="Results published" value={stats.resultsPublished ?? 0} note="Result records for enrolled students" />
        </section>
          )
        } />

        {/* Default redirect to overview */}
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Routes>

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
                <h2 id="sw-principal-title">{editingPrincipal ? "Edit Principal" : "Add Principal"}</h2>
                <p>{school.name}</p>
              </div>
              <button className="sw-modal-close" type="button" onClick={() => {
                setPrincipalModal(false);
                setEditingPrincipal(null);
              }} aria-label="Close">
                <X size={19} />
              </button>
            </div>

            {editingPrincipal ? (
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
                <p className="sw-form-description">Create the account for the Principal responsible for this school.</p>
                <div className="sw-form-grid">
                  <label>First name<input required maxLength={60} autoComplete="given-name" value={principalForm.firstName} onChange={(e) => setPrincipalForm({ ...principalForm, firstName: e.target.value })} placeholder="First name"/></label>
                  <label>Last name<input required maxLength={60} autoComplete="family-name" value={principalForm.lastName} onChange={(e) => setPrincipalForm({ ...principalForm, lastName: e.target.value })} placeholder="Last name"/></label>
                </div>
                <label>Email address<input required type="email" maxLength={254} autoComplete="email" value={principalForm.email} onChange={(e) => setPrincipalForm({ ...principalForm, email: e.target.value })} placeholder="principal@school.edu"/></label>
                <div className="sw-form-grid">
                  <label>Username<input required minLength={3} maxLength={30} autoComplete="username" value={principalForm.username} onChange={(e) => setPrincipalForm({ ...principalForm, username: e.target.value })} placeholder="Username for login"/></label>
                  <label>Temporary password<input required minLength={8} maxLength={72} type="password" autoComplete="new-password" value={principalForm.temporaryPassword} onChange={(e) => setPrincipalForm({ ...principalForm, temporaryPassword: e.target.value })} placeholder="Temporary password"/></label>
                </div>
                <small style={{display: 'block', marginTop: '-8px', marginBottom: '12px', fontSize: '12px', color: '#6b7280'}}>8–72 characters. User should change after first login.</small>
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
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type="principal"
          item={deleteConfirmation.principal}
          onConfirm={confirmDeletePrincipal}
          onCancel={() => setDeleteConfirmation(null)}
          isDeleting={deleting}
        />
      )}
    </div>
  );
}
