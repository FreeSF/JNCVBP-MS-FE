import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <ul className="footer-menu">
            <li>
              <a href="/#" onClick={(e) => e.preventDefault()}>
                Home{" "}
              </a>
            </li>
            <li>
              <a href="/#" onClick={(e) => e.preventDefault()}>
                {" "}
                Company{" "}
              </a>
            </li>
            <li>
              <a href="/#" onClick={(e) => e.preventDefault()}>
                {" "}
                Portfolio{" "}
              </a>
            </li>
            <li>
              <a href="/#" onClick={(e) => e.preventDefault()}>
                {" "}
                Blog{" "}
              </a>
            </li>
          </ul>
          <p className="copyright text-center">
            © {new Date().getFullYear()} <a href="/">Free Software</a>, made with love
          </p>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
