import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import EmptyListMessage from "../layout/EmptyListMessage";

const DeliveryTable = () => {
  const deliveries = useSelector((state) => state.delivery.deliveries);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);

  useEffect(() => {
    const pendingDeliveries = deliveries.filter(
      (delivery) => delivery.status === "pendiente"
    );
    setPendingDeliveries(pendingDeliveries);
  }, [deliveries]);

  return (
    <div>
      <Table bordered hover>
        <thead bg="">
          <tr>
            <th>Fecha de reparto</th>

            <th>Zona</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pendingDeliveries.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyListMessage />
              </td>
            </tr>
          ) : (
            pendingDeliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td>{delivery.delivery_date}</td>

                <td>{delivery.delivery_zone}</td>
                <td>{delivery.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DeliveryTable;
