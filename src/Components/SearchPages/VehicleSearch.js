import React, { Component } from 'react';
import DataInput from "../DataInput";
import axios from "axios";

import {CHECK_EXISTING_VEHICLE, BASE_URL} from "../Constants";

export default class VehicleSearch extends Component{
constructor(props){
    super(props);
    this.state = {
        vehicleRegistrationNo: ""
    }
}


    handleChange = ({target: {value}}) => {
        this.setState({vehicleRegistrationNo: value});
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`${BASE_URL}${CHECK_EXISTING_VEHICLE}${this.state.vehicleRegistrationNo}`)
        .then(response => {
            if (response.data === !false){
                this.props.history.push("/CitizenVehicles/" + response.data)
            }
        }).catch(error =>{
            alert("There is no such vehicle in our database. \n Please enter another registration.")
        })
    }




    render(){
        return(<form onSubmit={this.handSubmit}>
            <DataInput type="text" name="vehicleRegistrationNo" placeholder="Vehicle Registration Number" onChange={this.handleChange}></DataInput>
            <button type="submit">Search</button>
        </form>
            
        );
    }



}