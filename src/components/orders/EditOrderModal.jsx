import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getAllInProcessOrders,
  getAllPendingOrders,
  updateOrderData,
} from "../../redux/orders/orderThunk";

export const EditOrderModal = ({ order, visible, closeModal }) => {
  const dispatch = useDispatch();
  const [orderUpdate, setorderUpdate] = useState({
    order_date: "",
    order_due_date: "",
    amount_paid: "",
    recharges_delivered: "",
    recharges_in_favor: "",
    observation: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeInput = (event) => {
    setorderUpdate({
      ...orderUpdate,
      [event.target.name]: event.target.value,
    });
  };

  const updateOrder = async () => {
    try {
      const res = await dispatch(
        updateOrderData({
          id: order._id,
          order_date: orderUpdate.order_date,
          order_due_date: orderUpdate.order_due_date,
          amount_paid: orderUpdate.amount_paid,
          recharges_delivered: orderUpdate.recharges_delivered,
          recharges_in_favor: orderUpdate.recharges_in_favor,
          observation: orderUpdate.observation,
        })
      );
      if (res.payload.success) {
        setSuccessMessage("¡La orden se actualizó correctamente!");
      }
    } catch (error) {
      setErrorMessage("Ha ocurrido un problema al actualizar la orden.");
    } finally {
      await dispatch(getAllPendingOrders());
      await dispatch(getAllInProcessOrders());
      closeModal();
    }
  };

  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form>
          <Form.Group controlId="formOrderDate">
            <Form.Label>Modificar fecha de la orden</Form.Label>
            <Form.Control
              type="datetime-local"
              name="order_date"
              value={orderUpdate.order_date}
              onChange={handleChangeInput}
            />
          </Form.Group>
          {/* Resto de los campos del formulario... */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={updateOrder}>
          Actualizar Orden
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
