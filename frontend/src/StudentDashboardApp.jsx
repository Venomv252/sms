import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Homework from "./pages/Homework.jsx";
import Attendance from "./pages/Attendance.jsx";
import ExamSchedule from "./pages/ExamSchedule.jsx";
import Results from "./pages/Results.jsx";
import Schedule from "./pages/Schedule.jsx";
import Notes from "./pages/Notes.jsx";
import Syllabus from "./pages/Syllabus.jsx";
import DoubtForum from "./pages/DoubtForum.jsx";
import Notices from "./pages/Notices.jsx";
import Sports from "./pages/Sports.jsx";
import Performance from "./pages/Performance.jsx";
import Certificates from "./pages/Certificates.jsx";
import Subjects from "./pages/Subjects.jsx";
import FeeManagement from "./pages/FeeManagement.jsx";
import Transport from "./pages/Transport.jsx";
import { SchoolTiming, Timetable, Announcements, ClassAnnouncements } from "./pages/SimplePages.jsx";
import "./App.css";

function Wrap({ Component }) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<Wrap Component={Dashboard}/>} />
      <Route path="schedule" element={<Wrap Component={Schedule}/>} />
      <Route path="school-timing" element={<Wrap Component={SchoolTiming}/>} />
      <Route path="timetable" element={<Wrap Component={Timetable}/>} />
      <Route path="subjects" element={<Wrap Component={Subjects}/>} />
      <Route path="syllabus" element={<Wrap Component={Syllabus}/>} />
      <Route path="notes" element={<Wrap Component={Notes}/>} />
      <Route path="homework" element={<Wrap Component={Homework}/>} />
      <Route path="doubt-forum" element={<Wrap Component={DoubtForum}/>} />
      <Route path="attendance" element={<Wrap Component={Attendance}/>} />
      <Route path="performance" element={<Wrap Component={Performance}/>} />
      <Route path="exam-schedule" element={<Wrap Component={ExamSchedule}/>} />
      <Route path="results" element={<Wrap Component={Results}/>} />
      <Route path="certificates" element={<Wrap Component={Certificates}/>} />
      <Route path="notices" element={<Wrap Component={Notices}/>} />
      <Route path="announcements" element={<Wrap Component={Announcements}/>} />
      <Route path="class-announcements" element={<Wrap Component={ClassAnnouncements}/>} />
      <Route path="sports" element={<Wrap Component={Sports}/>} />
      <Route path="fee-management" element={<Wrap Component={FeeManagement}/>} />
      <Route path="transport" element={<Wrap Component={Transport}/>} />
      <Route path="*" element={<Wrap Component={Dashboard}/>} />
    </Routes>
  );
}
