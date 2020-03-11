import React from "react";
import axios from "axios";
import {
  BASE_URL,
  GET_CITIZEN_FINANCIALS,
  GET_CITIZEN_CALLS,
  GET_CITIZEN_VEHICLES,
  MAP_URL
} from "../../config/Constants.json";
import MapWrapped from "./MapComponent";
import SpinnerOverlay from "../SpinnerOverlay";

export default class PersonLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      radius: 0,
      beforeTime: "",
      afterTime: "",
      vehicleDataToUse: [],
      callDataToUse: [],
      financialDataToUse: [],
      loading: true
    };
  }

  axiosRequests = async (choice) => {
    const searchDetails = {
      "citizenID": "D42HIS456",
      "afterTime": "2014-02-20T0:0:0Z",
      "beforeTime": "2020-02-11T23:59:59Z"
    };
    let response = [
      {"citizenID": 8, latitude:53.45706016101823 , longitude: -2.9149797465275173},
      {"citizenID": 9, latitude:52.70225113709832 , longitude: -1.2654176264722115}];

    if (choice === "vehicle") {
      console.log("axios started");
      //const response = await axios.post(`${BASE_URL}${GET_CITIZEN_VEHICLES}`, searchDetails);
      return response;
    }
    if (choice === "call") {
      console.log("axios started");
      //const response = await axios.post(`${BASE_URL}${ GET_CITIZEN_CALLS}`, searchDetails);
      return response;
    }
    if (choice === "financial") {
      console.log("axios started");
      //const response = await axios.post(`${BASE_URL}${GET_CITIZEN_FINANCIALS}`, searchDetails);
      return response;
    }
    console.log("axios finished");
    //console.log(response.data);
    return response;
  }
  componentDidMount() {
    this.axiosRequests("vehicle").then(vehicleDataToUse => {
      this.setState({
        ...this.props.match.params,
        vehicleDataToUse,
      });
    });
    this.axiosRequests("call").then(callDataToUse => {
      this.setState({
        callDataToUse,
      });
    });
    this.axiosRequests("financial").then(financialDataToUse => {
      this.setState({
        financialDataToUse,
        loading: false
      });
    });
  }
  render() {
    return (
      <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        
        <MapWrapped
          {...this.props.match.params}
          vehicleDataToUse={this.state.vehicleDataToUse}
          callDataToUse={this.state.callDataToUse}
          financialDataToUse={this.state.financialDataToUse}
          googleMapURL={MAP_URL}
          history={this.props.history}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {this.state.loading && <SpinnerOverlay />}
      </div>
    );
  }
}