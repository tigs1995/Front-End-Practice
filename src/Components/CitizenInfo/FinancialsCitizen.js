import React, { Component } from "react";
import axios from "axios";
import {
  GET_ATM_INFO,
  BASE_URL,
  GET_EPOS_INFO,
  GET_BANKCARD_INFO
} from "../Constants";
import TableHead from "../Table/TableHead";
import TableBody from "../Table/TableBody";

export default class FinancialsCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: "46456",
      forenames: "Lizzie",
      surname: "Colwell",
      bankCards: [
        {
          BankCardID: "12233434353",
          CardNumber: "787878797",
          BankAccountID: "",
          AccountNumber: "",
          Bank: ""
        }
      ],
      EPOSTransactions: [
        {
          Timestamp: "",
          EPOSID: "",
          BankCardNo: "",
          PayeeAccount: "",
          Amount: ""
        }
      ],
      ATMTransactions: [
        { Timestamp: "", ATMID: "", BankCardNo: "", Type: "", Amount: "" }
      ]
    };
  }
  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });
    console.log(this.state.citizenID);
    this.setState({ forenames: this.props.match.params.forenames });
    console.log(this.state.forenames);
    this.setState({ surname: this.props.match.params.surname });
    console.log(this.state.surname);
    axios
      .get(`${BASE_URL}${GET_EPOS_INFO}${this.state.citizenID}`)
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else {
          this.setState({ EPOSTransactions: response.data });
        }
      });

    axios
      .get(`${BASE_URL}${GET_BANKCARD_INFO}${this.state.citizenID}`)
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else {
          this.setState({ bankCards: response.data });
        }
      });

    axios
      .get(`${BASE_URL}${GET_ATM_INFO}${this.state.citizenID}`)
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else {
          this.setState({ ATMTransactions: response.data });
        }
      });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(e.target.value);
  }

  headerList(arr) {
    const headerList = [];
    Object.keys(arr).map(key => headerList.push(key));
    return headerList;
  }

  render() {
    return (
      <div id="tableList">
        <p id="nameOnPage">
          {this.state.forenames} {this.state.surname}
        </p>
        <h4>Bank Cards </h4>
        <table>
          <TableHead infoList={this.state.bankCards}></TableHead>
          <TableBody infoList={this.state.bankCards}></TableBody>
        </table>

        <h4>EPOS Transactions</h4>
        <table>
          <TableHead infoList={this.state.EPOSTransactions}></TableHead>
          <TableBody infoList={this.state.EPOSTransactions}></TableBody>
        </table>
        <h4>ATM Transactions</h4>
        <TableHead infoList={this.state.ATMTransactions}></TableHead>
        <TableBody infoList={this.state.ATMTransactions}></TableBody>
      </div>
    );
  }
}
