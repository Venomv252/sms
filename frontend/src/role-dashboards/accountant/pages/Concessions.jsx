import React from "react";
import { Percent } from "lucide-react";

export default function Concessions({ setError, setMessage }) {
  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><Percent size={19} /> Concessions & Discounts</h2>
            <p>Manage fee concessions and discounts for students</p>
          </div>
        </div>

        <div className="superadmin-empty">
          Concessions management coming soon...
        </div>
      </section>
    </>
  );
}
