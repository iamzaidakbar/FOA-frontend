import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ReactCountryFlag from "react-country-flag";
import { getCurrentLocation, getAddressFromCoordinates } from "../../services/geoapifyService";

const LocationDisplay = ({
  user = null,
  className = "",
  onClick = null,
  showDropdownIcon = true,
  refreshLocation = false,
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.location && !currentLocation) {
      detectCurrentLocation();
    }
  }, [user, refreshLocation]);

  const detectCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const coords = await getCurrentLocation();
      const address = await getAddressFromCoordinates(coords);

      setCurrentLocation({
        city: address.city || "Unknown City",
        state: address.state || "Unknown State",
        country: address.country || "Unknown Country",
        countryCode: address.country_code?.toUpperCase() || "US",
        formatted: address.formatted_address || "Current Location",
      });
    } catch (err) {
      console.error("Failed to detect location:", err);
      setError("Location unavailable");
      // Fallback to a default location
      setCurrentLocation({
        city: "Srinagar",
        state: "JK",
        country: "India",
        countryCode: "IN",
        formatted: "Srinagar, JK, India",
      });
    } finally {
      setLoading(false);
    }
  };

  // Use user's location if available, otherwise use detected location
  const displayLocation = user?.location
    ? {
        city: user.city?.name || "Unknown City",
        state: user.state?.name || "Unknown State",
        country: user.country?.name || "Unknown Country",
        countryCode: user.country?.iso2 || "US",
        formatted: `${user.city?.name || "Unknown"}, ${
          user.state?.name || "Unknown"
        }`,
      }
    : currentLocation;

  if (loading) {
    return (
      <motion.div
        className={`flex items-center gap-2 px-3 py-2 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="animate-pulse flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </motion.div>
    );
  }

  if (error && !displayLocation) {
    return (
      <motion.div
        className={`flex items-center gap-2 px-3 py-2 text-gray-500 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <HiOutlineLocationMarker className="w-4 h-4" />
        <span className="text-sm">Location unavailable</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Location Icon */}
      <motion.div
        className="relative"
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <MdLocationOn className="w-5 h-5 text-red-500" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Country Flag */}
      {displayLocation?.countryCode && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ReactCountryFlag
            countryCode={displayLocation.countryCode}
            svg
            style={{
              width: "20px",
              height: "15px",
              borderRadius: "2px",
            }}
            title={displayLocation.country}
          />
        </motion.div>
      )}

      {/* Location Text */}
      <div className="flex-1 min-w-0">
        <motion.div
          className="text-sm font-medium text-gray-800 truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {displayLocation?.city || "Unknown"}
        </motion.div>
        <motion.div
          className="text-xs text-gray-500 truncate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {displayLocation?.state || "Unknown State"}
        </motion.div>
      </div>

      {/* Dropdown Arrow */}
      {showDropdownIcon && (
        <motion.div
          className="flex-shrink-0 text-gray-400 group-hover:text-gray-600"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <MdKeyboardArrowDown className="w-4 h-4" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default LocationDisplay;