import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url_base = import.meta.env.VITE_BACKEND_API;

// Thunk para crear una nueva empresa
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async ({ companyData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url_base}/new_company`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener los detalles de la empresa
export const getCompanyDetails = createAsyncThunk(
  "company/getCompanyDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${url_base}/all_companies`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para actualizar los detalles de la empresa
export const updateCompanyDetails = createAsyncThunk(
  "company/updateCompanyDetails",
  async ({companyData}, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${url_base}/update_company`,
        companyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
