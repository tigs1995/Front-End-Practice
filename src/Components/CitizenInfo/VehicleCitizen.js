import React, { Component } from 'react'
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import { GET_ANPR_INFO, GET_VEHICLE_OWNER, GET_VEHICLE_INFO, BASE_URL } from '../Constants';
import axios from 'axios';

export default class VehicleCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleDetails: [
        { "registrationID": "1234", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
        { "registrationID": "3333", "registrationDate": "2020:20:18", "vehicleRegistrationNo": "hegy48j", "make": "Hyundai", "model": "getz", "colour": "Blue", "driverLicenseID": "GHDJKDJ4848" },
      ]
    }
  }

  componentDidMount() {
    this.setState({ vehicleRegistrationNo: this.props.match.params.reg });
    console.log(this.state.vehicleRegistrationNo);
    axios.get(`${BASE_URL}${GET_VEHICLE_OWNER}${this.state.vehicleRegistrationNo}`).then(response => {
      if (response.data.Error) {
        console.log(response.data.Error);
      }
      else {
        this.setState({ forenames: response.data.forenames });
        this.setState({ surname: response.data.surname });
      }
    })

    axios.get(`${BASE_URL}${GET_VEHICLE_INFO}${this.state.vehicleRegistrationNo}`).then(response => {
      if (response.data.Error) {
        console.log(response.data.Error);
      }
      else {
        this.setState({ vehicleDetails: response.data });
      }
    })

    axios.get(`${BASE_URL}${GET_ANPR_INFO}${this.state.vehicleRegistrationNo}`).then(response => {
      if (response.data.Error) {
        console.log(response.data.Error);
      }
      else {
        this.setState({ ANPRDetails: response.data });
      }
    })
  }

  render() {

    return (
      <Styles>
        <SortingTable data={this.state.vehicleDetails} />
      </Styles>
    );
  }
}

