import React, { useState, useEffect } from "react";
import { Search, Briefcase, Edit2, Save, X, Phone, Mail, MapPin, User, Calendar } from "lucide-react";
import { apiGet, apiPatch } from "../../../api.js";

export default function StaffProfileViewer({ setError, setMessage }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await apiGet("/accountant/employees");
      setStaff(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load staff");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStaff = async (staffMember) => {
    try {
      const response = await apiGet(`/accountant/staff/${staffMember.id}`);
      setSelectedStaff(response);
      setEditForm({
        firstName: response.user?.firstName || "",
        lastName: response.user?.lastName || "",
        email: response.user?.email || "",
        phoneNumber: response.user?.phoneNumber || response.phoneNumber || "",
        department: response.department || "",
        salary: response.salary || ""
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to load staff details");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedStaff) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await apiPatch(`/accountant/staff/${selectedStaff.id}`, editForm);

      setMessage("Staff profile updated successfully!");
      setEditMode(false);
      
      await handleSelectStaff(selectedStaff);
      await fetchStaff();
    } catch (err) {
      setError(err.message || "Failed to update staff profile");
    } finally {
      setSaving(false);
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <section className="superadmin-panel">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading staff...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="superadmin-panel">
      <div className="superadmin-section-title">
        <div>
          <h2><Briefcase size={19} /> Staff Profile Viewer</h2>
          <p>View and edit staff information (credentials cannot be changed)</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedStaff ? "350px 1fr" : "1fr", gap: "20px" }}>
        {/* Staff List */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input
                type="text"
                placeholder="Search by name, role, or department..."
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
            {filteredStaff.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
                <Briefcase size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
                <p>No staff found</p>
              </div>
            ) : (
              filteredStaff.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleSelectStaff(member)}
                  style={{
                    padding: "12px 16px",
                    marginBottom: "8px",
                    background: selectedStaff?.id === member.id ? "#fff3e0" : "#fff",
                    border: `1px solid ${selectedStaff?.id === member.id ? "#ff9800" : "#e0e0e0"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStaff?.id !== member.id) {
                      e.currentTarget.style.borderColor = "#ff9800";
                      e.currentTarget.style.background = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStaff?.id !== member.id) {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.background = "#fff";
                    }
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {member.role} • {member.department}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Staff Details */}
        {selectedStaff && (
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
                  {selectedStaff.user?.firstName} {selectedStaff.user?.lastName}
                </h3>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  {selectedStaff.role || selectedStaff.user?.role} • {selectedStaff.department || "General"}
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
                    background: "#ff9800",
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
                      background: "#ff9800",
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
              {/* Personal Information */}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Personal Information
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStaff.user?.firstName || "N/A"}</div>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStaff.user?.lastName || "N/A"}</div>
                  )}
                </div>

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
                      placeholder="staff@example.com"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStaff.user?.email || "N/A"}</div>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>
                      {selectedStaff.user?.phoneNumber || selectedStaff.phoneNumber || "N/A"}
                    </div>
                  )}
                </div>
              </div>

              {/* Employment Information */}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Employment Information
                </h4>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Briefcase size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Role
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedStaff.role || selectedStaff.user?.role || "N/A"}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <MapPin size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Department
                  </label>
                  {editMode ? (
                    <input
                      name="department"
                      value={editForm.department}
                      onChange={handleEditChange}
                      placeholder="e.g., Academic, Transport, Administration"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStaff.department || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Calendar size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Joining Date
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedStaff.joiningDate ? new Date(selectedStaff.joiningDate).toLocaleDateString() : "N/A"}
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    💰 Monthly Salary
                  </label>
                  {editMode ? (
                    <input
                      name="salary"
                      type="number"
                      value={editForm.salary}
                      onChange={handleEditChange}
                      placeholder="Enter monthly salary"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>
                      {selectedStaff.salary ? `$${Number(selectedStaff.salary).toLocaleString()}` : "Not set"}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    Status
                  </label>
                  <div style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: selectedStaff.status === "ACTIVE" ? "#e8f5e9" : "#ffebee",
                    color: selectedStaff.status === "ACTIVE" ? "#2e7d32" : "#c62828",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 600
                  }}>
                    {selectedStaff.status || "ACTIVE"}
                  </div>
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
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedStaff.user?.username}</div>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    Account Created
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedStaff.user?.createdAt ? new Date(selectedStaff.user.createdAt).toLocaleDateString() : "N/A"}
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
