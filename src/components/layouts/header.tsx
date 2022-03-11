import React from "react";
import { useLocation } from "react-router-dom";

import { Container, Dropdown, Navbar, Nav } from "react-bootstrap";
import routes from "routes.js";

const Header = () => {
  const location = useLocation();

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
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand href="/" className="mr-2">
            {" "}
            {getBrandText()}{" "}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          {/* left side */}
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link data-toggle="dropdown" href="/volunteers" className="m-0">
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-block ml-1">Voluntarios</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="m-0" href="#url" onClick={(e) => e.preventDefault()}>
                <i className="nc-icon nc-palette"></i>
                <span className="d-lg-block ml-1">Opción 2</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* right side */}
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link className="m-0" href="#url" onClick={(e) => e.preventDefault()}>
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <span className="no-icon">Dropdown</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item href="#url" onClick={(e) => e.preventDefault()}>
                  Action
                </Dropdown.Item>

                <Dropdown.Item href="#url" onClick={(e) => e.preventDefault()}>
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item href="#url" onClick={(e) => e.preventDefault()}>
                  {" "}
                  Separated link{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link className="m-0" href="#url" onClick={(e) => e.preventDefault()}>
                <span className="no-icon">Log out</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
