import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllPendingOrders } from "../../redux/orders/orderThunk";
import OrdersTable from "../../components/orders/OrdersTable";
import MenuNavbar from "../../components/layout/NavBar";
import { menuItems } from "../../utils/menu-items";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllPendingOrders());
    };

    fetchOrders();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar menuItems={menuItems} />
        </Col>
        <Col sm={9}>
          <h2>Pedidos pendientes</h2>
          <OrdersTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
