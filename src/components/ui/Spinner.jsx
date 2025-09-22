import React from "react";
import { motion } from "framer-motion";

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-4",
  lg: "w-10 h-10 border-4",
};

const variantClasses = {
  light: "border-gray-200 border-t-gray-500",
  dark: "border-gray-600 border-t-gray-200",
};

const Spinner = ({ size = "md", variant = "light", className = "" }) => {
  return (
    <motion.div
      className={`rounded-full border-solid border-r-transparent animate-spin ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="loading"
    />
  );
};

export default Spinner;
