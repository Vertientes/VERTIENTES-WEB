import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url_base = import.meta.env.VITE_BACKEND_API;

export const createPromotion = createAsyncThunk(
  "promotion/createPromotion",
  async (
    { description, required_quantity, discounted_percentage, file },
    { rejectWithValue, getState }
  ) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/new_promotion`;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("required_quantity", required_quantity);
    formData.append("discounted_percentage", discounted_percentage);
    formData.append("promotion-image", file);

    try {
      const response = await axios.post(url_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePromotion = createAsyncThunk(
  "promotion/updatePromotion",
  async (
    { id, description, required_quantity, discounted_percentage, file },
    { rejectWithValue, getState }
  ) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/update_promotion/${id}`;
    const formData = new FormData();
    formData.append("description", description);
    formData.append("required_quantity", required_quantity);
    formData.append("discounted_percentage", discounted_percentage);
    if (file) {
      formData.append("promotion-image", file);
    }

    try {
      const response = await axios.put(url_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePromotion = createAsyncThunk(
  "promotion/deletePromotion",
  async ({ id }, { rejectWithValue, getState }) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/delete_promotion/${id}`;

    try {
      const response = await axios.delete(url_api, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPromotions = createAsyncThunk(
  "promotion/getPromotions",
  async (_, { rejectWithValue, getState }) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/all_promotions`;

    try {
      const response = await axios.get(url_api, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
