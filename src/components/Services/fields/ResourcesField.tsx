import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, GetSubTypesQuery, UpdateServiceInput } from "types";
import { CODES, OTHER_ID, OTHER_NAME, RESOURCES_OPTIONS_1040, RESOURCES_OPTIONS_1041 } from "../../../utils/constants";
import { useQuery } from "@apollo/client";
import { GET_SUB_TYPES } from "../../../queries/subType";
import Spinner from "../../spinner";

type FireReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  isCreate: boolean;
};

const ResourcesField = ({ formApi, formState, arrayRemove, isCreate }: FireReportFieldsProps) => {
  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);

  if (getSubTypesQuery.loading) return <Spinner />;

  const subtypeCode = getSubTypesQuery.data.subTypes.find(
    (subType) => subType.id === formState.values.sub_type?._id
  )?.code;

  const RESOURCES_OPTIONS =
    subtypeCode === CODES.FIRE ? RESOURCES_OPTIONS_1040 : subtypeCode === CODES.ACCIDENT ? RESOURCES_OPTIONS_1041 : [];
  return (
    <div>
      <Row>
        <Col md="12">
          <Form.Group>
            <label style={{ display: "inline" }}>Recursos Utilizados:</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newResources = formState.values.resources_used || [];
                newResources.push({ resource: "combustible", quantity: 1 });
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
          <React.Fragment key={index}>
            <Row>
              <Col md="4">
                <Form.Group>
                  <InformedSelect
                    className="form-control"
                    field={`resources_used[${index}].resource`}
                    initialValue={isCreate ? RESOURCES_OPTIONS[0].id : undefined}
                  >
                    {RESOURCES_OPTIONS.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.name}
                        {option.id === OTHER_ID && " (Especificar):"}
                      </option>
                    ))}
                  </InformedSelect>
                </Form.Group>
              </Col>
              <Col md="2" hidden={value.resource !== OTHER_ID}>
                <Text className="form-control" field={`resources_used[${index}].resource_other`} />
              </Col>
              <Col md="2">
                <Form.Group>
                  <Text
                    className="form-control"
                    field={`resources_used[${index}].quantity`}
                    initialValue={isCreate ? 1 : undefined}
                    required
                    type="number"
                  />
                </Form.Group>
              </Col>
              <Col md="4">
                <Button
                  style={{ height: "40px" }}
                  className="btn-md"
                  variant="danger"
                  onClick={(event) => {
                    event.preventDefault();
                    const resources_used = arrayRemove(formState.values.resources_used, index);
                    formApi.setValues({ ...formState.values, resources_used });
                  }}
                >
                  Eliminar
                </Button>
              </Col>
            </Row>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default ResourcesField;
