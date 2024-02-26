import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home/Home.jsx";
import { DeliveryView } from "./pages/admin/deliveries/DeliveryView.jsx";
import OrdersCompletedView from "./pages/admin/orders-completed/OrdersCompletedView.jsx";
import RequestsRecharges from "./pages/admin/requests/RequestsRechargesView.jsx";
import { NotFoundView } from "./pages/NotFoundView.jsx";
import OrdersView from "./pages/admin/orders/OrdersView.jsx";
import Login from "./pages/Login.jsx";

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
    path: "orders",
    element: <OrdersView />,
  },
  {
    path: "deliveries",
    element: <DeliveryView />,
  },
  {
    path: "orders_completed",
    element: <OrdersCompletedView />,
  },
  {
    path: "requests",
    element: <RequestsRecharges />,
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
