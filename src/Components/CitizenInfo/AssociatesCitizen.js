import React, { Component } from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import LoadingSpinner from '../LoadingSpinner';
import CountCalls from './CountCalls';
import BackButton from '../BackButton';
import "../../CSS/Tables.css";
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
      errorMessage: "",
      citizenID: '',
      calls: []
    };
  }

  componentDidMount() {
    this.setState({ citizenID: this.props.match.params.id });
    axios
      .post(`${BASE_URL}${GET_ASSOCIATES}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        console.log(response);
        if (response.data.Error) {
          console.log(response.data.Error);
        } else if (response.data.inboundCallAssociates.length === 0 && response.data.outboundCallAssociates.length === 0) {
          this.setState({ loading: false, errorMessage: "No data available." });
        } else {
          this.setState({ associates: response.data });
          let countCalls = CountCalls(response.data);
          this.setState({ loading: false, calls: countCalls });
        }
      });
  }

  backClick = e => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <Styles>
          {this.state.loading ? <LoadingSpinner /> :
            <div id="table">
            <h2>Associates</h2>
            <p>Citizen ID: {this.state.citizenID}</p>
              <span id="error">{this.state.errorMessage}</span>
              <SortingTable data={this.state.calls} />
              <BackButton backClick={this.backClick} />
            </div>}
        </Styles>
        
      </div>
    );
  }
}


