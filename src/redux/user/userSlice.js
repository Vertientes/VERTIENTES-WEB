import { createSlice } from "@reduxjs/toolkit";
import {
  getUsersActive,
  getAllUsers,
  getUserProfile,
  updateUserBySuperAdmin,
  changeUserRoleWithPlan,
  desactivateUser,
  activateUser,
  changeUserPassword,
  getOneUser,
} from "./userThunk";

const initialState = {
  users: [],
  usersActive: [],
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
      if (action.payload.success) {
        state.usersActive = action.payload.users;
      }
    });
    builder.addCase(getUsersActive.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // getAllUsers
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (action.payload.success) {
        state.users = action.payload.users;
      }
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // getUserProfile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      if (action.payload.success) {
        state.userProfile = action.payload.user;
      }
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // updateUserBySuperAdmin
    builder.addCase(changeUserRoleWithPlan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeUserRoleWithPlan.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(changeUserRoleWithPlan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // updateUserBySuperAdmin
    builder.addCase(updateUserBySuperAdmin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserBySuperAdmin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(updateUserBySuperAdmin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export default userSlice.reducer;
