import React from "react";
import '../stylesheets/header.sass'
import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";

const TheNavBar = () => {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">JNCVBP-MS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href="/volunteers">Volunteers</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default TheNavBar;
