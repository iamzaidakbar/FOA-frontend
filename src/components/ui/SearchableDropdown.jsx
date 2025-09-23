import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Empty } from "antd";
import ReactCountryFlag from "react-country-flag";

const SearchableDropdown = ({
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  disabled = false,
  loading = false,
  error = "",
  searchable = true,
  className = "",
  displayKey = "name",
  valueKey = "id",
  searchKeys = ["name"],
  showFlags = false,
  flagKey = "emoji",
  countryCodeKey = "iso2",
  prefixFlag = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Memoize filtered options to prevent infinite re-renders
  const filteredOptions = useMemo(() => {
    if (!searchTerm) {
      return options;
    }
    return options.filter((option) =>
      searchKeys.some((key) =>
        option[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [options, searchTerm, searchKeys]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleToggle = () => {
    if (!disabled) {
      // Removed loading condition - dropdown should open even when loading
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        // Focus immediately without any delay
        setTimeout(() => inputRef.current?.focus(), 1);
      }
    }
  };

  const selectedOption = options.find((option) => option[valueKey] === value);
  const displayText = selectedOption ? selectedOption[displayKey] : placeholder;

  // Helper function to render country flag
  const renderFlag = (option) => {
    if (!showFlags) return null;

    // Try to use react-country-flag with ISO2 code first
    if (option[countryCodeKey]) {
      return (
        <ReactCountryFlag
          countryCode={option[countryCodeKey]}
          svg
          style={{
            width: "1.25rem",
            height: "1rem",
          }}
          title={option[displayKey]}
          className="mr-3"
        />
      );
    }

    // Fallback to emoji flag if available
    if (option[flagKey]) {
      return <span className="mr-3 text-lg">{option[flagKey]}</span>;
    }

    return null;
  };

  // Helper function to render prefix flag (for states/cities)
  const renderPrefixFlag = () => {
    if (!prefixFlag) return null;

    // If prefixFlag is an object with iso2 code
    if (typeof prefixFlag === "object" && prefixFlag.iso2) {
      return (
        <ReactCountryFlag
          countryCode={prefixFlag.iso2}
          svg
          style={{
            width: "1.25rem",
            height: "1rem",
          }}
          title={prefixFlag.name}
          className="mr-3"
        />
      );
    }

    // If prefixFlag is a string (iso2 code)
    if (typeof prefixFlag === "string") {
      return (
        <ReactCountryFlag
          countryCode={prefixFlag}
          svg
          style={{
            width: "1.25rem",
            height: "1rem",
          }}
          className="mr-3"
        />
      );
    }

    return null;
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div ref={dropdownRef} className="relative">
        {/* Main button/input */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled} // Removed loading from disabled condition
          className={`
            relative w-full bg-white border rounded-md pl-3 pr-10 py-3 text-left cursor-default
            focus:outline-none 
            ${
              disabled
                ? "bg-gray-100 cursor-not-allowed"
                : "cursor-pointer hover:border-gray-400"
            }
            ${error ? "border-red-300" : "border-gray-300"}
            ${isOpen ? "border-gray-500" : ""}
            transition-all duration-100 shadow-sm
          `}
        >
          <span className="flex items-center">
            {/* Show prefix flag for states/cities, or item flag for countries */}
            {prefixFlag
              ? renderPrefixFlag()
              : selectedOption && renderFlag(selectedOption)}
            <span
              className={`block truncate ${
                !selectedOption ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {loading ? "Loading..." : displayText}
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-75 ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base border border-gray-200 overflow-hidden focus:outline-none">
            {/* Search input */}
            {searchable && (
              <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="max-h-48 overflow-auto">
              {loading ? (
                // Show Empty component when loading
                <div className="flex justify-center items-center py-8">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Loading options..."
                    className="text-gray-500"
                  />
                </div>
              ) : filteredOptions.length === 0 ? (
                // Show Empty component when no options available
                <div className="flex justify-center items-center py-8">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      searchTerm ? "No results found" : "No options available"
                    }
                    className="text-gray-500"
                  />
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <button
                    key={option[valueKey]}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                        w-full text-left px-3 py-3 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none flex items-center
                        ${
                          option[valueKey] === value
                            ? "bg-blue-50 text-blue-900 border-l-4 border-blue-500"
                            : "text-gray-900"
                        }
                        transition-colors duration-100
                      `}
                  >
                    {/* Show prefix flag for states/cities, or item flag for countries */}
                    {prefixFlag ? renderPrefixFlag() : renderFlag(option)}
                    <span>{option[displayKey]}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SearchableDropdown;
