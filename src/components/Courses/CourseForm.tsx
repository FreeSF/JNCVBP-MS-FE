import React from "react";
import { Text, Select } from "informed"; //Form
import { useQuery } from "react-apollo";
import _ from "lodash";

import DatePicker from "react-datepicker";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { GetVolunteersQuery } from "types";
import { GET_VOLUNTEERS } from "queries/volunteers";
import Spinner from "components/spinner";

type CourseFormProps = {
  formApi: any; //FormApi<CreateCourseInput | UpdateCourseInput>;
  formState: { values };
  setVolunteersQuantity: any;
  volunteersQuantity: number;
};

const CourseForm = ({ formApi, formState, volunteersQuantity, setVolunteersQuantity }: CourseFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Agregar Curso</Card.Title>
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
                  <Col md="4">
                    <label>Nota: </label>
                    <Text field={`details[${i}].score`} />
                  </Col>
                  <Col md="8">
                    <Form.Group>
                      <Select
                        className="form-control"
                        field={`details[${i}].volunteer._id`}
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
                </Row>
              </React.Fragment>
            ))}

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              Guardar Curso
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default CourseForm;
