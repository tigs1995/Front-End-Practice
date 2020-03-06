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
      vehicleList: [3],
      ANPRDetails: ''
    }
  }

  componentDidMount() {
    let ANPRList = [];
    this.setState({citizenID: this.props.match.params.id})

    axios.post(`${BASE_URL}${GET_CITIZEN}`, { citizenID: this.props.match.params.id})
    .then(response =>{
        this.setState({vehicleList: response.data.vehicleRegistrations})
    })
    .catch (error => {console.log("Error: " + error);
    });    

    for(let i = 0; i < this.state.vehicleList.length; i++){
      let vehicleReg = this.state.vehicleList[i].vehicleRegistrationNo;
      axios.post(`${BASE_URL}${GET_ANPR_INFO}`, { vehicleRegistrationNo: vehicleReg}).then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        }
        else {
          ANPRList.push(response.data)
        }
      })
    }




    }
    
    // axios.get(`${BASE_URL}${GET_VEHICLE_OWNER}${this.state.vehicleRegistrationNo}`).then(response => {
    //   if (response.data.Error) {
    //     console.log(response.data.Error);
    //   }
    //   else {
    //     this.setState({ forenames: response.data.forenames });
    //     this.setState({ surname: response.data.surname });
    //   }
    // })

    // axios.post(`${BASE_URL}${GET_VEHICLE_INFO}${this.state.vehicleRegistrationNo}`).then(response => {
    //   if (response.data.Error) {
    //     console.log(response.data.Error);
    //   }
    //   else {
    //     this.setState({ vehicleDetails: response.data });
    //   }
    // })


  render() {

    return (
      <Styles>
        <SortingTable data={this.state.vehicleDetails} />
      </Styles>
    );
  }
}

