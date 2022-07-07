import React, { useState } from "react";
import ChartistGraph from "react-chartist";
import { Button, Card, Table, Container, Row, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import { BlobProvider } from "@react-pdf/renderer";
import GeneralReport from "../reports/GeneralReport";
import { useQuery } from "react-apollo";
import { GetReportQuery, GetVolunteersQuery } from "../types";
import { GET_REPORT } from "../queries/Reports";
import Spinner from "./spinner";
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "../utils/Utils";
import DatePicker from "react-datepicker";
import moment from "moment";
import _ from "lodash";
import ReactApexChart from "react-apexcharts";

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
  const [startDate, setStartDate] = useState<Date>(startOfDay(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfDay(new Date()));
  const [year, setYear] = useState("" + moment().year());
  const [month, setMonth] = useState(MONTH_OPTIONS.find((option) => option.value === "" + moment().month()));
  const reportQuery = useQuery<GetReportQuery>(GET_REPORT, {
    variables: {
      startDate: startOfMonth(month.value, year).getTime(),
      endDate: endOfMonth(month.value, year).getTime(),
    },
  });
  if (reportQuery.loading) return <Spinner />;

  const { count1040, count1041, count1043 } = reportQuery.data.report;
  const totalServicesCount = count1040 + count1041 + count1043;
  const allSubtypes = [
    ...reportQuery.data.report.subTypeCount1040,
    ...reportQuery.data.report.subTypeCount1041,
    ...reportQuery.data.report.subTypeCount1043,
  ];

  const options = {
    chart: {
      type: "pie",
    },
    labels: allSubtypes.map((subtype) => subtype.name),
    legend: {
      show: true,
      position: "bottom",
    },
  };
  const series = allSubtypes.map((subtype) => subtype.count);

  return (
    <>
      <Container fluid>
        <div className="d-flex">
          <label>Año</label>
          <Select
            options={[
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
            ]}
            onChange={(option) => setYear(option.value)}
            value={{ value: year, label: year }}
          />
          <label>Mes</label>
          <Select options={MONTH_OPTIONS} onChange={setMonth} value={month} />
          <BlobProvider document={<GeneralReport report={reportQuery.data.report} />}>
            {({ url }) => (
              <Button href={url} target="_blank" className="btn-fill btn-sm" variant="info">
                Reporte Mensual
              </Button>
            )}
          </BlobProvider>
        </div>
        <Row>
          <Col lg="3" sm="6">
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
          </Col>
          <Col lg="3" sm="6">
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
          </Col>
          <Col lg="3" sm="6">
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
          </Col>
          <Col lg="3" sm="6">
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
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Tipo de Servicio</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  <ChartistGraph
                    data={{
                      labels: [
                        ((count1040 / totalServicesCount) * 100 || 0).toFixed(2) + "%",
                        ((count1041 / totalServicesCount) * 100 || 0).toFixed(2) + "%",
                        ((count1043 / totalServicesCount) * 100 || 0).toFixed(2) + "%",
                      ],
                      series: [
                        count1040 / totalServicesCount,
                        count1041 / totalServicesCount,
                        count1043 / totalServicesCount,
                      ],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info" />
                  10.40 <i className="fas fa-circle text-danger" />
                  10.41 <i className="fas fa-circle text-warning" />
                  10.43
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Sub tipos</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  {/*@ts-ignore*/}
                  <ReactApexChart options={options} series={series} type="pie" width={"100%"} />
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Cantidad de 10.44/10.45</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                  <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Sólidos Fibrosos <i className="fas fa-circle text-danger"></i>
                  Líquidos Inflamables <i className="fas fa-circle text-warning"></i>
                  Eléctricos
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: ["9:00AM", "12:00AM", "3:00PM", "6:00PM", "9:00PM", "12:00PM", "3:00AM", "6:00AM"],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Click <i className="fas fa-circle text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                      series: [
                        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695],
                      ],
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Tesla Model S <i className="fas fa-circle text-danger"></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <Card.Title as="h4">Tasks</Card.Title>
                <p className="card-category">Backend development</p>
              </Card.Header>
              <Card.Body>
                <div className="table-full-width">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Sign contract for "What are conference organizers afraid of?"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-488980961">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-506045838">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultChecked defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-537440761">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-21130535">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultChecked defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept
                          through metro Detroit
                        </td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-577232198">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-773861645">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultChecked type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Create 4 Invisible User Experiences you Never Knew About</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-422471719">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-829164576">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Read "Following makes Medium better"</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-160575228">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-922981635">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" disabled type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>Unfollow 5 enemies from twitter</td>
                        <td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-938342127">Edit Task..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info">
                              <i className="fas fa-edit"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger overlay={<Tooltip id="tooltip-119603706">Remove..</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
