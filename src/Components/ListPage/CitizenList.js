import React, { Component } from 'react';
import axios from 'axios';
import { CITIZEN_LIST, BASE_URL } from '../../config/Constants.json';
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
        const forenames = this.props.match.params.forenames;
        const surname = this.props.match.params.surname;
        axios.post(`${BASE_URL}${CITIZEN_LIST}`, { forenames: forenames, surname: surname }).then(response => {
            if (response.data.Error) {
                console.log(response.data.Error);
            }
            else {
                this.setState({ citizenList: response.data });
            }
        })
    }
    
    handleClick = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        this.props.history.push(`/CitizenHome/${e.target.value}`)
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
                <Card border="primary" className='citizenCard'>
                    <Card.Body>
                        <Card.Title>Citizen ID: {citizen.citizenID}</Card.Title>
                        <Card.Text>{citizen.forenames} {citizen.surname}</Card.Text>
                        <button className='cardButton' value={citizen.citizenID} onClick={this.handleClick}>Submit</button>
                    </Card.Body>
                </Card>)}
        </div>
    );
}
}