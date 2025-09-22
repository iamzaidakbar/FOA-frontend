import React from "react";
import Button from "./ui/Button";
import { SiGoogle } from "react-icons/si";
import InputField from "./ui/InputField";
import Divider from "./ui/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin, loading } = useAuth();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await handleLogin(formData);
    dispatch(setUser(user));
    navigate(location.pathname, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        className="flex items-center gap-2 my-5 w-full font-thin"
        text="Google"
        variant="light"
        iconPosition="left"
        rounded={false}
        icon={<SiGoogle size={14} />}
      />

      <Divider text="OR CONTINUE WITH" />

      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll never share your email."
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter your password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <Button
        type="submit"
        text="Login"
        loading={loading}
        className="w-full"
        rounded={false}
      />

      <div className="flex items-center justify-between">
        <p className="text-gray-500 font-thin mt-3 text-[10px] letter-spacing-2">
          Already a member?
          <span
            className="font-semibold text-black cursor-pointer px-1"
            onClick={() => navigate("/?signup=true")}
          >
            Sign Up
          </span>
        </p>

        <p className="text-gray-500 font-thin mt-3 text-[10px] letter-spacing-2">
          Forgot your password?
          <span
            className="font-semibold text-black cursor-pointer px-1"
            onClick={() => navigate("/?reset=true")}
          >
            Reset Password
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
