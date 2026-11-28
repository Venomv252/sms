import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle, AlertTriangle, RefreshCw, MapPin, Users,
  Clock, Navigation, ArrowLeft, Square
} from 'lucide-react';
import { apiGet, apiPost } from '../../../api.js';
import './DriverCockpit.css';

export default function TripEnd() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState('');
  const [tripData, setTripData] = useState(null);
  const [studentStatus, setStudentStatus] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (tripId) {
      loadTripData();
    }
  }, [tripId]);

  const loadTripData = async () => {
    setLoading(true);
    setError('');

    try {
      // Get active trip info
      const tripResponse = await apiGet('/driver/trips/active');
      
      if (!tripResponse.data) {
        setError('No active trip found');
        setLoading(false);
        return;
      }

      const trip = tripResponse.data;

      // Verify the trip ID matches
      if (trip.id !== parseInt(tripId)) {
        setError('Trip ID mismatch');
        setLoading(false);
        return;
      }

      // Get student pickup/dropoff status
      const statusResponse = await apiGet(`/driver/students/trip-status/${tripId}`);
      
      setTripData(trip);
      setStudentStatus(statusResponse.data);
    } catch (err) {
      setError(err.message || 'Failed to load trip data');
    } finally {
      setLoading(false);
    }
  };

  const handleEndTrip = async () => {
    if (!tripData) return;

    // Check if all students are marked
    const totalStudents = studentStatus?.students?.length || 0;
    const markedStudents = studentStatus?.students?.filter(
      s => s.pickedUp || s.droppedOff
    ).length || 0;

    if (totalStudents > 0 && markedStudents === 0) {
      if (!window.confirm('No students have been marked as picked up or dropped off. Are you sure you want to end this trip?')) {
        return;
      }
    }

    setEnding(true);
    setError('');

    try {
      await apiPost(`/driver/trips/${tripId}/end`, {
        endLocation: 'School Campus', // Could be from GPS
        notes: notes.trim() || undefined,
      });

      // Success - navigate back to dashboard
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to end trip');
    } finally {
      setEnding(false);
    }
  };

  if (loading) {
    return (
      <div className="cockpit">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading trip data...</div>
        </div>
      </div>
    );
  }

  if (error && !tripData) {
    return (
      <div className="cockpit">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <AlertTriangle size={24} style={{ color: 'var(--red-alert)', margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-700)', marginBottom: '12px' }}>{error}</div>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalStudents = studentStatus?.students?.length || 0;
  const pickedUp = studentStatus?.students?.filter(s => s.pickedUp).length || 0;
  const droppedOff = studentStatus?.students?.filter(s => s.droppedOff).length || 0;
  const notMarked = totalStudents - pickedUp;

  const startTime = tripData ? new Date(tripData.startTime) : new Date();
  const duration = Math.floor((Date.now() - startTime.getTime()) / 1000 / 60); // minutes

  return (
    <div className="cockpit">
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
                End Trip
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                Review trip details and confirm completion
              </div>
            </div>
          </div>
          <div style={{
            padding: '6px 12px',
            background: '#e6f4f0',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'var(--green-primary)'
          }}>
            ● Active
          </div>
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

      {/* Trip Summary */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="section-title" style={{ marginBottom: '12px' }}>Trip Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Route
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {tripData?.routeName || 'Unknown Route'}
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              <Clock size={11} style={{ display: 'inline', marginRight: '4px' }} />
              Start Time
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              Duration
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {duration} minutes
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--gray-50)', borderRadius: '8px' }}>
            <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginBottom: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
              <MapPin size={11} style={{ display: 'inline', marginRight: '4px' }} />
              Start Location
            </div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
              {tripData?.startLocation || 'GPS Location'}
            </div>
          </div>
        </div>
      </div>

      {/* Student Status Summary */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="section-title" style={{ marginBottom: '12px' }}>Student Status</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
          <div style={{
            padding: '16px',
            background: totalStudents === 0 ? 'var(--gray-50)' : '#e6f4f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--gray-900)', marginBottom: '4px' }}>
              {totalStudents}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: '600' }}>
              Total Students
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: pickedUp === 0 ? 'var(--gray-50)' : '#e6f4f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--green-primary)', marginBottom: '4px' }}>
              {pickedUp}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: '600' }}>
              Picked Up
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: droppedOff === 0 ? 'var(--gray-50)' : '#e6f4f0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--blue-primary)', marginBottom: '4px' }}>
              {droppedOff}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: '600' }}>
              Dropped Off
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: notMarked > 0 ? '#fff5f5' : 'var(--gray-50)',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: notMarked > 0 ? 'var(--red-alert)' : 'var(--gray-900)', marginBottom: '4px' }}>
              {notMarked}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: '600' }}>
              Not Marked
            </div>
          </div>
        </div>

        {notMarked > 0 && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            background: '#fff5f5',
            border: '1px solid #fc8181',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#c53030'
          }}>
            <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px' }} />
            {notMarked} student{notMarked > 1 ? 's' : ''} not marked as picked up. Consider marking them in the Student Roster before ending the trip.
          </div>
        )}
      </div>

      {/* Trip Notes */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="section-title" style={{ marginBottom: '8px' }}>Trip Notes (Optional)</div>
        <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '12px' }}>
          Add any notes about this trip (delays, incidents, observations, etc.)
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g., Traffic delay on Route 14 due to construction..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            border: '1px solid var(--gray-300)',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Action Buttons */}
      <div className="card" style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            className="btn btn-outline"
            onClick={() => navigate('/')}
            disabled={ending}
          >
            <ArrowLeft size={14} /> Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleEndTrip}
            disabled={ending}
            style={{ minWidth: '140px' }}
          >
            {ending ? (
              <>
                <RefreshCw size={14} className="spin" /> Ending Trip...
              </>
            ) : (
              <>
                <Square size={14} /> End Trip
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
