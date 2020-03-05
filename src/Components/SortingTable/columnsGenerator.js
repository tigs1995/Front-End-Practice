import React from "react";

function columnsGenerator(props){

const columns = (props) => Object.keys(props.vehicleDetails[0]).map(name => (
        [
            {
                Header: 'Info',
                accessor: {name}
            }
        ]
    ))
}



export default columnsGenerator;