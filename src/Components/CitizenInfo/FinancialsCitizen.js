import React, { Component } from "react";
import axios from "axios";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";

import {
  GET_ATM_INFO,
  BASE_URL,
  GET_EPOS_INFO,
  GET_BANKCARD_INFO
} from "../../config/Constants.json";

export default class FinancialsCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citizenID: "46456",
      forenames: "Lizzie",
      surname: "Colwell",
      bankCards: [],
      EPOSTransactions: [],
      ATMTransactions: []
    };
  }
  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });
    console.log(this.state.citizenID);

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
      <Styles>
        <SortingTable data={this.state.bankCards} />
      </Styles>
    );
  }
}
