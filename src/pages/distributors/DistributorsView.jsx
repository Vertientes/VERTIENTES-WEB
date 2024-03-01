import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { getAllDistributors } from "../../redux/distributors/distributorThunk";
import DistributorsList from "../../components/distributors/DistributorsList";

const DistributorsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDeliveries = async () => {
      await dispatch(getAllDistributors());
    };

    fetchDeliveries();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>
          <h2>Repartidores</h2>
          <DistributorsList />
        </Col>
      </Row>
    </Container>
  );
};

export default DistributorsView;
