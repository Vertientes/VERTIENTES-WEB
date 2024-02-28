import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeliveryView from "./pages/deliveries/DeliveryView.jsx";
import OrdersCompletedView from "./pages/orders-completed/OrdersCompletedView.jsx";
import RequestsRecharges from "./pages/requests/RequestsRechargesView.jsx";
import { NotFoundView } from "./pages/NotFoundView.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home/Home.jsx";
import ProductsView from "./pages/products/ProductsView.jsx";
import PromotionsView from "./pages/promotions/PromotionsView.jsx";

const router = createBrowserRouter([
  {
    //esto seria /orders cuando haya login
    path: "/",
    element: <Login />,
  },
  {
    //esto seria /orders cuando haya login
    path: "/home",
    element: <Home />,
    errorElement: <NotFoundView />,
  },
  {
    path: "deliveries",
    element: <DeliveryView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "products",
    element: <ProductsView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "promotions",
    element: <PromotionsView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "orders_completed",
    element: <OrdersCompletedView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "requests",
    element: <RequestsRecharges />,
    errorElement: <NotFoundView />,
  },
  {
    path: "not-found",
    element: <NotFoundView />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
