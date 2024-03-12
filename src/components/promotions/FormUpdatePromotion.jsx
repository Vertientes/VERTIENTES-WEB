import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getPromotions,
  updatePromotion,
} from "../../redux/promotions/promotionThunk";

const FormUpdatePromotion = ({ show, promotion, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: promotion._id,
    description: promotion.description,
    required_quantity: promotion.required_quantity,
    discounted_percentage: promotion.discounted_percentage,
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
        const res = await dispatch(
          updatePromotion({
            id: formData.id,
            description: formData.description,
            required_quantity: formData.required_quantity,
            discounted_percentage: formData.discounted_percentage,
            file: formData.file || promotion.img, // Mantener la imagen original de la promoción si no se selecciona ninguna nueva
          })
        );
        if (res.payload.success) {
          setAlert({
            variant: "success",
            message: "¡Promoción actualizada correctamente!",
          });
        }
      } catch (error) {
        setAlert({ variant: "danger", message: "Ha ocurrido un problema." });
      } finally {
        handleClose();
        await dispatch(getPromotions());
      }
    }
    setAlert({ variant: "", message: "" });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.description.trim()) {
      errors.description = "La descripción es requerida";
      isValid = false;
    }
    if (!String(formData.required_quantity).trim()) {
      errors.required_quantity = "La cantidad requerida es requerida";
      isValid = false;
    }
    if (!String(formData.discounted_percentage).trim()) {
      errors.discounted_percentage = "El porcentaje de descuento es requerido";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar promoción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción de la promoción..."
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formRequiredQuantity">
            <Form.Label>Cantidad requerida</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad requerida..."
              name="required_quantity"
              value={formData.required_quantity}
              onChange={handleChange}
              isInvalid={errors.required_quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.required_quantity}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDiscountedPercentage">
            <Form.Label>Porcentaje de descuento</Form.Label>
            <Form.Control
              type="number"
              placeholder="Porcentaje de descuento..."
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
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Actualizar Promoción
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

export default FormUpdatePromotion;
