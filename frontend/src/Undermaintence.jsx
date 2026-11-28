
import React from "react";

export default function UnderMaintenance({
  serviceName = "School ERP Portal",
  title = "We're Currently Under Maintenance",
  description = "We're making some improvements to provide you with a better experience. Please check back shortly.",
  supportEmail = "",
}) {
  const styles = {
    page: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      boxSizing: "border-box",
      background: "#f6faf7",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      color: "#172b21",
    },
    card: {
      width: "100%",
      maxWidth: "620px",
      padding: "56px 40px",
      boxSizing: "border-box",
      textAlign: "center",
      background: "#ffffff",
      border: "1px solid #e3eee7",
      borderRadius: "20px",
      boxShadow: "0 12px 40px rgba(25, 75, 45, 0.07)",
    },
    logo: {
      width: "64px",
      height: "64px",
      margin: "0 auto 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "18px",
      background: "#e8f5ec",
      color: "#168348",
    },
    heading: {
      margin: "0 0 16px",
      fontSize: "clamp(26px, 5vw, 34px)",
      lineHeight: 1.25,
      fontWeight: 750,
      letterSpacing: "-1px",
      color: "#183c29",
    },
    description: {
      maxWidth: "460px",
      margin: "0 auto",
      fontSize: "15px",
      lineHeight: 1.8,
      color: "#687a6e",
    },
    status: {
      display: "inline-flex",
      alignItems: "center",
      gap: "9px",
      marginTop: "28px",
      padding: "9px 15px",
      borderRadius: "30px",
      background: "#fff7e8",
      color: "#94621b",
      fontSize: "13px",
      fontWeight: 600,
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#e6a23c",
    },
    divider: {
      height: "1px",
      width: "100%",
      margin: "32px 0 24px",
      background: "#edf2ee",
    },
    button: {
      border: "none",
      borderRadius: "9px",
      padding: "13px 25px",
      background: "#168348",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: 650,
      cursor: "pointer",
      transition: "background 0.2s ease",
    },
    footer: {
      marginTop: "28px",
      fontSize: "12px",
      color: "#98a79d",
    },
  };

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14.7 6.3a5 5 0 0 0-6.9 6.9L3 18v3h3l4.8-4.8a5 5 0 0 0 6.9-6.9L14 13l-3-3 3.7-3.7Z" />
          </svg>
        </div>

        <div
          style={{
            marginBottom: "14px",
            color: "#168348",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "1.8px",
            textTransform: "uppercase",
          }}
        >
          {serviceName}
        </div>

        <h1 style={styles.heading}>{title}</h1>

        <p style={styles.description}>{description}</p>

        <div style={styles.status}>
          <span style={styles.statusDot} />
          Temporarily Unavailable
        </div>

        <div style={styles.divider} />

        <button
          type="button"
          style={styles.button}
          onClick={() => window.location.reload()}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#116b3b";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#168348";
          }}
        >
          Try Again
        </button>

        {supportEmail && (
          <p style={{ ...styles.description, marginTop: "22px", fontSize: "13px" }}>
            Need assistance?{" "}
            <a
              href={`mailto:${supportEmail}`}
              style={{ color: "#168348", fontWeight: 600 }}
            >
              Contact Support
            </a>
          </p>
        )}

        <div style={styles.footer}>
          Thank you for your patience.
        </div>
      </section>
    </main>
  );
}
