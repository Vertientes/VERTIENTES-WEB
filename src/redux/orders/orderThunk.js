import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
    "orders/all_orders",
    async () => {
        const url_api = "http://localhost:4000/api/all_orders";
        const token = ''
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        };

        try {
            const res_orders = await axios.get(url_api, headers);
            if (res_orders.data.success) {
                console.log(res_orders.data)
                return res_orders.data
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const updateOrderData = createAsyncThunk(
    "orders/update_order_data",
    async ({ id,  order_date, order_due_date, amount_paid, recharges_delivered, recharges_in_favor, observation }) => {
        const url_api = `http://localhost:4000/api/update_order_data/${id}`;
        const token = ''
        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        };

        try {
            const updateOrder = await axios.put(url_api, { order_date, order_due_date, amount_paid, recharges_delivered, recharges_in_favor, observation }, headers);

            if (updateOrder.data) {
                console.log(updateOrder.data)
            }
        } catch (error) {
            console.log(error);
            console.log(error.message);
            throw error;
        }
    }
);
