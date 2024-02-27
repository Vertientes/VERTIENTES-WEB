import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { newDelivery } from "../../redux/delivery/deliveryThunk";

export const DeliveryModal = ({ orderId, visible, closeModal }) => {
  const dispatch = useDispatch();
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleAddToDelivery = async () => {
    // Dispatch de la acción para agregar a reparto con la fecha seleccionada
    await dispatch(newDelivery({ id: orderId, delivery_date: deliveryDate }));
    closeModal(); // Cerrar el modal después de agregar a reparto
  };

  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar a Reparto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDeliveryDate">
            <Form.Label>Fecha de Reparto</Form.Label>
            <Form.Control
              type="datetime-local"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAddToDelivery}>
          Agregar a Reparto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
