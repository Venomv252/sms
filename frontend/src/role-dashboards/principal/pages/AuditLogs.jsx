import React, { useEffect, useState } from "react";
import { ShieldAlert, Search, Filter, X } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function AuditLogs({ setError, setMessage }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const loadLogs = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
        ...(actionFilter && { action: actionFilter }),
        ...(entityFilter && { entityType: entityFilter }),
      });

      const data = await apiGet(`/principal/audit-logs?${params}`);
      setLogs(data.logs || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [page, actionFilter, entityFilter]);

  const getActionColor = (action) => {
    switch (action) {
      case "CREATE":
        return "text-success";
      case "DELETE":
        return "text-danger";
      case "UPDATE":
        return "text-warning";
      case "LOGIN":
      case "LOGOUT":
        return "text-muted";
      case "APPROVE":
        return "text-success";
      case "REJECT":
        return "text-danger";
      default:
        return "";
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "CREATE":
        return "➕";
      case "DELETE":
        return "🗑️";
      case "UPDATE":
        return "✏️";
      case "LOGIN":
        return "🔓";
      case "LOGOUT":
        return "🔒";
      case "APPROVE":
        return "✅";
      case "REJECT":
        return "❌";
      default:
        return "📝";
    }
  };

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Audit Logs</h2>
          <p>
            Track all administrative actions and system changes for security and compliance
          </p>
        </div>
      </section>

      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <ShieldAlert size={19} /> Security Audit Trail
            </h2>
            <p>Comprehensive log of all actions performed in the system</p>
          </div>
          
          {pagination && (
            <span className="superadmin-count">{pagination.total} log entries</span>
          )}
        </div>

        <div className="principal-search-filters">
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
            <option value="LOGOUT">Logout</option>
            <option value="APPROVE">Approve</option>
            <option value="REJECT">Reject</option>
          </select>

          <select
            value={entityFilter}
            onChange={(e) => {
              setEntityFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Entity Types</option>
            <option value="User">User</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Accountant">Accountant</option>
            <option value="Fee">Fee</option>
            <option value="Notice">Notice</option>
            <option value="Complaint">Complaint</option>
            <option value="LeaveRequest">Leave Request</option>
          </select>

          {(actionFilter || entityFilter) && (
            <button
              className="principal-filter-clear"
              onClick={() => {
                setActionFilter("");
                setEntityFilter("");
                setPage(1);
              }}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {loading && <div className="superadmin-loading">Loading audit logs...</div>}

        {!loading && logs.length > 0 && (
          <div className="principal-audit-logs">
            {logs.map((log) => (
              <div className="principal-audit-entry" key={log.id}>
                <div className="principal-audit-icon">
                  <span className={getActionColor(log.action)}>
                    {getActionIcon(log.action)}
                  </span>
                </div>
                
                <div className="principal-audit-content">
                  <div className="principal-audit-header">
                    <div>
                      <strong className={getActionColor(log.action)}>{log.action}</strong>
                      {log.entityType && (
                        <span className="principal-audit-entity">
                          {log.entityType}
                          {log.entityId && <small>#{log.entityId.substring(0, 8)}</small>}
                        </span>
                      )}
                    </div>
                    <span className="principal-audit-time">
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                  
                  <div className="principal-audit-details">
                    <span>User ID: {log.userId.substring(0, 8)}...</span>
                    {log.ipAddress && <span>IP: {log.ipAddress}</span>}
                  </div>

                  {log.changes && Object.keys(log.changes).length > 0 && (
                    <div className="principal-audit-changes">
                      <small>Changes: {JSON.stringify(log.changes).substring(0, 100)}...</small>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="superadmin-empty">
            No audit logs found matching your criteria
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

      <div className="principal-audit-warning">
        <ShieldAlert size={18} />
        <div>
          <strong>Security Notice</strong>
          <p>Audit logs are read-only and cannot be modified or deleted. All entries are permanently recorded for compliance and security purposes.</p>
        </div>
      </div>
    </>
  );
}
