import React, { Component } from "react";
import "../CSS/NavBar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";

class NavigationBar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  loggedIn = (auth) => {
    const { user } = this.props.auth;
    return auth.isAuthenticated ?
      <div>
        <a id='signOut' onClick={this.onLogoutClick}>Sign Out</a>
        <a href="/VehicleSearch">Vehicle Search</a>
        <a href="/LocationSearch">Location Search</a>
        <a href="/CitizenSearch">Citizen Search</a>
        {/* <p id="middle" >{this.props.currentPage}</p> */}
        <p id='signedInAs'>Signed in as: {user.username.split(" ")[0]}</p>
      </div>
      :
      <div></div>
  };


  render(props) {
    return (
      <div className="topnav">
        <a id='headerConstant' className="active" href="/">National Investigation Unit</a>
        {this.loggedIn(this.props.auth)}
      </div>
    );
  }
}

NavigationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavigationBar);
