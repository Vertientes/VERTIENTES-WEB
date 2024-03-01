import { createSlice } from "@reduxjs/toolkit";
import { getAuthentication, getMyProfile, signUpDelivery } from "./authThunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    success: false,
    loading: "idle",
    token: {},
    role: "idle",
    user_logged: {},
    my_profile: {},
    errors: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthentication.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAuthentication.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.user_logged = action.payload?.user;
      state.role = action.payload?.user.role;
    });
    builder.addCase(getAuthentication.rejected, (state, action) => {
      state.loading = "rejected";
      state.errors = action.payload;
    });
    builder.addCase(getMyProfile.pending, (state) => {
      state.my_profile = {};
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.my_profile = action.payload.user;
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.my_profile = {};
    });
    builder.addCase(signUpDelivery.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(signUpDelivery.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      state.success = true; // Indicate successful sign up
    });
    builder.addCase(signUpDelivery.rejected, (state, action) => {
      state.loading = "rejected";
      state.errors = action.payload;
    });
  },
});

export default authSlice.reducer;
