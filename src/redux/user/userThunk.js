import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = import.meta.env.VITE_BACKEND_API;
const token = localStorage.getItem("token");
export const signUp = createAsyncThunk("user/signup", async ({ user_data }) => {
  console.log(user_data);
  const url_api = url_base + "/sign_up";

  try {
    const res_auth = await axios.post(url_api, user_data);

    if (res_auth.data.success === true) {
      return res_auth.data;
    }
  } catch (error) {
    throw new Error();
  }
});

// Thunk para obtener todos los usuarios activos
export const getUsersActive = createAsyncThunk(
  "user/getUsersActive",
  async (_, { rejectWithValue, getState }) => {
    const url_api = `${url_base}/all_users_active`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.get(url_api, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener todos los usuarios
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue, getState }) => {
    const url_api = `${url_base}/all_users`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.get(url_api, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener el perfil del usuario logueado
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const res = await axios.get(url_base, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para actualizar todos los datos de un usuario por el superadmin
export const updateUserBySuperAdmin = createAsyncThunk(
  "user/updateUserBySuperAdmin",
  async ({ id, userData }, { rejectWithValue }) => {
    const url_api = `${url_base}/update_user_data_for_super_admin/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, userData, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para cambiar el rol de un usuario a usuario con plan por el superadmin
export const changeUserRoleWithPlan = createAsyncThunk(
  "user/changeUserRoleWithPlan",
  async ({ id, role }, { rejectWithValue, getState }) => {
    console.log(role);
    const url_api = `${url_base}/change_user_with_plan/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, role, headers);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para desactivar un usuario
export const desactivateUser = createAsyncThunk(
  "user/deactivateUser",
  async ({ id }, { rejectWithValue, getState }) => {
    const url_api = `${url_base}/deactivate_user/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, {}, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para activar un usuario
export const activateUser = createAsyncThunk(
  "user/activateUser",
  async ({ id }, { rejectWithValue, getState }) => {
    const url_api = `${url_base}/activate_user/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, {}, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para cambiar la contraseña de un usuario
export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async ({ id, passwords }, { rejectWithValue, getState }) => {
    const url_api = `${url_base}/activate_user/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, passwords, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para obtener un usuario por su ID
export const getOneUser = createAsyncThunk(
  "user/getOneUser",
  async ({ id }, { rejectWithValue }) => {
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.get(`/api/users/${id}`, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
