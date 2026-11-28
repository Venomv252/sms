import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  GraduationCap,
  LayoutDashboard,
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
} from "../api.js";
import RoleSidebar from "../components/RoleSidebar.jsx";
import CredentialDisplay from "../components/CredentialDisplay.jsx";
import SuperAdminDeleteConfirmation from "../components/SuperAdminDeleteConfirmation.jsx";
import "./admin.css";
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
  { id: "company-stats", label: "Company Stats", icon: Briefcase, group: "COMPANY", path: "/superadmin/company-stats" },
  { id: "statistics", label: "Platform statistics", icon: BarChart3, group: "OVERSIGHT", path: "/superadmin/statistics" },
  { id: "health", label: "System health", icon: Activity, group: "OVERSIGHT", path: "/superadmin/health" },
];

// ============================================================
// COMPANY STATS PAGE COMPONENT
// ============================================================

function CompanyStatsPage({ loading: parentLoading, error: parentError, message: parentMessage, setError, setMessage, onRefresh }) {
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 0 });
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ role: "", department: "", status: "" });
  const [sortBy, setSortBy] = useState("joiningDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [savingEmployee, setSavingEmployee] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deletingEmployee, setDeletingEmployee] = useState(false);

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const loadData = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        sortBy,
        sortOrder,
        ...(search && { search }),
        ...(filters.role && { role: filters.role }),
        ...(filters.department && { department: filters.department }),
        ...(filters.status && { status: filters.status }),
      });

      const [statsData, employeesData] = await Promise.all([
        apiGet("/platform/company-employees/stats"),
        apiGet(`/platform/company-employees?${params}`),
      ]);

      setStats(statsData.data || statsData);
      setEmployees(employeesData.data?.employees || employeesData.employees || []);
      setPagination(employeesData.data?.pagination || employeesData.pagination || { total: 0, page: 1, limit: 20, totalPages: 0 });
    } catch (err) {
      setError(err.message || "Unable to load company employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination.page, search, filters, sortBy, sortOrder]);

  const handleAddEmployee = async (formData) => {
    setSavingEmployee(true);
    setError("");
    
    try {
      await apiPost("/platform/company-employees", formData);
      setMessage("Employee added successfully");
      setShowAddModal(false);
      loadData();
    } catch (err) {
      setError(err.message || "Unable to add employee");
    } finally {
      setSavingEmployee(false);
    }
  };

  const handleUpdateEmployee = async (id, formData) => {
    setSavingEmployee(true);
    setError("");
    
    try {
      await apiPatch(`/platform/company-employees/${id}`, formData);
      setMessage("Employee updated successfully");
      setEditingEmployee(null);
      loadData();
    } catch (err) {
      setError(err.message || "Unable to update employee");
    } finally {
      setSavingEmployee(false);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!deleteConfirm) return;
    
    setDeletingEmployee(true);
    setError("");
    
    try {
      await apiDelete(`/platform/company-employees/${deleteConfirm.id}`);
      setMessage("Employee deleted successfully");
      setDeleteConfirm(null);
      loadData();
    } catch (err) {
      setError(err.message || "Unable to delete employee");
    } finally {
      setDeletingEmployee(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="superadmin-loading">
        <RefreshCw size={20} className="spin" /> Loading company employee data...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="superadmin-empty">
        <AlertTriangle size={20} />
        <p>Unable to load company data. {parentError || error}</p>
        <button onClick={() => loadData()}>Retry</button>
      </div>
    );
  }

  const { overview, byRole, byDepartment } = stats || { overview: {}, byRole: [], byDepartment: [] };
  const safeOverview = {
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalMonthlySalary: 0,
    totalAnnualSalary: 0,
    averageMonthlySalary: 0,
    ...overview
  };

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Company Stats</h2>
          <p>
            Manage and monitor ERP platform employees. This data is completely separate from school employees.
          </p>
        </div>
        <button className="director-submit" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add Employee
        </button>
      </section>

      {/* Overview Statistics */}
      <section className="superadmin-overview superadmin-kpis">
        <article>
          <Users />
          <span>Total Employees</span>
          <strong>{safeOverview.totalEmployees}</strong>
          <small>Company staff</small>
        </article>

        <article>
          <CheckCircle2 />
          <span>Active</span>
          <strong className="text-success">{safeOverview.activeEmployees}</strong>
          <small>Currently working</small>
        </article>

        <article>
          <AlertTriangle />
          <span>Inactive</span>
          <strong className="text-warning">{safeOverview.inactiveEmployees}</strong>
          <small>Not active</small>
        </article>

        <article>
          <CircleDollarSign />
          <span>Monthly Salary</span>
          <strong>{money(safeOverview.totalMonthlySalary)}</strong>
          <small>Total expense</small>
        </article>

        <article>
          <CircleDollarSign />
          <span>Annual Salary</span>
          <strong>{money(safeOverview.totalAnnualSalary)}</strong>
          <small>Yearly expense</small>
        </article>
      </section>

      <div className="platform-overview-grid">
        {/* Employee Distribution by Role */}
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <Users size={19} /> Employee Distribution by Role
              </h2>
              <p>Headcount and salary breakdown by job role</p>
            </div>
          </div>
          
          {byRole.length > 0 ? (
            <div className="platform-stat-table">
              <div className="platform-stat-row heading">
                <span>Role</span>
                <span>Count</span>
                <span>Total Salary</span>
              </div>
              {byRole.map((r) => (
                <div className="platform-stat-row" key={r.role}>
                  <span>
                    <strong>{r.role}</strong>
                  </span>
                  <b>{r.count}</b>
                  <b>{money(r.totalSalary)}</b>
                </div>
              ))}
            </div>
          ) : (
            <div className="superadmin-empty">No employees added yet</div>
          )}
        </section>

        {/* Employee Distribution by Department */}
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <Building2 size={19} /> Distribution by Department
              </h2>
              <p>Headcount and salary breakdown by department</p>
            </div>
          </div>
          
          {byDepartment.length > 0 ? (
            <div className="platform-stat-table">
              <div className="platform-stat-row heading">
                <span>Department</span>
                <span>Count</span>
                <span>Total Salary</span>
              </div>
              {byDepartment.map((d) => (
                <div className="platform-stat-row" key={d.department}>
                  <span>
                    <strong>{d.department}</strong>
                  </span>
                  <b>{d.count}</b>
                  <b>{money(d.totalSalary)}</b>
                </div>
              ))}
            </div>
          ) : (
            <div className="superadmin-empty">No employees added yet</div>
          )}
        </section>
      </div>

      {/* Salary Statistics Panel */}
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <CircleDollarSign size={19} /> Salary Statistics
            </h2>
            <p>Comprehensive salary expense analysis</p>
          </div>
        </div>

        <div className="network-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <article className="network-card" style={{ padding: "20px" }}>
            <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>Total Monthly</div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#16a34a" }}>{money(safeOverview.totalMonthlySalary)}</div>
          </article>
          
          <article className="network-card" style={{ padding: "20px" }}>
            <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>Total Annual</div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#16a34a" }}>{money(safeOverview.totalAnnualSalary)}</div>
          </article>
          
          <article className="network-card" style={{ padding: "20px" }}>
            <div style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>Average Monthly</div>
            <div style={{ fontSize: "24px", fontWeight: "600", color: "#2563eb" }}>{money(safeOverview.averageMonthlySalary)}</div>
          </article>
        </div>
      </section>

      {/* Employee Directory */}
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <Briefcase size={19} /> Employee Directory
            </h2>
            <p>Search, filter, and manage company employees</p>
          </div>
          <span className="superadmin-count">{pagination.total} employees</span>
        </div>

        {/* Search and Filters */}
        <div className="director-search-controls" style={{ marginBottom: "20px" }}>
          <div className="superadmin-header-search" style={{ maxWidth: "400px" }}>
            <Search size={16} />
            <input
              type="search"
              placeholder="Search by name, email, or employee ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination(p => ({ ...p, page: 1 }));
              }}
            />
          </div>

          <select
            value={filters.role}
            onChange={(e) => {
              setFilters({ ...filters, role: e.target.value });
              setPagination(p => ({ ...p, page: 1 }));
            }}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}
          >
            <option value="">All Roles</option>
            {byRole.map((r) => (
              <option key={r.role} value={r.role}>{r.role}</option>
            ))}
          </select>

          <select
            value={filters.department}
            onChange={(e) => {
              setFilters({ ...filters, department: e.target.value });
              setPagination(p => ({ ...p, page: 1 }));
            }}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}
          >
            <option value="">All Departments</option>
            {byDepartment.map((d) => (
              <option key={d.department} value={d.department}>{d.department}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => {
              setFilters({ ...filters, status: e.target.value });
              setPagination(p => ({ ...p, page: 1 }));
            }}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #e5e7eb" }}
          >
            <option value="joiningDate-desc">Newest First</option>
            <option value="joiningDate-asc">Oldest First</option>
            <option value="monthlySalary-desc">Highest Salary</option>
            <option value="monthlySalary-asc">Lowest Salary</option>
            <option value="fullName-asc">Name A-Z</option>
            <option value="fullName-desc">Name Z-A</option>
          </select>
        </div>

        {loading ? (
          <div className="superadmin-loading">Loading employees...</div>
        ) : employees.length > 0 ? (
          <>
            <div className="platform-stat-table">
              <div className="platform-stat-row heading">
                <span>Employee ID</span>
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span>Department</span>
                <span>Employment Type</span>
                <span>Monthly Salary</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {employees.map((emp) => (
                <div className="platform-stat-row" key={emp.id}>
                  <span>
                    <strong>{emp.employeeId}</strong>
                  </span>
                  <span>
                    <strong>{emp.fullName}</strong>
                    <small>{emp.phone || "No phone"}</small>
                  </span>
                  <span><small>{emp.email}</small></span>
                  <b>{emp.role}</b>
                  <b>{emp.department}</b>
                  <span><small>{emp.employmentType.replace(/_/g, " ")}</small></span>
                  <b className="text-success">{money(emp.monthlySalary)}</b>
                  <span>
                    <span className={emp.isActive ? "status-resolved" : "status-rejected"}>
                      {emp.isActive ? "Active" : "Inactive"}
                    </span>
                  </span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="superadmin-icon-button"
                      title="Edit"
                      onClick={() => setEditingEmployee(emp)}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="superadmin-icon-button danger"
                      title="Delete"
                      onClick={() => setDeleteConfirm(emp)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </span>
                </div>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="principal-pagination" style={{ marginTop: "20px" }}>
                <button
                  disabled={pagination.page === 1}
                  onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                >
                  Previous
                </button>
                <span>Page {pagination.page} of {pagination.totalPages}</span>
                <button
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="superadmin-empty">
            {search || filters.role || filters.department || filters.status
              ? "No employees match your filters"
              : "No employees added yet. Add your first employee above."}
          </div>
        )}
      </section>

      {/* Add Employee Modal */}
      {showAddModal && (
        <EmployeeFormModal
          title="Add Company Employee"
          onClose={() => setShowAddModal(false)}
          onSave={handleAddEmployee}
          saving={savingEmployee}
        />
      )}

      {/* Edit Employee Modal */}
      {editingEmployee && (
        <EmployeeFormModal
          title="Edit Employee"
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={(data) => handleUpdateEmployee(editingEmployee.id, data)}
          saving={savingEmployee}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <SuperAdminDeleteConfirmation
          type="employee"
          item={{ name: deleteConfirm.fullName, id: deleteConfirm.employeeId }}
          onConfirm={handleDeleteEmployee}
          onCancel={() => setDeleteConfirm(null)}
          isDeleting={deletingEmployee}
        />
      )}
    </>
  );
}

// ============================================================
// EMPLOYEE FORM MODAL COMPONENT
// ============================================================

function EmployeeFormModal({ title, employee, onClose, onSave, saving }) {
  const [formData, setFormData] = useState(employee || {
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    joiningDate: new Date().toISOString().split('T')[0],
    employmentType: "FULL_TIME",
    monthlySalary: "",
    isActive: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="superadmin-modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="superadmin-modal" onSubmit={handleSubmit} style={{ maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}>
        <div className="superadmin-modal-heading">
          <h2>{title}</h2>
          <button type="button" className="superadmin-icon-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <label>
            Employee ID *
            <input
              required
              disabled={!!employee}
              value={formData.employeeId}
              onChange={(e) => setFormData({ ...formData, employeeId: e.target.value.toUpperCase() })}
              placeholder="EMP001"
            />
          </label>

          <label>
            Full Name *
            <input
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
            />
          </label>

          <label>
            Email *
            <input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@company.com"
            />
          </label>

          <label>
            Phone
            <input
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 1234567890"
            />
          </label>

          <label>
            Role *
            <input
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Software Developer"
            />
          </label>

          <label>
            Department *
            <input
              required
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Engineering"
            />
          </label>

          <label>
            Joining Date *
            <input
              required
              type="date"
              value={formData.joiningDate instanceof Date ? formData.joiningDate.toISOString().split('T')[0] : (formData.joiningDate || "").split('T')[0]}
              onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
            />
          </label>

          <label>
            Employment Type *
            <select
              required
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
            >
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERN">Intern</option>
            </select>
          </label>

          <label>
            Monthly Salary (₹) *
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={formData.monthlySalary}
              onChange={(e) => setFormData({ ...formData, monthlySalary: e.target.value })}
              placeholder="50000"
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", gridColumn: "1 / -1" }}>
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <span>Active Employee</span>
          </label>
        </div>

        <button className="director-submit" disabled={saving} style={{ marginTop: "16px" }}>
          <Save size={16} /> {saving ? "Saving..." : employee ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

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
  const [savingDirector, setSavingDirector] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);
  const [editingDirector, setEditingDirector] = useState(null);
  const [directorSchoolSearch, setDirectorSchoolSearch] = useState("");
  const [editDirectorSchoolSearch, setEditDirectorSchoolSearch] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ backend: "checking", database: "checking" });
  const [checkingHealth, setCheckingHealth] = useState(false);
  
  // Independent cache for each dataset - PREVENTS CROSS-PAGE DATA POLLUTION
  const [dataCache, setDataCache] = useState({
    schools: { data: null, timestamp: null },
    directors: { data: null, timestamp: null },
    dashboardStats: { data: null, timestamp: null },
  });
  const CACHE_DURATION = 30000; // 30 seconds
  
  // Determine current page from route
  const currentPath = location.pathname;
  const page = currentPath.split('/').pop() || 'dashboard';
  
  // Lazy load data based on current route - FIXED CACHING LOGIC
  const loadData = useCallback(async (force = false) => {
    const currentPage = location.pathname.split('/').pop() || 'dashboard';
    
    setLoading(true);
    setError("");
    
    try {
      const now = Date.now();
      
      // Only load what's needed for current page with independent cache validation
      if (currentPage === 'dashboard' || currentPage === 'superadmin') {
        // Check if dashboard stats cache is valid
        const isCacheValid = !force && 
          dataCache.dashboardStats.data && 
          dataCache.dashboardStats.timestamp && 
          (now - dataCache.dashboardStats.timestamp) < CACHE_DURATION;
        
        if (isCacheValid) {
          setDashboardStats(dataCache.dashboardStats.data);
        } else {
          const stats = await apiGet("/platform/superadmin/dashboard/stats");
          const statsData = stats?.data || stats;
          setDashboardStats(statsData);
          setDataCache(prev => ({
            ...prev,
            dashboardStats: { data: statsData, timestamp: now }
          }));
        }
      } else if (currentPage === 'schools') {
        // Check if schools cache is valid
        const isCacheValid = !force && 
          dataCache.schools.data && 
          dataCache.schools.timestamp && 
          (now - dataCache.schools.timestamp) < CACHE_DURATION;
        
        if (isCacheValid) {
          setSchools(dataCache.schools.data);
        } else {
          const s = await apiGet("/platform/schools");
          const schoolsData = s?.data || s || [];
          setSchools(schoolsData);
          setDataCache(prev => ({
            ...prev,
            schools: { data: schoolsData, timestamp: now }
          }));
        }
      } else if (currentPage === 'directors') {
        // Check if directors cache is valid
        const isDirectorsCacheValid = !force && 
          dataCache.directors.data && 
          dataCache.directors.timestamp && 
          (now - dataCache.directors.timestamp) < CACHE_DURATION;
        
        const isSchoolsCacheValid = !force && 
          dataCache.schools.data && 
          dataCache.schools.timestamp && 
          (now - dataCache.schools.timestamp) < CACHE_DURATION;
        
        if (isDirectorsCacheValid && isSchoolsCacheValid) {
          setDirectors(dataCache.directors.data);
          setSchools(dataCache.schools.data);
        } else {
          const [d, s] = await Promise.all([
            apiGet("/platform/directors"),
            apiGet("/platform/schools"),
          ]);
          const directorsData = d?.data || d || [];
          const schoolsData = s?.data || s || [];
          setDirectors(directorsData);
          setSchools(schoolsData);
          setDataCache(prev => ({
            ...prev,
            directors: { data: directorsData, timestamp: now },
            schools: { data: schoolsData, timestamp: now }
          }));
        }
      } else if (currentPage === 'statistics') {
        // Statistics needs both datasets
        const isSchoolsCacheValid = !force && 
          dataCache.schools.data && 
          dataCache.schools.timestamp && 
          (now - dataCache.schools.timestamp) < CACHE_DURATION;
        
        const isDirectorsCacheValid = !force && 
          dataCache.directors.data && 
          dataCache.directors.timestamp && 
          (now - dataCache.directors.timestamp) < CACHE_DURATION;
        
        if (isSchoolsCacheValid && isDirectorsCacheValid) {
          setSchools(dataCache.schools.data);
          setDirectors(dataCache.directors.data);
        } else {
          const [s, d] = await Promise.all([
            apiGet("/platform/schools"),
            apiGet("/platform/directors"),
          ]);
          const schoolsData = s?.data || s || [];
          const directorsData = d?.data || d || [];
          setSchools(schoolsData);
          setDirectors(directorsData);
          setDataCache(prev => ({
            ...prev,
            schools: { data: schoolsData, timestamp: now },
            directors: { data: directorsData, timestamp: now }
          }));
        }
      } else if (currentPage === 'health') {
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
  }, [location.pathname]); // Reload when pathname changes
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
    if (!query) {
      // Show only first 3 schools when not searching
      return schools.slice(0, 3);
    }
    // Show all matching schools when searching
    return schools.filter((s) =>
      `${s.name || ""} ${s.code || ""} ${s.address || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [schools, directorSchoolSearch]);
  const filteredEditDirectorSchools = useMemo(() => {
    const query = editDirectorSchoolSearch.trim().toLowerCase();
    if (!query) {
      // Show only first 3 schools when not searching
      return schools.slice(0, 3);
    }
    // Show all matching schools when searching
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
      if (response?.credentials) {
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
    setSavingSchool(true);
    setError("");
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
    } finally {
      setSavingSchool(false);
    }
  };
  const deleteSchool = (s) => {
    setError("");
    setMessage("");
    setDeleteConfirmation({ type: "school", item: s });
  };
  const saveDirector = async (e) => {
    e.preventDefault();
    setSavingDirector(true);
    setError("");
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
    } finally {
      setSavingDirector(false);
    }
  };
  const deleteDirector = (d) => {
    setError("");
    setMessage("");
    setDeleteConfirmation({ type: "director", item: d });
  };
  
  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      // Check backend liveness
      const liveResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/health/live`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      const backendStatus = liveResponse.ok ? "responding" : "unavailable";
      
      // Check database readiness
      let databaseStatus = "unavailable";
      try {
        const readyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/health/ready`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        databaseStatus = readyResponse.ok ? "responding" : "unavailable";
      } catch {
        databaseStatus = "unavailable";
      }
      
      setHealthStatus({ backend: backendStatus, database: databaseStatus });
    } catch (err) {
      setHealthStatus({ backend: "unavailable", database: "unavailable" });
    } finally {
      setCheckingHealth(false);
    }
  };
  
  useEffect(() => {
    if (page === 'health') {
      checkHealth();
    }
  }, [page]);
  
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
                  {!editDirectorSchoolSearch && schools.length > 3 && (
                    <small className="school-assignment-hint">
                      Showing {Math.min(3, schools.length)} of {schools.length} schools. Use search to find more.
                    </small>
                  )}
                </div>
              </div>
              <button className="superadmin-icon-button" disabled={savingDirector}>
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
  
  // Prepare navigation items for RoleSidebar
  const navItems = NAV.map(item => ({
    ...item,
    badge: item.id === "schools" ? schools.length : undefined,
  }));

  return (
    <div className="platform-shell superadmin-role-shell">
      <RoleSidebar
        brandTitle="SchoolERP"
        brandSubtitle="Super Admin Portal"
        brandIcon={ShieldCheck}
        navLabel="MAIN NAVIGATION"
        navItems={navItems}
        currentPage={currentPath.split('/').pop() || 'dashboard'}
        onNavigate={(pageId) => {
          const item = NAV.find(n => n.id === pageId);
          if (item) navigate(item.path);
        }}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        user={user}
        userRole="Super Administrator"
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
            <span>SUPER ADMIN PORTAL</span>
            <h1>{pageTitle}</h1>
          </div>
          <div className="superadmin-header-search">
            <Search size={16} />
            <input type="search" aria-label="Search schools and directors" placeholder="Search schools, directors…" value={globalSearch} onChange={(e) => setGlobalSearch(e.target.value)} />
          </div>
          <div className="platform-top-actions superadmin-header-actions">
            {/* <span className="platform-live"><i /> Live workspace</span> */}
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
              
              {loading && !dashboardStats ? (
                <>
                  {/* Skeleton KPI Cards */}
                  <section className="superadmin-overview superadmin-kpis">
                    <article className="skeleton-loading">
                      <Building2 />
                      <span>Schools</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Registered institutions</small>
                    </article>
                    <article className="skeleton-loading">
                      <UserRound />
                      <span>Directors</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Platform accounts</small>
                    </article>
                    <article className="skeleton-loading">
                      <GraduationCap />
                      <span>Total students</span>
                      <strong className="skeleton-text">--</strong>
                      <small>Across all schools</small>
                    </article>
                    <article className="skeleton-loading">
                      <CircleDollarSign />
                      <span>Fees collected</span>
                      <strong className="skeleton-text">₹--</strong>
                      <small>Recorded as paid</small>
                    </article>
                  </section>
                  
                  {/* Skeleton Panels */}
                  <div className="platform-overview-grid">
                    <section className="superadmin-panel skeleton-loading">
                      <div className="superadmin-section-title">
                        <div>
                          <h2>
                            <Building2 size={19} /> Top Schools
                          </h2>
                          <p>Schools with highest enrollment</p>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                    </section>
                    
                    <section className="superadmin-panel skeleton-loading">
                      <div className="superadmin-section-title">
                        <div>
                          <h2>
                            <Users size={19} /> Recent Schools
                          </h2>
                          <p>Recently created schools</p>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                      <div className="skeleton-row">
                        <div className="skeleton-icon"></div>
                        <div className="skeleton-content">
                          <div className="skeleton-line skeleton-line-title"></div>
                          <div className="skeleton-line skeleton-line-subtitle"></div>
                        </div>
                      </div>
                    </section>
                  </div>
                </>
              ) : dashboardStats ? (
                    <>
                      <section className="superadmin-overview superadmin-kpis">
                        <article>
                          <Building2 />
                          <span>Schools</span>
                          <strong>{dashboardStats.overview?.totalSchools || 0}</strong>
                          <small>Registered institutions</small>
                        </article>
                        <article>
                          <UserRound />
                          <span>Directors</span>
                          <strong>{dashboardStats.overview?.totalDirectors || 0}</strong>
                          <small>Platform accounts</small>
                        </article>
                        <article>
                          <GraduationCap />
                          <span>Total students</span>
                          <strong>{(dashboardStats.overview?.totalStudents || 0).toLocaleString("en-IN")}</strong>
                          <small>Across all schools</small>
                        </article>
                        <article>
                          <CircleDollarSign />
                          <span>Fees collected</span>
                          <strong>{money(dashboardStats.revenue?.collected || 0)}</strong>
                          <small>Recorded as paid</small>
                        </article>
                      </section>
                      <div className="platform-overview-grid">
                        <section className="superadmin-panel">
                          <div className="superadmin-section-title">
                            <div>
                              <h2>
                                <Building2 size={19} /> Top Schools
                              </h2>
                              <p>Schools with highest enrollment</p>
                            </div>
                            <button onClick={() => navigate("/superadmin/schools")}>View all</button>
                          </div>
                          {dashboardStats.topSchools && dashboardStats.topSchools.length > 0 ? (
                            dashboardStats.topSchools.map((s) => (
                              <div className="platform-compact-row" key={s.id}>
                                <div className="network-school-mark">
                                  <School size={18} />
                                </div>
                                <div>
                                  <strong>{s.name}</strong>
                                  <small>{s.code}</small>
                                </div>
                                <b>{s.userCount} users</b>
                              </div>
                            ))
                          ) : (
                            <div className="superadmin-empty">No schools registered.</div>
                          )}
                        </section>
                        <section className="superadmin-panel">
                          <div className="superadmin-section-title">
                            <div>
                              <h2>
                                <Users size={19} /> Recent Schools
                              </h2>
                              <p>Recently created schools</p>
                            </div>
                            <button onClick={() => navigate("/superadmin/directors")}>Manage Directors</button>
                          </div>
                          {dashboardStats.recentSchools && dashboardStats.recentSchools.length > 0 ? (
                            dashboardStats.recentSchools.map((s) => (
                              <div className="platform-compact-row" key={s.id}>
                                <div className="network-school-mark">
                                  <School size={18} />
                                </div>
                                <div>
                                  <strong>{s.name}</strong>
                                  <small>{s.code} · {new Date(s.createdAt).toLocaleDateString()}</small>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="superadmin-empty">No schools created yet.</div>
                          )}
                        </section>
                      </div>
                    </>
                  ) : (
                    <div className="superadmin-empty">No dashboard data available. Try refreshing.</div>
                  )}
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
                <button className="director-submit create-school-btn" disabled={savingSchool}>
                  <Plus size={18} />
                  <span>{savingSchool ? "Creating School..." : "Create School"}</span>
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
              {loading ? (
                <div className="superadmin-loading">
                  <RefreshCw size={20} className="spin" /> Loading schools...
                </div>
              ) : error ? (
                <div className="superadmin-empty">
                  <AlertTriangle size={20} />
                  <p>Failed to load schools. {error}</p>
                  <button onClick={() => loadData(true)}>Retry</button>
                </div>
              ) : schools.length ? (
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
                        {!directorSchoolSearch && schools.length > 3 && (
                          <small className="school-assignment-hint">
                            Showing {Math.min(3, schools.length)} of {schools.length} schools. Use search to find more.
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
              {loading ? (
                <div className="superadmin-loading">
                  <RefreshCw size={20} className="spin" /> Loading directors...
                </div>
              ) : error ? (
                <div className="superadmin-empty">
                  <AlertTriangle size={20} />
                  <p>Failed to load directors. {error}</p>
                  <button onClick={() => loadData(true)}>Retry</button>
                </div>
              ) : directors.length ? (
                directorCards
              ) : (
                <div className="superadmin-empty">
                  No directors created yet. Create your first director above.
                </div>
              )}
            </section>
          </>
          } />
          
          {/* Statistics Route */}
          <Route path="statistics" element={
          <>
            {loading ? (
              <div className="superadmin-loading">
                <RefreshCw size={20} className="spin" /> Loading statistics...
              </div>
            ) : error ? (
              <div className="superadmin-empty">
                <AlertTriangle size={20} />
                <p>Failed to load statistics. {error}</p>
                <button onClick={() => loadData(true)}>Retry</button>
              </div>
            ) : (
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
            )}
          </>
          } />
          
          {/* Company Stats Route */}
          <Route path="company-stats" element={
            <CompanyStatsPage 
              loading={loading}
              error={error}
              message={message}
              setError={setError}
              setMessage={setMessage}
              onRefresh={() => loadData(true)}
            />
          } />
          
          {/* Health Route */}
          <Route path="health" element={
          <section className="superadmin-panel platform-health-panel">
            <div className="superadmin-section-title">
              <div>
                <h2>
                  <Activity size={19} /> Platform health & system status
                </h2>
                <p>Monitor backend services and database connectivity.</p>
              </div>
              {checkingHealth ? (
                <span className="health-badge">
                  <RefreshCw size={13} /> Checking...
                </span>
              ) : (
                <button onClick={checkHealth} className="superadmin-refresh" title="Recheck health">
                  <RefreshCw size={15} /> 
                </button>
                
              )}
            </div>
            
            <div className="health-status-row">
              <span>
                <Activity size={16} /> Backend API Server
              </span>
              <strong className={
                healthStatus.backend === "responding" ? "health-ok" : 
                healthStatus.backend === "checking" ? "health-unknown" : 
                "health-error"
              }>
                {healthStatus.backend === "responding" ? "Responding" : 
                 healthStatus.backend === "checking" ? "Checking..." : 
                 "Unavailable"}
              </strong>
            </div>
            
            <div className="health-status-row">
              <span>
                <Activity size={16} /> Database Connection
              </span>
              <strong className={
                healthStatus.database === "responding" ? "health-ok" : 
                healthStatus.database === "checking" ? "health-unknown" : 
                "health-error"
              }>
                {healthStatus.database === "responding" ? "Connected" : 
                 healthStatus.database === "checking" ? "Checking..." : 
                 "Unavailable"}
              </strong>
            </div>
            
            {(healthStatus.backend === "unavailable" || healthStatus.database === "unavailable") && (
              <div className="health-notice">
                <div className="health-notice-icon">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <strong>Service unavailable</strong>
                  <p>
                    One or more services are not responding. Please ensure the backend server is running 
                    and the database is accessible.
                  </p>
                  <small>
                    Backend URL: {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}
                  </small>
                </div>
              </div>
            )}
            
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
            <button className="director-submit" disabled={savingSchool}>
              <Save size={16} /> {savingSchool ? "Saving…" : "Save changes"}
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
