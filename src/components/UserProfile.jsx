import React from "react";
import { motion } from "framer-motion";
import { HiOutlineUser } from "react-icons/hi2";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "./ui/Avatar";

const UserProfile = ({ isLoggedIn = false, user }) => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/?signin=true");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      {isLoggedIn && user ? (
        <div className="flex items-center space-x-3">
          {/* User Name Display (hidden on small screens) */}
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium text-gray-800 capitalize">
              {user?.fullName || "User"}
            </div>
            <div className="text-xs text-gray-500 capitalize">
              {user?.role || "Customer"}
            </div>
          </div>

          {/* Avatar with built-in dropdown */}
          <Avatar user={user} size="sm" />
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center"
        >
          <Button
            onClick={handleSignInClick}
            text="Sign In"
            variant="gradient"
            size="sm"
            iconPosition="left"
            icon={<HiOutlineUser size={18} />}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserProfile;
