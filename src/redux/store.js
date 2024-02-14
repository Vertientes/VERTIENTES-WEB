import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";
import deliveryReducer from './delivery/deliverySlice'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    delivery: deliveryReducer,
    users: userReducer
  },
});