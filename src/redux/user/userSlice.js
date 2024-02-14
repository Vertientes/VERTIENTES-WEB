import { createSlice } from "@reduxjs/toolkit";
import { updateUserData } from "./userThunk";

const initialState = {
  users: [],
  loading: 'idle'
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateUserData.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(updateUserData.fulfilled, (state) => {
      state.loading = 'fullfiled'
    })
    builder.addCase(updateUserData.rejected, (state) => {
      state.loading = 'rejected'
    })
  }
});


export default userSlice.reducer;