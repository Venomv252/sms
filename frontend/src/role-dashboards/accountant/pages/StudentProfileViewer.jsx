import React, { useState, useEffect } from "react";
import { Search, User, Edit2, Save, X, Calendar, Phone, Mail, Hash, MapPin, Droplet, BookOpen, Shield } from "lucide-react";
import { apiGet, apiPatch } from "../../../api.js";

export default function StudentProfileViewer({ setError, setMessage }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await apiGet("/accountant/students");
      setStudents(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStudent = async (student) => {
    try {
      // Fetch full student details
      const response = await apiGet(`/students/${student.id}`);
      setSelectedStudent(response);
      setEditForm({
        firstName: response.user?.firstName || "",
        lastName: response.user?.lastName || "",
        email: response.user?.email || "",
        phoneNumber: response.phoneNumber || "",
        address: response.address || "",
        bloodGroup: response.bloodGroup || "",
        parentName: response.parentName || "",
        parentEmail: response.parentEmail || "",
        parentPhone: response.parentPhone || ""
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to load student details");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedStudent) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // Update user info
      await apiPatch(`/accountant/students/${selectedStudent.id}`, editForm);

      setMessage("Student profile updated successfully!");
      setEditMode(false);
      
      // Refresh student details
      await handleSelectStudent(selectedStudent);
      await fetchStudents();
    } catch (err) {
      setError(err.message || "Failed to update student profile");
    } finally {
      setSaving(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber?.toString().includes(searchQuery) ||
    student.class?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <section className="superadmin-panel">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading students...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="superadmin-panel">
      <div className="superadmin-section-title">
        <div>
          <h2><User size={19} /> Student Profile Viewer</h2>
          <p>View and edit student information (credentials cannot be changed)</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedStudent ? "350px 1fr" : "1fr", gap: "20px" }}>
        {/* Student List */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input
                type="text"
                placeholder="Search by name, roll number, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 40px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>

          <div style={{ maxHeight: "calc(100vh - 280px)", overflowY: "auto" }}>
            {filteredStudents.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
                <User size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
                <p>No students found</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleSelectStudent(student)}
                  style={{
                    padding: "12px 16px",
                    marginBottom: "8px",
                    background: selectedStudent?.id === student.id ? "#e8f5e9" : "#fff",
                    border: `1px solid ${selectedStudent?.id === student.id ? "#4caf50" : "#e0e0e0"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStudent?.id !== student.id) {
                      e.currentTarget.style.borderColor = "#4caf50";
                      e.currentTarget.style.background = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStudent?.id !== student.id) {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.background = "#fff";
                    }
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                    {student.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    Roll: {student.rollNumber} • Class: {student.class}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Student Details */}
        {selectedStudent && (
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
                  {selectedStudent.user?.firstName} {selectedStudent.user?.lastName}
                </h3>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  Roll: {selectedStudent.rollNumber} • Admission: {selectedStudent.admissionNumber}
                </div>
              </div>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    background: "#4caf50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setEditMode(false)}
                    disabled={saving}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "#fff",
                      color: "#666",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: saving ? "not-allowed" : "pointer"
                    }}
                  >
                    <X size={14} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      background: "#4caf50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: saving ? "not-allowed" : "pointer"
                    }}
                  >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {/* Basic Information */}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Basic Information
                </h4>
                
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <User size={12} style={{ display: "inline", marginRight: "4px" }} />
                    First Name
                  </label>
                  {editMode ? (
                    <input
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditChange}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.user?.firstName || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <User size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Last Name
                  </label>
                  {editMode ? (
                    <input
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleEditChange}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.user?.lastName || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <BookOpen size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Grade & Section
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    Grade {selectedStudent.grade} - Section {selectedStudent.section}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Hash size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Roll Number
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.rollNumber}</div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Shield size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Admission Number
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.admissionNumber}</div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Date of Birth
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedStudent.dateOfBirth ? new Date(selectedStudent.dateOfBirth).toLocaleDateString() : "N/A"}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Droplet size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Blood Group
                  </label>
                  {editMode ? (
                    <input
                      name="bloodGroup"
                      value={editForm.bloodGroup}
                      onChange={handleEditChange}
                      placeholder="e.g., A+, O-, B+"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.bloodGroup || "N/A"}</div>
                  )}
                </div>
              </div>

              {/* Contact & Parent Information */}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Contact Information
                </h4>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Mail size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Email
                  </label>
                  {editMode ? (
                    <input
                      name="email"
                      type="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                      placeholder="student@example.com"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.user?.email || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Phone size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Phone Number
                  </label>
                  {editMode ? (
                    <input
                      name="phoneNumber"
                      type="tel"
                      value={editForm.phoneNumber}
                      onChange={handleEditChange}
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.phoneNumber || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <MapPin size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Address
                  </label>
                  {editMode ? (
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      rows="3"
                      placeholder="Enter full address"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        resize: "vertical"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.address || "N/A"}</div>
                  )}
                </div>

                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: "24px" }}>
                  Parent Information
                </h4>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <User size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Parent Name
                  </label>
                  {editMode ? (
                    <input
                      name="parentName"
                      value={editForm.parentName}
                      onChange={handleEditChange}
                      placeholder="Parent or guardian name"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.parentName || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Mail size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Parent Email
                  </label>
                  {editMode ? (
                    <input
                      name="parentEmail"
                      type="email"
                      value={editForm.parentEmail}
                      onChange={handleEditChange}
                      placeholder="parent@example.com"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.parentEmail || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Phone size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Parent Phone
                  </label>
                  {editMode ? (
                    <input
                      name="parentPhone"
                      type="tel"
                      value={editForm.parentPhone}
                      onChange={handleEditChange}
                      placeholder="+1 (555) 000-0000"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.parentPhone || "N/A"}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information (Read-only) */}
            <div style={{ marginTop: "24px", padding: "16px", background: "#f8f9fa", borderRadius: "8px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Account Information (Read-only)
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    Username
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStudent.user?.username}</div>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    Account Created
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedStudent.user?.createdAt ? new Date(selectedStudent.user.createdAt).toLocaleDateString() : "N/A"}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "12px", padding: "10px", background: "#fff3cd", borderRadius: "6px", border: "1px solid #ffc107", fontSize: "12px", color: "#856404" }}>
                <strong>Note:</strong> Username and password cannot be changed from this interface. Contact system administrator for credential changes.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
