import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_base = import.meta.env.VITE_BACKEND_API;

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
    const { token } = getState().auth; // Obtener el token del estado
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
    const { token } = getState().auth; // Obtener el token del estado
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
    try {
      const res = await axios.put(url_base + `${id}`, userData);
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
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/change_user_with_plan/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, { role: role }, headers);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para desactivar un usuario
export const desactivateUser = createAsyncThunk(
  "user/deactivateUser",
  async ({ id }, { rejectWithValue, getState }) => {
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/desactivate_user/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api, headers);
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
    const { token } = getState().auth; // Obtener el token del estado
    const url_api = `${url_base}/activate_user/${id}`;
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    try {
      const res = await axios.put(url_api);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para cambiar la contraseña de un usuario
export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async ({ id, passwords }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/users/${id}/password`, passwords);
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
    try {
      const res = await axios.get(`/api/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk para actualizar los datos de dirección de un usuario
export const updateAddressUserData = createAsyncThunk(
  "user/updateAddressUserData",
  async ({ id, addressData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/users/${id}/address`, addressData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
