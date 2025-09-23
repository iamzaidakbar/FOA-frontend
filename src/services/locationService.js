import axios from 'axios';

const API_BASE_URL = 'https://api.countrystatecity.in/v1';
const API_KEY = import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY || 'YOUR_API_KEY_HERE';

// Configure axios instance for CountryStateCity API
const cscApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-CSCAPI-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all countries
 * @returns {Promise<Array>} Array of countries with id, name, iso2, iso3, phonecode, etc.
 */
export const fetchCountries = async () => {
  try {
    const response = await cscApi.get('/countries');
    return response.data.map(country => ({
      id: country.id,
      name: country.name,
      iso2: country.iso2,
      iso3: country.iso3,
      phonecode: country.phonecode,
      capital: country.capital,
      currency: country.currency,
      emoji: country.emoji,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries. Please try again later.');
  }
};

/**
 * Fetch all states for a specific country
 * @param {string} countryIso2 - ISO2 code of the country (e.g., "IN", "US")
 * @returns {Promise<Array>} Array of states with id, name, and iso2
 */
export const fetchStates = async (countryIso2) => {
  if (!countryIso2) {
    throw new Error('Country ISO2 code is required');
  }

  try {
    const response = await cscApi.get(`/countries/${countryIso2}/states`);
    return response.data.map(state => ({
      id: state.id,
      name: state.name,
      iso2: state.iso2,
    }));
  } catch (error) {
    console.error(`Error fetching states for country ${countryIso2}:`, error);
    if (error.response?.status === 404) {
      throw new Error('No states found for the selected country.');
    }
    throw new Error('Failed to fetch states. Please try again later.');
  }
};

/**
 * Fetch all cities for a specific state in a country
 * @param {string} countryIso2 - ISO2 code of the country (e.g., "IN", "US")
 * @param {string} stateIso2 - ISO2 code of the state (e.g., "MH", "CA")
 * @returns {Promise<Array>} Array of cities with id and name
 */
export const fetchCities = async (countryIso2, stateIso2) => {
  if (!countryIso2 || !stateIso2) {
    throw new Error('Both country and state ISO2 codes are required');
  }

  try {
    const response = await cscApi.get(`/countries/${countryIso2}/states/${stateIso2}/cities`);
    return response.data.map(city => ({
      id: city.id,
      name: city.name,
    }));
  } catch (error) {
    console.error(`Error fetching cities for ${countryIso2}/${stateIso2}:`, error);
    if (error.response?.status === 404) {
      throw new Error('No cities found for the selected state.');
    }
    throw new Error('Failed to fetch cities. Please try again later.');
  }
};

/**
 * Search countries by name
 * @param {Array} countries - Array of all countries
 * @param {string} searchTerm - Search term to filter countries
 * @returns {Array} Filtered array of countries
 */
export const searchCountries = (countries, searchTerm) => {
  if (!searchTerm) return countries;
  
  const term = searchTerm.toLowerCase();
  return countries.filter(country => 
    country.name.toLowerCase().includes(term) ||
    country.iso2.toLowerCase().includes(term) ||
    country.iso3.toLowerCase().includes(term)
  );
};

/**
 * Search states by name
 * @param {Array} states - Array of all states
 * @param {string} searchTerm - Search term to filter states
 * @returns {Array} Filtered array of states
 */
export const searchStates = (states, searchTerm) => {
  if (!searchTerm) return states;
  
  const term = searchTerm.toLowerCase();
  return states.filter(state => 
    state.name.toLowerCase().includes(term) ||
    state.iso2.toLowerCase().includes(term)
  );
};

/**
 * Search cities by name
 * @param {Array} cities - Array of all cities
 * @param {string} searchTerm - Search term to filter cities
 * @returns {Array} Filtered array of cities
 */
export const searchCities = (cities, searchTerm) => {
  if (!searchTerm) return cities;
  
  const term = searchTerm.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(term)
  );
};