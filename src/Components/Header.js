import { Navbar } from "react-bootstrap";
import React, { Component } from "react";
import NavigationBar from "./NavigationBar";

export default class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Group Project</Navbar.Brand>
        <NavigationBar></NavigationBar>
      </Navbar>
    );
  }
}
