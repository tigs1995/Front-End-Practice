import React, { useState, useEffect } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import mapStyles from "./mapStyles";

function Map(props) {
    let { lat, long, radius, beforeTime, afterTime } = props;
    let { financialDataToUse, callDataToUse, vehicleDataToUse } = props;
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
    var financeIcon = {
        url: "https://webstockreview.net/images/google-map-marker-png-4.png", // url
        scaledSize: { width: 20, height: 32 } 
    }
    var callIcon = {
        url: "https://www.pngkit.com/png/full/48-480186_google-pin-image-google-maps-markers-blue.png", // url
        scaledSize: { width: 20, height: 32 } 
    }

        
    debugger;
  
    return (
        <GoogleMap 
            onClick={() =>{setSelectedPin(null)}}
            defaultZoom={10}
            defaultCenter={{ lat: +lat, lng: +long }}
            defaultOptions={{ styles: mapStyles }}
        >
            {vehicleDataToUse.map(vehicle => (
                <Marker
                    key={vehicle.citizenID}
                    position={{
                        lat: (+vehicle.latitude+1),
                        lng: (+vehicle.longitude+1)
                    }}
                    icon= {vehicleIcon}
        
                    onClick={() => {
                        setSelectedPin(vehicle);
                    }}
                />
            ))}

            {callDataToUse.map(call => (
                <Marker
                    key={call.citizenID}
                    position={{
                        lat: +call.latitude,
                        lng: +call.longitude
                    }}
                    icon= {financeIcon}
    
   
                    onClick={() => {
                        setSelectedPin(call);
                    }}
                />
            ))}


            {financialDataToUse.map(finance => (
                <Marker
                    key={finance.citizenID}
                    position={{
                        lat: (+finance.latitude+2),
                        lng: (+finance.longitude+2)
                    }}
                    icon= {callIcon}
                   
                    onClick={() => {
                        setSelectedPin(finance);
                    }}
                />
            ))}
            <Circle
                defaultCenter={{
                    lat: +lat,
                    lng: +long
                }}
                radius={+radius}
                options={{
                    options: {
                        strokeColor: "black"
                    }
                }
                }
            />
            {selectedPin && (
                <InfoWindow
                
                   
                    position={{
                        lat: +selectedPin.latitude,
                        lng: +selectedPin.longitude
                    }}
                >
                    <div onClick={() => {
                        console.log("hi");
                        props.history.push(`/CitizenHome/${selectedPin.citizenID}`);
                    }}>
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



