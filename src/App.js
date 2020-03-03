import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import './App.css';
import HomePage from './Components/HomePage';
import Login from "./Components/Login";
import { Provider } from "react-redux";
import store from "./Store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/authActions";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute";

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
          <Link to="/">Home</Link>
          <Route exact path="/" component={Login}></Route>
          {/* <Route path="/loggedIn/:username" component={HomePage}></Route> */}
          <Switch>
            <PrivateRoute exact path="/loggedIn" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    );
  }

}


