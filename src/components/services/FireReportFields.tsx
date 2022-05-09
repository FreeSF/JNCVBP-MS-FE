import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";

type FireReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  fireCausesOptions: any;
  fireClassesOptions: any;
};

const FireReportFields = ({
  formApi,
  formState,
  arrayRemove,
  fireCausesOptions,
  fireClassesOptions,
}: FireReportFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Fuego Clase</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newFireClasses = formState.values.fire_class || [];
                newFireClasses.push({ _id: undefined });
                formApi.setValues({ ...formState.values, fire_class: newFireClasses });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="fire_class" disabled={true} hidden />

      {(formState.values.fire_class || []).map((fireClass, i) => (
        <React.Fragment>
          <Row>
            <Col md="2"></Col>
            <Col md="6">
              <InformedSelect
                className="form-control"
                field={`fire_class[${i}]._id`}
                initialValue={fireClassesOptions[0]?.id}
              >
                {fireClassesOptions.map((fireClass) => (
                  <option value={fireClass.id} key={fireClass.id}>
                    {fireClass.name}
                  </option>
                ))}
              </InformedSelect>
            </Col>
            <Col md="2">
              <Button
                style={{ height: "40px" }}
                className="btn-md"
                variant="danger"
                onClick={(event) => {
                  event.preventDefault();
                  const newFireClasses = arrayRemove(formState.values.fire_class, i);
                  formApi.setValues({ ...formState.values, fire_class: newFireClasses });
                }}
              >
                Eliminar
              </Button>
            </Col>
          </Row>
        </React.Fragment>
      ))}

      <Row>
        <Col md="3">
          <Form.Group>
            <label>Superficie Total:</label>
            <Text className="form-control" field="fire_type_total_surface" type="number" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Superficie Quemada:</label>
            <Text className="form-control" field="fire_type_burned_surface" type="number" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Tipo de fuego (otro):</label>
            <Text className="form-control" field="fire_type_description" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Afectado:</label>
            <Text className="form-control" field="affected_owner" type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="3">
          <Form.Group>
            <label>Causa Posible: </label>
            <InformedSelect field={`possible_cause._id`} initialValue={fireCausesOptions[0]?.id}>
              {fireCausesOptions.map((fireCause) => (
                <option value={fireCause.id} key={fireCause.id}>
                  {fireCause.name}
                </option>
              ))}
            </InformedSelect>
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Causa Posible (otro):</label>
            <Text className="form-control" field="possible_cause_other_description" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Proporción:</label>
            <Text className="form-control" field="magnitude" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <Form.Group>
            <label>Destrucción</label>
            <Text className="form-control" field="damage" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>vehicles_used</label>
            <Text className="form-control" field="vehicles_used" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>other_units:</label>
            <Text className="form-control" field="other_units" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>other_occurrences</label>
            <Text className="form-control" field="other_occurrences" type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="3">
          <Form.Group>
            <label>police_force_in_charge</label>
            <Text className="form-control" field="police_force_in_charge" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>judge_in_charge</label>
            <Text className="form-control" field="judge_in_charge" type="text" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Recursos Utilizados</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newResources = formState.values.resources_used || [];
                newResources.push(undefined);
                formApi.setValues({ ...formState.values, resources_used: newResources });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="resources_used" disabled={true} hidden />

      {(formState.values.resources_used || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`resources_used[${index}].resource`} initialValue="combustible">
              <option value="combustible">Combustible</option>
              <option value="bomberos">Bomberos</option>
              <option value="kilometros">Km. recorridos</option>
              <option value="tiempo">Tiempo total</option>
              <option value="agua">Agua</option>
              <option value="polvo">Polvo químico</option>
              <option value="gas">Gas carbónico</option>
              <option value="espuma">Espuma</option>
              <option value="otro">Otro</option>
              {/* create constants */}
              {/* Does it need a db entry? */}
            </InformedSelect>
            <Text field={`resources_used[${index}].quantity`} initialValue={1} type="number" />
            <button
              onClick={(event) => {
                event.preventDefault();
                const resources_used = arrayRemove(formState.values.resources_used, index);
                formApi.setValues({ ...formState.values, resources_used });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default FireReportFields;
