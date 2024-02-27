import { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";

const ModalDetailOrder = ({ order, visible, closeModal }) => {
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    if (order && Object.keys(order).length > 0) {
      setOrderDetail(order);
    }
  }, [order]);

  return (
    <Modal show={visible} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Detalles de la Orden</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.keys(orderDetail).length > 0 && (
          <div>
            <Row>
              <Col>
                <h3>Orden</h3>
                <p>
                  <strong>Fecha de la Orden:</strong> {orderDetail.order_date}
                </p>
                <p>
                  <strong>Fecha de Entrega:</strong> {orderDetail.order_due_date}
                </p>
                <p>
                  <strong>Método de Pago:</strong> {orderDetail.payment_method}
                </p>
                <p>
                  <strong>Estado:</strong> {orderDetail.status}
                </p>
              </Col>
              <Col>
                <h3>Cliente</h3>
                <p>
                  {orderDetail?.user.first_name} {orderDetail?.user.last_name}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Detalles de Pago</h3>
                <p>
                  <strong>Total:</strong> {orderDetail.total_amount}
                </p>
                <p>
                  <strong>Monto Pagado:</strong> {orderDetail.amount_paid}
                </p>
              </Col>
              <Col>
                <h3>Producto</h3>
                <p>{orderDetail.product?.name}</p>
                <h3>Cantidad</h3>
                <p>{orderDetail.quantity}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>Observaciones</h3>
                <p>{orderDetail.observation}</p>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetailOrder;
