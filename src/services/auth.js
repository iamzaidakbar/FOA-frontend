import axiosInstance from "./axiosInstance";

// Login (cookies automatically stored by browser if backend sets them)
export const signin = (credentials) => axiosInstance.post("/auth/signin", credentials);

// Logout (clears cookie server-side)
export const signout = () => axiosInstance.get("/auth/signout");

// send otp to email
export const sendOtp = (email) => axiosInstance.post("/auth/send-otp", { email });

// verify otp
export const verifyOtp = (email, otp) => axiosInstance.post("/auth/verify-otp", { email, otp });

// reset password
export const resetPassword = (email, newPassword) =>
    axiosInstance.post("/auth/reset-password", { email, newPassword });

// Google authentication
export const googleAuth = (token) => axiosInstance.post("/auth/google-auth", { token });