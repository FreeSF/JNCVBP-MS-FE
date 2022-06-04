import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";
import { CODES, RESCUE_TYPE_OPTIONS } from "utils/constants";
import ResourcesField from "../fields/ResourcesField";
import Quantities1040Field from "../fields/Quantities1040Field";

type RescueReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  isCreate: boolean;
};

const RescueReportView = ({ formApi, formState, arrayRemove, isCreate }: RescueReportFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="12">
          <h4>Servicio {CODES.RESCUE}</h4>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Quantities1040Field formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
          {/*<ResourcesField formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate}/>*/}
        </Col>
        <Col md="4">
          <Form.Group>
            <label>Tipo de Rescate: </label>
            <Text field="rescue_type" disabled={true} hidden />
            <InformedSelect
              className="form-control"
              field="rescue_type"
              initialValue={isCreate ? "vivienda" : undefined}
            >
              {RESCUE_TYPE_OPTIONS.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
            </InformedSelect>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
export default RescueReportView;
