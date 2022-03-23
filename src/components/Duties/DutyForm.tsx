import React from "react";
import { Text, TextArea } from "informed"; //Form

import { Button, Card, Col, Form, Row } from "react-bootstrap";

const DutyForm = () => {
  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Servicio</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="12">
                <Form.Group>
                  <label>Nombre</label>
                  <Text className="form-control" field="name" type="text" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <Form.Group>
                  <label>Descripción</label>
                  <TextArea className="form-control" field="description" type="text" />
                </Form.Group>
              </Col>
            </Row>

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              {" "}
              Guardar Servicio
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default DutyForm;
