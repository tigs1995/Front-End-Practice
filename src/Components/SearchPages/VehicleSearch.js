import React, { Component } from "react";
import DataInput from "../DataInput";
import axios from "axios";
import { CHECK_EXISTING_VEHICLE, BASE_URL } from "../Constants";

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
    );
  }
}
