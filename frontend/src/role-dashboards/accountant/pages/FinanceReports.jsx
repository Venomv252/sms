import React from "react";
import { BarChart3 } from "lucide-react";

export default function FinanceReports({ setError, setMessage }) {
  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><BarChart3 size={19} /> Financial Reports</h2>
            <p>Generate and view financial reports and analytics</p>
          </div>
        </div>

        <div className="superadmin-empty">
          Financial reports coming soon...
        </div>
      </section>
    </>
  );
}
