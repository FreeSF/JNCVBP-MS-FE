import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";

type DefaultServiceFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  handleRemoveVolunteer: any;
  volunteerOptions: any;
};

const DefaultServiceFields = ({
  formApi,
  formState,
  handleRemoveVolunteer,
  volunteerOptions,
}: DefaultServiceFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Hora de Llamada:</label>
            <Text className="form-control" field="call_time" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Salida:</label>
            <Text className="form-control" field="departure_time" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Llegada:</label>
            <Text className="form-control" field="arrival_time" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Retirada:</label>
            <Text className="form-control" field="withdrawal_time" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Localidad</label>
            <Text className="form-control" field="locality" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Barrio</label>
            <Text className="form-control" field="neighborhood" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Dirección</label>
            <Text className="form-control" field="address" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Lugar</label>
            <Text className="form-control" field="place" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Comunicado por</label>
            <Text className="form-control" field="alerted_by" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Teléfono</label>
            <Text className="form-control" field="phone" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Recibido por:</label>
            <Text className="form-control" field="received_by" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Equipo</label>
            <Text className="form-control" field="crew" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {/* Default fields */}
        <Col md="12">
          <Form.Group>
            <label>Descripción</label>
            <TextArea className="form-control" field="description" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Asistencia de Voluntarios</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newVolunteers = formState.values.volunteers || [];
                newVolunteers.push({ _id: undefined });
                formApi.setValues({ ...formState.values, volunteers: newVolunteers });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="volunteers" disabled={true} hidden /> {/*Need to be here to work*/}
      {(formState.values.volunteers || []).map((volunteer, i) => {
        return (
          <React.Fragment>
            <Row>
              <Col md="2"></Col>
              <Col md="6">
                <InformedSelect
                  className="form-control"
                  field={`volunteers[${i}]._id`}
                  initialValue={volunteerOptions[0]?.id}
                >
                  {volunteerOptions.map((volunteer) => (
                    <option value={volunteer.id} key={volunteer.id}>
                      {volunteer.name}
                    </option>
                  ))}
                </InformedSelect>
              </Col>
              <Col md="2">
                <Button
                  style={{ height: "40px" }}
                  className="btn-md"
                  variant="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    handleRemoveVolunteer(i);
                  }}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default DefaultServiceFields;
