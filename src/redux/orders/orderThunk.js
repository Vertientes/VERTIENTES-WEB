import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = import.meta.env.VITE_BACKEND_API;
const token = localStorage.getItem("token");

export const getAllPendingUserOrders = createAsyncThunk(
  "orders/all_pending_user_orders",
  async (_) => {
    const url_api = `${url_base}/all_pending_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.pending_all_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener órdenes en proceso del usuario
export const getAllInProcessUserOrders = createAsyncThunk(
  "orders/all_in_process_user_orders",
  async (_) => {
    const url_api = `${url_base}/all_in_process_user_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.process_user_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener órdenes en proceso del usuario
export const getAllDebtOrders = createAsyncThunk(
  "orders/all_debt_orders",
  async (_) => {
    const url_api = `${url_base}/all_debt_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.all_debt_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener órdenes completadas del usuario
export const getAllCompletedUserOrders = createAsyncThunk(
  "orders/all_completed_user_orders",
  async (_) => {
    const url_api = `${url_base}/all_completed_user_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.completed_user_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener todas las órdenes pendientes (solo para administradores)
export const getAllPendingOrders = createAsyncThunk(
  "orders/all_pending_orders",
  async (_) => {
    const url_api = `${url_base}/all_pending_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.pending_all_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener todas las órdenes en proceso (solo para administradores)
export const getAllInProcessOrders = createAsyncThunk(
  "orders/all_in_process_orders",
  async (_) => {
    const url_api = `${url_base}/all_in_process_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.process_all_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunks para obtener todas las órdenes completadas (solo para administradores)
export const getAllCompletedOrders = createAsyncThunk(
  "orders/all_completed_orders",
  async (_) => {
    const url_api = `${url_base}/all_completed_orders`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data.completed_all_orders;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Thunk para renovar una orden
export const renewOrder = createAsyncThunk(
  "orders/renew_order",
  async ({ id, orderData }) => {
    const url_api = `${url_base}/renew_order/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res = await axios.put(url_api, orderData, headers);
      if (res.data.success) {
        return res.data.updatedOrder;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateOrderData = createAsyncThunk(
  "orders/update_order_data",
  async ({
    id,
    order_date,
    order_due_date,
    amount_paid,
    recharges_delivered,
    recharges_in_favor,
    observation,
  }) => {
    const url_api = url_base + `/update_order_data/${id}`;
    const token = "";
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const updateOrder = await axios.put(
        url_api,
        {
          order_date,
          order_due_date,
          amount_paid,
          recharges_delivered,
          recharges_in_favor,
          observation,
        },
        headers
      );

      if (updateOrder.data) {
        console.log(updateOrder.data);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      throw error;
    }
  }
);

//Thunk para eliminar una order
export const deleteOrderCompleted = createAsyncThunk(
  "orders/renew_order",
  async ({ id }) => {
    const url_api = `${url_base}/delete_order/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res = await axios.delete(url_api, headers);
      if (res.data.success) {
        return res.data.deletedOrder;
      }
    } catch (error) {
      throw error;
    }
  }
);
