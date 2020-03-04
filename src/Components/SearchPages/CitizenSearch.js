import React, { Component } from 'react';
import axios from 'axios';
import DataInput from '../DataInput';
import { CHECK_EXISTING_CITIZEN, BASE_URL } from '../Constants';

export default class CitizenSearch extends Component {
    constructor(props) {
        this.state = {
            person: {
                firstName: null,
                lastName: null,
            },
            errorMessage: null
        }
    }

handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ name: value });
}

handleSubmit = e => {
    axios.get(`${BASE_URL}${CHECK_EXISTING_CITIZEN}${this.state.person}`).then(response => {
        if(response.data.Error){
            this.setState({ errorMessage: response.dataError });
        }
        else if(response.data === false){
            this.setState({ errorMessage: 'Citizen not found.'});
        }
        else{
            const citizenID = response.data;
            this.props.history.push(`CitizenHome/${citizenID}`);
        }
    })
}


render(){
    return (
        <form onSubmit={this.handleSubmit}>
            <DataInput type='text' placeholder='First Name' name='firstName' onChange={this.handleChange}></DataInput>
            <DataInput type='text' placeholder='Last Name' name='lastName' onChange={this.handleChange}></DataInput>
            <button>Search</button>
        </form>

    )
}
}
