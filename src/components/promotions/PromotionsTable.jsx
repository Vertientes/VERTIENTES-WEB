import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import FormAddPromotion from "./FormAddPromotion";
import FormUpdatePromotion from "./FormUpdatePromotion";
import ModalDeletePromotion from "./ModalDeletePromotion";
import EmptyListMessage from "../layout/EmptyListMessage";

const PromotionsTable = () => {
  const promotions = useSelector((state) => state.promotion.promotions);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const handleOpenModalAdd = () => {
    setModalAddVisible(true);
  };

  const handleOpenModalUpdate = (promotion) => {
    setSelectedPromotion(promotion);
    setModalUpdateVisible(true);
  };

  const handleOpenModalDelete = (promotion) => {
    setSelectedPromotion(promotion);
    setModalDeleteVisible(true);
  };

  const handleCloseModalAdd = () => {
    setModalAddVisible(false);
  };

  const handleCloseModalUpdate = () => {
    setModalUpdateVisible(false);
  };

  const handleCloseModalDelete = () => {
    setModalDeleteVisible(false);
  };

  return (
    <div>
      <table>
        <tbody>
          {promotions.length === 0 ? (
            <tr>
              <td colSpan="5">
                <EmptyListMessage />
              </td>
            </tr>
          ) : (
            promotions.map((promotion) => (
              <tr key={promotion._id}>
                <Card style={{ marginBottom: "10px", width: "100%" }}>
                  <Row className="p-3">
                    <Col
                      xs={2}
                      className="d-flex justify-content-center align-items-center text-center"
                    >
                      <Card.Img
                        src={promotion.img}
                        style={{ borderRadius: "50%" }}
                        width={5}
                      />
                    </Col>
                    <Col xs={2} className="text-center">
                      <Card.Text>{promotion.description}</Card.Text>
                    </Col>
                    <Col xs={2} className="text-center">
                      <Card.Text>{promotion.required_quantity}</Card.Text>
                    </Col>
                    <Col xs={1} className="text-center">
                      <Card.Text>{promotion.discounted_porcentaje}</Card.Text>
                    </Col>
                    <Col xs={1} className="text-center">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModalUpdate(promotion)}
                      >
                        Editar
                      </Button>
                    </Col>
                    <Col xs={2} className="text-center">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenModalDelete(promotion)}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Button variant="secondary" onClick={handleOpenModalAdd}>
        Añadir promoción
      </Button>

      <FormAddPromotion
        show={modalAddVisible}
        handleClose={handleCloseModalAdd}
      />

      {selectedPromotion && (
        <FormUpdatePromotion
          show={modalUpdateVisible}
          handleClose={handleCloseModalUpdate}
          promotion={selectedPromotion}
        />
      )}

      {selectedPromotion && (
        <ModalDeletePromotion
          show={modalDeleteVisible}
          handleClose={handleCloseModalDelete}
          promotion={selectedPromotion}
        />
      )}
    </div>
  );
};

export default PromotionsTable;
