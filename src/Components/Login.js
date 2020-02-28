import React, { Component } from 'react';
import DataInput from './DataInput';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.history.push("/loggedIn/" + this.state.username);
    }

    changeState = ({target: {name, value}}) => {
        this.setState({
            username: value,
            password: value
        }) 
        console.log(this.state.username);
    }

    render() {
        return (<form onSubmit={this.handleSubmit}>
            <DataInput name = 'username' type="text" onChange={this.changeState}/>
            <DataInput name= 'password' type='password' onChange={this.changeState}/>
            <button>Submit</button>
            </form>
        );
    }
}
