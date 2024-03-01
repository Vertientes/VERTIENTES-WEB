import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeliveryView from "./pages/deliveries/DeliveryView.jsx";
import OrdersCompletedView from "./pages/orders-completed/OrdersCompletedView.jsx";
import { NotFoundView } from "./pages/NotFoundView.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/home/Home.jsx";
import ProductsView from "./pages/products/ProductsView.jsx";
import PromotionsView from "./pages/promotions/PromotionsView.jsx";
import DistributorsView from "./pages/distributors/DistributorsView.jsx";
import UsersView from "./pages/users/UsersView.jsx";
import CompanyView from "./pages/company/CompanyView.jsx";

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
    path: "distributors",
    element: <DistributorsView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "products",
    element: <ProductsView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "users",
    element: <UsersView />,
    errorElement: <NotFoundView />,
  },
  {
    path: "company",
    element: <CompanyView />,
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
