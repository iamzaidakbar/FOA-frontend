import axiosInstance from "./axiosInstance";

export const getMyProfile = () => axiosInstance.get("/user/current");