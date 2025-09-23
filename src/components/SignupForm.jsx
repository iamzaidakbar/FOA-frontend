import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import RoleSelector from "./RoleSelector";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import UploadImage from "./UploadImage";
import LocationSelector from "./LocationSelector";
import MapComponent from "./MapComponent";
import { motion } from "framer-motion";

const SignupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [uploadedUrls, setUploadedUrls] = useState([]);
  const { handleSignup, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    photoUrl: "",
    role: "owner",
    country: null,
    state: null,
    city: null,
    location: null,
  });

  
  // Store location coordinates for map display
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const submissionData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      role: formData.role,
      photoUrl: uploadedUrls.length > 0 ? uploadedUrls[0] : formData.photoUrl,
      // Include formatted location data if available
      ...(formData.country && {
        country: formData.country,
        state: formData.state,
        city: formData.city,
        location: formData.location,
      }),
    };

    console.log("Submitting form data:", submissionData);

    try {
      const user = await handleSignup(submissionData);
      dispatch(setUser(user));
      navigate(location.pathname, { replace: true });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleLocationChange = useCallback((locationData) => {
    console.log("Location changed:", locationData);

    // Update form data with formatted backend data
    if (locationData.formattedForBackend) {
      setFormData((prevData) => ({
        ...prevData,
        country: locationData.formattedForBackend.country,
        state: locationData.formattedForBackend.state,
        city: locationData.formattedForBackend.city,
        location: locationData.formattedForBackend.location,
      }));
    }

    // Update coordinates for map display
    if (locationData.coordinates) {
      setLocationCoordinates({
        lat: locationData.coordinates.lat,
        lng: locationData.coordinates.lng,
      });
    } else {
      setLocationCoordinates(null);
    }

    // Update loading state
    setLocationLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Create your account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-600"
          >
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/?signin=true")}
              className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
            >
              Log in
            </button>
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white py-12 px-8 rounded-lg sm:px-16 lg:px-20"
        >
          <form onSubmit={submitForm} className="space-y-8">
            {/* Personal Information Grid */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Enter your username"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </motion.div>

                {/* Mobile Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-1"
                >
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    required
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                </motion.div>
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Location
              </h3>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <LocationSelector
                  value={{
                    countryId: formData.country?.id || "",
                    stateId: formData.state?.id || "",
                    cityId: formData.city?.id || "",
                  }}
                  onChange={handleLocationChange}
                  className="w-full"
                  required={true}
                />
              </motion.div>
            </div>

            {/* Map Section */}
            {(locationCoordinates || locationLoading) && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Location Preview
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <MapComponent
                    coordinates={locationCoordinates}
                    height="300px"
                    loading={locationLoading}
                    showCurrentLocationButton={false}
                    className="w-full"
                  />
                </motion.div>
              </div>
            )}

            {/* Account Settings */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                Account Settings
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Role Selector */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Select Your Role
                  </label>
                  <RoleSelector
                    setRole={(role) => setFormData({ ...formData, role })}
                  />
                </motion.div>

                {/* Upload Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>
                  <UploadImage
                    uploadLimit={1}
                    setUploadedUrls={setUploadedUrls}
                  />
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="pt-6 border-t border-gray-200"
            >
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                Create Account
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupForm;
