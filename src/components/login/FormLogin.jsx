import { useDispatch, useSelector } from "react-redux";
import { getAuthentication } from "../../redux/auth/authThunks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [credentials, setCredentials] = useState({
    dni: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando la solicitud

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
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
      setLoading(true); // Establecer loading en true al enviar el formulario
      try {
        const data_auth = await dispatch(
          getAuthentication({
            dni: credentials.dni,
            password: credentials.password,
          })
        );

        if (data_auth.payload?.token) {
          if (data_auth.payload?.user.is_active) {
            navigation("/home");
          } else {
            setError("Credenciales incorrectas");
          }
        }
      } catch (error) {
        console.log(error.data);
        setError("Ocurrió un error durante la autenticación.");
      } finally {
        setLoading(false); // Establecer loading en false después de recibir la respuesta
      }
    }
  };

  return (
    <div className="card">
      <img
        id="loginLogo"
        src="/assets/img/logo.png"
        width={200}
        height={200}
        alt="Logo"
      />
      <div className="card-content">
        {error && <div className="alert">{error}</div>}
        <form className="loginForm" onSubmit={handleSubmit}>
          <input
            className="loginInputs"
            name="dni"
            type="number"
            minLength={8}
            maxLength={8}
            value={credentials.dni}
            onChange={handleInput}
            placeholder="Ingrese su DNI sin puntos..."
            required
          />

          <input
            className="loginInputs"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleInput}
            placeholder="Ingrese la contraseña"
            required
          />
          <div className="containerButton">
            <button className="loginButton" type="submit" disabled={loading}> {/* Deshabilitar el botón durante la carga */}
              {loading ? 'Cargando...' : 'Ingresar'} {/* Cambiar el texto del botón durante la carga */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
