import React, { createRef, useEffect, useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import Spinner from "../spinner";
import {
  CreateRankInput,
  EditRankMutation,
  EditRankMutationVariables,
  FindRankQuery,
  FindRankQueryVariables,
  Rank
} from "../../types";
import { CREATE_RANK, EDIT_RANK, FIND_RANK, GET_RANKS } from "../../queries/ranks";
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

const EditRankPage = (props: RouteComponentProps<{ id: string }>) => {

  const mode = props.match.params.id ? EDIT : CREATE;
  const [loadRank, loadResult] = useLazyQuery<FindRankQuery, FindRankQueryVariables>(FIND_RANK);
  const [editRank, editedRank] = useMutation<
    EditRankMutation,
    EditRankMutationVariables>(EDIT_RANK, {
      refetchQueries: [{ query: GET_RANKS }]
    });
  const [createRank, createdRank] = useMutation<{ createClient: Rank }, { input: CreateRankInput }>(CREATE_RANK);

  const [formRef, setFormRef] = useState<FormApi<Rank>>(null);

  useEffect(() => {
    if (mode === EDIT)
      loadRank({ variables: { _id: props.match.params.id } })
  }, []);

  if (loadResult.loading)
    return <Spinner />;

  const handleSubmit = () => {
    let values = formRef.getState().values;

    if (mode === EDIT) {
      editRank({
        variables: {
          ...values,
          _id: rank._id
        }
      }).then(() => {
        props.history.push('/ranks');
      });
    }

    if (mode === CREATE) {
      createRank({
        variables: {
          input: { ...values }
        }, refetchQueries: [{ query: GET_RANKS }]
      }).then(value => {
        props.history.push('/ranks');
      });
    }
  };

  const rank = loadResult?.data?.rank;

  return (
    <Container fluid>
      <IForm
        initialValues={rank}
        getApi={(formRef: FormApi<Rank>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <Row>
            <Col md="2"></Col>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Rango</Card.Title>
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

                    <Button className="btn-fill btn-pull-right" variant="info" type="submit"> Guardar Rango</Button>
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

export default EditRankPage
