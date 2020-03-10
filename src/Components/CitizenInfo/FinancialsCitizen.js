import React, { Component } from "react";
import axios from "axios";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import LoadingSpinner from '../LoadingSpinner';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";

import {
  BASE_URL,
  GET_BANKCARD_INFO,
  GET_CITIZEN_FINANCIALS
} from "../../config/Constants.json";

class FinancialsCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: "",
      forenames: "",
      surname: "",
      bankCards: [],
      EPOSTransactions: [],
      ATMTransactions: [],
      bankCardError: "",
      EPOSError: "",
      ATMError: "",
      loading: true
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};

  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });
    console.log("CitizenID", this.props.match.params.id);

    axios
      .post(`${BASE_URL}${GET_CITIZEN_FINANCIALS}`, {citizenID: this.props.match.params.id, eposOrAtm: "epos"})
      .then(response =>  {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ EPOSError: response.data.Warning });
        }else {
          this.setState({ loading: false, EPOSTransactions: response.data });
        }
      });

    axios
      .post(`${BASE_URL}${GET_BANKCARD_INFO}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ bankCardError: response.data.Warning });
        } else {
          console.log("Bank cards", response.data);
          this.setState({ bankCards: response.data });
        }
      });

    axios
      .get(`${BASE_URL}${GET_CITIZEN_FINANCIALS}`, {citizenID: this.props.match.params.id, eposOrAtm: "atm"})
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ ATMError: response.data.Warning });
        }else {
          this.setState({ ATMTransactions: response.data });
        }
      });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <p id='loggedInAs'>You are logged in as {user.username.split(" ")[0]}</p><button id='logout'
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}>Logout</button>
         
        <Styles>
          <h2>Bank cards</h2>
          <span id="error">{this.state.bankCardError}</span>
          {this.state.loading ? <LoadingSpinner /> :
          <SortingTable data={this.state.bankCards} />}
        </Styles>
        <Styles>
          <h2>EPOS information</h2>
          <span id="error">{this.state.EPOSError}</span>
          {this.state.loading ? <LoadingSpinner /> :
          <SortingTable data={this.state.EPOSTransactions} />}
        </Styles>
        <Styles>
          <h2>ATM information</h2>
          <span id="error">{this.state.ATMError}</span>
          {this.state.loading ? <LoadingSpinner /> :
          <SortingTable data={this.state.ATMTransactions} />}
        </Styles>
      </div>
    );
  }
}



FinancialsCitizen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(FinancialsCitizen);
