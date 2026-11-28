import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench, ArrowLeft, RefreshCw, AlertTriangle, Calendar, MapPin
} from 'lucide-react';
import { apiGet, apiPost } from '../../../api.js';
import './FuelExpense.css';

export default function Breakdown() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [breakdowns, setBreakdowns] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    issueType: 'ENGINE',
    severity: 'MEDIUM',
    description: '',
    location: '',
    resolved: false,
    notes: '',
  });

  useEffect(() => {
    loadBreakdowns();
  }, []);

  const loadBreakdowns = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiGet('/driver/breakdowns');
      setBreakdowns(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load breakdowns');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await apiPost('/driver/breakdowns', {
        issueType: formData.issueType,
        severity: formData.severity,
        description: formData.description.trim(),
        location: formData.location.trim() || undefined,
        resolved: formData.resolved,
        notes: formData.notes.trim() || undefined,
      });

      // Reset form
      setFormData({
        issueType: 'ENGINE',
        severity: 'MEDIUM',
        description: '',
        location: '',
        resolved: false,
        notes: '',
      });
      setShowForm(false);

      // Reload breakdowns
      await loadBreakdowns();
    } catch (err) {
      setError(err.message || 'Failed to submit breakdown report');
    } finally {
      setSubmitting(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return 'var(--gray-600)';
    }
  };

  if (loading) {
    return (
      <div className="fuel-page">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading breakdown reports...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fuel-page">
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
                Vehicle Breakdowns
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                Report and track vehicle breakdown issues
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm" onClick={loadBreakdowns}>
              <RefreshCw size={14} /> Refresh
            </button>
            {!showForm && (
              <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
                <Wrench size={14} /> Report Breakdown
              </button>
            )}
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

      {/* Report Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>Report Vehicle Breakdown</div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label className="form-label">Issue Type</label>
                  <select
                    value={formData.issueType}
                    onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                    required
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="ENGINE">Engine Issue</option>
                    <option value="TRANSMISSION">Transmission Problem</option>
                    <option value="BRAKES">Brake Failure</option>
                    <option value="ELECTRICAL">Electrical Problem</option>
                    <option value="TIRE">Tire/Wheel Issue</option>
                    <option value="SUSPENSION">Suspension Problem</option>
                    <option value="COOLING">Cooling System</option>
                    <option value="FUEL_SYSTEM">Fuel System</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Severity</label>
                  <select
                    value={formData.severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    required
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="LOW">Low - Minor Issue</option>
                    <option value="MEDIUM">Medium - Requires Attention</option>
                    <option value="HIGH">High - Urgent Repair</option>
                    <option value="CRITICAL">Critical - Vehicle Immobile</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Location (Optional)</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Current location"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Status</label>
                  <select
                    value={formData.resolved}
                    onChange={(e) => setFormData({ ...formData, resolved: e.target.value === 'true' })}
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="false">Unresolved</option>
                    <option value="true">Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Describe the breakdown issue in detail..."
                  rows={4}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              <div>
                <label className="form-label">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional information..."
                  rows={2}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowForm(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={14} className="spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Wrench size={14} /> Submit Report
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Breakdown History */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>
          Breakdown History ({breakdowns.length})
        </div>

        {breakdowns.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
            <Wrench size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div>No breakdown reports</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {breakdowns.map((breakdown) => (
              <div
                key={breakdown.id}
                style={{
                  padding: '14px',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '10px',
                  background: '#fff',
                  borderLeft: `4px solid ${getSeverityColor(breakdown.severity)}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: getSeverityColor(breakdown.severity) + '20',
                    color: getSeverityColor(breakdown.severity),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Wrench size={20} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
                        {breakdown.issueType.replace(/_/g, ' ')}
                      </span>
                      <span className="badge" style={{ 
                        background: getSeverityColor(breakdown.severity) + '20',
                        color: getSeverityColor(breakdown.severity),
                        fontSize: '10px' 
                      }}>
                        {breakdown.severity}
                      </span>
                      <span className={`badge ${breakdown.resolved ? 'badge-green' : 'badge-orange'}`} style={{ fontSize: '10px' }}>
                        {breakdown.resolved ? '✓ Resolved' : 'Unresolved'}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--gray-700)', marginBottom: '8px' }}>
                      {breakdown.description}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                      <span>
                        <Calendar size={11} style={{ display: 'inline', marginRight: '4px' }} />
                        {new Date(breakdown.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {breakdown.location && (
                        <span>
                          <MapPin size={11} style={{ display: 'inline', marginRight: '4px' }} />
                          {breakdown.location}
                        </span>
                      )}
                    </div>

                    {breakdown.notes && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '8px', 
                        background: 'var(--gray-50)', 
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'var(--gray-700)'
                      }}>
                        <strong>Notes:</strong> {breakdown.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
