import React, { useState, useEffect } from "react";
import { FileText, Plus, Download, Eye, Search, Filter } from "lucide-react";
import { apiGet } from "../../../api.js";

export default function InvoiceManagement({ setError, setMessage }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [filterType]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await apiGet(`/accountant/invoices?type=${filterType}`);
      setInvoices(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const searchLower = searchTerm.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.clientName?.toLowerCase().includes(searchLower) ||
      invoice.description?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <section className="superadmin-panel">
        <div className="superadmin-section-title">
          <div>
            <h2><FileText size={19} /> Invoice Management</h2>
            <p>Create and manage invoices for bills and payments</p>
          </div>
          <button 
            className="director-submit"
            onClick={() => setShowCreateModal(true)}
            style={{ marginLeft: 'auto' }}
          >
            <Plus size={16} />
            Create Invoice
          </button>
        </div>

        <div className="accountant-filter-bar" style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--rp-muted)' }} />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px', width: '100%' }}
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ minWidth: '150px' }}>
            <option value="all">All Invoices</option>
            <option value="bill">Bill Payments</option>
            <option value="salary">Salary Payments</option>
            <option value="fee">Fee Receipts</option>
            <option value="other">Other</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
            Loading invoices...
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--rp-muted)' }}>
            <FileText size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
            <p>No invoices found</p>
          </div>
        ) : (
          <div className="accountant-table-wrapper">
            <table className="accountant-data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Type</th>
                  <th>Client/Recipient</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td><strong>{invoice.invoiceNumber}</strong></td>
                    <td>
                      <span className={`status-badge status-${invoice.type}`}>
                        {invoice.type}
                      </span>
                    </td>
                    <td>{invoice.clientName || '-'}</td>
                    <td>{invoice.description || '-'}</td>
                    <td><strong>₹{invoice.amount.toLocaleString()}</strong></td>
                    <td>{new Date(invoice.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          className="icon-button"
                          title="View Invoice"
                          onClick={() => window.open(`/api/accountant/invoices/${invoice.id}/pdf`, '_blank')}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="icon-button"
                          title="Download PDF"
                          onClick={() => window.location.href = `/api/accountant/invoices/${invoice.id}/download`}
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showCreateModal && (
        <CreateInvoiceModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchInvoices();
            setMessage("Invoice created successfully");
          }}
          setError={setError}
        />
      )}
    </>
  );
}

function CreateInvoiceModal({ onClose, onSuccess, setError }) {
  const [formData, setFormData] = useState({
    type: "bill",
    clientName: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    items: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call would go here
      setError("Invoice creation API not yet implemented");
      // await apiPost("/accountant/invoices", formData);
      // onSuccess();
    } catch (err) {
      setError(err.message || "Failed to create invoice");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <h3><FileText size={20} /> Create New Invoice</h3>
          <button onClick={onClose} className="modal-close">×</button>
        </div>
        <form onSubmit={handleSubmit} className="director-create-grid">
          <label>
            Invoice Type *
            <select 
              value={formData.type} 
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              required
            >
              <option value="bill">Bill Payment</option>
              <option value="salary">Salary Payment</option>
              <option value="fee">Fee Receipt</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Client/Recipient Name *
            <input
              value={formData.clientName}
              onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
              required
              placeholder="Enter name"
            />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Description *
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={3}
              placeholder="Enter invoice description"
            />
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
            Invoice Date *
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              required
            />
          </label>

          <label>
            Due Date
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </label>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="director-submit" style={{ background: 'var(--rp-border)' }}>
              Cancel
            </button>
            <button type="submit" className="director-submit">
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
