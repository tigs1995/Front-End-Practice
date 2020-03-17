import React, { Component } from 'react';
import axios from 'axios';
import { CITIZEN_LIST, BASE_URL } from '../../config/Constants.json';
import { Card } from "react-bootstrap";
import "../../CSS/CitizenList.css";

export default class CitizenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forenames: '',
            surname: '',
            citizenList: [
            ],
            citizenList1: [
            ],
            citizenList2: [
            ]
        }
    }

    chunk(arr, chunkSize) {
        var R = [];
        for (var i = 0; i < arr.length; i += chunkSize)
            R.push(arr.slice(i, i + chunkSize));
        console.log(R);
        return R;
    }

    componentDidMount(props) {
        this.setState({ forenames: this.props.match.params.forenames });
        this.setState({ surname: this.props.match.params.surname });
        const forenames = this.props.match.params.forenames;
        const surname = this.props.match.params.surname;
        axios.post(`${BASE_URL}${CITIZEN_LIST}`, { forenames: forenames, surname: surname }).then(response => {
            if (response.data.Error) {
                console.log(response.data.Error);
            }
            else {
                let arr = [];
                let a = this.chunk(response.data, Math.abs(response.data.length / 3))[0] 
                let b = this.chunk(response.data, Math.abs(response.data.length / 3))[1] 
                let c = this.chunk(response.data, Math.abs(response.data.length / 3))[2] 
                if (!b.length && !c.length) {
                    c = a;
                    a = b;
                } else if (!a.length && !b.length) {
                    b = c;
                    c = a; 
                } else if (!a.length) {
                    a = b;
                    b = [];
                }
                
                
                this.setState({ citizenList: a });
                this.setState({ citizenList1: b });
                this.setState({ citizenList2: c });
            }
        });
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
            <div class="container">
                <h4 id="header">You searched for: {this.state.forenames} {this.state.surname}</h4>
                <p>Please choose a citizen for more information:</p>
                <div id='cardList'>


                    <div class="side">
                        {this.state.citizenList.map(citizen =>
                            <Card border="primary" className='citizenCard'>
                                <Card.Body>
                                    <Card.Title>Citizen ID: {citizen.citizenID}</Card.Title>
                                    <Card.Text>{citizen.forenames} {citizen.surname}</Card.Text>
                                    <button className='cardButton' value={citizen.citizenID} onClick={this.handleClick}>Select</button>
                                </Card.Body>
                            </Card>)}
                    </div>
                    <div>
                        {this.state.citizenList1.map(citizen =>
                            <Card border="primary" className='citizenCard'>
                                <Card.Body>
                                    <Card.Title>Citizen ID: {citizen.citizenID}</Card.Title>
                                    <Card.Text>{citizen.forenames} {citizen.surname}</Card.Text>
                                    <button className='cardButton' value={citizen.citizenID} onClick={this.handleClick}>Select</button>
                                </Card.Body>
                            </Card>)}
                    </div>
                    <div class="side">
                        {this.state.citizenList2.map(citizen =>
                            <Card border="primary" className='citizenCard'>
                                <Card.Body>
                                    <Card.Title>Citizen ID: {citizen.citizenID}</Card.Title>
                                    <Card.Text>{citizen.forenames} {citizen.surname}</Card.Text>
                                    <button className='cardButton' value={citizen.citizenID} onClick={this.handleClick}>Select</button>
                                </Card.Body>
                            </Card>)}
                    </div>
                </div>
            </div>
        );
    }
}