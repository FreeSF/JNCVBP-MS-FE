import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import {
  AFFECTED_OWNER_OPTIONS,
  CODES,
  DAMAGE_1041_OPTIONS,
  DAMAGE_OPTIONS,
  DEFAULT_DATE_FORMAT,
  INVOLVED_ELEMENTS_OPTIONS,
  MAGNITUDE_1041_OPTIONS,
  OTHER_ID,
  OTHER_NAME,
  PROPORTION_OPTIONS,
  QUANTITIES_1044_1045_OPTIONS,
  RESCUE_TYPE_OPTIONS,
  RESOURCES_OPTIONS,
} from "../utils/constants";
import { ServicesAllFieldsFragment } from "../types";
import moment from "moment";

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
    <Document>
      <Page size="LEGAL" style={styles.page} debug={false}>
        <View style={{ width: "100%", fontSize: "12px", padding: "6px" }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              textTransform: "uppercase",
              fontSize: "16px",
            }}
          >
            Comunicación de
          </Text>
          <Text style={{ textAlign: "center", textTransform: "uppercase", fontSize: "16px" }}>
            {service.sub_type.code === CODES.FIRE
              ? "Incendios"
              : service.sub_type.code === CODES.ACCIDENT
              ? "Accidentes"
              : service.sub_type.code === CODES.RESCUE
              ? "Rescates"
              : ""}
          </Text>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "8px", fontSize: "14px" }}>
            {"CBV de Capitán Miranda"}
          </Text>
          <Text
            style={{ textAlign: "center", width: "100%", marginTop: "4px" }}
          >{`Número: ___ Compañía: ___ Fecha: ${moment(service.date).format(DEFAULT_DATE_FORMAT)}`}</Text>
          <View
            style={{
              borderBottom: "2px solid black",
              marginTop: "6px",
              paddingTop: "2px",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginLeft: "2px",
              }}
            >
              <Text>{`Hora de:`}</Text>
              <Text>{`Llamada: ${service.call_time}`}</Text>
              <Text>{`Salida: ${service.departure_time}`}</Text>
              <Text>{`Llegada: ${service.arrival_time}`}</Text>
              <Text style={{ marginRight: "2px" }}>{`Retirada: ${service.withdrawal_time}`}</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginLeft: "2px", marginTop: "10px" }}>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Localidad:</Text>
                {` ${service.locality || ""}`}
              </Text>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Dirección:</Text>
                {` ${service.address || ""}`}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginTop: "6px", marginLeft: "2px" }}>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Avisado por:</Text>
                {` ${service.alerted_by || ""}`}
              </Text>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Recibido y Confirmado por:</Text>
                {` ${service.received_by || ""}`}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginTop: "6px", marginLeft: "2px" }}>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Barrio:</Text>
                {` ${service.neighborhood || ""}`}
              </Text>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Lugar:</Text>
                {` ${service.place || ""}`}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", marginTop: "6px", marginLeft: "2px" }}>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Teléfono:</Text>
                {` ${service.phone || ""}`}
              </Text>
              <Text style={{ width: "50%" }}>
                <Text style={{ textDecoration: "underline" }}>Grupo de Guardia:</Text>
                {` ${service.crew || ""}`}
              </Text>
            </View>
            <View style={{ marginTop: "6px", marginLeft: "2px" }}>
              <Text>
                <Text style={{ textDecoration: "underline" }}>Oficial o Voluntario a cargo:</Text>
                {` ${service.officer_in_charge.name || ""}`}
              </Text>
            </View>
          </View>

          {/* 10.40 */}
          {service.sub_type.code === CODES.FIRE && (
            <View style={{ padding: "2px" }}>
              <View>
                <View style={{ flexDirection: "row", textDecoration: "underline", marginBottom: "4px" }}>
                  <Text style={{ width: "50%" }}>1. Tipo</Text>
                  <Text style={{ width: "25%" }}>Superficie del Local</Text>
                  <Text style={{ width: "25%" }}>Superficie Incendiada</Text>
                </View>
                <View style={{ flexDirection: "row", fontSize: "10px" }}>
                  <Text style={{ width: "50%" }}>
                    - {service.sub_type.name}
                    {service.sub_type.name === OTHER_NAME && `: ${service.fire_type_description}`}
                  </Text>
                  <Text style={{ width: "25%" }}>
                    {service.fire_type_total_surface && `- ${service.fire_type_total_surface}`}
                  </Text>
                  <Text style={{ width: "25%" }}>
                    {service.fire_type_burned_surface && `- ${service.fire_type_burned_surface}`}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>2. Propietarios Afectados:</Text>
                <Text style={{ fontSize: "10px" }}>
                  -{" "}
                  {`${
                    AFFECTED_OWNER_OPTIONS.find((owner) => owner.id === service.affected_owner)?.name ||
                    service.affected_owner
                  }: ${service.affected_owner_description || ""}`}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: "12px" }}>
                <View style={{ width: "50%" }}>
                  <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>3. Causas Posibles:</Text>
                  <Text style={{ fontSize: "10px" }}>
                    - {service.possible_cause.name}
                    {service.possible_cause.name === OTHER_NAME && `: ${service.possible_cause_other_description}`}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>
                    4. Agentes Extintores Utilizados:
                  </Text>
                  {service.resources_used.map((resource, index) => (
                    <Text style={{ fontSize: "10px" }} key={"resource_used" + index}>
                      -{" "}
                      {`${
                        RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name || resource.resource
                      }${
                        RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.id === OTHER_ID
                          ? ` - ${resource.resource_other}`
                          : ""
                      }: ${resource.quantity}`}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: "12px" }}>
                <View style={{ width: "50%" }}>
                  <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>5. Fuego Clase:</Text>
                  {service.fire_class.map((fireClass) => (
                    <Text style={{ fontSize: "10px" }} key={fireClass.id}>
                      - {`${fireClass.name}`}
                    </Text>
                  ))}
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>6. Proporción:</Text>
                  <Text style={{ fontSize: "10px" }}>
                    -{" "}
                    {`${
                      PROPORTION_OPTIONS.find((proportion) => proportion.id === service.magnitude)?.name ||
                      service.magnitude
                    }`}
                  </Text>
                </View>
                <View style={{ width: "25%" }}>
                  <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>7. Destrucción:</Text>
                  <Text style={{ fontSize: "10px" }}>
                    - {`${DAMAGE_OPTIONS.find((damage) => damage.id === service.damage)?.name || service.damage}`}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>8. Vehículos Utilizados:</Text>
                <Text style={{ fontSize: "10px" }}> {service.vehicles_used}</Text>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>9. Otras Unidades de Apoyo:</Text>
                <Text style={{ fontSize: "10px" }}> {service.other_units}</Text>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>10. Otras Ocurrencias:</Text>
                <Text style={{ fontSize: "10px" }}> {service.other_occurrences}</Text>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>11. Fuerza Policial a cargo:</Text>
                <Text style={{ fontSize: "10px" }}> {service.police_force_in_charge}</Text>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>
                  12. Juzgado de Crimen oficiado por:
                </Text>
                <Text style={{ fontSize: "10px" }}> {service.judge_in_charge}</Text>
              </View>
              <View style={{ marginTop: "12px" }}>
                <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>13. Otros datos de interés:</Text>
                <Text style={{ fontSize: "10px" }}> {service.description}</Text>
              </View>
            </View>
          )}

          {/* 10.41 */}
          {service.sub_type.code === CODES.ACCIDENT && (
            <View style={{ padding: "2px" }}>
              <View>
                <View style={{ flexDirection: "row", textDecoration: "underline", marginBottom: "4px" }}>
                  <Text style={{ width: "34%" }}>1. Tipo</Text>
                  <Text style={{ width: "33%" }}>2. Magnitudes</Text>
                  <Text style={{ width: "33%" }}>3. Cantidad de 10.44</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ width: "34%", fontSize: "10px" }}>- {service.sub_type.name}</Text>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.damage1041.map((damage) => (
                      <Text style={{ fontSize: "10px" }} key={damage}>
                        - {DAMAGE_1041_OPTIONS.find((item) => item.id === damage)?.name || damage}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.quantities1044.map((the1044) => (
                      <Text style={{ fontSize: "10px" }} key={the1044.name}>
                        - {QUANTITIES_1044_1045_OPTIONS.find((item) => item.id === the1044.name)?.name || the1044.name}:{" "}
                        {the1044.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <View style={{ marginTop: "12px" }}>
                <View style={{ flexDirection: "row", textDecoration: "underline", marginBottom: "4px" }}>
                  <Text style={{ width: "34%" }}>4. Involucrados</Text>
                  <Text style={{ width: "33%" }}>5. Magnitudes</Text>
                  <Text style={{ width: "33%" }}>6. Recursos Usados</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column", width: "34%" }}>
                    {service.involved_elements.map((element) => (
                      <Text style={{ fontSize: "10px" }} key={element}>
                        - {INVOLVED_ELEMENTS_OPTIONS.find((item) => item.id === element)?.name || element}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.magnitude1041.map((magnitude) => (
                      <Text style={{ fontSize: "10px" }} key={magnitude}>
                        - {MAGNITUDE_1041_OPTIONS.find((item) => item.id === magnitude)?.name || magnitude}
                      </Text>
                    ))}
                  </View>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.resources_used.map((resource, index) => (
                      <Text
                        style={{ fontSize: "10px" }}
                        key={
                          RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name ||
                          resource.resource ||
                          "resource" + index
                        }
                      >
                        -{" "}
                        {`${
                          RESOURCES_OPTIONS.find((option) => option.id === resource.resource)?.name || resource.resource
                        }: ${resource.quantity}`}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={{ textDecoration: "underline", marginTop: "12px", marginBottom: "4px" }}>
                7. Mencione el mayor problema presente y el motivo en los servicios según la hoja 10.41
              </Text>
              <Text style={{ fontSize: "10px" }}> {service.description}</Text>
            </View>
          )}

          {service.sub_type.code === CODES.RESCUE && (
            <View style={{ padding: "2px" }}>
              <View>
                <View style={{ flexDirection: "row", textDecoration: "underline", marginBottom: "4px" }}>
                  <Text style={{ width: "34%" }}>1. Tipo</Text>
                  <Text style={{ width: "33%" }}>2. Tipo de Rescate</Text>
                  <Text style={{ width: "33%" }}>3. Cantidad de 10.44/10.45</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ width: "34%", fontSize: "10px" }}>- {service.sub_type.name}</Text>
                  <Text style={{ width: "33%", fontSize: "10px" }}>
                    - {RESCUE_TYPE_OPTIONS.find((item) => item.id === service.rescue_type)?.name || service.rescue_type}
                  </Text>
                  <View style={{ flexDirection: "column", width: "33%" }}>
                    {service.quantities1044.map((the1044) => (
                      <Text style={{ fontSize: "10px" }} key={the1044.name}>
                        - {QUANTITIES_1044_1045_OPTIONS.find((item) => item.id === the1044.name)?.name || the1044.name}:{" "}
                        {the1044.quantity}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={{ fontSize: "14px", textDecoration: "underline", marginTop: "12px", marginBottom: "4px" }}>
                4. Otros datos de interés
              </Text>
              <Text> {service.description}</Text>
            </View>
          )}

          <View style={{ padding: "2px", marginTop: "12px" }}>
            <Text style={{ textDecoration: "underline", marginBottom: "4px" }}>Nómina de Voluntarios:</Text>
            <View style={{ flexDirection: "row" }}>
              {service.volunteers.map((volunteer) => (
                <Text style={{ width: "33.333%", fontSize: "10px" }} key={volunteer.name}>
                  - {volunteer.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SingleServiceReport;
