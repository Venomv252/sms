import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  X,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { apiGet, apiPost } from "../../../api.js";

export default function Leaves({ setError, setMessage }) {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [action, setAction] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const loadLeaves = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });

      const data = await apiGet(`/principal/leaves?${params}`);
      setLeaves(data.leaves || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, [page, statusFilter]);

  const handleApprove = async () => {
    setProcessing(true);
    setError("");
    
    try {
      await apiPost(`/principal/leaves/${selectedLeave.id}/approve`, { adminNote });
      setMessage("Leave request approved successfully");
      setSelectedLeave(null);
      setAction(null);
      setAdminNote("");
      await loadLeaves();
    } catch (err) {
      setError(err.message || "Unable to approve leave request");
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!adminNote.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    setProcessing(true);
    setError("");
    
    try {
      await apiPost(`/principal/leaves/${selectedLeave.id}/reject`, { adminNote });
      setMessage("Leave request rejected");
      setSelectedLeave(null);
      setAction(null);
      setAdminNote("");
      await loadLeaves();
    } catch (err) {
      setError(err.message || "Unable to reject leave request");
    } finally {
      setProcessing(false);
    }
  };

  const calculateDuration = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const days = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return days;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-success";
      case "REJECTED":
        return "text-danger";
      default:
        return "text-warning";
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <CheckCircle2 size={19} /> Leave & Approvals
            </h2>
            <p>Review and approve leave requests from students and staff</p>
          </div>
          
          {pagination && (
            <span className="superadmin-count">{pagination.total} requests</span>
          )}
        </div>

        <div className="principal-leave-filters">
          <button
            className={statusFilter === "PENDING" ? "active" : ""}
            onClick={() => { setStatusFilter("PENDING"); setPage(1); }}
          >
            Pending
            {pagination && statusFilter === "PENDING" && (
              <span className="principal-badge-count">{pagination.total}</span>
            )}
          </button>
          <button
            className={statusFilter === "APPROVED" ? "active" : ""}
            onClick={() => { setStatusFilter("APPROVED"); setPage(1); }}
          >
            Approved
          </button>
          <button
            className={statusFilter === "REJECTED" ? "active" : ""}
            onClick={() => { setStatusFilter("REJECTED"); setPage(1); }}
          >
            Rejected
          </button>
          <button
            className={statusFilter === "" ? "active" : ""}
            onClick={() => { setStatusFilter(""); setPage(1); }}
          >
            All Requests
          </button>
        </div>

        {loading && <div className="superadmin-loading">Loading leave requests...</div>}

        {!loading && leaves.length > 0 && (
          <div className="principal-leaves-list">
            {leaves.map((leave) => (
              <div className="principal-leave-card" key={leave.id}>
                <div className="principal-leave-header">
                  <div className="principal-leave-applicant">
                    <User size={18} />
                    <div>
                      <strong>{leave.applicant}</strong>
                      <small>{leave.role} {leave.studentClass ? `· ${leave.studentClass}` : ""}</small>
                    </div>
                  </div>
                  <span className={`principal-leave-status ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>

                <div className="principal-leave-dates">
                  <div>
                    <Calendar size={16} />
                    <span>
                      {new Date(leave.fromDate).toLocaleDateString("en-IN")} - {new Date(leave.toDate).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <span className="principal-leave-duration">
                    {calculateDuration(leave.fromDate, leave.toDate)} {calculateDuration(leave.fromDate, leave.toDate) === 1 ? "day" : "days"}
                  </span>
                </div>

                <div className="principal-leave-reason">
                  <FileText size={16} />
                  <p>{leave.reason}</p>
                </div>

                {leave.adminNote && (
                  <div className="principal-leave-note">
                    <strong>Admin Note:</strong>
                    <p>{leave.adminNote}</p>
                  </div>
                )}

                {leave.status === "PENDING" && (
                  <div className="principal-leave-actions">
                    <button
                      className="principal-approve-btn"
                      onClick={() => {
                        setSelectedLeave(leave);
                        setAction("approve");
                        setAdminNote("");
                      }}
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      className="principal-reject-btn"
                      onClick={() => {
                        setSelectedLeave(leave);
                        setAction("reject");
                        setAdminNote("");
                      }}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                )}

                <div className="principal-leave-footer">
                  <small>Submitted: {new Date(leave.createdAt).toLocaleDateString("en-IN")}</small>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && leaves.length === 0 && (
          <div className="superadmin-empty">
            {statusFilter === "PENDING" 
              ? "No pending leave requests. All requests have been reviewed."
              : "No leave requests found for the selected filter."}
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

      {selectedLeave && action && (
        <div
          className="superadmin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedLeave(null);
              setAction(null);
              setAdminNote("");
            }
          }}
        >
          <div className="superadmin-modal">
            <div className="superadmin-modal-heading">
              <h2>{action === "approve" ? "Approve" : "Reject"} Leave Request</h2>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => {
                  setSelectedLeave(null);
                  setAction(null);
                  setAdminNote("");
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="principal-leave-confirmation">
              <div className="principal-leave-detail">
                <strong>Applicant:</strong>
                <span>{selectedLeave.applicant} ({selectedLeave.role})</span>
              </div>
              <div className="principal-leave-detail">
                <strong>Duration:</strong>
                <span>
                  {new Date(selectedLeave.fromDate).toLocaleDateString("en-IN")} to {new Date(selectedLeave.toDate).toLocaleDateString("en-IN")}
                  ({calculateDuration(selectedLeave.fromDate, selectedLeave.toDate)} days)
                </span>
              </div>
              <div className="principal-leave-detail">
                <strong>Reason:</strong>
                <p>{selectedLeave.reason}</p>
              </div>
            </div>

            <label>
              {action === "approve" ? "Approval Note (Optional)" : "Rejection Reason *"}
              <textarea
                required={action === "reject"}
                rows={4}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder={
                  action === "approve"
                    ? "Add an optional note for the applicant"
                    : "Please provide a reason for rejection"
                }
              />
            </label>

            {action === "approve" ? (
              <button
                className="director-submit principal-approve-btn-large"
                onClick={handleApprove}
                disabled={processing}
              >
                <CheckCircle size={16} /> {processing ? "Approving..." : "Approve Leave Request"}
              </button>
            ) : (
              <button
                className="director-submit principal-reject-btn-large"
                onClick={handleReject}
                disabled={processing}
              >
                <XCircle size={16} /> {processing ? "Rejecting..." : "Reject Leave Request"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
