import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../Actions/authActions";
import classnames from "classnames";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/HomePage"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.errors) {
            this.setState({
              errors: nextProps.errors
            });
          }
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/HomePage");
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
        // console.log(this.state.username);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    }

    render() {
        const { errors } = this.state;
        return (
            <div className="login">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                                </h4>
                                <br/>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input placeholder='username' onChange={this.onChange} value={this.state.username} error={errors.username} id="username" type="text" className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })} />
                                <span className="red-text">
                                    {errors.username}
                                    {errors.usernamenotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder='password' onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })} />
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px", marginTop: "1rem" }} type="submit" >
                                    login
                                    </button>
                                    <br/>
                                    <br/>
                                <p className="grey-text text-darken-1">Don't have an account?
                            <br/>
                            <Link id='registerLink' to="/register">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
