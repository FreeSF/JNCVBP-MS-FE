import React from "react";
import ReactDOM from "react-dom";
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Query, Mutation, Subscription } from "@apollo/client/react/components";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { graphql } from "@apollo/client/react/hoc";
import { FIND_SERVICE, GET_SERVICES } from "../queries/services";
import { API_URL } from "../utils/constants";
import { FindServiceQuery, ServicesAllFieldsFragment } from "../types";
import { useQuery } from "react-apollo";
import Spinner from "../components/spinner";

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
      <Page size="A4" style={styles.page} debug={true}>
        <View>
          <Text>{service.type}</Text>
        </View>
      </Page>
    </Document>
    //</PDFViewer>
  );
};

export default SingleServiceReport;
