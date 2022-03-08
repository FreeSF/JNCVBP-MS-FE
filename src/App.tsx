import React, { useEffect, useState } from "react";
//import './App.css';
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import "./stylesheets/App.sass";
import Header from "components/layouts/header";
import Footer from "components/layouts/footer";
import Sidebar from "components/layouts/sidebar";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

import routes from "routes.js";
import { setDefaultLocale, registerLocale } from "react-datepicker";

registerLocale("es", es);
setDefaultLocale("es");

const getRoutes = (routes) => {
  return routes.map((prop, key) => (
    <Route exact path={prop.path} render={(props) => <prop.component {...props} />} key={key} />
  ));
};

const App = () => {
  return (
    <div className="wrapper">
      <Sidebar color={"black"} image={""} routes={routes} />
      <div className="main-panel">
        <Header />
        <div className="content">
          <Switch> {getRoutes(routes)} </Switch>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
