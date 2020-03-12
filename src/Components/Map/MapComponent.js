import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
  Circle
} from "react-google-maps";
import mapStyles from "./mapStyles";
import "../../CSS/Location.css"


function Map(props) {
  let { lat, long, radius, beforeTime, afterTime } = props;
  let {
    financialDataToUseEpos,
    financiaDataToUseAtm,
    callDataToUseInbound,
    callDataToUseOutbound,
    vehicleDataToUse
  } = props;
  console.log(vehicleDataToUse);
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
  
  var vehicleIcon = {
        url: "https://i.pinimg.com/originals/86/fd/17/86fd17769a3b2537d2b028601cda7b92.png", // url
        scaledSize: { width: 20, height: 25 }
    }
    var callIcon = {
        url: "https://www.pngkit.com/png/full/48-480186_google-pin-image-google-maps-markers-blue.png", // url
        scaledSize: { width: 20, height: 32 }
    }
    var financeIcon = {
        url: "https://webstockreview.net/images/google-map-marker-png-4.png", // url
        scaledSize: { width: 20, height: 32 }
    }

    if (props.callsFilter === true) {
        callIcon = {
            url: "https://www.pngkit.com/png/full/48-480186_google-pin-image-google-maps-markers-blue.png", // url
            scaledSize: { width: 0, height: 0 }
        }
    }

    if (props.financeFilter === true) {
        financeIcon = {
            url: "https://webstockreview.net/images/google-map-marker-png-4.png", // url
            scaledSize: { width: 0, height: 0 }
        }
    }

    if (props.vehicleFilter === true) {
        vehicleIcon = {
            url: "https://i.pinimg.com/originals/86/fd/17/86fd17769a3b2537d2b028601cda7b92.png", // url
            scaledSize: { width: 0, height: 0 }
        }
    }

  return (
    <GoogleMap
      onClick={() => {
        setSelectedPin(props);
      }}
      defaultZoom={10}
      defaultCenter={{ lat: +lat, lng: +long }}
      defaultOptions={{ styles: mapStyles }}
    >
      {vehicleDataToUse.map(vehicle => (
        <Marker
          key={vehicle.vehicleRegistrationNo}
          position={{
            lat: +(vehicle.latitude ),
            lng: +(vehicle.longitude)
          }}
          icon={vehicleIcon}
          onClick={() => {
            setSelectedPin(vehicle);
          }}
        />
      ))}

      {/* {callDataToUseInbound.map(call => (
        <Marker
        //   key={call.citizenID}
          position={{
            lat: +call.latitude,
            lng: +call.longitude
          }}
          icon={callIcon}
          onClick={() => {
            setSelectedPin(call);
          }}
        />
      ))}

      {callDataToUseOutbound.map(call => (
        <Marker
        //   key={call.citizenID}
          position={{
            lat: +call.latitude,
            lng: +call.longitude
          }}
          icon={callIcon}
          onClick={() => {
            setSelectedPin(call);
          }}
        />
      ))}


      {financialDataToUseEpos.map(finance => (
        <Marker
        //   key={finance.citizenID}
          position={{
            lat: +finance.latitude + 2,
            lng: +finance.longitude + 2
          }}
          icon={financeIcon}
          onClick={() => {
            setSelectedPin(finance);
          }}
        />
      ))}

      {financiaDataToUseAtm.map(finance => (
        <Marker
        //   key={finance.citizenID}
          position={{
            lat: +finance.latitude + 2,
            lng: +finance.longitude + 2
          }}
          icon={financeIcon}
          onClick={() => {
            setSelectedPin(finance);
          }}
        /> */}
      {/* ))} */}
      <Circle
        defaultCenter={{
          lat: +lat,
          lng: +long
        }}
        radius={+radius*1000}
        options={{
          options: {
            strokeColor: "black"
          }
        }}
      />
      {selectedPin && (
        <InfoWindow
          position={{
            lat: +selectedPin.latitude,
            lng: +selectedPin.longitude
          }}
        >
          <div
            onClick={() => {
              console.log("hi");
              props.history.push(`/CitizenHome/${selectedPin.citizenID}`);
            }}
          >
            <h2>{selectedPin.citizenID}</h2>
            <p>{selectedPin.latitude}</p>
            <p>{selectedPin.longitude}</p>
          </div>
        </InfoWindow>
      )}
      {/* <button onClick={() => setRadius(500000)}>heello</button> */}
    </GoogleMap>
  );

}
const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;
