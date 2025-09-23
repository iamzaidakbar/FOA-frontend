import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import Spinner from "./Spinner";

const Button = ({
  text,
  icon,
  iconPosition = "left",
  loading = false,
  variant = "dark",
  onClick,
  size = "md", // sm | md | lg
  className = "",
  rounded = true,
  disabled = false,
}) => {
  const isLight = variant === "light";
  const isGradient = variant === "gradient";

  const baseClasses = `flex items-center justify-center gap-2 ${
    rounded ? "rounded-xl" : "rounded-none"
  } font-medium transition-all duration-200 border`;

  const lightClasses =
    "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400";
  const darkClasses =
    "bg-gray-900 text-white border-gray-900 hover:bg-gray-800";
  const gradientClasses =
    "bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl";

  // size variants
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const getVariantClasses = () => {
    if (isGradient) return gradientClasses;
    if (isLight) return lightClasses;
    return darkClasses;
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${getVariantClasses()}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {loading ? (
        <Spinner
          size="sm"
          variant={isGradient || !isLight ? "light" : "dark"}
        />
      ) : (
        <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && (
            <span
              className={
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-xl"
                  : "text-base"
              }
            >
              {icon}
            </span>
          )}
          <span>{text}</span>
          {icon && iconPosition === "right" && (
            <span
              className={
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-xl"
                  : "text-base"
              }
            >
              {icon}
            </span>
          )}
        </span>
      )}
    </motion.button>
  );
};

export default Button;
