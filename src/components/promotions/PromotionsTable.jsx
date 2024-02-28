import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import FormAddPromotion from "./FormAddPromotion";
import FormUpdatePromotion from "./FormUpdatePromotion";
import ModalDeletePromotion from "./ModalDeletePromotion";

const PromotionsTable = () => {
  const promotions = useSelector((state) => state.promotion.promotions);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [selectPromotion, setselectPromotion] = useState(null);

  useEffect(() => {
    console.log(promotions);
  }, [promotions]);

  const handleOpenModalAdd = () => {
    setModalAddVisible(true);
  };

  const handleOpenModalUpdate = (product) => {
    setselectPromotion(product);
    setModalUpdateVisible(true);
  };

  const handleOpenModalDelete = (product) => {
    setselectPromotion(product);
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
      {promotions ? (
        promotions.map((promotion) => (
          <Card key={promotion._id} style={{ marginBottom: "10px" }}>
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
        ))
      ) : (
        <div>Aun no se han registrado promociones</div>
      )}
      <Button variant="secondary" onClick={handleOpenModalAdd}>
        Añadir promoción
      </Button>

      <FormAddPromotion
        show={modalAddVisible}
        handleClose={handleCloseModalAdd}
      />

      {selectPromotion && (
        <FormUpdatePromotion
          show={modalUpdateVisible}
          handleClose={handleCloseModalUpdate}
          promotion={selectPromotion}
        />
      )}

      {selectPromotion && (
        <ModalDeletePromotion
          show={modalDeleteVisible}
          handleClose={handleCloseModalDelete}
          promotion={selectPromotion}
        />
      )}
    </div>
  );
};

export default PromotionsTable;
