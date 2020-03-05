import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Location extends Component {
  static defaultProps = {
    center: {
      lat: 53.4662133,
      lng: -2.2780334
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDBxnd19DzbFBaNgtX75EgNx6znWS9pzpY" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={53.4662133}
            lng={-2.2780334}
            text="My location"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Location;