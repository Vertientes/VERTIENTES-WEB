import { createSlice } from "@reduxjs/toolkit";
import { getAllOrders, updateOrderData } from "./orderThunk";

const initialState = {
  orders: [],
  loading: 'idle'
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload.orders
      state.loading = 'fullfiled'
    })
    builder.addCase(getAllOrders.rejected, (state) => {
      state.loading = 'rejected'
    })
    builder.addCase(updateOrderData.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(updateOrderData.fulfilled, (state) => {
      state.loading = 'fullfiled'
    })
    builder.addCase(updateOrderData.rejected, (state) => {
      state.loading = 'rejected'
    })
  }
});


export default orderSlice.reducer;