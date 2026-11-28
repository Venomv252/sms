import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin, ArrowLeft, RefreshCw, AlertTriangle, Navigation, Users, Clock
} from 'lucide-react';
import { apiGet } from '../../../api.js';
import './RouteWaypoints.css';

export default function FleetProximity() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiGet('/driver/profile');
      setProfile(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="route-page">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading fleet data...</div>
        </div>
      </div>
    );
  }

  const driverInfo = profile?.driver || {};
  const assignedBus = profile?.assignedBus || {};

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
                Fleet Proximity
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                View nearby buses and fleet locations
              </div>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={loadData}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="card" style={{
          padding: '12px 16px',
          background: '#fff5f5',
          border: '1px solid #fc8181',
          borderLeft: '4px solid var(--red-alert)',
          marginBottom: '16px'
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

      {/* Your Bus Info */}
      <div className="card" style={{ marginBottom: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
            Your Bus
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
            {assignedBus.busNumber || 'Not Assigned'}
          </div>
          {assignedBus.registrationNumber && (
            <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '12px' }}>
              {assignedBus.registrationNumber}
            </div>
          )}
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', opacity: 0.9 }}>
            {assignedBus.capacity && (
              <div>
                <Users size={12} style={{ display: 'inline', marginRight: '4px' }} />
                Capacity: {assignedBus.capacity}
              </div>
            )}
            {driverInfo.name && (
              <div>
                Driver: {driverInfo.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{
          height: '400px',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <Navigation size={48} style={{ margin: '0 auto 12px', opacity: 0.9 }} />
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Live Fleet Map
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9, maxWidth: '400px', margin: '0 auto' }}>
              Real-time bus locations will be displayed here using WebSocket updates and MapLibre GL JS
            </div>
            <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '8px' }}>
              Shows active buses with live GPS tracking
            </div>
          </div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* Fleet Status Info */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>Fleet Information</div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--gray-500)' }}>
          <Navigation size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
          <div style={{ marginBottom: '12px' }}>
            Fleet proximity features will show:
          </div>
          <div style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto', fontSize: '13px', lineHeight: '1.8' }}>
            <div>• Live locations of all active buses</div>
            <div>• Distance to nearest fleet vehicles</div>
            <div>• Route coverage and backup availability</div>
            <div>• Emergency contact for nearby drivers</div>
            <div>• Real-time GPS tracking via WebSocket</div>
          </div>
        </div>
      </div>

      {/* Implementation Note */}
      <div className="card" style={{
        marginTop: '16px',
        background: '#f0f9ff',
        border: '1px solid #3b82f6'
      }}>
        <div style={{ padding: '12px 16px', fontSize: '12px', color: '#1e40af' }}>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            <Navigation size={12} style={{ display: 'inline', marginRight: '6px' }} />
            Map Implementation
          </div>
          <div style={{ lineHeight: '1.6' }}>
            This page will integrate MapLibre GL JS with OpenFreeMap tiles for interactive mapping.
            Live bus locations will be received via WebSocket connections and displayed with custom markers.
            Click events on bus markers will show driver info, route details, and distance calculations.
          </div>
        </div>
      </div>
    </div>
  );
}
