import Logo from "../Logo.jsx";
import logo from "../../assets/logo.jpg";
import UserProfile from "../UserProfile.jsx";
import NavItems from "../NavItems";
import SearchInput from "../ui/SearchInput.jsx";
import { NAV_ITEMS } from "../../constants";
import { GiBulb } from "react-icons/gi";
import { Badge } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const UserNavbar = ({setIsOpen, setModalType}) => {
  const {user} = useSelector((store) => store?.user);
  
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center w-full h-16 px-10 py-1 bg-white border-b border-gray-200 gap-6"
    >
      <motion.div className="flex items-center gap-6 w-full">
        <Logo
          size={40}
          src={logo}
          alt="Logo"
          icon={<GiBulb color="red" size={24} />}
          logoText="Foodie"
        />
        <NavItems items={NAV_ITEMS} visible={true} />
      </motion.div>
      <motion.div className="flex items-center gap-6 w-full justify-end">
        <SearchInput
          placeholder="Search for restaurants or dishes..."
          iconPosition="left"
        />
        <Badge count={5}>
          <IoCartOutline
            size={28}
            className="cursor-pointer hover:text-gray-700 transition duration-300"
          />
        </Badge>
        <UserProfile setIsOpen={setIsOpen} setModalType={setModalType} isLoggedIn={!!user} user={user} />
      </motion.div>
    </motion.div>
  );
};

export default UserNavbar;
