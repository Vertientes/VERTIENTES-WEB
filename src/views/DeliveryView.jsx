import { useDispatch } from "react-redux";
import { DeliveryTable } from "../components/DeliveryTable";
import { useEffect } from "react";
import { getAllDeliveries } from "../redux/delivery/deliveryThunk";

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
            <DeliveryTable />
        </>
    );
};
