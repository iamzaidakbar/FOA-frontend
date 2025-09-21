import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    owner: null,
    loading: false,
    error: null,
  },
  reducers: {
    setOwner: (state, action) => {
      state.owner = action.payload;
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

export const { setOwner, setLoading, setError, logout } = ownerSlice.actions;
export default ownerSlice.reducer;
