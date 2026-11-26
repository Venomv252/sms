import React, { useEffect, useState } from "react";
import { apiGet, clearApiSession } from "./api.js";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, Clock3, Table2, BookOpen, FileText,
  ClipboardList, MessageCircleQuestion, ClipboardCheck, TrendingUp,
  CalendarCheck, Award, Trophy, Bell, Megaphone, Dumbbell, Menu,
  Search, ChevronDown, GraduationCap, MoreHorizontal, Plus, X,
  Send, LogOut, Settings
} from "lucide-react";
import { subjects, allNotices } from "./data.js";

/* ─── Route map ─────────────────────────────────────────────────────────── */
export const ROUTES = {
  "Dashboard": "/student/dashboard",
  "Schedule & Classes": "/student/dashboard/schedule",
  "School Timing": "/student/dashboard/school-timing",
  "Timetable": "/student/dashboard/timetable",
  "Subjects": "/student/dashboard/subjects",
  "Syllabus": "/student/dashboard/syllabus",
  "Notes": "/student/dashboard/notes",
  "Homework & Assignments": "/student/dashboard/homework",
  "Doubt Forum": "/student/dashboard/doubt-forum",
  "Attendance": "/student/dashboard/attendance",
  "Performance": "/student/dashboard/performance",
  "Exam Schedule": "/student/dashboard/exam-schedule",
  "Results & Report Cards": "/student/dashboard/results",
  "Certificates": "/student/dashboard/certificates",
  "Certificates & Achievements": "/student/dashboard/certificates",
  "Notice Board & Circulars": "/student/dashboard/notices",
  "Announcements": "/student/dashboard/announcements",
  "Class Announcements": "/student/dashboard/class-announcements",
  "Sports & Activities": "/student/dashboard/sports",
  "Sports & Extra Activities": "/student/dashboard/sports",
  "Fee Management": "/student/dashboard/fee-management",
  "Transport & Commute": "/student/dashboard/transport",
};

const navSections = [
  {title:"MAIN",items:[[LayoutDashboard,"Dashboard"],[CalendarDays,"Schedule & Classes"],[Clock3,"School Timing"],[Table2,"Timetable"]]},
  {title:"ACADEMICS",items:[[BookOpen,"Subjects"],[FileText,"Syllabus"],[FileText,"Notes"],[ClipboardList,"Homework & Assignments"],[MessageCircleQuestion,"Doubt Forum"]]},
  {title:"ASSESSMENTS & RECORDS",items:[[ClipboardCheck,"Attendance"],[TrendingUp,"Performance"],[CalendarCheck,"Exam Schedule"],[Award,"Results & Report Cards"],[Trophy,"Certificates & Achievements"]]},
  {title:"CAMPUS & COMMUNITY",items:[[FileText,"Notice Board & Circulars"],[Bell,"Announcements"],[Megaphone,"Class Announcements"],[Dumbbell,"Sports & Extra Activities"]]},
  {title:"ADMINISTRATION",items:[[FileText,"Fee Management"],[FileText,"Transport & Commute"]]}
];

/* ─── Shared Modal ───────────────────────────────────────────────────────── */
export function Modal({ title, onClose, children, wide }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-box${wide?" modal-wide":""}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}><X size={20}/></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

/* ─── Shared Toast ───────────────────────────────────────────────────────── */
export function Toast({ message, onClose }) {
  React.useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return <div className="toast">{message}</div>;
}

/* ─── Layout ─────────────────────────────────────────────────────────────── */
export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [doubtText, setDoubtText] = useState("");
  const [doubtSubject, setDoubtSubject] = useState("Computer Science");
  const [quickAction, setQuickAction] = useState("");
  const [backendReady, setBackendReady] = useState(false);

  // Keep the dashboard content hidden until the API can authenticate against
  // the seeded database. Retry periodically so starting the backend later works.
  useEffect(() => {
    let active = true;
    let checking = false;
    const verifyBackend = async () => {
      if (checking) return;
      checking = true;
      try {
        await apiGet("/auth/me");
        if (active) setBackendReady(true);
      } catch {
        if (active) setBackendReady(false);
      } finally {
        checking = false;
      }
    };
    verifyBackend();
    const intervalId = window.setInterval(verifyBackend, 5000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const showToast = msg => setToast(msg);
  const closeModal = () => setModal(null);

  const activeLabel = Object.entries(ROUTES).find(([,v]) => v === location.pathname)?.[0] || "Dashboard";

  const navTo = (label) => {
    const route = ROUTES[label];
    if (route) navigate(route);
    setMobileMenuOpen(false);
  };

  const handleLeaveSubmit = () => {
    if (!leaveDate || !leaveReason) { showToast("Please fill all fields."); return; }
    closeModal(); setLeaveDate(""); setLeaveReason("");
    showToast("✓ Leave application submitted successfully!");
  };

  const ctx = { showToast, setModal, navigate };

  return (
    <div className="app">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={22}/></div>
          <div><strong>Greenwood High</strong><span>Student ERP Portal</span></div>
        </div>
        <div className="sidebar-content">
          {navSections.map(section => (
            <div className="nav-section" key={section.title}>
              <div className="nav-title">{section.title}</div>
              {section.items.map(([Icon, label]) => (
                <div
                  className={`nav-item${activeLabel === label ? " selected" : ""}`}
                  key={label}
                  onClick={() => navTo(label)}
                >
                  <Icon size={16}/><span>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="sidebar-user" onClick={() => backendReady && setModal("profile")} style={{cursor: backendReady ? "pointer" : "default"}}>
          <div className="avatar small">{backendReady ? "" : ""}</div>
          <div><strong>{backendReady ? "Student" : ""}</strong><span>{backendReady ? "Connected account" : ""}</span></div>
          <MoreHorizontal size={17}/>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="brand">
                <div className="brand-icon"><GraduationCap size={19}/></div>
                <div><strong>Greenwood High</strong><span>Student ERP Portal</span></div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} style={{background:"none",border:"none",cursor:"pointer"}}><X size={21}/></button>
            </div>
            <div className="mobile-menu-content">
              {navSections.map(section => (
                <div className="nav-section" key={section.title}>
                  <div className="nav-title">{section.title}</div>
                  {section.items.map(([Icon, label]) => (
                    <div
                      className={`nav-item${activeLabel === label ? " selected" : ""}`}
                      key={label}
                      onClick={() => navTo(label)}
                    >
                      <Icon size={16}/><span>{label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="main-wrapper">
        {/* Desktop Header */}
        <header className="desktop-header">
          <div className="search-box" style={{cursor:backendReady ? "pointer" : "default"}} onClick={() => backendReady && setModal("search")}>
            <Search size={16}/><input placeholder="Search subjects, homework, notices..." readOnly style={{cursor:"pointer"}}/>
          </div>
          <div className="header-right">
            <div className="term-selector">{backendReady ? "● Connected to school database" : ""}</div>
            <button className="quick-action" onClick={() => backendReady && setModal("quickaction")}><Plus size={17}/>Quick Action</button>
            <button style={{background:"none",border:"none",cursor:backendReady ? "pointer" : "default",display:"flex",alignItems:"center"}} onClick={() => backendReady && setModal("notifications")}><Bell size={18}/></button>
            <div className="profile" style={{cursor:backendReady ? "pointer" : "default"}} onClick={() => backendReady && setModal("profile")}>
              <div className="avatar">{backendReady ? "" : ""}</div>
              <div><strong>{backendReady ? "Student" : ""}</strong><span>{backendReady ? "Connected account" : ""}</span></div>
              <ChevronDown size={14}/>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="mobile-header">
          <button style={{background:"none",border:"none",cursor:"pointer"}} onClick={() => setMobileMenuOpen(true)}><Menu size={22}/></button>
          <div className="mobile-brand">
            <div className="brand-icon"><GraduationCap size={17}/></div>
            <div><strong>Greenwood High</strong><span>School ERP</span></div>
          </div>
          <div className="mobile-header-right">
            <button style={{background:"none",border:"none",cursor:backendReady ? "pointer" : "default"}} onClick={() => backendReady && setModal("notifications")}><Bell size={20}/></button>
            <div className="avatar" style={{cursor:backendReady ? "pointer" : "default"}} onClick={() => backendReady && setModal("profile")}>{backendReady ? "" : ""}</div>
          </div>
        </header>

        {/* Page content */}
        <main className="page-content">
          {backendReady ? React.cloneElement(children, { showToast, setModal }) : <div aria-hidden="true" style={{ minHeight: "75vh" }} />}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        {[[LayoutDashboard,"Dashboard","/student/dashboard"],[CalendarDays,"Schedule","/student/dashboard/schedule"],[ClipboardList,"Homework","/student/dashboard/homework"],[TrendingUp,"Performance","/student/dashboard/performance"],[MoreHorizontal,"More",null]].map(([Icon,label,route]) => (
          <div key={label}
            className={location.pathname === route ? "active" : ""}
            style={{cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}
            onClick={() => route ? navigate(route) : setModal("quickaction")}
          >
            <Icon size={19}/><span>{label}</span>
          </div>
        ))}
      </nav>

      {/* ─── Global Modals ─── */}
      {backendReady && modal === "search" && (
        <Modal title="Search" onClose={closeModal}>
          <input autoFocus className="modal-input" placeholder="Search subjects, homework, notices..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
          {searchQuery && (
            <div className="search-results">
              {[...subjects.map(s => ({type:"Subject",label:s.name,route:"/student/dashboard/subjects"})),
                ...allNotices.map(n => ({type:"Notice",label:n.title,route:"/student/dashboard/notices"})),
                {type:"Page",label:"Attendance",route:"/student/dashboard/attendance"},{type:"Page",label:"Timetable",route:"/student/dashboard/timetable"},
                {type:"Page",label:"Homework & Assignments",route:"/student/dashboard/homework"},{type:"Page",label:"Exam Schedule",route:"/student/dashboard/exam-schedule"},
              ].filter(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,8).map((r,i) => (
                <div className="search-result-item" key={i} onClick={() => { navigate(r.route); closeModal(); setSearchQuery(""); }}>
                  <span className="result-type">{r.type}</span><span>{r.label}</span>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {backendReady && modal === "quickaction" && (
        <Modal title="Quick Action" onClose={closeModal}>
          <p className="modal-desc">Jump to a section or launch a task quickly.</p>
          <div className="quick-action-grid">
            {[["Apply Leave","/student/dashboard/attendance"],["Ask a Doubt","/student/dashboard/doubt-forum"],["View Report Card","/student/dashboard/results"],["Check Homework","/student/dashboard/homework"],["View Timetable","/student/dashboard/timetable"],["Exam Schedule","/student/dashboard/exam-schedule"],["My Notes","/student/dashboard/notes"],["Sports & Clubs","/student/dashboard/sports"],["Fee Management","/student/dashboard/fee-management"],["Bus Tracking","/student/dashboard/transport"]].map(([a,route]) => (
              <button key={a} className="qa-option" onClick={() => { navigate(route); closeModal(); showToast(`Opening ${a}...`); }}>{a}</button>
            ))}
          </div>
        </Modal>
      )}

      {backendReady && modal === "notifications" && (
        <Modal title="Notifications" onClose={closeModal}>
          <div className="notif-list">
            {[{icon:"🔔",text:"Term Finals begin in 12 days. Start revising!",time:"Just now"},{icon:"📋",text:"Homework: Physics Assignment due today at 05:00 PM.",time:"2 hrs ago"},{icon:"🏆",text:"School Football Championship this Thursday.",time:"Yesterday"},{icon:"📌",text:"Science Olympiad synopsis due this Friday.",time:"Yesterday"},{icon:"📅",text:"PTM rescheduled to March 22nd.",time:"2 days ago"},].map((n,i) => (
              <div className="notif-item" key={i}><span className="notif-icon">{n.icon}</span><div><p>{n.text}</p><small>{n.time}</small></div></div>
            ))}
          </div>
          <div className="modal-actions"><button className="modal-btn-secondary" onClick={closeModal}>Close</button></div>
        </Modal>
      )}

      {backendReady && modal === "profile" && (
        <Modal title="Student Profile" onClose={closeModal}>
          <div className="profile-modal-content">
            <div className="profile-avatar-lg">AS</div>
            <h3>Aarav Sharma</h3>
            <p>Grade 10-B • Roll No. 24 • CBSE Board</p>
          </div>
          <div className="profile-details">
            {[["Class","10"],["Section","B"],["Roll No.","24"]].map(([k,v]) => (
              <div className="profile-row" key={k}><span>{k}</span><strong>{v}</strong></div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={() => { closeModal(); clearApiSession(); window.location.reload(); }}><LogOut size={14}/>Sign Out</button>
            <button className="modal-btn-primary" onClick={() => { closeModal(); showToast("✓ Settings opened!"); }}><Settings size={14}/>Settings</button>
          </div>
        </Modal>
      )}

      {backendReady && modal === "leave" && (
        <Modal title="Apply for Leave" onClose={closeModal}>
          <p className="modal-desc">Submit a leave application to your homeroom teacher.</p>
          <label>Leave Date</label>
          <input type="date" className="modal-input" value={leaveDate} onChange={e => setLeaveDate(e.target.value)}/>
          <label>Reason for Leave</label>
          <textarea className="modal-textarea" placeholder="Describe the reason..." value={leaveReason} onChange={e => setLeaveReason(e.target.value)}/>
          <div className="modal-actions">
            <button className="modal-btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="modal-btn-primary" onClick={handleLeaveSubmit}><Send size={14}/>Submit Application</button>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)}/>}
    </div>
  );
}
