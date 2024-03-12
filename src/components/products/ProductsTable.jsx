import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import FormAddProduct from "./FormAddProduct";
import FormUpdateProduct from "./FormUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import EmptyListMessage from "../layout/EmptyListMessage";

const ProductsTable = () => {
  const products = useSelector((state) => state.product.products);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModalAdd = () => {
    setModalAddVisible(true);
  };

  const handleOpenModalUpdate = (product) => {
    setSelectedProduct(product);
    setModalUpdateVisible(true);
  };

  const handleOpenModalDelete = (product) => {
    setSelectedProduct(product);
    setModalDeleteVisible(true);
  };

  const handleCloseModalAdd = () => {
    setModalAddVisible(false);
  };

  const handleCloseModalUpdate = () => {
    setModalUpdateVisible(false);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteVisible(false);
  };

  return (
    <div>
      <table>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyListMessage />
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td colSpan="5">
                  <Card style={{ marginBottom: "10px", width: "100%" }}>
                    <Row className="p-3">
                      <Col
                        xs={2}
                        className="d-flex justify-content-center align-items-center text-center"
                      >
                        <Card.Img
                          src={product.img}
                          style={{ borderRadius: "50%" }}
                          width={5}
                        />
                      </Col>
                      <Col xs={2} className="text-center">
                        <Card.Title>{product.name}</Card.Title>
                      </Col>
                      <Col xs={2} className="text-center">
                        <Card.Text>{product.description}</Card.Text>
                      </Col>
                      <Col xs={1} className="text-center">
                        <Card.Text>{product.type}</Card.Text>
                      </Col>
                      <Col xs={1} className="text-center">
                        <Card.Text>{product.price}</Card.Text>
                      </Col>
                      <Col xs={1} className="text-center">
                        <Button
                          variant="secondary"
                          onClick={() => handleOpenModalUpdate(product)}
                        >
                          Editar
                        </Button>
                      </Col>
                      <Col xs={2} className="text-center">
                        <Button
                          variant="secondary"
                          onClick={() => handleOpenModalDelete(product)}
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Button variant="secondary" onClick={handleOpenModalAdd}>
        Añadir producto
      </Button>

      <FormAddProduct
        show={modalAddVisible}
        handleClose={handleCloseModalAdd}
      />

      {selectedProduct && (
        <FormUpdateProduct
          show={modalUpdateVisible}
          handleClose={handleCloseModalUpdate}
          product={selectedProduct}
        />
      )}

      {selectedProduct && (
        <ModalDeleteProduct
          show={modalDeleteVisible}
          handleClose={handleCloseModalDelete}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
