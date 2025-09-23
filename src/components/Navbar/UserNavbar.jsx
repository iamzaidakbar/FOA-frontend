import Logo from "../Logo.jsx";
import logo from "../../assets/logo.jpg";
import UserProfile from "../UserProfile.jsx";
import NavItems from "../NavItems";
import SearchInput from "../ui/SearchInput.jsx";
import LocationDisplay from "../ui/LocationDisplay.jsx";
import { NAV_ITEMS } from "../../constants";
import { GiBulb } from "react-icons/gi";
import { Badge } from "antd";
import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const UserNavbar = ({ setIsOpen, setModalType }) => {
  const { user } = useSelector((store) => store?.user);

  const handleLocationClick = () => {
    // Open location selector modal or navigate to location settings
    console.log("Location clicked - open location selector");
  };

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-300"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-8"
          >
            {/* Enhanced Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <Logo
                size={42}
                src={logo}
                alt="Foodie Logo"
                icon={
                  <HiOutlineSparkles className="text-orange-500" size={20} />
                }
                logoText="Foodie"
                className="font-bold text-xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
              />
            </motion.div>

            {/* Navigation Items */}
            <motion.div variants={itemVariants} className="hidden md:flex">
              <NavItems
                items={NAV_ITEMS}
                visible={true}
                className="font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200"
              />
            </motion.div>
          </motion.div>

          {/* Center Section - Location Display */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex flex-1 justify-center max-w-md mx-8"
          >
            <LocationDisplay
              user={user}
              onClick={handleLocationClick}
              className="bg-gray-50/80 hover:bg-gray-100/80 min-w-[200px] justify-center"
              showDropdownIcon={false}
            />
          </motion.div>

          {/* Right Section - Search, Actions & Profile */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-4"
          >
            {/* Search Input */}
            <div className="hidden md:block">
              <SearchInput
                placeholder="Search restaurants, dishes..."
                iconPosition="left"
                className="w-64 bg-gray-50/80 border-gray-200/60 "
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
              >
                <IoNotificationsOutline size={22} />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>

              {/* Cart with Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Badge
                  count={5}
                  size="small"
                  className="[&_.ant-badge-count]:bg-orange-500 [&_.ant-badge-count]:border-white"
                >
                  <button className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200">
                    <IoCartOutline size={22} />
                  </button>
                </Badge>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-gray-200"></div>

            {/* User Profile */}
            <motion.div variants={itemVariants}>
              <UserProfile
                setIsOpen={setIsOpen}
                setModalType={setModalType}
                isLoggedIn={!!user}
                user={user}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Location Display */}
        <motion.div variants={itemVariants} className="lg:hidden pb-3 pt-1">
          <LocationDisplay
            user={user}
            onClick={handleLocationClick}
            className="bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/60 w-full justify-start shadow-sm"
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default UserNavbar;
