import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from './Components/Register';
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
import CitizenList from "./Components/ListPage/CitizenList";
import VehicleList from "./Components/ListPage/VehicleList";

import VehicleCitizen from "./Components/CitizenInfo/VehicleCitizen";
import AssociatesCitizen from "./Components/CitizenInfo/AssociatesCitizen";
import HomePageCitizen from "./Components/CitizenInfo/HomePageCitizen";
import FinancialsCitizen from "./Components/CitizenInfo/FinancialsCitizen";

import Location from "./Components/Map/Location";

import NavigationBar from "./Components/NavigationBar";
import PersonLocation from "./Components/Map/PersonLocation";

// Check for token to keep user logged in
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  const token = sessionStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Router>
        <NavigationBar currentPage="Home Page" signedIn="Admin"/>
          <Route exact path="/"  component={withRouter(Login)}></Route>
          <Route exact path="/register"  component={withRouter(Register)}></Route>
          <Switch>
          <PrivateRoute
            exact path="/HomePage"
            component={withRouter(HomePage)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenSearch"
            component={withRouter(CitizenSearch)}
          ></PrivateRoute>
          <PrivateRoute
            path="/LocationSearch"
            component={withRouter(LocationSearch)}
          ></PrivateRoute>
          <PrivateRoute
            path="/VehicleSearch"
            component={withRouter(VehicleSearch)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenList/:forenames/:surname"
            component={withRouter(CitizenList)}
          ></PrivateRoute>
          <PrivateRoute
            path="/VehicleList/:reg"
            component={withRouter(VehicleList)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenHome/:id"
            component={withRouter(HomePageCitizen)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenFinancials/:id"
            component={FinancialsCitizen}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenAssociates/:id"
            component={withRouter(AssociatesCitizen)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenVehicles/:id"
            component={withRouter(VehicleCitizen)}
          ></PrivateRoute>

          <PrivateRoute
            path="/Map/:radius/:lat/:long/:afterTime/:beforeTime"
            component={withRouter(Location)}
          ></PrivateRoute>
          <PrivateRoute
            path="/CitizenMap/:id/:afterTime/:beforeTime"
            component={withRouter(PersonLocation)}
          ></PrivateRoute>
          </Switch>
        </Router>
      </Provider>
    );
  }
}