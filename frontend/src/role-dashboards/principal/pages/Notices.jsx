import React, { useEffect, useState } from "react";
import {
  Bell,
  Plus,
  X,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { apiGet, apiPost } from "../../../api.js";

export default function Notices({ setError, setMessage }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
    expiryDate: "",
  });

  const loadNotices = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(filter !== "all" && { isActive: filter === "active" ? "true" : "false" }),
      });

      const data = await apiGet(`/principal/notices?${params}`);
      setNotices(data.notices || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load notices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [page, filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      await apiPost("/principal/notices", form);
      setMessage("Notice created successfully");
      setForm({
        title: "",
        content: "",
        category: "GENERAL",
        priority: "NORMAL",
        publishDate: "",
        expiryDate: "",
      });
      setShowForm(false);
      setPage(1);
      await loadNotices();
    } catch (err) {
      setError(err.message || "Unable to create notice");
    } finally {
      setSaving(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENT":
        return "text-danger";
      case "IMPORTANT":
        return "text-warning";
      default:
        return "text-success";
    }
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <Bell size={19} /> Notice Management
            </h2>
            <p>Create, publish, and manage school notices and announcements</p>
          </div>
          <button onClick={() => setShowForm(true)}>
            <Plus size={16} /> Create Notice
          </button>
        </div>

        <div className="principal-notice-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => { setFilter("all"); setPage(1); }}
          >
            All Notices
          </button>
          <button
            className={filter === "active" ? "active" : ""}
            onClick={() => { setFilter("active"); setPage(1); }}
          >
            <Eye size={14} /> Active
          </button>
          <button
            className={filter === "inactive" ? "active" : ""}
            onClick={() => { setFilter("inactive"); setPage(1); }}
          >
            <EyeOff size={14} /> Inactive
          </button>
        </div>

        {loading && <div className="superadmin-loading">Loading notices...</div>}

        {!loading && notices.length > 0 && (
          <div className="principal-notices-grid">
            {notices.map((notice) => (
              <div className="principal-notice-card" key={notice.id}>
                <div className="principal-notice-header">
                  <span className={`principal-priority-badge ${getPriorityColor(notice.priority)}`}>
                    {notice.priority}
                  </span>
                  <span className="principal-notice-category">{notice.category}</span>
                </div>
                
                <h3>{notice.title}</h3>
                
                <p>{notice.content.substring(0, 150)}{notice.content.length > 150 ? "..." : ""}</p>
                
                <div className="principal-notice-footer">
                  <div>
                    <small>Published: {new Date(notice.publishDate).toLocaleDateString("en-IN")}</small>
                    {notice.expiryDate && (
                      <small>Expires: {new Date(notice.expiryDate).toLocaleDateString("en-IN")}</small>
                    )}
                  </div>
                  <span className={`principal-notice-status ${notice.isActive ? "active" : "inactive"}`}>
                    {notice.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && notices.length === 0 && (
          <div className="superadmin-empty">
            {filter === "all" 
              ? "No notices created yet. Create your first notice to communicate with students and staff."
              : `No ${filter} notices found.`}
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

      {showForm && (
        <div
          className="superadmin-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowForm(false);
          }}
        >
          <form className="superadmin-modal principal-notice-modal" onSubmit={handleSubmit}>
            <div className="superadmin-modal-heading">
              <h2>Create Notice</h2>
              <button
                type="button"
                className="superadmin-icon-button"
                onClick={() => setShowForm(false)}
              >
                <X size={18} />
              </button>
            </div>

            <label>
              Title *
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter notice title"
              />
            </label>

            <label>
              Content *
              <textarea
                required
                rows={6}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Enter notice content"
              />
            </label>

            <div className="principal-form-grid">
              <label>
                Category
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="GENERAL">General</option>
                  <option value="ACADEMIC">Academic</option>
                  <option value="EXAMINATION">Examination</option>
                  <option value="EVENT">Event</option>
                  <option value="HOLIDAY">Holiday</option>
                  <option value="FEE">Fee</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </label>

              <label>
                Priority
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                >
                  <option value="NORMAL">Normal</option>
                  <option value="IMPORTANT">Important</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </label>

              <label>
                Publish Date
                <input
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
                />
                <small>Leave empty to publish immediately</small>
              </label>

              <label>
                Expiry Date
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                />
                <small>Optional - notice will expire after this date</small>
              </label>
            </div>

            <button className="director-submit" disabled={saving}>
              <Save size={16} /> {saving ? "Creating..." : "Create Notice"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
