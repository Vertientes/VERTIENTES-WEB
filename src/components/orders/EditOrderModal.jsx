import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getAllInProcessOrders,
  getAllPendingOrders,
  updateOrderData,
} from "../../redux/orders/orderThunk";

export const EditOrderModal = ({ order, visible, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    order_date: "",
    order_due_date: "",
    amount_paid: "",
    recharges_delivered: "",
    recharges_in_favor: "",
    observation: "",
  });

  const handleChangeInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updateOrder = async () => {
    try {
      await dispatch(
        updateOrderData({
          id: order._id,
          order_date: formData.order_date,
          order_due_date: formData.order_due_date,
          amount_paid: formData.amount_paid,
          recharges_delivered: formData.recharges_delivered,
          recharges_in_favor: formData.recharges_in_favor,
          observation: formData.observation,
        })
      );
    } catch (error) {
      alert("Ha ocurrido un problema");
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
        <Form>
          <Form.Group controlId="formOrderDate">
            <Form.Label>Modificar fecha de la orden</Form.Label>
            <Form.Control
              type="datetime-local"
              name="order_date"
              value={formData.order_date}
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group controlId="formOrderDueDate">
            <Form.Label>Modificar fecha de vencimiento de la orden</Form.Label>
            <Form.Control
              type="datetime-local"
              name="order_due_date"
              value={formData.order_due_date}
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group controlId="formAmountPaid">
            <Form.Label>Modificar cantidad pagada</Form.Label>
            <Form.Control
              type="number"
              name="amount_paid"
              value={formData.amount_paid}
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group controlId="formRechargesDelivered">
            <Form.Label>Modificar recargas entregadas</Form.Label>
            <Form.Control
              type="text"
              name="recharges_delivered"
              value={formData.recharges_delivered}
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group controlId="formRechargesInFavor">
            <Form.Label>Modificar recargas a favor</Form.Label>
            <Form.Control
              type="number"
              name="recharges_in_favor"
              value={formData.recharges_in_favor}
              onChange={handleChangeInput}
            />
          </Form.Group>
          <Form.Group controlId="formObservation">
            <Form.Label>Modificar observación</Form.Label>
            <Form.Control
              type="text"
              name="observation"
              value={formData.observation}
              onChange={handleChangeInput}
            />
          </Form.Group>
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
