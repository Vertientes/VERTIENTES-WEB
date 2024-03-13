import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Alert } from "react-bootstrap";
import {
  getAllUsers,
  getUsersActive,
  updateUserBySuperAdmin,
} from "../../redux/user/userThunk";
import { useDispatch, useSelector } from "react-redux";

const DetailsUserModal = ({ show, user, closeModal }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const [userData, setUserData] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState(null);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setUserData(user);
      initializeEditableFields(user);
    }
  }, [user]);

  const initializeEditableFields = (userData) => {
    const fields = {};
    Object.keys(userData).forEach((key) => {
      fields[key] = userData[key];
    });
    setEditableFields(fields);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableFields({
      ...editableFields,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    initializeEditableFields(userData);
  };

  const handleSaveClick = async () => {
    console.log(editableFields);
    try {
      const res = await dispatch(
        updateUserBySuperAdmin({ id: userData._id, userData: editableFields })
      );

      if (res.payload.success) {
        setAlertVariant("success");
        setAlertMessage("¡Usuario actualizado exitosamente!");
        await dispatch(getUsersActive());
        await dispatch(getAllUsers());
      } else {
        setAlertVariant("danger");
        setAlertMessage("Error al actualizar el usuario. Inténtalo de nuevo.");
      }
    } catch (error) {
      setAlertVariant("danger");
      setAlertMessage(
        "Ha ocurrido un error interno. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      closeModal();
      setAlertVariant(null);
      setAlertMessage(null);
    }

    setIsEditing(false);
  };

  return (
    <Modal show={show} onHide={closeModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage(null)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
      </Modal.Header>
      <Modal.Body>
        {Object.keys(userData).length > 0 && (
          <Row>
            <Col>
              <h5>Información Personal:</h5>
              <Form>
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={editableFields.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Apellido:</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={editableFields.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Documento:</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={editableFields.dni}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    type="text"
                    name="mobile_phone"
                    value={editableFields.mobile_phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Zona:</Form.Label>
                  <Form.Control
                    as="select"
                    name="address.zone"
                    value={editableFields.address.zone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="c5">C5</option>
                    <option value="general">General</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dirección:</Form.Label>

                  <Form.Control
                    type="text"
                    name="address.neighborhood"
                    value={editableFields.address.neighborhood}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dirección:</Form.Label>

                  <Form.Control
                    type="text"
                    name="address.location"
                    value={editableFields.address.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calle:</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.street"
                    value={editableFields.address.street}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Número de casa:</Form.Label>
                  <Form.Control
                    type="text"
                    name="address.house_number"
                    value={editableFields.address.house_number}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <h5>Información Adicional:</h5>
              <Form>
                <Form.Group>
                  <Form.Label>Balance:</Form.Label>
                  <Form.Control
                    type="text"
                    name="balance"
                    value={editableFields.balance}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Empresa del Tambor:</Form.Label>
                  <Form.Control
                    type="text"
                    name="company_drum"
                    value={editableFields.company_drum}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Imagen de la casa:</Form.Label>
                  <div>
                    {userData.house_img.length > 0 ? (
                      <img src={userData.house_img} style={{ width: "100%" }} />
                    ) : (
                      <Alert variant="warning">No disponible</Alert>
                    )}
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        {role === "super_admin" && !isEditing && (
          <Button variant="primary" onClick={handleEditClick}>
            Editar
          </Button>
        )}
        {isEditing && (
          <>
            <Button variant="secondary" onClick={handleCancelClick}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveClick}>
              Guardar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsUserModal;
