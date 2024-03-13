import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { signUp } from "../../redux/user/userThunk";

const AddUserModal = ({ show, closeModal }) => {
  const dispatch = useDispatch();
  const [newUserData, setnewUserData] = useState({
    first_name: "",
    last_name: "",
    dni: "",
    mobile_phone: "",
    password: "",
    address: {
      neighborhood: "",
      street: "",
      house_number: "",
      zone: "c5",
      location: "",
    },
  });
  const [alert, setAlert] = useState({ message: "", variant: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setnewUserData((prevState) => ({
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
        signUp({ user_data: newUserData })
      );
      console.log(data_registered.payload.success);
      if (data_registered.payload?.user) {
        setAlert({
          message: "Usuario creado con éxito.",
          variant: "success",
        });
        await dispatch(getAllDistributors());
      }
    } catch (error) {
      setAlert({
        message: "Ha ocurrido un error interno.",
        variant: "danger",
      });
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Crear un nuevo usuario del sistema</Modal.Title>
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
              value={newUserData.first_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="last_name"
              value={newUserData.last_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formDNI">
            <Form.Label>Documento de Identidad</Form.Label>
            <Form.Control
              type="text"
              placeholder="DNI"
              name="dni"
              value={newUserData.dni}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={newUserData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formMobilePhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono"
              name="mobile_phone"
              value={newUserData.mobile_phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              placeholder="Calle"
              name="street"
              value={newUserData.address.street}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="Número de casa"
              name="house_number"
              value={newUserData.address.house_number}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="Barrio"
              name="neighborhood"
              value={newUserData.address.neighborhood}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="location"
              name="location"
              value={newUserData.address.location}
              onChange={handleAddressChange}
            />
            <Form.Control
              as="select"
              name="zone"
              value={newUserData.address.zone}
              onChange={handleAddressChange}
            >
              <option value="general">General</option>
              <option value="c5">C5</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
