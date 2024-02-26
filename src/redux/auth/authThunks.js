import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAuthentication = createAsyncThunk(
  "auth/signin",
  async ({ dni, password }) => {
    const url_api = import.meta.env.VITE_BACKEND_API + "/sign_in";

    const data_auth = {
      dni: dni,
      password: password,
    };

    try {
      const res_auth = await axios.post(url_api, data_auth);

      if (res_auth.data.success === true) {
        return res_auth.data;
      }
    } catch (error) {
      return error.message; // Devolver un objeto serializable que represente el error
    }
  }
);

// export const logOut = createAsyncThunk('auth/logout', async({}))

export const signUp = createAsyncThunk("auth/signup", async ({ user_data }) => {
  console.log(user_data);
  const url_api = process.env.EXPO_PUBLIC_URL_API + "/signup";
  console.log(url_api);

  try {
    const res_auth = await axios.post(url_api, user_data);

    if (res_auth.data.success === true) {
      return res_auth.data;
    }
  } catch (error) {
    throw new Error();
  }
});

export const getMyProfile = createAsyncThunk(
  "auth/get-profile",
  async (_, { getState }) => {
    const { auth } = getState();
    const token = auth.token;
    const url_api = process.env.EXPO_PUBLIC_URL_API + "/profile";

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    try {
      const res_profile = await axios.get(url_api, headers);

      if (res_profile.data.success === true) {
        return res_profile.data;
      }
    } catch (error) {
      throw new Error();
    }
  }
);
