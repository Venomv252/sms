import React, { useState, useEffect } from "react";
import { Search, Plus, IndianRupee, Calendar, CheckCircle, Clock, AlertTriangle, FileText, Edit, Printer, Filter, X as XIcon } from "lucide-react";
import { apiGet, apiPost, apiPatch } from "../../../api.js";

export default function StudentFeeManagement({ setError, setMessage }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentFees, setStudentFees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddFeeModal, setShowAddFeeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(null);
  const [showInvoice, setShowInvoice] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    grade: "",
    section: "",
    feeStatus: "all", // all, pending, paid, overdue
    sortBy: "name" // name, rollNumber, pendingAmount
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await apiGet("/accountant/students");
      setStudents(data || []);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const loadStudentFees = async (studentId) => {
    setLoading(true);
    try {
      const data = await apiGet(`/accountant/students/${studentId}/fees`);
      setSelectedStudent(data.student);
      setStudentFees(data.fees || []);
    } catch (err) {
      setError(err.message || "Failed to load student fees");
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => {
    // Text search filter
    const matchesSearch = searchQuery.trim() === "" ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.class.toLowerCase().includes(searchQuery.toLowerCase());

    // Grade filter
    const matchesGrade = !filters.grade || s.class.startsWith(filters.grade);

    // Section filter
    const matchesSection = !filters.section || s.class.endsWith(filters.section);

    // Fee status filter
    let matchesFeeStatus = true;
    if (filters.feeStatus === "pending") {
      matchesFeeStatus = s.pendingAmount > 0;
    } else if (filters.feeStatus === "paid") {
      matchesFeeStatus = s.pendingAmount === 0 && s.totalFee > 0;
    } else if (filters.feeStatus === "overdue") {
      matchesFeeStatus = s.isOverdue;
    }

    return matchesSearch && matchesGrade && matchesSection && matchesFeeStatus;
  }).sort((a, b) => {
    // Sort by selected option
    switch (filters.sortBy) {
      case "rollNumber":
        return a.rollNumber.localeCompare(b.rollNumber);
      case "pendingAmount":
        return b.pendingAmount - a.pendingAmount;
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Get unique grades and sections for filter options
  const uniqueGrades = [...new Set(students.map(s => s.class.split('-')[0]))].sort();
  const uniqueSections = [...new Set(students.map(s => s.class.split('-')[1]))].sort();

  const activeFilterCount = [
    filters.grade,
    filters.section,
    filters.feeStatus !== "all",
    filters.sortBy !== "name"
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      grade: "",
      section: "",
      feeStatus: "all",
      sortBy: "name"
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PAID": return "#10b981";
      case "PARTIAL": return "#f59e0b";
      case "OVERDUE": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PAID": return <CheckCircle size={16} />;
      case "PARTIAL": return <Clock size={16} />;
      case "OVERDUE": return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "20px", height: "calc(100vh - 180px)" }}>
      {/* Students List */}
      <div className="superadmin-panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <div className="superadmin-section-title">
          <div>
            <h2 style={{ fontSize: "16px" }}>Students</h2>
            <p style={{ fontSize: "12px" }}>Select a student to manage fees</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--rp-muted)" }} />
            <input
              type="search"
              placeholder="Search by name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 10px 10px 38px",
                border: "1px solid var(--rp-border)",
                borderRadius: "8px",
                fontSize: "13px"
              }}
            />
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            style={{
              position: "relative",
              padding: "10px 14px",
              border: `1px solid ${activeFilterCount > 0 ? "var(--rp-green)" : "var(--rp-border)"}`,
              borderRadius: "8px",
              background: activeFilterCount > 0 ? "var(--rp-green-soft)" : "var(--rp-panel)",
              color: activeFilterCount > 0 ? "var(--rp-green)" : "var(--rp-text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: 500,
              fontSize: "13px"
            }}
          >
            <Filter size={16} />
            Filter
            {activeFilterCount > 0 && (
              <span style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                background: "var(--rp-green)",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700
              }}>
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {activeFilterCount > 0 && (
          <div style={{
            padding: "10px 12px",
            background: "var(--rp-green-soft)",
            borderRadius: "8px",
            marginBottom: "12px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px"
            }}>
              <span style={{ color: "var(--rp-green)", fontWeight: 600, fontSize: "12px" }}>
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
              </span>
              <button
                onClick={clearFilters}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--rp-green)",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: 600,
                  textDecoration: "underline",
                  padding: "2px 4px"
                }}
              >
                Clear all
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {filters.grade && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  background: "white",
                  border: "1px solid var(--rp-green)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--rp-green)"
                }}>
                  Grade {filters.grade}
                  <XIcon
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setFilters({ ...filters, grade: "" })}
                  />
                </span>
              )}
              {filters.section && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  background: "white",
                  border: "1px solid var(--rp-green)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--rp-green)"
                }}>
                  Section {filters.section}
                  <XIcon
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setFilters({ ...filters, section: "" })}
                  />
                </span>
              )}
              {filters.feeStatus !== "all" && (
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  background: "white",
                  border: "1px solid var(--rp-green)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--rp-green)"
                }}>
                  {filters.feeStatus === "pending" ? "Pending" : filters.feeStatus === "paid" ? "Paid" : "Overdue"}
                  <XIcon
                    size={12}
                    style={{ cursor: "pointer" }}
                    onClick={() => setFilters({ ...filters, feeStatus: "all" })}
                  />
                </span>
              )}
            </div>
          </div>
        )}

        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              onClick={() => loadStudentFees(student.id)}
              style={{
                padding: "12px",
                marginBottom: "8px",
                border: "1px solid var(--rp-border)",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: selectedStudent?.id === student.id ? "var(--rp-green-soft)" : "var(--rp-panel)",
                borderColor: selectedStudent?.id === student.id ? "var(--rp-green)" : "var(--rp-border)",
                transition: "all 0.2s"
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>{student.name}</div>
              <div style={{ fontSize: "11px", color: "var(--rp-muted)" }}>
                Roll: {student.rollNumber} | Class: {student.class}
              </div>
              {student.pendingAmount > 0 && (
                <div style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px", fontWeight: 600 }}>
                  Pending: ₹{student.pendingAmount.toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fee Details */}
      <div className="superadmin-panel" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {selectedStudent ? (
          <>
            <div className="superadmin-section-title">
              <div>
                <h2 style={{ fontSize: "16px" }}>{selectedStudent.name}</h2>
                <p style={{ fontSize: "12px" }}>
                  Roll: {selectedStudent.rollNumber} | Admission: {selectedStudent.admissionNumber} | Class: {selectedStudent.grade}-{selectedStudent.section}
                </p>
              </div>
              <button
                className="principal-action-btn"
                onClick={() => setShowAddFeeModal(true)}
                style={{ background: "var(--rp-green)", color: "white", border: "none" }}
              >
                <Plus size={16} /> Add Fee
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto" }}>
              {studentFees.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {studentFees.map((fee) => (
                    <div
                      key={fee.id}
                      style={{
                        padding: "16px",
                        border: "1px solid var(--rp-border)",
                        borderRadius: "10px",
                        backgroundColor: "var(--rp-panel-2)"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                            {fee.feeType}
                          </div>
                          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--rp-green)" }}>
                            ₹{fee.amount.toLocaleString()}
                          </div>
                        </div>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 600,
                          backgroundColor: `${getStatusColor(fee.status)}20`,
                          color: getStatusColor(fee.status)
                        }}>
                          {getStatusIcon(fee.status)}
                          {fee.status}
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", fontSize: "12px" }}>
                        <div>
                          <div style={{ color: "var(--rp-muted)", marginBottom: "4px" }}>Due Date</div>
                          <div style={{ fontWeight: 500 }}>{new Date(fee.dueDate).toLocaleDateString()}</div>
                        </div>
                        {fee.paymentDate && (
                          <div>
                            <div style={{ color: "var(--rp-muted)", marginBottom: "4px" }}>Payment Date</div>
                            <div style={{ fontWeight: 500 }}>{new Date(fee.paymentDate).toLocaleDateString()}</div>
                          </div>
                        )}
                        {fee.paymentMethod && (
                          <div>
                            <div style={{ color: "var(--rp-muted)", marginBottom: "4px" }}>Payment Method</div>
                            <div style={{ fontWeight: 500 }}>{fee.paymentMethod}</div>
                          </div>
                        )}
                        {fee.transactionId && (
                          <div>
                            <div style={{ color: "var(--rp-muted)", marginBottom: "4px" }}>Transaction ID</div>
                            <div style={{ fontWeight: 500, fontFamily: "monospace", fontSize: "11px" }}>{fee.transactionId}</div>
                          </div>
                        )}
                      </div>

                      {fee.remarks && (
                        <div style={{ marginTop: "12px", padding: "8px", background: "var(--rp-panel)", borderRadius: "6px", fontSize: "12px" }}>
                          <strong>Remarks:</strong> {fee.remarks}
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                        {fee.status !== "PAID" && (
                          <button
                            className="principal-action-btn"
                            onClick={() => setShowPaymentModal(fee)}
                            style={{ flex: 1 }}
                          >
                            <CheckCircle size={14} /> Mark as Paid
                          </button>
                        )}
                        {fee.status === "PAID" && (
                          <button
                            className="principal-action-btn"
                            onClick={() => setShowInvoice(fee)}
                            style={{ flex: 1, background: "#3b82f6", borderColor: "#3b82f6" }}
                          >
                            <Printer size={14} /> Generate Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--rp-muted)" }}>
                  <FileText size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
                  <p>No fees added yet for this student</p>
                  <button
                    className="principal-action-btn"
                    onClick={() => setShowAddFeeModal(true)}
                    style={{ marginTop: "16px", background: "var(--rp-green)", color: "white", border: "none" }}
                  >
                    <Plus size={16} /> Add First Fee
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--rp-muted)" }}>
            <div style={{ textAlign: "center" }}>
              <Search size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
              <p>Select a student to view and manage fees</p>
            </div>
          </div>
        )}
      </div>

      {/* Add Fee Modal */}
      {showAddFeeModal && selectedStudent && (
        <AddFeeModal
          student={selectedStudent}
          onClose={() => setShowAddFeeModal(false)}
          onSuccess={() => {
            setShowAddFeeModal(false);
            loadStudentFees(selectedStudent.id);
            setMessage("Fee added successfully");
          }}
          setError={setError}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          fee={showPaymentModal}
          onClose={() => setShowPaymentModal(null)}
          onSuccess={() => {
            setShowPaymentModal(null);
            loadStudentFees(selectedStudent.id);
            setMessage("Payment recorded successfully");
          }}
          setError={setError}
        />
      )}

      {/* Invoice Modal */}
      {showInvoice && selectedStudent && (
        <InvoiceModal
          fee={showInvoice}
          student={selectedStudent}
          onClose={() => setShowInvoice(null)}
          setError={setError}
        />
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="superadmin-modal-backdrop" onClick={() => setShowFilterModal(false)}>
          <div className="superadmin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "500px" }}>
            <div className="superadmin-modal-heading">
              <h2>Filter Students</h2>
              <button type="button" className="superadmin-icon-button" onClick={() => setShowFilterModal(false)}>
                <XIcon size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Grade Filter */}
              <label>
                Grade/Class
                <select
                  value={filters.grade}
                  onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--rp-border)",
                    borderRadius: "8px",
                    fontSize: "13px"
                  }}
                >
                  <option value="">All Grades</option>
                  {uniqueGrades.map(grade => (
                    <option key={grade} value={grade}>Grade {grade}</option>
                  ))}
                </select>
              </label>

              {/* Section Filter */}
              <label>
                Section
                <select
                  value={filters.section}
                  onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--rp-border)",
                    borderRadius: "8px",
                    fontSize: "13px"
                  }}
                >
                  <option value="">All Sections</option>
                  {uniqueSections.map(section => (
                    <option key={section} value={section}>Section {section}</option>
                  ))}
                </select>
              </label>

              {/* Fee Status Filter */}
              <label>
                Fee Status
                <select
                  value={filters.feeStatus}
                  onChange={(e) => setFilters({ ...filters, feeStatus: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--rp-border)",
                    borderRadius: "8px",
                    fontSize: "13px"
                  }}
                >
                  <option value="all">All Students</option>
                  <option value="pending">Pending Fees Only</option>
                  <option value="paid">Fully Paid</option>
                  <option value="overdue">Overdue Fees</option>
                </select>
              </label>

              {/* Sort By */}
              <label>
                Sort By
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid var(--rp-border)",
                    borderRadius: "8px",
                    fontSize: "13px"
                  }}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="rollNumber">Roll Number</option>
                  <option value="pendingAmount">Pending Amount (High to Low)</option>
                </select>
              </label>

              {/* Filter Summary */}
              <div style={{
                padding: "12px",
                background: "var(--rp-panel-2)",
                borderRadius: "8px",
                fontSize: "13px"
              }}>
                <div style={{ fontWeight: 600, marginBottom: "8px", color: "var(--rp-text)" }}>
                  Filter Summary
                </div>
                <div style={{ color: "var(--rp-muted)", lineHeight: 1.6 }}>
                  {filters.grade && <div>• Grade: {filters.grade}</div>}
                  {filters.section && <div>• Section: {filters.section}</div>}
                  {filters.feeStatus !== "all" && (
                    <div>• Status: {filters.feeStatus === "pending" ? "Pending Fees" : filters.feeStatus === "paid" ? "Fully Paid" : "Overdue"}</div>
                  )}
                  <div>• Sort: {filters.sortBy === "name" ? "Name" : filters.sortBy === "rollNumber" ? "Roll Number" : "Pending Amount"}</div>
                  {!filters.grade && !filters.section && filters.feeStatus === "all" && filters.sortBy === "name" && (
                    <div style={{ color: "var(--rp-muted)", fontStyle: "italic" }}>No filters applied</div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={clearFilters}
                  style={{
                    flex: 1,
                    padding: "12px",
                    border: "1px solid var(--rp-border)",
                    borderRadius: "8px",
                    background: "var(--rp-panel)",
                    color: "var(--rp-text)",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px"
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="director-submit"
                  style={{ flex: 1 }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add Fee Modal Component
function AddFeeModal({ student, onClose, onSuccess, setError }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    feeType: "",
    amount: "",
    dueDate: "",
    remarks: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPost(`/accountant/students/${student.id}/fees`, formData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to add fee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="superadmin-modal-backdrop" onClick={onClose}>
      <form className="superadmin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div className="superadmin-modal-heading">
          <h2>Add Fee for {student.name}</h2>
          <button type="button" className="superadmin-icon-button" onClick={onClose}>✕</button>
        </div>

        <label>
          Fee Type *
          <select
            value={formData.feeType}
            onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
            required
          >
            <option value="">Select fee type</option>
            <option value="Tuition Fee">Tuition Fee</option>
            <option value="Admission Fee">Admission Fee</option>
            <option value="Exam Fee">Exam Fee</option>
            <option value="Lab Fee">Lab Fee</option>
            <option value="Library Fee">Library Fee</option>
            <option value="Sports Fee">Sports Fee</option>
            <option value="Transport Fee">Transport Fee</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Amount (₹) *
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            placeholder="Enter amount"
          />
        </label>

        <label>
          Due Date *
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </label>

        <label>
          Remarks (optional)
          <textarea
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            rows={3}
            placeholder="Add any notes or remarks"
          />
        </label>

        <button className="director-submit" disabled={loading}>
          <Plus size={16} />
          {loading ? "Adding..." : "Add Fee"}
        </button>
      </form>
    </div>
  );
}

// Payment Modal Component
function PaymentModal({ fee, onClose, onSuccess, setError }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: "PAID",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "",
    transactionId: "",
    remarks: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiPatch(`/accountant/fees/${fee.id}`, formData);
      onSuccess();
    } catch (err) {
      setError(err.message || "Failed to record payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="superadmin-modal-backdrop" onClick={onClose}>
      <form className="superadmin-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div className="superadmin-modal-heading">
          <h2>Record Payment</h2>
          <button type="button" className="superadmin-icon-button" onClick={onClose}>✕</button>
        </div>

        <div style={{ padding: "12px", background: "var(--rp-panel-2)", borderRadius: "8px", marginBottom: "16px" }}>
          <div style={{ fontSize: "12px", color: "var(--rp-muted)", marginBottom: "4px" }}>Fee Type</div>
          <div style={{ fontWeight: 600 }}>{fee.feeType}</div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--rp-green)", marginTop: "8px" }}>
            ₹{fee.amount.toLocaleString()}
          </div>
        </div>

        <label>
          Payment Date *
          <input
            type="date"
            value={formData.paymentDate}
            onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
            required
          />
        </label>

        <label>
          Payment Method *
          <select
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
            required
          >
            <option value="">Select payment method</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
            <option value="Online Transfer">Online Transfer</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </label>

        <label>
          Transaction ID (optional)
          <input
            type="text"
            value={formData.transactionId}
            onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
            placeholder="Enter transaction reference number"
          />
        </label>

        <label>
          Remarks (optional)
          <textarea
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            rows={3}
            placeholder="Add any notes"
          />
        </label>

        <button className="director-submit" disabled={loading}>
          <CheckCircle size={16} />
          {loading ? "Recording..." : "Record Payment"}
        </button>
      </form>
    </div>
  );
}

// Invoice Modal Component
function InvoiceModal({ fee, student, onClose, setError }) {
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoiceData();
  }, []);

  const loadInvoiceData = async () => {
    try {
      const data = await apiGet(`/accountant/fees/${fee.id}/invoice`);
      setInvoiceData(data);
    } catch (err) {
      setError(err.message || "Failed to load invoice data");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="superadmin-modal-backdrop">
        <div className="superadmin-modal" style={{ maxWidth: "800px" }}>
          <div style={{ padding: "60px", textAlign: "center", color: "var(--rp-muted)" }}>
            Loading invoice...
          </div>
        </div>
      </div>
    );
  }

  if (!invoiceData) return null;

  const { invoice, school, student: studentInfo, payment } = invoiceData;

  return (
    <div className="superadmin-modal-backdrop" onClick={onClose}>
      <div className="superadmin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "800px" }}>
        <div className="superadmin-modal-heading">
          <h2>Fee Payment Invoice</h2>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="button" className="principal-action-btn" onClick={handlePrint} style={{ background: "#3b82f6", border: "none", color: "white" }}>
              <Printer size={16} /> Print
            </button>
            <button type="button" className="superadmin-icon-button" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Invoice Content */}
        <div id="invoice-content" style={{ padding: "32px", background: "white" }}>
          {/* Header */}
          <div style={{ borderBottom: "2px solid var(--rp-border)", paddingBottom: "20px", marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--rp-green)", margin: "0 0 8px 0" }}>
              {school.name}
            </h1>
            <p style={{ margin: 0, color: "var(--rp-muted)", fontSize: "13px" }}>{school.address}</p>
            <p style={{ margin: "4px 0 0 0", color: "var(--rp-muted)", fontSize: "13px" }}>School Code: {school.code}</p>
          </div>

          {/* Invoice Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--rp-text)" }}>INVOICE TO:</h3>
              <p style={{ margin: "0 0 4px 0", fontWeight: 600 }}>{studentInfo.name}</p>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "var(--rp-muted)" }}>Roll Number: {studentInfo.rollNumber}</p>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "var(--rp-muted)" }}>Admission: {studentInfo.admissionNumber}</p>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "var(--rp-muted)" }}>Class: {studentInfo.grade}-{studentInfo.section}</p>
              {studentInfo.email && <p style={{ margin: "0", fontSize: "13px", color: "var(--rp-muted)" }}>{studentInfo.email}</p>}
            </div>
            <div style={{ textAlign: "right" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px", color: "var(--rp-text)" }}>INVOICE DETAILS:</h3>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px" }}>Invoice #: <strong>{invoice.invoiceNumber}</strong></p>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px" }}>Invoice Date: <strong>{new Date(invoice.invoiceDate).toLocaleDateString()}</strong></p>
              <p style={{ margin: "0 0 4px 0", fontSize: "13px" }}>Due Date: <strong>{new Date(invoice.dueDate).toLocaleDateString()}</strong></p>
              <div style={{
                display: "inline-block",
                marginTop: "8px",
                padding: "6px 12px",
                borderRadius: "6px",
                backgroundColor: "#10b98120",
                color: "#10b981",
                fontSize: "12px",
                fontWeight: 700
              }}>
                ✓ PAID
              </div>
            </div>
          </div>

          {/* Fee Details Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--rp-panel-2)", borderBottom: "2px solid var(--rp-border)" }}>
                <th style={{ padding: "12px", textAlign: "left", fontSize: "13px", fontWeight: 600 }}>Description</th>
                <th style={{ padding: "12px", textAlign: "right", fontSize: "13px", fontWeight: 600 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--rp-border)" }}>
                <td style={{ padding: "16px 12px", fontSize: "14px" }}>{payment.feeType}</td>
                <td style={{ padding: "16px 12px", textAlign: "right", fontSize: "14px" }}>₹{payment.amount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid var(--rp-border)", backgroundColor: "var(--rp-green-soft)" }}>
                <td style={{ padding: "16px 12px", fontSize: "16px", fontWeight: 700 }}>Total Amount</td>
                <td style={{ padding: "16px 12px", textAlign: "right", fontSize: "20px", fontWeight: 700, color: "var(--rp-green)" }}>
                  ₹{payment.amount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Payment Details */}
          <div style={{ padding: "16px", background: "var(--rp-panel-2)", borderRadius: "8px", marginBottom: "24px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>Payment Information</h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", fontSize: "13px" }}>
              <div>
                <span style={{ color: "var(--rp-muted)" }}>Payment Date:</span>
                <strong style={{ marginLeft: "8px" }}>{new Date(payment.paymentDate).toLocaleDateString()}</strong>
              </div>
              <div>
                <span style={{ color: "var(--rp-muted)" }}>Payment Method:</span>
                <strong style={{ marginLeft: "8px" }}>{payment.paymentMethod}</strong>
              </div>
              {payment.transactionId && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <span style={{ color: "var(--rp-muted)" }}>Transaction ID:</span>
                  <strong style={{ marginLeft: "8px", fontFamily: "monospace" }}>{payment.transactionId}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", paddingTop: "24px", borderTop: "1px solid var(--rp-border)", fontSize: "12px", color: "var(--rp-muted)" }}>
            <p style={{ margin: 0 }}>This is a computer-generated invoice. No signature required.</p>
            <p style={{ margin: "8px 0 0 0" }}>For any queries, please contact the school office.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
