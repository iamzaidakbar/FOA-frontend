import React from "react";
import Button from "./ui/Button";
import { SiGoogle } from "react-icons/si";
import InputField from "./ui/InputField";
import Divider from "./ui/Divider";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <form>
      <Button
        className="flex items-center gap-2 my-5 w-full font-thin"
        text="Google"
        variant="light"
        iconPosition="left"
        rounded={false}
        icon={<SiGoogle size={14} />}
      />

      <Divider text="OR SIGN UP WITH" />

      <InputField
        label="Full Name"
        id="name"
        type="text"
        placeholder="Enter your full name"
        required
      />

      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll never share your email."
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Create a password"
        required
      />

      <Button text="Sign Up" className="w-full" rounded={false} />

      <p className="text-gray-500 font-thin mt-3 text-[10px] letter-spacing-2">
        Already a member? 
        <span
          className="font-semibold text-black cursor-pointer px-1"
          onClick={() => navigate("/?signin=true")}
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignupForm;
