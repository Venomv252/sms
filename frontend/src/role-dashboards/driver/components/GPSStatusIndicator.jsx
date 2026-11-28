import React from 'react';
import { Navigation, AlertTriangle, XCircle, Loader } from 'lucide-react';

/**
 * GPS Status Indicator Component
 * Shows current GPS tracking status with visual feedback
 */
export default function GPSStatusIndicator({ gpsStatus, gpsError, lastUpdate, compact = false }) {
  const getStatusConfig = () => {
    switch (gpsStatus) {
      case 'active':
        return {
          icon: Navigation,
          color: 'var(--green-primary)',
          bgColor: '#e6f4f0',
          text: 'GPS Active',
          pulse: true,
        };
      case 'requesting':
        return {
          icon: Loader,
          color: 'var(--blue-primary)',
          bgColor: '#e6f2ff',
          text: 'Requesting GPS...',
          spin: true,
        };
      case 'denied':
        return {
          icon: XCircle,
          color: 'var(--red-alert)',
          bgColor: '#fff5f5',
          text: 'Permission Denied',
          pulse: false,
        };
      case 'error':
        return {
          icon: AlertTriangle,
          color: 'var(--orange)',
          bgColor: '#fff9ed',
          text: 'GPS Error',
          pulse: false,
        };
      case 'inactive':
      default:
        return {
          icon: Navigation,
          color: 'var(--gray-400)',
          bgColor: 'var(--gray-100)',
          text: 'GPS Inactive',
          pulse: false,
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  if (compact) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: config.bgColor,
          fontSize: '11px',
          fontWeight: '600',
          color: config.color,
        }}
      >
        <Icon
          size={12}
          className={config.spin ? 'spin' : config.pulse ? 'pulse' : ''}
        />
        <span>{config.text}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        background: config.bgColor,
        border: `1px solid ${config.color}20`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: config.color + '20',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon
            size={16}
            style={{ color: config.color }}
            className={config.spin ? 'spin' : config.pulse ? 'pulse' : ''}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: config.color,
              marginBottom: '2px',
            }}
          >
            {config.text}
          </div>
          {gpsError && (
            <div style={{ fontSize: '11px', color: 'var(--gray-600)' }}>
              {gpsError}
            </div>
          )}
          {lastUpdate && gpsStatus === 'active' && (
            <div style={{ fontSize: '11px', color: 'var(--gray-600)' }}>
              Last update: {lastUpdate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
