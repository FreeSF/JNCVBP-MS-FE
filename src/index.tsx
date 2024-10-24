import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.sass";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import * as Constants from "./utils/constants";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_NAME } from "./utils/constants";

/**
 * The main entry point of the application.
 *
 * This file is responsible for rendering the App component into the DOM.
 * It also sets up the Apollo Client and adds the authentication token to each
 * request to the GraphQL server.
 */

/**
 * Creates an HTTP link for Apollo Client to connect to the GraphQL API.
 * The link uses the URI specified in the constants file.
 * It is responsible for handling HTTP requests to the GraphQL server.
 */
const httpLink = createHttpLink({
  uri: Constants.API_URL,
});

/**
 * Creates a link that will add the authentication token
 * to the header of each request.
 * The token is retrieved from local storage.
 * If the token does not exist, the link will not add
 * the authorization header to the request.
 */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/**
 * The cache is used to store the data that is retrieved from the GraphQL server.
 * It is used to avoid making multiple requests to the server for the same data.
 * The cache is stored in memory and is cleared when the user closes the browser.
 * The cache is also cleared when the user logs out.
 */
const cache = new InMemoryCache();

/**
 * The client is used to make requests to the GraphQL server.
 * It is used to cache data to avoid making multiple requests to the server.
 * The client is also used to handle authentication for the user.
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

/**
 * Renders the React application into the DOM.
 * React.StrictMode is a wrapper component that helps identify potential problems in an application.
 * ApolloProvider is used to inject the Apollo Client into the React component tree.
 * BrowserRouter is used for routing in the application.
 * The rendered application is mounted on the DOM element with the id "root".
 */
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
