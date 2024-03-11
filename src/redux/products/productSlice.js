import { createSlice } from "@reduxjs/toolkit";
import {
  newProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "./productThunk";

const initialState = {
  products: [],
  loading: "idle",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(newProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(newProduct.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(newProduct.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        if (action.payload.success) {
          state.products = action.payload.products;
        }
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export default productSlice.reducer;
