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

import SpinnerOverlay from '../SpinnerOverlay';
import AccordianSide from "../AccordianSideBar/Accordian";

export default class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      radius: 0,
      beforeTime: "",
      afterTime: "",
      vehicleDataToUse: [],
      callDataToUseInbound: [],
      callDataToUseOutbound: [],
      financialDataToUseEpos: [],
      financialDataToUseAtm: [],
      loading: true,
      vehicleFilter: 1,
      callsFilter: 1,
      financeFilter: 1,
      newSearchLatitude: 0,
      newSearchLongitude: 0,
      newSearchRadius: 0
    }

  }



  axiosRequests = async choice => {

    const requestBody = {
      radius: this.props.match.params.radius,
      latitude: this.props.match.params.lat,
      longitude: this.props.match.params.long,
      afterTime: this.props.match.params.afterTime,
      beforeTime: this.props.match.params.beforeTime
    }

    if (choice === "vehicle") {
      await axios.post(`${BASE_URL}${GET_VEHICLES_ALL}`, requestBody)
        .then(response => {
          if (response.data.Exception) {
            this.setState({loading: false, vehicleDataToUse: [] });
          }
          else if (response.data.Warning) {
            this.setState({loading: false, vehicleDataToUse: [] });
            console.log("Warning: No data from " + choice);
          }
          else {
            this.setState({ loading: false, vehicleDataToUse: response.data })
          }
        }).catch(error => {
          console.log("Error " + error);
          this.setState({ vehicleDataToUse: [] });
        });
    }

    if (choice === "callInbound") {
      requestBody.inboundOrOutbound = "inbound";
      await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, requestBody)
        .then(response => {
          if (response.data.Exception) {
            this.setState({ callDataToUseInbound: [] });
          }
          else if (response.data.Warning) {
            this.setState({ callDataToUseInbound: [] });
            console.log("Warning: No data from " + choice);
          }
          else {
            this.setState({ callDataToUseInbound: response.data });
          }
        }).catch(error => {
          console.log(error);
          this.setState({ callDataToUseInbound: [] });
        });
    }

    if (choice === "callOutbound") {
      requestBody.inboundOrOutbound = "outbound";
      await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, requestBody)
        .then(response => {
          if (response.data.Exception) {
            this.setState({ callDataToUseOutbound: [] });
          }
          else if (response.data.Warning) {
            this.setState({ callDataToUseOutbound: [] });
            console.log("Warning: No data from " + choice);
          }
          else {
            this.setState({ callDataToUseOutbound: response.data })
          }
        }).catch(error => {
          console.log(error);
          this.setState({ callDataToUseOutbound: [] });
        })
    }

    if (choice === "financeEpos") {
      requestBody.eposOrAtm = "epos";
      await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, requestBody).then(response => {
        if (response.data.Exception) {
          this.setState({ financialDataToUseEpos: [] });
        }
        else if (response.data.Warning) {
          this.setState({ financialDataToUseEpos: [] });
          console.log("Warning: No data from " + choice);
        }
        else {
          this.setState({ financialDataToUseEpos: response.data });
        }
      }).catch(error => {
        console.log(error);
        this.setState({ financialDataToUseEpos: [] });
      });
    }

    if (choice === "financeAtm") {
      requestBody.eposOrAtm = "atm";
      await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, requestBody).then(response => {
        if (response.data.Exception) {
          this.setState({ financialDataToUseAtm: [] });
        }
        else if (response.data.Warning) {
          this.setState({ financialDataToUseAtm: [] });
          console.log("Warning: No data from " + choice);
        }
        else {
          this.setState({ financialDataToUseAtm: response.data });
        }
      }).catch(error => {
        console.log(error);
        this.setState({ financialDataToUseAtm: [] });
      });
    }
  }

  componentDidMount() {
    this.axiosRequests("vehicle");
    this.axiosRequests("callInbound");
    this.axiosRequests("callOutbound");
    this.axiosRequests("financeEpos");
    this.axiosRequests("financeAtm");

  }

  handleFinanceChange = (trueOrFalse) => {this.setState({ financeFilter: trueOrFalse }) }
  handleCallsChange = (trueOrFalse) => { this.setState({ callsFilter: trueOrFalse }) }
  handleVehicleChange = (trueOrFalse) => { this.setState({ vehicleFilter: trueOrFalse }) }

  newSearchLatitude = (changedParameter) => {console.log("i am changn"); console.log(changedParameter); this.setState({newSearchLatitude: changedParameter})}
  newSearchLongitude = (changedParameter) => { this.setState({newSearchLongitude:changedParameter})}
  newSearchRadius = (changedParameter) => { this.setState({newSearchRadius:changedParameter})}

  handleSearchChange = (event) => {
    //event.preventDefault();
    this.props.history.push(`../../../../${this.state.newSearchRadius}/${this.state.newSearchLatitude}/${this.state.newSearchLongitude}/${this.props.match.params.afterTime}/${this.props.match.params.beforeTime}`)

  }

  render() {
    return (<div style={{ display: "inline-block" }}>
      <div style={{ width: "calc(100vw - 30vw)", height: "calc(100vh - 64px)", float: "left" }}>
        {this.state.loading ? <SpinnerOverlay /> : <MapWrapped
          {...this.props.match.params}
          history={this.props.history}
          vehicleDataToUse={this.state.vehicleDataToUse}
          callDataToUseInbound={this.state.callDataToUseInbound}
          callDataToUseOutbound={this.state.callDataToUseOutbound}
          financialDataToUseEpos={this.state.financialDataToUseEpos}
          financialDataToUseAtm={this.state.financialDataToUseAtm}
          vehicleFilter={this.state.vehicleFilter}
          callsFilter={this.state.callsFilter}
          financeFilter={this.state.financeFilter}
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />} </div>
      <div style={{ width: "27vw", display: "inline-block", float: "right", paddingLeft: "1vw" }}>
        <AccordianSide 
        handleSearchChange={this.handleSearchChange}
        newSearchLatitude = {this.newSearchLatitude}
        newSearchLongitude ={this.newSearchLongitude}
          newSearchRadius ={this.newSearchRadius}
          {...this.props.match.params}
          onFinanceChange={this.handleFinanceChange}
          onCallsChange={this.handleCallsChange}
          onVehicleChange={this.handleVehicleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    </div>
    );
  }
}
