import React, { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bus,
  CircleDollarSign,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Overview({ setError, setMessage }) {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOverview = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet("/principal/dashboard/overview");
      setOverview(data);
    } catch (err) {
      setError(err.message || "Unable to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading) {
    return <div className="superadmin-loading">Loading dashboard...</div>;
  }

  if (!overview) {
    return (
      <div className="superadmin-error">
        <AlertTriangle size={20} />
        No dashboard data available
      </div>
    );
  }

  const { school, overview: stats, charts, recentActivity } = overview;

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Welcome to {school?.name || "Your School"}</h2>
          <p>
            Comprehensive school management dashboard. Monitor key metrics, review recent activities, and manage daily operations.
          </p>
        </div>
      </section>

      <section className="superadmin-overview superadmin-kpis">
        <article>
          <GraduationCap />
          <span>Total Students</span>
          <strong>{stats.totalStudents.toLocaleString("en-IN")}</strong>
          <small>Enrolled students</small>
        </article>

        <article>
          <Users />
          <span>Total Teachers</span>
          <strong>{stats.totalTeachers.toLocaleString("en-IN")}</strong>
          <small>Teaching staff</small>
        </article>

        <article>
          <Activity />
          <span>Attendance Today</span>
          <strong>{stats.studentAttendanceToday.rate}%</strong>
          <small>
            {stats.studentAttendanceToday.present} of {stats.studentAttendanceToday.total} present
          </small>
        </article>

        <article>
          <CircleDollarSign />
          <span>Fee Collection</span>
          <strong>{stats.fees.collectionRate}%</strong>
          <small>
            ₹{(stats.fees.collected / 1000).toFixed(1)}k of ₹{(stats.fees.total / 1000).toFixed(1)}k
          </small>
        </article>
      </section>

      <div className="platform-overview-grid">
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <Activity size={19} /> Key Metrics
              </h2>
              <p>Important operational indicators</p>
            </div>
          </div>

          <div className="principal-metrics-grid">
            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <Users size={20} />
              </div>
              <div>
                <span>Total Employees</span>
                <strong>{stats.totalEmployees}</strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <Bus size={20} />
              </div>
              <div>
                <span>Active Buses</span>
                <strong>{stats.activeBuses}</strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <MessageSquare size={20} />
              </div>
              <div>
                <span>Unresolved Complaints</span>
                <strong>{stats.unresolvedComplaints}</strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <AlertTriangle size={20} />
              </div>
              <div>
                <span>Pending Leaves</span>
                <strong>{stats.pendingLeaves}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <CircleDollarSign size={19} /> Fee Collection Status
              </h2>
              <p>Financial overview</p>
            </div>
          </div>

          <div className="principal-fee-breakdown">
            <div className="principal-fee-item">
              <span>Total Fees</span>
              <strong>₹{stats.fees.total.toLocaleString("en-IN")}</strong>
            </div>
            <div className="principal-fee-item success">
              <span>Collected</span>
              <strong>₹{stats.fees.collected.toLocaleString("en-IN")}</strong>
            </div>
            <div className="principal-fee-item warning">
              <span>Pending</span>
              <strong>₹{stats.fees.pending.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </section>
      </div>

      {charts.studentsByClass && charts.studentsByClass.length > 0 && (
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <TrendingUp size={19} /> Class-wise Student Distribution
              </h2>
              <p>Student enrollment across classes</p>
            </div>
          </div>

          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Class</span>
              <span>Student Count</span>
            </div>

            {charts.studentsByClass.map((item) => (
              <div className="platform-stat-row" key={item.class}>
                <span>
                  <strong>{item.class}</strong>
                </span>
                <b>{item.count}</b>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="platform-overview-grid">
        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <GraduationCap size={19} /> Recent Admissions
              </h2>
              <p>Latest student registrations</p>
            </div>
          </div>

          {recentActivity.admissions.length > 0 ? (
            recentActivity.admissions.map((admission) => (
              <div className="platform-compact-row" key={admission.id}>
                <div className="network-school-mark">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <strong>{admission.name}</strong>
                  <small>
                    {admission.admissionNumber} · Class {admission.class}
                  </small>
                </div>
                <b>{new Date(admission.date).toLocaleDateString("en-IN")}</b>
              </div>
            ))
          ) : (
            <div className="superadmin-empty">No recent admissions</div>
          )}
        </section>

        <section className="superadmin-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <MessageSquare size={19} /> Recent Complaints
              </h2>
              <p>Latest grievances submitted</p>
            </div>
          </div>

          {recentActivity.complaints.length > 0 ? (
            recentActivity.complaints.map((complaint) => (
              <div className="platform-compact-row" key={complaint.id}>
                <div
                  className="principal-priority-badge"
                  data-priority={complaint.priority}
                >
                  {complaint.priority}
                </div>
                <div>
                  <strong>{complaint.title}</strong>
                  <small>
                    {complaint.category} · {complaint.status}
                  </small>
                </div>
                <b>{new Date(complaint.createdAt).toLocaleDateString("en-IN")}</b>
              </div>
            ))
          ) : (
            <div className="superadmin-empty">No recent complaints</div>
          )}
        </section>
      </div>
    </>
  );
}
