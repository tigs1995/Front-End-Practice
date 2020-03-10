import React, { Component } from "react";
import { BASE_URL, GET_CITIZEN } from "../../config/Constants.json";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../Actions/authActions";

class HomePageCitizen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      citizenID: ""
    };
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};

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


HomePageCitizen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HomePageCitizen);

