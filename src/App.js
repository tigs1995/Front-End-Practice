import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import './App.css';
import Display from './Components/Display';
import Login from "./Components/Login";


export default class App extends Component {
  render() {
    return (
      <Router>
        <Link to="/">Home</Link>
        <Route exact path="/" component={Login}></Route>
        <Route path="/loggedIn" component={Display}></Route>
      </Router>
  );
  }

}


