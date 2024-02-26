import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeliveryModal } from "./DeliveryModal";
import { EditOrderModal } from "./EditOrderModal";
import { FiEdit, FiEdit2, FiTruck } from "react-icons/fi";
import { FaTruckArrowRight } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import "./ordersStyles.css"; // Importar el archivo CSS
import ModalDetailOrder from "./ModalDetailOrder";

const OrdersTable = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState({});
  const [orderDetail, setOrderDetail] = useState({});
  const orders = useSelector((state) => state.orders.pendingOrders);
  const [modalVisible, setModalVisible] = useState(false);
  const [editOrderModalVisible, setEditOrderModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);

  const handleDeliveryModal = (orderId) => {
    setOrderId(orderId);
  };

  const handleEditOrderModal = (order) => {
    setOrder(order);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditOrderModalVisible(false);
    setDeliveryModalVisible(false);
  };

  return (
    <div className="table-container">
      <table className="table orders-table shadow" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Fecha de Orden</th>
            <th>Cliente</th>
            <th>Observacion</th>
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
                <td>{order.observation}</td>
                <td>
                  Ver más
                  {
                    <TbListDetails
                      onClick={() => {
                        setOrderDetail(order);
                        setModalVisible(true);
                      }}
                      className="action-icon"
                    />
                  }
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#deliveryModal"
                    onClick={() => {
                      setOrderId(order._id);
                      setDeliveryModalVisible(true);
                    }}
                  >
                    Agregar a Reparto
                  </button>
                  <br />
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#editOrderModal"
                    onClick={() => {
                      setOrder(order);
                      setEditOrderModalVisible(true);
                    }}
                  >
                    Editar datos de la orden
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <>Aun no se han registrado pedidos pendientes</>
          )}
        </tbody>
      </table>

      {Object.keys(orderDetail).length > 0 && (
        <ModalDetailOrder
          order={orderDetail}
          visible={modalVisible}
          closeModal={closeModal}
        />
      )}

      <EditOrderModal order={order}></EditOrderModal>
      <DeliveryModal orderId={orderId}></DeliveryModal>
    </div>
  );
};

export default OrdersTable;
