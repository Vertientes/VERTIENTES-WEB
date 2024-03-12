import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap"; // Importa Alert desde react-bootstrap
import { useDispatch } from "react-redux";
import { newDelivery } from "../../redux/delivery/deliveryThunk";
import { getAllPendingOrders } from "../../redux/orders/orderThunk";

export const DeliveryModal = ({ orderId, visible, closeModal }) => {
  const dispatch = useDispatch();
  const [deliveryDate, setDeliveryDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToDelivery = async () => {
    try {
      // Dispatch de la acción para agregar a reparto con la fecha seleccionada
      const res = await dispatch(
        newDelivery({ id: orderId, delivery_date: deliveryDate })
      );

      if (res.payload.success) {
        setSuccessMessage("¡La entrega se agregó al reparto exitosamente!");
        await dispatch(getAllPendingOrders());
      }
    } catch (error) {
      setErrorMessage(
        "Hubo un error al agregar la entrega al reparto. Inténtalo de nuevo."
      );
    } finally {
      closeModal();
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar a Reparto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form>
          <Form.Group controlId="formDeliveryDate">
            <Form.Label>Fecha de Reparto</Form.Label>
            <Form.Control
              type="datetime-local"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(`${e.target.value}`)}
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
