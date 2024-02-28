import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/products/productThunk";

const FormUpdateProduct = ({ show, product, handleClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    type: "bidon", // Establecer un valor predeterminado para el tipo de producto
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(
        updateProduct({
          id: formData.id,
          name: formData.name,
          price: formData.price,
          type: formData.type,
          description: formData.description,
          ["product-image"]: formData.file,
        })
      );
      handleClose();
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
      isValid = false;
    }
    if (!formData.price.trim()) {
      errors.price = "El precio es requerido";
      isValid = false;
    }
    if (!formData.type.trim()) {
      errors.type = "El tipo es requerido";
      isValid = false;
    }
    if (!formData.description.trim()) {
      errors.description = "La descripción es requerida";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bidon..."
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="xxxx"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              isInvalid={errors.type}
            >
              <option value="bidon">Bidon</option>
              <option value="dispenser">Dispenser</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.type}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Agregar descripcion"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
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
            Crear Producto
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormUpdateProduct;
