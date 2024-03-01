import React, { useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { getProducts } from "../../redux/products/productThunk";
import ProductsTable from "../../components/products/ProductsTable";

const ProductsView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>
          <h2>Productos</h2>
          <ProductsTable />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsView;
