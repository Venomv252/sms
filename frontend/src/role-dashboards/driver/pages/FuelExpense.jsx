import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Fuel, ArrowLeft, RefreshCw, AlertTriangle, Calendar, DollarSign
} from 'lucide-react';
import { apiGet, apiPost } from '../../../api.js';
import './FuelExpense.css';

export default function FuelExpense() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fuelType: 'DIESEL',
    quantity: '',
    pricePerUnit: '',
    totalAmount: '',
    vendorName: '',
    location: '',
    receiptNumber: '',
    odometer: '',
    notes: '',
  });

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await apiGet('/driver/fuel-expenses');
      setExpenses(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load fuel expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };

    // Auto-calculate total if quantity and price are set
    if (field === 'quantity' || field === 'pricePerUnit') {
      const qty = parseFloat(field === 'quantity' ? value : updated.quantity) || 0;
      const price = parseFloat(field === 'pricePerUnit' ? value : updated.pricePerUnit) || 0;
      updated.totalAmount = (qty * price).toFixed(2);
    }

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await apiPost('/driver/fuel-expenses', {
        fuelType: formData.fuelType,
        quantity: parseFloat(formData.quantity),
        pricePerUnit: parseFloat(formData.pricePerUnit),
        totalAmount: parseFloat(formData.totalAmount),
        vendorName: formData.vendorName.trim(),
        location: formData.location.trim(),
        receiptNumber: formData.receiptNumber.trim() || undefined,
        odometer: formData.odometer ? parseInt(formData.odometer) : undefined,
        notes: formData.notes.trim() || undefined,
      });

      // Reset form
      setFormData({
        fuelType: 'DIESEL',
        quantity: '',
        pricePerUnit: '',
        totalAmount: '',
        vendorName: '',
        location: '',
        receiptNumber: '',
        odometer: '',
        notes: '',
      });
      setShowForm(false);

      // Reload expenses
      await loadExpenses();
    } catch (err) {
      setError(err.message || 'Failed to submit fuel expense');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fuel-page">
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
          <div style={{ color: 'var(--gray-600)' }}>Loading fuel expenses...</div>
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
                Fuel & Expenses
              </h1>
              <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>
                Submit and track fuel expenses
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm" onClick={loadExpenses}>
              <RefreshCw size={14} /> Refresh
            </button>
            {!showForm && (
              <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
                <Fuel size={14} /> New Expense
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

      {/* Expense Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ marginBottom: '16px' }}>Submit Fuel Expense</div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gap: '16px' }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label className="form-label">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    required
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    <option value="DIESEL">Diesel</option>
                    <option value="PETROL">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="ADBLUE">AdBlue</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Quantity (Liters)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    required
                    placeholder="50.00"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Price per Liter</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerUnit}
                    onChange={(e) => handleInputChange('pricePerUnit', e.target.value)}
                    required
                    placeholder="98.50"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Total Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', e.target.value)}
                    required
                    placeholder="4925.00"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label className="form-label">Vendor Name</label>
                  <input
                    type="text"
                    value={formData.vendorName}
                    onChange={(e) => handleInputChange('vendorName', e.target.value)}
                    required
                    placeholder="IOCL Whitefield Station"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                    placeholder="Whitefield Main Road"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Receipt Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.receiptNumber}
                    onChange={(e) => handleInputChange('receiptNumber', e.target.value)}
                    placeholder="VOUCH-8821"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>

                <div>
                  <label className="form-label">Odometer (Optional)</label>
                  <input
                    type="number"
                    value={formData.odometer}
                    onChange={(e) => handleInputChange('odometer', e.target.value)}
                    placeholder="45320"
                    style={{ width: '100%', marginTop: '4px' }}
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes about this expense..."
                  rows={3}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              {/* Actions */}
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
                      <Fuel size={14} /> Submit Expense
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Expense History */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: '12px' }}>
          Expense History ({expenses.length})
        </div>

        {expenses.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--gray-500)' }}>
            <Fuel size={32} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <div>No fuel expenses recorded</div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowForm(true)}
              style={{ marginTop: '12px' }}
            >
              Submit First Expense
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {expenses.map((expense) => (
              <div
                key={expense.id}
                style={{
                  padding: '14px',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '10px',
                  background: '#fff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  {/* Icon */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#fef3c7',
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Fuel size={20} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--gray-900)' }}>
                        {expense.fuelType} - {expense.quantity} L
                      </span>
                      <span className="badge" style={{ background: 'var(--gray-100)', color: 'var(--gray-700)', fontSize: '10px' }}>
                        ₹{expense.pricePerUnit}/L
                      </span>
                      {expense.receiptNumber && (
                        <span className="badge" style={{ background: 'var(--blue-50)', color: 'var(--blue-primary)', fontSize: '10px' }}>
                          {expense.receiptNumber}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--gray-600)', marginBottom: '4px' }}>
                      {expense.vendorName} • {expense.location}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--gray-500)' }}>
                      <span>
                        <Calendar size={11} style={{ display: 'inline', marginRight: '4px' }} />
                        {new Date(expense.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {expense.odometer && (
                        <span>Odometer: {expense.odometer} km</span>
                      )}
                    </div>

                    {expense.notes && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '8px', 
                        background: 'var(--gray-50)', 
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'var(--gray-700)'
                      }}>
                        {expense.notes}
                      </div>
                    )}
                  </div>

                  {/* Amount */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gray-900)' }}>
                      ₹{expense.totalAmount.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--gray-500)', marginTop: '2px' }}>
                      Total Amount
                    </div>
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
