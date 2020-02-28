import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Display from './Components/Display';
import Login from "./Components/Login";
import { Provider } from "react-redux";
import Store from "./Store";


export default class App extends Component {
  render() {
    return (
      <Provider Store={Store}>
      <Router>
        <Link to="/">Home</Link>
        <Route exact path="/" component={Login}></Route>
        <Route path="/loggedIn/:username" component={Display}></Route>
      </Router>
      </Provider>
  );
  }

}


