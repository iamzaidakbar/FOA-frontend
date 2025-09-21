import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const Button = ({
  text,
  icon,
  iconPosition = "left",
  loading = false,
  variant ,
  onClick,
  size = "md", // sm | md | lg
  className = "",
  rounded = true,
}) => {
  const isLight = variant === "light";

  const baseClasses =
    `flex items-center justify-center gap-2 ${rounded ? "rounded-xl" : "rounded-none"} font-bold transition-colors duration-200`;

  const lightClasses =
    "bg-white text-black border border-gray-300 hover:bg-gray-100";
  const darkClasses =
    "bg-black text-white border border-black hover:bg-gray-800";

  // size variants
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      disabled={loading}
      className={`cursor-pointer ${className} ${baseClasses} ${sizeClasses[size]} ${
        isLight ? lightClasses : darkClasses
      } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <FaSpinner className={`animate-spin ${size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}`} />
        </motion.div>
      ) : (
        <span className="flex items-center gap-2">
          {icon && iconPosition === "left" && (
            <span className={size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}>
              {icon}
            </span>
          )}
          <span className="h-[20px]">{text}</span>
          {icon && iconPosition === "right" && (
            <span className={size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-lg"}>
              {icon}
            </span>
          )}
        </span>
      )}
    </motion.button>
  );
};

export default Button;
