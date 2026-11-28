import { useState, useEffect, useCallback, useRef } from 'react';
import { apiPatch } from '../../../api.js';

/**
 * Custom hook for GPS tracking during active trips
 * - Requests geolocation permission
 * - Sends location updates every 30 seconds when trip is active
 * - Provides GPS status and error information
 */
export function useGPSTracking(activeTrip) {
  const [gpsStatus, setGpsStatus] = useState('inactive'); // inactive, requesting, active, error, denied
  const [gpsError, setGpsError] = useState('');
  const [lastUpdate, setLastUpdate] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  
  const watchIdRef = useRef(null);
  const updateIntervalRef = useRef(null);
  const lastSentLocationRef = useRef(null);

  // Request permission and start tracking
  const startTracking = useCallback(async () => {
    if (!activeTrip) {
      setGpsStatus('inactive');
      return;
    }

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setGpsError('Geolocation is not supported by your browser');
      return;
    }

    setGpsStatus('requesting');
    setGpsError('');

    try {
      // Request permission by getting current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Permission granted
          setGpsStatus('active');
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          
          // Start watching position
          startWatching();
        },
        (error) => {
          // Permission denied or error
          handleGeolocationError(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      setGpsStatus('error');
      setGpsError('Failed to access GPS: ' + error.message);
    }
  }, [activeTrip]);

  // Start watching position changes
  const startWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      return; // Already watching
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          speed: position.coords.speed,
          heading: position.coords.heading,
        };
        
        setCurrentLocation(newLocation);
        setGpsStatus('active');
      },
      (error) => {
        handleGeolocationError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 5000,
      }
    );

    // Set up interval to send updates every 30 seconds
    updateIntervalRef.current = setInterval(() => {
      sendLocationUpdate();
    }, 30000); // 30 seconds

    // Send initial update immediately
    sendLocationUpdate();
  }, []);

  // Send location update to backend
  const sendLocationUpdate = useCallback(async () => {
    if (!activeTrip || !currentLocation) {
      return;
    }

    // Check if location has changed significantly (more than 10 meters)
    if (lastSentLocationRef.current) {
      const distance = calculateDistance(
        lastSentLocationRef.current.latitude,
        lastSentLocationRef.current.longitude,
        currentLocation.latitude,
        currentLocation.longitude
      );
      
      if (distance < 0.01) {
        // Less than 10 meters, skip update
        return;
      }
    }

    try {
      await apiPatch(`/driver/trips/${activeTrip.id}/location`, {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        accuracy: currentLocation.accuracy,
        speed: currentLocation.speed || null,
        heading: currentLocation.heading || null,
      });

      lastSentLocationRef.current = currentLocation;
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to send location update:', error);
      // Don't set error status, just log it
    }
  }, [activeTrip, currentLocation]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    if (updateIntervalRef.current !== null) {
      clearInterval(updateIntervalRef.current);
      updateIntervalRef.current = null;
    }

    setGpsStatus('inactive');
    setCurrentLocation(null);
    lastSentLocationRef.current = null;
  }, []);

  // Handle geolocation errors
  const handleGeolocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setGpsStatus('denied');
        setGpsError('GPS permission denied. Please enable location access in your browser settings.');
        break;
      case error.POSITION_UNAVAILABLE:
        setGpsStatus('error');
        setGpsError('GPS position unavailable. Check your device settings.');
        break;
      case error.TIMEOUT:
        setGpsStatus('error');
        setGpsError('GPS request timed out. Retrying...');
        // Retry after a delay
        setTimeout(() => {
          if (activeTrip) {
            startTracking();
          }
        }, 5000);
        break;
      default:
        setGpsStatus('error');
        setGpsError('GPS error: ' + error.message);
    }
  };

  // Calculate distance between two coordinates (in kilometers)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  // Effect: Start/stop tracking based on active trip
  useEffect(() => {
    if (activeTrip) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [activeTrip, startTracking, stopTracking]);

  // Effect: Send updates when location changes
  useEffect(() => {
    if (currentLocation && activeTrip && gpsStatus === 'active') {
      sendLocationUpdate();
    }
  }, [currentLocation]);

  return {
    gpsStatus,
    gpsError,
    currentLocation,
    lastUpdate,
    startTracking,
    stopTracking,
  };
}
