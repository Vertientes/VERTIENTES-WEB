import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrders } from "../redux/orders/orderThunk";
import { updateUserData } from "../redux/user/userThunk";

export const EditUserModal = ({ user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    mobile_phone: "",
    balance: "",
    neighborhood: "",
    street: "",
    houseNumber: "",
    zone: "",
    location: "",
    company_drum: "",
    house_img: null,
  });

  useEffect(() => {
    if (user && user.address) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        mobile_phone: user.mobile_phone,
        balance: user.balance,
        neighborhood: user.address.neighborhood,
        street: user.address.street,
        houseNumber: user.address.houseNumber,
        zone: user.address.zone,
        location: user.address.location,
        company_drum: user.company_drum,
        house_img: user.house_img,
      });
    }
  }, [user]);

  const handleChangeInput = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      house_img: event.target.files[0],
    }));
  };

  const updateUser = async () => {
    const user_data = {
      id: user._id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dni: formData.dni,
      mobile_phone: formData.mobile_phone,
      balance: formData.balance,
      neighborhood: formData.neighborhood,
      street: formData.street,
      houseNumber: formData.houseNumber,
      zone: formData.zone,
      location: formData.location,
      company_drum: formData.company_drum,
      house_img: formData.house_img,
    };
    await dispatch(updateUserData({ user_data }));
    await dispatch(getAllOrders());
  };

  return (
    <div
      className="modal fade"
      id="editUserModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Editar usuario
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DNI</label>
                <input
                  type="number"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono móvil</label>
                <input
                  type="number"
                  className="form-control"
                  id="mobile_phone"
                  name="mobile_phone"
                  value={formData.mobile_phone}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Balance</label>
                <input
                  type="number"
                  className="form-control"
                  id="balance"
                  name="balance"
                  value={formData.balance}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Barrio</label>
                <input
                  type="text"
                  className="form-control"
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Calle</label>
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Número de casa</label>
                <input
                  type="number"
                  className="form-control"
                  id="houseNumber"
                  name="houseNumber"
                  value={formData.houseNumber}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Zona</label>
                <input
                  type="text"
                  className="form-control"
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ubicación</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={(e) => handleChangeInput(e)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Archivo</label>
                <input
                  type="file"
                  className="form-control"
                  id="house_img"
                  name="house_img"
                  onChange={(e) => handleFileChange(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                updateUser();
              }}
            >
              Actualizar usuario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
