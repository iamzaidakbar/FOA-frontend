import { LuUserRoundPen, LuStar } from "react-icons/lu";
import {
  RiLogoutCircleLine,
  RiShieldCheckLine,
  RiQuestionLine,
} from "react-icons/ri";
import { HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi2";
import { IoNotificationsOutline, IoLocationOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../hooks/auth";
import { logout } from "../../store/slices/userSlice";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const { handleSignout } = useAuth();
  const { user } = useSelector((store) => store?.user);

  const signOut = async () => {
    await handleSignout();
    dispatch(logout());
  };
  const menuItems = [
    {
      section: "Account",
      items: [
        {
          icon: <LuUserRoundPen size={18} />,
          label: "Profile",
          description: "Manage your account",
          color: "text-blue-600",
          hoverColor: "hover:bg-blue-50",
          action: () => console.log("Profile clicked"),
        },
        {
          icon: <RiShieldCheckLine size={18} />,
          label: "Account Settings",
          description: "Privacy and security",
          color: "text-green-600",
          hoverColor: "hover:bg-green-50",
          action: () => console.log("Settings clicked"),
        },
        {
          icon: <IoLocationOutline size={18} />,
          label: "Addresses",
          description: "Manage delivery locations",
          color: "text-purple-600",
          hoverColor: "hover:bg-purple-50",
          action: () => console.log("Addresses clicked"),
        },
      ],
    },
    {
      section: "Activity",
      items: [
        {
          icon: <HiOutlineShoppingBag size={18} />,
          label: "Orders",
          description: "View order history",
          color: "text-orange-600",
          hoverColor: "hover:bg-orange-50",
          action: () => console.log("Orders clicked"),
        },
        {
          icon: <HiOutlineHeart size={18} />,
          label: "Favorites",
          description: "Your favorite restaurants",
          color: "text-red-600",
          hoverColor: "hover:bg-red-50",
          action: () => console.log("Favorites clicked"),
        },
        {
          icon: <LuStar size={18} />,
          label: "Reviews",
          description: "Your ratings & reviews",
          color: "text-yellow-600",
          hoverColor: "hover:bg-yellow-50",
          action: () => console.log("Reviews clicked"),
        },
      ],
    },
    {
      section: "Support",
      items: [
        {
          icon: <IoNotificationsOutline size={18} />,
          label: "Notifications",
          description: "Manage notifications",
          color: "text-indigo-600",
          hoverColor: "hover:bg-indigo-50",
          action: () => console.log("Notifications clicked"),
        },
        {
          icon: <RiQuestionLine size={18} />,
          label: "Help & Support",
          description: "Get help and contact us",
          color: "text-teal-600",
          hoverColor: "hover:bg-teal-50",
          action: () => console.log("Help clicked"),
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 0.2, 1],
        staggerChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      rotateX: -15,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[9999]"
    >
      {/* Header with user info */}
      <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white z-[9999]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center space-x-3"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
            {user?.fullName?.charAt(0)?.toUpperCase() || "ZA"}
          </div>
          <div>
            <h3 className="font-semibold text-lg">
              {user?.fullName || "User"}{" "}
              <small className="font-thin">({user?.role || "user"})</small>
            </h3>
            <p className="text-orange-100 text-sm">{user?.email || "N/A"}</p>
          </div>
        </motion.div>
      </div>

      {/* Menu sections */}
      <div className="py-2 h-[60vh] overflow-y-auto z-[9999]">
        {menuItems.map((section, sectionIndex) => (
          <motion.div
            key={section.section}
            variants={itemVariants}
            className="mb-2"
          >
            {/* Section header */}
            <div className="px-6 py-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {section.section}
              </h4>
            </div>

            {/* Section items */}
            <div className="space-y-1 px-2">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className={`
                    flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl cursor-pointer 
                    transition-all duration-200 group
                    ${item.hoverColor} hover:shadow-sm
                  `}
                >
                  <div
                    className={`${item.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600">
                      {item.description}
                    </p>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-gray-400"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Section divider */}
            {sectionIndex < menuItems.length - 1 && (
              <div className="mx-6 my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            )}
          </motion.div>
        ))}

        {/* Logout section */}
        <motion.div
          variants={itemVariants}
          className="mt-4 pt-3 border-t border-gray-100"
        >
          <motion.div
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={signOut}
            className="flex items-center space-x-3 px-6 py-3 mx-2 rounded-xl cursor-pointer transition-all duration-200 group hover:bg-red-50"
          >
            <div className="text-red-600 group-hover:scale-110 transition-transform duration-200">
              <RiLogoutCircleLine size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-600 group-hover:text-red-700">
                Sign Out
              </p>
              <p className="text-xs text-red-400 group-hover:text-red-500">
                Logout from your account
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer with version */}
      <motion.div
        variants={itemVariants}
        className="px-6 py-3 bg-gray-50 border-t border-gray-100"
      >
        <p className="text-xs text-gray-400 text-center">Foodie App v2.1.0</p>
      </motion.div>
    </motion.div>
  );
};

export default UserDropdown;
