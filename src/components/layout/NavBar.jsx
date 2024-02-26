import React from "react";
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi"; // Importa el icono de configuración
import "./navbarStyles.css"; // Importa los estilos CSS

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img className="iconoCompany" src="/assets/img/logoCompany.png" alt="Logo" />
          <img className="nombreCompany" src="/assets/img/nombreCompany.png" alt="Logo" />
        </Link>
      </div>
      {/* <div className="navbar-icons">
        <Link to="/settings">
          <FiSettings size={50} color="black"/>
        </Link>
      </div> */}
    </nav>
  );
};

export default NavBar;
