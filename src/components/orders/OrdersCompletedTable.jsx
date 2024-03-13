import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Alert } from "react-bootstrap";
import { BiDetail } from "react-icons/bi";
import ModalDetailOrder from "./ModalDetailOrder";
import { MdDeleteForever } from "react-icons/md";
import EmptyListMessage from "../layout/EmptyListMessage";
import DeleteOrderModal from "./DeleteOrderModal";
import { deleteOrderCompleted } from "../../redux/orders/orderThunk";

const OrdersCompletedTable = () => {
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const orders = useSelector((state) => state.orders.completedOrders);

  const handleDeleteOrder = (orderId) => {
    setOrderIdToDelete(orderId);
    setDeleteModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDeleteModalVisible(false);
  };

  const handleDeleteConfirmed = async (orderId) => {
    try {
      const res = await dispatch(deleteOrderCompleted({ id: orderId }));
      if (res.payload.success) {
        setAlertVariant("success");
        setAlertMessage("¡Orden eliminada exitosamente!");
      } else {
        setAlertVariant("danger");
        setAlertMessage("Error al eliminar la orden. Inténtalo de nuevo.");
      }
    } catch (error) {
      setAlertVariant("danger");
      setAlertMessage("Error al eliminar la orden. Inténtalo de nuevo.");
    } finally {
      closeModal();
    }
  };

  return (
    <div>
      {alertMessage && (
        <Alert variant={alertVariant} onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}

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
                  <BiDetail
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
                    <MdDeleteForever
                      className="action-icon"
                      onClick={() => handleDeleteOrder(order._id)}
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

      <DeleteOrderModal
        orderId={orderIdToDelete}
        visible={deleteModalVisible}
        closeModal={closeModal}
        handleDelete={handleDeleteConfirmed}
      />
    </div>
  );
};

export default OrdersCompletedTable;
