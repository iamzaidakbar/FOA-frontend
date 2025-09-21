import React, { use } from "react";
import { Avatar } from "antd";
import { motion } from "framer-motion";
import { LuUserRoundPlus } from "react-icons/lu";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ setIsOpen, setModalType, isLoggedIn = false, user }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="user-profile"
    >
      {isLoggedIn && user ? (
        <Avatar
          src={user.avatar}
          alt={user.name}
          size="large"
          style={{ cursor: "pointer" }}
        />
      ) : (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="cursor-pointer">
         <Button onClick={() => {navigate("/?signin=true")}} text="Login" variant="light" size="sm"  iconPosition="right" icon={<LuUserRoundPlus size={24} />} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserProfile;
