import React from "react";
import Accordian from "../AccordianSideBar/Accordian";

export default class LocationSideBar extends React.Component{
constructor(props){
    super(props);
    this.state= {
        title1: "Parameters",
        title2: "Filters",
        info1: ["lat", "long", "lat", "lat"],
        info2: ["calls", "vehicles", "finance"]
    }
}




    render(){
        return(
            <Accordian 
            title1={this.state.title1}
            title2={this.state.title2}
            info1={this.state.info1}
            info2={this.state.info2}
            ></Accordian>
        );
    }
}