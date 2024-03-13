import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getAllDistributors, newDistributor } from "../../redux/distributors/distributorThunk";

const AddDistributorModal = ({ show, closeModal }) => {
  const dispatch = useDispatch();
  const [newDistributorData, setNewDistributorData] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    mobile_phone: "",
    password: "",
    address: {
      neighborhood: "",
      street: "",
      house_number: "",
      zone: "general",
      location: "NO DISPONIBLE",
    },
  });
  const [alert, setAlert] = useState({ message: "", variant: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDistributorData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewDistributorData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data_registered = await dispatch(
        newDistributor({ distributor_data: newDistributorData })
      );
      if (data_registered.payload.success) {
        setAlert({
          message: "Repartidor creado con éxito.",
          variant: "success",
        });
      }
    } catch (error) {
      setAlert({
        message: "Ha ocurrido un error interno.",
        variant: "danger",
      });
    } finally {
      await dispatch(getAllDistributors());
      closeModal();
      setAlert({
        message: "",
        variant: "",
      });
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nuevo Repartidor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="first_name"
              value={newDistributorData.first_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="last_name"
              value={newDistributorData.last_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDNI">
            <Form.Label>Documento de Identidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="DNI"
              name="dni"
              value={newDistributorData.dni}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={newDistributorData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMobilePhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              name="mobile_phone"
              value={newDistributorData.mobile_phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Calle"
              name="street"
              value={newDistributorData.address.street}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="Número de casa"
              name="house_number"
              value={newDistributorData.address.house_number}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="Barrio"
              name="neighborhood"
              value={newDistributorData.address.neighborhood}
              onChange={handleAddressChange}
            />
            <Form.Control
              as="select"
              name="zone"
              value={newDistributorData.address.zone}
              onChange={handleAddressChange}
            >
              <option value="general">General</option>
              <option value="c5">C5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear Repartidor
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddDistributorModal;
