import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { getCompanyDetails } from "../../redux/company/companyThunk";

const CompanyView = () => {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);

  useEffect(() => {
    const fetchCompany = async () => {
      await dispatch(getCompanyDetails());
    };

    fetchCompany();
  }, [dispatch]);

  useEffect(() => {
    console.log(company);
  }, [company]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>MI EMPRESA</Col>
      </Row>
    </Container>
  );
};

export default CompanyView;
