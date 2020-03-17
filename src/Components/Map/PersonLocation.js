import React from "react";
import axios from "axios";
import {
  BASE_URL,
  GET_CITIZEN_FINANCIALS,
  GET_CITIZEN_CALLS,
  GET_CITIZEN_VEHICLES,
  MAP_URL
} from "../../config/Constants.json";
import MapWrapped from "./PersonMapComponent";
import SpinnerOverlay from "../SpinnerOverlay";

export default class PersonLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  loadStuff = async () => {
    const newState = this.state;

    const searchDetails = {
      citizenID: this.props.match.params.id,
      afterTime: this.props.match.params.afterTime,
      beforeTime: this.props.match.params.beforeTime
    };

    const apiCalls = [
      { key: 'financialDataToUseAtm', url: `${BASE_URL}${GET_CITIZEN_FINANCIALS}`, data: {...searchDetails, eposOrAtm: 'atm'} },
      { key: 'financialDataToUseEpos', url: `${BASE_URL}${GET_CITIZEN_FINANCIALS}`, data: {...searchDetails, eposOrAtm: 'epos'} },
      { key: 'callDataToUseOutbound', url: `${BASE_URL}${GET_CITIZEN_CALLS}`, data: {...searchDetails, inboundOrOutbound: 'outbound'} },
      { key: 'callDataToUseInbound', url: `${BASE_URL}${GET_CITIZEN_CALLS}`, data: {...searchDetails, inboundOrOutbound: 'inbound'} },
      { key: 'vehicleDataToUse', url: `${BASE_URL}${GET_CITIZEN_VEHICLES}`, data: {...searchDetails} },
    ];

    for(let {key, url, data} of apiCalls) {
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
    this.setState({loading:false});
  }

  componentDidMount() {
      this.loadStuff();
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        
        <MapWrapped
          {...this.props.match.params}
          history={this.props.history}
          vehicleDataToUse={this.state.vehicleDataToUse}
          callDataToUseInbound={this.state.callDataToUseInbound}
          callDataToUseOutbound={this.state.callDataToUseOutbound}
          financialDataToUseEpos={this.state.financialDataToUseEpos}
          financialDataToUseAtm={this.state.financialDataToUseAtm}
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