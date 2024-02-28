import { createSlice } from "@reduxjs/toolkit";
import { createCompany, getCompanyDetails, updateCompanyDetails } from "./companyThunk";

const initialState = {
  company: {
    holder_cuil: "",
    holder_name: "",
    neighborhood: "",
    street: "",
    house_number: "",
    city: "",
    postal_code: "",
    business_name: "",
    business_name_cuil: "",
    email: "",
    alias: ""
  },
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
        state.loading = "idle";
        state.company = action.payload.savedCompany;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      })
      .addCase(getCompanyDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCompanyDetails.fulfilled, (state, action) => {
        state.loading = "idle";
        state.company = action.payload.company;
      })
      .addCase(getCompanyDetails.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      })
      .addCase(updateCompanyDetails.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCompanyDetails.fulfilled, (state, action) => {
        state.loading = "idle";
        state.company = action.payload.updatedCompany;
      })
      .addCase(updateCompanyDetails.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;