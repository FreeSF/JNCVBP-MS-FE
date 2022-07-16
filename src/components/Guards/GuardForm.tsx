import React from "react";
import { FormApi, FormState, Select, Text } from "informed"; //Form
import _ from "lodash";

import DateTimePicker from "react-datetime-picker";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import { CreateGuardInput, GetVolunteersQuery, UpdateGuardInput } from "types";

import Spinner from "components/spinner";
import { GET_VOLUNTEERS } from "queries/volunteers";
import { useQuery } from "react-apollo";
import { addDays } from "date-fns";

type GuardFormProps = {
  formApi: FormApi<CreateGuardInput | UpdateGuardInput>;
  formState: FormState<CreateGuardInput | UpdateGuardInput>;
  volunteers: any;
  setVolunteers: any;
  initialVolunteersQuantity?: number; // Todo improve with initial quantity
};

const GuardForm = ({ formApi, formState, volunteers, setVolunteers }: GuardFormProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  if (getVolunteersQuery.loading) return <Spinner />;

  const volunteerList = getVolunteersQuery.data.volunteers;
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
                    //maxDate={new Date()}
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
                    //maxDate={addDays(new Date(), 1)}
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
                  <h4 style={{ display: "inline" }}>Asistencia de Voluntarios (*)</h4>
                  <Button
                    className="pull-right ml-2"
                    variant="success"
                    disabled={volunteers.length === volunteerList.length}
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
                          onChange={(_value) => {
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
                        onClick={(_event) => {
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
              Guardar
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default GuardForm;
