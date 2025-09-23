import React, { useState } from "react";
import Button from "./ui/Button";
import { SiGoogle } from "react-icons/si";
import InputField from "./ui/InputField";
import Divider from "./ui/Divider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import RoleSelector from "./RoleSelector";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import UploadImage from "./UploadImage";

const SignupForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [uploadedUrls, setUploadedUrls] = useState([]);
  const { handleSignup, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    photoUrl: "",
    role: "owner",
  });

  const submitForm = async (e) => {
    e.preventDefault();
    const { photoUrl } = formData;
    if (uploadedUrls.length && !photoUrl) {
      formData.photoUrl = uploadedUrls[0];
    }
    const user = await handleSignup(formData);
    dispatch(setUser(user));
    navigate(location.pathname, { replace: true });
  };

  return (
    <form onSubmit={submitForm} className="py-5 mt-7">
      {/* <Button
        className="flex items-center gap-2 my-5 w-full font-thin"
        text="Google"
        variant="light"
        iconPosition="left"
        rounded={false}
        icon={<SiGoogle size={14} />}
      />

      <Divider text="OR SIGN UP WITH" /> */}

      <div className="flex items-start gap-3">
        <InputField
          label="Full Name"
          id="name"
          type="text"
          placeholder="Enter your full name"
          required
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          className="w-full"
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          helperText="We'll never share your email."
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="flex items-start gap-3">
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Create a password"
          required
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full"
        />

        <RoleSelector setRole={(role) => setFormData({ ...formData, role })} />
      </div>

      <InputField
        label="Mobile Number"
        id="mobile"
        type="text"
        placeholder="Enter your mobile number"
        required
        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        className="w-full"
      />

      <UploadImage
        uploadLimit={1}
        className="mb-4"
        setUploadedUrls={setUploadedUrls}
      />

      <Button
        type="submit"
        text="Sign Up"
        loading={loading}
        className="w-full"
        rounded={false}
      />

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
