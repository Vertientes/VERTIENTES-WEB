import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
import AddUserModal from "./AddUserModal";
import UpdateRoleModal from "./UpdateRoleModal";
import UpdateStatusModal from "./UpdateStatusModal";

const UsersTable = () => {
  const users = useSelector((state) => state.user.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRole, setShowModalRole] = useState(false);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleuserDetails = (user) => {
    setSelectedUser(user);
    setShowModalRole(true);
  };

  const handleModal = () => {
    setShowModalAdd(true);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  const closeModalRole = () => {
    setShowModalRole(false);
  };

  const closeModalStatus = () => {
    setShowModalStatus(false);
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  // Calcular el índice del último y primer elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los usuarios de la página actual
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar a la página siguiente
  const nextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      const lastPage = Math.ceil(users.length / itemsPerPage);
      return nextPage <= lastPage ? nextPage : prevPage;
    });
  };

  // Cambiar a la página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleModal}>
        Crear un nuevo usuario
      </Button>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Tipo cliente</th>
            <th>Estado de la cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.dni}>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.dni}</td>
              <td>{user.mobile_phone}</td>
              <td>
                {user.role}
                <MdModeEdit
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModalRole(true);
                  }}
                />
              </td>
              <td>
                {user.is_active ? "Activo" : "Inactivo"}
                <MdModeEdit
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModalStatus(true);
                  }}
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleuserDetails(user)}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Página Anterior
        </Button>
        <Button
          variant="primary"
          onClick={nextPage}
          disabled={indexOfLastItem >= users.length}
        >
          Página Siguiente
        </Button>
      </div>
      <AddUserModal show={showModalAdd} closeModal={closeModalAdd} />
      <UpdateRoleModal
        id={selectedUser?._id}
        role={selectedUser?.role}
        show={showModalRole}
        closeModal={closeModalRole}
      />

      <UpdateStatusModal
        id={selectedUser?._id}
        status={selectedUser?.is_active}
        show={showModalStatus}
        closeModal={closeModalStatus}
      />
    </div>
  );
};

export default UsersTable;
