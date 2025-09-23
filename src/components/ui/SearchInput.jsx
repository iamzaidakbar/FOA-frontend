import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlineMicrophone } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SearchInput = ({
  iconPosition = "left",
  placeholder = "Search...",
  className = "",
  onSearch = null,
  showVoiceSearch = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;

    setLoading(true);
    if (onSearch) {
      onSearch(searchValue);
    }

    // Simulate search delay
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleVoiceSearch = () => {
    console.log("Voice search activated");
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`w-full h-10 border
        relative flex items-center overflow-hidden rounded-full transition-all duration-200 border-gray-300 bg-white ${
          loading && "opacity-50 cursor-not-allowed"
        }
      `}
      >
        {/* Left Icon */}
        {iconPosition === "left" && (
          <div className="absolute left-3 flex items-center pointer-events-none">
            {loading ? (
              <AiOutlineLoading3Quarters className="w-4 h-4 text-orange-500 animate-spin" />
            ) : (
              <HiOutlineSearch className="w-4 h-4 text-gray-400" />
            )}
          </div>
        )}

        {/* Input Field */}
        <input
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full h-10 bg-transparent text-sm text-gray-800 placeholder-gray-500
            focus:outline-none transition-all duration-200
            ${iconPosition === "left" ? "pl-10" : "pl-4"}
            ${iconPosition === "right" || showVoiceSearch ? "pr-12" : "pr-4"}
          `}
        />

        {/* Right Icons */}
        <div className="absolute right-3 flex items-center space-x-2">
          {/* Voice Search */}
          {showVoiceSearch && !loading && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceSearch}
              className="p-1 text-gray-400 hover:text-orange-500 transition-colors duration-200"
            >
              <HiOutlineMicrophone className="w-4 h-4" />
            </motion.button>
          )}

          {/* Right Search Icon */}
          {iconPosition === "right" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSearch}
              disabled={loading || !searchValue.trim()}
              className="p-1 text-gray-400 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <AiOutlineLoading3Quarters className="w-4 h-4 text-orange-500 animate-spin" />
              ) : (
                <HiOutlineSearch className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Search Suggestions Placeholder */}
      {focused && searchValue && !loading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto"
        >
          <div className="p-4 text-sm text-gray-500 text-center">
            Search suggestions will appear here...
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchInput;
