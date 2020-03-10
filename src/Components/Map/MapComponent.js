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
function Map(props) {
    let { lat, long, radius, beforeTime, afterTime } = props;
    let { financeDataToUse, callsDataToUse, vehicleDataToUse } = props;
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
            defaultCenter={{ lat: +lat, lng: +long }}
            defaultOptions={{ styles: mapStyles }}
        >
            {vehicleDataToUse.map(vehicle => (
                <Marker
                    key={vehicle.vehicleRegistrationNo}
                    position={{
                        lat: parseInt(vehicle.latitude),
                        lng: parseInt(vehicle.longitude)
                    }}
                    //    icon={{ fillColor: "#FF00FF" }}
                    onClick={() => {
                        console.log(vehicle.citizenID);
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
                    onCloseClick={() => {
                        setSelectedPin(null);
                    }}
                    position={{
                        lat: +selectedPin.latitude,
                        lng: +selectedPin.longitude
                    }}
                >
                    <div>
                        <h2>{selectedPin.latitude}</h2>
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



