import React, { Component } from 'react';
import DataInput from "../DataInput";
import axios from "axios";

import {CHECK_EXISTING_VEHICLE, BASE_URL} from "../Constants";

export default class VehicleSearch extends Component{
constructor(props){
    super(props);
    this.state = {
        vehicleRegistrationNo: "",
        errorMessage: ''
    }
}

    handleChange = ({target: {value}}) => {
        this.setState({vehicleRegistrationNo: value});
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`${BASE_URL}${CHECK_EXISTING_VEHICLE}${this.state.vehicleRegistrationNo}`)
        .then(response => {
            if (response.data.Error){
                this.setState({ errorMessage: response.dataError })
            }
            else if (response.data === false){
                this.setState({ errorMessage: 'Vehicle not found.'});
            }
            else{
                this.props.history.push(`VehicleList/${this.state.vehicleRegistrationNo}`);
            }
        })
    }

    render(){
        return(<form onSubmit={this.handSubmit}>
            <DataInput type="text" name="vehicleRegistrationNo" placeholder="Vehicle Registration Number" onChange={this.handleChange}></DataInput>
            <button type="submit">Search</button>
            <span className='error'>{this.state.errorMessage}</span>
        </form>
            
        );
    }



}