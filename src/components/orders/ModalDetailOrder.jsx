import React, { useEffect, useState } from "react";
import "./ModalDetailOrder.css"; // Importar estilos CSS

const ModalDetailOrder = ({ order, visible, closeModal }) => {
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    // Verificar si la orden recibida es válida y no está vacía
    if (order && Object.keys(order).length > 0) {
      setOrderDetail(order);
    }
  }, [order]);

  return (
    <div className={`modal ${visible ? "visible" : ""}`}>
      <div className="modal-content">
        <span onClick={closeModal} className="close-button">
          &times;
        </span>
        {orderDetail && Object.keys(orderDetail).length > 0 && ( // Validar que orderDetail no esté vacío
          <div style={{ textAlign: "center" }}>
            <h2 className="modal-title">Detalles de la Orden</h2>
            <p>
              <strong>Fecha de la Orden:</strong> {orderDetail.order_date}
            </p>

            <div className="order-details">
              <div className="order-info">
                <h3>Orden</h3>

                <p>
                  <strong>Fecha de Entrega:</strong>{" "}
                  {orderDetail.order_due_date}
                </p>
                <p>
                  <strong>Método de Pago:</strong>{" "}
                  {orderDetail.payment_method}
                </p>
                <p>
                  <strong>Estado:</strong> {orderDetail.status}
                </p>
              </div>

              <div className="customer-details">
                <h3>Cliente</h3>
                <p>
                  {orderDetail?.user.first_name} {orderDetail?.user.last_name}
                </p>
              </div>

              <div className="payment-details">
                <h3>Detalles de Pago</h3>
                <p>
                  <strong>Total:</strong> {orderDetail.total_amount}
                </p>
                <p>
                  <strong>Monto Pagado:</strong> {orderDetail.amount_paid}
                </p>
              </div>

              <div className="product-details">
                <h3>Producto</h3>
                <p>{orderDetail.product?.name}</p> {/* Validar que el producto esté presente */}
                <h3>Cantidad</h3>
                <p>{orderDetail.quantity}</p>
              </div>

              <div className="observation">
                <h3>Observaciones</h3>
                <p>{orderDetail.observation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDetailOrder;
