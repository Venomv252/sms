import React from 'react';
import { X } from 'lucide-react';
import { useTracking } from '../context/TrackingContext.jsx';

/**
 * TrackingToast - Display real-time GPS tracking notifications
 */
export default function TrackingToast() {
  const { notifications, dismissNotification } = useTracking();

  if (notifications.length === 0) return null;

  return (
    <div className="tracking-toast-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`tracking-toast tracking-toast-${notification.type || 'info'}`}
        >
          <div className="tracking-toast-icon">
            {getNotificationIcon(notification.type)}
          </div>
          
          <div className="tracking-toast-content">
            <strong className="tracking-toast-title">{notification.title}</strong>
            <p className="tracking-toast-message">{notification.message}</p>
            {notification.timestamp && (
              <span className="tracking-toast-time">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            )}
          </div>
          
          <button
            onClick={() => dismissNotification(notification.id)}
            className="tracking-toast-close"
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      
      <style>{`
        .tracking-toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 400px;
          pointer-events: none;
        }
        
        .tracking-toast {
          pointer-events: auto;
          display: flex;
          align-items: start;
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-left: 4px solid #16a36a;
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .tracking-toast-approaching_1km {
          border-left-color: #f59e0b;
          background: #fffbeb;
        }
        
        .tracking-toast-approaching_500m {
          border-left-color: #ef4444;
          background: #fef2f2;
        }
        
        .tracking-toast-arrived {
          border-left-color: #16a36a;
          background: #f0fdf4;
        }
        
        .tracking-toast-icon {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
        }
        
        .tracking-toast-content {
          flex: 1;
          min-width: 0;
        }
        
        .tracking-toast-title {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        
        .tracking-toast-message {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
          line-height: 1.4;
        }
        
        .tracking-toast-time {
          display: block;
          font-size: 11px;
          color: #9ca3af;
          margin-top: 4px;
        }
        
        .tracking-toast-close {
          flex-shrink: 0;
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: #9ca3af;
          border-radius: 4px;
          transition: all 0.2s;
        }
        
        .tracking-toast-close:hover {
          background: rgba(0, 0, 0, 0.05);
          color: #1f2937;
        }
        
        @media (max-width: 768px) {
          .tracking-toast-container {
            left: 12px;
            right: 12px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}

function getNotificationIcon(type) {
  switch (type) {
    case 'approaching_1km':
      return '🚌';
    case 'approaching_500m':
      return '⚡';
    case 'arrived':
      return '✅';
    default:
      return '🔔';
  }
}
