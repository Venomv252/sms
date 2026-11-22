import React, { useState } from 'react';
import { X, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { apiPost } from '../../../api';

export default function AddPrincipalModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState(null);
  const [copiedField, setCopiedField] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiPost('/management/principal/create', formData);
      setCredentials(response.data.credentials);
      if (onSuccess) onSuccess(response.data.principal);
    } catch (err) {
      setError(err.message || 'Failed to create principal account');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllCredentials = async () => {
    if (!credentials) return;
    const text = `Username: ${credentials.username}\nTemporary Password: ${credentials.temporaryPassword}`;
    await copyToClipboard(text, 'all');
  };

  const handleClose = () => {
    setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    setCredentials(null);
    setError('');
    setCopiedField('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={handleClose} />

      {/* Modal */}
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {credentials ? 'Principal Created Successfully' : 'Add New Principal'}
          </h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {credentials ? (
            // Credentials Display
            <div>
              <div className="alert-success mb-4">
                <CheckCircle size={18} />
                <span>Principal account has been created successfully!</span>
              </div>

              <div className="credentials-warning mb-4">
                <AlertCircle size={18} />
                <div>
                  <strong>Important:</strong> These temporary credentials are displayed only once.
                  Copy and securely share them with the Principal.
                </div>
              </div>

              <div className="credentials-box">
                <div className="credential-item">
                  <label>Username</label>
                  <div className="credential-value">
                    <code>{credentials.username}</code>
                    <button
                      className="btn-copy"
                      onClick={() => copyToClipboard(credentials.username, 'username')}
                      title="Copy username"
                    >
                      {copiedField === 'username' ? (
                        <CheckCircle size={16} className="text-green" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="credential-item">
                  <label>Temporary Password</label>
                  <div className="credential-value">
                    <code>{credentials.temporaryPassword}</code>
                    <button
                      className="btn-copy"
                      onClick={() => copyToClipboard(credentials.temporaryPassword, 'password')}
                      title="Copy password"
                    >
                      {copiedField === 'password' ? (
                        <CheckCircle size={16} className="text-green" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                onClick={copyAllCredentials}
              >
                {copiedField === 'all' ? (
                  <>
                    <CheckCircle size={16} />
                    Copied All Credentials!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy All Credentials
                  </>
                )}
              </button>

              <div className="text-xs text-muted mt-3 text-center">
                The Principal should change this temporary password upon first login
              </div>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert-error mb-4">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="text-red">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="text-red">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="Enter last name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-red">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder="principal@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="input"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Optional"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Principal Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 1001;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s;
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 4px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: all 0.15s;
        }

        .modal-close:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .modal-body {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 6px;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }

        .modal-actions .btn {
          flex: 1;
          justify-content: center;
        }

        .alert-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          color: #15803d;
          font-size: 13px;
          font-weight: 500;
        }

        .alert-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: #fee2e2;
          border: 1px solid #fca5a5;
          border-radius: 8px;
          color: #991b1b;
          font-size: 13px;
          font-weight: 500;
        }

        .credentials-warning {
          display: flex;
          gap: 10px;
          padding: 12px 14px;
          background: #fef3c7;
          border: 1px solid #fcd34d;
          border-radius: 8px;
          color: #92400e;
          font-size: 12px;
        }

        .credentials-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .credential-item {
          margin-bottom: 16px;
        }

        .credential-item:last-child {
          margin-bottom: 0;
        }

        .credential-item label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          margin-bottom: 6px;
        }

        .credential-value {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .credential-value code {
          flex: 1;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px 12px;
          font-family: 'Courier New', monospace;
          font-size: 14px;
          color: #0f172a;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .btn-copy {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          transition: all 0.15s;
        }

        .btn-copy:hover {
          background: #f8fafc;
          border-color: #16a34a;
          color: #16a34a;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -45%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
