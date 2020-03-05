import React from "react";
import {BASE_URL, GET_CITIZEN} from "../Constants";
import axios from "axios";


  

export default class HomePageCitizen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            person : []
        }
    }

    componentDidMount = () =>{
       axios.get(`${BASE_URL}${GET_CITIZEN}${this.props.match.params.citizenID}`)
    .then  (response =>{
        console.log(response.data);
        this.setState({person: response.data})
    })
    .catch (error => {console.log("Error: " + error);
    });
    }
  
    handleClick = ({target : {name}}) => {
        if (name === "vehicles"){
            this.props.history.push(`/CitizenVehicles/${this.state.citizenID}`);

        }
        if (name === "financials"){
            this.props.history.push(`/CitizenFinancials/${this.state.citizenID}`);
        }
        if (name === "associates"){
            this.props.history.push(`/CitizenAssociates/${this.state.citizenID}`);
        }
    }

    render(){ 
        return(
        <div> 
            {this.state.person.map(customer => (
            <div>
            <p>{customer.fornames} {customer.surname}</p>
            <p>{customer.citizenID}</p>
            <p>{customer.dateOfBirth}</p>
            <p>{customer.sex}</p>
            <p/>
            <p>{customer.homeAddress}</p>
            <p>{customer.placeOfBirth}</p>
            </div>

            
        ))}
        
            <button onClick = {this.handleClick} name="vehicles" >Vehicles</button>
            <button onClick = {this.handleClick} name="financials" >Financials</button>
            <button name="whereabouts" >Whereabouts</button>
            <button onClick = {this.handleClick} name="associates" >Associates</button>

        </div>

        );
    }

}