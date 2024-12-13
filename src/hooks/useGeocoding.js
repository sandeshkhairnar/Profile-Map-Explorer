import { useState, useCallback } from 'react';
import * as MapService from '../services/mapService';

export const useGeocoding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCoordinates = useCallback(async (address) => {
    setLoading(true);
    setError(null);
    
    try {
      const coordinates = await MapService.geocodeAddress(address);
      setLoading(false);
      return coordinates;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const getAddress = useCallback(async (lat, lng) => {
    setLoading(true);
    setError(null);
    
    try {
      const address = await MapService.reverseGeocode(lat, lng);
      setLoading(false);
      return address;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  const calculateDistance = useCallback((lat1, lng1, lat2, lng2) => {
    return MapService.calculateDistance(lat1, lng1, lat2, lng2);
  }, []);

  return {
    getCoordinates,
    getAddress,
    calculateDistance,
    loading,
    error
  };
};

// Export utility functions if needed
export const { geocodeAddress, reverseGeocode } = MapService;