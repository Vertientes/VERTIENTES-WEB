import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { menuItemsAdmin, menuItemsSuperAdmin } from "../../utils/menu-items";
import { logout } from "../../redux/auth/authSlice";

const MenuNavbar = () => {
  const [menuItems, setMenuItems] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (role == "super_admin") {
      setMenuItems(menuItemsSuperAdmin);
    } else if (role === "admin") {
      setMenuItems(menuItemsAdmin);
    } else {
      navigation("/");
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
              className="text-light mt-3"
              onClick={() => {
                if (item.title === "Cerrar sesión") {
                  dispatch(logout());
                  navigation(item.link);
                } else {
                  navigation(item.link);
                }
              }}
            >
              <span>{item.title}</span>
            </Nav.Link>
          ))}
      </Nav>
    </Navbar>
  );
};

export default MenuNavbar;
