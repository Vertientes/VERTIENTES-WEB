import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { menuItems } from "../../utils/menu-items";
import { getAllInProcessOrders } from "../../redux/orders/orderThunk";
import RequestsTable from "../../components/request/requestsTable";

const RequestsRechargesView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllInProcessOrders());
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
          <h2>Solicitudes de recargas</h2>
          <RequestsTable />
        </Col>
      </Row>
    </Container>
  );
};

export default RequestsRechargesView;
