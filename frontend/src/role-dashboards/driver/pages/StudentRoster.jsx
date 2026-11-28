import React, { useState, useEffect } from 'react';
import {
  Users, Search, Phone, CheckCircle, XCircle, Clock,
  AlertTriangle, RefreshCw, ArrowLeft, MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost } from '../../../api.js';
import './StudentRoster.css';

export default function StudentRoster() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [students, setStudents] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, picked_up, not_picked_up, dropped_off
  const [actionLoading, setActionLoading] = useState({}); // { studentId: 'pickup' | 'dropoff' }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      // Get active trip
      const tripResponse = await apiGet('/driver/trips/active');
      const trip = tripResponse.data;
      setActiveTrip(trip);

      // Get students
      const studentsResponse = await apiGet('/driver/students');
      let studentList = studentsResponse.data || [];

      // If there's an active trip, get pickup/dropoff status
      if (trip?.id) {
        try {
          const statusResponse = await apiGet(`/driver/students/trip-status/${trip.id}`);
          const statusMap = {};
          
          statusResponse.data.students?.forEach(s => {
            statusMap[s.id] = {
              pickedUp: s.pickedUp,
              pickedUpAt: s.pickedUpAt,
              droppedOff: s.droppedOff,
              droppedOffAt: s.droppedOffAt,
            };
          });

          // Merge status into student list
          studentList = studentList.map(student => ({
            ...student,
            tripStatus: statusMap[student.id] || {
              pickedUp: false,
              droppedOff: false,
            }
          }));
        } catch (err) {
          console.error('Failed to load trip status:', err);
        }
      }

      setStudents(studentList);
    } catch (err) {
      setError(err.message || 'Failed to load student roster');
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async (studentId) => {
    if (!activeTrip) {
      setError('No active trip. Start a trip first.');
      return;
    }

    setActionLoading({ ...actionLoading, [studentId]: 'pickup' });
    setError('');

    try {
      await apiPost(`/driver/students/${studentId}/pickup`, {
        tripId: activeTrip.id,
      });

      // Reload data to get updated status
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to mark pickup');
    } finally {
      setActionLoading({ ...actionLoading, [studentId]: null });
    }
  };

  const handleDropoff = async (studentId) => {
    if (!activeTrip) {
      setError('No active trip. Start a trip first.');
      return;
    }

    setActionLoading({ ...actionLoading, [studentId]: 'dropoff' });
    setError('');

    try {
      await apiPost(`/driver/students/${studentId}/dropoff`, {
        tripId: activeTrip.id,
      });

      // Reload data to get updated status
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to mark dropoff');
    } finally {
      setActionLoading({ ...actionLoading, [studentId]: null });
    }
  };

  // Filter and search students
  const filteredStudents = students.filter(student => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.pickupPoint?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    if (filterStatus === 'all') return true;
    if (filterStatus === 'picked_up') return student.tripStatus?.pickedUp;
    if (filterStatus === 'not_picked_up') return !student.tripStatus?.pickedUp && !student.tripStatus?.droppedOff;
    if (filterStatus === 'dropped_off') return student.tripStatus?.droppedOff;

    return true;
  });

  // Calculate stats
  const totalStudents = students.length;
  const pickedUpCount = students.filter(s => s.tripStatus?.pickedUp).length;
  const droppedOffCount = students.filter(s => s.tripStatus?.droppedOff).length;
  const notMarkedCount = students.filter(s => !s.tripStatus?.pickedUp && !s.tripStatus?.droppedOff).length;

  if (loading) {
    return (
      <div className="roster-page">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading student roster...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="roster-page">
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
                Student Roster
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                {totalStudents} students assigned to your route
              </div>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={loadData} disabled={loading}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
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

      {/* Active Trip Status */}
      {!activeTrip && (
        <div className="card" style={{
          padding: '12px 16px',
          background: '#fff9ed',
          border: '1px solid var(--orange)',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#b45309' }}>
            <Clock size={16} />
            <span>No active trip. Pickup/dropoff actions will be disabled until you start a trip.</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="roster-stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Students</div>
          <div className="stat-value" style={{ fontSize: '24px' }}>{totalStudents}</div>
          <div className="stat-sub">Assigned to route</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Picked Up</div>
          <div className="stat-value stat-green" style={{ fontSize: '24px' }}>{pickedUpCount}</div>
          <div className="stat-sub">{totalStudents > 0 ? Math.round((pickedUpCount / totalStudents) * 100) : 0}% completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Dropped Off</div>
          <div className="stat-value stat-blue" style={{ fontSize: '24px' }}>{droppedOffCount}</div>
          <div className="stat-sub">{totalStudents > 0 ? Math.round((droppedOffCount / totalStudents) * 100) : 0}% completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Not Marked</div>
          <div className="stat-value" style={{ fontSize: '24px', color: notMarkedCount > 0 ? 'var(--red-alert)' : 'var(--gray-600)' }}>
            {notMarkedCount}
          </div>
          <div className="stat-sub">Awaiting action</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card" style={{ padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-box" style={{ flex: '1 1 300px' }}>
            <Search size={16} style={{ color: 'var(--gray-400)' }} />
            <input
              type="text"
              placeholder="Search by name, admission number, grade, pickup point..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                background: 'transparent',
                fontSize: '13px'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({totalStudents})
            </button>
            <button
              className={`btn btn-sm ${filterStatus === 'picked_up' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('picked_up')}
            >
              Picked Up ({pickedUpCount})
            </button>
            <button
              className={`btn btn-sm ${filterStatus === 'not_picked_up' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('not_picked_up')}
            >
              Not Marked ({notMarkedCount})
            </button>
            <button
              className={`btn btn-sm ${filterStatus === 'dropped_off' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilterStatus('dropped_off')}
            >
              Dropped Off ({droppedOffCount})
            </button>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>
          Students ({filteredStudents.length})
        </div>
        
        {filteredStudents.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
            <Users size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div>No students found</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {filteredStudents.map((student) => {
              const isPickedUp = student.tripStatus?.pickedUp;
              const isDroppedOff = student.tripStatus?.droppedOff;
              const isLoading = actionLoading[student.id];

              return (
                <div
                  key={student.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--gray-200)',
                    borderRadius: '10px',
                    background: isDroppedOff ? '#f0f9ff' : isPickedUp ? '#f0fdf4' : '#fff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: isDroppedOff ? '#3b82f6' : isPickedUp ? '#10b981' : 'var(--gray-300)',
                      color: (isPickedUp || isDroppedOff) ? '#fff' : 'var(--gray-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      {student.name?.charAt(0) || '?'}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
                          {student.name}
                        </span>
                        {student.grade && (
                          <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', fontSize: '10px' }}>
                            {student.grade}
                          </span>
                        )}
                        {student.admissionNumber && (
                          <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', fontSize: '10px' }}>
                            {student.admissionNumber}
                          </span>
                        )}
                      </div>

                      {student.pickupPoint && (
                        <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '4px' }}>
                          <MapPin size={11} style={{ display: 'inline', marginRight: '4px' }} />
                          {student.pickupPoint}
                        </div>
                      )}

                      {student.parentName && (
                        <div style={{ fontSize: '11px', color: 'var(--gray-500)' }}>
                          Parent: {student.parentName}
                          {student.parentPhone && ` • ${student.parentPhone}`}
                        </div>
                      )}

                      {/* Status */}
                      <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {isDroppedOff && (
                          <span className="badge badge-blue" style={{ fontSize: '11px' }}>
                            <CheckCircle size={11} style={{ display: 'inline', marginRight: '4px' }} />
                            Dropped Off {student.tripStatus.droppedOffAt ? new Date(student.tripStatus.droppedOffAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        )}
                        {isPickedUp && !isDroppedOff && (
                          <span className="badge badge-green" style={{ fontSize: '11px' }}>
                            <CheckCircle size={11} style={{ display: 'inline', marginRight: '4px' }} />
                            Picked Up {student.tripStatus.pickedUpAt ? new Date(student.tripStatus.pickedUpAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                        )}
                        {!isPickedUp && !isDroppedOff && (
                          <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', fontSize: '11px' }}>
                            <Clock size={11} style={{ display: 'inline', marginRight: '4px' }} />
                            Not Marked
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      {!isPickedUp && (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePickup(student.id)}
                          disabled={!activeTrip || isLoading === 'pickup'}
                          style={{ minWidth: '90px' }}
                        >
                          {isLoading === 'pickup' ? (
                            <>
                              <RefreshCw size={12} className="spin" /> ...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={12} /> Pick Up
                            </>
                          )}
                        </button>
                      )}
                      {isPickedUp && !isDroppedOff && (
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleDropoff(student.id)}
                          disabled={!activeTrip || isLoading === 'dropoff'}
                          style={{ minWidth: '90px', borderColor: '#3b82f6', color: '#3b82f6' }}
                        >
                          {isLoading === 'dropoff' ? (
                            <>
                              <RefreshCw size={12} className="spin" /> ...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={12} /> Drop Off
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
