import React from "react";
import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";
import _ from "lodash";

import DatePicker from "react-datepicker";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { useQuery } from "react-apollo";
import {
  CreateServiceInput,
  GetFireCausesQuery,
  GetFireClassesQuery,
  GetSubTypesQuery,
  GetVolunteersQuery,
  UpdateServiceInput,
} from "../../types";

import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { GET_SUB_TYPES } from "../../queries/subType";
import { GET_FIRE_CAUSES } from "../../queries/fireCause";
import { GET_FIRE_CLASSES } from "../../queries/fireClass";

import Spinner from "../spinner";
import { CODES } from "utils/constants";

import DefaultServiceView from "./views/DefaultServiceView";
import FireReportView from "./views/FireReportView";
import AccidentReportView from "./views/AccidentReportView";
import RescueReportView from "./views/RescueReportView";

type theProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  isCreate: boolean;
};

function arrayRemove(arr, index) {
  const result = [...arr];
  result.splice(index, 1);

  return result;
}

const ServiceForm = (props: theProps) => {
  const { isCreate, formApi, formState } = props;

  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);
  const getFireCausesQuery = useQuery<GetFireCausesQuery>(GET_FIRE_CAUSES);
  const getFireClassesQuery = useQuery<GetFireClassesQuery>(GET_FIRE_CLASSES);

  if (
    getVolunteersQuery.loading ||
    getSubTypesQuery.loading ||
    getFireCausesQuery.loading ||
    getFireClassesQuery.loading
  )
    return <Spinner />;

  const selectedCode = getSubTypesQuery.data.subTypes.find((st) => st.id == formState.values.sub_type?._id)?.code;
  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Servicio</Card.Title>
            {/* We may don't need this field, TBD - should be deleted form entity */}
            <Text field="type" disabled={true} hidden />
            <Row>
              <Col md="4">
                <label>Tipo</label>

                {/* <Text field="sub_type.code" initialValue={getSubTypesQuery.data.subTypes[0]?.code} disabled={true} hidden /> */}
                {/* volunteer?.rank?.id || rankOptions[0].id */}
                {/* formState?.values?.date */}
                <InformedSelect
                  className="form-control"
                  field="sub_type._id"
                  initialValue={isCreate ? getSubTypesQuery.data.subTypes[0]?.id : undefined}
                >
                  {getSubTypesQuery.data.subTypes.map((subType) => (
                    <option value={subType.id} key={subType.id}>
                      {`${subType.code} - ${subType.name}`}
                    </option>
                  ))}
                </InformedSelect>
              </Col>

              <Col md="4">
                <label>Oficial a cargo:</label>
                <InformedSelect
                  className="form-control"
                  field={`officer_in_charge._id`}
                  initialValue={isCreate ? getVolunteersQuery.data.volunteers[0]?.id : undefined}
                >
                  {getVolunteersQuery.data.volunteers.map((volunteer) => (
                    <option value={volunteer.id} key={volunteer.id}>
                      {volunteer.name}
                    </option>
                  ))}
                </InformedSelect>
              </Col>

              <Col md="4">
                <Form.Group>
                  <label>Fecha</label>
                  <DatePicker
                    className="form-control"
                    locale="es"
                    maxDate={new Date()}
                    onChange={(value) => {
                      formApi.setValues({ ...formState.values, date: value });
                    }}
                    selected={formState?.values?.date && new Date(formState.values.date)}
                  />
                  <Text field="date" type="" hidden />
                </Form.Group>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DefaultServiceView
              formState={formState}
              formApi={formApi}
              arrayRemove={arrayRemove}
              volunteerOptions={getVolunteersQuery.data.volunteers}
              isCreate={isCreate}
            />

            <hr />

            <div style={{ display: selectedCode == CODES.FIRE ? "" : "none" }}>
              <FireReportView
                fireCausesOptions={getFireCausesQuery.data.fireCauses}
                fireClassesOptions={getFireClassesQuery.data.fireClasses}
                formState={formState}
                formApi={formApi}
                arrayRemove={arrayRemove}
                isCreate={isCreate}
              />
            </div>

            <div style={{ display: selectedCode == CODES.ACCIDENT ? "" : "none" }}>
              <AccidentReportView
                formApi={formApi}
                formState={formState}
                arrayRemove={arrayRemove}
                isCreate={isCreate}
              />
            </div>

            <div style={{ display: selectedCode == CODES.RESCUE ? "" : "none" }}>
              <RescueReportView formApi={formApi} formState={formState} arrayRemove={arrayRemove} isCreate={isCreate} />
            </div>

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              Guardar
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ServiceForm;
