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
          //backgroundImage: `url(${require("../../assets/img/sidebar-3.jpg")})`,
          backgroundImage: `url(https://scontent.fasu9-1.fna.fbcdn.net/v/t39.30808-6/228270871_213568027372367_6705029781981773471_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a26aad&_nc_ohc=FmixYnWyQDgAX_x-o96&_nc_ht=scontent.fasu9-1.fna&oh=00_AT-znWVa0wazBz_kt7ydkWHoTDjn1NZXcMRQWR6aOsCORQ&oe=62F09A8B)`,
        }}
      />
      <div className="sidebar-wrapper" style={{ paddingBottom: 0 }}>
        <div className="logo d-flex align-items-center justify-content-start">
          <a href="/" className="simple-text logo-mini mx-1">
            <div className="logo-img">
              <img src={require("../../assets/img/logo.png")} alt="..." />
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
              <i className="fa fa-arrow-right-from-bracket" />
              <p>Salir</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
