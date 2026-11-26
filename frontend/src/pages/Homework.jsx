import React, { useState } from "react";
import { Upload, Search, FileText, CheckCircle2, Clock, AlertCircle, Calendar } from "lucide-react";
import { useHomework, submitHomework, getHomeworkStats, calculateAverageScore, getHomeworkStatus, formatDueDate } from "../hooks/useHomework.js";
import { Modal } from "../Layout.jsx";

export default function Homework({ showToast }) {
  const { homework, loading, error, refetch } = useHomework();
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [submitModal, setSubmitModal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    textAnswer: "",
    fileUrl: ""
  });

  if (loading) {
    return (
      <div className="page-container">
        <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
          <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
          <p>Loading homework assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <AlertCircle size={48} style={{ color: "#e74c3c", marginBottom: "16px" }} />
          <p>{error}</p>
          <button className="green-button btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = getHomeworkStats(homework);
  const avgScore = calculateAverageScore(homework);

  // Filter homework
  const filteredHomework = homework.filter((hw) => {
    // Search filter
    const matchesSearch = hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hw.subject?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hw.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // Status filter
    if (filterStatus === "all") return true;
    
    const status = getHomeworkStatus(hw);
    if (filterStatus === "pending") return status.status === "PENDING" || status.status === "DUE_SOON";
    if (filterStatus === "submitted") return status.status === "SUBMITTED";
    if (filterStatus === "evaluated") return status.status === "EVALUATED";
    if (filterStatus === "overdue") return status.status === "OVERDUE";
    
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await submitHomework(submitModal.id, submissionForm);
    
    if (result.success) {
      showToast("Homework submitted successfully!");
      setSubmitModal(null);
      setSubmissionForm({ textAnswer: "", fileUrl: "" });
      refetch();
    } else {
      showToast(result.error || "Failed to submit homework", "error");
    }
    
    setSubmitting(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="breadcrumb">Student Dashboard • Homework & Assignments</div>

      <div className="page-header-row">
        <div>
          <h1 className="page-title">Homework & Assignments</h1>
          <p className="page-subtitle">
            Track your assignments, submit work, and view evaluation results
          </p>
        </div>
        <div className="page-header-stats">
          <div className="hw-stat-card">
            <div className="hw-stat-label">Average<br/>Score</div>
            <div className="hw-stat-value green">{avgScore}%</div>
          </div>
          <div className="hw-stat-card">
            <div className="hw-stat-label">Submitted</div>
            <div className="hw-stat-value">{stats.submitted + stats.evaluated}/{stats.total}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="hw-metrics">
        <div className={`hw-metric ${stats.overdue > 0 ? "attention" : ""}`}>
          <div className="hw-m-label">OVERDUE</div>
          <div className="hw-m-value">{stats.overdue}</div>
          <div className="hw-m-sub" style={{ color: stats.overdue > 0 ? "#c92a2a" : "#777" }}>
            {stats.overdue > 0 ? "● Requires immediate attention" : "No overdue assignments"}
          </div>
        </div>

        <div className="hw-metric">
          <div className="hw-m-label">PENDING</div>
          <div className="hw-m-value">{stats.pending}</div>
          <div className="hw-m-sub">Not yet submitted</div>
        </div>

        <div className="hw-metric">
          <div className="hw-m-label">UNDER REVIEW</div>
          <div className="hw-m-value">{stats.submitted}</div>
          <div className="hw-m-sub">Awaiting evaluation</div>
        </div>

        <div className="hw-metric">
          <div className="hw-m-label">EVALUATED</div>
          <div className="hw-m-value">{stats.evaluated}</div>
          <div className="hw-m-sub">Graded assignments</div>
        </div>
      </div>

      {/* Filters */}
      <div className="hw-tabs">
        <button
          className={`hw-tab ${filterStatus === "all" ? "active" : ""}`}
          onClick={() => setFilterStatus("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`hw-tab ${filterStatus === "pending" ? "active" : ""}`}
          onClick={() => setFilterStatus("pending")}
        >
          Pending ({stats.pending})
          {stats.overdue > 0 && <span className="tab-badge">●</span>}
        </button>
        <button
          className={`hw-tab ${filterStatus === "submitted" ? "active" : ""}`}
          onClick={() => setFilterStatus("submitted")}
        >
          Submitted ({stats.submitted})
        </button>
        <button
          className={`hw-tab ${filterStatus === "evaluated" ? "active" : ""}`}
          onClick={() => setFilterStatus("evaluated")}
        >
          Evaluated ({stats.evaluated})
        </button>
      </div>

      {/* Search */}
      <div className="hw-search-row">
        <div className="hw-search-box">
          <Search size={15} />
          <input
            placeholder="Search by title, subject, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Homework List */}
      <div className="hw-layout">
        <div className="hw-list-col">
          {filteredHomework.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#999" }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: "16px" }} />
              <p>{searchQuery ? "No homework found matching your search" : "No homework assignments"}</p>
            </div>
          ) : (
            filteredHomework.map((hw) => {
              const statusInfo = getHomeworkStatus(hw);
              const submission = hw.submissions?.[0];
              const dueDate = new Date(hw.dueDate);

              return (
                <div
                  key={hw.id}
                  className={`hw-card ${selectedHomework?.id === hw.id ? "hw-card-selected" : ""}`}
                  onClick={() => setSelectedHomework(hw)}
                >
                  <div className="hw-card-top">
                    <span
                      className="hw-due-tag"
                      style={{ background: statusInfo.bg, color: statusInfo.color }}
                    >
                      {statusInfo.status === "EVALUATED" && submission ? (
                        <>✓ Score: {submission.marksObtained}/{hw.totalMarks} ({((submission.marksObtained / hw.totalMarks) * 100).toFixed(0)}%)</>
                      ) : statusInfo.status === "SUBMITTED" ? (
                        <>✓ Submitted • Awaiting Evaluation</>
                      ) : (
                        <>⏰ {formatDueDate(hw.dueDate)}</>
                      )}
                    </span>
                    <span
                      className="hw-subject-tag"
                      style={{
                        background: "#f0f0f0",
                        color: "#333",
                        borderColor: "#ddd"
                      }}
                    >
                      {hw.subject?.name || "Subject"}
                    </span>
                  </div>

                  <h3 className="hw-card-title">{hw.title}</h3>
                  
                  <p className="hw-card-meta">
                    Class: {hw.class?.name || "N/A"} • 
                    Due: {dueDate.toLocaleDateString()} • 
                    Total Marks: {hw.totalMarks}
                  </p>

                  <ul className="hw-card-bullets">
                    <li>{hw.description}</li>
                  </ul>

                  {/* Evaluated with feedback */}
                  {statusInfo.status === "EVALUATED" && submission?.feedback && (
                    <div className="hw-eval-remark">
                      <div className="hw-eval-teacher">Teacher's Feedback</div>
                      <p>{submission.feedback}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  {statusInfo.status !== "EVALUATED" && statusInfo.status !== "SUBMITTED" && (
                    <div className="hw-card-actions">
                      <button
                        className="hw-submit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubmitModal(hw);
                        }}
                      >
                        ⬆ Submit Work
                      </button>
                    </div>
                  )}

                  {statusInfo.status === "SUBMITTED" && (
                    <div className="hw-card-actions">
                      <button className="hw-clarify-btn" disabled>
                        📄 Submission Under Review
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Right sidebar with quick info */}
        <div className="hw-right-col">
          <div className="hw-quick-drop">
            <div className="hw-quick-title">Quick Stats</div>
            <div style={{ padding: "16px 0" }}>
              <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                <span>Total Assignments:</span>
                <strong>{stats.total}</strong>
              </div>
              <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                <span>Completion Rate:</span>
                <strong style={{ color: "#087f5b" }}>
                  {stats.total > 0 ? Math.round(((stats.submitted + stats.evaluated) / stats.total) * 100) : 0}%
                </strong>
              </div>
              <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                <span>Average Score:</span>
                <strong style={{ color: "#1971c2" }}>{avgScore}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Overdue:</span>
                <strong style={{ color: stats.overdue > 0 ? "#c92a2a" : "#087f5b" }}>
                  {stats.overdue}
                </strong>
              </div>
            </div>
          </div>

          {selectedHomework && (
            <div className="panel" style={{ marginTop: "16px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
                Selected Assignment
              </h3>
              <div style={{ fontSize: "13px", color: "#555", lineHeight: 1.6 }}>
                <p><strong>{selectedHomework.title}</strong></p>
                <p style={{ marginTop: "8px" }}>Subject: {selectedHomework.subject?.name}</p>
                <p>Class: {selectedHomework.class?.name}</p>
                <p>Total Marks: {selectedHomework.totalMarks}</p>
                <p>Due: {new Date(selectedHomework.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Modal */}
      {submitModal && (
        <Modal title="Submit Homework" onClose={() => setSubmitModal(null)}>
          <form onSubmit={handleSubmit}>
            <p className="modal-desc">
              <strong>{submitModal.title}</strong>
              <br />
              Subject: {submitModal.subject?.name} • Total Marks: {submitModal.totalMarks}
            </p>

            <label>Your Answer / Solution *</label>
            <textarea
              className="modal-input"
              rows="8"
              value={submissionForm.textAnswer}
              onChange={(e) => setSubmissionForm({ ...submissionForm, textAnswer: e.target.value })}
              placeholder="Type your answer here..."
              required
            />

            <label>File URL (Optional)</label>
            <input
              className="modal-input"
              type="url"
              value={submissionForm.fileUrl}
              onChange={(e) => setSubmissionForm({ ...submissionForm, fileUrl: e.target.value })}
              placeholder="https://example.com/your-file.pdf"
            />
            <small style={{ color: "#777", fontSize: "12px", display: "block", marginTop: "4px" }}>
              Upload your file to a cloud service and paste the link here
            </small>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-secondary"
                onClick={() => setSubmitModal(null)}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="modal-btn-primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Homework"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
