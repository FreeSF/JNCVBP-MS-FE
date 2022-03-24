import React from "react";
import { FormApi, Select, Text } from "informed"; //Form
import { useQuery } from "react-apollo";
import _ from "lodash";

import DatePicker from "react-datepicker";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { CreateTrainingInput, GetVolunteersQuery, UpdateTrainingInput } from "../../types";
import { GET_VOLUNTEERS } from "queries/volunteers";
import Spinner from "components/spinner";

type TrainingFormProps = {
  formApi: any; //FormApi<CreateTrainingInput | UpdateTrainingInput>;
  formState: { values };
  setVolunteersQuantity: any;
  volunteersQuantity: number;
};

const TrainingForm = ({ formApi, formState, volunteersQuantity, setVolunteersQuantity }: TrainingFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Agregar Práctica</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Descripción</label>
                  <Text
                    className="form-control"
                    field="description"
                    minLength={3}
                    placeholder="Descripción"
                    required
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label>Fecha</label>
                  <DatePicker
                    className="form-control"
                    locale="es"
                    onChange={(value) => {
                      formApi.setValues({ ...formState.values, date: value });
                    }}
                    selected={formState?.values?.date && new Date(formState.values.date)}
                  />
                  <Text className="form-control" field="date" placeholder="" type="hidden" />
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
              Guardar Práctica
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default TrainingForm;
