import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import {
  getCompanyDetails,
  updateCompanyDetails,
} from "../../redux/company/companyThunk";

const CompanyView = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const company = useSelector((state) => state.company.company);

  useEffect(() => {
    dispatch(getCompanyDetails());
  }, [dispatch]);

  useEffect(() => {
    setFormData(company);
  }, [company]);

  const handleEditCompany = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(company);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await dispatch(
        updateCompanyDetails({ id: formData._id, companyData: formData })
      );
      if (res.payload.success) {
        setSuccessMessage("¡Los cambios se guardaron exitosamente!");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage("Ha ocurrido un error al guardar los cambios.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Ha ocurrido un error al guardar los cambios.");
    }
    setIsEditing(false);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9} className="p-4">
          <h1 className="mb-4">Detalles de la Compañía</h1>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          {/* Sección: Datos de la empresa */}
          <Card className="mb-4">
            <Card.Body>
              <h2>Datos de la empresa</h2>
              <Form>
                <Form.Group as={Col} controlId="business_name">
                  <Form.Label>Nombre de la Empresa</Form.Label>
                  <Form.Control
                    type="text"
                    name="business_name"
                    value={formData.business_name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_name: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="business_name_cuil">
                  <Form.Label>Nombre de la Empresa (CUIT)</Form.Label>
                  <Form.Control
                    type="text"
                    name="business_name_cuil"
                    value={formData.business_name_cuil || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        business_name_cuil: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="cvu">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Sección: Datos de la empresa */}
          <Card className="mb-4">
            <Card.Body>
              <h2>Datos de transacciones</h2>
              <Form>
                <Form.Group as={Col} controlId="alias">
                  <Form.Label>Alias</Form.Label>
                  <Form.Control
                    type="text"
                    name="alias"
                    value={formData.alias || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alias: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="cvu">
                  <Form.Label>CVU o CBU</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvu"
                    value={formData.cvu || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cvu: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="alias">
                  <Form.Label>Titular</Form.Label>
                  <Form.Control
                    type="text"
                    name="holder_name"
                    value={formData.holder_name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        holder_name: e.target.value,
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="holder_cuil">
                  <Form.Label>CUIL del Titular</Form.Label>
                  <Form.Control
                    type="number"
                    name="holder_cuil"
                    value={formData.holder_cuil || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        holder_cuil: parseInt(e.target.value),
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Sección: Datos de transacciones */}
          <Card className="mb-4">
            <Card.Body>
              <h2>Datos de stock</h2>
              <Form>
                <Form.Group as={Col} controlId="company_drum_quantity">
                  <Form.Label>Cantidad de bidones en stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="company_drum_quantity"
                    value={formData.company_drum_quantity || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company_drum_quantity: parseInt(e.target.value),
                      })
                    }
                    readOnly={!isEditing}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          {/* Sección: Datos de dirección */}
          <Card className="mb-4">
            <Card.Body>
              <h2>Datos de dirección</h2>
              {formData.company_address && (
                <>
                  <Form>
                    <Form.Group as={Col} controlId="city">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            city: e.target.value,
                          })
                        }
                        readOnly={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="neighborhood">
                      <Form.Label>Barrio</Form.Label>
                      <Form.Control
                        type="text"
                        name="neighborhood"
                        value={formData?.company_address.neighborhood || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_address: {
                              ...formData.company_address,
                              neighborhood: e.target.value,
                            },
                          })
                        }
                        readOnly={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="postal_code">
                      <Form.Label>Código Postal</Form.Label>
                      <Form.Control
                        type="text"
                        name="postal_code"
                        value={formData.postal_code || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            postal_code: parseInt(e.target.value),
                          })
                        }
                        readOnly={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="street">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData?.company_address.street || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_address: {
                              ...formData.company_address,
                              street: e.target.value,
                            },
                          })
                        }
                        readOnly={!isEditing}
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="house_number">
                      <Form.Label>Número de Casa</Form.Label>
                      <Form.Control
                        type="text"
                        name="house_number"
                        value={formData?.company_address.house_number || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company_address: {
                              ...formData.company_address,
                              house_number: e.target.value,
                            },
                          })
                        }
                        readOnly={!isEditing}
                      />
                    </Form.Group>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Botones de edición */}
          {isEditing ? (
            <>
              <Button
                variant="success"
                className="mr-2"
                onClick={handleSaveChanges}
              >
                Guardar Cambios
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleEditCompany}>
              Editar
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyView;
