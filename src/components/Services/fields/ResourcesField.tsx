import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";
import { RESOURCES_OPTIONS } from "../../../utils/constants";

type FireReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  isCreate: boolean;
};

const ResourcesField = ({ formApi, formState, arrayRemove, isCreate }: FireReportFieldsProps) => {
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
              <Col md="2"></Col>
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
                      </option>
                    ))}
                  </InformedSelect>
                </Form.Group>
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
