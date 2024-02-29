import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button, Modal } from "react-bootstrap";
import { FaTruckArrowRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import ModalDetails from "./ModalDetails";
import AddDistributorModal from "./AddDistributorModal";

const DistributorsList = () => {
  const distributors = useSelector((state) => state.distributor.distributors);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleDistributorDetails = (distributor) => {
    setSelectedDistributor(distributor);
    setShowModal(true);
  };

  const handleModal = () => {
    setShowModalAdd(true);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };
  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      <Button variant="secondary" onClick={() => handleModal()}>
        Crear repartidor nuevo
      </Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {distributors && distributors.length > 0 ? (
            distributors.map((distributor) => (
              <tr key={distributor.dni}>
                <td>{`${distributor.first_name} ${distributor.last_name}`}</td>
                <td>{distributor.dni}</td>
                <td>{distributor.mobile_phone}</td>
                <td>{`${distributor.address.street} ${distributor.address.house_number}, ${distributor.address.neighborhood}, ${distributor.address.location}`}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDistributorDetails(distributor)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay distribuidores disponibles</td>
            </tr>
          )}
        </tbody>
      </Table>

      <ModalDetails
        showModal={showModal}
        closeModal={closeModal}
        selectedDistributor={selectedDistributor}
      />
      <AddDistributorModal show={showModalAdd} closeModal={closeModalAdd} />
    </div>
  );
};

export default DistributorsList;
