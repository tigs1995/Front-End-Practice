import React, { Component } from 'react';
import axios from 'axios';
import DataInput from '../DataInput';
import { CHECK_EXISTING_CITIZEN, BASE_URL } from '../../config/Constants.json';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";


const Styles = styled.div`
  div {
    text-align: center;
    margin: 15%;

    input {
    
        padding: 0.5em;
        margin: 0.5em;
        color: ${props => props.inputColor || "palevioletred"};
        background: papayawhip;
        border-radius: 3px;
      }
}
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

    


class CitizenSearch extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            forenames: null,
            surname: null,
            errorMessage: null
        }
    }

    
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

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
        const { user } = this.props.auth;
        return (
           <Styles>
               <div>
            <form id = "citizenForm" onSubmit={this.handleSubmit}>
              
                <DataInput type='text' placeholder='Forenames' name='forenames' onChange={this.handleChange}></DataInput>
                <DataInput type='text' placeholder='Surname' name='surname' onChange={this.handleChange}></DataInput>
               
                <Button>Search</Button>
                <span className='error'>{this.state.errorMessage}</span>
            </form>
            </div>
         </Styles>

        )
    }
}

CitizenSearch.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(CitizenSearch);
