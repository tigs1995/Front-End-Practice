import React, { Component } from "react";
import "../CSS/NavBar.css";

export default class NavigationBar extends Component {


  render(props) {
    return (
      <div className="topnav">
         <a className="active" href="/">National Investigation Unit</a>
         {/* <a className="activeSmall">Signed in as: {this.props.signedIn}</a> */}
         {/* <a className="bold" href="#about">Sign Out</a>  */}
         <a href="/VehicleSearch">Vehicle Search</a>
         <a href="/LocationSearch">Location Search</a>
         <a  href="/CitizenSearch">Citizen Search</a> 
         <p id="middle" >{this.props.currentPage}</p>
      </div>
    );
  }
}
