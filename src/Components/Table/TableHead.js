import React, { Component } from 'react';

    const TableHead = (props) => (
        <tbody>
            <tr>
            {Object.keys(props.infoList[0]).map(name => (
                    <td onClick={props.handleClick}>{name}</td>
            ))}
            </tr>
        </tbody>
    );

    export default TableHead;
    