import React, { Component } from 'react';
import DataInput from './DataInput';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";
import classnames from "classnames";

 class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Tigs",
            password: "Password",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/loggedIn");
        }
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/loggedIn"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

        // this.props.history.push("/loggedIn/" + this.state.username);
    }

    changeState = ({ target: { name, value } }) => {
        this.setState({
            username: value,
            password: value
        })
        console.log(this.state.username);
    }

render() {
    return (<form onSubmit={this.handleSubmit}>
        <DataInput name='username' type="text" onChange={this.changeState} />
        <DataInput name='password' type='password' onChange={this.changeState} />
        <button>Submit</button>
    </form>
    );
}
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(Login);
