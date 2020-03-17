import React, { Component } from "react";
import {
  BASE_URL,
  VEHICLE_LIST,
  GET_VEHICLE_INFO
} from "../../config/Constants.json";
import axios from "axios";
import { Card } from "react-bootstrap";
import "../../CSS/VehicleList.css";

export default class VehicleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicleList: [],
      vehicleList1: [],
      vehicleList2: [],
      citizenID: ""
    };
  }

  chunk(arr, chunkSize) {
    var R = [];
    for (var i = 0; i < arr.length; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    console.log(R);
    return R;
  }

  componentDidMount(props) {
    axios
      .post(`${BASE_URL}${VEHICLE_LIST}`, {
        vehicleRegistrationNo: this.props.match.params.reg
      })
      .then(response => {
        let arr = [];
        let a = this.chunk(response.data, Math.abs(response.data.length / 3))[0]
        let b = this.chunk(response.data, Math.abs(response.data.length / 3))[1]
        let c = this.chunk(response.data, Math.abs(response.data.length / 3))[2]
        if (!b.length && !c.length) {
          c = a;
          a = b;
        } else if (!a.length && !b.length) {
          b = c;
          c = a;
        } else if (!a.length) {
          a = b;
          b = [];
        }
        this.setState({ vehicleList: a });
        this.setState({ vehicleList1: b });
        this.setState({ vehicleList2: c });
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
      <div class="container">
        <h4 id="header">You searched for: {this.state.forenames} {this.state.surname}</h4>
        <p>Please choose a citizen for more information:</p>
        <div id='cardList'>
          <div class="side">
            {this.state.vehicleList.sort(this.compare).map(vehicle => (
              <Card className="vehicleCard">
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
          <div>
            {this.state.vehicleList1.sort(this.compare).map(vehicle => (
              <Card className="vehicleCard">
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
          <div class="side">
            {this.state.vehicleList2.sort(this.compare).map(vehicle => (
              <Card className="vehicleCard">
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
        </div>
      </div>
    );
  }
}
