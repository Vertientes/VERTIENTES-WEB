import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = import.meta.env.VITE_BACKEND_API;

export const newDistributor = createAsyncThunk(
  "distributor/sign_up_delivery",
  async ({ distributor_data }, { rejectWithValue, getState }) => {
    const { token } = getState().auth;
    const url_api = `${url_base}/sign_up_delivery`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const distributorSent = await axios.post(
        url_api,
        distributor_data,
        headers
      );

      if (distributorSent.data) {
        return distributorSent;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllDistributors = createAsyncThunk(
  "distributor/all_users_deliveries",
  async (_, { getState }) => {
    const { token } = getState().auth;
    const url_api = `${url_base}/all_users_delivery`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_deliveries = await axios.get(url_api, headers);
      if (res_deliveries.data.success) {
        return res_deliveries.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
