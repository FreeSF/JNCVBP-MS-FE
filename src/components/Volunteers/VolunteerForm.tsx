import React from "react";
import { FormApi, Select, Text } from "informed";
import { useQuery } from "@apollo/client";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Spinner from "../spinner";

import {
  BLOOD_TYPES,
  get_blood_type,
  get_formatted_date,
  get_volunteer_status,
  VOLUNTEER_STATUS,
} from "../../utils/constants";
import { GET_RANKS } from "queries/ranks";
import { CreateVolunteerInput, GetRanksQuery, UpdateVolunteerInput } from "types";
import { ErrorText, notEmptyValidation } from "components/utils/Validations";

type VolunteerProps = {
  volunteer: CreateVolunteerInput | UpdateVolunteerInput;
  formApi: FormApi<CreateVolunteerInput | UpdateVolunteerInput>;
  formState: { values };
};

const VolunteerForm = ({ volunteer, formApi, formState }: VolunteerProps) => {
  const getRanksQuery = useQuery<GetRanksQuery>(GET_RANKS);

  if (getRanksQuery.loading) return <Spinner />;
  const rankOptions = getRanksQuery.data.ranks;

  return (
    <Row>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Voluntario</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Nombre (*)</label>
                  <ErrorText
                    className="form-control"
                    field="name"
                    placeholder="Nombre y Apellido"
                    type="text"
                    validateOnChange
                    validateOnBlur
                    validate={notEmptyValidation}
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label> Código (*)</label>
                  <ErrorText
                    className="form-control"
                    field="code"
                    placeholder="Código"
                    type="text"
                    validateOnChange
                    validateOnBlur
                    validate={notEmptyValidation}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="4">
                <Form.Group>
                  <label>Rango </label>
                  <Select
                    className="form-control"
                    field="rank.id"
                    initialValue={volunteer?.rank?.id || rankOptions[0].id}
                  >
                    {rankOptions.map((rank) => (
                      <option value={rank.id} key={rank.id}>
                        {rank.name}
                      </option>
                    ))}
                  </Select>
                </Form.Group>
              </Col>

              <Col md="4">
                <Form.Group>
                  <label> Estado </label>
                  <Select
                    className="form-control"
                    field="status"
                    initialValue={volunteer?.status || VOLUNTEER_STATUS[0].id}
                  >
                    {VOLUNTEER_STATUS.map((status) => (
                      <option value={status.id} key={status.id}>
                        {status.description}
                      </option>
                    ))}
                  </Select>
                </Form.Group>
              </Col>

              <Col md="4">
                <Form.Group>
                  <label>Grupo Sanguíneo </label>
                  <Select
                    className="form-control"
                    field="blood_type"
                    initialValue={volunteer?.blood_type || BLOOD_TYPES[0].id}
                  >
                    {BLOOD_TYPES.map((status) => (
                      <option value={status.id} key={status.id}>
                        {status.description}
                      </option>
                    ))}
                  </Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Fecha de Incorporación</label>
                  <DatePicker
                    className="form-control"
                    locale="es"
                    showYearDropdown
                    maxDate={new Date()}
                    onChange={(value) => {
                      formApi.setValues({ ...formState.values, incorporation_date: value });
                    }}
                    selected={formState?.values?.incorporation_date && new Date(formState.values.incorporation_date)}
                  />
                  <Text className="form-control" field="incorporation_date" placeholder="" type="hidden" />
                </Form.Group>
              </Col>

              <Col md="6">
                <Form.Group>
                  <label>Fecha de Nacimiento</label>
                  <DatePicker
                    className="form-control"
                    locale="es"
                    showYearDropdown
                    maxDate={new Date()}
                    onChange={(value) => {
                      formApi.setValues({ ...formState.values, birth_date: value });
                    }}
                    selected={formState?.values?.birth_date && new Date(formState.values.birth_date)}
                  />
                  <Text className="form-control" field="birth_date" placeholder="" type="hidden" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="12">
                <Form.Group>
                  <label> Dirección </label>
                  <Text className="form-control" field="address" placeholder="Calle 1 - Calle 2" type="text" />
                </Form.Group>
              </Col>
            </Row>

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              {" "}
              Guardar Voluntario
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>

      {/* Right card section  */}
      <Col md="4">
        <Card className="card-user">
          <div className="card-image">
            <img alt="..." src={require("../../assets/img/incendio.jpg")}></img>
          </div>
          <Card.Body>
            <div className="author">
              <a href="#" onClick={(e) => e.preventDefault()}>
                <img alt="..." className="avatar border-gray" src={require("../../assets/img/faces/face-0.jpg")}></img>
                <h5 className="title">{`${formState.values?.name || "Nombre"} (${get_volunteer_status(
                  formState.values?.status
                )})`}</h5>
              </a>
              <p className="description">[{`${formState.values?.code || "Código"}`}]</p>
            </div>
            <p className="description text-center">
              Tipo de Sangre: {get_blood_type(formState?.values?.blood_type)} <br></br>
              {formState.values.incorporation_date &&
                "Fecha de juramento: " + get_formatted_date(formState.values.incorporation_date)}{" "}
              <br></br>
              {formState.values.birth_date &&
                "Fecha de nacimiento: " + get_formatted_date(formState.values.birth_date)}{" "}
              <br></br>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default VolunteerForm;
