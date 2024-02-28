import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const MenuNavbar = ({ menuItems }) => {
  return (

      <Navbar bg="dark" variant="dark" className="flex-column h-100">
        <Navbar.Brand to="/home">Vertientes</Navbar.Brand>

        <Nav className="flex-column flex-grow-1 w-100">
          {menuItems.map((item) => (
            <Nav.Link key={item.id} as={Link} to={item.link} className="text-light mt-3">
              <span>{item.title}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>
  );
};

export default MenuNavbar;
