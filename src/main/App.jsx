import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.scss";
import UserNavbar from "../components/UserNavbar";
import CustomModal from "../components/Modal";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useState, useEffect } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // "login" or "signup"
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.get('signin') === 'true') {
      setModalType("login");
      setIsOpen(true);
    } else if (searchParams.get('signup') === 'true') {
      setModalType("signup");
      setIsOpen(true);
    }
  }, [location.search]);

  const handleCloseModal = () => {
    setIsOpen(false);
    // Clean up URL parameters when modal is closed
    navigate('/', { replace: true });
  };

  return (
    <>
      <UserNavbar setIsOpen={setIsOpen} setModalType={setModalType} />
      <Outlet />

      <CustomModal 
        isOpen={isOpen} 
        setIsOpen={handleCloseModal} 
        type={modalType} 
        title={modalType === "login" ? "Login your account" : "Create your account"} 
        subTitle={modalType === "login" ? "Enter your credentials to login" : "Enter your details to create your account"}
      >
        {modalType === "login" ? <LoginForm setModalType={setModalType} /> : <SignupForm setModalType={setModalType} />}
      </CustomModal>
    </>
  );
}

export default App;
