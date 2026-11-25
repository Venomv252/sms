import React from "react";
import { Receipt } from "lucide-react";

export default function Transactions({ setError, setMessage }) {
  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><Receipt size={19} /> Transaction History</h2>
            <p>View all fee payment transactions</p>
          </div>
        </div>

        <div className="superadmin-empty">
          Transaction history coming soon...
        </div>
      </section>
    </>
  );
}
