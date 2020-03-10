import React, { Component } from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";

import {
  GET_CITIZEN,
  GET_ANPR_INFO,
  BASE_URL
} from "../../config/Constants.json";
import axios from "axios";

class VehicleCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: "",
      vehicleList: [],
      ANPRList: [],
      vehicleError: "",
      ANPRError: ""
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};

  componentWillMount() {
    this.setState({ citizenID: this.props.match.params.id });

    axios
      .post(`${BASE_URL}${GET_CITIZEN}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        if (response.data.Warning) {
          this.setState({ vehicleError: response.data.Warning });
        } else {
          this.setState({ vehicleList: response.data.vehicleRegistrations });
          for (let i = 0; i < this.state.vehicleList.length; i++) {
            let vehicleReg = this.state.vehicleList[i].vehicleRegistrationNo;
            axios
              .post(`${BASE_URL}${GET_ANPR_INFO}`, {
                vehicleRegistrationNo: vehicleReg
              })
              .then(response => {
                if (response.data.Error) {
                  console.log(response.data.Error);
                } else if (response.data.Warning) {
                  this.setState({ ANPRError: response.data.Warning });
                } else {
                  this.setState({ ANPRList: response.data });
                }
              })
              .catch(error => {
                console.log("Error: " + error);
              });
          }
        }
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <p id='loggedInAs'>You are logged in as {user.username.split(" ")[0]}</p><button id='logout'
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}>Logout</button>
        <Styles>
          <h2>Vehicles</h2>
          <span id="error">{this.state.vehicleError}</span>
          <SortingTable data={this.state.vehicleList} />
        </Styles>
        <Styles>
          <h2>ANPR Information</h2>
          <span id="error">{this.state.ANPRError}</span>
          <SortingTable data={this.state.ANPRList} />
        </Styles>
      </div>
    );
  }
}

VehicleCitizen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(VehicleCitizen);
