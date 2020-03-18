import React, { Component } from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import LoadingSpinner from '../LoadingSpinner';
import "../../CSS/Tables.css";

import {
  GET_CITIZEN,
  GET_ANPR_INFO,
  BASE_URL
} from "../../config/Constants.json";
import axios from "axios";
import BackButton from '../BackButton';

export default class VehicleCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: "",
      vehicleList: [],
      ANPRList: [],
      vehicleError: "",
      ANPRError: "",
      loadingVehicle: true,
      loadingANPR: true,
      citizenButton: 'display: none;'
    };
  }

  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });

    let citizenButton = document.getElementById("citizenButton");
    if(this.props.match.params.page === 'citizen'){
      citizenButton.style.display = "none";
    } 

    axios
      .post(`${BASE_URL}${GET_CITIZEN}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        console.log(response.data.vehicleRegistrations)
        if (response.data.vehicleRegistrations.length === 0) {
          this.setState({ loadingVehicle: false, loadingANPR: false, vehicleError: "Citizen does not own any vehicles.", ANPRError: "Citizen does not own any vehicles." });
        } else {
          this.setState({ loadingVehicle: false, vehicleList: response.data.vehicleRegistrations });
          for (let i = 0; i < this.state.vehicleList.length; i++) {
            let vehicleReg = this.state.vehicleList[i].vehicleRegistrationNo;
            axios
              .post(`${BASE_URL}${GET_ANPR_INFO}`, {
                vehicleRegistrationNo: vehicleReg
              })
              .then(response => {
                if (response.data.Error) {
                  console.log(response.data.Error);
                }
                else if (response.data.Warning) {
                  this.setState({ loadingANPR: false, ANPRError: "No data found." });
                }
                else {
                  this.setState({ loadingANPR: false, ANPRList: response.data });
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

  handleClick = e => {
    this.props.history.push('../../CitizenHome/' + this.state.citizenID)
  }

  backClick = e => {
    this.props.history.goBack();
  }

  render() {
    let id = this.state.citizenID;
    return (
      <div id="table2">
        <Styles>
          <h2>Vehicles</h2>
          <p>Vehicles of citizen {this.state.citizenID}</p>
          {this.state.loadingVehicle ? <LoadingSpinner /> :
            <div>
              <span id="error">{this.state.vehicleError}</span>
              <SortingTable data={this.state.vehicleList} />
            </div>}
        </Styles>
        <Styles>
          <h2>ANPR Information</h2>
          {this.state.loadingANPR ? <LoadingSpinner /> :
            <div>
              <span id="error">{this.state.ANPRError}</span>
              <SortingTable data={this.state.ANPRList} />
            </div>}
        </Styles>
        <button id='citizenButton' class="button" onClick={this.handleClick}>Go to citizen page</button>
        <BackButton backClick={this.backClick} />
      </div>
    );
  }
}

