import "./index-scoped.css";
import { useState } from 'react'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import PrincipalCockpit from './pages/PrincipalCockpit'
import AcademicCBSE from './pages/AcademicCBSE'
import FacultyAttendance from './pages/FacultyAttendance'
import StudentWelfare from './pages/StudentWelfare'
import DisciplinePastoral from './pages/DisciplinePastoral'
import TimetableProxy from './pages/TimetableProxy'
import ParentEscalations from './pages/ParentEscalations'
import SafetyInfirmary from './pages/SafetyInfirmary'
import ApprovalsLeaves from './pages/ApprovalsLeaves'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <MemoryRouter>
      <div className="principal-dashboard app-layout">
        {/* Mobile overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />
        {/* Mobile toggle */}
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-area">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/cockpit" replace />} />
              <Route path="/cockpit" element={<PrincipalCockpit />} />
              <Route path="/academic" element={<AcademicCBSE />} />
              <Route path="/faculty" element={<FacultyAttendance />} />
              <Route path="/welfare" element={<StudentWelfare />} />
              <Route path="/discipline" element={<DisciplinePastoral />} />
              <Route path="/timetable" element={<TimetableProxy />} />
              <Route path="/escalations" element={<ParentEscalations />} />
              <Route path="/safety" element={<SafetyInfirmary />} />
              <Route path="/approvals" element={<ApprovalsLeaves />} />
            </Routes>
          </div>
        </div>
      </div>
    </MemoryRouter>
  )
}

export default App
