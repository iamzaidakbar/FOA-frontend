"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/NavItems.scss";

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const NavItems = ({ items = [], visible = true }) => {
  return (
    <div className="nav-items">
      <AnimatePresence>
        {visible &&
          items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="nav-item flex items-center cursor-pointer select-none"
            >
              <Link
                to={item.href}
                className="text-[#181111] text-sm font-medium hover:text-[#000000] transition duration-300"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default NavItems;
