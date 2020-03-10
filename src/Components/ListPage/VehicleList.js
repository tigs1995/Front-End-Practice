import React, { Component } from "react";
import {
  BASE_URL,
  VEHICLE_LIST,
  GET_VEHICLE_INFO
} from "../../config/Constants.json";
import axios from "axios";
import { Card } from "react-bootstrap";

export default class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [],
      citizenID: ""
    };
  }

  componentDidMount(props) {
    axios
      .post(`${BASE_URL}${VEHICLE_LIST}`, {
        vehicleRegistrationNo: this.props.match.params.reg
      })
      .then(res => {
        console.log(res);
        this.setState({ vehicleList: res.data });
      })
      .catch(err => console.warn(err));
  }

  handleClick = e => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}${GET_VEHICLE_INFO}`, {
        vehicleRegistrationNo: e.target.value
      })
      .then(res => {
        this.props.history.push(`/CitizenVehicles/${res.data.citizenID}`);
      })
      .catch(err => console.warn(err));
    console.log(this.state.citizenID);
  };

  compare(a, b) {
    const vehicleA = a.vehicleRegistrationNo;
    const vehicleB = b.vehicleRegistrationNo;

    let comparison = 0;
    if (vehicleA > vehicleB) {
      comparison = 1;
    } else if (vehicleA < vehicleB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {

    return (
      <div id="cardList">
        <h4>Please choose a vehicle to view more information:</h4>
        {this.state.vehicleList.sort(this.compare).map(vehicle => (
          <Card border="primary" className="vehicleCard">
            <Card.Body>
              <Card.Title>Vehicle Registration Number:</Card.Title>
              <Card.Text>{vehicle.vehicleRegistrationNo}</Card.Text>
              <button
                className="cardButton"
                value={vehicle.vehicleRegistrationNo}
                onClick={this.handleClick}
              >
                Submit
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}
