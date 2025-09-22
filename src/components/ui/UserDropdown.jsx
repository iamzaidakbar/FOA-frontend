import { LuUserRoundPen } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/auth";
import { logout } from "../../store/slices/userSlice";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const { handleSignout } = useAuth();

  const signOut = async () => {
    await handleSignout();
    dispatch(logout());
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="  shadow-lg bg-white ring-1 ring-black/5 z-50"
    >
      <ul className=" text-sm text-gray-700">
        <li className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
          <LuUserRoundPen size={16} className="text-gray-600" />
          <span className="font-medium hover:text-gray-900">Profile</span>
        </li>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        <li className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
          <RiLogoutCircleLine
            size={16}
            color="black"
            className="text-gray-600 "
          />
          <span
            onClick={() => signOut()}
            className="font-medium hover:text-gray-900"
          >
            Logout
          </span>
        </li>
      </ul>
    </motion.div>
  );
};

export default UserDropdown;
