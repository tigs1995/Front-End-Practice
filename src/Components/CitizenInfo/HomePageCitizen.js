import React, { Component } from "react";
import { BASE_URL, GET_CITIZEN } from "../../config/Constants.json";
import axios from "axios";

export default class HomePageCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      citizenID: ""
    };
  }

  componentDidMount = () => {
    this.setState({ citizenID: this.props.match.params.id });
    axios
      .post(`${BASE_URL}${GET_CITIZEN}`, {
        citizenID: this.props.match.params.id
      })
      .then(response => {
        this.setState({ personList: response.data });
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  handleClick = ({ target: { name } }) => {
    if (name === "vehicles") {
      this.props.history.push(`/CitizenVehicles/${this.state.citizenID}`);
    }
    if (name === "financials") {
      this.props.history.push(`/CitizenFinancials/${this.state.citizenID}`);
    }
    if (name === "associates") {
      this.props.history.push(`/CitizenAssociates/${this.state.citizenID}`);
    }
    if (name === "whereabouts") {
      this.props.history.push(`/CitizenMap/${this.state.citizenID}`);
    }
  };

  render() {
    const person = this.state.personList;
    return (
      <div>
        <p>Citizen ID: {person.citizenID}</p>
        <p>Date of birth: {person.dateOfBirth}</p>
        <p>Place of birth: {person.placeOfBirth}</p>
        <p>
          Address: {person.streetName} {person.city} {person.postcode}
        </p>

        <button onClick={this.handleClick} name="vehicles">
          Vehicles
        </button>
        <button onClick={this.handleClick} name="financials">
          Financials
        </button>
        <button name="whereabouts">Whereabouts</button>
        <button onClick={this.handleClick} name="associates">
          Associates
        </button>
      </div>
    );
  }
}
