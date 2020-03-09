import React, { Component } from "react";
import { BASE_URL, VEHICLE_LIST } from "../../config/Constants.json";
import axios from "axios";
import { Card } from "react-bootstrap";

export default class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: []
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
    this.props.history.push(`/CitizenVehicles/${e.target.value}`);
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
    const headings = ["Vehicle Registration"];
    const rows = this.state.vehicleList.map(vehicle => [
      vehicle.vehicleRegistrationNo
    ]);

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
