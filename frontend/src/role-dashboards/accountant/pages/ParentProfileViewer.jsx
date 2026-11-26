import React, { useState, useEffect } from "react";
import { Search, Users, Edit2, Save, X, Phone, Mail, MapPin, Briefcase, User } from "lucide-react";
import { apiGet, apiPatch } from "../../../api.js";

export default function ParentProfileViewer({ setError, setMessage }) {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParent, setSelectedParent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      setLoading(true);
      const response = await apiGet("/accountant/parents");
      setParents(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load parents");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectParent = async (parent) => {
    try {
      const response = await apiGet(`/accountant/parents/${parent.id}`);
      setSelectedParent(response);
      setEditForm({
        firstName: response.user?.firstName || "",
        lastName: response.user?.lastName || "",
        email: response.user?.email || "",
        phoneNumber: response.phoneNumber || "",
        address: response.address || "",
        occupation: response.occupation || ""
      });
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to load parent details");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!selectedParent) return;

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await apiPatch(`/accountant/parents/${selectedParent.id}`, editForm);

      setMessage("Parent profile updated successfully!");
      setEditMode(false);
      
      await handleSelectParent(selectedParent);
      await fetchParents();
    } catch (err) {
      setError(err.message || "Failed to update parent profile");
    } finally {
      setSaving(false);
    }
  };

  const filteredParents = parents.filter(parent =>
    parent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parent.phoneNumber?.includes(searchQuery)
  );

  if (loading) {
    return (
      <section className="superadmin-panel">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading parents...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="superadmin-panel">
      <div className="superadmin-section-title">
        <div>
          <h2><Users size={19} /> Parent Profile Viewer</h2>
          <p>View and edit parent information (credentials cannot be changed)</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedParent ? "350px 1fr" : "1fr", gap: "20px" }}>
        {/* Parent List */}
        <div>
          <div style={{ marginBottom: "16px" }}>
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#999" }} />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
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
            {filteredParents.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
                <Users size={40} style={{ opacity: 0.3, marginBottom: "12px" }} />
                <p>No parents found</p>
              </div>
            ) : (
              filteredParents.map((parent) => (
                <div
                  key={parent.id}
                  onClick={() => handleSelectParent(parent)}
                  style={{
                    padding: "12px 16px",
                    marginBottom: "8px",
                    background: selectedParent?.id === parent.id ? "#e3f2fd" : "#fff",
                    border: `1px solid ${selectedParent?.id === parent.id ? "#2196f3" : "#e0e0e0"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    if (selectedParent?.id !== parent.id) {
                      e.currentTarget.style.borderColor = "#2196f3";
                      e.currentTarget.style.background = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedParent?.id !== parent.id) {
                      e.currentTarget.style.borderColor = "#e0e0e0";
                      e.currentTarget.style.background = "#fff";
                    }
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                    {parent.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    {parent.children?.length || 0} {parent.children?.length === 1 ? "child" : "children"}
                    {parent.phoneNumber && ` • ${parent.phoneNumber}`}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Parent Details */}
        {selectedParent && (
          <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>
                  {selectedParent.user?.firstName} {selectedParent.user?.lastName}
                </h3>
                <div style={{ fontSize: "13px", color: "#666" }}>
                  Parent Account • {selectedParent.children?.length || 0} {selectedParent.children?.length === 1 ? "Child" : "Children"}
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
                    background: "#2196f3",
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
                      background: "#2196f3",
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.user?.firstName || "N/A"}</div>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.user?.lastName || "N/A"}</div>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.user?.email || "N/A"}</div>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.phoneNumber || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    <Briefcase size={12} style={{ display: "inline", marginRight: "4px" }} />
                    Occupation
                  </label>
                  {editMode ? (
                    <input
                      name="occupation"
                      value={editForm.occupation}
                      onChange={handleEditChange}
                      placeholder="e.g., Software Engineer"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "14px"
                      }}
                    />
                  ) : (
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.occupation || "N/A"}</div>
                  )}
                </div>

                <div style={{ marginBottom: "16px" }}>
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
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.address || "N/A"}</div>
                  )}
                </div>
              </div>

              {/* Children Information */}
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 600, color: "#666", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Linked Children
                </h4>

                {selectedParent.children && selectedParent.children.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {selectedParent.children.map((child, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "12px",
                          background: "#f8f9fa",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px"
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>
                          {child.firstName} {child.lastName}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          Grade {child.grade} - Section {child.section}
                        </div>
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          Roll: {child.rollNumber} • Admission: {child.admissionNumber}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "40px 20px", textAlign: "center", color: "#999" }}>
                    <Users size={32} style={{ opacity: 0.3, marginBottom: "8px" }} />
                    <p style={{ fontSize: "13px" }}>No children linked to this parent</p>
                  </div>
                )}
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
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>{selectedParent.user?.username}</div>
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "4px" }}>
                    Account Created
                  </label>
                  <div style={{ fontSize: "14px", fontWeight: 500 }}>
                    {selectedParent.user?.createdAt ? new Date(selectedParent.user.createdAt).toLocaleDateString() : "N/A"}
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
