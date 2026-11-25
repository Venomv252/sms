import React, { useEffect, useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { apiGet } from "../../../api.js";

export default function AccountantOverview({ setError, setMessage }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet("/accountant/overview");
      setStats(data);
    } catch (err) {
      setError(err.message || "Unable to load overview");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return <div className="superadmin-loading">Loading overview...</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Financial Overview</h2>
          <p>Monitor fee collection, pending payments, and financial performance</p>
        </div>
      </section>

      <section className="superadmin-overview superadmin-kpis">
        <article>
          <DollarSign />
          <span>Total Collected</span>
          <strong>{formatCurrency(stats?.totalCollected || 0)}</strong>
          <small>This academic year</small>
        </article>

        <article>
          <TrendingUp />
          <span>Pending Collection</span>
          <strong>{formatCurrency(stats?.totalPending || 0)}</strong>
          <small>Yet to be collected</small>
        </article>

        <article>
          <TrendingDown />
          <span>Overdue Fees</span>
          <strong>{formatCurrency(stats?.totalOverdue || 0)}</strong>
          <small>Past due date</small>
        </article>

        <article>
          <Users />
          <span>Fee Defaulters</span>
          <strong>{stats?.defaultersCount || 0}</strong>
          <small>Students with pending fees</small>
        </article>
      </section>

      <div className="platform-overview-grid">
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2><CreditCard size={19} /> Recent Transactions</h2>
              <p>Latest fee payments received</p>
            </div>
          </div>

          {stats?.recentTransactions?.length > 0 ? (
            <div className="platform-stat-table">
              <div className="platform-stat-row heading">
                <span>Student</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Status</span>
              </div>

              {stats.recentTransactions.slice(0, 5).map((txn) => (
                <div className="platform-stat-row" key={txn.id}>
                  <span><strong>{txn.studentName}</strong></span>
                  <span>{formatCurrency(txn.amount)}</span>
                  <span><small>{new Date(txn.paymentDate).toLocaleDateString()}</small></span>
                  <span className="text-success">Paid</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="superadmin-empty">No recent transactions</div>
          )}
        </section>

        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2><AlertCircle size={19} /> Top Defaulters</h2>
              <p>Students with highest pending amounts</p>
            </div>
          </div>

          {stats?.topDefaulters?.length > 0 ? (
            <div className="platform-stat-table">
              <div className="platform-stat-row heading">
                <span>Student</span>
                <span>Pending</span>
                <span>Days Overdue</span>
              </div>

              {stats.topDefaulters.slice(0, 5).map((defaulter) => (
                <div className="platform-stat-row" key={defaulter.id}>
                  <span><strong>{defaulter.studentName}</strong></span>
                  <span className="text-danger">{formatCurrency(defaulter.pending)}</span>
                  <span><small>{defaulter.daysOverdue} days</small></span>
                </div>
              ))}
            </div>
          ) : (
            <div className="superadmin-empty">No pending payments</div>
          )}
        </section>
      </div>
    </>
  );
}
