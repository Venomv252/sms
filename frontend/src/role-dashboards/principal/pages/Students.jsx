import React, { useEffect, useState } from "react";
import {
  Search,
  GraduationCap,
  Eye,
  Filter,
  X,
} from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Students({ setError, setMessage }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(search && { search }),
        ...(grade && { grade }),
        ...(section && { section }),
      });

      const data = await apiGet(`/principal/students?${params}`);
      setStudents(data.students || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  const loadStudentDetails = async (studentId) => {
    setLoadingDetails(true);
    
    try {
      const data = await apiGet(`/principal/students/${studentId}`);
      setStudentDetails(data);
    } catch (err) {
      setError(err.message || "Unable to load student details");
    } finally {
      setLoadingDetails(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [page, search, grade, section]);

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    loadStudentDetails(student.id);
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <GraduationCap size={19} /> Student Management
            </h2>
            <p>Search, view, and manage student records</p>
          </div>
          
          {pagination && (
            <span className="superadmin-count">
              {pagination.total} students
            </span>
          )}
        </div>

        <div className="principal-search-filters">
          <div className="principal-search-box">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search by name, roll number, or admission number..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <select
            value={grade}
            onChange={(e) => {
              setGrade(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Grades</option>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>

          <select
            value={section}
            onChange={(e) => {
              setSection(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Sections</option>
            {["A", "B", "C", "D", "E"].map((s) => (
              <option key={s} value={s}>
                Section {s}
              </option>
            ))}
          </select>

          {(search || grade || section) && (
            <button
              className="principal-filter-clear"
              onClick={() => {
                setSearch("");
                setGrade("");
                setSection("");
                setPage(1);
              }}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {loading && <div className="superadmin-loading">Loading students...</div>}

        {!loading && students.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Student</span>
              <span>Roll Number</span>
              <span>Class</span>
              <span>Contact</span>
              <span>Actions</span>
            </div>

            {students.map((student) => (
              <div className="platform-stat-row" key={student.id}>
                <span>
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                </span>
                <b>{student.rollNumber}</b>
                <b>{student.class}</b>
                <span>
                  <small>{student.parentPhone || "—"}</small>
                </span>
                <button
                  className="principal-action-btn"
                  onClick={() => handleViewStudent(student)}
                >
                  <Eye size={14} /> View
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && students.length === 0 && (
          <div className="superadmin-empty">
            No students found matching your criteria
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="principal-pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {pagination.totalPages}
            </span>
            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {selectedStudent && (
        <div
          className="superadmin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedStudent(null);
              setStudentDetails(null);
            }
          }}
        >
          <div className="superadmin-modal principal-student-modal">
            <div className="superadmin-modal-heading">
              <h2>Student Profile</h2>
              <button
                className="superadmin-icon-button"
                onClick={() => {
                  setSelectedStudent(null);
                  setStudentDetails(null);
                }}
              >
                <X size={18} />
              </button>
            </div>

            {loadingDetails && (
              <div className="superadmin-loading">Loading student details...</div>
            )}

            {studentDetails && (
              <div className="principal-student-details">
                <div className="principal-detail-section">
                  <h3>Personal Information</h3>
                  <div className="principal-detail-grid">
                    <div>
                      <span>Name</span>
                      <strong>{studentDetails.student.name}</strong>
                    </div>
                    <div>
                      <span>Email</span>
                      <strong>{studentDetails.student.email}</strong>
                    </div>
                    <div>
                      <span>Roll Number</span>
                      <strong>{studentDetails.student.rollNumber}</strong>
                    </div>
                    <div>
                      <span>Admission Number</span>
                      <strong>{studentDetails.student.admissionNumber}</strong>
                    </div>
                    <div>
                      <span>Class</span>
                      <strong>{studentDetails.student.class}</strong>
                    </div>
                    <div>
                      <span>Blood Group</span>
                      <strong>{studentDetails.student.bloodGroup || "—"}</strong>
                    </div>
                  </div>
                </div>

                <div className="principal-detail-section">
                  <h3>Parent/Guardian Information</h3>
                  <div className="principal-detail-grid">
                    <div>
                      <span>Parent Name</span>
                      <strong>{studentDetails.student.parentName || "—"}</strong>
                    </div>
                    <div>
                      <span>Parent Email</span>
                      <strong>{studentDetails.student.parentEmail || "—"}</strong>
                    </div>
                    <div>
                      <span>Parent Phone</span>
                      <strong>{studentDetails.student.parentPhone || "—"}</strong>
                    </div>
                  </div>
                </div>

                <div className="principal-detail-section">
                  <h3>Attendance Summary</h3>
                  <div className="principal-attendance-summary">
                    <div>
                      <span>Attendance Rate</span>
                      <strong className="principal-attendance-rate">
                        {studentDetails.attendance.rate}%
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="principal-detail-section">
                  <h3>Fee Payment Status</h3>
                  <div className="principal-fee-summary">
                    <div>
                      <span>Total Fees</span>
                      <strong>₹{studentDetails.fees.total.toLocaleString("en-IN")}</strong>
                    </div>
                    <div>
                      <span>Paid</span>
                      <strong className="text-success">₹{studentDetails.fees.paid.toLocaleString("en-IN")}</strong>
                    </div>
                    <div>
                      <span>Pending</span>
                      <strong className="text-warning">₹{studentDetails.fees.pending.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
