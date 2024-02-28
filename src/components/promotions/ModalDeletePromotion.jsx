import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePromotion, getPromotions } from "../../redux/promotions/promotionThunk";


const ModalDeletePromotion = ({ show, promotion, handleClose }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ variant: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deletePromotion({ id: promotion._id }));
      setAlert({
        variant: "success",
        message: "¡Prmocion eliminado correctamente!",
      });
    } catch (error) {
      setAlert({ variant: "danger", message: "Ha ocurrido un problema" });
    } finally {
      await dispatch(getPromotions());
      handleClose();
      setAlert({ variant: "", message: "" });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar promoción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="p-5">
            <Form.Text>¿Desea eliminar esta promocion?</Form.Text>
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

export default ModalDeletePromotion;
