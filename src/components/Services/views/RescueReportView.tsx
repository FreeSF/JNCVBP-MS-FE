import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";
import { CODES } from "utils/constants";
import ResourcesField from "../fields/ResourcesField";

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
          <ResourcesField formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
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
              <option value="vivienda">En Vivienda</option>
              <option value="profundidad">Profundidad</option>
              <option value="altura">Altura</option>
              <option value="derrumbe">Derrumbe</option>
              <option value="raudal">Raudal-Naufragio</option>
              <option value="bomba">Amenaza de bomba</option>
              <option value="suicidio">Intento de suidicio</option>
            </InformedSelect>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};
export default RescueReportView;
