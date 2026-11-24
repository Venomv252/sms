import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  UserPlus,
  X,
  Check,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { apiGet, apiPost, apiPatch, apiDelete } from "../../../api.js";
import CredentialDisplay from "../../../components/CredentialDisplay.jsx";
import "../../school-workspace.css";

const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

function EmptyState({ children }) {
  return <div className="sw-empty">{children}</div>;
}

export default function Principals({ schoolId, schoolName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [principalModal, setPrincipalModal] = useState(false);
  const [principalForm, setPrincipalForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    temporaryPassword: "",
  });
  const [creatingPrincipal, setCreatingPrincipal] = useState(false);
  const [principalError, setPrincipalError] = useState("");
  const [createdCredentials, setCreatedCredentials] = useState(null);
  const [editingPrincipal, setEditingPrincipal] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiGet(
        `/platform/director/schools/${schoolId}/principals`
      );
      setData(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to load principals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [schoolId]);

  const openPrincipalModal = () => {
    setPrincipalForm({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      temporaryPassword: "",
    });
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
      await apiDelete(
        `/platform/director/schools/${schoolId}/principal/${deleteConfirmation.principal.id}`
      );
      setMessage("Principal account deleted successfully.");
      setDeleteConfirmation(null);

      // Update data manually without full reload
      setData(data.filter((p) => p.id !== deleteConfirmation.principal.id));
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
          `/platform/director/schools/${schoolId}/principal/${editingPrincipal.id}`,
          {
            firstName: editingPrincipal.firstName.trim(),
            lastName: editingPrincipal.lastName.trim(),
            email: editingPrincipal.email.trim(),
          }
        );
        setMessage("Principal account updated successfully.");
        setPrincipalModal(false);
        setEditingPrincipal(null);
        await load(); // Reload to get updated data
      } else {
        // Create new principal
        const payload = {
          firstName: principalForm.firstName.trim(),
          lastName: principalForm.lastName.trim(),
          email: principalForm.email.trim(),
          username: principalForm.username.trim(),
          temporaryPassword: principalForm.temporaryPassword.trim(),
          schoolId: schoolId,
        };

        result = await apiPost(`/management/principal/create`, payload);

        const credentials = result?.data?.credentials || result?.credentials;

        if (credentials && (credentials.username || credentials.temporaryPassword)) {
          setCreatedCredentials({
            username: credentials.username,
            password: credentials.temporaryPassword || credentials.password,
            role: "Principal",
            name: `${principalForm.firstName} ${principalForm.lastName}`,
            email: principalForm.email,
            schools: schoolName,
          });

          setPrincipalModal(false);
        }

        setMessage("Principal account created successfully.");
        await load(); // Reload to show new principal
      }
    } catch (err) {
      setPrincipalError(err.message || "Unable to save the Principal account.");
    } finally {
      setCreatingPrincipal(false);
    }
  };

  if (loading) {
    return (
      <div className="sw-loading">
        <RefreshCw className="sw-spin" /> Loading principals…
      </div>
    );
  }

  return (
    <>
      <section className="sw-panel">
        <div className="sw-panel-heading">
          <div>
            <h2>Principal accounts</h2>
            <p>Administrative users with Principal role for this school.</p>
          </div>
          <button
            className="sw-button sw-button-primary"
            onClick={openPrincipalModal}
          >
            <UserPlus size={15} /> Add Principal
          </button>
        </div>

        {error && <div className="sw-error">{error}</div>}
        {message && <div className="sw-success">{message}</div>}

        {data.length ? (
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
                {data.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>{p.email}</td>
                    <td>{p.username}</td>
                    <td>{dateLabel(p.createdAt)}</td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
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
          <EmptyState>
            No Principal accounts found. Click "Add Principal" to create one.
          </EmptyState>
        )}
      </section>

      {principalModal && (
        <div
          className="sw-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !creatingPrincipal) {
              setPrincipalModal(false);
              setEditingPrincipal(null);
            }
          }}
        >
          <section
            className="sw-principal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sw-principal-title"
          >
            <div className="sw-modal-heading">
              <div>
                <span className="sw-modal-eyebrow">SCHOOL ADMINISTRATION</span>
                <h2 id="sw-principal-title">
                  {editingPrincipal ? "Edit Principal" : "Add Principal"}
                </h2>
                <p>{schoolName}</p>
              </div>
              <button
                className="sw-modal-close"
                type="button"
                onClick={() => {
                  setPrincipalModal(false);
                  setEditingPrincipal(null);
                }}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            {editingPrincipal ? (
              <form className="sw-principal-form" onSubmit={savePrincipal}>
                <p className="sw-form-description">
                  Update the principal's information. Username cannot be changed.
                </p>
                <div className="sw-form-grid">
                  <label>
                    First name
                    <input
                      required
                      maxLength={60}
                      value={editingPrincipal.firstName}
                      onChange={(e) =>
                        setEditingPrincipal({
                          ...editingPrincipal,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="First name"
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      required
                      maxLength={60}
                      value={editingPrincipal.lastName}
                      onChange={(e) =>
                        setEditingPrincipal({
                          ...editingPrincipal,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Last name"
                    />
                  </label>
                </div>
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={editingPrincipal.email}
                    onChange={(e) =>
                      setEditingPrincipal({
                        ...editingPrincipal,
                        email: e.target.value,
                      })
                    }
                    placeholder="principal@school.edu"
                  />
                </label>
                <label>
                  Username (read-only)
                  <input
                    disabled
                    value={editingPrincipal.username}
                    style={{ background: "#f9faf9", cursor: "not-allowed" }}
                  />
                </label>
                {principalError && (
                  <div className="sw-error">{principalError}</div>
                )}
                <div className="sw-form-footer">
                  <button
                    className="sw-button sw-button-light"
                    type="button"
                    disabled={creatingPrincipal}
                    onClick={() => {
                      setPrincipalModal(false);
                      setEditingPrincipal(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="sw-button sw-button-primary"
                    type="submit"
                    disabled={creatingPrincipal}
                  >
                    <Check size={15} />{" "}
                    {creatingPrincipal ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="sw-principal-form" onSubmit={savePrincipal}>
                <p className="sw-form-description">
                  Create the account for the Principal responsible for this school.
                </p>
                <div className="sw-form-grid">
                  <label>
                    First name
                    <input
                      required
                      maxLength={60}
                      autoComplete="given-name"
                      value={principalForm.firstName}
                      onChange={(e) =>
                        setPrincipalForm({
                          ...principalForm,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="First name"
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      required
                      maxLength={60}
                      autoComplete="family-name"
                      value={principalForm.lastName}
                      onChange={(e) =>
                        setPrincipalForm({
                          ...principalForm,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Last name"
                    />
                  </label>
                </div>
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    value={principalForm.email}
                    onChange={(e) =>
                      setPrincipalForm({ ...principalForm, email: e.target.value })
                    }
                    placeholder="principal@school.edu"
                  />
                </label>
                <div className="sw-form-grid">
                  <label>
                    Username
                    <input
                      required
                      minLength={3}
                      maxLength={30}
                      autoComplete="username"
                      value={principalForm.username}
                      onChange={(e) =>
                        setPrincipalForm({
                          ...principalForm,
                          username: e.target.value,
                        })
                      }
                      placeholder="Username for login"
                    />
                  </label>
                  <label>
                    Temporary password
                    <input
                      required
                      minLength={8}
                      maxLength={72}
                      type="password"
                      autoComplete="new-password"
                      value={principalForm.temporaryPassword}
                      onChange={(e) =>
                        setPrincipalForm({
                          ...principalForm,
                          temporaryPassword: e.target.value,
                        })
                      }
                      placeholder="Temporary password"
                    />
                  </label>
                </div>
                <small
                  style={{
                    display: "block",
                    marginTop: "-8px",
                    marginBottom: "12px",
                    fontSize: "12px",
                    color: "#6b7280",
                  }}
                >
                  8–72 characters. User should change after first login.
                </small>
                {principalError && (
                  <div className="sw-error">{principalError}</div>
                )}
                <div className="sw-form-footer">
                  <button
                    className="sw-button sw-button-light"
                    type="button"
                    disabled={creatingPrincipal}
                    onClick={() => setPrincipalModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="sw-button sw-button-primary"
                    type="submit"
                    disabled={creatingPrincipal}
                  >
                    <UserPlus size={15} />{" "}
                    {creatingPrincipal ? "Creating account…" : "Create Principal"}
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

      {deleteConfirmation && (
        <div
          className="sw-modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              setDeleteConfirmation(null);
            }
          }}
        >
          <div className="sw-modal sw-delete-modal" style={{ maxWidth: "480px" }}>
            <div className="sw-modal-heading">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AlertTriangle size={24} color="white" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
                    Delete Principal?
                  </h2>
                  <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                className="sw-modal-close"
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                disabled={deleting}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>

            <div style={{ padding: "24px", paddingTop: "16px" }}>
              <div
                style={{
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: "#991b1b",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>
                    Are you sure you want to delete{" "}
                    {deleteConfirmation.principal.name}?
                  </strong>
                </p>
                <ul
                  style={{
                    margin: "12px 0 0 0",
                    paddingLeft: "20px",
                    fontSize: "13px",
                    color: "#7f1d1d",
                    lineHeight: "1.6",
                  }}
                >
                  <li>This will permanently remove their Principal account</li>
                  <li>They will lose access to the school management system</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  marginBottom: "20px",
                  fontSize: "13px",
                  color: "#374151",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Name:</span>
                  <span>{deleteConfirmation.principal.name}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Email:</span>
                  <span>{deleteConfirmation.principal.email}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>Username:</span>
                  <span>{deleteConfirmation.principal.username}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  className="sw-button sw-button-light"
                  onClick={() => setDeleteConfirmation(null)}
                  disabled={deleting}
                  style={{ minWidth: "100px" }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="sw-button"
                  onClick={confirmDeletePrincipal}
                  disabled={deleting}
                  style={{
                    minWidth: "120px",
                    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    color: "white",
                    border: "none",
                  }}
                >
                  <Trash2 size={15} />
                  {deleting ? "Deleting..." : "Delete Principal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
