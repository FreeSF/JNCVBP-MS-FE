import React from "react";
import { Select, Text } from "informed"; //Form
import _ from "lodash";

import DateTimePicker from "react-datetime-picker";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { CreateGuardInput, GetVolunteersQuery, UpdateGuardInput } from "types";

import Spinner from "components/spinner";
import { GET_VOLUNTEERS } from "queries/volunteers";
import { useQuery } from "react-apollo";

type GuardFormProps = {
  formApi: any; //FormApi<CreateGuardInput | UpdateGuardInput>;
  formState: { values };
  setVolunteersQuantity: any;
  volunteersQuantity: number;
};

const GuardForm = ({ formApi, formState, volunteersQuantity, setVolunteersQuantity }: GuardFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Agregar Guardia</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Inicio</label>
                  <DateTimePicker
                    locale="es"
                    className="form-control"
                    onChange={(value: Date) => {
                      formApi.setValues({ ...formState.values, start_time: value.getTime() });
                    }}
                    value={formState.values.start_time && new Date(formState.values.start_time)}
                    clearIcon={null}
                    maxDetail="minute"
                    minDetail="month"
                  />
                  <Text hidden field="start_time" />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label>Fin</label>
                  <DateTimePicker
                    locale="es"
                    className="form-control"
                    onChange={(value: Date) => {
                      formApi.setValues({ ...formState.values, end_time: value.getTime() });
                    }}
                    value={formState.values.end_time && new Date(formState.values.end_time)}
                    clearIcon={null}
                    maxDetail="minute"
                    minDetail="month"
                  />
                  <Text hidden field="end_time" />
                </Form.Group>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md="12">
                <Form.Group>
                  <h4 style={{ display: "inline" }}>Asistencia de Voluntarios</h4>
                  <Button
                    className="pull-right ml-2"
                    variant="success"
                    onClick={(event) => {
                      event.preventDefault();
                      setVolunteersQuantity(volunteersQuantity + 1);
                    }}
                  >
                    {" "}
                    Agregar
                  </Button>
                  <Button
                    className="pull-right ml-2"
                    variant="danger"
                    onClick={(event) => {
                      event.preventDefault();
                      setVolunteersQuantity(volunteersQuantity > 0 ? volunteersQuantity - 1 : 0);
                    }}
                  >
                    Quitar
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            {_.times(volunteersQuantity, (i) => (
              <React.Fragment>
                <Row>
                  <Col md="2"></Col>
                  <Col md="8">
                    <Form.Group>
                      <Select
                        className="form-control"
                        field={`volunteers[${i}]._id`}
                        initialValue={_.get(getVolunteersQuery, "data.volunteers[0].id", undefined)}
                      >
                        {getVolunteersQuery.data.volunteers.map((volunteer) => (
                          <option value={volunteer.id} key={volunteer.id}>
                            {volunteer.name}
                          </option>
                        ))}
                      </Select>
                    </Form.Group>
                  </Col>
                  <Col md="2"></Col>
                </Row>
              </React.Fragment>
            ))}

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              Crear Guardia
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default GuardForm;
