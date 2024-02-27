import FormLogin from "../components/login/FormLogin";
import { Container } from "react-bootstrap";

const Login = () => {
  return (
    <Container className="login-container d-flex justify-content-center align-items-center vh-100">
      <FormLogin />
    </Container>
  );
};

export default Login;
