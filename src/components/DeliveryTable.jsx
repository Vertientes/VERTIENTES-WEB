import { useSelector } from "react-redux"

export const DeliveryTable = () => {
    const deliveries = useSelector((state) => state.delivery.deliveries)
    return (
        <>
            < table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">fecha</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries && (
                        deliveries.map((delivery) => {
                            return (
                                <tr key={delivery._id}>
                                    <td scope="row">{delivery._id}</td>
                                    <td>{delivery.delivery_date}</td>
                                </tr>
                            )
                        })
                    )

                    }
                </tbody>
            </table >
        </>


    )
}
