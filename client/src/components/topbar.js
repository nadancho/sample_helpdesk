import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { NavDropdown } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


// Here, we display our Navbar
export default function Topbar({ isAdmin, logout }) {

  return (
    <Navbar expand="sm" className="navbarc">
      <Container>
        <NavLink className="navbar-brand" to="/">
          HelpDesk
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to="/create">
              Create
            </NavLink>
            <NavLink className="nav-link" to="/lookup">
              Lookup
            </NavLink>
            {!isAdmin && <NavLink className="nav-link" to="/login">
              Login
            </NavLink>}
            {isAdmin && <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavLink className="nav-link" to="/ticketList">
                  Respond to Tickets
                </NavLink>

                <NavLink className="nav-link" onClick={logout} to="/">
                  Logout
                </NavLink>
            </NavDropdown>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
