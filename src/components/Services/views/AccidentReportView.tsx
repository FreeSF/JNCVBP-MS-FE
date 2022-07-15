import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";
import ResourcesField from "../fields/ResourcesField";
import Quantities1040Field from "../fields/Quantities1040Field";
import { CODES, DAMAGE_1041_OPTIONS, INVOLVED_ELEMENTS_OPTIONS, MAGNITUDE_1041_OPTIONS } from "utils/constants";

type AccidentReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  arrayRemove: any;
  isCreate: boolean;
};

const AccidentReportView = ({ formApi, formState, arrayRemove, isCreate }: AccidentReportFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="12">
          <h4>Servicio {CODES.ACCIDENT}</h4>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Form.Group>
            <label style={{ display: "inline" }}>Daños</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newDamages = formState.values.damage1041 || [];
                newDamages.push("materiales");
                formApi.setValues({ ...formState.values, damage1041: newDamages });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
          <Text field="damage1041" disabled={true} hidden />
          {(formState.values.damage1041 || []).map((value, index) => {
            return (
              <React.Fragment key={index}>
                <Row>
                  <Col md="1"></Col>
                  <Col md="7">
                    <Form.Group>
                      <InformedSelect
                        className="form-control"
                        field={`damage1041[${index}]`}
                        initialValue={isCreate ? "materiales" : undefined}
                      >
                        {DAMAGE_1041_OPTIONS.map((option) => (
                          <option value={option.id} key={option.id}>
                            {option.name}
                          </option>
                        ))}
                        {/* create constants */}
                      </InformedSelect>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Button
                      style={{ height: "40px" }}
                      className="btn-md"
                      variant="danger"
                      onClick={(event) => {
                        event.preventDefault();
                        const damage1041 = arrayRemove(formState.values.damage1041, index);
                        formApi.setValues({ ...formState.values, damage1041 });
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Col>
        <Col md="6">
          <Quantities1040Field formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
        </Col>
      </Row>

      <Row style={{ marginTop: "15px" }}>
        <Col md="6">
          <Form.Group>
            <label style={{ display: "inline" }}>Involucrados:</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newInvolvedElements = formState.values.involved_elements || [];
                newInvolvedElements.push("peatones");
                formApi.setValues({ ...formState.values, involved_elements: newInvolvedElements });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
          <Text field="involved_elements" disabled={true} hidden />
          {(formState.values.involved_elements || []).map((value, index) => {
            return (
              <React.Fragment key={index}>
                <Row>
                  <Col md="1"></Col>
                  <Col md="7">
                    <Form.Group>
                      <InformedSelect
                        className="form-control"
                        field={`involved_elements[${index}]`}
                        initialValue={isCreate ? "peatones" : undefined}
                      >
                        {INVOLVED_ELEMENTS_OPTIONS.map((option) => (
                          <option value={option.id} key={option.id}>
                            {option.name}
                          </option>
                        ))}
                        {/* create constants */}
                      </InformedSelect>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Button
                      style={{ height: "40px" }}
                      className="btn-md"
                      variant="danger"
                      onClick={(event) => {
                        event.preventDefault();
                        const involved_elements = arrayRemove(formState.values.involved_elements, index);
                        formApi.setValues({ ...formState.values, involved_elements });
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Col>

        <Col md="6">
          <Form.Group>
            <label style={{ display: "inline" }}>Magnitudes</label>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newMagnitudes = formState.values.magnitude1041 || [];
                newMagnitudes.push(MAGNITUDE_1041_OPTIONS[0].id);
                formApi.setValues({ ...formState.values, magnitude1041: newMagnitudes });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
          <Text field="magnitude1041" disabled={true} hidden />
          {(formState.values.magnitude1041 || []).map((value, index) => {
            return (
              <React.Fragment key={index}>
                <Row>
                  <Col md="1"></Col>
                  <Col md="7">
                    <Form.Group>
                      <InformedSelect
                        className="form-control"
                        field={`magnitude1041[${index}]`}
                        initialValue={isCreate ? MAGNITUDE_1041_OPTIONS[0].id : undefined}
                      >
                        {MAGNITUDE_1041_OPTIONS.map((option) => (
                          <option value={option.id} key={option.id}>
                            {option.name}
                          </option>
                        ))}
                        {/* create constants */}
                      </InformedSelect>
                    </Form.Group>
                  </Col>
                  <Col md="4">
                    <Button
                      style={{ height: "40px" }}
                      className="btn-md"
                      variant="danger"
                      onClick={(event) => {
                        event.preventDefault();
                        const magnitude1041 = arrayRemove(formState.values.magnitude1041, index);
                        formApi.setValues({ ...formState.values, magnitude1041 });
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}
        </Col>
      </Row>

      <div style={{ marginTop: "15px" }}>
        <ResourcesField formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
      </div>
    </div>
  );
};
export default AccidentReportView;
