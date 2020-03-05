import React, { Component } from 'react';
import axios from 'axios';
import { GET_ANPR_INFO, GET_VEHICLE_OWNER, GET_VEHICLE_INFO, BASE_URL } from '../Constants';
import TableHead from '../Table/TableHead';
import TableBody from '../Table/TableBody';

export default class VehicleCitizen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleRegistrationNo: 'GGGT554',
            forenames: 'Tigs',
            surname: 'Knowles',
            vehicleDetails: [
                { "RegID": "1234", "RegDate": "2020:20:18", "VehcileReg": "hegy48j", "Make": "Hyundai", "Model": "getz", "Colour": "Blue", "License": "GHDJKDJ4848" },
                { "RegID": "3333", "RegDate": "2020:20:17", "VehcileReg": "hegy48j", "Make": "Hyundai", "Model": "getz", "Colour": "Blue", "License": "GHDJKDJ4848" }
            ],
            ANPRDetails: [
                { "Timestamp": "1234", "Street name": "2020:20:18", "Latitude": "hegy48j", "Longitude": "Hyundai" },
                { "Timestamp": "4444", "Street name": "2020:20:18", "Latitude": "hegy48j", "Longitude": "Hyundai" }
            ]
        }
    }

    componentDidMount(props) {
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

    handleClick(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    headerList(arr) {
        const headerList = [];
        Object.keys(arr).map(key => (
            headerList.push(key)
        ))
        return headerList;
    }


    render() {

        return (
            <div id='tableList'>
                <p id='nameOnPage'>{this.state.forenames} {this.state.surname}</p>
                <h4>Vehicle Information</h4>
                <table>
                    <TableHead infoList={this.state.vehicleDetails}></TableHead>
                    <TableBody infoList={this.state.vehicleDetails}></TableBody>
                </table>

                <h4>ANPR Camera Information</h4>
                <table>
                    <TableHead infoList={this.state.ANPRDetails}></TableHead>
                    <TableBody infoList={this.state.ANPRDetails}></TableBody>
                </table>
            </div>
        );
    }
}