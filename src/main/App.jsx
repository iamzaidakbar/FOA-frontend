import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import UserNavbar from "../components/Navbar/UserNavbar";
import Footer from "../components/Footer";
import CustomModal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useState, useEffect } from "react";
import { ToastContainer } from "../components/ui/Toast";
import { useProfile } from "../hooks/profile";
import { setUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { fetchMyProfile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" or "signup"

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.get("signin") === "true") {
      setModalType("login");
      setIsOpen(true);
    } else if (searchParams.get("signup") === "true") {
      setModalType("signup");
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location.search]);

  const handleCloseModal = () => {
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  // Fetch current user profile on app load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await fetchMyProfile();
        dispatch(setUser(user));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f5f5]">
      <UserNavbar setIsOpen={setIsOpen} setModalType={setModalType} />
      <main className="">
        <Outlet />
      </main>
      <Footer />

      <CustomModal
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
        type={modalType}
      >
        {modalType === "login" ? (
          <LoginForm setModalType={setModalType} />
        ) : (
          <SignupForm setModalType={setModalType} />
        )}
      </CustomModal>

      <ToastContainer />
    </div>
  );
}

export default App;
