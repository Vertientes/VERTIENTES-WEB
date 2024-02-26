import React from "react";
import "./cardMenuItemStyles.css"; // Archivo de estilos CSS para la tarjeta
import { Link } from "react-router-dom";

const CardMenuItem = ({ item, onClick }) => {
  return (
    <Link
      className="card card-link"
      style={{ width: "16rem", height: "14rem" }}
      onClick={onClick}
    >
      <div className="card-icon">{item.icon}</div>
      <div className="card-content">
        <h2 className="card-title">{item.title}</h2>
        <p className="card-description">{item.description}</p>
      </div>
    </Link>
  );
};

export default CardMenuItem;
