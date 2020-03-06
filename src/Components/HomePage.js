import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../Actions/authActions";

export default class HomePage extends React.Component {

    render() {
        return (<div>
            <button onClick={()=> this.props.history.push("./CitizenSearch")} name="Citizen">Citizen </button>
            <button onClick={()=> this.props.history.push("./VehicleSearch")} name="Vehicle">Vehicle</button>
            <button onClick={()=> this.props.history.push("./LocationSearch")} name="Location">Location</button>
                </div>
        );
    }
}

