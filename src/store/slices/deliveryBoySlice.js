import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const deliveryBoySlice = createSlice({
  name: "deliveryBoy",
  initialState: {
    deliveryBoy: null,
    loading: false,
    error: null,
  },
  reducers: {
    setDeliveryBoy: (state, action) => {
      state.deliveryBoy = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("token");
    },
  },
});

export const { setDeliveryBoy, setLoading, setError, logout } = deliveryBoySlice.actions;
export default deliveryBoySlice.reducer;
