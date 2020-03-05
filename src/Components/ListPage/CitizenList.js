import React, { Component } from 'react';
import TableHead from '../Table/TableHead';
import TableBody from '../Table/TableBody';
import axios from 'axios';
import { CITIZEN_LIST, BASE_URL } from '../Constants';
import { Card, ListItem } from "react-bootstrap";

export default class CitizenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citizenList: [
                { "forenames": "Lizzie", "surname": "Cowell", "citizenID": "222AD" },
                { "forenames": "Lizzie", "surname": "Cowell", "citizenID": "111A1" },
                { "forenames": "Lizzie", "surname": "Cowell", "citizenID": "444FF" },
                { "forenames": "Lizzie", "surname": "Cowell", "citizenID": "567RE" }


            ],
            headerList: ["citizenID"]
        }
    }

    componentDidMount(props) {
        const forenames = this.props.match.params.forenames;
        const surname = this.props.match.params.surname;
        axios.get(`${BASE_URL}${CITIZEN_LIST}`, { forenames: forenames, surname: surname }).then(response => {
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
            <h4>Please choose a citizen to view more information:</h4>
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