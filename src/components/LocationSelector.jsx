import React, { useState, useEffect, useCallback, useRef } from "react";
import SearchableDropdown from "./ui/SearchableDropdown";
import {
  fetchCountries,
  fetchStates,
  fetchCities,
} from "../services/locationService";
import { motion } from "framer-motion";

const LocationSelector = ({
  value = {},
  onChange,
  className = "",
  disabled = false,
  required = false,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [errors, setErrors] = useState({
    country: "",
    state: "",
    city: "",
  });

  // Initialize with value prop
  const [selectedCountry, setSelectedCountry] = useState(value.countryId || "");
  const [selectedState, setSelectedState] = useState(value.stateId || "");
  const [selectedCity, setSelectedCity] = useState(value.cityId || "");

  // Track if this is the first render to avoid unnecessary onChange calls
  const isInitialRender = useRef(true);

  // Load countries on component mount
  useEffect(() => {
    loadCountries();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.id === selectedCountry);
      if (country) {
        loadStates(country.iso2);
      }
    } else {
      setStates([]);
      setSelectedState("");
      setSelectedCity("");
    }
  }, [selectedCountry, countries]);

  // Load cities when state changes
  useEffect(() => {
    if (selectedState && selectedCountry) {
      const country = countries.find((c) => c.id === selectedCountry);
      const state = states.find((s) => s.id === selectedState);
      if (country && state) {
        loadCities(country.iso2, state.iso2);
      }
    } else {
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry, countries, states]);

  // Notify parent component of changes
  useEffect(() => {
    // Skip the initial render to avoid unnecessary onChange calls
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const locationData = {
      countryId: selectedCountry,
      stateId: selectedState,
      cityId: selectedCity,
      country: countries.find((c) => c.id === selectedCountry),
      state: states.find((s) => s.id === selectedState),
      city: cities.find((c) => c.id === selectedCity),
    };

    if (onChange) {
      onChange(locationData);
    }
  }, [selectedCountry, selectedState, selectedCity, countries, states, cities]); // Removed onChange from dependency array

  const loadCountries = useCallback(async () => {
    setLoadingCountries(true);
    setErrors((prev) => ({ ...prev, country: "" }));

    try {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    } catch (error) {
      setErrors((prev) => ({ ...prev, country: error.message }));
      console.error("Failed to load countries:", error);
    } finally {
      setLoadingCountries(false);
    }
  }, []);

  const loadStates = useCallback(async (countryIso2) => {
    setLoadingStates(true);
    setErrors((prev) => ({ ...prev, state: "" }));
    setStates([]);
    setSelectedState("");

    try {
      const statesData = await fetchStates(countryIso2);
      setStates(statesData);
    } catch (error) {
      setErrors((prev) => ({ ...prev, state: error.message }));
      console.error("Failed to load states:", error);
    } finally {
      setLoadingStates(false);
    }
  }, []);

  const loadCities = useCallback(async (countryIso2, stateIso2) => {
    setLoadingCities(true);
    setErrors((prev) => ({ ...prev, city: "" }));
    setCities([]);
    setSelectedCity("");

    try {
      const citiesData = await fetchCities(countryIso2, stateIso2);
      setCities(citiesData);
    } catch (error) {
      setErrors((prev) => ({ ...prev, city: error.message }));
      console.error("Failed to load cities:", error);
    } finally {
      setLoadingCities(false);
    }
  }, []);

  const handleCountryChange = (country) => {
    setSelectedCountry(country ? country.id : "");
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
    setErrors({ country: "", state: "", city: "" });
  };

  const handleStateChange = (state) => {
    setSelectedState(state ? state.id : "");
    setSelectedCity("");
    setCities([]);
    setErrors((prev) => ({ ...prev, state: "", city: "" }));
  };

  const handleCityChange = (city) => {
    setSelectedCity(city ? city.id : "");
    setErrors((prev) => ({ ...prev, city: "" }));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SearchableDropdown
          label={`Country ${required ? "*" : ""}`}
          placeholder="Search country"
          options={countries}
          value={selectedCountry}
          onChange={handleCountryChange}
          disabled={disabled}
          loading={loadingCountries}
          error={errors.country}
          searchable={true}
          displayKey="name"
          valueKey="id"
          searchKeys={["name", "iso2", "iso3"]}
          showFlags={true}
          flagKey="emoji"
          className="w-full"
        />
      </motion.div>

      {/* State Selector */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <SearchableDropdown
            label={`State/Province ${required ? "*" : ""}`}
            placeholder={
              selectedCountry
                ? "Select your state/province"
                : "Please select a country first"
            }
            options={states}
            value={selectedState}
            onChange={handleStateChange}
            disabled={disabled || !selectedCountry}
            loading={loadingStates}
            error={errors.state}
            searchable={true}
            displayKey="name"
            valueKey="id"
            searchKeys={["name", "iso2"]}
            className="w-full"
          />
        </motion.div>
      )}

      {/* City Selector */}
      {selectedState && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <SearchableDropdown
            label={`City ${required ? "*" : ""}`}
            placeholder={
              selectedState ? "Select your city" : "Please select a state first"
            }
            options={cities}
            value={selectedCity}
            onChange={handleCityChange}
            disabled={disabled || !selectedState}
            loading={loadingCities}
            error={errors.city}
            searchable={true}
            displayKey="name"
            valueKey="id"
            searchKeys={["name"]}
            className="w-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default LocationSelector;
