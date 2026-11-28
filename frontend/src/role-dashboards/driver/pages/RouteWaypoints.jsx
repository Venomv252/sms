import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navigation, Clock, MapPin, ArrowLeft, RefreshCw, AlertTriangle, Users
} from 'lucide-react';
import { apiGet } from '../../../api.js';
import './RouteWaypoints.css';

export default function RouteWaypoints() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadRouteData();
  }, []);

  const loadRouteData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiGet('/driver/profile');
      setProfile(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load route data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="route-page">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading route data...</div>
        </div>
      </div>
    );
  }

  if (error || !profile?.assignedRoute) {
    return (
      <div className="route-page">
        <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/')}
              style={{ padding: '6px' }}
            >
              <ArrowLeft size={18} />
            </button>
            <h1 style={{ fontSize: '18px', fontWeight: '700' }}>Route & Waypoints</h1>
          </div>
        </div>
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <AlertTriangle size={24} style={{ color: 'var(--red-alert)', margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-700)', marginBottom: '12px' }}>
            {error || 'No route assigned'}
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const route = profile.assignedRoute;
  const pickupPoints = route.pickupPoints || [];
  const totalStudents = route.totalStudents || 0;

  return (
    <div className="route-page">
      {/* Header */}
      <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate('/')}
              style={{ padding: '6px' }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>
                Route & Waypoints
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                {route.routeName}
              </div>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={loadRouteData}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Route Summary */}
      <div className="route-stats-grid">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <MapPin size={13} style={{ color: 'var(--blue-primary)' }} />
            <span className="stat-label">Total Stops</span>
          </div>
          <div className="stat-value" style={{ fontSize: '24px' }}>{pickupPoints.length}</div>
          <div className="stat-sub">Pickup points</div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Users size={13} style={{ color: 'var(--green-primary)' }} />
            <span className="stat-label">Total Students</span>
          </div>
          <div className="stat-value" style={{ fontSize: '24px' }}>{totalStudents}</div>
          <div className="stat-sub">On this route</div>
        </div>

        {route.distance && (
          <div className="stat-card">
            <div className="flex items-center gap-2 mb-1">
              <Navigation size={13} style={{ color: 'var(--orange)' }} />
              <span className="stat-label">Distance</span>
            </div>
            <div className="stat-value" style={{ fontSize: '24px' }}>{route.distance} km</div>
            <div className="stat-sub">{route.duration ? `~${route.duration} minutes` : 'Total route'}</div>
          </div>
        )}

        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={13} style={{ color: 'var(--purple)' }} />
            <span className="stat-label">Route Number</span>
          </div>
          <div className="stat-value" style={{ fontSize: '24px' }}>{route.routeNumber || 'N/A'}</div>
          <div className="stat-sub">Route ID</div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{
          height: '300px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <MapPin size={48} style={{ margin: '0 auto 12px', opacity: 0.9 }} />
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Interactive Route Map
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>
              Map visualization will be displayed here with MapLibre GL JS
            </div>
            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '8px' }}>
              Using OpenFreeMap tiles (no API key required)
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Pickup Points List */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>
          Pickup Points ({pickupPoints.length})
        </div>

        {pickupPoints.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
            <MapPin size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div>No pickup points configured</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {pickupPoints.map((point, index) => (
              <div
                key={point.id}
                style={{
                  padding: '14px',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '10px',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                {/* Stop Number */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: index === 0 ? '#10b981' : index === pickupPoints.length - 1 ? '#3b82f6' : 'var(--gray-200)',
                  color: index === 0 || index === pickupPoints.length - 1 ? '#fff' : 'var(--gray-700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '700',
                  flexShrink: 0
                }}>
                  {index + 1}
                </div>

                {/* Point Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)', marginBottom: '4px' }}>
                    {point.name}
                  </div>
                  {point.address && (
                    <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '4px' }}>
                      <MapPin size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      {point.address}
                    </div>
                  )}
                  {point.studentCount !== undefined && (
                    <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                      <Users size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      {point.studentCount} student{point.studentCount !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                {/* Time */}
                {point.estimatedTime && (
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '2px' }}>
                      Est. Time
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
                      {point.estimatedTime}
                    </div>
                  </div>
                )}

                {/* Coordinates */}
                {(point.latitude || point.longitude) && (
                  <div style={{ textAlign: 'right', flexShrink: 0, fontSize: '10px', color: 'var(--gray-400)' }}>
                    {point.latitude?.toFixed(4)}, {point.longitude?.toFixed(4)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Route Details */}
      {(route.startLocation || route.endLocation || route.description) && (
        <div className="card" style={{ marginTop: '16px' }}>
          <div className="section-title" style={{ marginBottom: '12px' }}>Route Details</div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {route.startLocation && (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
                  Start Location
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray-900)' }}>
                  {route.startLocation}
                </div>
              </div>
            )}
            {route.endLocation && (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
                  End Location
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray-900)' }}>
                  {route.endLocation}
                </div>
              </div>
            )}
            {route.description && (
              <div>
                <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
                  Description
                </div>
                <div style={{ fontSize: '13px', color: 'var(--gray-900)' }}>
                  {route.description}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
