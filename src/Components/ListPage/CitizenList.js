import React, { Component } from 'react';
import axios from 'axios';
import { CITIZEN_LIST, BASE_URL } from '../Constants';
import { Card } from "react-bootstrap";

export default class CitizenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forenames: '',
            surname: '',
            citizenList: [
            ]
        }
    }

    componentDidMount(props) {
        this.setState({forenames: this.props.match.params.forenames});
        this.setState({surname: this.props.match.params.surname});
        // const forenames = this.props.match.params.forenames;
        // const surname = this.props.match.params.surname;
        axios.get(`${BASE_URL}${CITIZEN_LIST}`, { forenames: this.state.forenames, surname: this.state.surname }).then(response => {
            if (response.data.Error) {
                console.log(response.data.Error);
            }
            else {
                this.setState({ citizenList: response.data });
            }
        })
    }
    
    handleClick(e) {
        e.preventDefault();
        console.log(e.target.value);
    }

    compare(a, b) {
        const citizenA = a.citizenID;
        const citizenB = b.citizenID;

        let comparison = 0;
        if (citizenA > citizenB) {
            comparison = 1;
        } else if (citizenA < citizenB) {
            comparison = -1;
        }
        return comparison;
    }

render() {

    return (
        <div id='cardList'>
            <h4>You searched for: {this.state.forenames} {this.state.surname}</h4>
            <p>Please choose a citizen for more information:</p>
            {this.state.citizenList.sort(this.compare).map(citizen =>
                <Card border="primary" class='citizenCard'>
                    <Card.Body>
                        <Card.Title>Citizen ID: {citizen.citizenID}</Card.Title>
                        <Card.Text>{citizen.forenames} {citizen.surname}</Card.Text>
                        <button class='cardButton' value={citizen.citizenID} handleClick={this.handleClick}>Submit</button>
                    </Card.Body>
                </Card>)}
        </div>
    );
}
}