import "./index.css";
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import BottomNav from './components/BottomNav';
import ManagementCockpit from './pages/ManagementCockpit';
import ExecutiveSummary from './pages/ExecutiveSummary';
import StudentRegistry from './pages/StudentRegistry';
import FeesDefaulters from './pages/FeesDefaulters';
import ResultsMarks from './pages/ResultsMarks';
import TCCertificates from './pages/TCCertificates';
import Timetable from './pages/Timetable';
import FacultyTeachers from './pages/FacultyTeachers';
import SupportStaff from './pages/SupportStaff';
import PayrollSalary from './pages/PayrollSalary';
import FeeCollection from './pages/FeeCollection';
import BillsExpenditure from './pages/BillsExpenditure';
import FinancialReports from './pages/FinancialReports';
import UniformsInventory from './pages/UniformsInventory';
import TransportFleet from './pages/TransportFleet';
import MedicalInfirmary from './pages/MedicalInfirmary';
import EmergencyServices from './pages/EmergencyServices';
import ParentInquiries from './pages/ParentInquiries';

function AppLayout() {
  return (
    <div className="layout">
      {/* Desktop sidebar — hidden on mobile via CSS */}
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <main className="page-content">
          <Routes>
            <Route path="/"                  element={<ManagementCockpit />} />
            <Route path="/executive-summary" element={<ExecutiveSummary />} />
            <Route path="/students"          element={<StudentRegistry />} />
            <Route path="/fees"              element={<FeesDefaulters />} />
            <Route path="/results"           element={<ResultsMarks />} />
            <Route path="/certificates"      element={<TCCertificates />} />
            <Route path="/timetable"         element={<Timetable />} />
            <Route path="/faculty"           element={<FacultyTeachers />} />
            <Route path="/support-staff"     element={<SupportStaff />} />
            <Route path="/payroll"           element={<PayrollSalary />} />
            <Route path="/fee-collection"    element={<FeeCollection />} />
            <Route path="/bills"             element={<BillsExpenditure />} />
            <Route path="/financial-reports" element={<FinancialReports />} />
            <Route path="/inventory"         element={<UniformsInventory />} />
            <Route path="/transport"         element={<TransportFleet />} />
            <Route path="/medical"           element={<MedicalInfirmary />} />
            <Route path="/emergency"         element={<EmergencyServices />} />
            <Route path="/parent-inquiries"  element={<ParentInquiries />} />
          </Routes>
        </main>

        {/* Mobile bottom navigation — hidden on desktop via CSS */}
        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MemoryRouter>
      <AppLayout />
    </MemoryRouter>
  );
}
