import React, { useEffect, useState } from "react";
import { Bus, MapPin, Clock, AlertTriangle, TrendingUp } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function Transport({ setError, setMessage }) {
  const [buses, setBuses] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("buses");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const loadBuses = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await apiGet("/principal/transport/buses");
      setBuses(data || []);
    } catch (err) {
      setError(err.message || "Unable to load buses");
    } finally {
      setLoading(false);
    }
  };

  const loadTrips = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        ...(statusFilter && { status: statusFilter }),
      });

      const data = await apiGet(`/principal/transport/trips?${params}`);
      setTrips(data.trips || []);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message || "Unable to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "buses") {
      loadBuses();
    } else {
      loadTrips();
    }
  }, [view, page, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "status-progress";
      case "COMPLETED":
        return "status-resolved";
      case "DELAYED":
        return "status-rejected";
      case "CANCELLED":
        return "status-submitted";
      default:
        return "status-submitted";
    }
  };

  const activeBusCount = buses.filter(b => b.isActive).length;
  const inProgressTrips = trips.filter(t => t.status === "IN_PROGRESS").length;

  return (
    <>
      <section className="platform-page-intro">
        <div>
          <h2>Transport Management</h2>
          <p>
            Monitor school buses, track active trips, and review transport operations.
          </p>
        </div>
      </section>

      <section className="superadmin-overview superadmin-kpis">
        <article>
          <Bus />
          <span>Total Buses</span>
          <strong>{buses.length}</strong>
          <small>Registered vehicles</small>
        </article>

        <article>
          <TrendingUp />
          <span>Active Buses</span>
          <strong className="text-success">{activeBusCount}</strong>
          <small>Currently operational</small>
        </article>

        <article>
          <Clock />
          <span>Trips Today</span>
          <strong>{trips.length}</strong>
          <small>Total trip records</small>
        </article>

        <article>
          <MapPin />
          <span>In Progress</span>
          <strong className="text-warning">{inProgressTrips}</strong>
          <small>Active trips</small>
        </article>
      </section>

      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2>
              <Bus size={19} /> {view === "buses" ? "School Buses" : "Trip History"}
            </h2>
            <p>
              {view === "buses" 
                ? "View all school buses and their current status"
                : "Track completed and active trips"}
            </p>
          </div>
        </div>

        <div className="principal-leave-filters">
          <button
            className={view === "buses" ? "active" : ""}
            onClick={() => { setView("buses"); setPage(1); }}
          >
            <Bus size={14} /> Buses
          </button>
          <button
            className={view === "trips" ? "active" : ""}
            onClick={() => { setView("trips"); setPage(1); }}
          >
            <MapPin size={14} /> Trips
          </button>
        </div>

        {view === "trips" && (
          <div className="principal-search-filters" style={{ marginTop: "16px" }}>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="DELAYED">Delayed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        )}

        {loading && <div className="superadmin-loading">Loading transport data...</div>}

        {!loading && view === "buses" && buses.length > 0 && (
          <div className="principal-transport-grid">
            {buses.map((bus) => (
              <div className="principal-transport-card" key={bus.id}>
                <div className="principal-transport-header">
                  <div className="principal-bus-icon">
                    <Bus size={20} />
                  </div>
                  <div>
                    <strong>{bus.busNumber}</strong>
                    <small>{bus.registrationNumber}</small>
                  </div>
                  <span className={`principal-bus-status ${bus.isActive ? "active" : "inactive"}`}>
                    {bus.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="principal-transport-details">
                  <div>
                    <span>Capacity</span>
                    <strong>{bus.capacity} seats</strong>
                  </div>
                  {bus.insuranceExpiry && (
                    <div>
                      <span>Insurance Expiry</span>
                      <strong className={
                        new Date(bus.insuranceExpiry) < new Date() 
                          ? "text-danger" 
                          : new Date(bus.insuranceExpiry) < new Date(Date.now() + 30*24*60*60*1000)
                            ? "text-warning"
                            : ""
                      }>
                        {new Date(bus.insuranceExpiry).toLocaleDateString("en-IN")}
                      </strong>
                    </div>
                  )}
                  {bus.fitnessExpiry && (
                    <div>
                      <span>Fitness Expiry</span>
                      <strong className={
                        new Date(bus.fitnessExpiry) < new Date() 
                          ? "text-danger" 
                          : new Date(bus.fitnessExpiry) < new Date(Date.now() + 30*24*60*60*1000)
                            ? "text-warning"
                            : ""
                      }>
                        {new Date(bus.fitnessExpiry).toLocaleDateString("en-IN")}
                      </strong>
                    </div>
                  )}
                </div>

                {bus.currentTrip && (
                  <div className="principal-current-trip">
                    <MapPin size={14} />
                    <div>
                      <span>Current Trip</span>
                      <strong>{bus.currentTrip.routeName}</strong>
                      <small className={`principal-trip-status ${getStatusColor(bus.currentTrip.status)}`}>
                        {bus.currentTrip.status}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && view === "trips" && trips.length > 0 && (
          <div className="platform-stat-table">
            <div className="platform-stat-row heading">
              <span>Bus</span>
              <span>Route</span>
              <span>Start Time</span>
              <span>End Time</span>
              <span>Status</span>
            </div>

            {trips.map((trip) => (
              <div className="platform-stat-row" key={trip.id}>
                <span>
                  <strong>{trip.busNumber}</strong>
                  <small>{trip.registrationNumber}</small>
                </span>
                <b>{trip.routeName}</b>
                <span>
                  <small>{new Date(trip.startTime).toLocaleString("en-IN")}</small>
                </span>
                <span>
                  <small>{trip.endTime ? new Date(trip.endTime).toLocaleString("en-IN") : "—"}</small>
                </span>
                <span className={`principal-trip-status ${getStatusColor(trip.status)}`}>
                  {trip.delayMinutes ? `${trip.status} (${trip.delayMinutes} min delay)` : trip.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {!loading && buses.length === 0 && view === "buses" && (
          <div className="superadmin-empty">
            No buses registered for this school yet.
          </div>
        )}

        {!loading && trips.length === 0 && view === "trips" && (
          <div className="superadmin-empty">
            No trip records found for the selected filter.
          </div>
        )}

        {view === "trips" && pagination && pagination.totalPages > 1 && (
          <div className="principal-pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>Page {page} of {pagination.totalPages}</span>
            <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
