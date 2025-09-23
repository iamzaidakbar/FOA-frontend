// Geoapify API Configuration
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || import.meta.env.VITE_GEOAPIKEY;
const GEOAPIFY_BASE_URL = 'https://api.geoapify.com/v1';

/**
 * Get coordinates (lat, lng) from city, state, country using Geoapify Geocoding API
 * @param {Object} location - Location object with country, state, city
 * @returns {Promise<Object>} - Returns { lat, lng, address, formatted_address }
 */
export const getCoordinatesFromLocation = async (location) => {
  try {
    if (!location.country || !location.city) {
      throw new Error('Country and city are required');
    }

    if (!GEOAPIFY_API_KEY) {
      throw new Error('Geoapify API key is not configured');
    }

    // Build address string for geocoding
    const addressComponents = [];
    
    if (location.city?.name) {
      addressComponents.push(location.city.name);
    }
    
    if (location.state?.name) {
      addressComponents.push(location.state.name);
    }
    
    if (location.country?.name) {
      addressComponents.push(location.country.name);
    }

    const addressString = addressComponents.join(', ');
    
    // Build Geoapify geocoding URL
    const params = new URLSearchParams({
      text: addressString,
      apiKey: GEOAPIFY_API_KEY,
      limit: 1,
      format: 'json'
    });

    // Add country filter if available
    if (location.country?.iso2) {
      params.append('filter', `countrycode:${location.country.iso2.toLowerCase()}`);
    }

    const response = await fetch(`${GEOAPIFY_BASE_URL}/geocode/search?${params}`);
    
    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No geocoding results found');
    }

    const result = data.results[0];
    
    return {
      lat: result.lat,
      lng: result.lon,
      address: addressString,
      formatted_address: result.formatted,
      place_id: result.place_id
    };
  } catch (error) {
    console.error('Error getting coordinates:', error);
    throw error;
  }
};

/**
 * Format location data for backend
 * @param {Object} locationData - Location data from LocationSelector
 * @param {Object} coordinates - Coordinates from Geoapify
 * @returns {Object} - Formatted location object
 */
export const formatLocationForBackend = (locationData, coordinates) => {
  return {
    country: locationData.country ? {
      id: locationData.country.id,
      name: locationData.country.name,
      iso2: locationData.country.iso2,
      iso3: locationData.country.iso3,
      phonecode: locationData.country.phonecode || "",
      capital: locationData.country.capital || "",
      currency: locationData.country.currency || "",
      emoji: locationData.country.emoji || ""
    } : null,
    state: locationData.state ? {
      id: locationData.state.id,
      name: locationData.state.name,
      iso2: locationData.state.iso2 || ""
    } : null,
    city: locationData.city ? {
      id: locationData.city.id,
      name: locationData.city.name
    } : null,
    location: coordinates ? {
      address: coordinates.formatted_address || coordinates.address,
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat] // [longitude, latitude] for GeoJSON
    } : null
  };
};

/**
 * Get current user location using browser geolocation
 * @returns {Promise<Object>} - Returns { lat, lng }
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Get address from coordinates using Geoapify Reverse Geocoding
 * @param {Object} coordinates - { lat, lng }
 * @returns {Promise<Object>} - Returns address information
 */
export const getAddressFromCoordinates = async (coordinates) => {
  try {
    if (!GEOAPIFY_API_KEY) {
      throw new Error('Geoapify API key is not configured');
    }

    const params = new URLSearchParams({
      lat: coordinates.lat,
      lon: coordinates.lng,
      apiKey: GEOAPIFY_API_KEY,
      format: 'json'
    });

    const response = await fetch(`${GEOAPIFY_BASE_URL}/geocode/reverse?${params}`);
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No reverse geocoding results found');
    }

    const result = data.results[0];
    
    return {
      formatted_address: result.formatted,
      city: result.city,
      state: result.state,
      country: result.country,
      country_code: result.country_code
    };
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    throw error;
  }
};