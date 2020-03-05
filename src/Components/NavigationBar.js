import { Nav, NavDropdown } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
  render() {
    return (
      <Nav id="navigationBar">
        <NavDropdown title="Menu" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />

          <NavDropdown.Item eventKey="4.2">
            <Nav.Link>
              <Link to="/CitizenSearch">Citizen search</Link>
            </Nav.Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />

          <NavDropdown.Item eventKey="4.3">
            <Nav.Link>
              <Link to="/VehicleSearch">Vehicle search</Link>
            </Nav.Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />

          <NavDropdown.Item eventKey="4.3">
            <Nav.Link>
              <Link to="/LocationSearch">Location search</Link>
            </Nav.Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />

          <NavDropdown.Item eventKey="4.4">
            <Nav.Link>
              <Link to="/SignOut">Sign out</Link>
            </Nav.Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  }
}
