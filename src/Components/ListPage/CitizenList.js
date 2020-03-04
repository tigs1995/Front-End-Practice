import React, { Component } from 'react';
import TableHead from '../Table/TableHead';
import TableBody from '../Table/TableBody';
import axios from 'axios';
import { CITIZEN_LIST, BASE_URL } from '../Constants';

export default class CitizenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citizenList: [
                {"citizenID": "GDhf74" },
                {"citizenID": "gfgfgfgf" }
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
e
    handleClick(e){
        e.preventDefault();
        console.log(e.target.value);
    }

    render() {

        return (
            <div>
                <p>Please click the citizen you want to view:</p>
                <table id='tables'>
                <TableHead headerList={this.state.headerList}></TableHead>
                <TableBody onClick={this.handleClick} infoList={this.state.citizenList}></TableBody>
                </table>
            </div>
        );
    }
}