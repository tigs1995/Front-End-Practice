import React, { Component } from 'react'
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import { GET_CITIZEN, GET_ANPR_INFO, GET_VEHICLE_OWNER, GET_VEHICLE_INFO, BASE_URL } from '../Constants';
import axios from 'axios';

export default class VehicleCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: '',
      vehicleList: [],
      ANPRList: []
    }
  }

  componentDidMount() {
    let ANPRDetails = [];
    this.setState({ citizenID: this.props.match.params.id })

    axios.post(`${BASE_URL}${GET_CITIZEN}`, { citizenID: this.props.match.params.id })
      .then(response => {
        this.setState({ vehicleList: response.data.vehicleRegistrations })
        console.log(this.state.vehicleList)
        for (let i = 0; i < this.state.vehicleList.length; i++) {
          let vehicleReg = this.state.vehicleList[i].vehicleRegistrationNo;
          axios.post(`${BASE_URL}${GET_ANPR_INFO}`, { vehicleRegistrationNo: vehicleReg }).then(response => {
            if (response.data.Error) {
              console.log(response.data.Error);
            }
            else {
              console.log(response.data)
              ANPRDetails.push(response.data)
            }
          }).catch(error => {
            console.log("Error: " + error);
          });
        }
        this.setState({ ANPRList: ANPRDetails });
      })
      .catch(error => {
        console.log("Error: " + error);
      });

  }

  render() {

    return (
      <div>
        {/* <Styles>
          <SortingTable data={this.state.vehicleList} />
        </Styles>
        <Styles>
          <SortingTable data={this.state.ANPRList} />
        </Styles> */}


      </div>


    );
  }
}

