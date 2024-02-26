import NavBar from "../../../components/layout/NavBar";
import OrdersTable from "../../../components/orders/OrdersTable";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import {
  getAllCompletedOrders,
  getAllInProcessOrders,
  getAllPendingOrders,
} from "../../../redux/orders/orderThunk";

const OrdersView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const pendingOrders = async () => {
      await dispatch(getAllPendingOrders());
    };

    const inProccessOrders = async () => {
      await dispatch(getAllInProcessOrders());
    };

    const completedOrders = async () => {
      await dispatch(getAllCompletedOrders());
    };
    pendingOrders();
    inProccessOrders();
    completedOrders();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <NavBar />
      <OrdersTable />
    </div>
  );
};

export default OrdersView;
