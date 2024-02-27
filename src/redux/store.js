import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orders/orderSlice";
import deliveryReducer from "./delivery/deliverySlice";
import userReducer from "./user/userSlice";
import authReducer from "./auth/authSlice";
import productReducer from "./products/productSlice";
import promotionReducer from "./promotions/promotionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    delivery: deliveryReducer,
    users: userReducer,
    product: productReducer,
    promotion: promotionReducer,
  },
});
