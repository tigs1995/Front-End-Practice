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
import { vehicleIcon, callIcon, financeIcon, noVehicle, noCall, noFinance } from "./MarkerIcons.js";
import { BASE_URL, GET_VEHICLE_INFO, GET_CITIZEN_BY_CARD, GET_CITIZEN_BY_PHONE } from "../../config/Constants";
import axios from "axios";

function Map(props) {
    let { lat, long, radius, beforeTime, afterTime } = props;
    let {
        financialDataToUseEpos,
        financiaDataToUseAtm,
        callDataToUseInbound,
        callDataToUseOutbound,
        vehicleDataToUse
    } = props;


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

    const typeTitleMap = {
        'vehicle': 'Vehicle Sighting',
        'financeEpos': 'ePOS Transaction',
        'financeAtm': 'ATM Transaction',
        'callInbound': 'Inbound Call',
        'callOutbound': 'Outbound Call'
    };

    return (
        <GoogleMap
            onClick={() => {
                setSelectedPin(null);
            }}
            defaultZoom={10}
            defaultCenter={{ lat: +lat, lng: +long }}
            defaultOptions={{ styles: mapStyles }}
        >
            {vehicleDataToUse?.map(vehicle => (
                <Marker
                    key={vehicle.vehicleRegistrationNumber + vehicle.timestamp}
                    position={{
                        lat: +vehicle.latitude,
                        lng: +vehicle.longitude
                    }}
                    icon={props.vehicleFilter ? vehicleIcon : noVehicle}
                    onClick={() => {
                        axios.post(`${BASE_URL}${GET_VEHICLE_INFO}`, { vehicleRegistrationNo: vehicle.vehicleRegistrationNumber })
                        .then(response => {
                                setSelectedPin({citizenID: response.data[0].citizenID, 
                                                forenames: response.data[0].forenames, 
                                                surname: response.data[0].surname, 
                                                type: 'vehicle', 
                                                ...vehicle });
                            })
                            .catch(error=>{setSelectedPin({type: 'vehicle', ...vehicle })});

                    }}
                />
            ))}
            {callDataToUseInbound?.map(call => (
                <Marker
                    key={call.callerMSISDN + call.timestamp}

                    position={{
                        lat: +call.latitude,
                        lng: +call.longitude
                    }}
                    icon={props.callsFilter ? callIcon : noCall}
                    onClick={() => {
                        axios.post(`${BASE_URL}${GET_CITIZEN_BY_PHONE}`, { number: call.callerMSISDN })
                        .then(response => {
                                setSelectedPin({citizenID: response.data[0].citizenID, 
                                                forenames: response.data[0].forenames, 
                                                surname: response.data[0].surname, 
                                                type: 'callInbound', 
                                                ...call });
                            })
                            .catch(error=>{setSelectedPin({type: 'callInbound', ...call})});
                    }}
                />
            ))}
            {callDataToUseOutbound?.map(call => (
                <Marker
                    key={call.callerMSISDN + call.timestamp}
                    position={{
                        lat: +call.latitude,
                        lng: +call.longitude
                    }}
                    icon={props.callsFilter ? callIcon : noCall}
                    onClick={() => {
                        axios.post(`${BASE_URL}${GET_CITIZEN_BY_PHONE}`, { number: call.callerMSISDN })
                        .then(response => {
                            setSelectedPin({citizenID: response.data[0].citizenID, 
                                            forenames: response.data[0].forenames, 
                                            surname: response.data[0].surname,  
                                            type: 'callOutbound', 
                                            ...call });
                        })
                        .catch(error=>{setSelectedPin({type: 'callOutbound', ...call})});

                    }}
                />
            ))}
            {financialDataToUseEpos?.map(finance => (
                <Marker
                    key={finance.cardnumber + finance.timestamp}
                    position={{
                        lat: +finance.latitude,
                        lng: +finance.longitude
                    }}
                    icon={props.financeFilter ? financeIcon : noFinance}
                    onClick={() => {
                        axios.post(`${BASE_URL}${GET_CITIZEN_BY_CARD}`, {number: finance.cardNumber})
                        .then(response => {
                            setSelectedPin({citizenID: response.data[0].citizenID, 
                                            forenames:response.data[0].forenames, 
                                            surname:response.data[0].surname, 
                                            type: 'financeEpos', 
                                            ...finance });
                        })
                        .catch(error =>{setSelectedPin({type: 'financeEpos', ...finance})});
                   
                    }}
                />
            ))}
            {financiaDataToUseAtm?.map(finance => (
                <Marker
                    //   key={finance.citizenID}
                    position={{
                        lat: +finance.latitude,
                        lng: +finance.longitude
                    }}
                    icon={props.financeFilter ? financeIcon : noFinance}
                    onClick={() => {
                        axios.post(`${BASE_URL}${GET_CITIZEN_BY_CARD}`, {number: finance.cardNumber})
                        .then(response => {
                            setSelectedPin({ citizenID: response.data[0].citizenID, 
                                             forenames: response.data[0].forenames, 
                                             surname: response.data[0].surname, 
                                             type: 'financeAtm', 
                                             ...finance });
                        })
                        .catch(error=>{setSelectedPin({type: 'financeAtm', ...finance})});
                        
                    }}
                />
            ))}
            <Circle
                onClick={() => {
                    setSelectedPin(null);
                }}
                defaultCenter={{
                    lat: +lat,
                    lng: +long
                }}
                radius={+radius * 1000}
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
                            if (selectedPin.citizenID) { props.history.push(`/CitizenHome/${selectedPin.citizenID}`) };
                        }}
                    >
                        <p>Name: {selectedPin.forenames || "Unknown"} {selectedPin.surname}</p>
                        <p>ID: {selectedPin.citizenID || "Unknown"}</p>
                        <p>Timestamp: {selectedPin.timestamp.split("T").join(" at ").split("Z")}</p>
                        <p>Event: {typeTitleMap[selectedPin.type] || "Unknown Type"}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;