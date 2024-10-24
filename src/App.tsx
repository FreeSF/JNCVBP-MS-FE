import React from "react";
import { Route, Switch } from "react-router-dom";
import "./stylesheets/App.sass";
import Header from "components/layouts/header";
import Footer from "components/layouts/footer";
import Sidebar from "components/layouts/sidebar";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "react-notifications/lib/notifications.css";
import routes from "routes.js";
import { setDefaultLocale, registerLocale } from "react-datepicker";
import { NotificationContainer } from "react-notifications";
import { useQuery } from "@apollo/client";
import { GetCurrentUserQuery, UserAllFieldsFragment } from "./types";
import { CURRENT_USER } from "./queries/Login";
import Spinner from "./components/spinner";

registerLocale("es", es);
setDefaultLocale("es");

/**
 * Generates an array of React Router <Route> components based on the given routes configuration.
 */
const getRoutes = (routes, currentUser: UserAllFieldsFragment) => {
  return routes.map((route, key) => (
    <Route
      exact
      path={route.path}
      render={(props) => {
        if (!route.noAuthRoute && !currentUser) window.location.href = "/login";
        if (route.onlyAdmin && !currentUser?.isAdmin) return <div />;
        if (route.hideTheSidebar) return <route.component {...props} />;
        else {
          return (
            <React.Fragment>
              <NotificationContainer />
              <Sidebar color={"black"} image={""} routes={routes} />
              <div className="main-panel">
                <Header />
                <div className="content">
                  <route.component {...props} />
                </div>
                <Footer />
              </div>
            </React.Fragment>
          );
        }
      }}
      key={key}
    />
  ));
};

/**
 * The `App` component is the root component of the application.
 */
const App = () => {
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);

  if (currentUserQuery.loading) return <Spinner />;

  return (
    <div className="wrapper">
      <Switch> {getRoutes(routes, currentUserQuery.data?.currentUser)} </Switch>
    </div>
  );
};

export default App;
