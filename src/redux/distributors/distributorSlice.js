import { createSlice } from "@reduxjs/toolkit";
import { getAllDistributors, newDistributor } from "./distributorThunk";

const initialState = {
  distributors: [],
  loading: "idle",
};

export const deliverySlice = createSlice({
  name: "distributor",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(newDistributor.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(newDistributor.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(newDistributor.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(getAllDistributors.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllDistributors.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        if (action.payload.success) {
          state.distributors = action.payload.deliveries;
        }
      })
      .addCase(getAllDistributors.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default deliverySlice.reducer;
