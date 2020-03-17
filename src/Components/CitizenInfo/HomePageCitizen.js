import React, { Component } from "react";
import { BASE_URL, GET_CITIZEN } from "../../config/Constants.json";
import axios from "axios";
import DateConverter from './DateConverter';
import BackButton from '../BackButton';

export default class HomePageCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      citizenID: "",
      todaysDate: '',
      lastWeeksDate: ''
    };
  }

  componentDidMount = () => {
    this.setState({ citizenID: this.props.match.params.id });

    let today = new Date();
    let todaysDate = DateConverter(today);
    this.setState({ todaysDate: todaysDate });

    let lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    let lastWeeksDate = DateConverter(lastWeek);

    this.setState({ lastWeeksDate: lastWeeksDate })

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
      this.props.history.push(`/CitizenMap/${this.state.citizenID}/2010-03-09T14:16:43Z/2020-03-09T14:16:43Z`);
    }
  };

  backClick = e => {
    this.props.history.goBack();
  }

  render() {
    const person = this.state.personList;
    return (
      <div>
        <p>{person.forenames} {person.surname}</p>
        <p>Citizen ID: {person.citizenID}</p>
        <p>Date of birth: {person.dateOfBirth}</p>
        <p>Place of birth: {person.placeOfBirth}</p>
        <p>
          Address: {person.streetName} {person.city} {person.postcode}
        </p>

        <button id="citizenGoToVehicleButton" onClick={this.handleClick} name="vehicles">
          Vehicles
        </button>
        <button id="citizenGoToFinanceButton" onClick={this.handleClick} name="financials">
          Financials
        </button>
        <button id="citizenGoToWhereaboutsButton" onClick={this.handleClick} name="whereabouts">Whereabouts</button>
        <button id="citizenGoToAssociatesButton" onClick={this.handleClick} name="associates">
          Associates
        </button>
        <BackButton backClick={this.backClick}></BackButton>
      </div>
    );
  }
}



