import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import {
  changeUserRoleWithPlan,
  getUsersActive,
} from "../../redux/user/userThunk";

const UpdateRoleModal = ({ show, id, role, closeModal }) => {
  const dispatch = useDispatch();
  const [newRole, setnewRole] = useState({
    role: role,
  });
  const [alert, setAlert] = useState({ message: "", variant: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setnewRole((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data_registered = await dispatch(
        changeUserRoleWithPlan({ id: id, role: newRole })
      );
      console.log(data_registered.payload.success);
      if (data_registered.payload?.user) {
        setAlert({
          message: "Usuario editado con exito.",
          variant: "success",
        });
        await dispatch(getUsersActive());
      }
    } catch (error) {
      setAlert({
        message: "Ha ocurrido un error interno.",
        variant: "danger",
      });
    } finally {
      closeModal();
    }
  };

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar tipo de cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.message && (
          <Alert variant={alert.variant}>{alert.message}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="select"
              name="role"
              value={newRole.role}
              onChange={handleChange}
            >
              <option value="user">Cliente</option>
              <option value="user_with_plan">Cliente con abono</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Cambiar tipo de cliente
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateRoleModal;
