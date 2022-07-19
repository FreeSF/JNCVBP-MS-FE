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

  return (
    <Document>
      <Page size="A4" style={styles.page} debug={false}>
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
            <Text>Cantidad total de Servicio: {report.count1040 + report.count1041 + report.count1043}</Text>
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
              <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.40: ({report.count1040})</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Servicio 10.40</Text>
                {report.subTypeCount1040.map((row) => (
                  <View>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Magnitudes</Text>
                {DAMAGE_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name}{" "}
                      {props.report.damageCount.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1040.find((the1044) => the1044.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Causas Posibles</Text>
                {report.possibleCausesCount.map((row) => (
                  <View>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Recursos Utilizados</Text>
                {RESOURCES_OPTIONS_1040.map((resource) => (
                  <View>
                    <Text>
                      {resource.name}{" "}
                      {report.resourcesUsedCount1040.find((theResource) => theResource.id === resource.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Móviles / Km.</Text>
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Total de Km. </Text>
                    <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
                  </View>
                  <Text>Nómina de Móviles utilizadas. </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }}> </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
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
              <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.41: ({report.count1041})</Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Servicio 10.41</Text>
                {report.subTypeCount1041.map((row) => (
                  <View>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Magnitudes (damage1041)</Text>
                {DAMAGE_1041_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name} {report.damage1041Count.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1041.find((the1044) => the1044.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: "4px" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Elementos Involucrados</Text>
                {INVOLVED_ELEMENTS_OPTIONS.map((item) => (
                  <View>
                    <Text>
                      {item.name}{" "}
                      {report.involvedElementsCount.find((theDamage) => theDamage.id === item.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Seguridad de involucrados</Text>
                {MAGNITUDE_1041_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name}{" "}
                      {report.magnitude1041Count.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Recursos Utilizados</Text>
                {RESOURCES_OPTIONS_1041.map((resource) => (
                  <View>
                    <Text>
                      {resource.name}{" "}
                      {report.resourcesUsedCount1041.find((theResource) => theResource.id === resource.id)?.count || 0}
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
              <Text style={{ textTransform: "uppercase" }}>
                Cantidad Global de 10.43: ({report.count1043}) ________________
              </Text>
              <Text style={{ borderBottom: "1px solid black", flexGrow: 1 }} />
            </View>

            <View style={{ marginTop: "6px", flexDirection: "row" }}>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Servicio 10.43</Text>
                {report.subTypeCount1043.map((row) => (
                  <View>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Tipo de Rescate</Text>
                {RESCUE_TYPE_OPTIONS.map((rescueType) => (
                  <View>
                    <Text>
                      {rescueType.name}{" "}
                      {report.rescueTypeCount.find((theRescueType) => theRescueType.id === rescueType.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ width: "33.33%" }}>
                <Text style={{ textDecoration: "underline", fontSize: "13px" }}>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1043.find((the1044) => the1044.id === damage.id)?.count || 0}
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
