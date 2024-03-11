import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
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
import PrivateRoute from "./routes/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "deliveries",
    element: (
      <PrivateRoute>
        <DeliveryView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "distributors",
    element: (
      <PrivateRoute>
        <DistributorsView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "products",
    element: (
      <PrivateRoute>
        <ProductsView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "users",
    element: (
      <PrivateRoute>
        <UsersView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "company",
    element: (
      <PrivateRoute>
        <CompanyView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "promotions",
    element: (
      <PrivateRoute>
        <PromotionsView />
      </PrivateRoute>
    ),
    errorElement: <NotFoundView />,
  },
  {
    path: "orders_completed",
    element: (
      <PrivateRoute>
        <OrdersCompletedView />
      </PrivateRoute>
    ),
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
