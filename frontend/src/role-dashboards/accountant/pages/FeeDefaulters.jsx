import React, { useEffect, useState } from "react";
import { TrendingDown, Mail, Phone } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function FeeDefaulters({ setError, setMessage }) {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDefaulters = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet("/accountant/defaulters");
      setDefaulters(data || []);
    } catch (err) {
      setError(err.message || "Unable to load defaulters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDefaulters();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><TrendingDown size={19} /> Fee Defaulters</h2>
            <p>Students with pending or overdue fees</p>
          </div>
        </div>

        {loading && <div className="superadmin-loading">Loading defaulters...</div>}

        {!loading && defaulters.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Student</span>
              <span>Class</span>
              <span>Pending Amount</span>
              <span>Days Overdue</span>
              <span>Contact</span>
              <span>Actions</span>
            </div>

            {defaulters.map((defaulter) => (
              <div className="platform-stat-row" key={defaulter.id}>
                <span>
                  <strong>{defaulter.studentName}</strong>
                  <small>{defaulter.rollNumber}</small>
                </span>
                <span>{defaulter.class}</span>
                <span className="text-danger"><strong>{formatCurrency(defaulter.pendingAmount)}</strong></span>
                <span className={defaulter.daysOverdue > 30 ? "text-danger" : "text-warning"}>
                  {defaulter.daysOverdue} days
                </span>
                <span>
                  <small>{defaulter.parentPhone || "—"}</small>
                </span>
                <span style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="superadmin-icon-button" 
                    title="Send reminder email"
                  >
                    <Mail size={15} />
                  </button>
                  <button 
                    className="superadmin-icon-button" 
                    title="Call parent"
                  >
                    <Phone size={15} />
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading && defaulters.length === 0 && (
          <div className="superadmin-empty">No fee defaulters. All fees are up to date! 🎉</div>
        )}
      </section>
    </>
  );
}
