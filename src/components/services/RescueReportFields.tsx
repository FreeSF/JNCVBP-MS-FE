import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";

type RescueReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
};

const RescueReportFields = ({ formApi, formState }: RescueReportFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Tipo de Rescate</h4>
          </Form.Group>
        </Col>
      </Row>
      <Text field="rescue_type" disabled={true} hidden />
      <div>
        <InformedSelect field="rescue_type">
          <option value="vivienda">En Vivienda</option>
          <option value="profundidad">Profundidad</option>
          <option value="altura">Altura</option>
          <option value="derrumbe">Derrumbe</option>
          <option value="raudal">Raudal-Naufragio</option>
          <option value="bomba">Amenaza de bomba</option>
          <option value="suicidio">Intento de suidicio</option>
          {/* create constants */}
        </InformedSelect>
      </div>
    </div>
  );
};
export default RescueReportFields;
