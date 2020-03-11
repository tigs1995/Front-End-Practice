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
      callDataToUse: [],
      financialDataToUse: [],
      loading: true
    }
  }


  axiosRequests = async (choice) => {
    const searchDetails = {
      "latitude": 57,
      "longitude": -90,
      "radius": 10,
      "afterTime": "2014-02-20T0:0:0Z",
      "beforeTime": "2020-02-11T23:59:59Z"
    }
    let response = [
      {"citizenID": 4, latitude:52.70225113709832 , longitude: -2.0368518763076935},
      {"citizenID": 5, latitude:57.88098926576203 , longitude: -4.034929812735241},
      {"citizenID": 6, latitude:56.008258223718215 , longitude: -3.6839238260073324},
      {"citizenID": 7, latitude:56.0220524152082 , longitude: -3.9185647797263736},
      {"citizenID": 8, latitude:53.45706016101823 , longitude: -2.9149797465275173},
      {"citizenID": 9, latitude:52.70225113709832 , longitude: -1.2654176264722115}
      ];
    

    if (choice === "vehicle"){
      console.log("axios started");
      //const response = await axios.post(`${BASE_URL}${GET_VEHICLES_ALL}`, searchDetails);
      return response;
    }
    if (choice === "call"){
      console.log("axios started");
       //const response = await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, searchDetails);
       return response;
    }
    if (choice === "finance"){
      console.log("axios started");
      //const response = await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, searchDetails);
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
    
    this.axiosRequests("finance").then(financialDataToUse => {
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
        history={this.props.history}
        vehicleDataToUse={this.state.vehicleDataToUse}
        callDataToUse={this.state.callDataToUse}
        financialDataToUse={this.state.financialDataToUse}
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