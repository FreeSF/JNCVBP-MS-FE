/* eslint-disable react/jsx-key */
import { Page, StyleSheet, Document, View, Text, Font } from "@react-pdf/renderer";
import React from "react";
import { FindCourseQuery, GetSubTypesDisabledQuery, GetSubTypesQuery, Report } from "../types";
import {
  DAMAGE_1041_OPTIONS,
  DAMAGE_OPTIONS,
  DEFAULT_DATE_FORMAT,
  INVOLVED_ELEMENTS_OPTIONS,
  MAGNITUDE_1041_OPTIONS,
  QUANTITIES_1044_1045_OPTIONS,
  RESCUE_TYPE_OPTIONS,
  RESOURCES_OPTIONS_1040,
  RESOURCES_OPTIONS_1041,
} from "../utils/constants";
import { useQuery } from "react-apollo";
import { GET_REPORT } from "../queries/Reports";
import { GET_SUB_TYPES, GET_SUB_TYPES_DISABLED } from "../queries/subType";
import Spinner from "../components/spinner";
import moment from "moment";

// Register font
//Font.register({ family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' });

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "10px",
    //fontFamily: 'Roboto'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

interface TheProps {
  report: any;
}

// Create Document Component
const GeneralReport: React.FC<TheProps> = (props) => {
  const report: Report = props.report;

  /*const getSubTypesDisabledQuery = useQuery<GetSubTypesDisabledQuery>(GET_SUB_TYPES_DISABLED);
  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);

  if(getSubTypesQuery.loading || getSubTypesDisabledQuery.loading)
    return <Spinner/>*/

  const fire = [1, 3, 2, 1, 1, 1, 1];
  const fireMagn = [4, 4, 2, 0];
  const fire1044 = [4, 6, 0, 2, 1];
  const fireCauses = [3, 0, 5, 2, 0, 0];
  const fireResources = [2500, 20, 30, 200, 500, 7, 640, 0];

  const accidents = [0, 4, 2, 4, 2];
  const accidentsMag = [6, 3, 0, 1, 2];
  const accidentsMag1044 = [4, 5, 0, 1, 2];

  const accidentsInv = [6, 10, 2, 0, 0];
  const accidentsSeg = [4, 4, 8, 6];
  const accidentsRec = [700, 2, 320, 800, 2];

  const rescue = [0, 0, 2, 2, 1, 3];
  const rescueResc = [3, 0, 2, 0, 1, 0, 2];
  const rescue1044 = [5, 3, 0, 1, 0];

  return (
    <Document>
      <Page size="LEGAL" style={styles.page} debug={false}>
        <View style={{ width: "100%", fontSize: "12px" }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "10px",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Junta Nacional de Cuerpos de Bomberos Voluntarios del Paraguay
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            Comandancia Nacional
          </Text>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "6px",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            Informe Mensual de Servicios
          </Text>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "6px", marginBottom: "4px" }}>
            CBV de Capitán Miranda
          </Text>
          <View style={{ flexDirection: "row", marginBottom: "10px" }}>
            <Text style={{ width: "30%", fontWeight: "bold" }}>
              Fecha de Envío:{"     "}/{"     "}/{"     "}
            </Text>
            <Text style={{ width: "25%" }}>Hora:_______</Text>
            <Text style={{ width: "25%" }}>Mes:_______</Text>
            <Text style={{ width: "20%" }}>Año:_______</Text>
          </View>
          {/*<View style={{flexDirection: "row", border: "1px solid red"}}>
            <Text>Fecha: {moment(report.startDate).format(DEFAULT_DATE_FORMAT)} al {moment(report.endDate).format(DEFAULT_DATE_FORMAT)}</Text>
          </View>*/}
          <Text style={{ fontSize: "15px", textDecoration: "underline" }}>Datos de Envío.</Text>
          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <Text style={{ width: "50%" }}>CBV de Capitán Miranda</Text>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text>Cantidad Cia. / Estaciones: </Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text>Elaborado por: </Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>
            <View style={{ flexDirection: "row", width: "50%" }}>
              <Text>Teléfono: ________________</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <Text>Enviado desde: </Text>
            <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
          </View>
          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <Text>Fax habilitado (para posible reenvío): </Text>
            <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
          </View>
          <Text style={{ marginTop: "6px" }}>
            Fecha de cierre del informe:{"     "}/{"     "}/{"     "}
          </Text>

          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <Text>Cantidad total de Servicio: {30}</Text>
            <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                width: "60px",
                fontSize: "14px",
                textAlign: "center",
                padding: "2px",
                marginTop: "6px",
              }}
            >
              10.40
            </Text>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.40: ({10})</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px", fontSize: "10px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Servicio 10.40
                </Text>
                {report.subTypeCount1040.map((row, index) => (
                  <View>
                    <Text>
                      - {row.name}: {fire[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>Magnitudes</Text>
                {DAMAGE_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {fireMagn[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Cantidad de 10.44/10.45
                </Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {fire1044[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px", fontSize: "10px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Causas Posibles
                </Text>
                {report.possibleCausesCount.map((row, index) => (
                  <View>
                    <Text>
                      - {row.name}: {fireCauses[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Recursos Utilizados
                </Text>
                {RESOURCES_OPTIONS_1040.map((resource, index) => (
                  <View>
                    <Text>
                      - {resource.name}: {fireResources[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Móviles / Km.
                </Text>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>- Total de Km. </Text>
                    <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
                  </View>
                  <Text>- Nómina de Móviles utilizadas. </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }}> </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "6px" }}>
              <Text style={{ textDecoration: "underline" }}>
                Mencione el mayor problema presente y el motivo en los servicios según la hoja 10.40
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }}> </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                width: "60px",
                fontSize: "14px",
                textAlign: "center",
                padding: "2px",
                marginTop: "6px",
              }}
            >
              10.41
            </Text>
            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.41: ({12})</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px", fontSize: "10px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Servicio 10.41
                </Text>
                {report.subTypeCount1041.map((row, index) => (
                  <View>
                    <Text>
                      - {row.name}: {accidents[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>Magnitudes</Text>
                {DAMAGE_1041_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {accidentsMag[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Cantidad de 10.44/10.45
                </Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {accidentsMag1044[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px", fontSize: "10px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Elementos Involucrados
                </Text>
                {INVOLVED_ELEMENTS_OPTIONS.map((item, index) => (
                  <View>
                    <Text>
                      - {item.name}: {accidentsInv[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Seguridad de involucrados
                </Text>
                {MAGNITUDE_1041_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {accidentsSeg[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Recursos Utilizados
                </Text>
                {RESOURCES_OPTIONS_1041.map((resource, index) => (
                  <View>
                    <Text>
                      - {resource.name}: {accidentsRec[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: "4px" }}>
            <Text style={{ textDecoration: "underline" }}>
              Mencione el mayor problema presente y el motivo en los servicios según la hoja 10.41
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }}> </Text>
          </View>

          <View>
            <Text
              style={{
                backgroundColor: "black",
                color: "white",
                width: "60px",
                fontSize: "14px",
                textAlign: "center",
                padding: "2px",
                marginTop: "6px",
              }}
            >
              10.43
            </Text>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.43: ({8}) ________________</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ marginTop: "6px", flexDirection: "row", fontSize: "10px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Servicio 10.43
                </Text>
                {report.subTypeCount1043.map((row, index) => (
                  <View>
                    <Text>
                      - {row.name}: {rescue[index]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Tipo de Rescate
                </Text>
                {RESCUE_TYPE_OPTIONS.map((rescueType, index) => (
                  <View>
                    <Text>
                      - {rescueType.name}: {rescueResc[index]}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px", marginBottom: "2px" }}>
                  Cantidad de 10.44/10.45
                </Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage, index) => (
                  <View>
                    <Text>
                      - {damage.name}: {rescue1044[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneralReport;
