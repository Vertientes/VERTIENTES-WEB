import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";
import { MdModeEdit, MdDelete } from "react-icons/md";
import AddUserModal from "./AddUserModal";
import UpdateRoleModal from "./UpdateRoleModal";
import UpdateStatusModal from "./UpdateStatusModal";
import EmptyListMessage from "../layout/EmptyListMessage";
import DetailsUserModal from "./DetailsUserModal";

const UsersActiveTable = () => {
  const role = useSelector((state) => state.auth.role);
  const users = useSelector((state) => state.user.usersActive);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalRole, setShowModalRole] = useState(false);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const handleuserDetails = (user) => {
    setSelectedUser(user);
    setShowModalDetails(true);
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

  const closeModalDetails = () => {
    setShowModalDetails(false);
  };

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

  const getClassForUserRow = (user) => {
    switch (user.role) {
      case "user_with_plan":
        return "table-danger";
      default:
        return "table-light";
    }
  };

  const getClassForUserBalance = (user) => {
    if (parseFloat(user.balance) < 0) {
      return "table-danger";
    } else {
      return "table-primary";
    }
  };
  return (
    <div>
      <Button variant="secondary" onClick={handleModal}>
        Crear un nuevo usuario
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Teléfono</th>
            <th>Tipo cliente</th>
            <th>Estado de la cuenta</th>
            <th>Balance del cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyListMessage />
              </td>
            </tr>
          ) : (
            currentUsers.map((user) => (
              <tr key={user.dni} className={getClassForUserRow(user)}>
                <td>{`${user.first_name} ${user.last_name}`}</td>
                <td>{user.dni}</td>
                <td>{user.mobile_phone}</td>
                <td>
                  {user.role}
                  {role === "super_admin" && (
                    <MdModeEdit
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModalRole(true);
                      }}
                    />
                  )}
                </td>
                <td>
                  {user.is_active ? "Activo" : "Inactivo"}
                  {role === "super_admin" && (
                    <MdModeEdit
                      onClick={() => {
                        setSelectedUser(user);
                        setShowModalStatus(true);
                      }}
                    />
                  )}
                </td>
                <td className={getClassForUserBalance(user)}>
                  ${user.balance}
                </td>

                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleuserDetails(user)}
                  >
                    <FaCircleInfo />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
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
      <DetailsUserModal
        user={selectedUser}
        show={showModalDetails}
        closeModal={closeModalDetails}
      />
    </div>
  );
};

export default UsersActiveTable;
