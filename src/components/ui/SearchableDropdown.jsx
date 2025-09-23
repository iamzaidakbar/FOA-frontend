import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchableDropdown = ({
  label,
  placeholder = 'Select an option',
  options = [],
  value,
  onChange,
  disabled = false,
  loading = false,
  error = '',
  searchable = true,
  className = '',
  displayKey = 'name',
  valueKey = 'id',
  searchKeys = ['name'],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter options based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter(option => 
        searchKeys.some(key => 
          option[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredOptions(filtered);
    }
  }, [options, searchTerm, searchKeys]);

  // Reset search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsOpen(!isOpen);
      if (!isOpen && searchable) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const selectedOption = options.find(option => option[valueKey] === value);
  const displayText = selectedOption ? selectedOption[displayKey] : placeholder;

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
          disabled={disabled || loading}
          className={`
            relative w-full bg-white border rounded-md pl-3 pr-10 py-2 text-left cursor-default
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
            ${disabled || loading ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${isOpen ? 'ring-1 ring-blue-500 border-blue-500' : ''}
          `}
        >
          <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
            {loading ? 'Loading...' : displayText}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && !loading && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
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
                    className="w-full pl-8 pr-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="max-h-48 overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  {searchTerm ? 'No results found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option[valueKey]}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                      ${option[valueKey] === value ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                    `}
                  >
                    {option[displayKey]}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default SearchableDropdown;