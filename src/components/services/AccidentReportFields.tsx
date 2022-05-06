import React from "react";

import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";

import { Button, Col, Form, Row } from "react-bootstrap";
import { CreateServiceInput, UpdateServiceInput } from "types";

type AccidentReportFieldsProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  handleRemoveDamage: any;
  handleRemoveQuantities1044: any;
  handleRemoveInvolvedElements: any;
  handleRemoveMagnitude1041: any;
};

const AccidentReportFields = ({
  formApi,
  formState,
  handleRemoveDamage,
  handleRemoveQuantities1044,
  handleRemoveInvolvedElements,
  handleRemoveMagnitude1041,
}: AccidentReportFieldsProps) => {
  return (
    <div>
      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Daños</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newDamages = formState.values.damage1041 || [];
                newDamages.push(undefined);
                formApi.setValues({ ...formState.values, damage1041: newDamages });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>

      <Text field="damage1041" disabled={true} hidden />
      {(formState.values.damage1041 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`damage1041[${index}]`} initialValue="materiales">
              <option value="materiales">Daños Materiales</option>
              <option value="heridos">Con Heridos</option>
              <option value="heridos_atrapados">Con Heridos Atrapados</option>
              <option value="incendios">Con Incendios</option>
              <option value="mat_pel">Con Mat-Pel ??</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleRemoveDamage(index);
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}

      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Cantidad 10.44</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newQuantities = formState.values.quantities1044 || [];
                newQuantities.push(undefined);
                formApi.setValues({ ...formState.values, quantities1044: newQuantities });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="quantities1044" disabled={true} hidden />
      {(formState.values.quantities1044 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`quantities1044[${index}].type`} initialValue="ilesos">
              <option value="ilesos">Ileso/s</option>
              <option value="heridos">Herido/s</option>
              <option value="fallecidos">Fallecido/s</option>
              <option value="rescates">Rescate/s</option>
              <option value="enfermos">Enfermo/s</option>
              {/* create constants */}
            </InformedSelect>
            <Text field={`quantities1044[${index}].quantity`} initialValue={1} />
            <button
              onClick={(event) => {
                event.preventDefault();
                handleRemoveQuantities1044(index);
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}

      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Daños</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newInvolvedElements = formState.values.involved_elements || [];
                newInvolvedElements.push(undefined);
                formApi.setValues({ ...formState.values, involved_elements: newInvolvedElements });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="involved_elements" disabled={true} hidden />
      {(formState.values.involved_elements || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`involved_elements[${index}]`} initialValue="peatones">
              <option value="peatones">Peatones</option>
              <option value="motos">Motos</option>
              <option value="vehiculos_livianos">Vehículos livianos</option>
              <option value="vehiculos_pesados">Vehículos pesados</option>
              <option value="buses">Buses</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleRemoveInvolvedElements(index);
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}

      <Row>
        <Col md="12">
          <Form.Group>
            <h4 style={{ display: "inline" }}>Magnitudes</h4>
            <Button
              className="pull-right ml-2"
              variant="success"
              // disabled={volunteers.length == volunteerList.length}
              onClick={(event) => {
                event.preventDefault();
                const newMagnitudes = formState.values.magnitude1041 || [];
                newMagnitudes.push(undefined);
                formApi.setValues({ ...formState.values, magnitude1041: newMagnitudes });
              }}
            >
              Agregar
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <Text field="magnitude1041" disabled={true} hidden />
      {(formState.values.magnitude1041 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`magnitude1041[${index}]`} initialValue="cinturon_conductor">
              <option value="cinturon_conductor">Cinturón Conductor</option>
              <option value="cinturon_acomp">Cinturón Acompañante</option>
              <option value="casco_conductor">Casco Conductor</option>
              <option value="casco_acomp">Casco Acompañante</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleRemoveMagnitude1041(index);
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
export default AccidentReportFields;
