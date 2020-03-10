import React, { Component } from "react";
import DataInput from "../DataInput";
import axios from "axios";
import { CHECK_EXISTING_VEHICLE, BASE_URL } from "../../config/Constants.json";
import styled from 'styled-components';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";

const Styles = styled.div`
  div {
    
    text-align: center;
    margin: 15%;

    input {
    
        padding: 0.5em;
        margin: 0.5em;
        color: ${props => props.inputColor || "palevioletred"};
        background: papayawhip;
        border-radius: 3px;
      }

}
   
`;
  

class VehicleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleRegistrationNo: "",
      errorMessage: null
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};


  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}${CHECK_EXISTING_VEHICLE}`, {
        vehicleRegistrationNo: this.state.vehicleRegistrationNo
      })
      .then(response => {
        console.log(response);
        if (response.data.Error) {
          this.setState({ errorMessage: response.dataError });
        } else if (response.data === false) {
          this.setState({ errorMessage: "Vehicle not found." });
        } else {
          this.props.history.push(
            `VehicleList/${this.state.vehicleRegistrationNo}`
          );
        }
      });
  };

  render() {
    const { user } = this.props.auth;
    return (
      <Styles>
        <div>
      <form onSubmit={this.handleSubmit}>
        <DataInput
          type="text"
          name="vehicleRegistrationNo"
          placeholder="Vehicle Registration Number"
          onChange={this.handleChange}
        ></DataInput>
        <button>Search</button>
        <span className="error">{this.state.errorMessage}</span>
      </form>
      </div>
      </Styles>
    );
  }
}


VehicleSearch.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(VehicleSearch);
