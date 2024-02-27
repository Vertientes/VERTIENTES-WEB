import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { menuItems } from "../../utils/menu-items";
import { getAllCompletedOrders } from "../../redux/orders/orderThunk";
import OrdersCompletedTable from "../../components/orders/OrdersCompletedTable";

const OrdersCompletedView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllCompletedOrders());
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
          <h2>Pedidos completados</h2>
          <OrdersCompletedTable />
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersCompletedView;
