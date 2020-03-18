import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { BASE_URL } from "../config/Constants.json";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      //   name: "",
      username: "",
      password: "",
      password2: "",
      error: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onClick = e => {
    this.props.history.push('/');
  }

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(this.state.password);
    console.log(this.state.password2);
    if(this.state.password !== this.state.password2){
      console.log("Dont match");
      this.setState({error: 'Passwords do not match.'})
    }
    else{
      axios.post(BASE_URL + "/login/create", newUser).then(res => 
      this.props.history.push("/"))
      .catch(err => {
        this.setState({error: "Username already exists."})
      });
    }
      
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <h4> <b>Register</b> below</h4>
        <form onSubmit={this.onSubmit}>
          <input minLength='5' placeholder='Username' onChange={this.onChange} value={this.state.username} id="username" type="username" required/>
          <br />
          <input minLength='5' placeholder='Password' onChange={this.onChange} value={this.state.password}  id="password" type="password" required/>
          <br />
          <input minLength='5' placeholder='Confirm password' onChange={this.onChange} value={this.state.password2}  id="password2" type="password" required/>
          <br />
          <button id='signupButton'>Sign up</button>
          <br/>
          <span id='error'>{this.state.error}</span>
          <br/>
        </form>
        <p className="grey-text text-darken-1">Already have an account? </p>
        <button onClick={this.onClick} id='loginButton'>Login</button>
      </div>
    );
  }
}
