import React from "react";
import axios from "axios";
import {
  BASE_URL,
  GET_FINANCIALS_ALL,
  GET_CALLS_ALL,
  GET_VEHICLES_ALL,
  MAP_URL
} from "../../config/Constants.json";
import MapWrapped from "./MapComponent";
import SpinnerOverlay from "../SpinnerOverlay";
export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      radius: 0,
      inboundOrOutbound: "inbound",
      beforeTime: "",
      afterTime: "",
      vehicleDataToUse: [],
      callDataToUseInbound: [],
      callDataToUseOutbound: [],
      financialDataToUseEpos: [],
      financialDataToUseAtm: [],
      loading: true
    };
  }

  axiosRequests = async choice => {
    // const searchDetails = {
    //   latitude: 57,
    //   longitude: -90,
    //   radius: 10,
    //   inboundOrOutbound: "inbound",
    //   afterTime: "2014-02-20T0:0:0Z",
    //   beforeTime: "2020-02-11T23:59:59Z"
    // };
    const response = [];

    if (choice === "vehicle") {
      debugger;
      console.log("axios started");
      console.log(
        this.props.match.params.lat,
        this.props.match.params.long,
        this.props.match.params.radius,
        this.props.match.params.beforeTime,
        this.props.match.params.afterTime
      );
      const response = await axios.post(`${BASE_URL}${GET_VEHICLES_ALL}`, {
        radius: this.props.match.params.radius,
        latitude: this.props.match.params.lat,
        longitude: this.props.match.params.long,
        afterTime: this.props.match.params.afterTime,
        beforeTime: this.props.match.params.beforeTime
      });
      console.log(response.data);
      return response.data;
    }
  //   if (choice === "callInbound") {
  //     console.log("axios started");
  //     const response = await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, {
  //       radius: this.props.match.params.radius,
  //       latitude: this.props.match.params.latitude,
  //       longitude: this.props.match.params.longitude,
  //       inboundOrOutbound: "inbound",
  //       afterTime: this.props.match.params.afterTime,
  //       beforeTime: this.props.match.params.beforeTime
  //     });
  //     return response.data;
  //   }
  //   if (choice === "callOutbound") {
  //     console.log("axios started");
  //     const response = await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, {
  //       radius: this.props.match.params.radius,
  //       latitude: this.props.match.params.latitude,
  //       longitude: this.props.match.params.longitude,
  //       inboundOrOutbound: "outbound",
  //       afterTime: this.props.match.params.afterTime,
  //       beforeTime: this.props.match.params.beforeTime
  //     });
  //     return response.data;
  //   }
  //   if (choice === "financeEpos") {
  //     console.log("axios started");
  //     const response = await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, {
  //       radius: this.props.match.params.radius,
  //       latitude: this.props.match.params.latitude,
  //       longitude: this.props.match.params.longitude,
  //       eposOrAtm: "epos",
  //       afterTime: this.props.match.params.afterTime,
  //       beforeTime: this.props.match.params.beforeTime
  //     });
  //     return response.data;
  //   }
  //   if (choice === "financeAtm") {
  //     console.log("axios started");
  //     const response = await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, {
  //       radius: this.props.match.params.radius,
  //       latitude: this.props.match.params.latitude,
  //       longitude: this.props.match.params.longitude,
  //       eposOrAtm: "atm",
  //       afterTime: this.props.match.params.afterTime,
  //       beforeTime: this.props.match.params.beforeTime
  //     });
  //     return response.data;
  //   }
  //   return response.data;
  // };

  componentDidMount() {
    this.axiosRequests("vehicle").then(vehicleDataToUse => {
      this.setState({
        ...this.props.match.params,
        vehicleDataToUse
      });
    });

    this.axiosRequests("callInbound").then(callDataToUseInbound => {
      this.setState({
        callDataToUseInbound
      });
    });

    this.axiosRequests("callOutbound").then(callDataToUseOutbound => {
      this.setState({
        callDataToUseOutbound
      });
    });

    this.axiosRequests("financeEpos").then(financialDataToUseEpos => {
      this.setState({
        financialDataToUseEpos
        // loading: false
      });
    });

    this.axiosRequests("financeAtm").then(financialDataToUseAtm => {
      this.setState({
        financialDataToUseAtm
        // loading: false
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
          callDataToUseInbound={this.state.callDataToUseInbound}
          callDataToUseOutbound={this.state.callDataToUseInbound}
          financialDataToUseEpos={this.state.financialDataToUseEpos}
          financialDataToUseAtm={this.state.financialDataToUseAtm}
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        {this.state.loading && <SpinnerOverlay />}
      </div>
    );
  }
}
