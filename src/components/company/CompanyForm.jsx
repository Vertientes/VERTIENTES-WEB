import React, { useState } from "react";
import { Modal, Form, Button, Col } from "react-bootstrap";

const CompanyFormModal = ({ show, handleClose, onCreateCompany }) => {
  const [formData, setFormData] = useState({
    alias: "",
    business_name: "",
    business_name_cuil: "",
    city: "",
    company_drum_quantity: "",
    cvu: "",
    email: "",
    holder_cuil: "",
    holder_name: "",
    house_number: "",
    neighborhood: "",
    postal_code: "",
    street: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onCreateCompany(formData);
      handleClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.alias) {
      errors.alias = "El alias es requerido";
    }

    if (!data.business_name) {
      errors.business_name = "El nombre de la empresa es requerido";
    }

    if (!data.business_name_cuil) {
      errors.business_name_cuil = "El CUIL de la empresa es requerido";
    }

    if (!data.city) {
      errors.city = "La ciudad es requerida";
    }

    if (!data.company_drum_quantity) {
      errors.company_drum_quantity = "La cantidad de tambores es requerida";
    }

    if (!data.cvu) {
      errors.cvu = "El CVU es requerido";
    }

    if (!data.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!data.holder_cuil) {
      errors.holder_cuil = "El CUIL del titular es requerido";
    }

    if (!data.holder_name) {
      errors.holder_name = "El nombre del titular es requerido";
    }

    if (!data.house_number) {
      errors.house_number = "El número de casa es requerido";
    }

    if (!data.neighborhood) {
      errors.neighborhood = "El barrio es requerido";
    }

    if (!data.postal_code) {
      errors.postal_code = "El código postal es requerido";
    }

    if (!data.street) {
      errors.street = "La calle es requerida";
    }

    return errors;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Compañía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="alias">
            <Form.Label>Alias</Form.Label>
            <Form.Control
              type="text"
              name="alias"
              value={formData.alias}
              onChange={handleInputChange}
              isInvalid={!!errors.alias}
            />
            <Form.Control.Feedback type="invalid">
              {errors.alias}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="business_name">
            <Form.Label>Nombre de la Empresa</Form.Label>
            <Form.Control
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              isInvalid={!!errors.business_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.business_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="business_name_cuil">
            <Form.Label>CUIL de la Empresa</Form.Label>
            <Form.Control
              type="text"
              name="business_name_cuil"
              value={formData.business_name_cuil}
              onChange={handleInputChange}
              isInvalid={!!errors.business_name_cuil}
            />
            <Form.Control.Feedback type="invalid">
              {errors.business_name_cuil}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="city">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="company_drum_quantity">
            <Form.Label>Cantidad de Tambores</Form.Label>
            <Form.Control
              type="text"
              name="company_drum_quantity"
              value={formData.company_drum_quantity}
              onChange={handleInputChange}
              isInvalid={!!errors.company_drum_quantity}
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_drum_quantity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="cvu">
            <Form.Label>CVU</Form.Label>
            <Form.Control
              type="text"
              name="cvu"
              value={formData.cvu}
              onChange={handleInputChange}
              isInvalid={!!errors.cvu}
            />
            <Form.Control.Feedback type="invalid">
              {errors.cvu}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="holder_cuil">
            <Form.Label>CUIL del Titular</Form.Label>
            <Form.Control
              type="text"
              name="holder_cuil"
              value={formData.holder_cuil}
              onChange={handleInputChange}
              isInvalid={!!errors.holder_cuil}
            />
            <Form.Control.Feedback type="invalid">
              {errors.holder_cuil}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="holder_name">
            <Form.Label>Nombre del Titular</Form.Label>
            <Form.Control
              type="text"
              name="holder_name"
              value={formData.holder_name}
              onChange={handleInputChange}
              isInvalid={!!errors.holder_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.holder_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="house_number">
            <Form.Label>Número de Casa</Form.Label>
            <Form.Control
              type="text"
              name="house_number"
              value={formData.house_number}
              onChange={handleInputChange}
              isInvalid={!!errors.house_number}
            />
            <Form.Control.Feedback type="invalid">
              {errors.house_number}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="neighborhood">
            <Form.Label>Barrio</Form.Label>
            <Form.Control
              type="text"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleInputChange}
              isInvalid={!!errors.neighborhood}
            />
            <Form.Control.Feedback type="invalid">
              {errors.neighborhood}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="postal_code">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              isInvalid={!!errors.postal_code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.postal_code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="street">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              isInvalid={!!errors.street}
            />
            <Form.Control.Feedback type="invalid">
              {errors.street}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">
            Crear Compañía
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CompanyFormModal;
