import { useSelector } from "react-redux";
const DeliveryTable = () => {
  const deliveries = useSelector((state) => state.delivery.deliveries);
  const filteredDeliveries = deliveries.filter(
    (delivery) => delivery.status === "pendiente"
  );
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">fecha</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries &&
            filteredDeliveries.map((delivery) => {
              return (
                <tr key={delivery._id}>
                  <td scope="row">{delivery._id}</td>
                  <td>{delivery.delivery_date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default DeliveryTable;
