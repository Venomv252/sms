import React, { useState } from "react";
import { Eye, EyeOff, Copy, CheckCircle, AlertCircle } from "lucide-react";

/**
 * CredentialDisplay Component
 * 
 * Displays username and password with copy-to-clipboard functionality
 * Features:
 * - Toggle password visibility
 * - Copy individual fields
 * - Copy all credentials at once
 * - Visual feedback on copy
 * - Security warning
 * 
 * @param {Object} props
 * @param {string} props.username - Generated username
 * @param {string} props.password - Temporary password
 * @param {string} props.role - User role (e.g., "Director", "Principal")
 * @param {string} props.name - Full name of the created user
 * @param {string} props.email - Email of the created user
 * @param {string|Array} props.schools - School name(s) - string or array of school names
 * @param {Function} props.onClose - Callback when modal is closed
 */
export default function CredentialDisplay({ username, password, role, name, email, schools, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard");
    }
  };

  const copyAllCredentials = async () => {
    // Format schools - could be string or array
    let schoolText = "";
    if (schools) {
      if (Array.isArray(schools)) {
        schoolText = schools.length > 0 ? `School: ${schools.join(", ")}\n` : "";
      } else {
        schoolText = `School: ${schools}\n`;
      }
    }
    
    const text = `${schoolText}Name: ${name}
Email: ${email}
Username: ${username}
Temporary password: ${password}`;

    await copyToClipboard(text, "all");
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        maxWidth: '480px',
        width: '100%',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '24px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <CheckCircle style={{ width: '32px', height: '32px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Account Created!</h2>
          </div>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.95 }}>
            {role} account for <strong>{name}</strong> has been created successfully.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Warning Banner */}
          <div style={{
            backgroundColor: '#fffbeb',
            borderLeft: '4px solid #f59e0b',
            padding: '16px',
            borderRadius: '4px',
            display: 'flex',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <AlertCircle style={{ width: '20px', height: '20px', color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '14px' }}>
              <p style={{ fontWeight: 600, color: '#92400e', margin: '0 0 4px 0' }}>Store these credentials securely!</p>
              <p style={{ color: '#b45309', margin: 0 }}>
                This password will not be shown again. The user should change it after first login.
              </p>
            </div>
          </div>

          {/* Username Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Username
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={username}
                readOnly
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={() => copyToClipboard(username, "username")}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: copiedField === "username" ? '#10b981' : '#f3f4f6',
                  color: copiedField === "username" ? 'white' : '#374151',
                  transition: 'all 0.2s'
                }}
                title="Copy username"
              >
                {copiedField === "username" ? (
                  <CheckCircle style={{ width: '20px', height: '20px' }} />
                ) : (
                  <Copy style={{ width: '20px', height: '20px' }} />
                )}
              </button>
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Temporary Password
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '8px 40px 8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6b7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: '20px', height: '20px' }} />
                  ) : (
                    <Eye style={{ width: '20px', height: '20px' }} />
                  )}
                </button>
              </div>
              <button
                onClick={() => copyToClipboard(password, "password")}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: copiedField === "password" ? '#10b981' : '#f3f4f6',
                  color: copiedField === "password" ? 'white' : '#374151',
                  transition: 'all 0.2s'
                }}
                title="Copy password"
              >
                {copiedField === "password" ? (
                  <CheckCircle style={{ width: '20px', height: '20px' }} />
                ) : (
                  <Copy style={{ width: '20px', height: '20px' }} />
                )}
              </button>
            </div>
          </div>

          {/* Copy All Button */}
          <button
            onClick={copyAllCredentials}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: copiedField === "all" ? '#10b981' : '#059669',
              color: 'white',
              fontSize: '15px',
              transition: 'all 0.2s'
            }}
          >
            {copiedField === "all" ? (
              <>
                <CheckCircle style={{ width: '20px', height: '20px' }} />
                Credentials Copied!
              </>
            ) : (
              <>
                <Copy style={{ width: '20px', height: '20px' }} />
                Copy All Credentials
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              backgroundColor: '#4b5563',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
