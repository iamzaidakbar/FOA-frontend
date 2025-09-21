import CustomModal from "@/components/Modal";
import SignupForm from "@/components/SignupForm";
import React from "react";

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CustomModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      type="login"
      title="Login your account"
      subTitle={"Enter your email below to create your account"}
    >
      <SignupForm />
    </CustomModal>
  );
};

export default SignUp;
