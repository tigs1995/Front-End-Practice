import React, { Component } from "react";
import axios from "axios";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import LoadingSpinner from '../LoadingSpinner';
import BackButton from '../BackButton';
import "../../CSS/Tables.css";

import {
  BASE_URL,
  GET_BANKCARD_INFO,
  GET_CITIZEN_FINANCIALS
} from "../../config/Constants.json";

export default class FinancialsCitizen extends Component {
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
      loadingEPOS: true,
      loadingATM: true,
      loadingBank: true
    };
  }


  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });
    console.log("CitizenID", this.props.match.params.id);

    axios
      .post(`${BASE_URL}${GET_CITIZEN_FINANCIALS}`, { citizenID: this.props.match.params.id, eposOrAtm: "epos" })
      .then(response => {
        console.log(response);
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ loadingEPOS: false, EPOSError: "No data found." });
        } else {
          this.setState({ loadingEPOS: false, EPOSTransactions: response.data });
        }
      });

    axios
      .post(`${BASE_URL}${GET_BANKCARD_INFO}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        console.log(response);
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ loadingBank: false, bankCardError: "No data found." });
        } else {
          console.log("Bank cards", response.data);
          this.setState({ loadingBank: false, bankCards: response.data });
        }
      });

    axios
      .post(`${BASE_URL}${GET_CITIZEN_FINANCIALS}`, { citizenID: this.props.match.params.id, eposOrAtm: "atm" })
      .then(response => {
        console.log(response);
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ loadingATM: false, ATMError: "No data found." });
        } else {
          this.setState({ loadingATM: false, ATMTransactions: response.data });
        }
      });
  }

  backClick = e => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div id="table2">
        <p>Financials of citizen {this.state.citizenID}</p>
        <Styles>
          <h2>Bank cards</h2>
          {this.state.loadingBank ? <LoadingSpinner /> :
            <div>
              <span id="error">{this.state.bankCardError}</span>
              <SortingTable data={this.state.bankCards} />
            </div>}
        </Styles>
        <Styles>
          <h2>EPOS information</h2>
          {this.state.loadingEPOS ? <LoadingSpinner /> :
            <div>
              <span id="error">{this.state.EPOSError}</span>
              <SortingTable data={this.state.EPOSTransactions} />
            </div>}
        </Styles>

        <h2>ATM information</h2>
        {this.state.loadingATM ? <LoadingSpinner /> :
          <div>
            <span id="error">{this.state.ATMError}</span>
            <Styles><SortingTable data={this.state.ATMTransactions} /></Styles>
          </div>}
        <BackButton backClick={this.backClick}></BackButton>
      </div>
    );
  }
}


