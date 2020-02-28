import React, { Component } from 'react';
import DataInput from './DataInput';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.history.push("/loggedIn");
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <DataInput name = 'username' type="text"/>
            <DataInput name= 'password' type='password'/>
            <button>Submit</button>
            </form>
        );
    }
}
