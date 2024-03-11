import { createSlice } from "@reduxjs/toolkit";
import { newDelivery } from "./deliveryThunk";
import { getAllDeliveries } from "./deliveryThunk";

const initialState = {
  deliveries: [],
  loading: "idle",
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(newDelivery.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(newDelivery.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(newDelivery.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(getAllDeliveries.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllDeliveries.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        if (action.payload.success) {
          state.deliveries = action.payload.deliveries;
        }
      })
      .addCase(getAllDeliveries.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default deliverySlice.reducer;
