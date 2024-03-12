import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { FaTruckArrowRight } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { BsBoxArrowInDown, BsPencilSquare } from "react-icons/bs"; // Importar iconos de React Bootstrap
import ModalDetailOrder from "./ModalDetailOrder";
import { EditOrderModal } from "./EditOrderModal";
import { DeliveryModal } from "./DeliveryModal";
import EmptyListMessage from "../layout/EmptyListMessage";

const DebtOrdersTable = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const orders = useSelector((state) => state.orders.debtOrders);
  const [modalVisible, setModalVisible] = useState(false);
  const [editOrderModalVisible, setEditOrderModalVisible] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState({});

  const handleDeliveryModal = (orderId) => {
    setOrderId(orderId);
    setDeliveryModalVisible(true);
  };

  const handleEditOrderModal = (order) => {
    setOrder(order);
    setEditOrderModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditOrderModalVisible(false);
    setDeliveryModalVisible(false);
  };

  return (
    <div>
      <Table bordered hover>
        <thead bg="">
          <tr>
            <th>Fecha de Orden</th>
            <th>Cliente</th>
            <th>Observacion</th>
            <th>Detalles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyListMessage />
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.order_date}</td>
                <td>
                  {order.user.first_name} {order.user.last_name}
                </td>
                <td>{order.observation}</td>
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
                  <div>
                    <CiEdit
                      className="action-icon"
                      onClick={() => handleEditOrderModal(order)}
                      size={25}
                    />
                  </div>
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

      <EditOrderModal
        order={order}
        visible={editOrderModalVisible}
        closeModal={closeModal}
      />

      <DeliveryModal
        orderId={orderId}
        visible={deliveryModalVisible}
        closeModal={closeModal}
      />
    </div>
  );
};

export default DebtOrdersTable;
