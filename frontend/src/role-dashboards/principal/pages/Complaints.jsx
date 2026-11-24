import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { apiGet, apiPost } from "../../../api.js";

export default function Complaints({ setError, setMessage }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: "",
    resolution: "",
    remarks: "",
  });

  const loadComplaints = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });

      const data = await apiGet(`/principal/complaints?${params}`);
      setComplaints(data.complaints || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [page, statusFilter, priorityFilter]);

  const handleUpdateComplaint = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");
    
    try {
      await apiPost(`/principal/complaints/${selectedComplaint.id}/update`, updateForm);
      setMessage("Complaint updated successfully");
      setSelectedComplaint(null);
      setUpdateForm({ status: "", resolution: "", remarks: "" });
      await loadComplaints();
    } catch (err) {
      setError(err.message || "Unable to update complaint");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle size={16} className="text-success" />;
      case "IN_PROGRESS":
        return <Clock size={16} className="text-warning" />;
      case "REJECTED":
        return <X size={16} className="text-danger" />;
      default:
        return <AlertCircle size={16} className="text-muted" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED":
        return "status-resolved";
      case "IN_PROGRESS":
        return "status-progress";
      case "REJECTED":
        return "status-rejected";
      case "ASSIGNED":
        return "status-assigned";
      default:
        return "status-submitted";
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <MessageSquare size={19} /> Complaint Management
            </h2>
            <p>Track, assign, and resolve complaints and grievances</p>
          </div>
          
          {pagination && (
            <span className="superadmin-count">{pagination.total} complaints</span>
          )}
        </div>

        <div className="principal-search-filters">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => {
              setPriorityFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          {(statusFilter || priorityFilter) && (
            <button
              className="principal-filter-clear"
              onClick={() => {
                setStatusFilter("");
                setPriorityFilter("");
                setPage(1);
              }}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {loading && <div className="superadmin-loading">Loading complaints...</div>}

        {!loading && complaints.length > 0 && (
          <div className="principal-complaints-list">
            {complaints.map((complaint) => (
              <div className="principal-complaint-card" key={complaint.id}>
                <div className="principal-complaint-header">
                  <div>
                    <span className={`principal-priority-badge ${complaint.priority}`}>
                      {complaint.priority}
                    </span>
                    <span className="principal-complaint-category">{complaint.category}</span>
                  </div>
                  <span className={`principal-complaint-status ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    {complaint.status.replace("_", " ")}
                  </span>
                </div>

                <h3>{complaint.title}</h3>
                <p>{complaint.description.substring(0, 200)}{complaint.description.length > 200 ? "..." : ""}</p>

                <div className="principal-complaint-footer">
                  <small>Submitted: {new Date(complaint.createdAt).toLocaleDateString("en-IN")}</small>
                  {complaint.isConfidential && (
                    <span className="principal-confidential-badge">Confidential</span>
                  )}
                  <button
                    className="principal-action-btn"
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setUpdateForm({
                        status: complaint.status,
                        resolution: complaint.resolution || "",
                        remarks: complaint.remarks || "",
                      });
                    }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && complaints.length === 0 && (
          <div className="superadmin-empty">
            No complaints found matching your criteria
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="principal-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>Page {page} of {pagination.totalPages}</span>
            <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        )}
      </section>

      {selectedComplaint && (
        <div
          className="superadmin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedComplaint(null);
              setUpdateForm({ status: "", resolution: "", remarks: "" });
            }
          }}
        >
          <form className="superadmin-modal" onSubmit={handleUpdateComplaint}>
            <div className="superadmin-modal-heading">
              <h2>Update Complaint Status</h2>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => {
                  setSelectedComplaint(null);
                  setUpdateForm({ status: "", resolution: "", remarks: "" });
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="principal-complaint-details">
              <div>
                <strong>Title:</strong>
                <span>{selectedComplaint.title}</span>
              </div>
              <div>
                <strong>Category:</strong>
                <span>{selectedComplaint.category}</span>
              </div>
              <div>
                <strong>Priority:</strong>
                <span className={`principal-priority-badge ${selectedComplaint.priority}`}>
                  {selectedComplaint.priority}
                </span>
              </div>
              <div>
                <strong>Current Status:</strong>
                <span className={`principal-complaint-status ${getStatusColor(selectedComplaint.status)}`}>
                  {selectedComplaint.status.replace("_", " ")}
                </span>
              </div>
              <div className="principal-complaint-desc">
                <strong>Description:</strong>
                <p>{selectedComplaint.description}</p>
              </div>
            </div>

            <label>
              Update Status *
              <select
                required
                value={updateForm.status}
                onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </label>

            {(updateForm.status === "RESOLVED" || updateForm.status === "REJECTED") && (
              <label>
                Resolution Details {updateForm.status === "RESOLVED" ? "*" : ""}
                <textarea
                  required={updateForm.status === "RESOLVED"}
                  rows={4}
                  value={updateForm.resolution}
                  onChange={(e) => setUpdateForm({ ...updateForm, resolution: e.target.value })}
                  placeholder="Describe the resolution or reason for rejection"
                />
              </label>
            )}

            <label>
              Internal Remarks
              <textarea
                rows={3}
                value={updateForm.remarks}
                onChange={(e) => setUpdateForm({ ...updateForm, remarks: e.target.value })}
                placeholder="Add internal notes (not visible to complainant)"
              />
            </label>

            <button className="director-submit" disabled={updating}>
              <Save size={16} /> {updating ? "Updating..." : "Update Complaint"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
