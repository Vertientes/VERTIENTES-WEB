import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { getAuthentication } from "../../redux/auth/authThunks";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({ dni: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateCredentials = () => {
    const dni = credentials.dni;
    const password = credentials.password;
    if (!dni || dni.length !== 8) {
      setError("El DNI debe ser un número de 8 dígitos.");
      return false;
    }
    if (!password || password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (validateCredentials()) {
      setLoading(true);
      try {
        const data_auth = await dispatch(getAuthentication(credentials));
        if (data_auth.payload?.token && data_auth.payload?.user.is_active) {
          navigation("/home");
        } else {
          setError("Credenciales incorrectas");
        }
      } catch (error) {
        console.log(error.data);
        setError("Ocurrió un error durante la autenticación.");
      } finally {
        setLoading(false);
      }
    }
  };

  const placeholderStyles = {
    color: "transparent",
  };

  return (
    <Card
      className="w-100 text-center shadow br-10"
      style={{ maxWidth: "300px", justifyContent: "space-between" }}
    >
      <Card.Body>
        <Card.Img variant="top" src="/assets/img/logo.png" />
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dni">
            <Form.Control
              className="mt-3"
              type="number"
              name="dni"
              placeholder="Ingrese su DNI sin puntos..."
              value={credentials.dni}
              onChange={handleInput}
              required
              minLength={8}
              maxLength={8}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              className="mt-3"
              type="password"
              name="password"
              placeholder="Ingrese la contraseña"
              value={credentials.password}
              onChange={handleInput}
              required
              minLength={6}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="mt-3"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FormLogin;
