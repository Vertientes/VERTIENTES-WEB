import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createPromotion,
  getPromotions,
} from "../../redux/promotions/promotionThunk";

const FormAddPromotion = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    description: "",
    required_quantity: null,
    discounted_percentage: null,
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ variant: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(
          createPromotion({
            description: formData.description,
            required_quantity: formData.required_quantity,
            discounted_percentage: formData.discounted_percentage,
            file: formData.file,
          })
        );

        setAlert({
          variant: "success",
          message: "¡Promocion creada correctamente!",
        });
      } catch (error) {
        setAlert({ variant: "danger", message: "Ha ocurrido un problema." });
      } finally {
        await dispatch(getPromotions());
        handleClose();
        setAlert({ variant: "", message: "" });
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.description.trim()) {
      errors.name = "La descripción es requerido";
      isValid = false;
    }
    if (!formData.required_quantity.trim()) {
      errors.price = "El precio es requerido";
      isValid = false;
    }
    if (!formData.discounted_percentage.trim()) {
      errors.type = "El tipo es requerido";
      isValid = false;
    }
    if (!formData.file) {
      errors.file = "La imagen es requerida";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nueva promoción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Esta promoción es valida para ...."
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>
              Cantidad requerida para aplicar la promocion
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="xxxx"
              name="required_quantity"
              value={formData.required_quantity}
              onChange={handleChange}
              isInvalid={errors.required_quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.required_quantity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Porcentaje de descuento</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ej: 12.5"
              name="discounted_percentage"
              value={formData.discounted_percentage}
              onChange={handleChange}
              isInvalid={errors.discounted_percentage}
            />
            <Form.Control.Feedback type="invalid">
              {errors.discounted_percentage}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formFile">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              isInvalid={errors.file}
            />
            <Form.Control.Feedback type="invalid">
              {errors.file}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Crear Promoción
          </Button>
        </Form>
        {alert.variant && (
          <Alert variant={alert.variant} className="mt-3">
            {alert.message}
          </Alert>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FormAddPromotion;
