import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserData = createAsyncThunk(
    "users/update_order_data",
    async ({ user_data }) => {
        const id = user_data.id
        const url_api = `http://localhost:4000/api/update_user_data/${id}`;
        const token = '';
        const headers = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: token,
            }
        };

        const formData = new FormData();

        for (const key in user_data) {
          formData.append(key, user_data[key]);
        }

        try {
            const updateUser = await axios.put(url_api, formData, headers);

            if (updateUser.data) {
                console.log(updateUser.data);
            }
        } catch (error) {
            console.log(error);
            console.log(error.message);
            throw error;
        }
    }
);

