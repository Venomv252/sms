import React, { useState } from 'react';
import { loginUser } from '../api.js';
import './LoginPage.css';

/* ─── Icons (inline SVG helpers) ─────────────────────────────── */
const IconGraduate = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5" />
  </svg>
);

const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 17.92z" />
  </svg>
);

const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconCalendar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const IconEye = ({ open }) => (
  open
    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
      </svg>
);

const IconInfo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconBadge = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconFingerprint = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
    <path d="M5 12a7 7 0 0114 0" />
    <path d="M8 12a4 4 0 018 0" />
    <line x1="12" y1="12" x2="12" y2="12.01" />
  </svg>
);

const IconClipboard = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

const IconStaff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconBoard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

/* ─── Navbar ────────────────────────────────────────────────────── */
function IconPlatformLogo() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7 9h10M7 13h4M7 17h4" />
      <path d="M15 13h2v4h-2z" />
    </svg>
  );
}

function Navbar() {
  const [language, setLanguage] = useState("en");
  const [languageOpen, setLanguageOpen] = useState(false);

  const content = {
    en: {
      name: "School Management System",
      subtitle: "One platform for smarter school management",
      language: "English",
    },
    hi: {
      name: "School Management System",
      subtitle: "स्मार्ट स्कूल प्रबंधन के लिए एक प्लेटफ़ॉर्म",
      language: "हिन्दी",
    },
  };

  const current = content[language];

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <IconPlatformLogo />
        </div>

        <div className="brand-text">
          <div className="brand-name">{current.name}</div>
          <div className="brand-sub">{current.subtitle}</div>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="language-wrapper">
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLanguageOpen((prev) => !prev)}
            aria-label="Select language"
            aria-expanded={languageOpen}
            aria-haspopup="listbox"
          >
            <IconGlobe />
            <span>{current.language}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {languageOpen && (
            <div className="language-dropdown" role="listbox">
              <button
                type="button"
                role="option"
                aria-selected={language === "en"}
                className={`language-option ${
                  language === "en" ? "active" : ""
                }`}
                onClick={() => {
                  setLanguage("en");
                  setLanguageOpen(false);
                }}
              >
                English
                {language === "en" && <span>✓</span>}
              </button>

              <button
                type="button"
                role="option"
                aria-selected={language === "hi"}
                className={`language-option ${
                  language === "hi" ? "active" : ""
                }`}
                onClick={() => {
                  setLanguage("hi");
                  setLanguageOpen(false);
                }}
              >
                हिन्दी
                {language === "hi" && <span>✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


/* ─── Product announcement ─────────────────────────────────────── */
function NoticeBanner() {
  return (
    <div className="notice-banner product-notice">
      <span className="notice-dot" />
      <span className="notice-text">
        <strong>ONE CONNECTED PLATFORM</strong> — Simplify everyday school operations with one secure workspace.
      </span>
    </div>
  );
}

/* ─── School Management System promotion ────────────────────────── */
function LeftPanel() {
  const features = [
    { icon: <IconBoard />, title: 'Academic management', detail: 'Classes, exams, results & syllabus' },
    { icon: <IconUser />, title: 'People & roles', detail: 'Staff, students & parent access' },
    { icon: <IconClipboard />, title: 'Attendance & fees', detail: 'Daily records and fee workflows' },
    { icon: <IconTruck />, title: 'Transport tracking', detail: 'Routes and live bus updates' },
  ];

  return (
    <section className="left-panel">
      <div className="sms-promo">
        <div className="promo-eyebrow"><span className="promo-eyebrow-dot" /> SCHOOL MANAGEMENT PLATFORM</div>
        <div className="promo-brand-row">
          <div className="promo-logo"><IconPlatformLogo /></div>
          <span>School Management System</span>
        </div>
        <h1 className="promo-title">Everything your school needs. <span>In one place.</span></h1>
        <p className="promo-description">
          Bring academic operations, people, communication and transport together in one connected platform — built to make school management simpler.
        </p>

        <div className="promo-dashboard" aria-label="School management dashboard preview">
          <div className="promo-dashboard-top">
            <div><span className="promo-dashboard-kicker">YOUR SCHOOL</span><strong>Management overview</strong></div>
            <span className="promo-dashboard-live"><i /> Workspace</span>
          </div>
          <div className="promo-dashboard-grid">
            <div className="promo-mini-card"><span className="promo-mini-icon"><IconBoard /></span><span>Academics</span><strong>Plan &amp; manage</strong></div>
            <div className="promo-mini-card"><span className="promo-mini-icon"><IconUser /></span><span>People</span><strong>One directory</strong></div>
            <div className="promo-mini-card"><span className="promo-mini-icon"><IconClipboard /></span><span>Operations</span><strong>Stay organised</strong></div>
          </div>
          <div className="promo-dashboard-bottom"><span className="promo-dashboard-line" /><span>One view. Connected workflows.</span></div>
        </div>

        <div className="promo-features-heading">A connected school experience</div>
        <div className="promo-features">
          {features.map((feature) => (
            <div className="promo-feature" key={feature.title}>
              <span className="promo-feature-icon">{feature.icon}</span>
              <span className="promo-feature-copy"><strong>{feature.title}</strong><small>{feature.detail}</small></span>
            </div>
          ))}
        </div>
        <div className="promo-bottom-note"><IconShield /> Designed around the needs of school administrators, teachers, parents and students.</div>
      </div>
    </section>
  );
}

/* ─── Login Form (Right Panel) ──────────────────────────────────── */
function RightPanel({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      // The API currently receives this value through loginUser's first argument.
      // Ensure the backend and api.js authenticate using username, not email.
      const result = await loginUser(username.trim(), password);
      onLoginSuccess?.(result.user);
    } catch (loginError) {
      setError(
        loginError.message ||
        'Unable to sign in. Check your username and password.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="right-panel">
      <div className="gateway-card">
        <div className="gateway-header">
          <div>
            <h2 className="gateway-title">Welcome Back</h2>
            <p className="gateway-sub">
              Sign in to access your school account
            </p>
          </div>

          <div className="ssl-badge">
            <span className="ssl-dot" />
            Secure Login
          </div>
        </div>

        <form className="login-auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-username">
              Username
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                <IconUser />
              </span>

              <input
                id="login-username"
                type="text"
                name="username"
                autoComplete="username"
                autoFocus
                required
                className="form-input"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="login-password">
                Password
              </label>

              <a href="#forgot" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <div className="input-wrapper">
              <span className="input-icon">
                <IconLock />
              </span>

              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <IconEye open={showPassword} />
              </button>
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="signin-btn"
            disabled={submitting}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
            {!submitting && <IconArrow />}
          </button>
        </form>
      </div>

      <div className="server-status">
        <span className="server-left">
          <span className="status-dot green" />
          School Management System
        </span>
      </div>
    </div>
  );
}

/* ─── Page Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="page-footer">
      <div className="footer-left">
        <div className="footer-security">
          <IconShield />
          <div>
            <p className="footer-sec-title">School Management System</p>
            <p className="footer-sec-sub">A connected workspace for your school community.</p>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <a href="#privacy">Privacy Policy</a>
        <span>•</span>
        <a href="#terms">Terms of Use</a>
        <span>•</span>
        <span>© {new Date().getFullYear()} School Management System</span>
      </div>
    </footer>
  );
}

/* ─── Main LoginPage ─────────────────────────────────────────────── */
export default function LoginPage({ onLoginSuccess }) {
  return (
    <div className="login-page page-wrapper">
      <Navbar />
      <NoticeBanner />
      <main className="main-content">
        <LeftPanel />
        <RightPanel onLoginSuccess={onLoginSuccess} />
      </main>
      <Footer />
    </div>
  );
}
