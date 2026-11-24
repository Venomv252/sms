import React, { useEffect, useState, useMemo } from "react";
import { RefreshCw, Search } from "lucide-react";
import { apiGet } from "../../../api.js";
import "../../school-workspace.css";

const fullName = (person) =>
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") || "Unnamed";

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

export default function Students({ schoolId }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async (searchTerm = "", currentPage = 1) => {
    setLoading(true);
    setError("");
    try {
      const result = await apiGet(
        `/platform/director/schools/${schoolId}/students?page=${currentPage}&limit=20&search=${encodeURIComponent(searchTerm)}`
      );
      setData(result.data || []);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(search, page);
  }, [schoolId, page]);

  const handleSearch = () => {
    setPage(1);
    load(search, 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (loading && !data.length) {
    return (
      <div className="sw-loading">
        <RefreshCw className="sw-spin" /> Loading students…
      </div>
    );
  }

  return (
    <section className="sw-panel">
      <div className="sw-panel-heading">
        <div>
          <h2>Student directory</h2>
          <p>
            {pagination
              ? `Showing ${data.length} of ${pagination.total} students`
              : "Student records"}
          </p>
        </div>
        <label className="sw-search">
          <Search size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search students"
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "6px 12px",
              marginLeft: "8px",
              background: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </label>
      </div>

      {error && <div className="sw-error">{error}</div>}

      {data.length ? (
        <>
          <div className="sw-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll number</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added</th>
                </tr>
              </thead>
              <tbody>
                {data.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{fullName(s.user)}</strong>
                    </td>
                    <td>{s.rollNumber}</td>
                    <td>
                      {s.grade}-{s.section}
                    </td>
                    <td>{s.user?.email || "—"}</td>
                    <td>{s.user?.phone || "—"}</td>
                    <td>{dateLabel(s.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination && pagination.pages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
                padding: "20px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                style={{
                  padding: "8px 16px",
                  background: page === 1 ? "#e5e7eb" : "#10b981",
                  color: page === 1 ? "#9ca3af" : "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </button>
              <span style={{ color: "#6b7280", fontSize: "14px" }}>
                Page {page} of {pagination.pages}
              </span>
              <button
                disabled={page === pagination.pages}
                onClick={() => setPage(page + 1)}
                style={{
                  padding: "8px 16px",
                  background: page === pagination.pages ? "#e5e7eb" : "#10b981",
                  color: page === pagination.pages ? "#9ca3af" : "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: page === pagination.pages ? "not-allowed" : "pointer",
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState>
          {search
            ? `No students found matching "${search}"`
            : "No student records found."}
        </EmptyState>
      )}
    </section>
  );
}
