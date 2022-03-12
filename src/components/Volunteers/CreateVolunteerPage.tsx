import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useLazyQuery, useMutation } from "react-apollo";
import Spinner from "../spinner";
import {
  CreateVolunteerInput,
  EditVolunteerMutation,
  CreateVolunteerMutation,
  CreateVolunteerMutationVariables,
  EditVolunteerMutationVariables,
  FindVolunteerQuery,
  FindVolunteerQueryVariables,
  Volunteer,
} from "../../types";
import { CREATE_VOLUNTEER, EDIT_VOLUNTEER, FIND_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import { Form as IForm, FormApi, Select, Text } from "informed"; //Form
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  BLOOD_TYPES,
  get_blood_type,
  get_volunteer_status,
  MODE_CREATE,
  MODE_EDIT,
  VOLUNTEER_STATUS,
} from "../../utils/constants";

interface theProps extends RouteComponentProps {
  id: string;
}

const CreateVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {
  const mode = props.match.params.id ? MODE_EDIT : MODE_CREATE;

  const [loadVolunteer, loadResult] = useLazyQuery<FindVolunteerQuery, FindVolunteerQueryVariables>(FIND_VOLUNTEER);
  // const [editVolunteer, editedVolunteer] = useMutation<
  //   EditVolunteerMutation,
  //   EditVolunteerMutationVariables>(EDIT_VOLUNTEER, {
  //     refetchQueries: [{ query: GET_VOLUNTEERS }]
  //   });
  const [createVolunteer, createdVolunteer] = useMutation<CreateVolunteerMutation, CreateVolunteerMutationVariables>(
    CREATE_VOLUNTEER
  );

  const [formRef, setFormRef] = useState<FormApi<CreateVolunteerInput>>(null);

  useEffect(() => {
    if (mode === MODE_EDIT) loadVolunteer({ variables: { id: props.match.params.id } });
  }, []);

  if (loadResult.loading) return <Spinner />;

  const handleSubmit = () => {
    console.log("asdasdasdsa");
    const values = formRef.getState().values;

    if (mode == MODE_EDIT) {
      // console.log('create')
      // console.log(values)
      // console.log(volunteer.id)
      // editVolunteer({
      //   variables: {
      //     ...values,
      //     id: volunteer.id
      //   }
      // }).then(() => {
      //   props.history.push('/volunteers');
      // });
    }

    if (mode == MODE_CREATE) {
      console.log("create");
      console.log(values);
      createVolunteer({
        variables: {
          input: { ...values },
        },
        refetchQueries: [{ query: GET_VOLUNTEERS }],
      }).then((value) => {
        props.history.push("/volunteers");
      });
    }
  };

  const defaultValue: CreateVolunteerInput = {
    name: undefined,
    code: undefined,
    status: "Active",
    blood_type: "Not Set",
  };
  const volunteer = loadResult?.data?.volunteer || defaultValue;

  return (
    <Container fluid>
      <IForm
        initialValues={volunteer}
        getApi={(formRef: FormApi<Volunteer>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Voluntario</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Nombre</label>
                        <Text className="form-control" field="name" placeholder="Nombre y Apellido" type="text" />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label> Código </label>
                        <Text className="form-control" field="code" placeholder="Código" type="text" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label> Estado </label>
                        <Select
                          className="form-control"
                          field="status"
                          initialValue={volunteer?.status || VOLUNTEER_STATUS[0].id}
                        >
                          {VOLUNTEER_STATUS.map((status) => (
                            <option value={status.id} key={status.id}>
                              {status.description}
                            </option>
                          ))}
                        </Select>
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group>
                        <label>Grupo Sanguíneo </label>
                        <Select
                          className="form-control"
                          field="blood_type"
                          initialValue={volunteer?.blood_type || BLOOD_TYPES[0].id}
                        >
                          {BLOOD_TYPES.map((status) => (
                            <option value={status.id} key={status.id}>
                              {status.description}
                            </option>
                          ))}
                        </Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Fecha de Incorporación</label>
                        <DatePicker
                          className="form-control"
                          locale="es"
                          onChange={(value) => {
                            formApi.setValues({ ...formState.values, incorporation_date: value });
                          }}
                          selected={formState?.values?.incorporation_date}
                        />

                        <Text className="form-control" field="incorporation_date" placeholder="" type="hidden" />
                      </Form.Group>
                    </Col>

                    <Col md="6">
                      <Form.Group>
                        <label>Fecha de Nacimiento</label>
                        <Text className="form-control" field="birth_date" placeholder="" type="text" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label> Dirección </label>
                        <Text className="form-control" field="address" placeholder="Calle 1 - Calle 2" type="text" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn-fill btn-pull-right" variant="info" type="submit">
                    {" "}
                    Guardar Voluntario
                  </Button>
                  <div className="clearfix"></div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right card section  */}
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img alt="..." src={require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")}></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../../assets/img/faces/face-3.jpg")}
                      ></img>
                      {/* <h5 className="title">{`${formState.values?.name || ''} (${get_volunteer_status(formState.values?.status)})`}</h5> */}
                      <h5 className="title">{`${formState.values?.name || "Nombre"} (${
                        formState.values?.code || "Código"
                      })`}</h5>
                    </a>
                    {/* <p className="description">{formState.values?.code || 'Código'}</p> */}
                  </div>
                  <p className="description text-center">
                    {/* Tipo de Sangre: {get_blood_type(formState.values.blood_type)} <br></br> */}
                    Your chick she so thirsty <br></br>
                    I'm in that two seat Lambo"
                  </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                  <Button className="btn-simple btn-icon" href="#" onClick={(e) => e.preventDefault()} variant="link">
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button className="btn-simple btn-icon" href="#" onClick={(e) => e.preventDefault()} variant="link">
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button className="btn-simple btn-icon" href="#" onClick={(e) => e.preventDefault()} variant="link">
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </IForm>
    </Container>
  );
};

export default CreateVolunteerPage;
