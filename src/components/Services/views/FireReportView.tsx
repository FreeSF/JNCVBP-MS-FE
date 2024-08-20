import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  CreateServiceInput,
  FireCause,
  FireCauseAllFieldsFragment,
  FireClassAllFieldsFragment,
  GetSubTypesQuery,
  UpdateServiceInput,
} from "types";
import ResourcesField from "../fields/ResourcesField";
import { AFFECTED_OWNER_OPTIONS, CODES, DAMAGE_OPTIONS, OTHER_NAME, PROPORTION_OPTIONS } from "utils/constants";
import { useQuery } from "@apollo/client";
import { GET_SUB_TYPES } from "../../../queries/subType";
import Spinner from "../../spinner";

type FireReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  fireCausesOptions: Array<FireCauseAllFieldsFragment>;
  fireClassesOptions: Array<FireClassAllFieldsFragment>;
  isCreate: boolean;
};

const FireReportView = ({
  formApi,
  formState,
  arrayRemove,
  fireCausesOptions,
  fireClassesOptions,
  isCreate,
}: FireReportFieldsProps) => {
  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);

  if (getSubTypesQuery.loading) return <Spinner />;

  const otherSubType = getSubTypesQuery.data.subTypes.find(
    (subType) => subType.name === OTHER_NAME && subType.code === CODES.FIRE
  );

  return (
    <div>
      <Row>
        <Col md="12">
          <h4>Servicio {CODES.FIRE}</h4>
        </Col>
      </Row>

      <Row>
        <Col
          md="2"
          hidden={formState.values.sub_type && otherSubType ? formState.values.sub_type._id !== otherSubType.id : false}
        >
          <Form.Group>
            <label>Tipo de fuego (otro):</label>
            <Text className="form-control" field="fire_type_description" type="text" />
          </Form.Group>
        </Col>
        <Col md="2">
          <Form.Group>
            <label>Superficie Total:</label>
            <Text className="form-control" field="fire_type_total_surface" type="text" allowEmptyString={true} />
          </Form.Group>
        </Col>
        <Col md="2">
          <Form.Group>
            <label>Superficie Quemada:</label>
            <Text className="form-control" field="fire_type_burned_surface" type="text" allowEmptyString={true} />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Causa Posible: </label>
            <InformedSelect
              className="form-control"
              field={`possible_cause._id`}
              initialValue={isCreate ? fireCausesOptions[0]?.id : undefined}
            >
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
      </Row>

      {/* TODO: Add to Services Entity and styles*/}
      {/* <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Propietarios Afectados</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
        <Col md="12">
          <Form.Group>
            <label>Afectado:</label>
            <Text className="form-control" field="affected_owner" type="text" />
          </Form.Group>
        </Col>
      </Row>

     */}

      <Row>
        <Col md="3">
          <Form.Group>
            <label>Proporción:</label>
            <InformedSelect
              className="form-control"
              field="magnitude"
              initialValue={isCreate ? PROPORTION_OPTIONS[0].id : undefined}
            >
              {PROPORTION_OPTIONS.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </InformedSelect>
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Destrucción</label>
            <InformedSelect
              className="form-control"
              field="damage"
              initialValue={isCreate ? DAMAGE_OPTIONS[0].id : undefined}
            >
              {DAMAGE_OPTIONS.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </InformedSelect>
            {/*<Text className="form-control" field="damage" type="text"/>*/}
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Vehículos Utilizados:</label>
            <Text className="form-control" field="vehicles_used" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Otras unidades de Apoyo:</label>
            <Text className="form-control" field="other_units" type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <Form.Group>
            <label>Otras Ocurrencias:</label>
            <Text className="form-control" field="other_occurrences" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Fuerzas Policiales a cargo:</label>
            <Text className="form-control" field="police_force_in_charge" type="text" />
          </Form.Group>
        </Col>
        <Col md="3">
          <Form.Group>
            <label>Juzgado de Crimen oficiado por:</label>
            <Text className="form-control" field="judge_in_charge" type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="4">
          <Form.Group>
            <label>Propietarios Afectados</label>
            <Text field="affected_owner" disabled={true} hidden />
            <InformedSelect
              className="form-control"
              field="affected_owner"
              initialValue={isCreate ? AFFECTED_OWNER_OPTIONS[0].id : undefined}
            >
              {AFFECTED_OWNER_OPTIONS.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </InformedSelect>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group>
            <label>Propietarios Afectados (descripción):</label>
            <Text className="form-control" field="affected_owner_description" type="text" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md="6">
          <ResourcesField formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
        </Col>
        <Col md="6">
          <Form.Group>
            <label style={{ display: "inline" }}>Fuego Clase:</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newFireClasses = formState.values.fire_class || [];
                newFireClasses.push({ _id: fireClassesOptions[0]?.id });
                formApi.setValues({ ...formState.values, fire_class: newFireClasses });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
          <Text field="fire_class" disabled={true} hidden />
          {(formState.values.fire_class || []).map((fireClass, i) => (
            <React.Fragment key={i}>
              <Row>
                <Col md="2"></Col>
                <Col md="6">
                  <Form.Group>
                    <InformedSelect
                      className="form-control"
                      field={`fire_class[${i}]._id`}
                      initialValue={isCreate ? fireClassesOptions[0]?.id : undefined}
                    >
                      {fireClassesOptions.map((fireClass) => (
                        <option value={fireClass.id} key={fireClass.id}>
                          {fireClass.name}
                        </option>
                      ))}
                    </InformedSelect>
                  </Form.Group>
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
        </Col>
      </Row>
    </div>
  );
};
export default FireReportView;
