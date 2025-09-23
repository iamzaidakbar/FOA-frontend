import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import CustomModal from "../components/Modal";

const SignIn = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      type="login"
      title="Login your account"
      subTitle={"Enter your email below to create your account"}
    >
      <LoginForm />
    </CustomModal>
  );
};

export default SignIn;
