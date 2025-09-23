import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import UserNavbar from "../components/Navbar/UserNavbar";
import Footer from "../components/Footer";
import CustomModal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useState, useEffect } from "react";
import { ToastContainer } from "../components/ui/Toast";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" or "signup"
  const location = useLocation();
  const navigate = useNavigate();

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
    // Clean up URL parameters when modal is closed
    navigate("/", { replace: true });
  };

  return (
    <>
      <UserNavbar setIsOpen={setIsOpen} setModalType={setModalType} />
      <main className="pt-16 min-h-screen">
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
    </>
  );
}

export default App;
