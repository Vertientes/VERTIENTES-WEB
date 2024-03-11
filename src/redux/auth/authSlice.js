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
    errors: {},
  },
  reducers: {
    // Agregamos un caso para el logout
    logout: (state) => {
      // Reseteamos el estado de autenticación
      state.isAuthenticated = false;
      state.token = {};
      state.user_logged = {};
      state.role = "idle";
      state.my_profile = {};
      state.success = false;
      state.loading = "idle";
      state.errors = {};

      // Eliminamos los datos del local storage
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthentication.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAuthentication.fulfilled, (state, action) => {
      state.loading = "fulfilled";
      if (action.payload.success) {
        state.isAuthenticated = true;
        state.token = action.payload?.token;
        state.user_logged = action.payload?.user;
        state.role = action.payload?.user.role;
        localStorage.setItem("token", state.token);
      }
    });
    builder.addCase(getAuthentication.rejected, (state, action) => {
      state.loading = "rejected";
      state.errors = action.payload;
    });
    builder.addCase(getMyProfile.pending, (state) => {
      state.my_profile = {};
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.my_profile = action.payload.user;
      }
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
