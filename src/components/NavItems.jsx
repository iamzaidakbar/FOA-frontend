"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const NavItems = ({ items = [], visible = true, className = "" }) => {
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-1">
      <AnimatePresence>
        {visible &&
          items.map((item, i) => {
            const isActive = location.pathname === item.href;

            return (
              <motion.div
                key={item.id}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="relative"
              >
                <Link
                  to={item.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:text-orange-500 hover:bg-orange-50/50"
                    }
                    ${className}
                  `}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-100 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-orange-50 rounded-lg opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            );
          })}
      </AnimatePresence>
    </nav>
  );
};

export default NavItems;
