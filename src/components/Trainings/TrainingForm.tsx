import React from "react";
import { FormApi, Select, Text } from "informed"; //Form
import { useQuery } from "react-apollo";
import _ from "lodash";

import DatePicker from "react-datepicker";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { CreateTrainingInput, GetVolunteersQuery, UpdateTrainingInput } from "../../types";
import { GET_VOLUNTEERS } from "queries/volunteers";
import Spinner from "components/spinner";
import { ErrorText, notEmptyValidation } from "components/utils/Validations";

type TrainingFormProps = {
  formApi: any; // FormApi<CreateTrainingInput | UpdateTrainingInput>;
  formState: { values };
  volunteers: any;
  setVolunteers: any;
};

const TrainingForm = ({ formApi, formState, volunteers, setVolunteers }: TrainingFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  const volunteerList = getVolunteersQuery.data.volunteers;

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
                  <label>Descripción (*)</label>
                  <ErrorText
                    className="form-control"
                    field="description"
                    placeholder="Descripción"
                    type="text"
                    validateOnChange
                    validateOnBlur
                    validate={notEmptyValidation}
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label>Fecha</label>
                  <DatePicker
                    className="form-control"
                    locale="es"
                    showYearDropdown
                    maxDate={new Date()}
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
                    disabled={volunteers.length == volunteerList.length}
                    onClick={(event) => {
                      const selectedVolunteers = volunteers.map((volunteer) => volunteer._id);
                      const newVolunteer = volunteerList.find(
                        (volunteer) => !selectedVolunteers.includes(volunteer.id)
                      );

                      const newVolunteers = _.cloneDeep(volunteers);
                      newVolunteers.push({ _id: newVolunteer.id });
                      setVolunteers(newVolunteers);
                    }}
                  >
                    Agregar
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            {volunteers?.map((currentVolunteer, index) => {
              const selectedVolunteers = volunteers.map((volunteer) => volunteer._id);
              const nonSelectedVolunteers = volunteerList.filter(
                (volunteer) => !selectedVolunteers.includes(volunteer.id) || volunteer.id == currentVolunteer._id
              );

              return (
                <React.Fragment key={index}>
                  <Row>
                    <Col md="2"></Col>
                    <Col md="6">
                      <Form.Group>
                        <Select
                          className="form-control"
                          field={`volunteers[${index}]._id`}
                          initialValue={currentVolunteer._id}
                          onChange={(value) => {
                            const newVolunteers = _.cloneDeep(volunteers);
                            newVolunteers[index]._id = formState?.values?.volunteers[index]._id;
                            setVolunteers(newVolunteers);
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
                    <Col md="2">
                      <Button
                        style={{ height: "40px" }}
                        className="btn-md"
                        variant="danger"
                        onClick={(event) => {
                          const newVolunteers = _.cloneDeep(volunteers);
                          newVolunteers.splice(index, 1);
                          formApi.setValues({ ...formState.values, volunteers: newVolunteers || [] });
                          setVolunteers(newVolunteers);
                        }}
                      >
                        Eliminar
                      </Button>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}
            <Button disabled={volunteers.length === 0} className="btn-fill btn-pull-right" variant="info" type="submit">
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
