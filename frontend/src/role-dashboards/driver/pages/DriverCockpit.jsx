import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, MapPin, AlertTriangle, RefreshCw, Play, Square,
  CheckCircle, Clock, Fuel, Wrench, AlertCircle
} from 'lucide-react';
import { apiGet, apiPost } from '../../../api.js';
import { useGPSTracking } from '../hooks/useGPSTracking.js';
import GPSStatusIndicator from '../components/GPSStatusIndicator.jsx';
import './DriverCockpit.css';

export default function DriverCockpit() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showStartModal, setShowStartModal] = useState(false);
  const [startingTrip, setStartingTrip] = useState(false);

  // GPS tracking
  const activeTrip = dashboardData?.activeTrip || null;
  const { gpsStatus, gpsError, currentLocation, lastUpdate } = useGPSTracking(activeTrip);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    setError('');

    try {
      const [dashData, profileData] = await Promise.all([
        apiGet('/driver/dashboard'),
        apiGet('/driver/profile'),
      ]);

      setDashboardData(dashData.data);
      setProfile(profileData.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTrip = async () => {
    if (!profile?.assignedRoute) {
      setError('No route assigned');
      return;
    }

    setStartingTrip(true);
    setError('');

    try {
      await apiPost('/driver/trips/start', {
        routeName: profile.assignedRoute.routeName,
      });

      setShowStartModal(false);
      await loadDashboard();
    } catch (err) {
      setError(err.message || 'Failed to start trip');
    } finally {
      setStartingTrip(false);
    }
  };

  const handleEndTrip = () => {
    if (dashboardData?.activeTrip?.id) {
      navigate(`/trip-end/${dashboardData.activeTrip.id}`);
    }
  };

  if (loading) {
    return (
      <div className="cockpit">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="cockpit">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <AlertTriangle size={24} style={{ color: 'var(--red-alert)', margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-700)', marginBottom: '12px' }}>{error}</div>
          <button className="btn btn-primary" onClick={loadDashboard}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No assignment
  if (!dashboardData?.hasAssignment) {
    return (
      <div className="cockpit">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: 'var(--orange)', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>No Route Assigned</h2>
          <p style={{ color: 'var(--gray-600)', marginBottom: '16px' }}>
            {dashboardData?.message || 'Please contact administration to get a route assignment.'}
          </p>
        </div>
      </div>
    );
  }

  const stats = dashboardData.todayStats || {};
  const activeTrip = dashboardData.activeTrip;
  const driverInfo = profile?.driver || {};
  const assignedBus = profile?.assignedBus || {};
  const assignedRoute = profile?.assignedRoute || {};

  return (
    <div className="cockpit">
      {/* Error Banner */}
      {error && (
        <div className="card" style={{
          padding: '12px 16px',
          background: '#fff5f5',
          border: '1px solid #fc8181',
          borderLeft: '4px solid var(--red-alert)',
          marginBottom: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#c53030' }}>
            <AlertTriangle size={16} />
            <span>{error}</span>
            <button
              onClick={() => setError('')}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Driver Info Card */}
      <div className="driver-banner card">
        <div className="banner-left">
          <div className="driver-avatar lg">
            {driverInfo.name?.charAt(0) || 'D'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold" style={{ fontSize: 16 }}>{driverInfo.name || 'Driver'}</span>
              <span className="badge badge-green">{driverInfo.employeeId || 'N/A'}</span>
            </div>
            <div className="text-sm" style={{ color: 'var(--gray-500)', marginTop: 2 }}>
              {assignedRoute.routeName || 'No route assigned'}
            </div>
            {driverInfo.phoneNumber && (
              <div className="text-xs" style={{ color: 'var(--gray-500)', marginTop: 4 }}>
                📞 {driverInfo.phoneNumber}
              </div>
            )}
          </div>
        </div>

        <div className="banner-metrics">
          <div className="metric-item">
            <span className="metric-label">BUS</span>
            <span className="metric-value" style={{ fontSize: '18px' }}>
              {assignedBus.busNumber || 'N/A'}
            </span>
            <span className="metric-sub">{assignedBus.registrationNumber || ''}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">ROUTE</span>
            <span className="metric-value" style={{ fontSize: '18px' }}>
              {assignedRoute.routeNumber || 'N/A'}
            </span>
            <span className="metric-sub">{assignedRoute.pickupPoints?.length || 0} stops</span>
          </div>
          {assignedRoute.distance && (
            <div className="metric-item">
              <span className="metric-label">DISTANCE</span>
              <span className="metric-value" style={{ fontSize: '18px' }}>
                {assignedRoute.distance} km
              </span>
              <span className="metric-sub">{assignedRoute.duration || '—'} min</span>
            </div>
          )}
        </div>

        <div className="banner-clock">
          <div className="clock-time">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</div>
          <div className="text-xs" style={{ color: 'var(--gray-500)', textAlign: 'center', marginTop: '4px' }}>
            {activeTrip ? 'Trip in progress' : 'Ready to start'}
          </div>
          {activeTrip && (
            <div style={{ marginTop: '8px' }}>
              <GPSStatusIndicator 
                gpsStatus={gpsStatus} 
                gpsError={gpsError} 
                lastUpdate={lastUpdate}
                compact={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Trip Control */}
      <div className="card" style={{ padding: '16px', background: activeTrip ? '#e6f4f0' : '#f9fafb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: activeTrip ? '12px' : '0' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
              {activeTrip ? (
                <>
                  <span style={{ color: 'var(--green-primary)' }}>● Active Trip</span>
                  <span style={{ color: 'var(--gray-500)', marginLeft: '8px', fontSize: '12px' }}>
                    Started {new Date(activeTrip.startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              ) : (
                <span style={{ color: 'var(--gray-600)' }}>No Active Trip</span>
              )}
            </div>
            {activeTrip && (
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                {activeTrip.routeName}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {activeTrip ? (
              <>
                <button className="btn btn-outline btn-sm" onClick={() => navigate('/route-waypoints')}>
                  <MapPin size={14} /> View Route
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleEndTrip}>
                  <Square size={14} /> End Trip
                </button>
              </>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={() => setShowStartModal(true)}>
                <Play size={14} /> Start Trip
              </button>
            )}
          </div>
        </div>
        {activeTrip && (
          <GPSStatusIndicator 
            gpsStatus={gpsStatus} 
            gpsError={gpsError} 
            lastUpdate={lastUpdate}
          />
        )}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Assigned Students</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="stat-value">{stats.assignedStudents || 0}</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--gray-400)', marginTop: 2 }}>
            Total on route
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Picked Up Today</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="stat-value stat-green">{stats.pickedUpStudents || 0}</span>
            <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
              / {stats.assignedStudents || 0}
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--gray-400)', marginTop: 2 }}>
            {stats.remainingStudents || 0} remaining
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Completed Trips</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="stat-value">{stats.completedTrips || 0}</span>
            <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
              / {stats.totalTrips || 0} scheduled
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--gray-400)', marginTop: 2 }}>
            Today's trips
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Dropped Off Today</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="stat-value">{stats.droppedOffStudents || 0}</span>
            <span className="text-sm" style={{ color: 'var(--gray-500)' }}>
              students
            </span>
          </div>
          <div className="text-xs" style={{ color: 'var(--gray-400)', marginTop: 2 }}>
            Safe delivery
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/student-roster')}
          >
            <Users size={16} /> Student Roster
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/route-waypoints')}
          >
            <MapPin size={16} /> Route & Waypoints
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/fuel-expense')}
          >
            <Fuel size={16} /> Submit Fuel Expense
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/breakdown')}
          >
            <Wrench size={16} /> Report Breakdown
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/incidents')}
          >
            <AlertTriangle size={16} /> Report Incident
          </button>
          <button
            className="btn btn-outline w-full"
            onClick={() => navigate('/fleet-proximity')}
          >
            <MapPin size={16} /> Fleet Proximity
          </button>
        </div>
      </div>

      {/* Route Info */}
      {assignedRoute.pickupPoints && assignedRoute.pickupPoints.length > 0 && (
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div>
              <div className="section-title">{assignedRoute.routeName}</div>
              <div className="section-subtitle">
                {assignedRoute.pickupPoints.length} pickup points • {assignedRoute.totalStudents || 0} students
              </div>
            </div>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('/route-waypoints')}>
              View Full Route
            </button>
          </div>
          <div style={{ display: 'grid', gap: '8px' }}>
            {assignedRoute.pickupPoints.slice(0, 5).map((point, idx) => (
              <div
                key={point.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: 'var(--gray-50)',
                  borderRadius: '7px'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--green-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gray-900)' }}>
                    {point.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '2px' }}>
                    {point.address || 'No address'}
                  </div>
                </div>
                {point.estimatedTime && (
                  <div style={{ fontSize: '11px', color: 'var(--gray-600)', fontWeight: '600', flexShrink: 0 }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {point.estimatedTime}
                  </div>
                )}
              </div>
            ))}
            {assignedRoute.pickupPoints.length > 5 && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/route-waypoints')}
                style={{ marginTop: '4px' }}
              >
                Show {assignedRoute.pickupPoints.length - 5} more stops
              </button>
            )}
          </div>
        </div>
      )}

      {/* Start Trip Modal */}
      {showStartModal && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowStartModal(false);
          }}
        >
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Start New Trip</h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: '16px', fontSize: '13px' }}>
              Are you ready to start a trip on <strong>{assignedRoute.routeName}</strong>?
            </p>
            <div style={{ background: 'var(--gray-50)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                <strong>Bus:</strong> {assignedBus.busNumber} ({assignedBus.registrationNumber})
              </div>
              <div style={{ fontSize: '12px', marginBottom: '8px' }}>
                <strong>Route:</strong> {assignedRoute.routeName}
              </div>
              <div style={{ fontSize: '12px' }}>
                <strong>Stops:</strong> {assignedRoute.pickupPoints?.length || 0} pickup points
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button
                className="btn btn-outline"
                onClick={() => setShowStartModal(false)}
                disabled={startingTrip}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleStartTrip}
                disabled={startingTrip}
              >
                {startingTrip ? (
                  <>
                    <RefreshCw size={14} className="spin" /> Starting...
                  </>
                ) : (
                  <>
                    <Play size={14} /> Start Trip
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
