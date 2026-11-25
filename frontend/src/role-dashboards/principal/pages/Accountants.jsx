import React, { useEffect, useState } from "react";
import { UserCheck, Plus, X, Save, Pencil, Trash2 } from "lucide-react";
import { apiGet, apiPost, apiPatch, apiDelete } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";
import SuperAdminDeleteConfirmation from "../../../components/SuperAdminDeleteConfirmation.jsx";
import "./accountants.css";

export default function Accountants({ setError, setMessage, schoolName }) {
  const [accountants, setAccountants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [editingAccountant, setEditingAccountant] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", employeeId: "", phoneNumber: "",
    username: "",
    temporaryPassword: "",
    permissions: { feeCollection: true, concessions: false, expenses: false, payroll: false, reports: true, approvals: false },
    approvalLimit: ""
  });

  const loadAccountants = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiGet("/principal/accountants");
      setAccountants(data || []);
    } catch (err) {
      setError(err.message || "Unable to load accountants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccountants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        employeeId: form.employeeId,
        phoneNumber: form.phoneNumber,
        username: form.username,
        temporaryPassword: form.temporaryPassword,
        permissions: form.permissions,
        approvalLimit: form.approvalLimit,
      };
      
      const response = await apiPost("/principal/accountants", payload);
      
      // Show credentials modal
      if (response.credentials) {
        setCreatedCredentials({
          username: response.credentials.username,
          password: response.credentials.temporaryPassword,
          role: "Accountant",
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          schools: schoolName, // Single school name for Accountant
        });
      }
      
      setMessage("Accountant created successfully");
      setForm({ 
        firstName: "", lastName: "", email: "", employeeId: "", phoneNumber: "",
        username: "",
        temporaryPassword: "",
        permissions: { feeCollection: true, concessions: false, expenses: false, payroll: false, reports: true, approvals: false },
        approvalLimit: ""
      });
      setShowForm(false);
      await loadAccountants();
    } catch (err) {
      setError(err.message || "Unable to create accountant");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (accountant) => {
    setEditingAccountant({
      id: accountant.id,
      firstName: accountant.firstName || "",
      lastName: accountant.lastName || "",
      email: accountant.email || "",
      employeeId: accountant.employeeId || "",
      phoneNumber: accountant.phoneNumber || "",
      approvalLimit: accountant.approvalLimit || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      await apiPatch(`/principal/accountants/${editingAccountant.id}`, {
        firstName: editingAccountant.firstName,
        lastName: editingAccountant.lastName,
        email: editingAccountant.email,
        employeeId: editingAccountant.employeeId,
        phoneNumber: editingAccountant.phoneNumber,
        approvalLimit: editingAccountant.approvalLimit,
      });
      
      setMessage("Accountant updated successfully");
      setEditingAccountant(null);
      await loadAccountants();
    } catch (err) {
      setError(err.message || "Unable to update accountant");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    
    try {
      await apiDelete(`/principal/accountants/${deleteConfirmation.id}`);
      setMessage(`Accountant "${deleteConfirmation.name}" deleted successfully`);
      setDeleteConfirmation(null);
      await loadAccountants();
    } catch (err) {
      setError(err.message || "Unable to delete accountant");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><UserCheck size={19} /> Accountant Management</h2>
            <p>Create and manage accountant accounts for your school</p>
          </div>
          <button onClick={() => setShowForm(true)}><Plus size={16} /> Create Accountant</button>
        </div>

        {loading && <div className="superadmin-loading">Loading accountants...</div>}

        {!loading && accountants.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Name</span>
              <span>Employee ID</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {accountants.map((acc) => (
              <div className="platform-stat-row" key={acc.id}>
                <span><strong>{acc.name}</strong></span>
                <span>{acc.employeeId}</span>
                <span><small>{acc.email}</small></span>
                <span><small>{acc.phoneNumber || "—"}</small></span>
                <span className={acc.isActive ? "text-success" : "text-muted"}>{acc.isActive ? "Active" : "Inactive"}</span>
                <span style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
                  <button 
                    className="superadmin-icon-button" 
                    onClick={() => handleEdit(acc)}
                    title="Edit accountant"
                  >
                    <Pencil size={15} />
                  </button>
                  <button 
                    className="superadmin-icon-button danger" 
                    onClick={() => setDeleteConfirmation({ 
                      id: acc.id, 
                      name: acc.name,
                      type: 'accountant',
                      details: `Employee ID: ${acc.employeeId}`
                    })}
                    title="Delete accountant"
                  >
                    <Trash2 size={15} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading && accountants.length === 0 && (
          <div className="superadmin-empty">No accountants created yet. Create your first accountant to manage school finances.</div>
        )}
      </section>

      {showForm && (
        <div className="superadmin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <form className="superadmin-modal" onSubmit={handleSubmit}>
            <div className="superadmin-modal-heading">
              <h2>Create Accountant Account</h2>
              <button type="button" className="superadmin-icon-button" onClick={() => setShowForm(false)}><X size={18} /></button>
            </div>

            <div className="principal-form-grid">
              <label>First Name *<input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></label>
              <label>Last Name *<input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></label>
              <label>Email *<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label>Employee ID *<input required value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} /></label>
              <label>Phone Number<input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} /></label>
              <label>Approval Limit (₹)<input type="number" value={form.approvalLimit} onChange={(e) => setForm({ ...form, approvalLimit: e.target.value })} /></label>
            </div>

            <div className="principal-form-grid" style={{ marginTop: '12px' }}>
              <label>
                Username *
                <input 
                  required
                  minLength={3}
                  maxLength={30}
                  value={form.username} 
                  onChange={(e) => setForm({ ...form, username: e.target.value })} 
                  placeholder="Username for login"
                />
              </label>
              <label>
                Temporary Password *
                <input 
                  required
                  type="password" 
                  minLength={8}
                  maxLength={72}
                  value={form.temporaryPassword} 
                  onChange={(e) => setForm({ ...form, temporaryPassword: e.target.value })} 
                  placeholder="Temporary password"
                />
              </label>
            </div>
            <small style={{ display: 'block', marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
              8–72 characters. User should change after first login.
            </small>

            <button className="director-submit" disabled={saving}><Save size={16} /> {saving ? "Creating..." : "Create Accountant"}</button>
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

      {editingAccountant && (
        <div className="superadmin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditingAccountant(null); }}>
          <form className="superadmin-modal" onSubmit={handleUpdate}>
            <div className="superadmin-modal-heading">
              <h2>Edit Accountant</h2>
              <button type="button" className="superadmin-icon-button" onClick={() => setEditingAccountant(null)}><X size={18} /></button>
            </div>

            <div className="principal-form-grid">
              <label>First Name *<input required value={editingAccountant.firstName} onChange={(e) => setEditingAccountant({ ...editingAccountant, firstName: e.target.value })} /></label>
              <label>Last Name *<input required value={editingAccountant.lastName} onChange={(e) => setEditingAccountant({ ...editingAccountant, lastName: e.target.value })} /></label>
              <label>Email *<input required type="email" value={editingAccountant.email} onChange={(e) => setEditingAccountant({ ...editingAccountant, email: e.target.value })} /></label>
              <label>Employee ID *<input required value={editingAccountant.employeeId} onChange={(e) => setEditingAccountant({ ...editingAccountant, employeeId: e.target.value })} /></label>
              <label>Phone Number<input value={editingAccountant.phoneNumber} onChange={(e) => setEditingAccountant({ ...editingAccountant, phoneNumber: e.target.value })} /></label>
              <label>Approval Limit (₹)<input type="number" value={editingAccountant.approvalLimit} onChange={(e) => setEditingAccountant({ ...editingAccountant, approvalLimit: e.target.value })} /></label>
            </div>

            <button className="director-submit" disabled={saving}><Save size={16} /> {saving ? "Updating..." : "Update Accountant"}</button>
          </form>
        </div>
      )}

      {deleteConfirmation && (
        <SuperAdminDeleteConfirmation
          type="accountant"
          item={{
            name: deleteConfirmation.name
          }}
          onCancel={() => setDeleteConfirmation(null)}
          onConfirm={handleDelete}
          isDeleting={deleting}
        />
      )}
    </>
  );
}
