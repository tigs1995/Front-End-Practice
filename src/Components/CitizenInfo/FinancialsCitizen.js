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
      citizenID: "",
      forenames: "",
      surname: "",
      bankCards: [],
      EPOSTransactions: [],
      ATMTransactions: [],
      error: ""
    };
  }
  componentDidMount(props) {
    this.setState({ citizenID: this.props.match.params.id });
    console.log("CitizenID", this.props.match.params.id);

    // axios
    //   .post(`${BASE_URL}${GET_EPOS_INFO}${this.state.citizenID}`)
    //   .then(response => {
    //     if (response.data.Error) {
    //       console.log(response.data.Error);
    //     } else {
    //       this.setState({ EPOSTransactions: response.data });
    //     }
    //   });

    axios
      .post(`${BASE_URL}${GET_BANKCARD_INFO}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ error: response.data.Warning });
        } else {
          console.log("Bank cards", response.data);
          this.setState({ bankCards: response.data });
        }
      });

    // axios
    //   .get(`${BASE_URL}${GET_ATM_INFO}${this.state.citizenID}`)
    //   .then(response => {
    //     if (response.data.Error) {
    //       console.log(response.data.Error);
    //     } else {
    //       this.setState({ ATMTransactions: response.data });
    //     }
    //   });
  }

  render() {
    return (
      <div>
        <Styles>
          <h2>Bank cards</h2>
          <span id="error">{this.state.error}</span>
          <SortingTable data={this.state.bankCards} />
        </Styles>
      </div>
    );
  }
}
