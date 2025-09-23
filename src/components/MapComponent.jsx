import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getCurrentLocation, getAddressFromCoordinates } from '../services/geoapifyService';
import { MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom component to update map view when coordinates change
const MapUpdater = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 15);
    }
  }, [coordinates, map]);
  
  return null;
};

const MapComponent = ({ 
  coordinates = null, 
  height = '300px',
  className = '',
  showCurrentLocationButton = true,
  onLocationChange = null,
  loading = false
}) => {
  const [mapError, setMapError] = useState(null);
  const [locatingUser, setLocatingUser] = useState(false);
  
  // Default center (Delhi, India)
  const defaultCenter = [28.6139, 77.2090];
  const center = coordinates ? [coordinates.lat, coordinates.lng] : defaultCenter;
  const zoom = coordinates ? 15 : 5;

  // Geoapify API key
  const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || import.meta.env.VITE_GEOAPIKEY;

  // Handle current location
  const handleCurrentLocation = async () => {
    try {
      setLocatingUser(true);
      setMapError(null);
      
      const userLocation = await getCurrentLocation();
      
      // Get address information for the current location
      try {
        const addressInfo = await getAddressFromCoordinates(userLocation);
        userLocation.address = addressInfo.formatted_address;
      } catch (error) {
        console.warn('Could not get address for current location:', error);
      }

      // Notify parent component
      if (onLocationChange) {
        onLocationChange(userLocation);
      }
    } catch (error) {
      console.error('Failed to get current location:', error);
      setMapError('Unable to access your location. Please check permissions.');
    } finally {
      setLocatingUser(false);
    }
  };

  if (mapError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}
      >
        <GlobeAltIcon className="h-12 w-12 text-red-400 mx-auto mb-3" />
        <p className="text-red-700 text-sm">{mapError}</p>
        <button
          onClick={() => setMapError(null)}
          className="mt-3 text-xs text-red-600 hover:text-red-800 underline"
        >
          Try again
        </button>
      </motion.div>
    );
  }

  if (!GEOAPIFY_API_KEY) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center ${className}`}
      >
        <GlobeAltIcon className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
        <p className="text-yellow-700 text-sm">
          Geoapify API key is not configured. Please add VITE_GEOAPIFY_API_KEY to your environment variables.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {/* Map Container */}
      <div style={{ height }} className="w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
        
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
          />
          
          {coordinates && (
            <Marker position={[coordinates.lat, coordinates.lng]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-medium">Selected Location</p>
                  <p className="text-gray-600">
                    {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
          
          <MapUpdater coordinates={coordinates} />
        </MapContainer>
      </div>

      {/* Current Location Button */}
      {showCurrentLocationButton && !loading && (
        <button
          onClick={handleCurrentLocation}
          disabled={locatingUser}
          className="absolute top-3 right-3 bg-white shadow-lg border border-gray-300 rounded-lg p-2 hover:bg-gray-50 focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors duration-200 z-10"
          title="Get current location"
        >
          <MapPinIcon 
            className={`h-5 w-5 text-gray-600 ${locatingUser ? 'animate-pulse' : ''}`} 
          />
        </button>
      )}

      {/* Location Info */}
      {coordinates && !loading && (
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200 z-10">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Coordinates:</span>{' '}
            {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MapComponent;