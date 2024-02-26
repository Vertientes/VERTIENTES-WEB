import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";
import deliveryReducer from "./delivery/deliverySlice";
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    delivery: deliveryReducer,
    users: userReducer,
  },
});
