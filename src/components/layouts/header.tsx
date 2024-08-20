import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { Container, Dropdown, Navbar, Nav, Button } from "react-bootstrap";
import routes from "routes.js";
import EventForm from "components/Events/EventForm";
import { useQuery } from "@apollo/client";
import { GetCurrentUserQuery } from "../../types";
import { CURRENT_USER } from "../../queries/Login";
import { AUTH_TOKEN_NAME } from "../../utils/constants";

const Header = () => {
  const location = useLocation();
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);
  const history = useHistory();

  const getBrandText = () => {
    // TODO: fix nested routes title (if needed)
    const matchingRoutes = routes.filter((route) => {
      const isHomePage = route.path === "/" && location.pathname === "/";

      return location.pathname.indexOf(route.path) > -1 || isHomePage;
    });

    const route = matchingRoutes[matchingRoutes.length - 1];
    return route && route.name;
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center ml-2 ml-lg-0" style={{ minWidth: "100px" }}>
          <Navbar.Brand href="/" className="mr-2">
            {getBrandText()}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* left side */}
          <Nav className="nav mr-auto" style={{ paddingLeft: "10%" }} navbar>
            <Nav.Item>
              <EventForm />
            </Nav.Item>
          </Nav>

          {/* right side */}
          <Nav className="ml-auto" navbar>
            {/* <Nav.Item>
              <Nav.Link className="m-0" href="#url" onClick={(e) => e.preventDefault()}>
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item> */}
            <span style={{ marginTop: "auto", marginBottom: "auto" }}>
              Usuario: {currentUserQuery.data?.currentUser?.username}
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
