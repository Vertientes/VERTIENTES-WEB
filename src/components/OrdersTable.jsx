import { useSelector } from "react-redux"
import { DeliveryModal } from "./DeliveryModal"
import { useState } from "react"
import { EditOrderModal } from "./EditOrderModal"
import { EditUserModal } from "./EditUserModal"

export const OrdersTable = () => {
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState({})
    const [user, setUser] = useState({})
    const orders = useSelector((state) => state.orders.orders)
    return (
        <>
            < table className="table">
                <thead>
                    <tr>
                        <th scope="col">Estado de la orden</th>
                        <th scope="col">Solicito</th>
                        <th scope="col">Numero de contacto</th>
                        <th scope="col">Zona</th>
                        <th scope="col">Saldo</th>
                        <th scope="col">Coordenadas</th>
                        <th scope="col">Fecha de la orden</th>
                        <th scope="col">Fecha de vencimiento</th>
                        <th scope="col">Metodo de pago</th>
                        <th scope="col">Cantidad Pagada</th>
                        <th scope="col">Pago extra</th>
                        <th scope="col">Recargas entregadas</th>
                        <th scope="col">Recargas a favor</th>
                        <th scope="col">Observacion</th>
                        <th scope="col">Monto total</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && (
                        orders.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td scope="row">{`${order.status}`}</td>
                                    <td scope="row">{`${order.user.firstName} ${order.user.lastName}`}</td>
                                    <td>{order.user.mobile_phone}</td>
                                    <td>{order.user.address.zone}</td>
                                    <td>{order.user.balance}</td>
                                    <td>{order.user.address.location}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.order_due_date}</td>
                                    <td>{order.payment_method}</td>
                                    <td>{order.amount_paid}</td>
                                    <td>{order.extra_payment}</td>
                                    <td>{order.recharges_delivered}</td>
                                    <td>{order.recharges_in_favor}</td>
                                    <td>{order.observation}</td>
                                    <td>{order.total_amount}</td>
                                    <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#deliveryModal" onClick={() => setOrderId(order._id)}>
                                        Agregar a Reparto
                                    </button>
                                        <br />
                                        <br />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editOrderModal" onClick={() => setOrder(order)}>
                                            Editar datos de la orden
                                        </button>
                                        <br />
                                        <br />
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUserModal" onClick={() => setUser(order.user)}>
                                            Editar datos del usuario
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    )

                    }
                </tbody>
            </table >
            <DeliveryModal orderId={orderId}></DeliveryModal>
            <EditOrderModal order={order}></EditOrderModal>
            <EditUserModal user={user}></EditUserModal>
        </>


    )
}
