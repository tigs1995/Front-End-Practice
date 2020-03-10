import React, { useState, useEffect } from "react";
import {withGoogleMap,withScriptjs,GoogleMap,Marker,InfoWindow,Circle} from "react-google-maps";
import mapStyles from "./mapStyles";
import axios from "axios";
import {BASE_URL, GET_CITIZEN_FINANCIALS, GET_CITIZEN_CALLS, GET_CITIZEN_VEHICLES, MAP_URL} from "../../config/Constants.json";

export default function App (){
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapWrapped
          googleMapURL={MAP_URL}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    ); 
  }
  function Map() {
    const [centreLat, setCentreLat] = useState(54);
    const [centreLong, setCentreLong] = useState(-2);

    const financeDataToUse = [];
    const callsDataToUse = [];
    const vehicleDataToUse = [];
    const now = new Date();

    useEffect = () => {
        
        // axios.get(`${BASE_URL}
        //            ${GET_CITIZEN_FINANCIALS}
        //            ${this.props.match.params.id}
        //            ${this.startTime}
        //            ${this.props.match.params.end}`)
        //       .then(response =>{
        //           console.log(response.data);
        //           financeDataToUse = response.data;
        //       })
        //       .catch(error => {
        //           console.log(error);
        //       });


        axios.get(`${BASE_URL}
              ${GET_CITIZEN_CALLS}
              ${this.props.match.params.id}
              ${this.props.match.params.start}
              ${this.props.match.params.end}`)
         .then(response =>{
             console.log(response.data);
             callsDataToUse = response.data;
         })
         .catch(error => {
             console.log(error);
         });


    //      axios.get(`${BASE_URL}
    //             ${GET_CITIZEN_VEHICLES}
    //             ${this.props.match.params.id}
    //             ${this.props.match.params.start}
    //             ${this.props.match.params.end}`)
    // .then(response =>{
    //     console.log(response.data);${this.props.match.params.long}
    //     ${this.props.match.params.radius}
    //     vehicleDataToUse = response.data;
    // })
    // .catch(error => {
    //     console.log(error);
    // });
    // }
    const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={ {lat: centreLat, lng: centreLong }}
      defaultOptions={{ styles: mapStyles }}
    >



      {financeDataToUse.map(finances => (
        <Marker
          key={finances.atmId}
          position={{
            lat: parseInt(finances.latitude),
            lng: parseInt(finances.longitude)
          }}
          
          onClick={() => {
            alert(finances);
          }}
        />
        
  
      ))} 

{callsDataToUse.map(calls => (
        <Marker
      //    key={calls.ATM_ID}
          position={{
            lat: parseInt(calls.latitude),
            lng: parseInt(calls.longitude)
          }}
          
          onClick={() => {
            alert(calls);
          }}
        />
        
  
      ))} 

{Object.values(vehicleDataToUse).map(vehicle => (
        <Marker
  //        key={vehicle.ATM_ID}
          position={{
            lat: parseInt(vehicle.latitude),
            lng: parseInt(vehicle.longitude)
          }}
          
          onClick={() => {
            alert(vehicle);
          }}
        />
        
  
      ))} 
           <Circle
                  defaultCenter={{
                    lat: centreLat,
                    lng: centreLong
                  }}
                  // radius={circleRadius}
                  options={{options: {
                    strokeColor: "black"}}
                  }
                />
      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.latitude,
            lng: selectedPark.longitude
          }}
        >
          <div>
            <h2>{selectedPark.latitude}</h2>
            <p>{selectedPark.longitude}</p>
          </div>
        </InfoWindow>
      )}
 {/* <button onClick={() => setRadius(500000)}>heello</button> */}
    </GoogleMap>
   
  );

}}

const MapWrapped = withScriptjs(withGoogleMap(Map));
