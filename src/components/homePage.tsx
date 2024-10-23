import React, { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { BlobProvider } from "@react-pdf/renderer";
import GeneralReport from "../reports/GeneralReport";
import { useQuery } from "@apollo/client";
import { CurrentGuardQuery, GetReportQuery, NextGuardQuery } from "../types";
import { GET_REPORT } from "../queries/Reports";
import Spinner from "./spinner";
import { endOfMonth, startOfMonth } from "../utils/Utils";
import moment from "moment";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";
import { CODES, DEFAULT_DATETIME_FORMAT, QUANTITIES_1044_1045_OPTIONS } from "../utils/constants";
import { CURRENT_GUARD, NEXT_GUARD } from "../queries/Guards";
import "./HomePage.sass";

const MONTH_OPTIONS = [
  { value: "0", label: "Enero" },
  { value: "1", label: "Febrero" },
  { value: "2", label: "Marzo" },
  { value: "3", label: "Abril" },
  { value: "4", label: "Mayo" },
  { value: "5", label: "Junio" },
  { value: "6", label: "Julio" },
  { value: "7", label: "Agosto" },
  { value: "8", label: "Septiembre" },
  { value: "9", label: "Octubre" },
  { value: "10", label: "Noviembre" },
  { value: "11", label: "Diciembre" },
];

const HomePage = () => {
  const [year, setYear] = useState("" + moment().year());
  const [month, setMonth] = useState(MONTH_OPTIONS.find((option) => option.value === "" + moment().month()));
  const reportQuery = useQuery<GetReportQuery>(GET_REPORT, {
    variables: {
      startDate: startOfMonth(month.value, year).getTime(),
      endDate: endOfMonth(month.value, year).getTime(),
    },
  });
  const currentGuardQuery = useQuery<CurrentGuardQuery>(CURRENT_GUARD);
  const nextGuardQuery = useQuery<NextGuardQuery>(NEXT_GUARD);
  if (reportQuery.loading || currentGuardQuery.loading || nextGuardQuery.loading) return <Spinner />;

  const { count1040, count1041, count1043 } = reportQuery.data.report;
  const totalServicesCount = count1040 + count1041 + count1043;
  const allSubtypes = [
    ...reportQuery.data.report.subTypeCount1040,
    ...reportQuery.data.report.subTypeCount1041,
    ...reportQuery.data.report.subTypeCount1043,
  ].filter((subType) => subType.count);
  const all1044 = [
    ...reportQuery.data.report.quantities1044Count1040,
    ...reportQuery.data.report.quantities1044Count1041,
    ...reportQuery.data.report.quantities1044Count1043,
  ];
  const all1044flat = _.flattenDeep(all1044.map((the1044) => Array(the1044.count).fill(the1044.id)));
  const all1044Counted = _.countBy(all1044flat);
  const all1044Labels = Object.entries(all1044Counted).map(
    ([key, value]) => QUANTITIES_1044_1045_OPTIONS.find((option) => option.id === key).name
  );
  const all1044Values = Object.values(all1044Counted);

  const subTypeOptions = {
    chart: {
      type: "pie",
    },
    labels: allSubtypes.map((subtype) => subtype.name),
    legend: {
      show: true,
      position: "bottom",
    },
  };
  const subTypeSeries = allSubtypes.map((subtype) => subtype.count);

  const typeOptions = {
    chart: {
      type: "pie",
    },
    labels: [CODES.FIRE, CODES.ACCIDENT, CODES.RESCUE],
    legend: {
      show: true,
      position: "bottom",
    },
  };
  const typeSeries = [count1040, count1041, count1043];

  const quantities1044Options = {
    chart: {
      type: "pie",
    },
    labels: all1044Labels,
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <>
      <Container fluid>
        <Row>
          {currentGuardQuery.data.currentGuard && (
            <div className="col-6">
              <Card className={"card-stats flashing-card"}>
                <Card.Header>
                  <Card.Title as="h4">Guardia Actual:</Card.Title>
                </Card.Header>
                <Card.Body>
                  <React.Fragment>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Inicio:</span>{" "}
                      {moment(currentGuardQuery.data.currentGuard.start_time).format(DEFAULT_DATETIME_FORMAT)}
                      <span style={{ fontWeight: "bold" }}> Fin:</span>{" "}
                      {moment(currentGuardQuery.data.currentGuard.end_time).format(DEFAULT_DATETIME_FORMAT)}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Encargados:</span>{" "}
                      {currentGuardQuery.data.currentGuard.volunteers.map((volunteer) => volunteer.name).join(", ")}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Observaciones:</span>{" "}
                      {currentGuardQuery.data.currentGuard.observations}
                    </p>
                  </React.Fragment>
                </Card.Body>
              </Card>
            </div>
          )}

          {nextGuardQuery.data.nextGuard && (
            <div className="col-6">
              <Card className="card-stats">
                <Card.Header>
                  <Card.Title as="h4">Siguiente Guardia:</Card.Title>
                </Card.Header>
                <Card.Body>
                  <React.Fragment>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Inicio:</span>{" "}
                      {moment(nextGuardQuery.data.nextGuard.start_time).format(DEFAULT_DATETIME_FORMAT)}
                      <span style={{ fontWeight: "bold" }}> Fin:</span>{" "}
                      {moment(nextGuardQuery.data.nextGuard.end_time).format(DEFAULT_DATETIME_FORMAT)}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Encargados:</span>{" "}
                      {nextGuardQuery.data.nextGuard.volunteers.map((volunteer) => volunteer.name).join(", ")}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Observaciones:</span>{" "}
                      {nextGuardQuery.data.nextGuard.observations}
                    </p>
                  </React.Fragment>
                </Card.Body>
              </Card>
            </div>
          )}
        </Row>

        <div
          className="d-flex align-items-center w-100"
          style={{ marginBottom: "10px", justifyContent: "space-between" }}
        >
          <div className="d-flex align-items-center">
            <span className="d-block" style={{ marginLeft: "5px", marginRight: "5px" }}>
              Año:{" "}
            </span>
            <Select
              options={[
                { value: "2023", label: "2023" },
                { value: "2022", label: "2022" },
                { value: "2021", label: "2021" },
              ]}
              onChange={(option) => setYear(option.value)}
              value={{ value: year, label: year }}
            />
            <span className="d-block" style={{ marginLeft: "5px", marginRight: "5px" }}>
              Mes:{" "}
            </span>
            <Select options={MONTH_OPTIONS} onChange={setMonth} value={month} />
          </div>
          <BlobProvider document={<GeneralReport report={reportQuery.data.report} />}>
            {({ url }) => (
              <Button
                href={url}
                target="_blank"
                className="btn-fill btn-sm"
                variant="info"
                style={{ marginLeft: "10px" }}
              >
                Reporte PDF
              </Button>
            )}
          </BlobProvider>
        </div>
        <Row>
          <Col lg="6">
            <Row>
              <div className="col-6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-chart text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Total de servicios</p>
                          <Card.Title as="h4">{totalServicesCount}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Mes Actual
                    </div>
                  </Card.Footer>
                </Card>
              </div>
              <div className="col-6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-chart text-warning"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Servicios 10.40</p>
                          <Card.Title as="h4">{count1040}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Mes Actual
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Row>

            <Row>
              <div className="col-6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-light-3 text-success"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Servicios 10.41</p>
                          <Card.Title as="h4">{count1041}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Mes Actual
                    </div>
                  </Card.Footer>
                </Card>
              </div>
              <div className="col-6">
                <Card className="card-stats">
                  <Card.Body>
                    <Row>
                      <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-vector text-danger"></i>
                        </div>
                      </Col>
                      <Col xs="7">
                        <div className="numbers">
                          <p className="card-category">Servicios 10.43</p>
                          <Card.Title as="h4">{count1043}</Card.Title>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <hr></hr>
                    <div className="stats">
                      <i className="far fa-calendar-alt mr-1"></i>
                      Mes Actual
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </Row>
          </Col>

          <Col lg="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tipo de Servicio</Card.Title>
                <p className="card-category">Mes Actual</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  {/*@ts-ignore*/}
                  <ReactApexChart options={typeOptions} series={typeSeries} type="pie" width={"94%"} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sub tipos</Card.Title>
                <p className="card-category">Mes Actual</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  {/*@ts-ignore*/}
                  <ReactApexChart options={subTypeOptions} series={subTypeSeries} type="pie" width={"94%"} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Cantidad de 10.44/10.45</Card.Title>
                <p className="card-category">Mes Actual</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  {/*@ts-ignore*/}
                  <ReactApexChart options={quantities1044Options} series={all1044Values} type="pie" width={"94%"} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
