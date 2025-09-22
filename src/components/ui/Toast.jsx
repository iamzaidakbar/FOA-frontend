import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Toast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast(message),
};

export const ToastContainer = () => <Toaster position="top-center" />;

export default Toast;
