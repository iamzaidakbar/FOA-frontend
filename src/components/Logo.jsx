"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = ({ src, size = 60, alt = "Logo", isLogo, logoText, icon }) => {
  return (
    <Link to="/">
      {isLogo ? (
        <motion.img
          src={src}
          alt={alt}
          className="cursor-pointer select-none"
          style={{
            width: size + 10,
            height: size,
            borderRadius: "12px",
            marginTop: "4px",
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9, rotate: -5 }}
          className="flex items-center gap-2 text-xl font-bold text-primary-500 cursor-pointer select-none"
        >
          {icon}
          {logoText}
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
