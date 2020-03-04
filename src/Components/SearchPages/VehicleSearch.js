import React from "react";
import DataInput from "../DataInput";
import axios from "axios";

import {CHECK_EXISTING_VEHICLE, BASE_URL} from "../Constants";

export default class VehicleSearch extends React.Component(){
constructor(props){
    super(props);
    this.state = {
        vehicleRegNo: ""
    }
}


    handleChange = ({target: {value}}) => {
        this.setState({vehicleRegNo: value});
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        axios.get(`${BASE_URL}${CHECK_EXISTING_VEHICLE}${this.state.vehicleRegNo}`)
        .then(response => {
            if (response.data == !false){
                this.props.history.push("/CitizenVehicles/" + response.data)
            }
        }).catch(error =>{
            alert("There is no such registration in our database. \n Please enter another registration.")
        })
    }




    render(){
        return(<form onSubmit={this.handSubmit}>
            <DataInput type="text" name="vehicleRegistrationNumber" placeholder="Vehicle Registration Number" onChange={this.handleChange}></DataInput>
            <button type="submit">Search</button>
        </form>
            
        );
    }



}