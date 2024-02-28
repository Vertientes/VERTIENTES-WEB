import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersActive,
  getAllUsers,
  getUserProfile,
  updateUserBySuperAdmin,
  changeUserRoleWithPlan,
  deactivateUser,
  activateUser,
  changeUserPassword,
  getOneUser,
  updateAddressUserData,
} from "./userThunk";

const initialState = {
  users: [],
  userProfile: null,
  userById: null,
  loading: false,
  success: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // getUsersActive
    builder.addCase(getUsersActive.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersActive.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload.users;
    });
    builder.addCase(getUsersActive.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.users = action.payload.users;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // getUserProfile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userProfile = action.payload.user;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // updateUserBySuperAdmin
    // Add other cases for the remaining thunks in a similar manner...
  },
});

export default userSlice.reducer;
