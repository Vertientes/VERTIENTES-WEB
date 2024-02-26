import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { newDelivery } from "../../redux/delivery/deliveryThunk"

// eslint-disable-next-line react/prop-types
export const DeliveryModal = ({orderId}) => {
    const dispatch = useDispatch()
    const [delivery_date, set_delivery_date] = useState('')
    const handleChangeInput = (event) => {
        const parse = `${event.target.value}:00.000Z`
        set_delivery_date(parse)
    }
    const new_delivery = async () => {
        await dispatch(newDelivery({ id: orderId, delivery_date }))
    }
    useEffect(() => {
        console.log(orderId)
    }, [orderId])
    return (
        <div className="modal fade" id="deliveryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Fecha de reparto</label>
                                <input type="datetime-local" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => handleChangeInput(e)} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={() => { new_delivery() }}>Agregar a reparto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
