import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";

type FireReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  isCreate: boolean;
};

const Quantities1040Field = ({ formApi, formState, arrayRemove, isCreate }: FireReportFieldsProps) => {
  return (
    <div>
      <Form.Group>
        <label style={{ display: "inline" }}>Cantidad 10.44</label>
        <Button
          className="pull-right ml-2"
          variant="success"
          // disabled={volunteers.length == volunteerList.length}
          onClick={(event) => {
            event.preventDefault();
            const newQuantities = formState.values.quantities1044 || [];
            newQuantities.push({ name: "ilesos", quantity: 1 });
            formApi.setValues({ ...formState.values, quantities1044: newQuantities });
          }}
        >
          Agregar
        </Button>
      </Form.Group>
      <Text field="quantities1044" disabled={true} hidden />
      {(formState.values.quantities1044 || []).map((value, index) => {
        return (
          <React.Fragment key={index}>
            <Row>
              <Col md="1"></Col>
              <Col md="5">
                <Form.Group>
                  <InformedSelect
                    className="form-control"
                    field={`quantities1044[${index}].name`}
                    initialValue={isCreate ? "ilesos" : undefined}
                  >
                    <option value="ilesos">Ileso/s</option>
                    <option value="heridos">Herido/s</option>
                    <option value="fallecidos">Fallecido/s</option>
                    <option value="rescates">Rescate/s</option>
                    <option value="enfermos">Enfermo/s</option>
                    {/* create constants */}
                  </InformedSelect>
                </Form.Group>
              </Col>
              <Col md="2">
                <Form.Group>
                  <Text
                    className="form-control"
                    field={`quantities1044[${index}].quantity`}
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
                    const quantities1044 = arrayRemove(formState.values.quantities1044, index);
                    formApi.setValues({ ...formState.values, quantities1044 });
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
export default Quantities1040Field;
