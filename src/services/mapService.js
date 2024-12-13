import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

/**
 * Geocode an address to get latitude and longitude
 * @param {string} address - Address to geocode
 * @returns {Promise<{lat: number, lng: number}>} Geocoded coordinates
 */
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    const { results } = response.data;
    if (results.length === 0) {
      throw new Error('Address not found');
    }

    const { lat, lng } = results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

/**
 * Reverse geocode coordinates to get address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} Formatted address
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        latlng: `${lat},${lng}`,
        key: GOOGLE_MAPS_API_KEY
      }
    });

    const { results } = response.data;
    if (results.length === 0) {
      throw new Error('No address found for these coordinates');
    }

    return results[0].formatted_address;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
};

/**
 * Calculate distance between two coordinates
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2)
  ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Angle in degrees
 * @returns {number} Angle in radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};