import React, { Component } from 'react'
import columnsGenerator from "../SortingTable/columnsGenerator";
import Styles from "../SortingTable/Styles";
import SortingTable from "../SortingTable/SortingTable";



export default class VehicleCitizen extends Component {
    constructor(props){
        super(props);
        this.state = {
            vehicleDetails: [
        { "RegID": "1234", "RegDate": "2020:20:18", "VehcileReg": "hegy48j", "Make": "Hyundai", "Model": "getz", "Colour": "Blue", "License": "GHDJKDJ4848" },
        { "RegID": "3333", "RegDate": "2020:20:17", "VehcileReg": "hegy48j", "Make": "Hyundai", "Model": "getz", "Colour": "Blue", "License": "GHDJKDJ4848" }
    ]
        }
    }

componentDidMount(){
    const columns = columnsGenerator(this.state.vehicleDetails);
    return columns;
}


// const columns =  [
//           {
//             Header: 'RegID',
//             accessor: 'RegID',
//           },
//           {
//             Header: 'RegDate',
//             accessor: 'RegDate',
//           },
//           {
//             Header: 'VehcileReg',
//             accessor: 'VehcileReg',
//           },
//           {
//             Header: 'Make',
//             accessor: 'Make',
//           },
//           {
//             Header: 'Model',
//             accessor: 'Model',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'progress',
//           }
//     ]

render(){

   
  return (
    <Styles>
      <SortingTable columns={this.columns} data={this.state.vehicleDetails} />
    </Styles>
  );
}
 }

