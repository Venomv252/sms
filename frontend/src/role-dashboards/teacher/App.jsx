
import React from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import SyllabusProgress from "./pages/SyllabusProgress";
import Homework from "./pages/Homework";
import StudyMaterial from "./pages/StudyMaterial";
import Results from "./pages/Results";
import Performance from "./pages/Performance";
import Discipline from "./pages/Discipline";
import Remarks from "./pages/Remarks";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import ParentComplaints from "./pages/ParentComplaints";
import Announcements from "./pages/Announcements";
import ManagementComms from "./pages/ManagementComms";
import Circulars from "./pages/Circulars";
import Sports from "./pages/Sports";
import Transit from "./pages/Transit";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Dashboard />} />

        <Route path="profile" element={<Profile />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="homework" element={<Homework />} />
        <Route path="syllabus" element={<SyllabusProgress />} />
        <Route path="study-material" element={<StudyMaterial />} />
        <Route path="results" element={<Results />} />
        <Route path="performance" element={<Performance />} />
        <Route path="remarks" element={<Remarks />} />
        <Route path="discipline" element={<Discipline />} />
        <Route path="sports" element={<Sports />} />
        <Route path="announcements" element={<Announcements />} />
        <Route
          path="parent-complaints"
          element={<ParentComplaints />}
        />
        <Route
          path="management-comms"
          element={<ManagementComms />}
        />
        <Route path="circulars" element={<Circulars />} />
        <Route path="transit" element={<Transit />} />

        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
