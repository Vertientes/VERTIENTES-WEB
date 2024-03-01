import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuItemsAdmin, menuItemsSuperAdmin } from "../../utils/menu-items";

const MenuNavbar = () => {
  const [menuItems, setMenuItems] = useState();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role == "super_admin") {
      setMenuItems(menuItemsSuperAdmin);
    } else {
      setMenuItems(menuItemsAdmin);
    }
  }, [role]);
  return (
    <Navbar bg="dark" variant="dark" className="flex-column h-100">
      <Navbar.Brand to="/home">Vertientes</Navbar.Brand>

      <Nav className="flex-column flex-grow-1 w-100">
        {menuItems &&
          menuItems.map((item) => (
            <Nav.Link
              key={item.id}
              as={Link}
              to={item.link}
              className="text-light mt-3"
            >
              <span>{item.title}</span>
            </Nav.Link>
          ))}
      </Nav>
    </Navbar>
  );
};

export default MenuNavbar;
