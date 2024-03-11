import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = import.meta.env.VITE_BACKEND_API;
const token = localStorage.getItem("token");

export const newDelivery = createAsyncThunk(
  "delivery/send-new-delivery",
  async ({ id, delivery_date }) => {
    const url_api = url_base + `/new_delivery/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const deliverySent = await axios.post(
        url_api,
        { delivery_date: delivery_date },
        headers
      );

      if (deliverySent.data) {
        console.log(deliverySent.data);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      throw error;
    }
  }
);

export const getAllDeliveries = createAsyncThunk(
  "delivery/all_deliveries",
  async (_) => {
    const url_api = url_base + "/all_deliveries";
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_orders = await axios.get(url_api, headers);
      if (res_orders.data.success) {
        return res_orders.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
