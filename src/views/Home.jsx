import { useDispatch } from "react-redux";
import { OrdersTable } from "../components/OrdersTable";
import { useEffect } from "react";
import { getAllOrders } from "../redux/orders/orderThunk";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

export const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchOrders = async () => {
            await dispatch(getAllOrders());
        };
        fetchOrders();
    }, []);
    return (
        <>
            <OrdersTable />
            <Link to="/deliveries" className="btn btn-primary">Ir a repartos</Link>
        </>
    );
};
