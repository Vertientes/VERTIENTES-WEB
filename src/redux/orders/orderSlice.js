import { createSlice } from "@reduxjs/toolkit";
import { getAllPendingUserOrders, getAllInProcessUserOrders, getAllCompletedUserOrders, getAllPendingOrders, getAllInProcessOrders, getAllCompletedOrders, updateOrderData, renewOrder } from "./orderThunk";

const initialState = {
  pendingUserOrders: [],
  inProcessUserOrders: [],
  completedUserOrders: [],
  pendingOrders: [],
  inProcessOrders: [],
  completedOrders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Thunks para obtener órdenes pendientes del usuario
    builder.addCase(getAllPendingUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPendingUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingUserOrders = action.payload;
    });
    builder.addCase(getAllPendingUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunks para obtener órdenes en proceso del usuario
    builder.addCase(getAllInProcessUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllInProcessUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.inProcessUserOrders = action.payload;
    });
    builder.addCase(getAllInProcessUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunks para obtener órdenes completadas del usuario
    builder.addCase(getAllCompletedUserOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCompletedUserOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.completedUserOrders = action.payload;
    });
    builder.addCase(getAllCompletedUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunks para obtener todas las órdenes pendientes
    builder.addCase(getAllPendingOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPendingOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingOrders = action.payload;
    });
    builder.addCase(getAllPendingOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunks para obtener todas las órdenes en proceso
    builder.addCase(getAllInProcessOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllInProcessOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.inProcessOrders = action.payload;
    });
    builder.addCase(getAllInProcessOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunks para obtener todas las órdenes completadas
    builder.addCase(getAllCompletedOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCompletedOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.completedOrders = action.payload;
    });
    builder.addCase(getAllCompletedOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunk para actualizar datos de una orden
    builder.addCase(updateOrderData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderData.fulfilled, (state, action) => {
      state.loading = false;
      // Actualizar la orden en el estado
      state.pendingOrders = state.pendingOrders.map(order => 
        order._id === action.payload._id ? action.payload : order
      );
    });
    builder.addCase(updateOrderData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Thunk para renovar una orden
    builder.addCase(renewOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(renewOrder.fulfilled, (state, action) => {
      state.loading = false;
      // Agregar la nueva orden al estado de órdenes pendientes
      state.pendingOrders = [...state.pendingOrders, action.payload];
    });
    builder.addCase(renewOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
