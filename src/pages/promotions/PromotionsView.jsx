import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { getPromotions } from "../../redux/promotions/promotionThunk";
import PromotionsTable from "../../components/promotions/PromotionsTable";

const PromotionsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPromotions = async () => {
      await dispatch(getPromotions());
    };

    fetchPromotions();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>
          <h2>Promociones</h2>
          <PromotionsTable />
        </Col>
      </Row>
    </Container>
  );
};

export default PromotionsView;
