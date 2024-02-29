import { Modal } from "react-bootstrap";
const ModalDetails = ({ showModal, closeModal, selectedDistributor }) => {
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Repartidor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedDistributor && (
          <div>
            <p>
              <strong>Nombre:</strong>{" "}
              {`${selectedDistributor.first_name} ${selectedDistributor.last_name}`}
            </p>
            <p>
              <strong>Documento:</strong> {selectedDistributor.dni}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedDistributor.mobile_phone}
            </p>
            <p>
              <strong>Dirección:</strong>{" "}
              {`${selectedDistributor.address.street} ${selectedDistributor.address.house_number}, ${selectedDistributor.address.neighborhood}, ${selectedDistributor.address.location}`}
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalDetails;
