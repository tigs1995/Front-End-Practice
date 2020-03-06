import React, { Component } from 'react';
import axios from 'axios';
import DataInput from '../DataInput';
import { CHECK_EXISTING_CITIZEN, BASE_URL } from '../Constants';

export default class CitizenSearch extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            forenames: null,
            surname: null,
            errorMessage: null
        }
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post(`${BASE_URL}${CHECK_EXISTING_CITIZEN}`, { forenames: this.state.forenames, surname: this.state.surname }).then(response => {
            if (response.data.Error) {
                this.setState({ errorMessage: response.dataError });
            }
            else if (response.data === false) {
                this.setState({ errorMessage: 'Citizen not found.' });
            }
            else {
                this.props.history.push(`CitizenList/${this.state.forenames}/${this.state.surname}`);
            }
        })
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <DataInput type='text' placeholder='Forenames' name='forenames' onChange={this.handleChange}></DataInput>
                <DataInput type='text' placeholder='Surname' name='surname' onChange={this.handleChange}></DataInput>
                <button>Search</button>
                <span className='error'>{this.state.errorMessage}</span>
            </form>

        )
    }
}
