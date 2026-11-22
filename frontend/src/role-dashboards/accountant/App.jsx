import "./index.css";
import React, { useState } from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import BursarCockpit from './pages/BursarCockpit.jsx';
import FeeCollection from './pages/FeeCollection.jsx';
import DefaulterRecovery from './pages/DefaulterRecovery.jsx';
import Payroll from './pages/Payroll.jsx';
import VendorAP from './pages/VendorAP.jsx';
import PettyCash from './pages/PettyCash.jsx';
import BankReconciliation from './pages/BankReconciliation.jsx';
import StatutoryTaxes from './pages/StatutoryTaxes.jsx';
import FinancialStatements from './pages/FinancialStatements.jsx';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MemoryRouter>
      <div className="app-layout">
        <TopBar onMenuToggle={() => setSidebarOpen(o => !o)} />
        <div className="main-content">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<BursarCockpit />} />
              <Route path="/fee-collection" element={<FeeCollection />} />
              <Route path="/defaulter-recovery" element={<DefaulterRecovery />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/vendor-ap" element={<VendorAP />} />
              <Route path="/petty-cash" element={<PettyCash />} />
              <Route path="/bank-reconciliation" element={<BankReconciliation />} />
              <Route path="/statutory-taxes" element={<StatutoryTaxes />} />
              <Route path="/financial-statements" element={<FinancialStatements />} />
            </Routes>
          </main>
        </div>
      </div>
    </MemoryRouter>
  );
}
