import React, { useState, useEffect } from "react";
import { CreditCard, Plus, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { apiGet, apiPost, apiPatch } from "../../../api.js";

export default function BillPayments({ setError, setMessage }) {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    fetchBills();
  }, [filterStatus]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await apiGet(`/accountant/bills?status=${filterStatus}`);
      setBills(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch bills");
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setShowPaymentModal(true);
  };

  // Calculate totals
  const totalBills = bills.length;
  const pendingBills = bills.filter(b => b.status === "PENDING").length;
  const paidBills = bills.filter(b => b.status === "PAID").length;
  const totalAmount = bills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
  const paidAmount = bills.filter(b => b.status === "PAID").reduce((sum, bill) => sum + (bill.amount || 0), 0);
  const pendingAmount = totalAmount - paidAmount;

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><CreditCard size={19} /> Bill Payment Management</h2>
            <p>Track and manage vendor bills, utilities, and expenses</p>
          </div>
          <button 
            className="director-submit"
            onClick={() => setShowAddBillModal(true)}
            style={{ marginLeft: 'auto' }}
          >
            <Plus size={16} />
            Add Bill
          </button>
        </div>

        {/* Summary Cards */}
        <div className="accountant-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <CreditCard size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Bills</span>
              <span className="stat-value">{totalBills}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <Clock size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Pending Bills</span>
              <span className="stat-value">{pendingBills}</span>
              <span className="stat-sublabel">₹{pendingAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <CheckCircle size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Paid Bills</span>
              <span className="stat-value">{paidBills}</span>
              <span className="stat-sublabel">₹{paidAmount.toLocaleString()}</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <AlertCircle size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Amount</span>
              <span className="stat-value">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ minWidth: '150px' }}>
            <option value="all">All Bills</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        {/* Bills Table */}
        <div className="accountant-table-wrapper">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
              Loading bills...
            </div>
          ) : bills.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
              <CreditCard size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p>No bills found</p>
            </div>
          ) : (
            <table className="accountant-data-table">
              <thead>
                <tr>
                  <th>Bill ID</th>
                  <th>Vendor/Supplier</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Bill Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(bill => {
                  const isOverdue = bill.status === "PENDING" && new Date(bill.dueDate) < new Date();
                  return (
                    <tr key={bill.id}>
                      <td><strong>{bill.billNumber || bill.id.slice(0, 8)}</strong></td>
                      <td>{bill.vendorName}</td>
                      <td>
                        <span className={`status-badge status-${bill.category?.toLowerCase()}`}>
                          {bill.category}
                        </span>
                      </td>
                      <td>{bill.description}</td>
                      <td><strong>₹{bill.amount.toLocaleString()}</strong></td>
                      <td>{new Date(bill.billDate).toLocaleDateString()}</td>
                      <td style={{ color: isOverdue ? '#e74c3c' : 'inherit' }}>
                        {new Date(bill.dueDate).toLocaleDateString()}
                        {isOverdue && <AlertCircle size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />}
                      </td>
                      <td>
                        <span className={`status-badge status-${bill.status.toLowerCase()}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {bill.status === "PENDING" && (
                            <button 
                              className="icon-button"
                              title="Pay Bill"
                              onClick={() => handlePayBill(bill)}
                              style={{ background: '#27ae60', color: 'white' }}
                            >
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button 
                            className="icon-button"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          {bill.status === "PAID" && (
                            <button 
                              className="icon-button"
                              title="Download Invoice"
                              onClick={() => window.location.href = `/api/accountant/bills/${bill.id}/invoice`}
                            >
                              <Download size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {showAddBillModal && (
        <AddBillModal 
          onClose={() => setShowAddBillModal(false)}
          onSuccess={() => {
            setShowAddBillModal(false);
            fetchBills();
            setMessage("Bill added successfully");
          }}
          setError={setError}
        />
      )}

      {showPaymentModal && selectedBill && (
        <PayBillModal 
          bill={selectedBill}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedBill(null);
          }}
          onSuccess={() => {
            setShowPaymentModal(false);
            setSelectedBill(null);
            fetchBills();
            setMessage("Bill payment recorded successfully");
          }}
          setError={setError}
        />
      )}
    </>
  );
}

function AddBillModal({ onClose, onSuccess, setError }) {
  const [formData, setFormData] = useState({
    vendorName: "",
    category: "",
    description: "",
    amount: "",
    billDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    billNumber: "",
    taxAmount: 0,
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      setError("Add bill API not yet implemented");
      // await apiPost("/accountant/bills", formData);
      // onSuccess();
    } catch (err) {
      setError(err.message || "Failed to add bill");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3><CreditCard size={20} /> Add New Bill</h3>
          <button onClick={onClose} className="modal-close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="director-create-grid">
          <label>
            Vendor/Supplier Name *
            <input
              value={formData.vendorName}
              onChange={(e) => setFormData(prev => ({ ...prev, vendorName: e.target.value }))}
              required
              placeholder="Enter vendor name"
            />
          </label>

          <label>
            Bill Number
            <input
              value={formData.billNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, billNumber: e.target.value }))}
              placeholder="e.g., INV-2024-001"
            />
          </label>

          <label>
            Category *
            <select 
              value={formData.category} 
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            >
              <option value="">Select category</option>
              <option value="UTILITIES">Utilities</option>
              <option value="SUPPLIES">Supplies</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="RENT">Rent</option>
              <option value="INSURANCE">Insurance</option>
              <option value="TRANSPORT">Transport</option>
              <option value="FOOD">Food & Catering</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

          <label>
            Amount (₹) *
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </label>

          <label>
            Tax Amount (₹)
            <input
              type="number"
              value={formData.taxAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, taxAmount: e.target.value }))}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </label>

          <label>
            Bill Date *
            <input
              type="date"
              value={formData.billDate}
              onChange={(e) => setFormData(prev => ({ ...prev, billDate: e.target.value }))}
              required
            />
          </label>

          <label>
            Due Date *
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              required
            />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Description *
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={2}
              placeholder="Enter bill description"
            />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Notes (optional)
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
              placeholder="Additional notes..."
            />
          </label>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="director-submit" style={{ background: 'var(--rp-border)' }}>
              Cancel
            </button>
            <button type="submit" className="director-submit">
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PayBillModal({ bill, onClose, onSuccess, setError }) {
  const [formData, setFormData] = useState({
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "bank_transfer",
    transactionId: "",
    paidAmount: bill.amount,
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      setError("Pay bill API not yet implemented");
      // await apiPatch(`/accountant/bills/${bill.id}/pay`, formData);
      // onSuccess();
    } catch (err) {
      setError(err.message || "Failed to process payment");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h3><CheckCircle size={20} /> Pay Bill</h3>
          <button onClick={onClose} className="modal-close">×</button>
        </div>

        <div style={{ padding: '16px', background: 'var(--rp-surface)', borderRadius: '8px', marginBottom: '16px' }}>
          <h4 style={{ marginBottom: '8px' }}>Bill Details</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
            <div><strong>Vendor:</strong> {bill.vendorName}</div>
            <div><strong>Amount:</strong> ₹{bill.amount.toLocaleString()}</div>
            <div><strong>Category:</strong> {bill.category}</div>
            <div><strong>Due Date:</strong> {new Date(bill.dueDate).toLocaleDateString()}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="director-create-grid">
          <label>
            Payment Date *
            <input
              type="date"
              value={formData.paymentDate}
              onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
              required
            />
          </label>

          <label>
            Payment Method *
            <select 
              value={formData.paymentMethod} 
              onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
              required
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </label>

          <label>
            Paid Amount (₹) *
            <input
              type="number"
              value={formData.paidAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, paidAmount: e.target.value }))}
              required
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Transaction ID
            <input
              value={formData.transactionId}
              onChange={(e) => setFormData(prev => ({ ...prev, transactionId: e.target.value }))}
              placeholder="Transaction reference"
            />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Payment Notes
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
              placeholder="Optional payment notes..."
            />
          </label>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="director-submit" style={{ background: 'var(--rp-border)' }}>
              Cancel
            </button>
            <button type="submit" className="director-submit">
              Process Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
