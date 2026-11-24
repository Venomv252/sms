import React, { useEffect, useState } from "react";
import { Search, Users, X } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Teachers({ setError, setMessage }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const loadTeachers = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(search && { search }),
        ...(department && { department }),
      });

      const data = await apiGet(`/principal/teachers?${params}`);
      setTeachers(data.teachers || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load teachers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, [page, search, department]);

  return (
    <section className="superadmin-panel">
      <div className="superadmin-section-title">
        <div>
          <h2><Users size={19} /> Teacher Management</h2>
          <p>View and monitor teaching staff</p>
        </div>
        {pagination && <span className="superadmin-count">{pagination.total} teachers</span>}
      </div>

      <div className="principal-search-filters">
        <div className="principal-search-box">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by name, employee ID, or department..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }}>
          <option value="">All Departments</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Languages">Languages</option>
          <option value="Arts">Arts</option>
          <option value="Physical Education">Physical Education</option>
        </select>

        {(search || department) && (
          <button className="principal-filter-clear" onClick={() => { setSearch(""); setDepartment(""); setPage(1); }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {loading && <div className="superadmin-loading">Loading teachers...</div>}

      {!loading && teachers.length > 0 && (
        <div className="platform-stat-table">
          <div className="platform-stat-row heading">
            <span>Teacher</span>
            <span>Employee ID</span>
            <span>Department</span>
            <span>Designation</span>
            <span>Classes</span>
          </div>

          {teachers.map((teacher) => (
            <div className="platform-stat-row" key={teacher.id}>
              <span>
                <strong>{teacher.name}</strong>
                <small>{teacher.email}</small>
              </span>
              <b>{teacher.employeeId}</b>
              <b>{teacher.department}</b>
              <b>{teacher.designation}</b>
              <b>{teacher.classesCount || 0}</b>
            </div>
          ))}
        </div>
      )}

      {!loading && teachers.length === 0 && (
        <div className="superadmin-empty">No teachers found matching your criteria</div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="principal-pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {pagination.totalPages}</span>
          <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </section>
  );
}
