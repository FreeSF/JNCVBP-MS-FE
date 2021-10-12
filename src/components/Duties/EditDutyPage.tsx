import React, { createRef, useEffect, useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useLazyQuery, useMutation } from 'react-apollo';
import Spinner from "../spinner";
import {
  CreateDutyInput,
  EditDutyMutation,
  EditDutyMutationVariables,
  FindDutyQuery,
  FindDutyQueryVariables,
  Duty
} from "../../types";
import { CREATE_DUTY, EDIT_DUTY, FIND_DUTY, GET_DUTIES } from "../../queries/duties";
import { Checkbox, Text, Form as IForm, FormApi, TextArea } from 'informed'; //Form
import {
  Button, Card, Col, Form, Container, Row
} from "react-bootstrap";

interface theProps extends RouteComponentProps {
  id: String
}

// Can be moved up to make the constants
const CREATE = 'CREATE';
const EDIT = 'EDIT';

const EditDutyPage = (props: RouteComponentProps<{ id: string }>) => {

  const mode = props.match.params.id ? EDIT : CREATE;
  const [loadDuty, loadResult] = useLazyQuery<FindDutyQuery, FindDutyQueryVariables>(FIND_DUTY);
  const [editDuty, editedDuty] = useMutation<
    EditDutyMutation,
    EditDutyMutationVariables>(EDIT_DUTY, {
      refetchQueries: [{ query: GET_DUTIES }]
    });
  const [createDuty, createdDuty] = useMutation<{ createClient: Duty }, { input: CreateDutyInput }>(CREATE_DUTY);

  const [formRef, setFormRef] = useState<FormApi<Duty>>(null);

  useEffect(() => {
    if (mode === EDIT)
      loadDuty({ variables: { id: props.match.params.id } })
  }, []);

  if (loadResult.loading)
    return <Spinner />;

  const handleSubmit = () => {
    const values = formRef.getState().values;

    if (mode === EDIT) {
      editDuty({
        variables: {
          ...values,
          id: duty.id
        }
      }).then(() => {
        props.history.push('/duties');
      });
    }

    if (mode === CREATE) {
      createDuty({
        variables: {
          input: { ...values }
        }, refetchQueries: [{ query: GET_DUTIES }]
      }).then(value => {
        props.history.push('/duties');
      });
    }
  };

  const duty = loadResult?.data?.duty;

  return (
    <Container fluid>
      <IForm
        initialValues={duty}
        getApi={(formRef: FormApi<Duty>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Servicio</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Nombre</label>
                          <Text className="form-control" field="name" type="text" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <Form.Group>
                          <label>Descripción</label>
                          <TextArea className="form-control" field="name" type="text" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button className="btn-fill btn-pull-right" variant="info" type="submit"> Guardar Servicio</Button>
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </IForm>


    </Container>


  )

}

export default EditDutyPage
