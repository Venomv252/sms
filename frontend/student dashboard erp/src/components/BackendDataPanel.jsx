import React, { useEffect, useState } from "react";
import { apiGet } from "../api.js";

function getValue(object, path) {
  return path.split(".").reduce((value, key) => value == null ? undefined : value[key], object);
}

function formatValue(value, path) {
  if (value == null || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.map((item) => item?.status || item?.title || String(item)).join(", ") : "—";
  if (path.toLowerCase().includes("date") || path.toLowerCase().includes("at")) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toLocaleDateString();
  }
  if (typeof value === "object") return value.name || value.title || value.email || "—";
  return String(value);
}

export default function BackendDataPanel({ endpoint, title, fields, limit = 10 }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiGet(endpoint)
      .then((result) => {
        if (!active) return;
        const list = Array.isArray(result) ? result : result ? [result] : [];
        setRecords(list.slice(0, limit));
        setError("");
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Could not load data from the backend.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [endpoint, limit]);

  return (
    <section className="panel" style={{ marginBottom: 18, overflow: "hidden" }}>
      <div className="panel-heading compact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 15, margin: 0 }}>{title}</h2>
          <p style={{ margin: "4px 0 0", fontSize: 11, color: "#777" }}>Live records loaded from your PostgreSQL database through the backend API.</p>
        </div>
        <span className={`badge-chip ${error ? "red" : loading ? "" : "green"}`} style={{ fontSize: 10 }}>
          {loading ? "Connecting…" : error ? "Connection issue" : `${records.length} record${records.length === 1 ? "" : "s"} loaded`}
        </span>
      </div>
      {loading ? (
        <p style={{ padding: 14, color: "#777", fontSize: 12 }}>Loading database records…</p>
      ) : error ? (
        <div style={{ padding: 14, color: "#b42318", fontSize: 12, lineHeight: 1.6 }}>
          {error}
          <div style={{ color: "#777", marginTop: 4 }}>Check that the backend is running, the database is seeded, and VITE_API_URL points to it.</div>
        </div>
      ) : records.length === 0 ? (
        <p style={{ padding: 14, color: "#777", fontSize: 12 }}>No records found for this account yet.</p>
      ) : (
        <div className="results-table-wrap" style={{ marginTop: 8 }}>
          <table className="report-table">
            <thead>
              <tr>{fields.map((field) => <th key={field.key}>{field.label}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id || record.email || index}>
                  {fields.map((field) => (
                    <td key={field.key} style={{ maxWidth: 280, overflowWrap: "anywhere" }}>
                      {formatValue(getValue(record, field.key), field.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
