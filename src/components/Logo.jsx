"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = ({
  src,
  size = 60,
  alt = "Logo",
  isLogo,
  logoText,
  icon,
  textColor = "text-gray-800",
  className = "",
}) => {
  return (
    <Link to="/" className="flex items-center space-x-2 group">
      {isLogo ? (
        <motion.img
          src={src}
          alt={alt}
          className="cursor-pointer select-none rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-200"
          style={{
            width: size + 10,
            height: size,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center space-x-2 cursor-pointer select-none ${className}`}
        >
          {/* Icon with animation */}
          {icon && (
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="text-orange-500"
            >
              {icon}
            </motion.div>
          )}

          {/* Logo Text */}
          {logoText && (
            <motion.span
              className={`text-2xl font-bold ${textColor} bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}
              whileHover={{
                backgroundImage:
                  "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
              }}
            >
              {logoText}
            </motion.span>
          )}
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
