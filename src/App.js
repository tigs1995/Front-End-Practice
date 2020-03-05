import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./Store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/authActions";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";

import HomePage from "./Components/HomePage";

import VehicleSearch from "./Components/SearchPages/VehicleSearch";
import LocationSearch from "./Components/SearchPages/LocationSearch";
import CitizenSearch from "./Components/SearchPages/CitizenSearch";

import CitzizenList from "./Components/ListPage/CitizenList";
import VehicleList from "./Components/ListPage/VehicleList";

import VehicleCitizen from "./Components/CitizenInfo/VehicleCitizen";
import AssociatesCitizen from "./Components/CitizenInfo/AssociatesCitizen";
import HomePageCitizen from "./Components/CitizenInfo/HomePageCitizen";
import FinancialsCitizen from "./Components/CitizenInfo/FinancialsCitizen";
import NavigationBar from "./Components/NavigationBar";

import Location from "./Components/Map/Location";

// // Check for token to keep user logged in
// if (sessionStorage.jwtToken) {
//   // Set auth token header auth
//   const token = sessionStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
// // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());
//     // Redirect to login
//     window.location.href = "./login";
//   }
// }

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/CitizenSearch" component={CitizenSearch}></Route>
          <Route path="/LocationSearch" component={LocationSearch}></Route>
          <Route path="/VehicleSearch" component={VehicleSearch}></Route>
          <Route path="/CitizenList/:forenames/:surname" component={CitzizenList}></Route>
          <Route path="/VehicleList/:reg" component={VehicleList}></Route>
          <Route path="/CitizenHome/:id" component={HomePageCitizen}></Route>
          <Route path="/CitizenFinancials/:id" component={FinancialsCitizen}></Route>
          <Route
            path="/CitizenAssociates/:id"
            component={AssociatesCitizen}
          ></Route>

          <Route path="/CitizenVehicles/:reg" component={VehicleCitizen}></Route>

          <Route path="/Map/:search" component={Location}></Route>
        </Router>
      </Provider>
    );
  }
}

// export default class App extends Component {
//   render() {
//     return (
// <Provider store={store}>
//   <Router>
//     <Link to="/">Home</Link>
//     <Route exact path="/" component={Login}></Route>
//     {/* <Route path="/loggedIn/:username" component={HomePage}></Route> */}
//     <Switch>
//       <PrivateRoute exact path="/loggedIn" component={HomePage} />
//     </Switch>
//   </Router>
// </Provider>

//   );
// }
