import React, { useEffect, useState } from "react";
// import logo_web from "../../assets/logo_web.png";
// import ai_logo from "../../assets/ai_footer.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [first, setfirst] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const [navbarBg, setNavbarBg] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleResize = () => {
    if (window.innerWidth < 1100) {
      setfirst(false);
      console.log("Check");
    } else {
      setfirst(true);
    }
  };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  });
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-black shadow-lg p-0 shadow-white border-bottom fixed w-100"
        id="navbar"
      >
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/">
              <img className="img-fluid w-auto res_left" src={logo} alt="" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-end hxn_res flex-grow-1 pe-4 ps-4">
              <Link to="/">
                {" "}
                <Nav.Link href="/" className="header_ka">
                  Home
                </Nav.Link>
              </Link>
              <Link to="/AboutUS">
                {" "}
                <Nav.Link href="/AboutUS" className="header_ka">
                  About
                </Nav.Link>
              </Link>
              <Link to="/">
                {" "}
                <Nav.Link href="#referral" className="header_ka">
                  Referral
                </Nav.Link>
              </Link>
              <Nav.Link href="#buy_now" className="header_ka">
                Buy Now
              </Nav.Link>
              <Link to="/Roadmap">
                <Nav.Link href="#Roadmap" className="header_ka">
                  Roadmap
                </Nav.Link>
              </Link>
              <Link to="/Tokenomics">
                <Nav.Link href="#Tokenomics" className="header_ka">
                  Tokenomics
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
