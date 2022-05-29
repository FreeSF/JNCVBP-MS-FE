/* eslint-disable react/jsx-key */
import { Page, StyleSheet, Document, View, Text } from "@react-pdf/renderer";
import React from "react";
import { ServicesAllFieldsFragment } from "../types";
import { DAMAGE_OPTIONS, QUANTITIES_1044_1045_OPTIONS } from "../utils/constants";

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

interface TheProps {}

// Create Document Component
const GeneralReport: React.FC<TheProps> = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} debug={false}>
        <View style={{ border: "1px solid blue", width: "100%", fontSize: "12px" }}>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "10px" }}>Informe de Servicios</Text>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "10px" }}>CBV de Capitán Miranda</Text>
          <View style={{ flexDirection: "row", border: "1px solid red" }}>
            <Text style={{ width: "25%" }}>Fecha: - al -</Text>
          </View>
          <Text>Datos de Envío</Text>
          <View style={{ flexDirection: "row", border: "1px solid blue" }}>
            <Text style={{ width: "50%" }}>CBV de Capitán Miranda</Text>
            <Text style={{ width: "50%" }}>Cantidad Cia. / Estaciones: ________________</Text>
          </View>
          <View style={{ flexDirection: "row", border: "1px solid blue" }}>
            <Text style={{ width: "50%" }}>Elaborado por: ________________</Text>
            <Text style={{ width: "50%" }}>Teléfono: ________________</Text>
          </View>
          <Text>Enviado desde: ________________</Text>
          <Text>Fax habilitado (para posible reenvío): ________________</Text>
          <Text>Fecha de cierre del informe: ________________</Text>
          <Text>Cantidad total de Servicio: () ________________</Text>

          <View style={{ border: "1px solid blue" }}>
            <Text style={{ backgroundColor: "black", color: "white", width: "60px" }}>10.40</Text>
            <Text style={{ textTransform: "uppercase" }}>Cantidad Global de 10.40: () ________________</Text>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Servicio 10.40</Text>
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Magnitudes</Text>
                {DAMAGE_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>{damage.name}</Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>{damage.name}</Text>
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
