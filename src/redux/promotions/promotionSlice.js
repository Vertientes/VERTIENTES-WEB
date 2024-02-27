import { createSlice } from "@reduxjs/toolkit";
import { createPromotion, updatePromotion, deletePromotion, getPromotions } from "./promotionThunk";

const initialState = {
  promotions: [],
  loading: "idle",
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPromotion.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createPromotion.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(createPromotion.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(updatePromotion.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updatePromotion.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(updatePromotion.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deletePromotion.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deletePromotion.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(deletePromotion.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(getPromotions.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getPromotions.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.promotions = action.payload.promotions;
      })
      .addCase(getPromotions.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default promotionSlice.reducer;
