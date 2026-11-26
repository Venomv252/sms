import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from "react-leaflet";
import L from "leaflet";
import {
  Navigation,
  MapPin,
  Clock,
  Activity,
  Play,
  Square,
  RefreshCw,
  Maximize2,
  Users,
  Bus as BusIcon,
} from "lucide-react";
import { apiGet, apiPost } from "../../../api.js";
import { useTracking } from "../../../context/TrackingContext.jsx";
import TrackingToast from "../../../components/TrackingToast.jsx";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom bus icon
const busIcon = L.divIcon({
  className: "",
  html: `<div style="background:#dc2626;width:36px;height:36px;border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(220,38,38,0.6);display:flex;align-items:center;justify-content:center;font-size:20px;">🚌</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

// Bus stop icon
const stopIcon = L.divIcon({
  className: "",
  html: `<div style="background:#7c3aed;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(124,58,237,0.5);display:flex;align-items:center;justify-content:center;font-size:14px;">🏫</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function LiveTracking({ setError, setMessage }) {
  const [activeTrips, setActiveTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [tripDetails, setTripDetails] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default: Bangalore
  const [mapZoom, setMapZoom] = useState(13);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { busLocations, watchTrip, connected, activateTracking, deactivateTracking } = useTracking();
  const refreshIntervalRef = useRef(null);

  // Activate tracking when component mounts, deactivate when unmounts
  useEffect(() => {
    console.log('LiveTracking: Activating GPS tracking');
    activateTracking();

    return () => {
      console.log('LiveTracking: Deactivating GPS tracking');
      deactivateTracking();
    };
  }, [activateTracking, deactivateTracking]);

  // Load tracking data
  const loadTrackingData = async () => {
    try {
      const [tripsRes, statsRes] = await Promise.all([
        apiGet("/principal/tracking/active-trips"),
        apiGet("/principal/tracking/stats"),
      ]);

      setActiveTrips(tripsRes.trips || []);
      setStats(statsRes);

      // Subscribe to all active trips via WebSocket
      tripsRes.trips?.forEach((trip) => {
        watchTrip(trip.id);
      });

      // Center map on first bus if available
      if (tripsRes.trips?.length > 0 && tripsRes.trips[0].currentLatitude) {
        setMapCenter([
          tripsRes.trips[0].currentLatitude,
          tripsRes.trips[0].currentLongitude,
        ]);
      }
    } catch (err) {
      setError(err.message || "Failed to load tracking data");
    } finally {
      setLoading(false);
    }
  };

  // Load trip details with GPS history
  const loadTripDetails = async (tripId) => {
    try {
      const res = await apiGet(`/principal/tracking/trip/${tripId}`);
      setTripDetails(res.trip);
      
      // Center map on selected trip
      if (res.trip.currentLatitude) {
        setMapCenter([res.trip.currentLatitude, res.trip.currentLongitude]);
        setMapZoom(15);
      }
    } catch (err) {
      setError(err.message || "Failed to load trip details");
    }
  };

  // Start a new trip
  const handleStartTrip = async (busId, routeName) => {
    try {
      await apiPost("/principal/tracking/start-trip", {
        busId,
        routeName,
      });
      setMessage("Trip started successfully");
      loadTrackingData();
    } catch (err) {
      setError(err.message || "Failed to start trip");
    }
  };

  // End a trip
  const handleEndTrip = async (tripId) => {
    try {
      await apiPost(`/principal/tracking/end-trip/${tripId}`, {
        remarks: "Trip completed by principal",
      });
      setMessage("Trip ended successfully");
      setSelectedTrip(null);
      setTripDetails(null);
      loadTrackingData();
    } catch (err) {
      setError(err.message || "Failed to end trip");
    }
  };

  // Initial load
  useEffect(() => {
    loadTrackingData();
  }, []);

  // Auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        loadTrackingData();
      }, 15000); // Refresh every 15 seconds
    } else {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [autoRefresh]);

  // Load trip details when selected
  useEffect(() => {
    if (selectedTrip) {
      loadTripDetails(selectedTrip);
    } else {
      setTripDetails(null);
    }
  }, [selectedTrip]);

  if (loading) {
    return <div className="superadmin-loading">Loading live tracking...</div>;
  }

  // Merge API data with live WebSocket location updates
  const tripsWithLiveLocation = activeTrips.map((trip) => {
    const liveLocation = busLocations[trip.id];
    return {
      ...trip,
      currentLatitude: liveLocation?.latitude || trip.currentLatitude,
      currentLongitude: liveLocation?.longitude || trip.currentLongitude,
      lastLocationUpdate: liveLocation?.timestamp || trip.lastLocationUpdate,
      isLive: !!liveLocation,
    };
  });

  return (
    <>
      <TrackingToast />
      
      <section className="platform-page-intro">
        <div>
          <h2>🗺️ Live GPS Tracking</h2>
          <p>
            Real-time bus location monitoring with WebSocket updates. Track all active trips and monitor fleet movement.
          </p>
        </div>
        <div className="role-action-group">
          <button
            onClick={() => loadTrackingData()}
            className="role-action-button"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </section>

      {/* Stats Overview */}
      {stats && (
        <section className="superadmin-overview superadmin-kpis">
          <article>
            <Activity />
            <span>Active Trips</span>
            <strong>{stats.activeTrips}</strong>
            <small>Buses in motion</small>
          </article>

          <article>
            <BusIcon />
            <span>Total Fleet</span>
            <strong>{stats.totalBuses}</strong>
            <small>Available buses</small>
          </article>

          <article>
            <MapPin />
            <span>Today's Trips</span>
            <strong>{stats.todayTrips}</strong>
            <small>Completed + Active</small>
          </article>

          <article className={connected ? "status-connected" : "status-disconnected"}>
            <Navigation />
            <span>WebSocket</span>
            <strong>{connected ? "Connected" : "Disconnected"}</strong>
            <small>Live updates {connected ? "active" : "inactive"}</small>
          </article>
        </section>
      )}

      <div className="platform-overview-grid">
        {/* Live Map */}
        <section className="platform-panel live-tracking-map-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <Navigation size={19} /> Live Map View
              </h2>
              <p>Real-time bus locations with WebSocket streaming</p>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto-refresh
              </label>
            </div>
          </div>

          <div className="live-tracking-map-container">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%", minHeight: "500px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Active buses */}
              {tripsWithLiveLocation
                .filter((trip) => trip.currentLatitude && trip.currentLongitude)
                .map((trip) => (
                  <Marker
                    key={trip.id}
                    position={[trip.currentLatitude, trip.currentLongitude]}
                    icon={busIcon}
                    eventHandlers={{
                      click: () => setSelectedTrip(trip.id),
                    }}
                  >
                    <Popup>
                      <div style={{ padding: "4px" }}>
                        <strong style={{ fontSize: "14px" }}>
                          🚌 {trip.busNumber}
                        </strong>
                        <br />
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          {trip.routeName}
                        </span>
                        <br />
                        {trip.isLive && (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#16a36a",
                              fontWeight: "600",
                            }}
                          >
                            ● LIVE
                          </span>
                        )}
                        <br />
                        <span style={{ fontSize: "11px", color: "#999" }}>
                          Last update:{" "}
                          {new Date(trip.lastLocationUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {/* GPS History Trail for selected trip */}
              {tripDetails?.locationHistory && tripDetails.locationHistory.length > 1 && (
                <Polyline
                  positions={tripDetails.locationHistory.map((loc) => [
                    loc.latitude,
                    loc.longitude,
                  ])}
                  color="#7c3aed"
                  weight={3}
                  opacity={0.6}
                  dashArray="10, 10"
                />
              )}
            </MapContainer>
          </div>

          {tripsWithLiveLocation.length === 0 && (
            <div className="superadmin-empty" style={{ padding: "40px" }}>
              <MapPin size={32} style={{ color: "#d1d5db", marginBottom: "8px" }} />
              <p>No active trips to display</p>
              <small>Start a trip to see live tracking</small>
            </div>
          )}
        </section>

        {/* Active Trips List */}
        <section className="platform-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <Activity size={19} /> Active Trips
              </h2>
              <p>{tripsWithLiveLocation.length} buses in motion</p>
            </div>
          </div>

          {tripsWithLiveLocation.length === 0 ? (
            <div className="superadmin-empty">
              <p>No active trips</p>
            </div>
          ) : (
            <div className="live-tracking-trips-list">
              {tripsWithLiveLocation.map((trip) => (
                <div
                  key={trip.id}
                  className={`live-tracking-trip-card ${selectedTrip === trip.id ? "selected" : ""}`}
                  onClick={() => setSelectedTrip(selectedTrip === trip.id ? null : trip.id)}
                >
                  <div className="live-tracking-trip-header">
                    <div className="live-tracking-trip-icon">🚌</div>
                    <div className="live-tracking-trip-info">
                      <strong>{trip.busNumber}</strong>
                      <span>{trip.routeName}</span>
                    </div>
                    {trip.isLive && (
                      <span className="live-tracking-badge live">● LIVE</span>
                    )}
                  </div>

                  <div className="live-tracking-trip-meta">
                    <div className="live-tracking-trip-meta-item">
                      <Clock size={14} />
                      <span>Started: {new Date(trip.startTime).toLocaleTimeString()}</span>
                    </div>
                    {trip.lastLocationUpdate && (
                      <div className="live-tracking-trip-meta-item">
                        <MapPin size={14} />
                        <span>
                          Updated: {new Date(trip.lastLocationUpdate).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedTrip === trip.id && (
                    <div className="live-tracking-trip-actions">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              `End trip for bus ${trip.busNumber}?`
                            )
                          ) {
                            handleEndTrip(trip.id);
                          }
                        }}
                        className="role-action-button role-action-button-danger"
                      >
                        <Square size={16} />
                        End Trip
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Trip Details Panel */}
      {tripDetails && (
        <section className="platform-panel">
          <div className="superadmin-section-title">
            <div>
              <h2>
                <MapPin size={19} /> Trip Details - {tripDetails.busNumber}
              </h2>
              <p>GPS tracking history and route information</p>
            </div>
            <button
              onClick={() => {
                setSelectedTrip(null);
                setTripDetails(null);
              }}
              className="role-action-button"
            >
              Close
            </button>
          </div>

          <div className="principal-metrics-grid">
            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <BusIcon size={20} />
              </div>
              <div>
                <span>Bus Number</span>
                <strong>{tripDetails.busNumber}</strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <MapPin size={20} />
              </div>
              <div>
                <span>Route Name</span>
                <strong>{tripDetails.routeName}</strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <Clock size={20} />
              </div>
              <div>
                <span>Started At</span>
                <strong>
                  {new Date(tripDetails.startTime).toLocaleTimeString()}
                </strong>
              </div>
            </div>

            <div className="principal-metric-card">
              <div className="principal-metric-icon">
                <Activity size={20} />
              </div>
              <div>
                <span>GPS Points</span>
                <strong>{tripDetails.locationHistory?.length || 0}</strong>
              </div>
            </div>
          </div>

          {tripDetails.currentLatitude && (
            <div style={{ marginTop: "16px", padding: "12px", background: "#f9fafb", borderRadius: "8px" }}>
              <div style={{ fontSize: "13px", color: "#6b7280" }}>
                <strong>Current Position:</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
                Latitude: {tripDetails.currentLatitude.toFixed(6)}, Longitude:{" "}
                {tripDetails.currentLongitude.toFixed(6)}
              </div>
              <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
                Last updated:{" "}
                {new Date(tripDetails.lastLocationUpdate).toLocaleString()}
              </div>
            </div>
          )}
        </section>
      )}

      <style>{`
        .live-tracking-map-panel {
          grid-column: span 2;
        }

        .live-tracking-map-container {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        .live-tracking-trips-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .live-tracking-trip-card {
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          background: white;
        }

        .live-tracking-trip-card:hover {
          border-color: #16a36a;
          box-shadow: 0 2px 8px rgba(22, 163, 106, 0.1);
        }

        .live-tracking-trip-card.selected {
          border-color: #16a36a;
          background: #f0fdf4;
        }

        .live-tracking-trip-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .live-tracking-trip-icon {
          font-size: 24px;
          line-height: 1;
        }

        .live-tracking-trip-info {
          flex: 1;
          min-width: 0;
        }

        .live-tracking-trip-info strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }

        .live-tracking-trip-info span {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .live-tracking-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
        }

        .live-tracking-badge.live {
          background: #dcfce7;
          color: #16a34a;
        }

        .live-tracking-trip-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .live-tracking-trip-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
        }

        .live-tracking-trip-meta-item svg {
          flex-shrink: 0;
        }

        .live-tracking-trip-actions {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        .status-connected {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        }

        .status-disconnected {
          background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        }

        @media (max-width: 1024px) {
          .live-tracking-map-panel {
            grid-column: span 1;
          }
        }
      `}</style>
    </>
  );
}
