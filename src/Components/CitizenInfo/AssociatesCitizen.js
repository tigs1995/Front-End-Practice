import React, { Component } from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import LoadingSpinner from '../LoadingSpinner';

import {
  BASE_URL,
  GET_ASSOCIATES,
  GET_CITIZEN
} from "../../config/Constants.json";
import axios from "axios";

export default class AssociatesCitizen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      associates: [],
      citizenBeingSearched: "",
      errorMessage: ""
    };
  }

  componentDidMount() {
    this.setState({ citizenID: this.props.match.params.id });
    console.log(this.state.citizenID);

    axios
      .get(`${BASE_URL}${GET_ASSOCIATES}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.Warning) {
          this.setState({ errorMessage: response.data.Warning });
        } else {
          this.setState({ forenames: response.data.forenames });
          this.setState({ surname: response.data.surname });
        }
      });

    axios
      .get(`${BASE_URL}${GET_CITIZEN}${this.state.citizenID}`)
      .then(response => {
        if (response.data.Error) {
          console.log(response.data.Error);
        } else {
          this.setState({ forenames: response.data.forenames });
          this.setState({ surname: response.data.surname });
        }
      });
  }

  render() {
    return (
      <div>
        <p>Associates of: {this.state.citizenBeingSearched}</p>
        <Styles>
          <h2>Associates</h2>
          <span id="error">{this.state.vehicleError}</span>
          {this.state.loading ? <LoadingSpinner /> :
          <SortingTable data={this.state.associates} />}
        </Styles>
      </div>
    );
  }
}


