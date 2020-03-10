import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";
import "../CSS/HomePage.css";





class HomePage extends React.Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };


    showText = ({ target: { name } }) => {
        let x = document.getElementById("toggle");
        x.style.visibility = "visible"
        if (name === "Citizen") {
            x.innerHTML = "Search for a citizen by name. \n\n Displays finances, vehicles, associates and whereabouts of the given citizen."
        }
        if (name === "Vehicle") {
            x.innerHTML = "Search for a vehicle by registration. \n\n Displays known owners and appearances."
        }
        if (name === "Location") {
            x.innerHTML = "Search for event within a given location and timeframe. \n\n Displays transactions, vehicles and calls within the parameters."
        }
    }
    hideText = ({ target: { name } }) => {
        let x = document.getElementById("toggle");
        x.style.visibility = "hidden"
    }

    render() {
        const { user } = this.props.auth;
        return (<div class="centreSearch">
            <br />
            <p>You are logged in as {user.username.split(" ")[0]}</p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 id="title">Homepage</h1>
            <br />
            <h2>Search By:</h2>
            <br />
            <br />
            <br />


            <button id="homepageButton"
                onMouseOver={this.showText}
                onMouseOut={this.hideText}
                onClick={() => this.props.history.push("./CitizenSearch")}
                name="Citizen">Citizen
            </button>

            <button
                id="homepageButton"
                onMouseOver={this.showText}
                onMouseOut={this.hideText}
                onClick={() => this.props.history.push("./VehicleSearch")}
                name="Vehicle">Vehicle</button>

            <button
                id="homepageButton"
                onMouseOver={this.showText}
                onMouseOut={this.hideText}
                onClick={() => this.props.history.push("./LocationSearch")}
                name="Location">Location</button>
            <br />
            <br />
            <p id="toggle" style={{ visibility: "hidden" }}><span></span></p>

            <button
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
                Logout
            </button>
        </div>
        );
    }
}

HomePage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(HomePage);
