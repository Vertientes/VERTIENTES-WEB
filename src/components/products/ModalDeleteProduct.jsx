import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../redux/products/productThunk";

const ModalDeleteProduct = ({ show, product, handleClose }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteProduct({ id: product._id }));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="p-5">
            <Form.Text >¿Desea eliminar el producto: {product.name}</Form.Text>
          </Form.Group>

          <Button variant="secondary" type="submit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Confirmar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteProduct;
