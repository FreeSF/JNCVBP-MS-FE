/* eslint-disable react/jsx-key */
import React from "react";
import ReactDOM from "react-dom";
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Query, Mutation, Subscription } from "@apollo/client/react/components";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { graphql } from "@apollo/client/react/hoc";
import { FIND_SERVICE, GET_SERVICES } from "../queries/services";
import {
  AFFECTED_OWNER_OPTIONS,
  API_URL,
  CODES,
  DAMAGE_1041_OPTIONS,
  DAMAGE_OPTIONS,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  INVOLVED_ELEMENTS_OPTIONS,
  MAGNITUDE_1041_OPTIONS,
  PROPORTION_OPTIONS,
  QUANTITIES_1044_1045_OPTIONS,
  RESCUE_TYPE_OPTIONS,
  RESOURCES_OPTIONS,
} from "../utils/constants";
import { FindServiceQuery, ServicesAllFieldsFragment } from "../types";
import { useQuery } from "react-apollo";
import Spinner from "../components/spinner";
import moment from "moment";

/*const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: API_URL,
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Space Explorer [web]',
    'client-version': '1.0.0',
  },
});*/

export const generateSingleServiceReport = (id: string) => {
  /*client.query<FindServiceQuery>({
    query: FIND_SERVICE,
    variables: { id }
  }).then(res => {
    console.log({res})*/
  //ReactDOM.render(<SingleServiceReport serviceId={id}/>, document.getElementById('here'))
  //return <SingleServiceReport serviceId={id}/>
  //ReactPDF.renderToStream(<MyDocument />);
  //})
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "10px",
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
  service: ServicesAllFieldsFragment;
}

// Create Document Component
const SingleServiceReport: React.FC<TheProps> = (props) => {
  const { service } = props;
  return (
    //<PDFViewer style={styles.viewer}>
    <Document>
      <Page size="LEGAL" style={styles.page} debug={false}>
        <View style={{ border: "1px solid blue", width: "100%", fontSize: "12px" }}>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "10px" }}>
            {service.sub_type.code === CODES.FIRE
              ? "Comunicación de Incendios"
              : service.sub_type.code === CODES.ACCIDENT
              ? "Informe de Accidentes"
              : service.sub_type.code === CODES.RESCUE
              ? "Informe de Rescates"
              : "?"}
          </Text>
          <Text style={{ textAlign: "center", width: "100%" }}>{"CBV de Capitán Miranda"}</Text>
          <Text
            style={{ textAlign: "center", width: "100%", marginTop: "4px", border: "1px solid red" }}
          >{`Número: ___ Compañía: ___ Fecha: ${moment(service.date).format(DEFAULT_DATE_FORMAT)}`}</Text>
          <View
            style={{
              marginTop: "4px",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              border: "1px solid red",
            }}
          >
            {/*<Text>{`Hora de:    Llamada: ${service.call_time}   Salida: ${service.departure_time}   Llegada: ${service.arrival_time}   Retirada: ${service.withdrawal_time}`}</Text>*/}
            <Text>{`Hora de:`}</Text>
            <Text>{`Llamada: ${service.call_time}`}</Text>
            <Text>{`Salida: ${service.departure_time}`}</Text>
            <Text>{`Llegada: ${service.arrival_time}`}</Text>
            <Text>{`Retirada: ${service.withdrawal_time}`}</Text>
          </View>
          <View
            style={{
              marginTop: "4px",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              border: "1px solid red",
            }}
          >
            <View style={{ width: "50%", border: "1px solid green" }}>
              <Text>{`Localidad: ${service.locality}`}</Text>
              <Text>{`Dirección: ${service.address}`}</Text>
              <Text>{`Avisado por: ${service.alerted_by}`}</Text>
              <Text>{`Recibido y Confirmado por: ${service.received_by}`}</Text>
            </View>
            <View style={{ width: "50%", border: "1px solid green" }}>
              <Text>{`Barrio: ${service.neighborhood}`}</Text>
              <Text>{`Lugar: ${service.place}`}</Text>
              <Text>{`Teléfono: ${service.phone}`}</Text>
              <Text>{`Grupo de Guardia: ${service.crew}`}</Text>
            </View>
          </View>
          <View>
            <Text>{`Oficial o Voluntario a cargo: ${service.officer_in_charge.name}`}</Text>
          </View>

          {/* 10.40 */}
          {service.sub_type.code === CODES.FIRE && (
            <React.Fragment>
              <View style={{ border: "1px solid blue" }}>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "50%" }}>Tipo</Text>
                  <Text style={{ width: "25%" }}>Superficie del Local</Text>
                  <Text style={{ width: "25%" }}>Superficie Incendiada</Text>
                </View>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "50%" }}>{service.fire_type_description || service.sub_type.name}</Text>
                  <Text style={{ width: "25%" }}>{service.fire_type_total_surface}</Text>
                  <Text style={{ width: "25%" }}>{service.fire_type_burned_surface}</Text>
                </View>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text style={{ width: "25%" }}>Propietarios Afectados:</Text>
                <Text>{`${
                  AFFECTED_OWNER_OPTIONS.find((owner) => owner.id === service.affected_owner)?.name ||
                  service.affected_owner
                } - ${service.affected_owner_description}`}</Text>
              </View>
              <View style={{ flexDirection: "row", border: "1px solid blue" }}>
                <View style={{ border: "1px solid red", width: "50%" }}>
                  <Text>Causas Posibles:</Text>
                  <Text>{`${service.possible_cause_other_description || service.possible_cause.name}`}</Text>
                </View>
                <View style={{ border: "1px solid red", width: "50%" }}>
                  <Text>Agentes Extintores Utilizados:</Text>
                  {service.resources_used.map((resource) => (
                    <Text>{`${
                      RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name || resource.resource
                    }: ${resource.quantity}`}</Text>
                  ))}
                </View>
              </View>
              <View style={{ flexDirection: "row", border: "1px solid blue" }}>
                <View style={{ border: "1px solid red", width: "50%" }}>
                  <Text>Fuego Clase:</Text>
                  {service.fire_class.map((fireClass) => (
                    <Text>{`${fireClass.name}`}</Text>
                  ))}
                </View>
                <View style={{ border: "1px solid red", width: "25%" }}>
                  <Text>Proporción:</Text>
                  <Text>{`${
                    PROPORTION_OPTIONS.find((proportion) => proportion.id === service.magnitude)?.name ||
                    service.magnitude
                  }`}</Text>
                </View>
                <View style={{ border: "1px solid red", width: "25%" }}>
                  <Text>Destrucción:</Text>
                  <Text>{`${
                    DAMAGE_OPTIONS.find((damage) => damage.id === service.damage)?.name || service.damage
                  }`}</Text>
                </View>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Vehículos Utilizados:</Text>
                <Text>{service.vehicles_used}</Text>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Otras Unidades de Apoyo:</Text>
                <Text>{service.other_units}</Text>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Otras Ocurrencias:</Text>
                <Text>{service.other_occurrences}</Text>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Fuerza Policial a cargo:</Text>
                <Text>{service.police_force_in_charge}</Text>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Juzgado de Crimen oficiado por:</Text>
                <Text>{service.judge_in_charge}</Text>
              </View>
              <View style={{ border: "1px solid blue" }}>
                <Text>Otros datos de interés:</Text>
                <Text>---?</Text>
              </View>
            </React.Fragment>
          )}

          {/* 10.41 */}
          {service.sub_type.code === CODES.ACCIDENT && (
            <React.Fragment>
              <View style={{ border: "1px solid blue" }}>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "34%" }}>Tipo</Text>
                  <Text style={{ width: "33%" }}>Magnitudes (damage1041)</Text>
                  <Text style={{ width: "33%" }}>Cantidad de 10.44</Text>
                </View>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "34%" }}>{service.sub_type.name}</Text>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.damage1041.map((damage) => (
                      <Text>{DAMAGE_1041_OPTIONS.find((item) => item.id === damage)?.name || damage}</Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.quantities1044.map((the1044) => (
                      <Text>
                        {QUANTITIES_1044_1045_OPTIONS.find((item) => item.id === the1044.name)?.name || the1044.name}:{" "}
                        {the1044.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <View style={{ border: "1px solid blue" }}>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "34%" }}>Involucrados</Text>
                  <Text style={{ width: "33%" }}>Magnitudes</Text>
                  <Text style={{ width: "33%" }}>Recursos Usados</Text>
                </View>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <View style={{ flexDirection: "column", width: "34%" }}>
                    {service.involved_elements.map((element) => (
                      <Text>{INVOLVED_ELEMENTS_OPTIONS.find((item) => item.id === element)?.name || element}</Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.magnitude1041.map((magnitude) => (
                      <Text>{MAGNITUDE_1041_OPTIONS.find((item) => item.id === magnitude)?.name || magnitude}</Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.resources_used.map((resource) => (
                      <Text>{`${
                        RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name || resource.resource
                      }: ${resource.quantity}`}</Text>
                    ))}
                  </View>
                </View>
              </View>

              <Text>Mencione el mayor problema presente y el motivo en los servicios según la hoja 10.41</Text>
              <Text>{service.description}</Text>
            </React.Fragment>
          )}

          {service.sub_type.code === CODES.RESCUE && (
            <React.Fragment>
              <View style={{ border: "1px solid blue" }}>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "34%" }}>Tipo</Text>
                  <Text style={{ width: "33%" }}>Tipo de Rescate</Text>
                  <Text style={{ width: "33%" }}>Cantidad de 10.44/10.45</Text>
                </View>
                <View style={{ flexDirection: "row", border: "1px solid red" }}>
                  <Text style={{ width: "34%" }}>{service.sub_type.name}</Text>
                  <Text style={{ width: "33%" }}>
                    {RESCUE_TYPE_OPTIONS.find((item) => item.id === service.rescue_type)?.name || service.rescue_type}
                  </Text>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.quantities1044.map((the1044) => (
                      <Text>
                        {QUANTITIES_1044_1045_OPTIONS.find((item) => item.id === the1044.name)?.name || the1044.name}:{" "}
                        {the1044.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <Text>Otros datos de interés</Text>
              <Text>{service.description}</Text>
            </React.Fragment>
          )}

          <View style={{ border: "1px solid blue" }}>
            <Text>Nómina de Voluntarios:</Text>

            <View style={{ border: "1px solid blue", flexDirection: "row" }}>
              {service.volunteers.map((volunteer) => (
                <Text style={{ width: "33.333%", border: "1px solid red" }}>{volunteer.name}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
    //</PDFViewer>
  );
};

export default SingleServiceReport;
