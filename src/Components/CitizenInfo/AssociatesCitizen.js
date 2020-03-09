import React from "react";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";
import {BASE_URL, GET_ASSOCIATES, GET_CITIZEN} from "../../config/Constants.json";
import axios from "axios";

export default class AssociatesCitizen extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            associates: [
            {  "forenames": "Tigs", "surname": "K", "noOfInteractions": "12"},
            {  "forenames": "Lizzie", "surname": "C", "noOfInteractions": "11"},
            {  "forenames": "Alwin", "surname": "T", "noOfInteractions": "16"},
            {  "forenames": "Jon", "surname": "G", "noOfInteractions": "23"},
            {  "forenames": "Ewan", "surname": "D", "noOfInteractions": "52"}
            ],
            citizenBeingSearched: ""
        }
    }

    componentDidMount() {
        this.setState({citizenID : this.props.match.params.id});
        console.log(this.state.citizenID);

        
        axios.get(`${BASE_URL}${GET_ASSOCIATES}${this.state.citizenID}`).then(response => {
          if (response.data.Error) {
            console.log(response.data.Error);
          }
          else {
            this.setState({ forenames: response.data.forenames });
            this.setState({ surname: response.data.surname });
          }
        });


        axios.get(`${BASE_URL}${GET_CITIZEN}${this.state.citizenID}`).then(response => {
            if (response.data.Error) {
              console.log(response.data.Error);
            }
            else {
              this.setState({ forenames: response.data.forenames });
              this.setState({ surname: response.data.surname });
            }
          });
    }
    
       

    render(){
        return(<div>
            <p>Associates of: {this.state.citizenBeingSearched}</p>
            <Styles>
            <SortingTable data={this.state.associates} />
            </Styles>
            </div>
        );
    }
}