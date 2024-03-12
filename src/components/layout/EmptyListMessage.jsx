import React from "react";
import { Container } from "react-bootstrap";
import { TbMoodEmpty } from "react-icons/tb";

const EmptyListMessage = () => {
  return (
    <Container className="text-center">
      <TbMoodEmpty size={50} color="#6c757d" /> {/* Tamaño y color del icono */}
      <p className="mt-3">Nada por aquí por ahora</p> {/* Mensaje */}
    </Container>
  );
};

export default EmptyListMessage;
