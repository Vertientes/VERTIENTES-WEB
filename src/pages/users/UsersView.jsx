import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { menuItems } from "../../utils/menu-items";
import { getAllUsers } from "../../redux/user/userThunk";
import UsersTable from "../../components/users/UsersTable";

const UsersView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      await dispatch(getAllUsers());
    };

    fetchCustomers();
  }, [dispatch]);

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar menuItems={menuItems} />
        </Col>
        <Col sm={9}>
          <Tabs
            defaultActiveKey="customers-active"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="customers-active" title="Clientes activos">
              Clientes activos
            </Tab>
            <Tab eventKey="all-users" title="Todos los usuarios">
              <Container style={{ minHeight: "100vh" }}>
                <UsersTable />
              </Container>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersView;
