import React, { Component } from "react";
import { useLocation, NavLink, useHistory } from "react-router-dom";

import { Nav } from "react-bootstrap";
import { useQuery } from "react-apollo";
import { GetCurrentUserQuery } from "../../types";
import { CURRENT_USER } from "../../queries/Login";
import Spinner from "../spinner";
import { AUTH_TOKEN_NAME } from "../../utils/constants";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const history = useHistory();
  const activeRoute = (routeName) => {
    if (routeName == "/") {
      return location.pathname == "/" ? "active" : "";
    }
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);

  if (currentUserQuery.loading) return <Spinner />;

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: `url(${require("../../assets/img/sidebar-3.jpg")})`,
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("../../assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="/">
            JNCVBP-MS
          </a>
        </div>
        <Nav>
          {routes.map((route, key) => {
            if (route.onlyAdmin && !currentUserQuery.data?.currentUser?.isAdmin) return undefined;
            if (!route.redirect && route.showOnSidebar)
              return (
                <li className={activeRoute(route.path)} key={key}>
                  <NavLink to={route.path} className="nav-link" activeClassName="active">
                    <i className={route.icon} />
                    <p>{route.name}</p>
                  </NavLink>
                </li>
              );
            return undefined;
          })}
          <li>
            <NavLink
              to={"#"}
              onClick={(event) => {
                event.preventDefault();
                localStorage.setItem(AUTH_TOKEN_NAME, undefined);
                history.push("/login");
                currentUserQuery.refetch();
              }}
              className="nav-link"
              activeClassName="active"
            >
              Salir
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
