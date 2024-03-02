import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getAllDebtOrders,
  getAllInProcessOrders,
  getAllPendingOrders,
} from "../../redux/orders/orderThunk";
import OrdersTable from "../../components/orders/OrdersTable";
import MenuNavbar from "../../components/layout/NavBar";
import RequestsTable from "../../components/request/requestsTable";
import DebtOrdersTable from "../../components/orders/DebtOrdersTable";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getAllPendingOrders());
    };

    const fetchOrdersInProcess = async () => {
      await dispatch(getAllInProcessOrders());
    };
    const fetchOrdersDebt = async () => {
      await dispatch(getAllDebtOrders());
    };
    fetchOrders();
    fetchOrdersInProcess();
    fetchOrdersDebt();

  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>
          <Tabs
            defaultActiveKey="orders-pending"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="orders-pending" title="Nuevos pedidos">
              <OrdersTable />
            </Tab>
            <Tab eventKey="orders-requests" title="Pedidos de recargas">
              <RequestsTable />
            </Tab>
            <Tab eventKey="orders-incompleted" title="Pedidos sin abonar">
              <DebtOrdersTable />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
