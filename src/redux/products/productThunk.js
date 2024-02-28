import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url_base = import.meta.env.VITE_BACKEND_API;

export const newProduct = createAsyncThunk(
  "product/newProduct",
  async (
    { name, price, type, description, file },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/new_product`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("product-image", file);

    try {
      const response = await axios.post(url_api, formData, {
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

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/all_products`;

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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { id, name, price, type, description, file },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/update_product/${id}`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("type", type);
    formData.append("description", description);
    if (file) {
      formData.append("file", file);
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id }, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/delete_product/${id}`;

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
