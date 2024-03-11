import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MenuNavbar from "../../components/layout/NavBar";
import { getAllUsers, getUsersActive } from "../../redux/user/userThunk";
import UsersTable from "../../components/users/UsersTable";
import UsersActiveTable from "../../components/users/UsersActiveTable";

const UsersView = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchUsersData = async () => {
      await dispatch(getUsersActive());
      if (role === "super_admin") {
        await dispatch(getAllUsers());
      }
    };

    fetchUsersData();
  }, [dispatch]);

  const isAdmin = role === "super_admin";

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} className="bg-dark">
          <MenuNavbar />
        </Col>
        <Col sm={9}>
          <Tabs
            defaultActiveKey="customers-active"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="customers-active" title="Clientes activos">
              <UsersActiveTable />
            </Tab>
            {isAdmin && (
              <Tab eventKey="all-users" title="Todos los usuarios">
                <Container style={{ minHeight: "100vh" }}>
                  <UsersTable />
                </Container>
              </Tab>
            )}
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersView;
