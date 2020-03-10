import React from "react";
import axios from "axios";
import { BASE_URL, GET_FINANCIALS_ALL, GET_CALLS_ALL, GET_VEHICLES_ALL, MAP_URL } from "../../config/Constants.json";
import MapWrapped from "./MapComponent";
import SpinnerOverlay from '../SpinnerOverlay';
export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      long: 0,
      radius: 0,
      beforeTime: "",
      afterTime: "",
      vehicleDataToUse: [],
      loading: true
    }
  }
  axiosRequests = async () => {
    const searchDetails = {
      "latitude": 57,
      "longitude": -90,
      "radius": 10,
      "afterTime": "2014-02-20T0:0:0Z",
      "beforeTime": "2020-02-11T23:59:59Z"
    }
    console.log("axios started");
    const response = await axios.post(`${BASE_URL}${GET_VEHICLES_ALL}`, searchDetails);
    console.log("axios finished");
    console.log(response.data);
    return response.data;
  }
  componentDidMount() {
    this.axiosRequests().then(vehicleDataToUse => {
      this.setState({
        ...this.props.match.params,
        vehicleDataToUse,
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
        googleMapURL={MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      { this.state.loading && <SpinnerOverlay /> }
      </div>
    );
  }
}