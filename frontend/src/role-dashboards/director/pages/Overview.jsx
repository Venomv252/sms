import React, { useEffect, useState } from "react";
import {
  Activity,
  BookOpen,
  ClipboardList,
  GraduationCap,
  IndianRupee,
  Megaphone,
  RefreshCw,
  Users,
} from "lucide-react";
import { apiGet } from "../../../api.js";
import "../../school-workspace.css";

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const fullName = (person) =>
  [person?.firstName, person?.lastName].filter(Boolean).join(" ") || "Unnamed";

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <article className="sw-stat-card">
      <div className="sw-stat-icon">
        <Icon size={19} />
      </div>
      <div className="sw-stat-label">{label}</div>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function EmptyState({ children }) {
  return <div className="sw-empty">{children}</div>;
}

export default function Overview({ schoolId, onNavigate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await apiGet(`/platform/director/schools/${schoolId}/overview`);
      setData(result.data);
    } catch (err) {
      setError(err.message || "Unable to load overview.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [schoolId]);

  if (loading) {
    return (
      <div className="sw-loading">
        <RefreshCw className="sw-spin" /> Loading overview…
      </div>
    );
  }

  if (error) {
    return <div className="sw-error">{error}</div>;
  }

  if (!data) {
    return <EmptyState>No overview data available.</EmptyState>;
  }

  const stats = data.stats || {};
  const school = data.school || {};

  return (
    <>
      <div className="sw-welcome">
        <div>
          <h2>School overview</h2>
          <p>Live summary calculated from {school.name}'s records.</p>
        </div>
        <div className="sw-welcome-actions">
          <span className="sw-live">
            <i /> Connected to school data
          </span>
        </div>
      </div>

      <section className="sw-stats-grid">
        <StatCard
          icon={GraduationCap}
          label="Students"
          value={stats.students ?? 0}
          note="Enrolled student records"
        />
        <StatCard
          icon={Users}
          label="Teachers"
          value={stats.teachers ?? 0}
          note={`${stats.otherStaff ?? 0} other staff accounts`}
        />
        <StatCard
          icon={BookOpen}
          label="Classes"
          value={stats.classes ?? 0}
          note={`${stats.subjects ?? 0} subjects configured`}
        />
        <StatCard
          icon={Activity}
          label="Today's attendance"
          value={
            stats.attendanceToday == null ? "No data" : `${stats.attendanceToday}%`
          }
          note={`${stats.presentToday ?? 0} present / ${stats.attendanceRecordsToday ?? 0} marked`}
        />
        <StatCard
          icon={IndianRupee}
          label="Fees collected"
          value={money(stats.feeCollected)}
          note="Paid fee records only"
        />
        <StatCard
          icon={ClipboardList}
          label="Results published"
          value={stats.resultsPublished ?? 0}
          note={`${stats.pendingFeeRecords ?? 0} pending fee records`}
        />
      </section>
    </>
  );
}
