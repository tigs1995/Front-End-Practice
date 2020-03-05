import React, { Component } from "react";
import DataTable from "../Table/DataTable";
import { BASE_URL, VEHICLE_LIST } from "../Constants";
import axios from "axios";
import { Card, ListItem } from "react-bootstrap";

export default class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [
        { vehicleRegistrationNo: "A" },
        { vehicleRegistrationNo: "B" }
      ]
    };
  }

  componentDidMount(props) {
    const vehicleRegistrationNo = this.props.match.params.reg;
    axios
      .get(`${BASE_URL}${VEHICLE_LIST}`, { vehicleRegistrationNo })
      .then(res => {
        console.log(res);
        this.setState({ vehicleList: res.data });
      })
      .catch(err => console.warn(err));
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

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
          <Card border="primary" class="vehicleCard">
            <Card.Body>
              <Card.Title>Vehicle Registration Number:</Card.Title>
              <Card.Text>{vehicle.vehicleRegistrationNo}</Card.Text>
              <button
                class="cardButton"
                value={vehicle.vehicleRegistrationNo}
                handleClick={this.handleClick}
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
