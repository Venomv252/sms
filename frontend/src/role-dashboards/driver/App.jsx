import "./index.css";
import React from 'react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DriverCockpit from './pages/DriverCockpit'
import RouteWaypoints from './pages/RouteWaypoints'
import StudentRoster from './pages/StudentRoster'
import FleetProximity from './pages/FleetProximity'
import Breakdown from './pages/Breakdown'
import FuelExpense from './pages/FuelExpense'
import Incidents from './pages/Incidents'
import EmergencyHotlines from './pages/EmergencyHotlines'

export default function App() {
  return (
    <MemoryRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DriverCockpit />} />
          <Route path="/route-waypoints" element={<RouteWaypoints />} />
          <Route path="/student-roster" element={<StudentRoster />} />
          <Route path="/fleet-proximity" element={<FleetProximity />} />
          <Route path="/breakdown" element={<Breakdown />} />
          <Route path="/fuel-expense" element={<FuelExpense />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/emergency-hotlines" element={<EmergencyHotlines />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  )
}
