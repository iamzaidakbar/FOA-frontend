import Toast from "../components/ui/Toast";
import { getMyProfile } from "../services/profile";
import { useState } from "react";

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchMyProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMyProfile();
      setUser(response);
      Toast.success("Profile fetched successfully");
      return response;
    } catch (err) {
      setError("Failed to fetch profile");
      Toast.error("Failed to fetch profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return {
    user,
    loading,
    error,
    fetchMyProfile,
  };
};
