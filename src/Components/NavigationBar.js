import { Nav, NavDropdown, Navbar, Form, FormControl, Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";

export default class NavigationBar extends Component {
constructor(props){
  super(props);
}

  render(props) {
    return (
      <div class="topnav">
         <a class="active" href="/">National Investigation Unit</a>
         <a class="activeSmall">Signed in as: {this.props.signedIn}</a>

       

         <a class="bold" href="#about">Sign Out</a>
         <a href="/VehicleSearch">Vehicle Search</a>
         <a href="/LocationSearch">Location Search</a>
         <a  href="/CitizenSearch">Citizen Search</a> 
         <p id="middle" >{this.props.currentPage}</p>
      </div>
    );
  }
}
