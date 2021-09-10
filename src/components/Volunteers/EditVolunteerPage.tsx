import React, { createRef, useEffect, useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import Spinner from "../spinner";
import {
  CreateVolunteerInput,
  EditVolunteerMutation,
  EditVolunteerMutationVariables,
  FindVolunteerQuery,
  FindVolunteerQueryVariables,
  Volunteer
} from "../../types";
import { CREATE_VOLUNTEER, EDIT_VOLUNTEER, FIND_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import { Text, Form as IForm, FormApi } from 'informed'; //Form
import {
  Button, Card, Col, Form, Container, Row
} from "react-bootstrap";

interface theProps extends RouteComponentProps {
  id: String
}

// Can be moved up to make the constants
const CREATE = 'CREATE';
const EDIT = 'EDIT';

const EditVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {

  const mode = props.match.params.id ? EDIT : CREATE;
  const [loadVolunteer, loadResult] = useLazyQuery<FindVolunteerQuery, FindVolunteerQueryVariables>(FIND_VOLUNTEER);
  const [editVolunteer, editedVolunteer] = useMutation<
    EditVolunteerMutation,
    EditVolunteerMutationVariables>(EDIT_VOLUNTEER, {
      refetchQueries: [{ query: GET_VOLUNTEERS }]
    });
  const [createVolunteer, createdVolunteer] = useMutation<{ createClient: Volunteer }, { input: CreateVolunteerInput }>(CREATE_VOLUNTEER);

  const [formRef, setFormRef] = useState<FormApi<Volunteer>>(null);

  useEffect(() => {
    if (mode === EDIT)
      loadVolunteer({ variables: { id: props.match.params.id } })
  }, []);

  if (loadResult.loading)
    return <Spinner />;

  const handleSubmit = () => {
    const values = formRef.getState().values;

    if (mode === EDIT) {
      editVolunteer({
        variables: {
          ...values,
          id: volunteer.id
        }
      }).then(() => {
        props.history.push('/volunteers');
      });
    }

    if (mode === CREATE) {
      createVolunteer({
        variables: {
          input: { ...values }
        }, refetchQueries: [{ query: GET_VOLUNTEERS }]
      }).then(value => {
        props.history.push('/volunteers');
      });
    }
  };

  const volunteer = loadResult?.data?.volunteer;

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
                  <Form>
                    <Row>

                      <Col className="pr-1" md="5">
                        <Form.Group>
                          <label>ID (disabled)</label>
                          <Form.Control defaultValue="Identificador" value={volunteer?.id} disabled type="text" ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col className="px-1" md="3">
                        <Form.Group>
                          <label>Nombre</label>
                          <Text className="form-control" field="name" type="text" />
                        </Form.Group>
                      </Col>

                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label htmlFor="exampleInputEmail1"> Correo </label>
                          <Form.Control placeholder="Email" disabled type="email" ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Dirección</label>
                          <Form.Control
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address" disabled
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>City</label>
                          <Form.Control
                            defaultValue="Mike"
                            placeholder="City"
                            type="text" disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="4">
                        <Form.Group>
                          <label>Country</label>
                          <Form.Control
                            defaultValue="Andrew" disabled
                            placeholder="Country"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>Postal Code</label>
                          <Form.Control
                            placeholder="ZIP Code" disabled
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Observaciones</label>
                          <Form.Control cols={80}
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows={4}
                            as="textarea" disabled
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button className="btn-fill btn-pull-right" variant="info" type="submit"> Guardar Voluntario</Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Right card section */}
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img
                    alt="..."
                    src={require("../../assets/img/photo-1431578500526-4d9613015464.jpeg")}
                  ></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../../assets/img/faces/face-3.jpg")}
                      ></img>
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">michael24</p>
                  </div>
                  <p className="description text-center">
                    "Lamborghini Mercy <br></br>
                    Your chick she so thirsty <br></br>
                    I'm in that two seat Lambo"
                  </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                  <Button
                    className="btn-simple btn-icon"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                    className="btn-simple btn-icon"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    variant="link"
                  >
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </IForm>


    </Container>


  )

}

export default EditVolunteerPage
