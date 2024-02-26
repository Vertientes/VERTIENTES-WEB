import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllDeliveries } from "../../../redux/delivery/deliveryThunk";
import NavBar from "../../../components/layout/NavBar";
import DeliveryTable from "../../../components/DeliveryTable";

export const DeliveryView = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDeliveries = async () => {
      await dispatch(getAllDeliveries());
    };
    fetchDeliveries();
  }, []);
  return (
    <>
      <NavBar />
      <DeliveryTable/>
    </>
  );
};
