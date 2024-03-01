import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { FaTruckArrowRight } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import ModalDetailOrder from "../orders/ModalDetailOrder";
import { DeliveryModal } from "../orders/DeliveryModal";

const RequestsTable = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const orders = useSelector((state) => state.orders.inProcessOrders);
  const [modalVisible, setModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleDeliveryModal = (orderId) => {
    setOrderId(orderId);
    setDeliveryModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDeliveryModalVisible(false);
  };

  return (
    <div>
      <Table bordered hover>
        <thead bg="">
          <tr>
            <th>Fecha de Orden</th>
            <th>Cliente</th>
            <th>Solicitud de recarga</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.order_date}</td>
                <td>
                  {order.user.first_name} {order.user.last_name}
                </td>
                <td>{order.request_recharges[0]}</td>
                <td align="center">
                  <BiDetail // Icono para mostrar detalles
                    onClick={() => {
                      setOrderDetail(order);
                      setModalVisible(true);
                    }}
                    className="action-icon"
                    size={30}
                  />
                </td>
                <td className="d-flex justify-content-between">
                  <div className="ml-3">
                    {/* Agregamos un margen izquierdo para espaciar */}
                    <FaTruckArrowRight
                      className="action-icon"
                      onClick={() => handleDeliveryModal(order._id)}
                      size={30}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aun no se han registrado pedidos pendientes</td>
            </tr>
          )}
        </tbody>
      </Table>

      {Object.keys(orderDetail).length > 0 && (
        <ModalDetailOrder
          order={orderDetail}
          visible={modalVisible}
          closeModal={closeModal}
        />
      )}

      <DeliveryModal
        orderId={orderId}
        visible={deliveryModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
};

export default RequestsTable;
