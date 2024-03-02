import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { FaTruckArrowRight } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import ModalDetailOrder from "./ModalDetailOrder";
import { MdDeleteForever } from "react-icons/md";


const OrdersCompletedTable = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const orders = useSelector((state) => state.orders.completedOrders);
  const [modalVisible, setModalVisible] = useState(false);
  const [editOrderModalVisible, setEditOrderModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('')

  const handleDeleteOrder = (orderId) => {
    setOrderId(orderId);
    setDeleteModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
    setEditOrderModalVisible(false);
    setDeleteModalVisible(false);
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div>
      
      <Table bordered hover>
        <thead bg="">
          <tr>
            <th>Fecha de Orden</th>
            <th>Cliente</th>
            <th>Observacion</th>
            <th>Detalles</th>
            <th>Eliminar</th>
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
                    <MdDeleteForever
                      className="action-icon"
                      onClick={() => handleDeleteOrder(order._id)}
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
{/* 
      <DeliveryModal
        orderId={orderId}
        closeModal={closeModal}
      /> */}
    </div>
  );
};

export default OrdersCompletedTable;
