import React, { useState, useEffect } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyles";
import {vehicleIcon, callIcon, financeIcon} from "./MarkerIcons.js";


function Map(props) {
    let { lat, long, radius} = props;
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
        'financeAtm' : 'ATM Transaction',
        'callInbound' : 'Inbound Call',
        'callOutbound' : 'Outbound Call'
    };


    return (
        <GoogleMap
            onClick={() => {
                setSelectedPin(null);
            }}
            defaultZoom={7}
            defaultCenter={{ lat: 53, lng: -2 }}
            defaultOptions={{ styles: mapStyles }}
        >
            {vehicleDataToUse?.map(vehicle => (
                <Marker
                    //key={vehicle.vehicleRegistrationNo}
                    position={{
                        lat: +vehicle.latitude,
                        lng: +vehicle.longitude
                    }}
                    icon={vehicleIcon}
                    onClick={() => {
                        setSelectedPin({ type: 'vehicle', ...vehicle });
                    }}
                />
            ))}
            {callDataToUseInbound?.map(call => (
                <Marker
                    //   key={call.citizenID}
                    position={{
                        lat: +call.latitude,
                        lng: +call.longitude
                    }}
                    icon={callIcon}
                    onClick={() => {
                        setSelectedPin({ type: 'callInbound', ...call });
                    }}
                />
            ))}
            {callDataToUseOutbound?.map(call => (
                <Marker
                    //   key={call.citizenID}
                    position={{
                        lat: +call.latitude,
                        lng: +call.longitude
                    }}
                    icon={callIcon}
                    onClick={() => {
                        setSelectedPin({ type: 'callOutbound', ...call });
                    }}
                />
            ))}
            {financialDataToUseEpos?.map(finance => (
                <Marker
                    //   key={finance.citizenID}
                    position={{
                        lat: +finance.latitude,
                        lng: +finance.longitude
                    }}
                    icon={financeIcon}
                    onClick={() => {
                        setSelectedPin({ type: 'financeEpos', ...finance });
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
                    icon={financeIcon}
                    onClick={() => {
                        setSelectedPin({ type: 'financeAtm', ...finance });
                    }}
                />
            ))}

            {selectedPin && (
                <InfoWindow
                    position={{
                        lat: +selectedPin.latitude,
                        lng: +selectedPin.longitude
                    }}
                >
                    <div
                        onClick={() => {
                            props.history.push(`/CitizenHome/${selectedPin.citizenID}`);
                        }}
                    >
                        <p>{selectedPin.forenames} {selectedPin.surname}</p>
                        <p>ID: {selectedPin.citizenID}</p>
                        <p>Timestamp: {selectedPin.timestamp.split("T").join(" at ").split("Z")}</p>
                        <p>Event: {typeTitleMap[selectedPin.type] || 'Unknown type'}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}
const MapWrapped = withScriptjs(withGoogleMap(Map));
export default MapWrapped;