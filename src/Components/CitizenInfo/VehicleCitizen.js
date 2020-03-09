import React, { Component } from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import {
  GET_CITIZEN,
  GET_ANPR_INFO,
  GET_VEHICLE_OWNER,
  GET_VEHICLE_INFO,
  BASE_URL
} from "../Constants";
import axios from "axios";

export default class VehicleCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      citizenID: "",
      vehicleList: [],
      ANPRList: []
    };

  }

  componentWillMount() {
    let ANPRDetails = [];
    this.setState({ citizenID: this.props.match.params.id });

    axios
      .post(`${BASE_URL}${GET_CITIZEN}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
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
              } else {
                this.setState({ ANPRList: response.data });
              }
            })
            .catch(error => {
              console.log("Error: " + error);
            });
        }
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  }

  render() {
    return (
      <div>
        <Styles>
          <h2>Vehicles</h2>
          <SortingTable data={this.state.vehicleList} />
        </Styles>
        <Styles>
          <h2>ANPR Information</h2>
          <SortingTable data={this.state.ANPRList} />
        </Styles>
      </div>
    );
  }
}
