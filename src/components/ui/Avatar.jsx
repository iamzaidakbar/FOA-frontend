import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AvatarButton from "./AvatarButton";
import UserDropdown from "./UserDropdown";

const AvatarMenu = ({ size = "md", user, onLogout, onProfile }) => {
  const [open, setOpen] = useState(false);

  // size classes
  const sizeMap = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  return (
    <div className="relative inline-block">
      {/* Avatar Button */}
      <AvatarButton
        setOpen={setOpen}
        open={open}
        user={user}
        sizeMap={sizeMap}
        size={size}
      />

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed w-[100vw] h-[100vh] inset-0 bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-auto shadow-lg bg-white rounded-2xl z-[9999] overflow-hidden"
          >
            <UserDropdown />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarMenu;
