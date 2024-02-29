import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { activateUser } from "../../redux/user/userThunk";

const UpdateStatusModal = ({ show, id, status, closeModal }) => {
  const dispatch = useDispatch();
  const [newStatus, setNewStatus] = useState(status);
  const [alert, setAlert] = useState({ message: "", variant: "" });

  const handleChange = (e) => {
    const { value } = e.target;
    setNewStatus(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      newStatus
        ? await dispatch(activateUser({ id }))
        : await dispatch(desactivateUser({ id }));

      setAlert({
        message: "Estado actualizado exitosamente.",
        variant: "success",
      });
    } catch (error) {
      setAlert({
        message: "Ha ocurrido un error interno.",
        variant: "danger",
      });
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Estado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Estado:</Form.Label>
            <Form.Control as="select" value={newStatus} onChange={handleChange}>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Actualizar Estado
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateStatusModal;
