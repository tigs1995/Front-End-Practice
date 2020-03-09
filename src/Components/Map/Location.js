import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import bankData from "./bankData.json";
import mapStyles from "./mapStyles";


export default function App (){
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDBxnd19DzbFBaNgtX75EgNx6znWS9pzpY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  ); 

}

function Map(props) {
    const [centreLat] = useState(53.02478);
    const [centreLong] = useState(53.02478);
    const[circleRadius, setRadius] = useState(0);
    const [circleCentreLat] =useState(0);
const [circleCentreLong] =useState(0);



  console.log(bankData);
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
      {Object.values(bankData).map(bank => (
        <Marker
          key={bank.ATM_ID}
          position={{
            lat: parseInt(bank.latitude),
            lng: parseInt(bank.longitude)
          }}
          
          onClick={() => {
            alert(bank);
          }}
        />
  
      ))}      <Circle
                  defaultCenter={{
                    lat: circleCentreLat,
                    lng: circleCentreLong
                  }}
                  radius={circleRadius}
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
 <button onClick={() => setRadius(500000)}>heello</button>
    </GoogleMap>
   
  );

}

const MapWrapped = withScriptjs(withGoogleMap(Map));