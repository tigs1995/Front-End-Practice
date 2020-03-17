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
      vehicleFilter: true,
      callsFilter: true,
      financeFilter: true,
      newSearchLatitude: 0,
      newSearchLongitude: 0,
      newSearchRadius: 0
    }

  }

  loadStuff = async () => {
    const newState = this.state;
    const requestBody = {
      radius: this.props.match.params.radius,
      latitude: this.props.match.params.lat,
      longitude: this.props.match.params.long,
      afterTime: this.props.match.params.afterTime,
      beforeTime: this.props.match.params.beforeTime
    }

    const apiCalls = [
      { key: 'financialDataToUseAtm', url: `${BASE_URL}${GET_FINANCIALS_ALL}`, data: { ...requestBody, eposOrAtm: 'atm' } },
      { key: 'financialDataToUseEpos', url: `${BASE_URL}${GET_FINANCIALS_ALL}`, data: { ...requestBody, eposOrAtm: 'epos' } },
      { key: 'callDataToUseOutbound', url: `${BASE_URL}${GET_CALLS_ALL}`, data: { ...requestBody, inboundOrOutbound: 'outbound' } },
      { key: 'callDataToUseInbound', url: `${BASE_URL}${GET_CALLS_ALL}`, data: { ...requestBody, inboundOrOutbound: 'inbound' } },
      { key: 'vehicleDataToUse', url: `${BASE_URL}${GET_VEHICLES_ALL}`, data: { ...requestBody } },
    ];

    for (let { key, url, data } of apiCalls) {
      await axios.post(url, data).then(response => {
        if (response.data.Exception) {
          newState[key] = [];
        }
        else if (response.data.Warning) {
          newState[key] = [];
          console.log("Warning: No data from " + key);
        }
        else {
          newState[key] = response.data;
        }
      }).catch(error => {
        console.log(error);
        newState[key] = [];
      });
    }
    this.setState(newState);
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.loadStuff();

  }

  handleFinanceChange = (trueOrFalse) => { this.setState({ financeFilter: trueOrFalse }) }
  handleCallsChange = (trueOrFalse) => { this.setState({ callsFilter: trueOrFalse }) }
  handleVehicleChange = (trueOrFalse) => { this.setState({ vehicleFilter: trueOrFalse }) }

  newSearchLatitude = (changedParameter) => {this.setState({ newSearchLatitude: changedParameter }) }
  newSearchLongitude = (changedParameter) => { this.setState({ newSearchLongitude: changedParameter }) }
  newSearchRadius = (changedParameter) => { this.setState({ newSearchRadius: changedParameter }) }

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
          newSearchLatitude={this.newSearchLatitude}
          newSearchLongitude={this.newSearchLongitude}
          newSearchRadius={this.newSearchRadius}
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
