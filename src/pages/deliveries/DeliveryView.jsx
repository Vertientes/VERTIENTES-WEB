import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { menuItems } from "../../utils/menu-items";
import { getAllDeliveries } from "../../redux/delivery/deliveryThunk";
import DeliveryTable from "../../components/delivery/DeliveryTable";

const DeliveryView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeliveries = async () => {
      await dispatch(getAllDeliveries());
    };

    fetchDeliveries();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar menuItems={menuItems} />
        </Col>
        <Col sm={9}>
          <h2>Lista de repartos</h2>
          <DeliveryTable />
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryView;
