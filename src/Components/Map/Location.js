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

    if (choice === "vehicle") {
      
      await axios.post(`${BASE_URL}${GET_VEHICLES_ALL}`, {
        radius: this.props.match.params.radius,
        latitude: this.props.match.params.lat,
        longitude: this.props.match.params.long,
        afterTime: this.props.match.params.afterTime,
        beforeTime: this.props.match.params.beforeTime
      }).then(response => {
        if(response.data.Exception){
          this.setState({vehicleDataToUse: []})
        }
        else if (response.data.Warning){
          this.setState({vehicleDataToUse: []})
        }
        else{
          this.setState({  loading: false, vehicleDataToUse: response.data })
        console.log(response.data);
        }
        
      });
    }
      // if (choice === "callInbound") {
      //   await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, {
      //     radius: this.props.match.params.radius,
      //   lat: this.props.match.params.lat,
      //   long: this.props.match.params.long,
      //   inboundOrOutbound: "inbound",
      //   afterTime: this.props.match.params.afterTime,
      //   beforeTime: this.props.match.params.beforeTime
      //   }).then(response => {
      //     this.setState({  callDataToUseInbound: response.data })
      //     console.log(response.data);
      //   });
      // }
      // if (choice === "callOutbound") {
      //   console.log("axios started");
      //   await axios.post(`${BASE_URL}${GET_CALLS_ALL}`, {
      //     radius: this.props.match.params.radius,
      //   lat: this.props.match.params.lat,
      //   long: this.props.match.params.long,
      //   inboundOrOutbound: "outbound",
      //   afterTime: this.props.match.params.afterTime,
      //   beforeTime: this.props.match.params.beforeTime
      //   }).then(response => {
      //     this.setState({ callDataToUseOutbound: response.data })
      //     console.log(response.data);
      //   });
      // }
      // if (choice === "financeEpos") {
      //   console.log("axios started");
      //   await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, {
      //     radius: this.props.match.params.radius,
      //   lat: this.props.match.params.lat,
      //   long: this.props.match.params.long,
      //   eposOrAtm: "epos",
      //   afterTime: this.props.match.params.afterTime,
      //   beforeTime: this.props.match.params.beforeTime
      //   }).then(response => {
      //     this.setState({  financialDataToUseEpos: response.data })
      //     console.log(response.data);
      //   });
      // }
      // if (choice === "financeAtm") {
      //   console.log("axios started");
      //   await axios.post(`${BASE_URL}${GET_FINANCIALS_ALL}`, {
      //     radius: this.props.match.params.radius,
      //   lat: this.props.match.params.lat,
      //   longe: this.props.match.params.long,
      //   eposOrAtm: "atm",
      //   afterTime: this.props.match.params.afterTime,
      //   beforeTime: this.props.match.params.beforeTime
      //   }).then(response => {
      //     this.setState({ loading: false, financialDataToUseAtm: response.data })
      //     console.log(response.data);
      //   });
      // }
  };

  componentDidMount() {
    this.axiosRequests("vehicle");
    console.log("VEHICLE", this.state.vehicleDataToUse)
  
    // this.axiosRequests("callInbound");
    // console.log("CALL INBOUND", this.state.callDataToUseInbound)

    // this.axiosRequests("callOutbound");
    // console.log("CALL OUTBOUND",this.state.callDataToUseOutbound)

    // this.axiosRequests("financeEpos");
    // console.log("FINANCE EPOS", this.state.financialDataToUseEpos)

    // this.axiosRequests("financeAtm");
    // console.log("FINANCE ATM",this.state.financialDataToUseAtm)
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
        {this.state.loading ? <SpinnerOverlay /> : <MapWrapped
          {...this.props.match.params}
          history={this.props.history}
          vehicleDataToUse={this.state.vehicleDataToUse}
          // callDataToUseInbound={this.state.callDataToUseInbound}
          // callDataToUseOutbound={this.state.callDataToUseInbound}
          // financialDataToUseEpos={this.state.financialDataToUseEpos}
          // financialDataToUseAtm={this.state.financialDataToUseAtm}
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />}
        {/* {this.state.loading && <SpinnerOverlay />} */}
      </div>
    );
  }
}
