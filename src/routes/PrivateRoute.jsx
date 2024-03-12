import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) =>
  localStorage.getItem("token") ? children : <Navigate to="/" />;

export default PrivateRoute;
