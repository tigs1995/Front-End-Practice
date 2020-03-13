import React from "react";
import "../CSS/HomePage.css";

export default class HomePage extends React.Component {

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
        return (<div className="centreSearch">

            <h4>Search</h4>

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
        </div>
        );
    }
}

// HomePage.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//     mapStateToProps,
//     { logoutUser }
// )(HomePage);
