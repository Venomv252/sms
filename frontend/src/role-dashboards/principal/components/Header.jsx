export default function Header() {
  return (
    <header className="header">
      <div className="header-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        Search admission no, faculty…
      </div>
      <div className="header-chips">
        <span className="chip chip-gray">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          AY 2024–25 Q4
        </span>
        <span className="chip chip-green chip-dot">CAMPUS: NORMAL</span>
        <span className="chip chip-blue">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3z"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          Principal Action / Broadcast
        </span>
      </div>
      <div className="header-user" style={{ marginLeft: 'auto' }}>
        <div className="avatar avatar-green">EV</div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Dr. Eleanor Varce</div>
          <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>Director & Principal</div>
        </div>
      </div>
    </header>
  )
}
