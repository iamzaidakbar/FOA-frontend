import Toast from "../components/ui/Toast";
import { signup, signin } from "../services/auth";
import { useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleSignup = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signup(formData);
      setUser(response.user);
      Toast.success(response.message || "Signup successful");
      return response.user;
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
      Toast.error(err?.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signin(credentials);
      setUser(response.user);
      Toast.success(response.message || "Login successful");
      return response.user;
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
      Toast.error(err?.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleSignup,
    handleLogin,
  };
};
