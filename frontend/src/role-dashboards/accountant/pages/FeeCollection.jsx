import React, { useEffect, useState } from "react";
import { Search, DollarSign, Filter } from "lucide-react";
import { apiGet, apiPost } from "../../../api.js";

export default function FeeCollection({ setError, setMessage }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all, pending, paid

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet(`/accountant/students?status=${filter}`);
      setStudents(data || []);
    } catch (err) {
      setError(err.message || "Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [filter]);

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><DollarSign size={19} /> Fee Collection</h2>
            <p>Collect fees from students</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div className="superadmin-search" style={{ flex: 1 }}>
            <Search size={16} />
            <input
              type="search"
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #e1e9e4' }}
          >
            <option value="all">All Students</option>
            <option value="pending">Pending Fees</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {loading && <div className="superadmin-loading">Loading students...</div>}

        {!loading && filteredStudents.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Student</span>
              <span>Class</span>
              <span>Total Fee</span>
              <span>Paid</span>
              <span>Pending</span>
              <span>Status</span>
            </div>

            {filteredStudents.map((student) => (
              <div className="platform-stat-row" key={student.id}>
                <span>
                  <strong>{student.name}</strong>
                  <small>{student.rollNumber}</small>
                </span>
                <span>{student.class}</span>
                <span>{formatCurrency(student.totalFee)}</span>
                <span className="text-success">{formatCurrency(student.paidAmount)}</span>
                <span className={student.pendingAmount > 0 ? "text-danger" : ""}>
                  {formatCurrency(student.pendingAmount)}
                </span>
                <span>
                  {student.pendingAmount === 0 ? (
                    <span className="text-success">Paid</span>
                  ) : student.isOverdue ? (
                    <span className="text-danger">Overdue</span>
                  ) : (
                    <span className="text-warning">Pending</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredStudents.length === 0 && (
          <div className="superadmin-empty">
            {search ? "No students found matching your search" : "No students available"}
          </div>
        )}
      </section>
    </>
  );
}
