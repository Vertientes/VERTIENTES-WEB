import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../redux/products/productThunk";

const ModalDeleteProduct = ({ show, product, handleClose }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ variant: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteProduct({ id: product._id }));
      setAlert({
        variant: "success",
        message: "¡Producto eliminado correctamente!",
      });
    } catch (error) {
      setAlert({ variant: "danger", message: "Ha ocurrido un problema" });
    } finally {
      await dispatch(getProducts());
      handleClose();
      setAlert({ variant: "", message: "" });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="p-5">
            <Form.Text>¿Desea eliminar el producto: {product.name}</Form.Text>
          </Form.Group>

          <Button variant="secondary" type="submit" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Confirmar
          </Button>
        </Form>
        {alert.variant && (
          <Alert variant={alert.variant} className="mt-3">
            {alert.message}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalDeleteProduct;
