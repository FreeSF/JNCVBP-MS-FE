import React from "react";
import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { CreateServiceInput, UpdateServiceInput } from "types";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import TimePicker from "react-time-picker";

type DefaultServiceFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  volunteerOptions: any;
  arrayRemove: any;
  isCreate: boolean;
};

const DefaultServiceView = ({
  formApi,
  formState,
  volunteerOptions,
  arrayRemove,
  isCreate,
}: DefaultServiceFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Hora de Llamada:</label>
            <Text className="form-control" field="call_time" type="text" hidden />
            <TimePicker
              locale="es"
              className="form-control"
              field="call_time"
              onChange={(value) => {
                formApi.setValues({ ...formState.values, call_time: value });
              }}
              type="text"
              value={formState.values.call_time}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Salida:</label>
            <Text className="form-control" field="departure_time" type="text" hidden />
            <TimePicker
              locale="es"
              className="form-control"
              field="departure_time"
              onChange={(value) => {
                formApi.setValues({ ...formState.values, departure_time: value });
              }}
              type="text"
              value={formState.values.departure_time}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Llegada:</label>
            <Text className="form-control" field="arrival_time" type="text" hidden />
            <TimePicker
              locale="es"
              className="form-control"
              field="arrival_time"
              onChange={(value) => {
                formApi.setValues({ ...formState.values, arrival_time: value });
              }}
              type="text"
              value={formState.values.arrival_time}
            />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Hora de Retirada:</label>
            <Text className="form-control" field="withdrawal_time" type="text" hidden />
            <TimePicker
              locale="es"
              className="form-control"
              field="withdrawal_time"
              onChange={(value) => {
                formApi.setValues({ ...formState.values, withdrawal_time: value });
              }}
              type="text"
              value={formState.values.withdrawal_time}
            />
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
            <label style={{ display: "inline" }}>Asistencia de Voluntarios</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              disabled={formState.values.volunteers?.length == volunteerOptions.length}
              onClick={(event) => {
                event.preventDefault();
                const newVolunteers = formState.values.volunteers || [];
                const selectedVolunteers = formState.values.volunteers.map((volunteer) => volunteer._id);
                const nonSelectedVolunteers = volunteerOptions.filter(
                  (volunteer) => !selectedVolunteers.includes(volunteer.id)
                );

                newVolunteers.push({ _id: nonSelectedVolunteers[0].id });
                formApi.setValues({ ...formState.values, volunteers: newVolunteers });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="volunteers" disabled={true} hidden /> {/*Need to be here to work*/}
      {(formState.values.volunteers || []).map((currentVolunteer, i) => {
        const selectedVolunteers = formState.values.volunteers.map((volunteer) => volunteer._id);
        const nonSelectedVolunteers = volunteerOptions.filter(
          (volunteer) => !selectedVolunteers.includes(volunteer.id) || volunteer.id == currentVolunteer._id
        );
        return (
          <React.Fragment key={`volunteers[${i}]._id`}>
            <Row>
              <Col md="2"></Col>
              <Col md="6">
                <Form.Group>
                  <InformedSelect
                    className="form-control"
                    field={`volunteers[${i}]._id`}
                    initialValue={isCreate ? nonSelectedVolunteers[0]?.id : undefined}
                  >
                    {nonSelectedVolunteers.map((volunteer) => (
                      <option value={volunteer.id} key={volunteer.id}>
                        {volunteer.name}
                      </option>
                    ))}
                  </InformedSelect>
                </Form.Group>
              </Col>
              <Col md="2">
                <Button
                  style={{ height: "40px" }}
                  className="btn-md"
                  variant="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    const newVolunteers = arrayRemove(formState.values.volunteers, i);
                    formApi.setValues({ ...formState.values, volunteers: newVolunteers });
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
export default DefaultServiceView;
