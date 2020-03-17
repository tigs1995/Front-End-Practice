import React, { Component } from "react";
import DataInput from "../DataInput";
import axios from "axios";
import { CHECK_EXISTING_VEHICLE, BASE_URL } from "../../config/Constants.json";
import styled from 'styled-components';
import "../../CSS/VehicleSearch.css";

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
}`;

export default class VehicleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleRegistrationNo: "",
      errorMessage: null
    };
  }

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
    return (
      <div>
        <form id="form" onSubmit={this.handleSubmit}>
        <h4 id="space">Vehicle Search</h4>
          <input
            type="text"
            name="vehicleRegistrationNo"
            placeholder="Vehicle Registration Number"
            onChange={this.handleChange}
          ></input>
          <button id="but">Search</button>
          <span className="error">{this.state.errorMessage}</span>
        </form>
      </div>
    );
  }
}
