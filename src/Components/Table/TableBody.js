import React, { Component } from 'react';


const TableHead = (props) => (
    <tbody>
        {props.infoList.map(listObject => (
            <tr >
                {
                    Object.keys(listObject).map(key => (
                        <td onClick={props.handleClick}>{listObject[key]}</td>
                    ))}
            </tr>
        ))}
    </tbody>
);

export default TableHead;