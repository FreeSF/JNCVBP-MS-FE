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
  details: any;
  setDetails: any;
};

const CourseForm = ({ formApi, formState, details, setDetails }: CourseFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  const volunteerList = getVolunteersQuery.data.volunteers;
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
                    disabled={details?.length == volunteerList.length}
                    onClick={(event) => {
                      const selectedVolunteers = details.map((details) => details.volunteer._id);
                      const newVolunteer = volunteerList.find(
                        (volunteer) => !selectedVolunteers.includes(volunteer.id)
                      );

                      const newDetail = { volunteer: { _id: newVolunteer.id }, score: "" };
                      const newDetails = _.cloneDeep(details);
                      newDetails.push(newDetail);
                      setDetails(newDetails);
                    }}
                  >
                    Agregar
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            {details?.map((currentDetail, index) => {
              const selectedVolunteers = details.map((detail) => detail.volunteer._id);
              const nonSelectedVolunteers = volunteerList.filter(
                (volunteer) => !selectedVolunteers.includes(volunteer.id) || volunteer.id == currentDetail.volunteer._id
              );

              return (
                <React.Fragment key={index}>
                  <Row>
                    <Col md="1"></Col>
                    <Col md="4">
                      <Form.Group>
                        <Select
                          className="form-control"
                          field={`details[${index}].volunteer._id`}
                          initialValue={currentDetail.volunteer._id}
                          onChange={(value) => {
                            const newDetails = _.cloneDeep(details);
                            newDetails[index].volunteer._id = formState?.values?.details[index].volunteer._id;
                            setDetails(newDetails);
                          }}
                        >
                          {nonSelectedVolunteers.map((volunteer) => (
                            <option value={volunteer.id} key={volunteer.id}>
                              {volunteer.name}
                            </option>
                          ))}
                        </Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <Text
                          className="form-control"
                          field={`details[${index}].score`}
                          initialValue={currentDetail.score}
                          placeholder="Calificación"
                          required
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col md="3">
                      <Button
                        style={{ height: "40px" }}
                        className="btn-md"
                        variant="danger"
                        onClick={(event) => {
                          let newDetails = _.cloneDeep(formState.values.details);
                          newDetails.splice(index, 1);
                          newDetails = newDetails.filter((x) => x);
                          formApi.setValues({ details: newDetails });
                          setDetails(newDetails);
                        }}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}

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
