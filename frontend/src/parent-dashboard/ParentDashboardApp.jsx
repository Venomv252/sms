import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AttendanceTracker from './pages/AttendanceTracker.jsx'
import Performance from './pages/Performance.jsx'
import HomeworkAssignments from './pages/HomeworkAssignments.jsx'
import ExamDatesheet from './pages/ExamDatesheet.jsx'
import ResultsReportCards from './pages/ResultsReportCards.jsx'
import PTMScheduler from './pages/PTMScheduler.jsx'
import TeacherRemarks from './pages/TeacherRemarks.jsx'
import QueryHelpdesk from './pages/QueryHelpdesk.jsx'
import ParentMgmtComms from './pages/ParentMgmtComms.jsx'
import NoticeBoardCirculars from './pages/NoticeBoardCirculars.jsx'
import ClassAnnouncements from './pages/ClassAnnouncements.jsx'
import SchoolTimings from './pages/SchoolTimings.jsx'
import ChildDailyPulse from './pages/ChildDailyPulse.jsx'
import SyllabusProgress from './pages/SyllabusProgress.jsx'
import FeePayment from './pages/FeePayment.jsx'
import CommuteBus from './pages/CommuteBus.jsx'
import FamilyProfile from './pages/FamilyProfile.jsx'
import TimetableCalendar from './pages/TimetableCalendar.jsx'

export default function App() {
  return (
    <div className="parent-dashboard-root">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="child-daily-pulse" element={<ChildDailyPulse />} />
          <Route path="school-timings" element={<SchoolTimings />} />
          <Route path="attendance" element={<AttendanceTracker />} />
          <Route path="performance" element={<Performance />} />
          <Route path="homework" element={<HomeworkAssignments />} />
          <Route path="syllabus" element={<SyllabusProgress />} />
          <Route path="timetable" element={<TimetableCalendar />} />
          <Route path="exam-datesheet" element={<ExamDatesheet />} />
          <Route path="results" element={<ResultsReportCards />} />
          <Route path="ptm-scheduler" element={<PTMScheduler />} />
          <Route path="teacher-remarks" element={<TeacherRemarks />} />
          <Route path="query-helpdesk" element={<QueryHelpdesk />} />
          <Route path="parent-management" element={<ParentMgmtComms />} />
          <Route path="notice-board" element={<NoticeBoardCirculars />} />
          <Route path="class-announcements" element={<ClassAnnouncements />} />
          <Route path="fee-payment" element={<FeePayment />} />
          <Route path="commute-bus" element={<CommuteBus />} />
          <Route path="family-profile" element={<FamilyProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
