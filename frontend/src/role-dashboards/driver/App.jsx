
import React from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Layout from "./components/Layout";
import DriverCockpit from "./pages/DriverCockpit";
import TripEnd from "./pages/TripEnd";
import RouteWaypoints from "./pages/RouteWaypoints";
import StudentRoster from "./pages/StudentRoster";
import FleetProximity from "./pages/FleetProximity";
import Breakdown from "./pages/Breakdown";
import FuelExpense from "./pages/FuelExpense";
import Incidents from "./pages/Incidents";
import EmergencyHotlines from "./pages/EmergencyHotlines";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Main Driver Dashboard */}
        <Route index element={<DriverCockpit />} />

        {/* Trip Management */}
        <Route
          path="trip-end/:tripId"
          element={<TripEnd />}
        />

        {/* Transport Management */}
        <Route
          path="route-waypoints"
          element={<RouteWaypoints />}
        />

        <Route
          path="student-roster"
          element={<StudentRoster />}
        />

        <Route
          path="fleet-proximity"
          element={<FleetProximity />}
        />

        {/* Vehicle Management */}
        <Route
          path="breakdown"
          element={<Breakdown />}
        />

        <Route
          path="fuel-expense"
          element={<FuelExpense />}
        />

        {/* Safety and Emergency */}
        <Route
          path="incidents"
          element={<Incidents />}
        />

        <Route
          path="emergency-hotlines"
          element={<EmergencyHotlines />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<DriverCockpit />}
        />
      </Routes>
    </Layout>
  );
}
