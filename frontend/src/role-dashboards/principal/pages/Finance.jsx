import React, { useEffect, useState } from "react";
import {
  CircleDollarSign,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  PieChart,
} from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Finance({ setError, setMessage }) {
  const [financeSummary, setFinanceSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFinanceSummary = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet("/principal/finance/summary");
      setFinanceSummary(data);
    } catch (err) {
      setError(err.message || "Unable to load financial summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFinanceSummary();
  }, []);

  if (loading) {
    return <div className="superadmin-loading">Loading financial data...</div>;
  }

  if (!financeSummary) {
    return (
      <div className="superadmin-error">
        <AlertTriangle size={20} />
        No financial data available
      </div>
    );
  }

  const { summary, byStatus, byTerm, defaulters } = financeSummary;

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Financial Management</h2>
          <p>
            Comprehensive financial overview including fee collection, pending amounts, and defaulter tracking.
          </p>
        </div>
      </section>

      <section className="superadmin-overview superadmin-kpis">
        <article>
          <CircleDollarSign />
          <span>Total Fees</span>
          <strong>₹{summary.total.toLocaleString("en-IN")}</strong>
          <small>{summary.totalRecords} fee records</small>
        </article>

        <article>
          <TrendingUp />
          <span>Collection Status</span>
          <strong>
            {summary.total > 0 
              ? Math.round((byStatus.find(s => s.status === "PAID")?.amount || 0) / summary.total * 100)
              : 0}%
          </strong>
          <small>Collection rate</small>
        </article>

        <article>
          <DollarSign />
          <span>Collected</span>
          <strong className="text-success">
            ₹{(byStatus.find(s => s.status === "PAID")?.amount || 0).toLocaleString("en-IN")}
          </strong>
          <small>Paid amount</small>
        </article>

        <article>
          <AlertTriangle />
          <span>Pending</span>
          <strong className="text-warning">
            ₹{(byStatus.filter(s => s.status !== "PAID").reduce((sum, s) => sum + s.amount, 0)).toLocaleString("en-IN")}
          </strong>
          <small>Outstanding amount</small>
        </article>
      </section>

      <div className="platform-overview-grid">
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <PieChart size={19} /> Fee Collection by Status
              </h2>
              <p>Breakdown of fee payments by status</p>
            </div>
          </div>

          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Status</span>
              <span>Amount</span>
              <span>Count</span>
            </div>

            {byStatus.map((item) => (
              <div className="platform-stat-row" key={item.status}>
                <span>
                  <strong className={`principal-status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </strong>
                </span>
                <b>₹{item.amount.toLocaleString("en-IN")}</b>
                <b>{item.count}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <TrendingUp size={19} /> Fee Collection by Term
              </h2>
              <p>Term-wise fee collection analysis</p>
            </div>
          </div>

          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Term</span>
              <span>Amount</span>
              <span>Records</span>
            </div>

            {byTerm.map((item) => (
              <div className="platform-stat-row" key={item.term}>
                <span>
                  <strong>{item.term}</strong>
                </span>
                <b>₹{item.amount.toLocaleString("en-IN")}</b>
                <b>{item.count}</b>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <AlertTriangle size={19} /> Fee Defaulters
            </h2>
            <p>Students with overdue fee payments</p>
          </div>
          
          {defaulters.length > 0 && (
            <span className="superadmin-count principal-defaulter-badge">
              {defaulters.length} defaulters
            </span>
          )}
        </div>

        {defaulters.length > 0 ? (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Student</span>
              <span>Class</span>
              <span>Amount</span>
              <span>Term</span>
              <span>Due Date</span>
            </div>

            {defaulters.map((item) => (
              <div className="platform-stat-row" key={item.id}>
                <span>
                  <strong>{item.studentName}</strong>
                </span>
                <b>{item.class}</b>
                <b className="text-danger">₹{item.amount.toLocaleString("en-IN")}</b>
                <b>{item.term}</b>
                <span>
                  <small className="text-danger">
                    {new Date(item.dueDate).toLocaleDateString("en-IN")}
                  </small>
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="superadmin-empty">
            No fee defaulters. All payments are on track.
          </div>
        )}
      </section>
    </>
  );
}
