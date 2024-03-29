import { createSlice } from "@reduxjs/toolkit";
import {
  createCompany,
  getCompanyDetails,
  updateCompanyDetails,
} from "./companyThunk";

const initialState = {
  company: {},
  loading: "idle",
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCompany.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      })
      .addCase(getCompanyDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.loading = "idle";
        if (action.payload.companies && action.payload.companies.length > 0) {
          // Verificar si hay al menos un company devuelto por el backend
          state.company = action.payload.companies[0];
        }
      })
      .addCase(getCompanyDetails.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      })
      .addCase(updateCompanyDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCompanyDetails.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(updateCompanyDetails.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
