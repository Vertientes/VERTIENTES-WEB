/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllInProcessOrders,
  getAllPendingOrders,
  updateOrderData,
} from "../../redux/orders/orderThunk";

export const EditOrderModal = ({ order, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    order_date: "",
    order_due_date: "",
    amount_paid: "",
    recharges_delivered: "",
    recharges_in_favor: "",
    observation: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        order_date: order.order_date || "",
        order_due_date: order.order_due_date || "",
        amount_paid: order.amount_paid || "",
        recharges_delivered: order.recharges_delivered || "",
        recharges_in_favor: order.recharges_in_favor || "",
        observation: order.observation || "",
      });
    }
  }, [order]);

  const handleChangeInput = (event) => {
    // Actualizar el estado local cuando cambian los datos de entrada
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeInputDate = (event) => {
    const parse = `${event.target.value}:00.000Z`;
    setFormData({
      [event.target.name]: parse,
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
    }
  };

  return (
    <div className="modal" id="editOrderModal" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Editar Orden</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={closeModal}
          ></button>
        </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Modificar fecha de la orden
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="order_date"
                  name="order_date"
                  onChange={(e) => handleChangeInputDate(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Modificar fecha de vencimiento de la orden
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="order_due_date"
                  name="order_due_date"
                  onChange={(e) => handleChangeInputDate(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Modificar cantidad pagada</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount_paid"
                  name="amount_paid" // Asigna el nombre del campo correspondiente
                  value={formData.amount_paid} // Asigna el valor del campo desde el estado local
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Modificar recargas entregadas
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recharges_delivered"
                  name="recharges_delivered" // Asigna el nombre del campo correspondiente
                  value={formData.recharges_delivered} // Asigna el valor del campo desde el estado local
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Modificar recargas a favor</label>
                <input
                  type="number"
                  className="form-control"
                  id="recharges_in_favor"
                  name="recharges_in_favor" // Asigna el nombre del campo correspondiente
                  value={formData.recharges_in_favor} // Asigna el valor del campo desde el estado local
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Modificar observacion</label>
                <input
                  type="text"
                  className="form-control"
                  id="observation"
                  name="observation" // Asigna el nombre del campo correspondiente
                  value={formData.observation} // Asigna el valor del campo desde el estado local
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                updateOrder();
              }}
            >
              Actualizar orden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
