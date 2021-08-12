import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.sass'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import * as Constants from "./utils/constants";

const httpLink = createHttpLink(
    {
        uri: Constants.API_URL
    }
);

const cache = new InMemoryCache();

const client = new ApolloClient(
    {
        link: httpLink,
        cache
    }
);

client.writeData(
    {
        data: {
            someData: 'x'
        }
    });

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
