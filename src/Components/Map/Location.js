import React, { useState, useEffect } from "react";
import {withGoogleMap,withScriptjs,GoogleMap,Marker,InfoWindow,Circle} from "react-google-maps";
import mapStyles from "./mapStyles";
import axios from "axios";
import {BASE_URL, GET_FINANCIALS_ALL, GET_CALLS_ALL, GET_VEHICLES_ALL, MAP_URL} from "../../config/Constants.json";



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
    const [centreLat, setCentreLat] = useState(this.props.match.params.lat);
    const [centreLong, setCentreLong] = useState(this.props.match.params.long);
    const[circleRadius, setRadius] = useState(this.props.match.params.radius);

    const financeDataToUse = [];
    const callsDataToUse = [];
    const vehicleDataToUse = [];

    useEffect = () => {
        
        axios.get(`${BASE_URL}
                   ${GET_FINANCIALS_ALL}
                   ${this.props.match.params.lat}
                   ${this.props.match.params.long}
                   ${this.props.match.params.radius}
                   ${this.props.match.params.start}
                   ${this.props.match.params.end}`)
              .then(response =>{
                  console.log(response.data);
                  financeDataToUse = response.data;
              })
              .catch(error => {
                  console.log(error);
              });


        axios.get(`${BASE_URL}
              ${GET_CALLS_ALL}
              ${this.props.match.params.lat}
              ${this.props.match.params.long}
              ${this.props.match.params.radius}
              ${this.props.match.params.start}
              ${this.props.match.params.end}`)
         .then(response =>{
             console.log(response.data);
             callsDataToUse = response.data;
         })
         .catch(error => {
             console.log(error);
         });


         axios.get(`${BASE_URL}
                ${GET_VEHICLES_ALL}
                ${this.props.match.params.lat}
                ${this.props.match.params.long}
                ${this.props.match.params.radius}
                ${this.props.match.params.start}
                ${this.props.match.params.end}`)
    .then(response =>{
        console.log(response.data);
        vehicleDataToUse = response.data;
    })
    .catch(error => {
        console.log(error);
    });
    }


  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPin(null);
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



      {Object.values(financeDataToUse).map(finances => (
        <Marker
          key={finances.atmId}
          position={{
            lat: parseInt(finances.latitude),
            lng: parseInt(finances.longitude)
          }}
          icon={{fillColor: '#0000ff'}}
          
          onClick={() => {
            alert(finances);
          }}
        />
        
  
      ))} 

{Object.values(callsDataToUse).map(calls => (
        <Marker
      //    key={calls.ATM_ID}
          position={{
            lat: parseInt(calls.latitude),
            lng: parseInt(calls.longitude)
          }}
          icon={{fillColor: '#00FFFF'}}
          
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
          icon={{fillColor: '#FF00FF'}}
          
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
                  radius={circleRadius}
                  options={{options: {
                    strokeColor: "black"}}
                  }
                />
      {selectedPin && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPin(null);
          }}
          position={{
            lat: selectedPin.latitude,
            lng: selectedPin.longitude
          }}
        >
          <div>
            <h2>{selectedPin.latitude}</h2>
            <p>{selectedPin.longitude}</p>
          </div>
        </InfoWindow>
      )}
 <button onClick={() => setRadius(500000)}>heello</button>
    </GoogleMap>
   
  );

}

const MapWrapped = withScriptjs(withGoogleMap(Map));